<?php
/**
 * https://www.dropbox.com/developers/apply?cont=/developers/apps
 */

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed.');

// Converted to multi-options (Feb 2017-) and previous options conversion removed: Yes

if (!class_exists('UpdraftPlus_BackupModule')) require_once(UPDRAFTPLUS_DIR.'/methods/backup-module.php');

// Fix a potential problem for users who had the short-lived 1.12.35-1.12.38 free versions (see: https://wordpress.org/support/topic/1-12-37-dropbox-auth-broken/page/2/#post-8981457)
// Can be removed after a few months
$potential_options = UpdraftPlus_Options::get_updraft_option('updraft_dropbox');
if (is_array($potential_options) && isset($potential_options['version']) && isset($potential_options['settings']) && array() === $potential_options['settings']) {
	// Wipe it, which wil force its re-creation in proper format
	UpdraftPlus_Options::delete_updraft_option('updraft_dropbox');
}


class UpdraftPlus_BackupModule_dropbox extends UpdraftPlus_BackupModule {

	private $current_file_hash;

	private $current_file_size;

	private $dropbox_object;

	private $uploaded_offset;

	private $upload_tick;

	/**
	 * This callback is called as upload progress is made
	 *
	 * @param Integer		 $offset   - the byte offset
	 * @param String		 $uploadid - identifier for the upload in progress
	 * @param Boolean|String $fullpath - optional full path to the file being uploaded
	 */
	public function chunked_callback($offset, $uploadid, $fullpath = false) {
	
		global $updraftplus;

		// Update upload ID
		$this->jobdata_set('upload_id_'.$this->current_file_hash, $uploadid);
		$this->jobdata_set('upload_offset_'.$this->current_file_hash, $offset);

		$time_now = microtime(true);
		
		$time_since_last_tick = $time_now - $this->upload_tick;
		$data_since_last_tick = $offset - $this->uploaded_offset;
		
		$this->upload_tick = $time_now;
		$this->uploaded_offset = $offset;
		
		// Here we use job-wide data, because we don't expect wildly different performance for different Dropbox accounts
		$chunk_size = $updraftplus->jobdata_get('dropbox_chunk_size', 1048576);
		// Don't go beyond 10MB, or change the chunk size after the last segment
		if ($chunk_size < 10485760 && $this->current_file_size > 0 && $offset < $this->current_file_size) {
			$job_run_time = $time_now - $updraftplus->job_time_ms;
			if ($time_since_last_tick < 10) {
				$upload_rate = $data_since_last_tick / max($time_since_last_tick, 1);
				$upload_secs = min(floor($job_run_time), 10);
				if ($job_run_time < 15) $upload_secs = max(6, $job_run_time*0.6);
				$new_chunk = max(min($upload_secs * $upload_rate * 0.9, 10485760), 1048576);
				$new_chunk = $new_chunk - ($new_chunk % 524288);
				$chunk_size = (int) $new_chunk;
				$this->dropbox_object->setChunkSize($chunk_size);
				$updraftplus->jobdata_set('dropbox_chunk_size', $chunk_size);
			}
		}
		
		if ($this->current_file_size > 0) {
			$percent = round(100*($offset/$this->current_file_size), 1);
			$updraftplus->record_uploaded_chunk($percent, "$uploadid, $offset, ".round($chunk_size/1024, 1)." KB", $fullpath);
		} else {
			$updraftplus->log("Dropbox: Chunked Upload: $offset bytes uploaded");
			// This act is done by record_uploaded_chunk, and helps prevent overlapping runs
			if ($fullpath) touch($fullpath);
		}
	}

	public function get_supported_features() {
		// This options format is handled via only accessing options via $this->get_options()
		return array('multi_options');
	}

	public function get_default_options() {
		return array(
			'appkey' => '',
			'secret' => '',
			'folder' => '',
			'tk_access_token' => '',
		);
	}

	public function backup($backup_array) {

		global $updraftplus;

		$opts = $this->get_options();
		
		if (empty($opts['tk_access_token'])) {
			$updraftplus->log('You do not appear to be authenticated with Dropbox (1)');
			$updraftplus->log(__('You do not appear to be authenticated with Dropbox', 'updraftplus'), 'error');
			return false;
		}
		
		// 28 June 2017
		$use_api_ver = (defined('UPDRAFTPLUS_DROPBOX_API_V1') && UPDRAFTPLUS_DROPBOX_API_V1 && time() < 1498608000) ? 1 : 2;
		
		if (empty($opts['tk_request_token'])) {
			$updraftplus->log("Dropbox: begin cloud upload (using API version $use_api_ver with OAuth v2 token)");
		} else {
			$updraftplus->log("Dropbox: begin cloud upload (using API version $use_api_ver with OAuth v1 token)");
		}

		$chunk_size = $updraftplus->jobdata_get('dropbox_chunk_size', 1048576);

		try {
			$dropbox = $this->bootstrap();
			if (false === $dropbox) throw new Exception(__('You do not appear to be authenticated with Dropbox', 'updraftplus'));
			$updraftplus->log("Dropbox: access gained; setting chunk size to: ".round($chunk_size/1024, 1)." KB");
			$dropbox->setChunkSize($chunk_size);
		} catch (Exception $e) {
			$updraftplus->log('Dropbox error when trying to gain access: '.$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			$updraftplus->log(sprintf(__('Dropbox error: %s (see log file for more)', 'updraftplus'), $e->getMessage()), 'error');
			return false;
		}

		$updraft_dir = $updraftplus->backups_dir_location();
		$dropbox_folder = trailingslashit($opts['folder']);

		foreach ($backup_array as $file) {

			$available_quota = -1;

			// If we experience any failures collecting account info, then carry on anyway
			try {

				/*
					Quota information is no longer provided with account information a new call to quotaInfo must be made to get this information.
				 */
				if (1 == $use_api_ver) {
					$quota_info = $dropbox->accountInfo();
				} else {
					$quota_info = $dropbox->quotaInfo();
				}

				if ("200" != $quota_info['code']) {
					$message = "Dropbox account/info did not return HTTP 200; returned: ". $quota_info['code'];
				} elseif (!isset($quota_info['body'])) {
					$message = "Dropbox account/info did not return the expected data";
				} else {
					$body = $quota_info['body'];
					if (isset($body->quota_info)) {
						$quota_info = $body->quota_info;
						$total_quota = $quota_info->quota;
						$normal_quota = $quota_info->normal;
						$shared_quota = $quota_info->shared;
						$available_quota = $total_quota - ($normal_quota + $shared_quota);
						$message = "Dropbox quota usage: normal=".round($normal_quota/1048576, 1)." MB, shared=".round($shared_quota/1048576, 1)." MB, total=".round($total_quota/1048576, 1)." MB, available=".round($available_quota/1048576, 1)." MB";
					} else {
						$total_quota = max($body->allocation->allocated, 1);
						$used = $body->used;
						/* check here to see if the account is a team account and if so use the other used value
						This will give us their total usage including their individual account and team account */
						if (isset($body->allocation->used)) $used = $body->allocation->used;
						$available_quota = $total_quota - $used;
						$message = "Dropbox quota usage: used=".round($used/1048576, 1)." MB, total=".round($total_quota/1048576, 1)." MB, available=".round($available_quota/1048576, 1)." MB";
					}
				}
				$updraftplus->log($message);
			} catch (Exception $e) {
				$updraftplus->log("Dropbox error: exception (".get_class($e).") occurred whilst getting account info: ".$e->getMessage());
				// $updraftplus->log(sprintf(__("%s error: %s", 'updraftplus'), 'Dropbox', $e->getMessage()).' ('.$e->getCode().')', 'warning', md5($e->getMessage()));
			}

			$file_success = 1;

			$hash = md5($file);
			$this->current_file_hash = $hash;

			$filesize = filesize($updraft_dir.'/'.$file);
			$this->current_file_size = $filesize;

			// Into KB
			$filesize = $filesize/1024;
			$microtime = microtime(true);

			if ($upload_id = $this->jobdata_get('upload_id_'.$hash, null, 'updraf_dbid_'.$hash)) {
				// Resume
				$offset = $this->jobdata_get('upload_offset_'.$hash, null, 'updraf_dbof_'.$hash);
				$updraftplus->log("This is a resumption: $offset bytes had already been uploaded");
			} else {
				$offset = 0;
				$upload_id = null;
			}

			// We don't actually abort now - there's no harm in letting it try and then fail
			if (-1 != $available_quota && $available_quota < ($filesize-$offset)) {
				$updraftplus->log("File upload expected to fail: file data remaining to upload ($file) size is ".($filesize-$offset)." b (overall file size; .".($filesize*1024)." b), whereas available quota is only $available_quota b");
// $updraftplus->log(sprintf(__("Account full: your %s account has only %d bytes left, but the file to be uploaded has %d bytes remaining (total size: %d bytes)",'updraftplus'),'Dropbox', $available_quota, $filesize-$offset, $filesize), 'warning');
			}

			// Old-style, single file put: $put = $dropbox->putFile($updraft_dir.'/'.$file, $dropbox_folder.$file);

			$ufile = apply_filters('updraftplus_dropbox_modpath', $file, $this);

			$updraftplus->log("Dropbox: Attempt to upload: $file to: $ufile");

			$this->upload_tick = microtime(true);
			$this->uploaded_offset = $offset;

			try {
				$response = $dropbox->chunkedUpload($updraft_dir.'/'.$file, '', $ufile, true, $offset, $upload_id, array($this, 'chunked_callback'));
				if (empty($response['code']) || "200" != $response['code']) {
					$updraftplus->log('Unexpected HTTP code returned from Dropbox: '.$response['code']." (".serialize($response).")");
					if ($response['code'] >= 400) {
						$updraftplus->log('Dropbox '.sprintf(__('error: failed to upload file to %s (see log file for more)', 'updraftplus'), $file), 'error');
					} else {
						$updraftplus->log(sprintf(__('%s did not return the expected response - check your log file for more details', 'updraftplus'), 'Dropbox'), 'warning');
					}
				}
			} catch (Exception $e) {
				$updraftplus->log("Dropbox chunked upload exception (".get_class($e)."): ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
				if (preg_match("/Submitted input out of alignment: got \[(\d+)\] expected \[(\d+)\]/i", $e->getMessage(), $matches)) {
					// Try the indicated offset
					$we_tried = $matches[1];
					$dropbox_wanted = (int) $matches[2];
					$updraftplus->log("Dropbox not yet aligned: tried=$we_tried, wanted=$dropbox_wanted; will attempt recovery");
					$this->uploaded_offset = $dropbox_wanted;
					try {
						$dropbox->chunkedUpload($updraft_dir.'/'.$file, '', $ufile, true, $dropbox_wanted, $upload_id, array($this, 'chunked_callback'));
					} catch (Exception $e) {
						$msg = $e->getMessage();
						if (preg_match('/Upload with upload_id .* already completed/', $msg)) {
							$updraftplus->log('Dropbox returned an error, but apparently indicating previous success: '.$msg);
						} else {
							$updraftplus->log('Dropbox error: '.$msg.' (line: '.$e->getLine().', file: '.$e->getFile().')');
							$updraftplus->log('Dropbox '.sprintf(__('error: failed to upload file to %s (see log file for more)', 'updraftplus'), $ufile), 'error');
							$file_success = 0;
							if (strpos($msg, 'select/poll returned error') !== false && $this->upload_tick > 0 && time() - $this->upload_tick > 800) {
								$updraftplus->reschedule(60);
								$updraftplus->log("Select/poll returned after a long time: scheduling a resumption and terminating for now");
								$updraftplus->record_still_alive();
								die;
							}
						}
					}
				} else {
					$msg = $e->getMessage();
					if (preg_match('/Upload with upload_id .* already completed/', $msg)) {
						$updraftplus->log('Dropbox returned an error, but apparently indicating previous success: '.$msg);
					} else {
						$updraftplus->log('Dropbox error: '.$msg);
						$updraftplus->log('Dropbox '.sprintf(__('error: failed to upload file to %s (see log file for more)', 'updraftplus'), $ufile), 'error');
						$file_success = 0;
						if (strpos($msg, 'select/poll returned error') !== false && $this->upload_tick > 0 && time() - $this->upload_tick > 800) {
							$updraftplus->reschedule(60);
							$updraftplus->log("Select/poll returned after a long time: scheduling a resumption and terminating for now");
							$updraftplus->record_still_alive();
							die;
						}
					}
				}
			}
			if ($file_success) {
				$updraftplus->uploaded_file($file);
				$microtime_elapsed = microtime(true)-$microtime;
				$speedps = ($microtime_elapsed > 0) ? $filesize/$microtime_elapsed : 0;
				$speed = sprintf("%.2d", $filesize)." KB in ".sprintf("%.2d", $microtime_elapsed)."s (".sprintf("%.2d", $speedps)." KB/s)";
				$updraftplus->log("Dropbox: File upload success (".$file."): $speed");
				$this->jobdata_delete('upload_id_'.$hash, 'updraf_dbid_'.$hash);
				$this->jobdata_delete('upload_offset_'.$hash, 'updraf_dbof_'.$hash);
			}

		}

		return null;

	}

	/**
	 * This method gets a list of files from the remote stoage that match the string passed in and returns an array of backups
	 *
	 * @param  string $match a substring to require (tested via strpos() !== false)
	 * @return array
	 */
	public function listfiles($match = 'backup_') {

		$opts = $this->get_options();

		if (empty($opts['tk_access_token'])) return new WP_Error('no_settings', __('No settings were found', 'updraftplus').' (dropbox)');

		global $updraftplus;
		try {
			$dropbox = $this->bootstrap();
		} catch (Exception $e) {
			$updraftplus->log('Dropbox access error: '.$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			return new WP_Error('access_error', $e->getMessage());
		}

		$searchpath = '/'.untrailingslashit(apply_filters('updraftplus_dropbox_modpath', '', $this));

		try {
			/* Some users could have a large amount of backups, the max search is 1000 entries we should continue to search until there are no more entries to bring back. */
			$start = 0;
			$matches = array();

			while (true) {
				$search = $dropbox->search($match, $searchpath, 1000, $start);
				if (empty($search['code']) || 200 != $search['code']) return new WP_Error('response_error', sprintf(__('%s returned an unexpected HTTP response: %s', 'updraftplus'), 'Dropbox', $search['code']), $search['body']);

				if (empty($search['body'])) return array();

				if (isset($search['body']->matches) && is_array($search['body']->matches)) {
					$matches = array_merge($matches, $search['body']->matches);
				} elseif (is_array($search['body'])) {
					$matches = $search['body'];
				} else {
					break;
				}

				if (isset($search['body']->more) && true == $search['body']->more && isset($search['body']->start)) {
					$start = $search['body']->start;
				} else {
					break;
				}
			}

		} catch (Exception $e) {
			$updraftplus->log('Dropbox error: '.$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			// The most likely cause of a search_error is specifying a non-existent path, which should just result in an empty result set.
// return new WP_Error('search_error', $e->getMessage());
			return array();
		}

		$results = array();

		foreach ($matches as $item) {
			// 28 June 2017 - https://blogs.dropbox.com/developers/2016/06/api-v1-deprecated/
			if (defined('UPDRAFTPLUS_DROPBOX_API_V1') && UPDRAFTPLUS_DROPBOX_API_V1 && time() < 1498608000) {
				if (!is_object($item)) continue;

				if ((!isset($item->bytes) || $item->bytes > 0) && empty($item->is_dir) && !empty($item->path) && 0 === strpos($item->path, $searchpath)) {

					$path = substr($item->path, strlen($searchpath));
					if ('/' == substr($path, 0, 1)) $path = substr($path, 1);

					// Ones in subfolders are not wanted
					if (false !== strpos($path, '/')) continue;

					$result = array('name' => $path);
					if (!empty($item->bytes)) $result['size'] = $item->bytes;

					$results[] = $result;

				}
			} else {
				$item = $item->metadata;
				if (!is_object($item)) continue;

				if ((!isset($item->size) || $item->size > 0) && 'folder' != $item->{'.tag'} && !empty($item->path_display) && 0 === strpos($item->path_display, $searchpath)) {

					$path = substr($item->path_display, strlen($searchpath));
					if ('/' == substr($path, 0, 1)) $path = substr($path, 1);

					// Ones in subfolders are not wanted
					if (false !== strpos($path, '/')) continue;

					$result = array('name' => $path);
					if (!empty($item->size)) $result['size'] = $item->size;

					$results[] = $result;
				}
			}

		}

		return $results;
	}

	public function defaults() {
		return apply_filters('updraftplus_dropbox_defaults', array('Z3Q3ZmkwbnplNHA0Zzlx', 'bTY0bm9iNmY4eWhjODRt'));
	}

	public function delete($files, $data = null, $sizeinfo = array()) {

		global $updraftplus;
		if (is_string($files)) $files = array($files);

		$opts = $this->get_options();

		if (empty($opts['tk_access_token'])) {
			$updraftplus->log('You do not appear to be authenticated with Dropbox (3)');
			$updraftplus->log(sprintf(__('You do not appear to be authenticated with %s (whilst deleting)', 'updraftplus'), 'Dropbox'), 'warning');
			return false;
		}

		try {
			$dropbox = $this->bootstrap();
		} catch (Exception $e) {
			$updraftplus->log('Dropbox error: '.$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			$updraftplus->log(sprintf(__('Failed to access %s when deleting (see log file for more)', 'updraftplus'), 'Dropbox'), 'warning');
			return false;
		}
		if (false === $dropbox) return false;

		foreach ($files as $file) {
			$ufile = apply_filters('updraftplus_dropbox_modpath', $file, $this);
			$updraftplus->log("Dropbox: request deletion: $ufile");

			try {
				$dropbox->delete($ufile);
				$file_success = 1;
			} catch (Exception $e) {
				$updraftplus->log('Dropbox error: '.$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			}

			if (isset($file_success)) {
				$updraftplus->log('Dropbox: delete succeeded');
			} else {
				return false;
			}
		}

	}

	public function download($file) {

		global $updraftplus;

		$opts = $this->get_options();

		if (empty($opts['tk_access_token'])) {
			$updraftplus->log('You do not appear to be authenticated with Dropbox (4)');
			$updraftplus->log(sprintf(__('You do not appear to be authenticated with %s', 'updraftplus'), 'Dropbox'), 'error');
			return false;
		}

		try {
			$dropbox = $this->bootstrap();
		} catch (Exception $e) {
			$updraftplus->log('Dropbox error: '.$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			$updraftplus->log('Dropbox error: '.$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')', 'error');
			return false;
		}
		if (false === $dropbox) return false;

		$updraft_dir = $updraftplus->backups_dir_location();
		$microtime = microtime(true);

		$try_the_other_one = false;

		$ufile = apply_filters('updraftplus_dropbox_modpath', $file, $this);

		try {
			$get = $dropbox->getFile($ufile, $updraft_dir.'/'.$file, null, true);
		} catch (Exception $e) {
			// TODO: Remove this October 2013 (we stored in the wrong place for a while...)
			$try_the_other_one = true;
			$possible_error = $e->getMessage();
			$updraftplus->log('Dropbox error: '.$e);
			$get = false;
		}

		// TODO: Remove this October 2013 (we stored files in the wrong place for a while...)
		if ($try_the_other_one) {
			$dropbox_folder = trailingslashit($opts['folder']);
			try {
				$get = $dropbox->getFile($dropbox_folder.'/'.$file, $updraft_dir.'/'.$file, null, true);
				if (isset($get['response']['body'])) {
					$updraftplus->log("Dropbox: downloaded ".round(strlen($get['response']['body'])/1024, 1).' KB');
				}
			} catch (Exception $e) {
				$updraftplus->log($possible_error, 'error');
				$updraftplus->log($e->getMessage(), 'error');
				$get = false;
			}
		}

		return $get;

	}

	public function config_print() {
	
		$opts = $this->get_options();

		$classes = $this->get_css_classes();
		?>
			<tr class="<?php echo $classes;?>">
				<td></td>
				<td>
				<img alt="<?php _e(sprintf(__('%s logo', 'updraftplus'), 'Dropbox')); ?>" src="<?php echo UPDRAFTPLUS_URL.'/images/dropbox-logo.png'; ?>">
				<p><em><?php printf(__('%s is a great choice, because UpdraftPlus supports chunked uploads - no matter how big your site is, UpdraftPlus can upload it a little at a time, and not get thwarted by timeouts.', 'updraftplus'), 'Dropbox');?></em></p>
				</td>
			</tr>

			<tr class="<?php echo $classes;?>">
				<th></th>
				<td>
					<?php
						global $updraftplus_admin;
						$updraftplus_admin->curl_check('Dropbox', false, 'dropbox');
					?>
				</td>
			</tr>

			<?php

				$defmsg = '<tr class="'.$classes.'"><td></td><td><strong>'.__('Need to use sub-folders?', 'updraftplus').'</strong> '.__('Backups are saved in', 'updraftplus').' apps/UpdraftPlus. '.__('If you back up several sites into the same Dropbox and want to organise with sub-folders, then ', 'updraftplus').'<a href="https://updraftplus.com/shop/">'.__("there's an add-on for that.", 'updraftplus').'</a></td></tr>';

				$defmsg = '<tr class="'.$classes.'"><td></td><td><strong>'.__('Need to use sub-folders?', 'updraftplus').'</strong> '.__('Backups are saved in', 'updraftplus').' apps/UpdraftPlus. '.__('If you back up several sites into the same Dropbox and want to organise with sub-folders, then ', 'updraftplus').'<a href="'.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/").'">'.__("there's an add-on for that.", 'updraftplus').'</a></td></tr>';
				
				$extra_config = apply_filters('updraftplus_dropbox_extra_config', $defmsg, $this);
				
				echo $extra_config;
				?>

			<tr class="<?php echo $classes;?>">
				<th><?php echo sprintf(__('Authenticate with %s', 'updraftplus'), __('Dropbox', 'updraftplus'));?>:</th>
				<td><p>
					<?php
						$rt = (empty($opts['tk_access_token'])) ? '' : $opts['tk_access_token'];
						if (!empty($rt)) {
						echo "<p><strong>".__('(You appear to be already authenticated).', 'updraftplus')."</strong>";
						echo ' <a class="updraft_deauthlink" href="';
echo UpdraftPlus_Options::admin_page_url();
echo '?page=updraftplus&action=updraftmethod-dropbox-auth&updraftplus_dropboxauth=deauth&nonce='.wp_create_nonce('dropbox_deauth_nonce').'">';
echo sprintf(__('Follow this link to  deauthenticate with %s.', 'updraftplus'), __('Dropbox', 'updraftplus'));
echo '</a></p>';
						}
						echo '<p><a class="updraft_authlink" href="';
echo UpdraftPlus_Options::admin_page_url();
echo '?page=updraftplus&action=updraftmethod-dropbox-auth&updraftplus_dropboxauth=doit">';
echo sprintf(__('<strong>After</strong> you have saved your settings (by clicking \'Save Changes\' below), then come back here once and click this link to complete authentication with %s.', 'updraftplus'), __('Dropbox', 'updraftplus'));
echo '</a></p>';
					?>
				</p>
				<?php
					if (!empty($rt)) {
					$ownername = empty($opts['ownername']) ? '' : $opts['ownername'];
					if (!empty($ownername)) {
						echo '<br>'.sprintf(__("Account holder's name: %s.", 'updraftplus'), htmlspecialchars($opts['ownername'])).' ';
					}
					}
				?>
				</td>
			</tr>

			<?php
			// Legacy: only show this next setting to old users who had a setting stored
			if (!empty($opts['appkey']) || (defined('UPDRAFTPLUS_CUSTOM_DROPBOX_APP') && UPDRAFTPLUS_CUSTOM_DROPBOX_APP)) {

				$appkey = empty($opts['appkey']) ? '' : $opts['appkey'];
				$secret = empty($opts['secret']) ? '' : $opts['secret'];
			?>
				<tr class="<?php echo $classes;?>">
					<th></th>
					<td>
						<?php echo '<p>'.htmlspecialchars(__('You must add the following as the authorised redirect URI in your Dropbox console (under "API Settings") when asked', 'updraftplus')).': <kbd>'.UpdraftPlus_Options::admin_page_url().'?page=updraftplus&action=updraftmethod-dropbox-auth</kbd></p>'; ?>
					</td>
				</tr>
				<tr class="<?php echo $classes;?>">
					<th>Your Dropbox App Key:</th>
					<td><input type="text" autocomplete="off" style="width:332px" <?php $this->output_settings_field_name_and_id('appkey');?> value="<?php echo esc_attr($appkey); ?>" /></td>
				</tr>
				<tr class="<?php echo $classes;?>">
					<th>Your Dropbox App Secret:</th>
					<td><input type="text" style="width:332px" <?php $this->output_settings_field_name_and_id('secret');?> value="<?php echo esc_attr($secret); ?>" /></td>
				</tr>

			<?php } elseif (false === strpos($extra_config, '<input')) {
				// We need to make sure that it is not the case that the module has no settings whatsoever - this can result in the module being effectively invisible.
				?>
				<input type="hidden" <?php $this->output_settings_field_name_and_id('tk_access_token');?> value="0">
			<?php } ?>
		<?php
	}

	public function action_auth() {
		if (isset($_GET['updraftplus_dropboxauth'])) {
			// Clear out the existing credentials
			if ('doit' == $_GET['updraftplus_dropboxauth']) {
				$opts = $this->get_options();
				$opts['tk_access_token'] = '';
				unset($opts['tk_request_token']);
				$opts['ownername'] = '';
				$this->set_options($opts, true);
			} elseif ('deauth' == $_GET['updraftplus_dropboxauth'] && isset($_GET['nonce']) && wp_verify_nonce($_GET['nonce'], 'dropbox_deauth_nonce')) {
					
				try {
					$this->bootstrap(true);
				} catch (Exception $e) {
					global $updraftplus;
					$updraftplus->log(sprintf(__("%s error: %s", 'updraftplus'), sprintf(__("%s de-authentication", 'updraftplus'), 'Dropbox'), $e->getMessage()), 'error');
				}
				
				return;
				
			}
		} elseif (isset($_GET['state'])) {
			// Get the CSRF from setting and check it matches the one returned if it does no CSRF attack has happened
			$opts = $this->get_options();
			$csrf = $opts['CSRF'];
			$state = stripslashes($_GET['state']);
			if (strcmp($csrf, $state) == 0) {
				$opts['CSRF'] = '';
				if (isset($_GET['code'])) {
					// set code so it can be accessed in the next authentication step
					$opts['code'] = stripslashes($_GET['code']);
					$this->set_options($opts, true);
					$this->auth_token();
				}
			} else {
				error_log("UpdraftPlus: CSRF comparison failure: $csrf != $state");
			}
		}
		try {
			$this->auth_request();
		} catch (Exception $e) {
			global $updraftplus;
			$updraftplus->log(sprintf(__("%s error: %s", 'updraftplus'), sprintf(__("%s authentication", 'updraftplus'), 'Dropbox'), $e->getMessage()), 'error');
		}
	}

	public function show_authed_admin_warning() {
		global $updraftplus_admin, $updraftplus;

		$dropbox = $this->bootstrap();
		if (false === $dropbox) return false;

		try {
			$account_info = $dropbox->accountInfo();
		} catch (Exception $e) {
			$accountinfo_err = sprintf(__("%s error: %s", 'updraftplus'), 'Dropbox', $e->getMessage()).' ('.$e->getCode().')';
		}

		$message = "<strong>".__('Success:', 'updraftplus').'</strong> '.sprintf(__('you have authenticated your %s account', 'updraftplus'), 'Dropbox');
		// We log, because otherwise people get confused by the most recent log message of 'Parameter not found: oauth_token' and raise support requests
		$updraftplus->log(__('Success:', 'updraftplus').' '.sprintf(__('you have authenticated your %s account', 'updraftplus'), 'Dropbox'));

		if (empty($account_info['code']) || "200" != $account_info['code']) {
			$message .= " (".__('though part of the returned information was not as expected - your mileage may vary', 'updraftplus').") ". $account_info['code'];
			if (!empty($accountinfo_err)) $message .= "<br>".htmlspecialchars($accountinfo_err);
		} else {
			$body = $account_info['body'];
			$name = '';
			if (isset($body->display_name)) {
				$name = $body->display_name;
			} else {
				$name = $body->name->display_name;
			}
			$message .= ". <br>".sprintf(__('Your %s account name: %s', 'updraftplus'), 'Dropbox', htmlspecialchars($name));
			$opts = $this->get_options();
			$opts['ownername'] = $name;
			$this->set_options($opts, true);

			try {
				/**
				 * Quota information is no longer provided with account information a new call to qoutaInfo must be made to get this information.
				 * 28 June 2017 - https://blogs.dropbox.com/developers/2016/06/api-v1-deprecated/
				 */
				if (defined('UPDRAFTPLUS_DROPBOX_API_V1') && UPDRAFTPLUS_DROPBOX_API_V1 && time() < 1498608000) {
					$quota_info = $account_info;
				} else {
					$quota_info = $dropbox->quotaInfo();
				}

				if (empty($quota_info['code']) || "200" != $quota_info['code']) {
					$message .= " (".__('though part of the returned information was not as expected - your mileage may vary', 'updraftplus').")". $quota_info['code'];
					if (!empty($accountinfo_err)) $message .= "<br>".htmlspecialchars($accountinfo_err);
				} else {
					$body = $quota_info['body'];
					if (isset($body->quota_info)) {
						$quota_info = $body->quota_info;
						$total_quota = max($quota_info->quota, 1);
						$normal_quota = $quota_info->normal;
						$shared_quota = $quota_info->shared;
						$available_quota =$total_quota - ($normal_quota + $shared_quota);
						$used_perc = round(($normal_quota + $shared_quota)*100/$total_quota, 1);
						$message .= ' <br>'.sprintf(__('Your %s quota usage: %s %% used, %s available', 'updraftplus'), 'Dropbox', $used_perc, round($available_quota/1048576, 1).' MB');
					} else {
						$total_quota = max($body->allocation->allocated, 1);
						$used = $body->used;
						/* check here to see if the account is a team account and if so use the other used value
						This will give us their total usage including their individual account and team account */
						if (isset($body->allocation->used)) $used = $body->allocation->used;
						$available_quota =$total_quota - $used;
						$used_perc = round($used*100/$total_quota, 1);
						$message .= ' <br>'.sprintf(__('Your %s quota usage: %s %% used, %s available', 'updraftplus'), 'Dropbox', $used_perc, round($available_quota/1048576, 1).' MB');
					}
				}
			} catch (Exception $e) {
				// Catch
			}

		}
		$updraftplus_admin->show_admin_warning($message);

	}

	public function auth_token() {
		$this->bootstrap();
		$opts = $this->get_options();
		if (!empty($opts['tk_access_token'])) {
			add_action('all_admin_notices', array($this, 'show_authed_admin_warning'));
		}
	}

	/**
	 * Acquire single-use authorization code
	 */
	public function auth_request() {
		$this->bootstrap();
	}

	/**
	 * This basically reproduces the relevant bits of bootstrap.php from the SDK
	 *
	 * @param  boolean $deauthenticate indicates if we should bootstrap for a deauth or auth request
	 * @return object
	 */
	public function bootstrap($deauthenticate = false) {
		if (!empty($this->dropbox_object) && !is_wp_error($this->dropbox_object)) return $this->dropbox_object;

		/*
			Use Old Dropbox API constant is used to force bootstrap to use the old API this is for users having problems. By default we will use the new Dropbox API v2 as the old version will be deprecated as of June 2017
		 */
		$dropbox_api = (defined('UPDRAFTPLUS_DROPBOX_API_V1') && UPDRAFTPLUS_DROPBOX_API_V1 && time() < 1498608000) ? 'Dropbox' : 'Dropbox2';

		include_once(UPDRAFTPLUS_DIR.'/includes/'.$dropbox_api.'/API.php');
		include_once(UPDRAFTPLUS_DIR.'/includes/'.$dropbox_api.'/Exception.php');
		include_once(UPDRAFTPLUS_DIR.'/includes/'.$dropbox_api.'/OAuth/Consumer/ConsumerAbstract.php');
		include_once(UPDRAFTPLUS_DIR.'/includes/'.$dropbox_api.'/OAuth/Storage/StorageInterface.php');
		include_once(UPDRAFTPLUS_DIR.'/includes/'.$dropbox_api.'/OAuth/Storage/Encrypter.php');
		include_once(UPDRAFTPLUS_DIR.'/includes/'.$dropbox_api.'/OAuth/Storage/WordPress.php');
		include_once(UPDRAFTPLUS_DIR.'/includes/'.$dropbox_api.'/OAuth/Consumer/Curl.php');
// require_once(UPDRAFTPLUS_DIR.'/includes/'.$dropbox_api.'/OAuth/Consumer/WordPress.php');

		$opts = $this->get_options();

		$key = empty($opts['secret']) ? '' : $opts['secret'];
		$sec = empty($opts['appkey']) ? '' : $opts['appkey'];
		
		$oauth2_id = base64_decode('aXA3NGR2Zm1sOHFteTA5');

		// Set the callback URL
		$callbackhome = UpdraftPlus_Options::admin_page_url().'?page=updraftplus&action=updraftmethod-dropbox-auth';
		$callback = defined('UPDRAFTPLUS_DROPBOX_AUTH_RETURN_URL') ? UPDRAFTPLUS_DROPBOX_AUTH_RETURN_URL : 'https://auth.updraftplus.com/auth/dropbox/';
		
		// Instantiate the Encrypter and storage objects
		$encrypter = new Dropbox_Encrypter('ThisOneDoesNotMatterBeyondLength');

		// Instantiate the storage
		$storage = new Dropbox_WordPress($encrypter, "tk_", 'updraft_dropbox', $this);

		// WordPress consumer does not yet work
		// $oauth = new Dropbox_ConsumerWordPress($sec, $key, $storage, $callback);

		// Get the DropBox API access details
		list($d2, $d1) = $this->defaults();
		if (empty($sec)) {
			$sec = base64_decode($d1);
		}

		if (empty($key)) {
			$key = base64_decode($d2);
		}

		$root = 'sandbox';
		if ('dropbox:' == substr($sec, 0, 8)) {
			$sec = substr($sec, 8);
			$root = 'dropbox';
		}
		
		try {
			$oauth = new Dropbox_Curl($sec, $oauth2_id, $key, $storage, $callback, $callbackhome, $deauthenticate);
		} catch (Exception $e) {
			global $updraftplus;
			$updraftplus->log("Dropbox Curl error: ".$e->getMessage());
			$updraftplus->log(sprintf(__("%s error: %s", 'updraftplus'), "Dropbox/Curl", $e->getMessage().' ('.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile()).')', 'error');
			return false;
		}

		if ($deauthenticate) return true;
		
		$this->dropbox_object = new UpdraftPlus_Dropbox_API($oauth, $root);
		return $this->dropbox_object;
	}
}
