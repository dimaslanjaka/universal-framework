<?php
// @codingStandardsIgnoreStart
/*
UpdraftPlus Addon: moredatabase:Multiple database backup options
Description: Provides the ability to encrypt database backups, and to back up external databases
Version: 1.5
Shop: /shop/moredatabase/
Latest Change: 1.12.35
*/
// @codingStandardsIgnoreEnd

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

$updraftplus_addon_moredatabase = new UpdraftPlus_Addon_MoreDatabase;

class UpdraftPlus_Addon_MoreDatabase {

	private $database_tables;

	public function __construct() {
		add_filter('updraft_backup_databases', array($this, 'backup_databases'));
		add_filter('updraft_database_encryption_config', array($this, 'database_encryption_config'));
		add_filter('updraft_encrypt_file', array($this, 'encrypt_file'), 10, 5);
		add_filter('updraft_database_moredbs_config', array($this, 'database_moredbs_config'));
		// This runs earlier than default, to allow users who were over-riding already with a filter to continue doing so
		add_filter('updraftplus_get_table_prefix', array($this, 'get_table_prefix'), 9);
		add_action('updraft_extradb_testconnection', array($this, 'extradb_testconnection'));
		// This one is used directly by UpdraftCentral
		add_filter('updraft_extradb_testconnection_go', array($this, 'extradb_testconnection_go'), 10, 2);
		add_action('updraftplus_restore_form_db', array($this, 'restore_form_db'), 9);
		add_filter('updraftplus_get_settings_meta', array($this, 'get_settings_meta'));
		add_filter('updraft_backupnow_database_showmoreoptions', array($this, 'backupnow_database_showmoreoptions'), 10, 2);
		add_filter('updraft_backupnow_options', array($this, 'backupnow_options'), 10, 2);
		add_filter('updraftplus_backup_table', array($this, 'updraftplus_backup_table'), 10, 5);
	}

	public function get_settings_meta($meta) {
		if (!is_array($meta)) return $meta;
		
		$extradbs = UpdraftPlus_Options::get_updraft_option('updraft_extradbs');
		if (!is_array($extradbs)) $extradbs = array();
		foreach ($extradbs as $i => $db) {
			if (!is_array($db) || empty($db['host'])) unset($extradbs[$i]);
		}
		$meta['extra_dbs'] = $extradbs;
		
		return $meta;
	}
	
	public function restore_form_db() {

		echo '<div class="updraft_restore_crypteddb" style="display:none;">'.__('Database decryption phrase', 'updraftplus').': ';

		$updraft_encryptionphrase = UpdraftPlus_Options::get_updraft_option('updraft_encryptionphrase');

		echo '<input type="'.apply_filters('updraftplus_admin_secret_field_type', 'text').'" name="updraft_encryptionphrase" id="updraft_encryptionphrase" value="'.esc_attr($updraft_encryptionphrase).'"></div><br>';
	}

	public function get_table_prefix($prefix) {
		if (UpdraftPlus_Options::get_updraft_option('updraft_backupdb_nonwp')) {
			global $updraftplus;
			$updraftplus->log("All tables found will be backed up (indicated by backupdb_nonwp option)");
			return '';
		}
		return $prefix;
	}

	public function extradb_testconnection() {
		echo json_encode($this->extradb_testconnection_go(array(), $_POST));
		die;
	}

	/**
	 * This is also used as a WP filter
	 *
	 * @param  string $results_initial_value_ignored
	 * @param  string $posted_data
	 * @return array
	 */
	public function extradb_testconnection_go($results_initial_value_ignored, $posted_data) {
	
		if (empty($posted_data['user'])) return(array('r' => $posted_data['row'], 'm' => '<p>'.sprintf(__("Failure: No %s was given.", 'updraftplus').'</p>', __('user', 'updraftplus'))));

		if (empty($posted_data['host'])) return(array('r' => $posted_data['row'], 'm' => '<p>'.sprintf(__("Failure: No %s was given.", 'updraftplus').'</p>', __('host', 'updraftplus'))));

		if (empty($posted_data['name'])) return(array('r' => $posted_data['row'], 'm' => '<p>'.sprintf(__("Failure: No %s was given.", 'updraftplus').'</p>', __('database name', 'updraftplus'))));

		global $updraftplus_admin;
		$updraftplus_admin->logged = array();

		$ret = '';
		$failed = false;

		$wpdb_obj = new UpdraftPlus_WPDB_OtherDB_Test($posted_data['user'], $posted_data['pass'], $posted_data['name'], $posted_data['host']);
		if (!empty($wpdb_obj->error)) {
			$failed = true;
			$ret .= '<p>'.$posted_data['user'].'@'.$posted_data['host'].'/'.$posted_data['name']." : ".__('database connection attempt failed', 'updraftplus')."</p>";
			if (is_wp_error($wpdb_obj->error) || is_string($wpdb_obj->error)) {
				$ret .= '<ul style="list-style: disc inside;">';
				if (is_wp_error($wpdb_obj->error)) {
					$codes = $wpdb_obj->error->get_error_codes();
					if (is_array($codes)) {
						foreach ($codes as $code) {
							if ('db_connect_fail' == $code) {
								$ret .= "<li>".__('Connection failed: check your access details, that the database server is up, and that the network connection is not firewalled.', 'updraftplus')."</li>";
							} else {
								$err = $wpdb_obj->error->get_error_message($code);
								$ret .= "<li>".$err."</li>";
							}
						}
					}
				} else {
					$ret .= "<li>".$wpdb_obj->error."</li>";
				}
				$ret .= '</ul>';
			}
		}

		$ret_info = '';
		if (!$failed) {
			$all_tables = $wpdb_obj->get_results("SHOW TABLES", ARRAY_N);
			$all_tables = array_map(array($this, 'cb_get_first_item'), $all_tables);
			if (empty($posted_data['prefix'])) {
				$ret_info .= sprintf(__('%s table(s) found.', 'updraftplus'), count($all_tables));
			} else {
				$our_prefix = 0;
				foreach ($all_tables as $table) {
					if (0 === strpos($table, $posted_data['prefix'])) $our_prefix++;
				}
				$ret_info .= sprintf(__('%s total table(s) found; %s with the indicated prefix.', 'updraftplus'), count($all_tables), $our_prefix);
			}
		}

		$ret_after = '';

		if (count($updraftplus_admin->logged) >0) {
			$ret_after .= "<p>".__('Messages:', 'updraftplus');
			$ret_after .= '<ul style="list-style: disc inside;">';

			foreach (array_unique($updraftplus_admin->logged) as $code => $err) {
				if ('db_connect_fail' === $code) $failed = true;
				$ret_after .= "<li><strong>$code:</strong> $err</li>";
			}
			$ret_after .= '</ul></p>';
		}

		if (!$failed) {
			$ret = '<p>'.__('Connection succeeded.', 'updraftplus').' '.$ret_info.'</p>'.$ret;
		} else {
			$ret = '<p>'.__('Connection failed.', 'updraftplus').'</p>'.$ret;
		}

		restore_error_handler();
		
		return array('r' => $posted_data['row'], 'm' => $ret.$ret_after);
		
	}

	public function database_moredbs_config($ret) {
		global $updraftplus;
		$ret = '';
		$tp = $updraftplus->get_table_prefix(false);
		$updraft_backupdb_nonwp = UpdraftPlus_Options::get_updraft_option('updraft_backupdb_nonwp');

		$ret .= '<input type="checkbox"'.(($updraft_backupdb_nonwp) ? ' checked="checked"' : '').' id="updraft_backupdb_nonwp" name="updraft_backupdb_nonwp" value="1"><label for="updraft_backupdb_nonwp" title="'.sprintf(__('This option will cause tables stored in the MySQL database which do not belong to WordPress (identified by their lacking the configured WordPress prefix, %s) to also be backed up.', 'updraftplus'), $tp).'">'.__('Backup non-WordPress tables contained in the same database as WordPress', 'updraftplus').'</label><br>';
			$ret .= '<p><em>'.__('If your database includes extra tables that are not part of this WordPress site (you will know if this is the case), then activate this option to also back them up.', 'updraftplus').'</em></p>';
	
			$ret .= '<div id="updraft_backupextradbs"></div>';
			
			$ret .= '<div id="updraft_backupextradbs_another_container"><a href="#" id="updraft_backupextradb_another">'.__('Add an external database to backup...', 'updraftplus').'</a></div>';

		add_action('admin_footer', array($this, 'admin_footer'));
		return $ret;
	}

	public function admin_footer() {
		?>
		<style type="text/css">
		
			#updraft_backupextradbs_another_container {
				clear:both; float:left;
			}
		
			#updraft_encryptionphrase {
				width: 232px;
			}
			
			#updraft_backupextradbs {
				clear:both;
				float:left;
			}
		
			.updraft_backupextradbs_row {
				border: 1px dotted;
				margin: 4px;
				padding: 4px;
				float: left;
				clear: both;
			}
			.updraft_backupextradbs_row h3 {
				margin-top: 0px; padding-top: 0px; margin-bottom: 3px;
				font-size: 90%;
			}
			.updraft_backupextradbs_row .updraft_backupextradbs_testresultarea {
				float: left; clear: both;
				padding-bottom: 4px;
			}
			.updraft_backupextradbs_row .updraft_backupextradbs_row_label {
				float: left; width: 90px;
				padding-top:1px;
			}
			.updraft_backupextradbs_row .updraft_backupextradbs_row_textinput {
				float: left; width: 100px; clear:none; margin-right: 6px;
			}
			
			.updraft_backupextradbs_row .updraft_backupextradbs_row_test {
				width: 180px; padding: 6px 0; text-align:right;
			}
			
			.updraft_backupextradbs_row .updraft_backupextradbs_row_host {
				clear:left;
			}
			
			.updraft_backupextradbs_row_delete {
				float: right;
				cursor: pointer;
				font-size: 100%;
				padding: 1px 3px;
				margin: 0 6px;
			}
			.updraft_backupextradbs_row_delete:hover {
				cursor: pointer;
			}
		</style>
		<script>
			jQuery(document).ready(function($) {
				var updraft_extra_dbs = 0;
				function updraft_extradbs_add(host, user, name, pass, prefix) {
					updraft_extra_dbs++;
					$('<div class="updraft_backupextradbs_row updraft-hidden" style="display:none;" id="updraft_backupextradbs_row_'+updraft_extra_dbs+'">'+
						'<button type="button" title="<?php echo esc_attr(__('Remove', 'updraftplus'));?>" class="updraft_backupextradbs_row_delete">X</button>'+
						'<h3><?php echo esc_js(__('Backup external database', 'updraftplus'));?></h3>'+
						'<div class="updraft_backupextradbs_testresultarea"></div>'+
						'<div class="updraft_backupextradbs_row_label updraft_backupextradbs_row_host"><?php echo esc_js(__('Host', 'updraftplus'));?>:</div><input class="updraft_backupextradbs_row_textinput extradb_host" type="text" name="updraft_extradbs['+updraft_extra_dbs+'][host]" value="'+host+'">'+
						'<div class="updraft_backupextradbs_row_label"><?php echo esc_js(__('Username', 'updraftplus'));?>:</div><input class="updraft_backupextradbs_row_textinput extradb_user" type="text" name="updraft_extradbs['+updraft_extra_dbs+'][user]" value="'+user+'">'+
						'<div class="updraft_backupextradbs_row_label"><?php echo esc_js(__('Password', 'updraftplus'));?>:</div><input class="updraft_backupextradbs_row_textinput extradb_pass" type="<?php echo apply_filters('updraftplus_admin_secret_field_type', 'text'); ?>" name="updraft_extradbs['+updraft_extra_dbs+'][pass]" value="'+pass+'">'+
						'<div class="updraft_backupextradbs_row_label"><?php echo esc_js(__('Database', 'updraftplus'));?>:</div><input class="updraft_backupextradbs_row_textinput extradb_name" type="text" name="updraft_extradbs['+updraft_extra_dbs+'][name]" value="'+name+'">'+
						'<div class="updraft_backupextradbs_row_label" title="<?php echo esc_attr('If you enter a table prefix, then only tables that begin with this prefix will be backed up.', 'updraftplus');?>"><?php echo esc_js(__('Table prefix', 'updraftplus'));?>:</div><input class="updraft_backupextradbs_row_textinput extradb_prefix" title="<?php echo esc_attr('If you enter a table prefix, then only tables that begin with this prefix will be backed up.', 'updraftplus');?>" type="text" name="updraft_extradbs['+updraft_extra_dbs+'][prefix]" value="'+prefix+'">'+
						'<div class="updraft_backupextradbs_row_label updraft_backupextradbs_row_test"><a href="#" class="updraft_backupextradbs_row_testconnection"><?php echo esc_js(__('Test connection...', 'updraftplus'));?></a></div>'+
						'</div>').appendTo($('#updraft_backupextradbs')).fadeIn();
				}
				$('#updraft_backupextradb_another').click(function(e) {
					e.preventDefault();
					updraft_extradbs_add('', '', '', '', '');
				});
				$('#updraft_backupextradbs').on('click', '.updraft_backupextradbs_row_delete', function() {
					$(this).parents('.updraft_backupextradbs_row').slideUp('slow').delay(400).remove();
				});
				$('#updraft_backupextradbs').on('click', '.updraft_backupextradbs_row_testconnection', function(e) {
					e.preventDefault();
					var row = $(this).parents('.updraft_backupextradbs_row');
					$(row).find('.updraft_backupextradbs_testresultarea').html('<p><em><?php _e('Testing...', 'updraftplus');?></em></p>');
					var data = {
						subsubaction: 'updraft_extradb_testconnection',
						row: $(row).attr('id'),
						host: $(row).children('.extradb_host').val(),
						user: $(row).children('.extradb_user').val(),
						pass: $(row).children('.extradb_pass').val(),
						name: $(row).children('.extradb_name').val(),
						prefix: $(row).children('.extradb_prefix').val()
					};

					updraft_send_command('doaction', data, function(response) {
						try {
							resp = $.parseJSON(response);
							if (resp.m && resp.r) {
								$('#'+resp.r).find('.updraft_backupextradbs_testresultarea').html(resp.m);
							} else {
								alert('<?php echo esc_js(__('Error: the server sent us a response (JSON) which we did not understand.', 'updraftplus'));?> '+resp);
							}
						} catch(err) {
							console.log(err);
							console.log(data);
						}
					}, { json_parse: false });
				});
				<?php
				$extradbs = UpdraftPlus_Options::get_updraft_option('updraft_extradbs');
				if (is_array($extradbs)) {
					foreach ($extradbs as $db) {
						if (is_array($db) && !empty($db['host'])) echo "updraft_extradbs_add('".esc_js($db['host'])."', '".esc_js($db['user'])."', '".esc_js($db['name'])."', '".esc_js($db['pass'])."', '".esc_js($db['prefix'])."');\n";
					}
				}
				?>
			});
		</script>
		<?php
	}

	public function database_encryption_config($x) {
		$updraft_encryptionphrase = UpdraftPlus_Options::get_updraft_option('updraft_encryptionphrase');

		$ret = '';

		if (!function_exists('mcrypt_encrypt')) {
			$ret .= '<p><strong>'.sprintf(__('Your web-server does not have the %s module installed.', 'updraftplus'), 'PHP/mcrypt').' '.__('Without it, encryption will be a lot slower.', 'updraftplus').'</strong></p>';
		}

		$ret .= '<input type="'.apply_filters('updraftplus_admin_secret_field_type', 'text').'" name="updraft_encryptionphrase" id="updraft_encryptionphrase" value="'.esc_attr($updraft_encryptionphrase).'">';

		$ret .= '<p>'.__('If you enter text here, it is used to encrypt database backups (Rijndael). <strong>Do make a separate record of it and do not lose it, or all your backups <em>will</em> be useless.</strong> This is also the key used to decrypt backups from this admin interface (so if you change it, then automatic decryption will not work until you change it back).', 'updraftplus').'</p>';

		return $ret;

	}

	public function backup_databases($w) {

		if (!is_array($w)) return $w;

		$extradbs = UpdraftPlus_Options::get_updraft_option('updraft_extradbs');
		if (empty($extradbs) || !is_array($extradbs)) return $w;

		$dbnum = 0;
		foreach ($extradbs as $db) {
			if (!is_array($db) || empty($db['host'])) continue;
			$dbnum++;
			$w[$dbnum] = array('dbinfo' => $db, 'status' => 'begun');
		}

		return $w;
	}

	/**
	 * This function encrypts the database when specified. Used in backup.php.
	 *
	 * @param  array  $result
	 * @param  string $file           this is the file name of the db zip to be encrypted
	 * @param  string $encryption     This is the encryption word (salting) to be used when encrypting the data
	 * @param  string $whichdb        This specifies the correct DB
	 * @param  string $whichdb_suffix This spcifies the DB suffix
	 * @return string                 returns the encrypted file name
	 */
	public function encrypt_file($result, $file, $encryption, $whichdb, $whichdb_suffix) {

		global $updraftplus;
		$updraft_dir = $updraftplus->backups_dir_location();
		$updraftplus->jobdata_set('jobstatus', 'dbencrypting'.$whichdb_suffix);
		$encryption_result = 0;
		$time_started = microtime(true);
		$file_size = @filesize($updraft_dir.'/'.$file)/1024;

		$memory_limit = ini_get('memory_limit');
		$memory_usage = round(@memory_get_usage(false)/1048576, 1);
		$memory_usage2 = round(@memory_get_usage(true)/1048576, 1);
		$updraftplus->log("Encryption being requested: file_size: ".round($file_size, 1)." KB memory_limit: $memory_limit (used: ${memory_usage}M | ${memory_usage2}M)");
		
		$encrypted_file = $this->encrypt($updraft_dir.'/'.$file, $encryption);

		if (false !== $encrypted_file) {
			// return basename($file);
			$time_taken = max(0.000001, microtime(true)-$time_started);

			$checksums = $updraftplus->which_checksums();
			
			foreach ($checksums as $checksum) {
				$cksum = hash_file($checksum, $updraft_dir.'/'.$file.'.crypt');
				$updraftplus->jobdata_set($checksum.'-db'.(('wp' == $whichdb) ? '0' : $whichdb.'0').'.crypt', $cksum);
				$updraftplus->log("$file: encryption successful: ".round($file_size, 1)."KB in ".round($time_taken, 2)."s (".round($file_size/$time_taken, 1)."KB/s) ($checksum checksum: $cksum)");
				
			}

			// Delete unencrypted file
			@unlink($updraft_dir.'/'.$file);

			$updraftplus->jobdata_set('jobstatus', 'dbencrypted'.$whichdb_suffix);

			return basename($file.'.crypt');
		} else {
			$updraftplus->log("Encryption error occurred when encrypting database. Encryption aborted.");
			$updraftplus->log(__("Encryption error occurred when encrypting database. Encryption aborted.", 'updraftplus'), 'error');
			return basename($file);
		}
	}
	
	/**
	 * This is the encryption process when encrypting a file
	 *
	 * @param  string $fullpath THis is the full path to the DB file that needs ecrypting
	 * @param  string $key      This is the key (salting) to be used when encrypting
	 * @return string           Return the full path of the encrypted file
	 */
	private function encrypt($fullpath, $key) {
		global $updraftplus;

		if (!function_exists('mcrypt_encrypt') && !extension_loaded('openssl')) {
			$updraftplus->log(sprintf(__('Your web-server does not have the %s module installed.', 'updraftplus'), 'PHP/mcrypt / PHP/OpenSSL').' '.__('Without it, encryption will be a lot slower.', 'updraftplus'), 'warning', 'nomcrypt');
		}

		// include Rijndael library from phpseclib
		$updraftplus->ensure_phpseclib('Crypt_Rijndael', 'Crypt/Rijndael');

		// open file to read
		if (false === ($file_handle = fopen($fullpath, 'rb'))) {
			$updraftplus->log("Failed to open file for read access: $fullpath");
			return false;
		}

		// encrypted path name. The trailing .tmp ensures that it will be cleaned up by the temporary file reaper eventually, if needs be.
		$encrypted_path = dirname($fullpath).'/encrypt_'.basename($fullpath).'.tmp';

		$data_encrypted = 0;
		$buffer_size = defined('UPDRAFTPLUS_CRYPT_BUFFER_SIZE') ? UPDRAFTPLUS_CRYPT_BUFFER_SIZE : 2097152;

		$time_last_logged = microtime(true);
		
		$file_size = filesize($fullpath);

		// Set initial value to false so we can check it later and decide what to do
		$resumption = false;

		// setup encryption
		$rijndael = new Crypt_Rijndael();
		$rijndael->setKey($key);
		$rijndael->disablePadding();
		$rijndael->enableContinuousBuffer();
		
		// First we need to get the block length, this method returns the length in bits we need to change this back to bytes in order to use it with the file operation methods.
		$block_length = $rijndael->getBlockLength() >> 3;

		// Check if the path already exists as this could be a resumption
		if (file_exists($encrypted_path)) {
			
			$updraftplus->log("Temporary encryption file found, will try to resume the encryption");

			// The temp file exists so set resumption to true
			$resumption = true;

			// Get the file size as this is needed to help resume the encryption
			$data_encrypted = filesize($encrypted_path);
			// Get the true file size e.g without padding used for various resumption paths
			$true_data_encrypted = $data_encrypted - ($data_encrypted % $buffer_size);

			if ($data_encrypted >= $block_length) {
		
				// Open existing file from the path
				if (false === ($encrypted_handle = fopen($encrypted_path, 'rb+'))) {
					$updraftplus->log("Failed to open file for write access on resumption: $encrypted_path");
					$resumption = false;
				}
				
				// First check if our buffer size needs padding if it does increase buffer size to length that doesn't need padding
				if (0 != $buffer_size % 16) {
					$pad = 16 - ($buffer_size % 16);
					$true_buffer_size = $buffer_size + $pad;
				} else {
					$true_buffer_size = $buffer_size;
				}
				
				// Now check if using modulo on data encrypted and buffer size returns 0 if it doesn't then the last block was a partial write and we need to discard that and get the last useable IV by adding this value to the block length
				$partial_data_size = $data_encrypted % $true_buffer_size;

				// We need to reconstruct the IV from the previous run in order for encryption to resume
				if (-1 === (fseek($encrypted_handle, $data_encrypted - ($block_length + $partial_data_size)))) {
					$updraftplus->log("Failed to move file pointer to correct position to get IV: $encrypted_path");
					$resumption = false;
				}

				// Read previous block length from file
				if (false === ($iv = fread($encrypted_handle, $block_length))) {
					$updraftplus->log("Failed to read from file to get IV: $encrypted_path");
					$resumption = false;
				}

				$rijndael->setIV($iv);

				// Now we need to set the file pointer for the original file to the correct position and take into account the padding added, this padding needs to be removed to get the true amount of bytes read from the original file
				if (-1 === (fseek($file_handle, $true_data_encrypted))) {
					$updraftplus->log("Failed to move file pointer to correct position to resume encryption: $fullpath");
					$resumption = false;
				}
				
			} else {
				// If we enter here then the temp file exists but it is either empty or has one incomplete block we may as well start again
				$resumption = false;
			}

			if (!$resumption) {
				$updraftplus->log("Could not resume the encryption will now try to start again");
				// remove the existing encrypted file as it's no good to us now
				@unlink($encrypted_path);
				// reset the data encrypted so that the loop can be entered
				$data_encrypted = 0;
				// setup encryption to reset the IV
				$rijndael = new Crypt_Rijndael();
				$rijndael->setKey($key);
				$rijndael->disablePadding();
				$rijndael->enableContinuousBuffer();
				// reset the file pointer and then we should be able to start from fresh
				if (-1 === (fseek($file_handle, 0))) {
					$updraftplus->log("Failed to move file pointer to start position to restart encryption: $fullpath");
					$resumption = false;
				}
			}
		}

		if (!$resumption) {
			// open new file from new path
			if (false === ($encrypted_handle = fopen($encrypted_path, 'wb+'))) {
				$updraftplus->log("Failed to open file for write access: $encrypted_path");
				return false;
			}
		}
		
		// loop around the file
		while ($data_encrypted < $file_size) {

			// read buffer-sized amount from file
			if (false === ($file_part = fread($file_handle, $buffer_size))) {
				$updraftplus->log("Failed to read from file: $fullpath");
				return false;
			}
			
			// check to ensure padding is needed before encryption
			$length = strlen($file_part);
			if (0 != $length % 16) {
				$pad = 16 - ($length % 16);
				$file_part = str_pad($file_part, $length + $pad, chr($pad));
			}

			$encrypted_data = $rijndael->encrypt($file_part);
			
			if (false === fwrite($encrypted_handle, $encrypted_data)) {
				$updraftplus->log("Failed to write to file: $encrypted_path");
				return false;
			}
			
			$data_encrypted += $buffer_size;
			
			$time_since_last_logged = microtime(true) - $time_last_logged;
			if ($time_since_last_logged > 5) {
				$time_since_last_logged = microtime(true);
				$updraftplus->log("Encrypting file: completed $data_encrypted bytes");
			}
			
		}

		// close the main file handle
		fclose($encrypted_handle);
		fclose($file_handle);

		// encrypted path
		$result_path = $fullpath.'.crypt';

		// need to replace original file with tmp file
		if (false === rename($encrypted_path, $result_path)) {
			$updraftplus->log("File rename failed: $encrypted_path -> $result_path");
			return false;
		}

		return $result_path;
	}

	/**
	 * A method that gets a list of tables from the users databases and generates html using these values so that the user can select what tables they want to backup instead of a full database backup.
	 *
	 * @param  String $ret    this contains the upgrade to premium link and gets cleared here and replaced with table content
	 * @param  String $prefix currently unused here because these parameters are passed to the filter
	 * @return String A string that contains HTML to be appended to the backup now modal
	 */
	public function backupnow_database_showmoreoptions($ret, $prefix) {

		global $updraftplus;

		$ret = '';

		$ret .= '<em>'.__('You should backup all tables unless you are an expert in the internals of the WordPress database.', 'updraftplus').'</em><br>';

		// In future this can be passed an array of databases to support external databases
		$database_table_list = $updraftplus->get_database_tables();

		foreach ($database_table_list as $key => $database) {
			$database_name = $key;
			$show_as = ('wp' == $key) ? __('WordPress database', 'updraftplus') : $key;
			$ret .= '<br><em>'. $show_as . ' ' . __('tables', 'updraftplus') . '</em><br>';

			foreach ($database as $key => $value) {
				/*
					This outputs each table to the page setting the name to updraft_include_tables_ $database_name this allows the value to be trimmed later and to build an array of tables to be backed up
				*/
				$ret .= '<input class="updraft_db_entity" id="'.$prefix.'updraft_db_'.$value.'" checked="checked" type="checkbox" name="updraft_include_tables_'. $database_name . '" value="'.$value.'"> <label for="'.$prefix.'updraft_db_'.$value.'">'.$value.'</label><br>';
			}
		}

		return $ret;
	}

	/**
	 * This method checks to see if all tables are selected to backup if they are not then it creates an array of tables to be backed up ready for the backup to use later to exclude them
	 *
	 * @param  [array] $options an array of options that is being passed to the backup method
	 * @param  [array] $request an array of ajax request and extra parameters including the tables that are selected for backup
	 */
	public function backupnow_options($options, $request) {
		if (!is_array($options)) return $options;

		// if onlythesetableentities is not an array then all tables are being backed up and we don't need to do this
		if (!empty($request['onlythesetableentities']) && is_array($request['onlythesetableentities'])) {
			$database_tables = array();
			$database_entities = $request['onlythesetableentities'];
			
			foreach ($database_entities as $key => $value) {
				/*
					This name key inside the value array is the database name prefixed by 23 characters so we need to remove them to get the actual name, then the value key inside the value array has the table name.
				*/
				$database_tables[substr($value['name'], 23)][$key] = $value['value'];
			}

			$this->database_tables = $database_tables;
		}

		return $options;
	}

	/**
	 * This method is called during a backup to check if the table is included in this classes database_tables array if it is then return true so it can be backed up otherwise return false so that it is skipped
	 *
	 * @param  [boolean]    $bool         a boolean value
	 * @param  [string]     $table        a string containing the table
	 * @param  [string]     $table_prefix a string containing the table prefix
	 * @param  [string|int] $whichdb      a string or int indicating what database this table is from
	 * @param  [array]      $dbinfo       an array of information about the current database
	 * @return [boolean] a boolean value indicating if a table should be included in the backup or not
	 */
	public function updraftplus_backup_table($bool, $table, $table_prefix, $whichdb, $dbinfo) {

		// Check this empty not to cause errors
		if (!empty($this->database_tables)) {
			// whichdb could be an int in which case to get the name of the database and the array key use the name from dbinfo
			if ('wp' !== $whichdb) {
				$key = $dbinfo['name'];
			} else {
				$key = $whichdb;
			}

			// first check table_prefix is not empty and that the table does not already have the prefix attached
			if (!empty($table_prefix) && substr($table, 0, strlen($table_prefix)) === $table_prefix) {
				$table_name = $table;
			} else {
				$table_name = $table_prefix . $table;
			}

			// check this is actually set not to cause any errors
			if (isset($this->database_tables[$key])) {
				if (in_array($table_name, $this->database_tables[$key])) {
					return true;
				} else {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Returns the member of the array with key (int)0. This function is used as a callback for array_map().
	 *
	 * @param Array $a - the array
	 *
	 * @return Mixed - the first item off the array
	 */
	private function cb_get_first_item($a) {
		return $a[0];
	}
}

/**
 * Needs keeping in sync with the version in backup.php
 */
class UpdraftPlus_WPDB_OtherDB_Test extends wpdb {
	/**
	 * This adjusted bail() does two things: 1) Never dies and 2) logs in the UD log
	 *
	 * @param  string $message
	 * @param  string $error_code
	 * @return boolean
	 */
	public function bail($message, $error_code = 'updraftplus_default') {
// global $updraftplus_admin;
// if ('updraftplus_default' == $error_code) {
// $updraftplus_admin->logged[] = $message;
// } else {
// $updraftplus_admin->logged[$error_code] = $message;
// }
		// Now do the things that would have been done anyway
		if (class_exists('WP_Error'))
			$this->error = new WP_Error($error_code, $message);
		else $this->error = $message;
		return false;
	}
}
