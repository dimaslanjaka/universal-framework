<?php
// @codingStandardsIgnoreStart
/*
UpdraftPlus Addon: sftp:SFTP, SCP and FTPS Support
Description: Allows UpdraftPlus to back up to SFTP, SSH and encrypted FTP servers
Version: 2.7
Shop: /shop/sftp/
Latest Change: 1.12.35
*/
// @codingStandardsIgnoreEnd

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

if (!class_exists('UpdraftPlus_RemoteStorage_Addons_Base_v2')) require_once(UPDRAFTPLUS_DIR.'/methods/addon-base-v2.php');

// Do not instantiate the storage object (as that is instantiated on demand), but only the helper
$updraftplus_addons_sftp = new UpdraftPlus_Addons_RemoteStorage_sftp_helper;
class UpdraftPlus_Addons_RemoteStorage_sftp_helper {

	public function __construct() {
		add_filter('updraft_sftp_ftps_notice', array($this, 'ftps_notice'));
		add_filter('updraftplus_ftp_possible', array($this, 'updraftplus_ftp_possible'));
	}

	public function updraftplus_ftp_possible($funcs_disabled) {
		if (!is_array($funcs_disabled)) return $funcs_disabled;
		foreach (array('ftp_ssl_connect', 'ftp_login') as $func) {
			if (!function_exists($func)) $funcs_disabled['ftpsslexplicit'][] = $func;
		}
		foreach (array('curl_exec') as $func) {
			if (!function_exists($func)) $funcs_disabled['ftpsslimplicit'][] = $func;
		}
		return $funcs_disabled;
	}

	public function ftps_notice() {
		return __("Encrypted FTP is available, and will be automatically tried first (before falling back to non-encrypted if it is not successful), unless you disable it using the expert options. The 'Test FTP Login' button will tell you what type of connection is in use.", 'updraftplus').' '.__('Some servers advertise encrypted FTP as available, but then time-out (after a long time) when you attempt to use it. If you find this happenning, then go into the "Expert Options" (below) and turn off SSL there.', 'updraftplus').' '.__('Explicit encryption is used by default. To force implicit encryption (port 990), add :990 to your FTP server below.', ' updraftplus');
	}
}

class UpdraftPlus_Addons_RemoteStorage_sftp extends UpdraftPlus_RemoteStorage_Addons_Base_v2 {

	public function do_connect_and_chdir() {
		$options = $this->get_options();
		if (!array($options)) return new WP_Error('no_settings', sprintf(__('No %s settings were found', 'updraftplus'), 'SCP/SFTP'));
		
		if (empty($options['host'])) return new WP_Error('no_settings', sprintf(__('No %s found', 'updraftplus'), __('SCP/SFTP host setting', 'updraftplus')));
		if (empty($options['user'])) return new WP_Error('no_settings', sprintf(__('No %s found', 'updraftplus'), __('SCP/SFTP user setting', 'updraftplus')));
		if (empty($options['pass']) && empty($options['key'])) return new WP_Error('no_settings', sprintf(__('No %s found', 'updraftplus'), __('SCP/SFTP password/key', 'updraftplus')));
		$host = $options['host'];
		$user = $options['user'];
		$pass = (empty($options['pass'])) ? '' : $options['pass'];
		$key = (empty($options['key'])) ? '' : $options['key'];
		$port = empty($options['port']) ? 22 : (int) $options['port'];
		$path = empty($options['path']) ? '' : $options['path'];
		$scp = empty($options['scp']) ? 0 : 1;

		$this->path = $path;

		$fingerprint = '';

		$sftp = $this->connect($host, $port, $fingerprint, $user, $pass, $key, $scp);
		if (is_wp_error($sftp)) return $sftp;

		// So far, so good
		if ($path) {
			if ($scp) {
				// May fail - e.g. if directory already exists, or if the remote shell is restricted
				@$this->ssh->exec("mkdir ".escapeshellarg($path));
				// N.B. - have not changed directory (since cd may not be an available command)
			} else {
				@$sftp->mkdir($path);
				// See if the directory now exists
				if (!$sftp->chdir($path)) {
					@$sftp->disconnect();
					return new WP_Error('nochdir', __("Check your file permissions: Could not successfully create and enter directory:", 'updraftplus')." $path");
				}
			}
		}

		return $sftp;

	}

	public function upload_files($ret, $backup_array) {

		global $updraftplus, $updraftplus_backup;
		$sftp = $this->do_connect_and_chdir();
		if (is_wp_error($sftp)) {
			foreach ($sftp->get_error_messages() as $key => $msg) {
				$updraftplus->log($msg);
				$updraftplus->log($msg, 'error');
			}
			return false;
		}

		if (empty($this->scp)) {
			$updraftplus->log("SFTP: Successfully logged in");
		} else {
			$updraftplus->log("SCP: Successfully logged in");
		}

		$any_failures = false;

		$updraft_dir = $updraftplus->backups_dir_location().'/';

		foreach ($backup_array as $file) {
			$updraftplus->log("SCP/SFTP upload: attempt: $file");
			
			$this->sftp_path = $updraft_dir.'/'.$file;
			$this->sftp_size = max(filesize($updraft_dir.'/'.$file), 1);

			if (empty($this->scp)) {

				// SFTP
				
				$this->sftp_began_at = 0;

				try {
					$remote_stat = $sftp->stat($file);
					$current_remote_size = (is_array($remote_stat) && isset($remote_stat['size']) && $remote_stat['size'] > 0) ? $remote_stat['size'] : 0;
					if ($current_remote_size > 0) {
						$this->sftp_began_at = $current_remote_size;
						$updraftplus->log('SFTP: File exists remotely; upload will resume; remote size is: '.round($current_remote_size/1024, 2).' KB');
					}
				} catch (Exception $e) {
					$updraftplus->log('Exception when stating remote file ('.get_class($e).'): '.$e->getMessage());
					$current_remote_size = 0;
				}

				if ($current_remote_size >= $this->sftp_size || $sftp->put($file, $updraft_dir.'/'.$file, NET_SFTP_LOCAL_FILE, $current_remote_size, $current_remote_size, array($this, 'sftp_progress_callback'))) {
					$updraftplus->uploaded_file($file);
				} else {
					$any_failures = true;
					$updraftplus->log('ERROR: SFTP: Failed to upload file: '.$file);
					$updraftplus->log(sprintf(__('%s Error: Failed to upload', 'updraftplus'), 'SFTP').": $file", 'error');
				}
			} else {
			
				// SCP
			
				$rfile = empty($this->path) ? $file : trailingslashit($this->path).$file;
				if ($sftp->put($rfile, $updraft_dir.'/'.$file, NET_SCP_LOCAL_FILE, array($this, 'sftp_progress_callback'))) {
					$updraftplus->uploaded_file($file);
				} else {
					$any_failures = true;
					$updraftplus->log('ERROR: SCP: Failed to upload file: '.$file);
					$updraftplus->log(sprintf(__('%s Error: Failed to upload', 'updraftplus'), 'SCP').": $file", 'error');
				}
			}
		}

// if (empty($this->scp)) {
// @$sftp->disconnect();
// } else {
// @$this->ssh->disconnect();
// }

		if (!$any_failures) {
			return array('sftp_object' => $sftp);
		} else {
			return null;
		}

	}

	public function sftp_progress_callback($sent) {
		global $updraftplus;
		static $sftp_last_logged_at = 0;
		$bytes_sent = empty($this->sftp_began_at) ? $sent : $this->sftp_began_at + $sent;
		if ($bytes_sent > $sftp_last_logged_at + 1048576) {
			$perc = empty($this->sftp_size) ? 0 : round(100*$bytes_sent / $this->sftp_size, 1);
			$updraftplus->record_uploaded_chunk($perc, '', $this->sftp_path);
			$sftp_last_logged_at = $bytes_sent;
		}
	}

	public function delete_files($ret, $files, $sftp_arr = false) {

		global $updraftplus;
		if (is_string($files)) $files = array($files);

		if ($sftp_arr) {
			$sftp = $sftp_arr['sftp_object'];
		} else {
			$sftp = $this->do_connect_and_chdir();
			if (is_wp_error($sftp)) {
				foreach ($sftp->get_error_messages() as $key => $msg) {
					$updraftplus->log($msg);
					$updraftplus->log($msg, 'error');
				}
				return false;
			}
		}

		$some_success = false;

		foreach ($files as $file) {

			if (empty($this->scp)) {
				$updraftplus->log("SFTP: Delete remote: $file");
			} else {
				$updraftplus->log("SCP: Delete remote: $file");
			}

			if (empty($this->scp)) {
				if (!$sftp->delete($file, false)) {
					$updraftplus->log("SFTP: Delete failed: $file");
				} else {
					$some_success = true;
				}
			} else {
				$rfile = empty($this->path) ? $file : trailingslashit($this->path).$file;
				if (!$this->ssh->exec("rm -f ".escapeshellarg($rfile))) {
					$updraftplus->log("SCP: Delete failed: $rfile");
				} else {
					$some_success = true;
				}
			}
		}

		return $some_success;

	}

	public function listfiles($match = 'backup_') {
		$sftp = $this->do_connect_and_chdir();
		if (is_wp_error($sftp)) return $sftp;

		$results = array();

		if ($this->scp) {

			$cdcom = empty($this->path) ? '' : "cd ".trailingslashit($this->path)." && ";

			if (false == ($exec = $this->ssh->exec($cdcom."ls -l ${match}*"))) {
				$nosizes = true;
				$exec = $this->ssh->exec($cdcom."ls -1 ${match}*");
			}
			if (false != $exec) {
				foreach (explode("\n", $exec) as $str) {
					if ($nosizes) {
						if (0 === strpos($str, $match)) $results[] = array('name' => $str);
					} elseif (!$nosizes && preg_match('/^[^dls].*\s(\d+)\s+\S+\s+\d+\s+([:0-9]+)\s+'.$match.'(.*)$/', $str, $matches)) {
						$results[] = array('name' => $match.$matches[3], 'size' => $matches[1]);
					}
				}
			}

		} else {
			$dirlist = $sftp->rawlist();
			if (!is_array($dirlist)) return array();

			foreach ($dirlist as $path => $stat) {
				if (0 === strpos($path, $match)) $results[] = array('name' => $path, 'size' => $stat['size']);
				unset($dirlist[$path]);
			}

		}

		return $results;
	}

	public function download_file($ret, $file) {

		global $updraftplus;

		$sftp = $this->do_connect_and_chdir();
		if (is_wp_error($sftp)) {
			foreach ($sftp->get_error_messages() as $key => $msg) {
				$updraftplus->log($msg);
				$updraftplus->log($msg, 'error');
			}
			return false;
		}

		$fullpath = $updraftplus->backups_dir_location().'/'.$file;

		$rfile = (empty($this->scp) || empty($this->path)) ? $file : trailingslashit($this->path).$file;
		if (!$sftp->get($rfile, $fullpath)) {
			$updraftplus->log("SFTP Error: Failed to download: $rfile");
			$updraftplus->log(sprintf(__('%s Error: Failed to download', 'updraftplus'), 'SCP/SFTP').": $rfile", 'error');
			return false;
		}
		return true;
	}

	/**
	 * Open a connection to the SSH server
	 *
	 * @param String  $host        - SSH server hostname
	 * @param Integer $port        - TCP port to connect to
	 * @param String  $fingerprint - fingerprint to check (not currently implemented)
	 * @param String  $user        - login username
	 * @param String  $pass        - login password
	 * @param String  $key         - RSA private key to use for logging in (an alternative to password)
	 * @param Boolean $scp         - if set, then SCP will be used; otherwise SFTP
	 * @param Boolean $debug       - debugging mode: will ask phpseclib to log (which, being controlled by constants, may not be possible if they are already set)
	 * @return WP_Error|Net_SSH2|Net_SCP
	 */
	public function connect($host, $port = 22, $fingerprint, $user, $pass = '', $key = '', $scp = false, $debug = false) {

		global $updraftplus;
		$this->scp = $scp;

		$timeout = (defined('UPDRAFTPLUS_SFTP_TIMEOUT') && is_numeric(UPDRAFTPLUS_SFTP_TIMEOUT)) ? UPDRAFTPLUS_SFTP_TIMEOUT : 15;

		if ($scp) {
			$updraftplus->ensure_phpseclib('Net_SSH2', 'Net/SSH2');
			$updraftplus->ensure_phpseclib('Net_SCP', 'Net/SCP');
		} else {
			$updraftplus->ensure_phpseclib('Net_SFTP', 'Net/SFTP');
		}
		
		// N.B. The same NET_SFTP_* constants exist; but as this point, we're only testing login, so will stick with SSH2
		if ($debug) {
			if (!defined('NET_SSH2_LOGGING')) {
				// Alternative: NET_SFTP_LOG_SIMPLE. phpseclib source says that NET_SSH2_LOG_COMPLEX is most useful for SSH2
				define('NET_SSH2_LOGGING', NET_SSH2_LOG_COMPLEX);
			} elseif (NET_SSH2_LOGGING != NET_SSH2_LOG_COMPLEX) {
				$updraftplus->log("NET_SSH2_LOGGING: constant was already set; value not as desired (value=".NET_SSH2_LOGGING.", desired=".NET_SSH2_LOG_COMPLEX.")");
			}
		}
		
		if ($scp) {
			$this->ssh = new Net_SSH2($host, $port, $timeout);
		} else {
			$this->ssh = new Net_SFTP($host, $port, $timeout);
		}

		if (!empty($key)) {
			$updraftplus->ensure_phpseclib('Crypt_RSA', 'Crypt/RSA');
			$updraftplus->ensure_phpseclib('Math_BigInteger', 'Math/BigInteger');
			$rsa = new Crypt_RSA();
			if (false === $rsa->loadKey($key)) {
				if (empty($pass)) return new WP_Error('no_load_key', __('The key provided was not in a valid format, or was corrupt.', 'updraftplus'));
			} else {
				$pass = $rsa;
			}
		}

		if (!$this->ssh->login($user, $pass)) {
			$error_data = null;
			$message = 'SSH 2 login failed';
			if ($debug) {
				$error_data = array(__("UpdraftPlus debug mode is on: detailed debugging data follows.", 'updraftplus')."\n");
				$errors = $this->ssh->getErrors();
				if (is_array($errors)) $error_data = array_merge($error_data, $errors);
				// "Returns a string if NET_SSH2_LOGGING == NET_SSH2_LOG_COMPLEX, an array if NET_SSH2_LOGGING == NET_SSH2_LOG_SIMPLE and false if !defined('NET_SSH2_LOGGING')"
				$ssh_log = $this->ssh->getLog();
				if (is_string($ssh_log)) {
					$error_data[] = $ssh_log;
				} elseif (is_array($ssh_log)) {
					$error_data = array_merge($error_data, $ssh_log);
				}
			}
			return new WP_Error('ssh2_nologin', $message, $error_data);
		}

		// if ($fingerprint) {
		// $fingerprint = str_replace(':', '', $fingerprint);
		// Fingerprint checking not yet supported by phpseclib
		// return new WP_Error('debug', "Remove fingerprint: $remote_finger");
		// }

		return $scp ? new Net_SCP($this->ssh) : $this->ssh;

	}

	public function get_supported_features() {
		// This options format is handled via only accessing options via $this->get_options()
		return array('multi_options');
	}

	public function get_default_options() {
		return array(
			'host' => '',
			'port' => '22',
			'user' => '',
			'pass' => '',
			'key' => '',
			'path' => '',
			'scp' => 0,
		);
	}

	public function config_print() {

		$options = $this->get_options();
		$host = isset($options['host']) ? htmlspecialchars($options['host']) : '';
		$user = isset($options['user']) ? htmlspecialchars($options['user']) : '';
		$pass = isset($options['pass']) ? htmlspecialchars($options['pass']) : '';
		$key = isset($options['key']) ? htmlspecialchars($options['key']) : '';
		$port = isset($options['port']) ? htmlspecialchars($options['port']) : 22;
		$path = isset($options['path']) ? htmlspecialchars($options['path']) : '';
		$scp = (isset($options['scp']) && $options['scp']) ? true : false;
		$fingerprint = isset($options['fingerprint']) ? htmlspecialchars($options['fingerprint']) : '';

		$classes = $this->get_css_classes();

		?>
			<tr class="<?php echo $classes; ?>">
				<th>SFTP/SCP:</th>
				<td>
					<p><em><?php _e('Resuming partial uploads is supported for SFTP, but not for SCP. Thus, if using SCP then you will need to ensure that your webserver allows PHP processes to run long enough to upload your largest backup file.', 'updraftplus');?></em></p>
				</td>
			</tr>

			<tr class="<?php echo $classes; ?>">
				<th><?php _e('Host', 'updraftplus');?>:</th>
				<td>
					<input type="text" style="width: 292px" data-updraft_settings_test="host" <?php $this->output_settings_field_name_and_id('host');?> value="<?php echo esc_attr($host);?>" />
				</td>
			</tr>

			<tr class="<?php echo $classes; ?>">
				<th><?php _e('Port', 'updraftplus');?>:</th>
				<td>
					<input type="text" style="width: 292px" data-updraft_settings_test="port"  <?php $this->output_settings_field_name_and_id('port');?> value="<?php echo esc_attr($port); ?>" />
				</td>
			</tr>

			<tr class="<?php echo $classes; ?>">
				<th><?php _e('Username', 'updraftplus');?>:</th>
				<td>
					<input type="text" autocomplete="off" style="width: 292px" data-updraft_settings_test="user" <?php $this->output_settings_field_name_and_id('user');?> value="<?php echo esc_attr($user); ?>" />
				</td>
			</tr>

			<tr class="<?php echo $classes; ?>">
				<th><?php _e('Password', 'updraftplus');?>:</th>
				<td>
					<input data-updraft_settings_test="pass" type="<?php echo apply_filters('updraftplus_admin_secret_field_type', 'password'); ?>" autocomplete="off" style="width: 292px" <?php $this->output_settings_field_name_and_id('pass');?> value="<?php echo esc_attr($pass);?>" />
					<br><em><?php _e('Your login may be either password or key-based - you only need to enter one, not both.', 'updraftplus'); ?></em>
				</td>
			</tr>

			<tr class="<?php echo $classes; ?>">
				<th><?php _e('Key', 'updraftplus');?>:</th>
				<td>
					<textarea style="width: 292px; height: 120px;" data-updraft_settings_test="key" <?php $this->output_settings_field_name_and_id('key');?>><?php echo htmlspecialchars($key); ?></textarea>
					<br><em><?php echo _x('PKCS1 (PEM header: BEGIN RSA PRIVATE KEY), XML and PuTTY format keys are accepted.', 'Do not translate BEGIN RSA PRIVATE KEY. PCKS1, XML, PEM and PuTTY are also technical acronyms which should not be translated.', 'updraftplus'); ?></em>
				</td>
			</tr>

			<!--
			<tr class="updraftplusmethod sftp">
				<th>Fingerprint:</th>
				<td>
					<input type="text" style="width: 292px" id="updraft_sftp_fingerprint" name="updraft_sftp[fingerprint]" value="$fingerprint" /><br><em>MD5 (128-bit) fingerprint, in hex format - should have the same length and general appearance as this (colons optional): 73:51:43:b1:b5:fc:8b:b7:0a:3a:a9:b1:0f:69:73:a8. Using a fingerprint is not essential, but you are not secure against <a href="http://en.wikipedia.org/wiki/Man-in-the-middle_attack">MITM attacks</a> if you do not use one</em>.
				</td>
			</tr>
			-->

			<tr class="<?php echo $classes; ?>">
				<th><?php _e('Directory path', 'updraftplus');?>:</th>
				<td>
					<input type="text" style="width: 292px" data-updraft_settings_test="path" <?php $this->output_settings_field_name_and_id('path');?> value="<?php echo $path; ?>" /><br><em><?php _e('Where to change directory to after logging in - often this is relative to your home directory.', 'updraftplus');?></em>
				</td>
			</tr>

			<tr class="<?php echo $classes; ?>">
				<th>SCP:</th>
				<td>
					<input type="checkbox" data-updraft_settings_test="scp" <?php $this->output_settings_field_name_and_id('scp');?> value="1"<?php if ($scp) echo ' checked="checked"'; ?>> <label for="updraft_sftp_scp"><?php _e('Use SCP instead of SFTP', 'updraftplus');?></label>
				</td>
			</tr>

		<?php

		echo $this->get_test_button_html('SFTP/SCP');

	}

	/**
	 * Test the supplied credentials. Output to display to the user should be echoed.
	 *
	 * @param Array $posted_settings - the settings to test (including meta such as debug mode)
	 *
	 * @return Mixed|Void - any data to return with the test results (may be logged for debugging purposes)
	 */
	public function credentials_test($posted_settings) {
	
		if (empty($posted_settings['host'])) {
			printf(__("Failure: No %s was given.", 'updraftplus'), __('host name', 'updraftplus'));
			return;
		}
		if (empty($posted_settings['user'])) {
			printf(__("Failure: No %s was given.", 'updraftplus'), __('username', 'updraftplus'));
			return;
		}
		if (empty($posted_settings['pass']) && empty($posted_settings['key'])) {
			printf(__("Failure: No %s was given.", 'updraftplus'), __('password/key', 'updraftplus'));
			return;
		}
		$port = empty($posted_settings['port']) ? 22 : $posted_settings['port'];
		if (!is_numeric($port)) {
			_e("Failure: Port must be an integer.", 'updraftplus');
			return;
		}
		$path = empty($posted_settings['path']) ? '' : $posted_settings['path'];

		$fingerprint = empty($posted_settings['fingerprint']) ? '' : $posted_settings['fingerprint'];

		$scp = empty($posted_settings['scp']) ? 0 : 1;

		$host = $posted_settings['host'];
		$user = stripslashes($posted_settings['user']);
		$pass = empty($posted_settings['pass']) ? '' : stripslashes($posted_settings['pass']);
		$key = empty($posted_settings['key']) ? '' : stripslashes($posted_settings['key']);
		$debug_mode = empty($posted_settings['debug_mode']) ? false : true;

		$sftp = $this->connect($host, $port, $fingerprint, $user, $pass, $key, $scp, $debug_mode);

		if (is_wp_error($sftp)) {
			echo __("Failed", 'updraftplus').": ";
			foreach ($sftp->get_error_messages() as $key => $msg) {
				echo "$msg\n";
			}
			$error_data = $sftp->get_error_data();
			return is_array($error_data) ? $error_data : null;
		}

		// So far, so good
		if (empty($scp)) {
			if ($path) {
				@$sftp->mkdir($path);
				// See if the directory now exists
				if (!$sftp->chdir($path)) {
					echo __('Check your file permissions: Could not successfully create and enter:', 'updraftplus')." (".htmlspecialchars($path).")";
					@$sftp->disconnect();
					return;
				}
			}
		} elseif ($path) {
			$this->ssh->exec('mkdir '.escapeshellarg($path));
		}

		$testfile = md5(time().rand());
		if (!empty($scp) && !empty($path)) $testfile = trailingslashit($path).$testfile;
		// Now test uploading a file
		$putfile = $sftp->put($testfile, 'test');
		if (empty($scp)) {
			$sftp->delete($testfile);
		} else {
			$this->ssh->exec('rm -f '.escapeshellarg($testfile));
		}

		if ($putfile) {
			_e('Success', 'updraftplus');
		} else {
			if (empty($scp)) {
				echo __("Failed: We were able to log in and move to the indicated directory, but failed to successfully create a file in that location.", 'updraftplus');
			} else {
				_e("Failed: We were able to log in, but failed to successfully create a file in that location.", 'updraftplus');
			}
		}

		if ($this->scp) {
			@$this->ssh->disconnect();
		} else {
			@$sftp->disconnect();
		}

	}
}
	
/**
 * Adapted from http://www.solutionbot.com/2009/01/02/php-ftp-class/
 *
 * Our main tweaks to this class are to enable SSL with fallback for explicit encryption, and to provide rudimentary implicit support (the support for implicit is via Curl (since PHP's functions do not support it), and only extends to methods that we know we use).
 *
 * We somewhat crudely detect the request for implicit via use of port 990. But in the real world, it's unlikely we'll come across anything else - if we do, we can abstract a little more.
 */
class UpdraftPlus_ftp_wrapper {

	private $conn_id;

	private $host;

	private $username;

	private $password;

	private $port;

	public $timeout = 60;

	public $passive = true;

	// Whether to *allow* (not necessarily require) SSL
	public $ssl = true;

	public $system_type = '';

	public $login_type = 'non-encrypted';

	public $use_server_certs = false;

	public $disable_verify = true;

	public $curl_handle;
 
	public function __construct($host, $username, $password, $port = 21) {
		$this->host     = $host;
		$this->username = $username;
		$this->password = $password;
		$this->port     = $port;
	}
 
	public function connect() {

		// Implicit SSL - not handled via PHP's native ftp_ functions, so we use curl instead
		if (990 == $this->port || (defined('UPDRAFTPLUS_FTP_USECURL') && UPDRAFTPLUS_FTP_USECURL)) {
			if (false == $this->ssl) {
				$this->port = 21;
			} else {
				$this->curl_handle = curl_init();
				if (!$this->curl_handle) {
					$this->port = 21;
				} else {
					$options = array(
						CURLOPT_USERPWD        => $this->username . ':' . $this->password,
						CURLOPT_PORT           => $this->port,
						CURLOPT_CONNECTTIMEOUT => 20,
						// CURLOPT_TIMEOUT timeout is not just a "no-activity" timeout, but a total time limit on any Curl operation - undesirable
						// CURLOPT_TIMEOUT        => 20,
						CURLOPT_FTP_CREATE_MISSING_DIRS => true
					);
					$options[CURLOPT_FTP_SSL] = CURLFTPSSL_TRY; // CURLFTPSSL_ALL, // require SSL For both control and data connections
					if (990 == $this->port) {
						$options[CURLOPT_FTPSSLAUTH] = CURLFTPAUTH_SSL; // CURLFTPAUTH_DEFAULT, // let cURL choose the FTP authentication method (either SSL or TLS)
					} else {
						$options[CURLOPT_FTPSSLAUTH] = CURLFTPAUTH_DEFAULT; // let cURL choose the FTP authentication method (either SSL or TLS)
					}
					// Prints to STDERR by default - noisy
					if (defined('WP_DEBUG') && WP_DEBUG==true && UpdraftPlus_Options::get_updraft_option('updraft_debug_mode')) {
						$options[CURLOPT_VERBOSE] = true;
					}
					if ($this->disable_verify) {
						$options[CURLOPT_SSL_VERIFYPEER] = false;
						$options[CURLOPT_SSL_VERIFYHOST] = 0;
					} else {
						$options[CURLOPT_SSL_VERIFYPEER] = true;
					}
					if (!$this->use_server_certs) {
						$options[CURLOPT_CAINFO] = UPDRAFTPLUS_DIR.'/includes/cacert.pem';
					}
					if (true != $this->passive) $options[CURLOPT_FTPPORT] = '-';
					foreach ($options as $option_name => $option_value) {
						if (!curl_setopt($this->curl_handle, $option_name, $option_value)) {
// throw new Exception(sprintf('Could not set cURL option: %s', $option_name));
							global $updraftplus;
							if (is_a($updraftplus, 'UpdraftPlus')) {
								$updraftplus->log("Curl exception: will revert to normal FTP");
							}
							$this->port = 21;
							$this->curl_handle = false;
						}
					}
				}
				// All done - leave
				if ($this->curl_handle) {
					$this->login_type = 'encrypted (implicit, port 990)';
					return true;
				}
			}
		}

		$time_start = time();
		if (function_exists('ftp_ssl_connect') && false !== $this->ssl) {
			$this->conn_id = ftp_ssl_connect($this->host, $this->port, 15);
			$attempting_ssl = true;
		}

		if ($this->conn_id) {
			$this->login_type = 'encrypted';
			$this->ssl = true;
		} else {
			$this->conn_id = ftp_connect($this->host, $this->port, 15);
		}

		if ($this->conn_id) $result = ftp_login($this->conn_id, $this->username, $this->password);

		if (!empty($result)) {
			ftp_set_option($this->conn_id, FTP_TIMEOUT_SEC, $this->timeout);
			ftp_pasv($this->conn_id, $this->passive);
			$this->system_type = ftp_systype($this->conn_id);
			return true;
		} elseif (!empty($attempting_ssl)) {
			global $updraftplus_admin;
			if (isset($updraftplus_admin->logged) && is_array($updraftplus_admin->logged)) {
				// Clear the previous PHP messages, so that we only show the user messages from the method that worked (or from both if both fail)
				$save_array = $updraftplus_admin->logged;
				$updraftplus_admin->logged = array();
				// trigger_error(__('Encrypted login failed; trying non-encrypted', 'updraftplus'), E_USER_NOTICE);
			}
			$this->ssl = false;
			$this->login_type = 'non-encrypted';
			$time_start = time();
			$this->conn_id = ftp_connect($this->host, $this->port, 15);
			if ($this->conn_id) $result = ftp_login($this->conn_id, $this->username, $this->password);
			if (!empty($result)) {
				ftp_set_option($this->conn_id, FTP_TIMEOUT_SEC, $this->timeout);
				ftp_pasv($this->conn_id, $this->passive);
				$this->system_type = ftp_systype($this->conn_id);
				return true;
			} else {
				// Add back the previous PHP messages
				if (isset($save_array)) $updraftplus_admin->logged = array_merge($save_array, $updraftplus_admin->logged);
			}
		}

		// If we got here, then we failed
		if (time() - $time_start > 14) {
			global $updraftplus_admin;
			if (isset($updraftplus_admin->logged) && is_array($updraftplus_admin->logged)) {
				$updraftplus_admin->logged[] = sprintf(__('The %s connection timed out; if you entered the server correctly, then this is usually caused by a firewall blocking the connection - you should check with your web hosting company.', 'updraftplus'), 'FTP');
			} else {
				global $updraftplus;
				$updraftplus->log(sprintf(__('The %s connection timed out; if you entered the server correctly, then this is usually caused by a firewall blocking the connection - you should check with your web hosting company.', 'updraftplus'), 'FTP'), 'error');
			}
		}

		return false;

	}
 
	function curl_progress_function($download_size, $downloaded_size, $upload_size, $uploaded_size) {

		if ($uploaded_size<1) return;

		global $updraftplus;

		$percent = 100*($uploaded_size+$this->upload_from)/$this->upload_size;

		// Log every megabyte or at least every 20%
		if ($percent > $this->upload_last_recorded_percent + 20 || $uploaded_size > $this->uploaded_bytes + 1048576) {
			$updraftplus->record_uploaded_chunk(round($percent, 1), '', $this->upload_local_path);
			$this->upload_last_recorded_percent=floor($percent);
			$this->uploaded_bytes = $uploaded_size;
		}

	}

	public function put($local_file_path, $remote_file_path, $mode = FTP_BINARY, $resume = false, $updraftplus = false) {

		$file_size = filesize($local_file_path);

		$existing_size = 0;
		if ($resume) {

			if ($this->curl_handle) {
				if (true === $this->curl_handle) $this->connect();
				curl_setopt($this->curl_handle, CURLOPT_URL, 'ftps://'.$this->host.'/'.$remote_file_path);
				curl_setopt($this->curl_handle, CURLOPT_NOBODY, true);
				curl_setopt($this->curl_handle, CURLOPT_HEADER, false);

				// curl_setopt($this->curl_handle, CURLOPT_FORBID_REUSE, true);

				$getsize = curl_exec($this->curl_handle);
				if ($getsize) {
					$sizeinfo = curl_getinfo($this->curl_handle);
					$existing_size = $sizeinfo['download_content_length'];
				} else {
					if (is_a($updraftplus, 'UpdraftPlus')) $updraftplus->log("Curl: upload error: ".curl_error($this->curl_handle));
				}
			} else {
				$existing_size = ftp_size($this->conn_id, $remote_file_path);
			}
			// In fact curl can return -1 as the value, for a non-existant file
			if ($existing_size <=0) {
				$resume = false;
				$existing_size = 0;
			} else {
				if (is_a($updraftplus, 'UpdraftPlus')) $updraftplus->log("File already exists at remote site: size $existing_size. Will attempt resumption.");
				if ($existing_size >= $file_size) {
					if (is_a($updraftplus, 'UpdraftPlus')) $updraftplus->log("File is apparently already completely uploaded");
					return true;
				}
			}
		}

		// From here on, $file_size is only used for logging calculations. We want to avoid divsion by zero.
		$file_size = max($file_size, 1);

		if (!$fh = fopen($local_file_path, 'rb')) return false;
		if ($existing_size) fseek($fh, $existing_size);

		// FTPS (i.e. implicit encryption)
		if ($this->curl_handle) {
			// Reset the curl object (because otherwise we get errors that make no sense)
			$this->connect();
			if (version_compare(phpversion(), '5.3.0', '>=')) {
				curl_setopt($this->curl_handle, CURLOPT_PROGRESSFUNCTION, array($this, 'curl_progress_function'));
				curl_setopt($this->curl_handle, CURLOPT_NOPROGRESS, false);
			}
			$this->upload_local_path = $local_file_path;
			$this->upload_last_recorded_percent = 0;
			$this->upload_size = max($file_size, 1);
			$this->upload_from = $existing_size;
			$this->uploaded_bytes = $existing_size;
			curl_setopt($this->curl_handle, CURLOPT_URL, 'ftps://'.$this->host.'/'.$remote_file_path);
			if ($existing_size) curl_setopt($this->curl_handle, CURLOPT_FTPAPPEND, true);

			// DOn't set CURLOPT_UPLOAD=true before doing the size check - it results in a bizarre error
			curl_setopt($this->curl_handle, CURLOPT_UPLOAD, true);
			curl_setopt($this->curl_handle, CURLOPT_INFILE, $fh);
			$output = curl_exec($this->curl_handle);
			fclose($fh);
			if (is_a($updraftplus, 'UpdraftPlus') && !$output) {
				$updraftplus->log("FTPS error: ".curl_error($this->curl_handle));
			} elseif (true === $updraftplus && !$output) {
				echo __('Error:', 'updraftplus').' '.curl_error($this->curl_handle)."\n";
			}
			// Mark as used
			$this->curl_handle = true;
			return $output;
		}

		$ret = ftp_nb_fput($this->conn_id, $remote_file_path, $fh, FTP_BINARY, $existing_size);

		// $existing_size can now be re-purposed

		while (FTP_MOREDATA == $ret) {
			if (is_a($updraftplus, 'UpdraftPlus')) {
				$new_size = ftell($fh);
				if ($new_size - $existing_size > 524288) {
					$existing_size = $new_size;
					$percent = round(100*$new_size/$file_size, 1);
					$updraftplus->record_uploaded_chunk($percent, '', $local_file_path);
				}
			}
			// Continue upload
			$ret = ftp_nb_continue($this->conn_id);
		}

		fclose($fh);

		if (FTP_FINISHED != $ret) {
			if (is_a($updraftplus, 'UpdraftPlus')) $updraftplus->log("FTP upload: error ($ret)");
			return false;
		}

		return true;

	}
 

	public function get($local_file_path, $remote_file_path, $mode = FTP_BINARY, $resume = false, $updraftplus = false) {

		$file_last_size = 0;

		if ($resume) {
			if (!$fh = fopen($local_file_path, 'ab')) return false;
			// @codingStandardsIgnoreLine
			clearstatcache($local_file_path);
			$file_last_size = filesize($local_file_path);
		} else {
			if (!$fh = fopen($local_file_path, 'wb')) return false;
		}

		// Implicit FTP, for which we use curl (since PHP's native FTP functions don't handle implicit FTP)
		if ($this->curl_handle) {
			if ($resume) curl_setopt($this->curl_handle, CURLOPT_RESUME_FROM, $resume);
			curl_setopt($this->curl_handle, CURLOPT_NOBODY, false);
			curl_setopt($this->curl_handle, CURLOPT_URL, 'ftps://'.$this->host.'/'.$remote_file_path);
			curl_setopt($this->curl_handle, CURLOPT_UPLOAD, false);
			curl_setopt($this->curl_handle, CURLOPT_FILE, $fh);
			$output = curl_exec($this->curl_handle);
			if ($output) {
				if ($updraftplus) $updraftplus->log("FTP fetch: fetch complete");
			} else {
				if ($updraftplus) $updraftplus->log("FTP fetch: fetch failed");
			}
			return $output;
		}

		$ret = ftp_nb_fget($this->conn_id, $fh, $remote_file_path, $mode, $file_last_size);

		if (false == $ret) return false;

		while (FTP_MOREDATA == $ret) {

			if ($updraftplus) {
				$file_now_size = filesize($local_file_path);
				if ($file_now_size - $file_last_size > 524288) {
					$updraftplus->log("FTP fetch: file size is now: ".sprintf("%0.2f", filesize($local_file_path)/1048576)." MB");
					$file_last_size = $file_now_size;
				}
				clearstatcache();
			}

			$ret = ftp_nb_continue($this->conn_id);
		}

		fclose($fh);

		if (FTP_FINISHED == $ret) {
			if ($updraftplus) $updraftplus->log("FTP fetch: fetch complete");
			return true;
		} else {
			if ($updraftplus) $updraftplus->log("FTP fetch: fetch failed");
			return false;
		}

	}

	public function chmod($permissions, $remote_filename) {
		if ($this->is_octal($permissions)) {
			$result = ftp_chmod($this->conn_id, $permissions, $remote_filename);
			return ($result) ? true : false;
		} else {
			throw new Exception('$permissions must be an octal number');
		}
	}
 
	public function chdir($directory) {
		ftp_chdir($this->conn_id, $directory);
	}
 
	public function delete($remote_file_path) {

		if ($this->curl_handle) {
			if (true === $this->curl_handle) $this->connect();
			curl_setopt($this->curl_handle, CURLOPT_URL, 'ftps://'.$this->host.'/'.$remote_file_path);
			curl_setopt($this->curl_handle, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($this->curl_handle, CURLOPT_QUOTE, array('DELE '.$remote_file_path));
			// Unset some (possibly) previously-set options
			curl_setopt($this->curl_handle, CURLOPT_UPLOAD, false);
			curl_setopt($this->curl_handle, CURLOPT_INFILE, STDIN);
			$output = curl_exec($this->curl_handle);
			return $output;
		}

		return (ftp_delete($this->conn_id, $remote_file_path)) ? true : false;

	}
 
	public function make_dir($directory) {
		if (ftp_mkdir($this->conn_id, $directory)) {
			return true;
		} else {
			return false;
		}
	}
 
	public function rename($old_name, $new_name) {
		if (ftp_rename($this->conn_id, $old_name, $new_name)) {
			return true;
		} else {
			return false;
		}
	}
 
	public function remove_dir($directory) {
		return ftp_rmdir($this->conn_id, $directory);
	}
 
	public function dir_list($directory) {
		if ($this->curl_handle) {
			// Can't get this to work - it might just be the vsftpd server I am testing on; it hangs strangely. But this means I can't test it.
			return new WP_Error('unsupported_op', sprintf(__('The UpdraftPlus module for this file access method (%s) does not support listing files', 'updraftplus'), 'FTP (SSL/Implicit)'));
			if (true === $this->curl_handle) $this->connect();
			curl_setopt($this->curl_handle, CURLOPT_URL, 'ftps://'.$this->host.'/'.trailingslashit($directory));
			curl_setopt($this->curl_handle, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($this->curl_handle, CURLOPT_FTPLISTONLY, true);
// curl_setopt($this->curl_handle, CURLOPT_POSTQUOTE, array('LIST'));
			curl_setopt($this->curl_handle, CURLOPT_TIMEOUT, 10);
			$output = curl_exec($this->curl_handle);
			return $output;
		}

		return ftp_nlist($this->conn_id, $directory);
	}
 
	public function cdup() {
		return ftp_cdup($this->conn_id);
	}
 
	public function size($f) {
		return ($this->curl_handle) ? false : ftp_size($this->conn_id, $f);
	}


	public function current_dir() {
		return ftp_pwd($this->conn_id);
	}
 
	private function is_octal($i) {
		return decoct(octdec($i)) == $i;
	}
 
	public function __destruct() {
		if ($this->conn_id) ftp_close($this->conn_id);
	}
}
