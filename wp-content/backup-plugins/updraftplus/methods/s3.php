<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed.');

// Converted to multi-options (Feb 2017-) and previous options conversion removed: Yes

/**
 * This class is used by both UpdraftPlus_S3 and UpdraftPlus_S3_Compat
 */
class UpdraftPlus_S3Exception extends Exception {
	public function __construct($message, $file, $line, $code = 0) {
		parent::__construct($message, $code);
		$this->file = $file;
		$this->line = $line;
	}
}

if (!class_exists('UpdraftPlus_BackupModule')) require_once(UPDRAFTPLUS_DIR.'/methods/backup-module.php');

class UpdraftPlus_BackupModule_s3 extends UpdraftPlus_BackupModule {

	private $s3_object;

	private $got_with;

	protected $quota_used = null;

	protected $s3_exception;

	protected $download_chunk_size = 10485760;

	/**
	 * Retrieve specific options for this remote storage module
	 *
	 * @return Array - an array of options
	 */
	protected function get_config() {
		$opts = $this->get_options();
		$opts['whoweare'] = 'S3';
		$opts['whoweare_long'] = 'Amazon S3';
		$opts['key'] = 's3';
		return $opts;
	}

	/**
	 * This method overrides the parent method and lists the supported features of this remote storage option.
	 *
	 * @return Array - an array of supported features (any features not mentioned are asuumed to not be supported)
	 */
	public function get_supported_features() {
		// This options format is handled via only accessing options via $this->get_options()
		return array('multi_options');
	}

	/**
	 * Retrieve default options for this remote storage module.
	 *
	 * @return Array - an array of options
	 */
	public function get_default_options() {
		return array(
			'accesskey' => '',
			'secretkey' => '',
			'path' => '',
			'rrs' => '',
			'server_side_encryption' => '',
		);
	}

	protected function indicate_s3_class() {
		// N.B. : The classes must have different names, as if multiple remote storage options are chosen, then we could theoretically need both (if both Amazon and a compatible-S3 provider are used)
		// Conditional logic, for new AWS SDK (N.B. 3.x branch requires PHP 5.5, so we're on 2.x - requires 5.3.3)

		$opts = $this->get_config();
		$class_to_use = 'UpdraftPlus_S3';
		if (version_compare(PHP_VERSION, '5.3.3', '>=') && !empty($opts['key']) && ('s3' == $opts['key'] || 'updraftvault' == $opts['key']) && (!defined('UPDRAFTPLUS_S3_OLDLIB') || !UPDRAFTPLUS_S3_OLDLIB)) {
			$class_to_use = 'UpdraftPlus_S3_Compat';
		}

		if ('UpdraftPlus_S3_Compat' == $class_to_use) {
			if (!class_exists($class_to_use)) include_once(UPDRAFTPLUS_DIR.'/includes/S3compat.php');
		} else {
			if (!class_exists($class_to_use)) include_once(UPDRAFTPLUS_DIR.'/includes/S3.php');
		}
		return $class_to_use;
	}

	/**
	 * Get an S3 object, after setting our options
	 *
	 * @param  string  $key 		   S3 Key
	 * @param  string  $secret 		   S3 secret
	 * @param  boolean $useservercerts User server certificates
	 * @param  boolean $disableverify  Check if disableverify is enabled
	 * @param  boolean $nossl 		   Check if there is SSL or not
	 * @param  string  $endpoint 	   S3 endpoint
	 * @param  boolean $sse 		   A flag to use server side encryption
	 * @return array
	 */
	public function getS3($key, $secret, $useservercerts, $disableverify, $nossl, $endpoint = null, $sse = false) {

		if (!empty($this->s3_object) && !is_wp_error($this->s3_object)) return $this->s3_object;

		if (is_string($key)) $key = trim($key);
		if (is_string($secret)) $secret = trim($secret);

		// Saved in case the object needs recreating for the corner-case where there is no permission to look up the bucket location
		$this->got_with = array(
			'key' => $key,
			'secret' => $secret,
			'useservercerts' => $useservercerts,
			'disableverify' => $disableverify,
			'nossl' => $nossl,
			'server_side_encryption' => $sse
		);

		if (is_wp_error($key)) return $key;

		if ('' == $key || '' == $secret) {
			return new WP_Error('no_settings', __('No settings were found - please go to the Settings tab and check your settings', 'updraftplus'));
		}

		global $updraftplus;

		$use_s3_class = $this->indicate_s3_class();

		if (!class_exists('WP_HTTP_Proxy')) include_once(ABSPATH.WPINC.'/class-http.php');
		$proxy = new WP_HTTP_Proxy();

		$use_ssl = true;
		$ssl_ca = true;
		if (!$nossl) {
			$curl_version = (function_exists('curl_version')) ? curl_version() : array('features' => null);
			$curl_ssl_supported = ($curl_version['features'] & defined('CURL_VERSION_SSL') && CURL_VERSION_SSL);
			if ($curl_ssl_supported) {
				if ($disableverify) {
					$ssl_ca = false;
					$updraftplus->log("S3: Disabling verification of SSL certificates");
				} else {
					if ($useservercerts) {
						$updraftplus->log("S3: Using the server's SSL certificates");
						$ssl_ca = 'system';
					} else {
						$ssl_ca = file_exists(UPDRAFTPLUS_DIR.'/includes/cacert.pem') ? UPDRAFTPLUS_DIR.'/includes/cacert.pem' : true;
					}
				}
			} else {
				$use_ssl = false;
				$updraftplus->log("S3: Curl/SSL is not available. Communications will not be encrypted.");
			}
		} else {
			$use_ssl = false;
			$updraftplus->log("SSL was disabled via the user's preference. Communications will not be encrypted.");
		}

		try {
			$s3 = new $use_s3_class($key, $secret, $use_ssl, $ssl_ca, $endpoint);
		} catch (Exception $e) {
		
			// Catch a specific PHP engine bug - see HS#6364
			if ('UpdraftPlus_S3_Compat' == $use_s3_class && is_a($e, 'InvalidArgumentException') && false !== strpos('Invalid signature type: s3', $e->getMessage())) {
				include_once(UPDRAFTPLUS_DIR.'/includes/S3.php');
				$use_s3_class = 'UpdraftPlus_S3';
				$try_again = true;
			} else {
				$updraftplus->log(sprintf(__('%s Error: Failed to initialise', 'updraftplus'), 'S3').": ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
				$updraftplus->log(sprintf(__('%s Error: Failed to initialise', 'updraftplus'), $key), 'S3');
				return new WP_Error('s3_init_failed', sprintf(__('%s Error: Failed to initialise', 'updraftplus'), 'S3').": ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			}
		}
		
		if (!empty($try_again)) {
			try {
				$s3 = new $use_s3_class($key, $secret, $use_ssl, $ssl_ca, $endpoint);
			} catch (Exception $e) {
				$updraftplus->log(sprintf(__('%s Error: Failed to initialise', 'updraftplus'), 'S3').": ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
				$updraftplus->log(sprintf(__('%s Error: Failed to initialise', 'updraftplus'), $key), 'S3');
				return new WP_Error('s3_init_failed', sprintf(__('%s Error: Failed to initialise', 'updraftplus'), 'S3').": ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			}
			$updraftplus->log("S3: Hit a PHP engine bug - had to switch to the older S3 library (which is incompatible with signatureV4, which may cause problems later on if using a region that requires it)");
		}

		if ($proxy->is_enabled()) {
			// WP_HTTP_Proxy returns empty strings where we want nulls
			$user = $proxy->username();
			if (empty($user)) {
				$user = null;
				$pass = null;
			} else {
				$pass = $proxy->password();
				if (empty($pass)) $pass = null;
			}
			$port = (int) $proxy->port();
			if (empty($port)) $port = 8080;
			$s3->setProxy($proxy->host(), $user, $pass, CURLPROXY_HTTP, $port);
		}

		if (method_exists($s3, 'setServerSideEncryption') && (is_a($this, 'UpdraftPlus_BackupModule_updraftvault') || $sse)) $s3->setServerSideEncryption('AES256');

		$this->s3_object = $s3;

		return $this->s3_object;
	}

	protected function set_region($obj, $region, $bucket_name = '') {
		global $updraftplus;
		switch ($region) {
			case 'EU':
			case 'eu-west-1':
			$endpoint = 's3-eu-west-1.amazonaws.com';
				break;
			case 'us-east-1':
			$endpoint = 's3.amazonaws.com';
				break;
			case 'us-west-1':
			case 'us-east-2':
			case 'us-west-2':
			case 'eu-west-2':
			case 'ap-southeast-1':
			case 'ap-southeast-2':
			case 'ap-northeast-1':
			case 'ap-northeast-2':
			case 'sa-east-1':
			case 'ca-central-1':
			case 'us-gov-west-1':
			case 'eu-central-1':
			$endpoint = 's3-'.$region.'.amazonaws.com';
				break;
			case 'ap-south-1':
			case 'cn-north-1':
			$endpoint = 's3.'.$region.'.amazonaws.com.cn';
				break;
			default:
				break;
		}

		if (isset($endpoint)) {
			if (is_a($obj, 'UpdraftPlus_S3_Compat')) {
				$updraftplus->log("Set region: $region");
				$obj->setRegion($region);
				return;
			}

			$updraftplus->log("Set endpoint: $endpoint");

			return $obj->setEndpoint($endpoint);
		}
	}

	/**
	 * Perform the upload of backup archives
	 *
	 * @param Array $backup_array - a list of file names (basenames) (within UD's directory) to be uploaded
	 *
	 * @return Mixed - return (boolean)false ot indicate failure, or anything else to have it passed back at the delete stage (most useful for a storage object).
	 */
	public function backup($backup_array) {

		global $updraftplus;

		$config = $this->get_config();

		if (empty($config['accesskey']) && !empty($config['error_message'])) {
			$err = new WP_Error('no_settings', $config['error_message']);
			return $updraftplus->log_wp_error($err, false, true);
		}

		$whoweare = $config['whoweare'];
		$whoweare_key = $config['key'];
		$whoweare_keys = substr($whoweare_key, 0, 3);
		$sse = empty($config['server_side_encryption']) ? false : true;

		$s3 = $this->getS3(
			$config['accesskey'],
			$config['secretkey'],
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_useservercerts'),
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_disableverify'),
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_nossl'),
			null,
			$sse
		);

		if (is_wp_error($s3)) return $updraftplus->log_wp_error($s3, false, true);

		if (is_a($s3, 'UpdraftPlus_S3_Compat') && !class_exists('XMLWriter')) {
			$updraftplus->log('The required XMLWriter PHP module is not installed');
			$updraftplus->log(sprintf(__('The required %s PHP module is not installed - ask your web hosting company to enable it', 'updraftplus'), 'XMLWriter'), 'error');
			return false;
		}

		$bucket_name = untrailingslashit($config['path']);
		$bucket_path = "";
		$orig_bucket_name = $bucket_name;

		if (preg_match("#^([^/]+)/(.*)$#", $bucket_name, $bmatches)) {
			$bucket_name = $bmatches[1];
			$bucket_path = $bmatches[2]."/";
		}

		list($s3, $bucket_exists, $region) = $this->get_bucket_access($s3, $config, $bucket_name, $bucket_path);

		// See if we can detect the region (which implies the bucket exists and is ours), or if not create it
		if ($bucket_exists) {

			$updraft_dir = trailingslashit($updraftplus->backups_dir_location());

			foreach ($backup_array as $key => $file) {

				// We upload in 5MB chunks to allow more efficient resuming and hence uploading of larger files
				// N.B.: 5MB is Amazon's minimum. So don't go lower or you'll break it.
				$fullpath = $updraft_dir.$file;
				$orig_file_size = filesize($fullpath);
				
				if (!file_exists($fullpath)) {
					$updraftplus->log("File not found: $file: $whoweare: ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile());
					$updraftplus->log("$file: ".sprintf(__('Error: %s', 'updraftplus'), __('File not found', 'updraftplus')), 'error');
					continue;
				}

				if (isset($config['quota']) && method_exists($this, 's3_get_quota_info')) {
					$quota_used = $this->s3_get_quota_info('numeric', $config['quota']);
					if (false === $quota_used) {
						$updraftplus->log("Quota usage: count failed");
					} else {
						$this->quota_used = $quota_used;
						if ($config['quota'] - $this->quota_used < $orig_file_size) {
							if (method_exists($this, 's3_out_of_quota')) call_user_func(array($this, 's3_out_of_quota'), $config['quota'], $this->quota_used, $orig_file_size);
							continue;
						} else {
							// We don't need to log this always - the s3_out_of_quota method will do its own logging
							$updraftplus->log("$whoweare: Quota is available: used=$quota_used (".round($quota_used/1048576, 1)." MB), total=".$config['quota']." (".round($config['quota']/1048576, 1)." MB), needed=$orig_file_size (".round($orig_file_size/1048576, 1)." MB)");
						}
					}
				}

				$chunks = floor($orig_file_size / 5242880);
				// There will be a remnant unless the file size was exactly on a 5MB boundary
				if ($orig_file_size % 5242880 > 0) $chunks++;
				$hash = md5($file);

				$updraftplus->log("$whoweare upload ($region): $file (chunks: $chunks) -> $whoweare_key://$bucket_name/$bucket_path$file");

				$filepath = $bucket_path.$file;

				// This is extra code for the 1-chunk case, but less overhead (no bothering with job data)
				if ($chunks < 2) {
					$s3->setExceptions(true);
					try {
						if (!$s3->putObjectFile($fullpath, $bucket_name, $filepath, 'private', array(), array(), apply_filters('updraft_'.$whoweare_key.'_storageclass', 'STANDARD', $s3, $config))) {
							$updraftplus->log("$whoweare regular upload: failed ($fullpath)");
							$updraftplus->log("$file: ".sprintf(__('%s Error: Failed to upload', 'updraftplus'), $whoweare), 'error');
						} else {
							$this->quota_used += $orig_file_size;
							if (method_exists($this, 's3_record_quota_info')) $this->s3_record_quota_info($this->quota_used, $config['quota']);
							$extra_log = '';
							if (method_exists($this, 's3_get_quota_info')) {
								$extra_log = ', quota used now: '.round($this->quota_used / 1048576, 1).' MB';
							}
							$updraftplus->log("$whoweare regular upload: success$extra_log");
							$updraftplus->uploaded_file($file);
						}
					} catch (Exception $e) {
						$updraftplus->log("$file: ".sprintf(__('%s Error: Failed to upload', 'updraftplus'), $whoweare).": ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile());
						$updraftplus->log("$file: ".sprintf(__('%s Error: Failed to upload', 'updraftplus'), $whoweare), 'error');
					}
					$s3->setExceptions(false);
				} else {

					// Retrieve the upload ID
					$upload_id = $this->jobdata_get($hash.'_uid', null, "upd_${whoweare_keys}_${hash}_uid");
					if (empty($upload_id)) {
						$s3->setExceptions(true);
						try {
							$upload_id = $s3->initiateMultipartUpload($bucket_name, $filepath, 'private', array(), array(), apply_filters('updraft_'.$whoweare_key.'_storageclass', 'STANDARD', $s3, $config));
						} catch (Exception $e) {
							$updraftplus->log("$whoweare error whilst trying initiateMultipartUpload: ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
							$upload_id = false;
						}
						$s3->setExceptions(false);

						if (empty($upload_id)) {
							$updraftplus->log("$whoweare upload: failed: could not get uploadId for multipart upload ($filepath)");
							$updraftplus->log(sprintf(__("%s upload: getting uploadID for multipart upload failed - see log file for more details", 'updraftplus'), $whoweare), 'error');
							continue;
						} else {
							$updraftplus->log("$whoweare chunked upload: got multipart ID: $upload_id");
							$this->jobdata_set($hash.'_uid', $upload_id);
						}
					} else {
						$updraftplus->log("$whoweare chunked upload: retrieved previously obtained multipart ID: $upload_id");
					}

					$successes = 0;
					$etags = array();
					for ($i = 1; $i <= $chunks; $i++) {
						$etag = $this->jobdata_get($hash.'_etag_'.$i, null, "ud_${whoweare_keys}_${hash}_e$i");
						if (strlen($etag) > 0) {
							$updraftplus->log("$whoweare chunk $i: was already completed (etag: $etag)");
							$successes++;
							array_push($etags, $etag);
						} else {
							// Sanity check: we've seen a case where an overlap was truncating the file from underneath us
							if (filesize($fullpath) < $orig_file_size) {
								$updraftplus->log("$whoweare error: $key: chunk $i: file was truncated underneath us (orig_size=$orig_file_size, now_size=".filesize($fullpath).")");
								$updraftplus->log(sprintf(__('%s error: file %s was shortened unexpectedly', 'updraftplus'), $whoweare, $fullpath), 'error');
							}
							$etag = $s3->uploadPart($bucket_name, $filepath, $upload_id, $fullpath, $i);
							if (false !== $etag && is_string($etag)) {
								$updraftplus->record_uploaded_chunk(round(100*$i/$chunks, 1), "$i, $etag", $fullpath);
								array_push($etags, $etag);
								$this->jobdata_set($hash.'_etag_'.$i, $etag);
								$successes++;
							} else {
								$updraftplus->log("$whoweare chunk $i: upload failed");
								$updraftplus->log(sprintf(__("%s chunk %s: upload failed", 'updraftplus'), $whoweare, $i), 'error');
							}
						}
					}
					if ($successes >= $chunks) {
						$updraftplus->log("$whoweare upload: all chunks uploaded; will now instruct $whoweare to re-assemble");

						$s3->setExceptions(true);
						try {
							if ($s3->completeMultipartUpload($bucket_name, $filepath, $upload_id, $etags)) {
								$updraftplus->log("$whoweare upload ($key): re-assembly succeeded");
								$updraftplus->uploaded_file($file);
								$this->quota_used += $orig_file_size;
								if (method_exists($this, 's3_record_quota_info')) $this->s3_record_quota_info($this->quota_used, $config['quota']);
							} else {
								$updraftplus->log("$whoweare upload ($key): re-assembly failed ($file)");
								$updraftplus->log(sprintf(__('%s upload (%s): re-assembly failed (see log for more details)', 'updraftplus'), $whoweare, $key), 'error');
							}
						} catch (Exception $e) {
							$updraftplus->log("$whoweare re-assembly error ($key): ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
							$updraftplus->log($e->getMessage().": ".sprintf(__('%s re-assembly error (%s): (see log file for more)', 'updraftplus'), $whoweare, $e->getMessage()), 'error');
						}
						// Remember to unset, as the deletion code later reuses the object
						$s3->setExceptions(false);
					} else {
						$updraftplus->log("$whoweare upload: upload was not completely successful on this run");
					}
				}
			}
			
			// Allows counting of the final quota accurately
			if (method_exists($this, 's3_prune_retained_backups_finished')) {
				add_action('updraftplus_prune_retained_backups_finished', array($this, 's3_prune_retained_backups_finished'));
			}
			
			return array('s3_object' => $s3, 's3_orig_bucket_name' => $orig_bucket_name);
		} else {
		
			$extra_text = empty($this->s3_exception) ? '' : ' '.$this->s3_exception->getMessage().' (line: '.$this->s3_exception->getLine().', file: '.$this->s3_exception->getFile().')';
			$extra_text_short = empty($this->s3_exception) ? '' : ' '.$this->s3_exception->getMessage();
		
			$updraftplus->log("$whoweare Error: Failed to access bucket $bucket_name.".$extra_text);
			$updraftplus->log(sprintf(__('%s Error: Failed to access bucket %s. Check your permissions and credentials.', 'updraftplus'), $whoweare, $bucket_name).$extra_text_short, 'error');
		}
	}
	
	public function listfiles($match = 'backup_') {
		$config = $this->get_config();
		return $this->listfiles_with_path($config['path'], $match);
	}
	
	protected function possibly_wait_for_bucket_or_user($config, $s3) {
		if (!empty($config['is_new_bucket'])) {
			if (method_exists($s3, 'waitForBucket')) {
				$s3->setExceptions(true);
				try {
					$s3->waitForBucket($bucket_name);
				} catch (Exception $e) {
					// This seems to often happen - we get a 403 on a newly created user/bucket pair, even though the bucket was already waited for by the creator
					// We could just sleep() - a sleep(5) seems to do it. However, given that it's a new bucket, that's unnecessary.
					$s3->setExceptions(false);
					return array();
				}
				$s3->setExceptions(false);
			} else {
				sleep(4);
			}
		} elseif (!empty($config['is_new_user'])) {
			// A crude waiter, because the AWS toolkit does not have one for IAM propagation - basically, loop around a few times whilst the access attempt still fails
			$attempt_flag = 0;
			while ($attempt_flag < 5) {

				$attempt_flag++;
				if (@$s3->getBucketLocation($bucket_name)) {
					$attempt_flag = 100;
				} else {

					sleep($attempt_flag*1.5 + 1);
					
					// Get the bucket object again... because, for some reason, the AWS PHP SDK (at least on the current version we're using, March 2016) calculates an incorrect signature on subsequent attempts
					$this->s3_object = null;
					$s3 = $this->getS3(
						$config['accesskey'],
						$config['secretkey'],
						UpdraftPlus_Options::get_updraft_option('updraft_ssl_useservercerts'),
						UpdraftPlus_Options::get_updraft_option('updraft_ssl_disableverify'),
						UpdraftPlus_Options::get_updraft_option('updraft_ssl_nossl'),
						null,
						$sse
					);

					if (is_wp_error($s3)) return $s3;
					if (!is_a($s3, 'UpdraftPlus_S3') && !is_a($s3, 'UpdraftPlus_S3_Compat')) return new WP_Error('no_s3object', 'Failed to gain access to '.$config['whoweare']);
					
				}
			}
		}
		
		return $s3;
	}
	
	/**
	 * The purpose of splitting this into a separate method, is to also allow listing with a different path
	 *
	 * @param  string  $path 			   Path to check
	 * @param  string  $match 			   THe match for idetifying the bucket name
	 * @param  boolean $include_subfolders Check if list file need to include sub folders
	 * @return array
	 */
	public function listfiles_with_path($path, $match = 'backup_', $include_subfolders = false) {
		
		$bucket_name = untrailingslashit($path);
		$bucket_path = '';

		if (preg_match("#^([^/]+)/(.*)$#", $bucket_name, $bmatches)) {
			$bucket_name = $bmatches[1];
			$bucket_path = trailingslashit($bmatches[2]);
		}

		$config = $this->get_config();
		
		global $updraftplus;
		
		$whoweare = $config['whoweare'];
		$whoweare_key = $config['key'];
		$sse = empty($config['server_side_encryption']) ? false : true;

		$s3 = $this->getS3(
			$config['accesskey'],
			$config['secretkey'],
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_useservercerts'),
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_disableverify'),
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_nossl'),
			null,
			$sse
		);

		if (is_wp_error($s3)) return $s3;
		if (!is_a($s3, 'UpdraftPlus_S3') && !is_a($s3, 'UpdraftPlus_S3_Compat')) return new WP_Error('no_s3object', 'Failed to gain access to '.$config['whoweare']);
		
		$s3 = $this->possibly_wait_for_bucket_or_user($config, $s3);
		if (!is_a($s3, 'UpdraftPlus_S3') && !is_a($s3, 'UpdraftPlus_S3_Compat')) return $s3;
		
		list($s3, $bucket_exists, $region) = $this->get_bucket_access($s3, $config, $bucket_name, $bucket_path);

		/*
		$region = ($config['key'] == 'dreamobjects' || $config['key'] == 's3generic') ? 'n/a' : @$s3->getBucketLocation($bucket_name);
		if (!empty($region)) {
			$this->set_region($s3, $region, $bucket_name);
		} else {
			# Final thing to attempt - see if it was just the location request that failed
			$s3 = $this->use_dns_bucket_name($s3, $bucket_name);
			if (false === ($gb = @$s3->getBucket($bucket_name, $bucket_path, null, 1))) {
				$updraftplus->log("$whoweare Error: Failed to access bucket $bucket_name. Check your permissions and credentials.");
				return new WP_Error('bucket_not_accessed', sprintf(__('%s Error: Failed to access bucket %s. Check your permissions and credentials.','updraftplus'),$whoweare, $bucket_name));
			}
		}
		*/

		$bucket = $s3->getBucket($bucket_name, $bucket_path.$match);

		if (!is_array($bucket)) return array();

		$results = array();

		foreach ($bucket as $key => $object) {
			if (!is_array($object) || empty($object['name'])) continue;
			if (isset($object['size']) && 0 == $object['size']) continue;

			if ($bucket_path) {
				if (0 !== strpos($object['name'], $bucket_path)) continue;
				$object['name'] = substr($object['name'], strlen($bucket_path));
			} else {
				if (!$include_subfolders && false !== strpos($object['name'], '/')) continue;
			}

			$result = array('name' => $object['name']);
			if (isset($object['size'])) $result['size'] = $object['size'];
			unset($bucket[$key]);
			$results[] = $result;
		}

		return $results;

	}

	public function delete($files, $s3arr = false, $sizeinfo = array()) {

		global $updraftplus;
		if (is_string($files)) $files = array($files);

		$config = $this->get_config();
		$sse = (empty($config['server_side_encryption'])) ? false : true;
		$whoweare = $config['whoweare'];

		if ($s3arr) {
			$s3 = $s3arr['s3_object'];
			$orig_bucket_name = $s3arr['s3_orig_bucket_name'];
		} else {

			$s3 = $this->getS3(
				$config['accesskey'],
				$config['secretkey'],
				UpdraftPlus_Options::get_updraft_option('updraft_ssl_useservercerts'),
				UpdraftPlus_Options::get_updraft_option('updraft_ssl_disableverify'),
				UpdraftPlus_Options::get_updraft_option('updraft_ssl_nossl'),
				null,
				$sse
			);

			if (is_wp_error($s3)) return $updraftplus->log_wp_error($s3, false, false);

			$bucket_name = untrailingslashit($config['path']);
			$orig_bucket_name = $bucket_name;

			if (preg_match("#^([^/]+)/(.*)$#", $bucket_name, $bmatches)) {
				$bucket_name = $bmatches[1];
				$bucket_path = $bmatches[2]."/";
			} else {
				$bucket_path = '';
			}
			
			list($s3, $bucket_exists, $region) = $this->get_bucket_access($s3, $config, $bucket_name, $bucket_path);

			if (!$bucket_exists) {
				$updraftplus->log("$whoweare Error: Failed to access bucket $bucket_name. Check your permissions and credentials.");
				$updraftplus->log(sprintf(__('%s Error: Failed to access bucket %s. Check your permissions and credentials.', 'updraftplus'), $whoweare, $bucket_name), 'error');
				return false;
			}
		}

		$ret = true;

		foreach ($files as $i => $file) {

			if (preg_match("#^([^/]+)/(.*)$#", $orig_bucket_name, $bmatches)) {
				$s3_bucket=$bmatches[1];
				$s3_uri = $bmatches[2]."/".$file;
			} else {
				$s3_bucket = $orig_bucket_name;
				$s3_uri = $file;
			}
			$updraftplus->log("$whoweare: Delete remote: bucket=$s3_bucket, URI=$s3_uri");

			$s3->setExceptions(true);
			try {
				if (!$s3->deleteObject($s3_bucket, $s3_uri)) {
					$updraftplus->log("$whoweare: Delete failed");
				} elseif (null !== $this->quota_used && !empty($sizeinfo[$i]) && isset($config['quota']) && method_exists($this, 's3_record_quota_info')) {
					$this->quota_used -= $sizeinfo[$i];
					$this->s3_record_quota_info($this->quota_used, $config['quota']);
				}
			} catch (Exception $e) {
				$updraftplus->log("$whoweare delete failed: ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
				$s3->setExceptions(false);
				$ret = false;
			}
			$s3->setExceptions(false);

		}

		return $ret;

	}

	public function download($file) {

		global $updraftplus;

		$config = $this->get_config();
		$whoweare = $config['whoweare'];
		$sse = empty($config['server_side_encryption']) ? false : true;

		$s3 = $this->getS3(
			$config['accesskey'],
			$config['secretkey'],
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_useservercerts'),
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_disableverify'),
			UpdraftPlus_Options::get_updraft_option('updraft_ssl_nossl'),
			null,
			$sse
		);
		if (is_wp_error($s3)) return $updraftplus->log_wp_error($s3, false, true);

		$bucket_name = untrailingslashit($config['path']);
		$bucket_path = "";

		if (preg_match("#^([^/]+)/(.*)$#", $bucket_name, $bmatches)) {
			$bucket_name = $bmatches[1];
			$bucket_path = $bmatches[2]."/";
		}

		
		list($s3, $bucket_exists, $region) = $this->get_bucket_access($s3, $config, $bucket_name, $bucket_path);

		if ($bucket_exists) {

			$fullpath = $updraftplus->backups_dir_location().'/'.$file;
			
			$file_info = $this->listfiles($file);
			
			if (is_array($file_info)) {
				foreach ($file_info as $finfo) {
					if ($finfo['name'] == $file) {
						$file_size = $finfo['size'];
						break;
					}
				}
			}
			
			if (!isset($file_size)) {
				$updraftplus->log("$whoweare Error: Failed to download $file. Check your permissions and credentials. Retrieved data: ".serialize($file_info));
				$updraftplus->log(sprintf(__('%s Error: Failed to download %s. Check your permissions and credentials.', 'updraftplus'), $whoweare, $file), 'error');
				return false;
			}
			
			return $updraftplus->chunked_download($file, $this, $file_size, true, $s3, $this->download_chunk_size);
			
			/*
			// The code before we switched to chunked downloads. Unfortunately the version of the AWS SDK we have to use for PHP 5.3 compatibility doesn't have callbacks, which makes it possible for multiple downloaders to start at once and over-write each-other.
			if (!$s3->getObject($bucket_name, $bucket_path.$file, $fullpath, true)) {
				$updraftplus->log("$whoweare Error: Failed to download $file. Check your permissions and credentials.");
				$updraftplus->log(sprintf(__('%s Error: Failed to download %s. Check your permissions and credentials.','updraftplus'),$whoweare, $file), 'error');
				return false;
			}
			*/
			
		} else {
			$updraftplus->log("$whoweare Error: Failed to access bucket $bucket_name. Check your permissions and credentials.");
			$updraftplus->log(sprintf(__('%s Error: Failed to access bucket %s. Check your permissions and credentials.', 'updraftplus'), $whoweare, $bucket_name), 'error');
			return false;
		}
		return true;

	}
	
	public function chunked_download($file, $headers, $s3, $fh) {

		global $updraftplus;
	
		$resume = false;
		$config = $this->get_config();
		$whoweare = $config['whoweare'];
		
		$bucket_name = untrailingslashit($config['path']);
		$bucket_path = "";

		if (preg_match("#^([^/]+)/(.*)$#", $bucket_name, $bmatches)) {
			$bucket_name = $bmatches[1];
			$bucket_path = $bmatches[2]."/";
		}
	
		if (is_array($headers) && !empty($headers['Range']) && preg_match('/bytes=(\d+)-(\d+)$/', $headers['Range'], $matches)) {
			$resume = $headers['Range'];
		}
		
		if (!$s3->getObject($bucket_name, $bucket_path.$file, $fh, $resume)) {
			$updraftplus->log("$whoweare Error: Failed to download $file. Check your permissions and credentials.");
			$updraftplus->log(sprintf(__('%s Error: Failed to download %s. Check your permissions and credentials.', 'updraftplus'), $whoweare, $file), 'error');
			return false;
		}

		// This instructs the caller to look at the file pointer's position (i.e. ftell($fh)) to work out how many bytes were written.
		return true;
	
	}

	public function config_print() {
	
		// White: https://d36cz9buwru1tt.cloudfront.net/Powered-by-Amazon-Web-Services.jpg
		$this->config_print_engine('s3', 'S3', 'Amazon S3', 'AWS', 'https://aws.amazon.com/console/', '<img src="//awsmedia.s3.amazonaws.com/AWS_logo_poweredby_black_127px.png" alt="Amazon Web Services">');
		
	}

	public function config_print_engine($key, $whoweare_short, $whoweare_long, $console_descrip, $console_url, $img_html = '', $include_endpoint_chooser = false) {

		$opts = $this->get_config();

		$classes = $this->get_css_classes();
		?>
		<tr class="<?php echo $classes;?>">
			<td></td>
			<td><?php echo $img_html; ?><p><em><?php printf(__('%s is a great choice, because UpdraftPlus supports chunked uploads - no matter how big your site is, UpdraftPlus can upload it a little at a time, and not get thwarted by timeouts.', 'updraftplus'), $whoweare_long);?></em></p>
			<?php
				if ('s3generic' == $key) {
				_e('Examples of S3-compatible storage providers:').' ';
				echo '<a href="https://www.cloudian.com">Cloudian</a>, ';
				echo '<a href="https://www.mh.connectria.com/rp/order/cloud_storage_index">Connectria</a>, ';
				echo '<a href="https://www.constant.com/cloud/storage/">Constant</a>, ';
				echo '<a href="http://www.eucalyptus.com/eucalyptus-cloud/iaas">Eucalyptus</a>, ';
				echo '<a href="http://cloud.nifty.com/storage/">Nifty</a>, ';
				echo '<a href="http://www.ntt.com/business/services/cloud/iaas/cloudn.html">Cloudn</a>';
				echo ''.__('... and many more!', 'updraftplus').'<br>';
				}
			?>
			</td>
		</tr>
		<tr class="<?php echo $classes;?>">
		<th></th>
		<td>
		<?php
			global $updraftplus_admin;

			$use_s3_class = $this->indicate_s3_class();

			if ('UpdraftPlus_S3_Compat' == $use_s3_class && !class_exists('XMLWriter')) {
			$updraftplus_admin->show_double_warning('<strong>'.__('Warning', 'updraftplus').':</strong> '. sprintf(__("Your web server's PHP installation does not included a required module (%s). Please contact your web hosting provider's support and ask for them to enable it.", 'updraftplus'), 'XMLWriter'));
			}

			if (!class_exists('SimpleXMLElement')) {
			$updraftplus_admin->show_double_warning('<strong>'.__('Warning', 'updraftplus').':</strong> '.sprintf(__("Your web server's PHP installation does not included a required module (%s). Please contact your web hosting provider's support.", 'updraftplus'), 'SimpleXMLElement').' '.sprintf(__("UpdraftPlus's %s module <strong>requires</strong> %s. Please do not file any support requests; there is no alternative.", 'updraftplus'), $whoweare_long, 'SimpleXMLElement'), $key);
			}
			$updraftplus_admin->curl_check($whoweare_long, true, $key);
		?>

		</td>
		</tr>
		<tr class="<?php echo $classes;?>">
		<th></th>
		<td>
			<p>
				<?php if ($console_url) echo sprintf(__('Get your access key and secret key <a href="%s">from your %s console</a>, then pick a (globally unique - all %s users) bucket name (letters and numbers) (and optionally a path) to use for storage. This bucket will be created for you if it does not already exist.', 'updraftplus'), $console_url, $console_descrip, $whoweare_long);?>

				<a href="<?php echo apply_filters("updraftplus_com_link", "https://updraftplus.com/faqs/i-get-ssl-certificate-errors-when-backing-up-andor-restoring/");?>"><?php _e('If you see errors about SSL certificates, then please go here for help.', 'updraftplus');?></a>

				<a href="<?php echo apply_filters("updraftplus_com_link", "https://updraftplus.com/faq-category/amazon-s3/");?>"><?php if ('s3' == $key) echo sprintf(__('Other %s FAQs.', 'updraftplus'), 'S3');?></a>
			</p>
		</td></tr>
		<?php if (!empty($include_endpoint_chooser)) { ?>
			<tr class="<?php echo $classes;?>">
				<th><?php echo sprintf(__('%s end-point', 'updraftplus'), $whoweare_short);?>:</th>
				<td>
					<?php
					if (is_array($include_endpoint_chooser)) {
						?><select data-updraft_settings_test="endpoint" <?php $this->output_settings_field_name_and_id('endpoint');?> style="width: 360px">
						<?php
						$selected_endpoint = (!empty($opts['endpoint']) && in_array($opts['endpoint'], $include_endpoint_chooser)) ? $opts['endpoint'] : $include_endpoint_chooser[0];
						foreach ($include_endpoint_chooser as $endpoint) {
							?><option value="<?php esc_attr_e($endpoint);?>" <?php if ($endpoint == $selected_endpoint) echo 'selected="selected"';?>><?php echo htmlspecialchars($endpoint);?></option><?php
						}
					} else {
						echo '</select>';
					?>
					<input data-updraft_settings_test="endpoint" type="text" style="width: 360px" <?php $this->output_settings_field_name_and_id('endpoint');?> value="<?php if (!empty($opts['endpoint'])) echo esc_attr($opts['endpoint']); ?>" />
					<?php } ?>
				</td>
			</tr>
		<?php } else { ?>
			<input data-updraft_settings_test="endpoint" type="hidden" <?php $this->output_settings_field_name_and_id('endpoint');?> value="">
		<?php } ?>
		<?php if ('s3' == $key && version_compare(PHP_VERSION, '5.3.3', '>=') && class_exists('UpdraftPlus_Addon_S3_Enhanced')) { ?>
			<tr class="<?php echo $classes;?>">
				<th></th>
				<td><?php echo apply_filters('updraft_s3_apikeysetting', '<a href="'.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/s3-enhanced/").'"><em>'.__('To create a new IAM sub-user and access key that has access only to this bucket, use this add-on.', 'updraftplus').'</em></a>'); ?></td>
			</tr>
		<?php } ?>

		<tr class="<?php echo $classes;?>">
			<th><?php echo sprintf(__('%s access key', 'updraftplus'), $whoweare_short);?>:</th>
			<td><input data-updraft_settings_test="apikey" type="text" autocomplete="off" style="width: 360px" <?php $this->output_settings_field_name_and_id('accesskey');?> value="<?php echo esc_attr($opts['accesskey']); ?>" /></td>
		</tr>
		<tr class="<?php echo $classes;?>">
			<th><?php echo sprintf(__('%s secret key', 'updraftplus'), $whoweare_short);?>:</th>
			<td><input data-updraft_settings_test="apisecret" type="<?php echo apply_filters('updraftplus_admin_secret_field_type', 'password'); ?>" autocomplete="off" style="width: 360px" <?php $this->output_settings_field_name_and_id('secretkey');?> value="<?php echo esc_attr($opts['secretkey']); ?>" /></td>
		</tr>
		<tr class="<?php echo $classes;?>">
			<th><?php echo sprintf(__('%s location', 'updraftplus'), $whoweare_short);?>:</th>
			<td><?php echo $key; ?>://<input data-updraft_settings_test="path" title="<?php echo htmlspecialchars(__('Enter only a bucket name or a bucket and path. Examples: mybucket, mybucket/mypath', 'updraftplus')); ?>" type="text" style="width: 360px" <?php $this->output_settings_field_name_and_id('path');?> value="<?php echo esc_attr($opts['path']); ?>" /></td>
		</tr>
		<?php
			do_action('updraft_'.$key.'_extra_storage_options', $this);
			echo $this->get_test_button_html($whoweare_short);
		?>

	<?php
	}

	public function credentials_test($posted_settings) {
		return $this->credentials_test_engine($this->get_config(), $posted_settings);
	}

	/**
	 * This is not pretty, but is the simplest way to accomplish the task within the pre-existing structure (no need to re-invent the wheel of code with corner-cases debugged over years)
	 *
	 * @param  object $s3 	  S3 Name
	 * @param  string $bucket S3 Bucket
	 * @return boolean
	 */
	public function use_dns_bucket_name($s3, $bucket) {
		return is_a($s3, 'UpdraftPlus_S3_Compat') ? true : $s3->useDNSBucketName(true, $bucket);
	}
	
	/**
	 * This method contains some repeated code. After getting an S3 object, it's time to see if we can access that bucket - either immediately, or via creating it, etc.
	 *
	 * @param  object         $s3       S3 name
	 * @param  array          $config   array of config details
	 * @param  string         $bucket   S3 Bucket
	 * @param  string         $path 	S3 Path
	 * @param  boolean|string $endpoint S3 end point
	 * @return array
	 */
	private function get_bucket_access($s3, $config, $bucket, $path, $endpoint = false) {
	
		$bucket_exists = false;
	
		if ('s3' == $config['key'] || 'updraftvault' == $config['key'] || 'dreamobjects' == $config['key']) {
		
			$s3->setExceptions(true);
			
			if ('dreamobjects' == $config['key']) $this->set_region($s3, $endpoint);
			
			try {
				$region = @$s3->getBucketLocation($bucket);
				// We want to distinguish between an empty region (null), and an exception or missing bucket (false)
				if (empty($region) && false !== $region) $region = null;
			} catch (Exception $e) {
				$region = false;
			}
			$s3->setExceptions(false);
		} else {
			$region = 'n/a';
		}

		// See if we can detect the region (which implies the bucket exists and is ours), or if not create it
		if (false === $region) {

			$s3->setExceptions(true);
			try {
				if (@$s3->putBucket($bucket, 'private')) {
					$bucket_exists = true;
				}
				
			} catch (Exception $e) {
				$this->s3_exception = $e;
				try {
					if ('s3' == $config['key'] && $this->use_dns_bucket_name($s3, $bucket) && false !== @$s3->getBucket($bucket, $path, null, 1)) {
						$bucket_exists = true;
					}
				} catch (Exception $e) {

					// We don't put this in a separate catch block, since we need to be compatible with PHP 5.2 still
					if (is_a($s3, 'UpdraftPlus_S3_Compat') && is_a($e, 'Aws\S3\Exception\S3Exception')) {
						$xml = $e->getResponse()->xml();

						if (!empty($xml->Code) && 'AuthorizationHeaderMalformed' == $xml->Code && !empty($xml->Region)) {

							$this->set_region($s3, $xml->Region);
							$s3->setExceptions(false);
							
							if (false !== @$s3->getBucket($bucket, $path, null, 1)) {
								$bucket_exists = true;
							}
							
						} else {
							$this->s3_exception = $e;
						}
					} else {
						$this->s3_exception = $e;
					}
				}
			
			}
			$s3->setExceptions(false);
			
		} else {
			$bucket_exists = true;
		}
		
		if ($bucket_exists) {
			if ('s3' != $config['key'] && 'updraftvault' != $config['key']) {
				$this->set_region($s3, $endpoint, $bucket);
			} elseif (!empty($region)) {
				$this->set_region($s3, $region, $bucket);
			}
		}
		
		return array($s3, $bucket_exists, $region);
		
	}

	public function credentials_test_engine($config, $posted_settings) {

		if (empty($posted_settings['apikey'])) {
			printf(__("Failure: No %s was given.", 'updraftplus'), __('API key', 'updraftplus'));
			return;
		}
		if (empty($posted_settings['apisecret'])) {
			printf(__("Failure: No %s was given.", 'updraftplus'), __('API secret', 'updraftplus'));
			return;
		}

		$key = $posted_settings['apikey'];
		$secret = stripslashes($posted_settings['apisecret']);
		$path = $posted_settings['path'];
		$useservercerts = isset($posted_settings['useservercerts']) ? absint($posted_settings['useservercerts']) : 0;
		$disableverify = isset($posted_settings['disableverify']) ? absint($posted_settings['disableverify']) : 0;
		$nossl = isset($posted_settings['nossl']) ? absint($posted_settings['nossl']) : 0;
		$endpoint = isset($posted_settings['endpoint']) ? $posted_settings['endpoint'] : '';
		$sse = empty($posted_settings['sse']) ? false : true;

		if (preg_match("#^/*([^/]+)/(.*)$#", $path, $bmatches)) {
			$bucket = $bmatches[1];
			$path = trailingslashit($bmatches[2]);
		} else {
			$bucket = $path;
			$path = "";
		}

		if (empty($bucket)) {
			_e("Failure: No bucket details were given.", 'updraftplus');
			return;
		}
		$whoweare = $config['whoweare'];

		$s3 = $this->getS3($key, $secret, $useservercerts, $disableverify, $nossl, null, $sse);
		if (is_wp_error($s3)) {
			foreach ($s3->get_error_messages() as $msg) {
				echo $msg."\n";
			}
			return;
		}

		list($s3, $bucket_exists, $region) = $this->get_bucket_access($s3, $config, $bucket, $path, $endpoint);

		$bucket_verb = '';
		if ($region && 'n/a' != $region) {
			if ('s3' == $config['key']) {
				$bucket_verb = __('Region', 'updraftplus').": $region: ";
			}
		}

		if (empty($bucket_exists)) {
		
			printf(__("Failure: We could not successfully access or create such a bucket. Please check your access credentials, and if those are correct then try another bucket name (as another %s user may already have taken your name).", 'updraftplus'), $whoweare);
			
			if (!empty($this->s3_exception)) echo "\n\n".sprintf(__('The error reported by %s was:', 'updraftplus'), $whoweare).' '.$this->s3_exception;
			if ('s3' == $config['key'] && 'AK' != substr($key, 0, 2)) echo "\n\n".sprintf(__('The AWS access key looks to be wrong (valid %s access keys begin with "AK")', 'updraftplus'), $whoweare);
		
		} else {
		
			$try_file = md5(rand());

			$s3->setExceptions(true);
			try {
				if (!$s3->putObjectString($try_file, $bucket, $path.$try_file)) {
					echo __('Failure', 'updraftplus').": ${bucket_verb}".__('We successfully accessed the bucket, but the attempt to create a file in it failed.', 'updraftplus');
				} else {
					echo __('Success', 'updraftplus').": ${bucket_verb}".__('We accessed the bucket, and were able to create files within it.', 'updraftplus').' ';
					$comm_with = ('s3generic' == $config['key']) ? $endpoint : $config['whoweare_long'];
					if ($s3->getuseSSL()) {
						echo sprintf(__('The communication with %s was encrypted.', 'updraftplus'), $comm_with);
					} else {
						echo sprintf(__('The communication with %s was not encrypted.', 'updraftplus'), $comm_with);
					}
					$create_success = true;
				}
			} catch (Exception $e) {
				echo __('Failure', 'updraftplus').": ${bucket_verb}".__('We successfully accessed the bucket, but the attempt to create a file in it failed.', 'updraftplus').' '.__('Please check your access credentials.', 'updraftplus').' ('.$e->getMessage().')';
			}

			if (!empty($create_success)) {
				try {
					@$s3->deleteObject($bucket, $path.$try_file);
				} catch (Exception $e) {
					echo ' '.__('Delete failed:', 'updraftplus').' '.$e->getMessage();
				}
			}

		}

	}
}
