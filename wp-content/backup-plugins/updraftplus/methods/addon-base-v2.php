<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

/*
Methods to define when extending this class (can use $this->storage and $this->options where relevant):
do_bootstrap($possible_options_array) # Return a WP_Error object if something goes wrong
do_upload($file, $sourcefile) # Return true/false
do_listfiles($match)
do_delete($file) - return true/false
do_download($file, $fullpath, $start_offset) - return true/false
do_config_print()
do_credentials_test_parameters() - return an array: keys = required _POST parameters; values = description of each
do_credentials_test($testfile, $posted_settings) - return true/false
do_credentials_test_deletefile($testfile, $posted_settings)
*/

// Uses job options: Yes
// Uses single-array storage: Yes

if (!class_exists('UpdraftPlus_BackupModule')) require_once(UPDRAFTPLUS_DIR.'/methods/backup-module.php');

/**
 * Note that the naming of this class is historical. There is nothing inherent which restricts it to add-ons, or requires add-ons to use it. It is just an abstraction layer that results in needing to write less code for the storage module.
 */
abstract class UpdraftPlus_RemoteStorage_Addons_Base_v2 extends UpdraftPlus_BackupModule {

	protected $method;

	protected $description;

	protected $storage;

	protected $options;

	private $chunked;

	public function __construct($method, $description, $chunked = true, $test_button = true) {

		$this->method = $method;
		$this->description = $description;
		$this->chunked = $chunked;
		$this->test_button = $test_button;

	}
	
	/**
	 * download method: takes a file name (base name), and removes it from the cloud storage
	 *
	 * @param  string $file specific file for being removed from cloud storage
	 * @return array
	 */
	public function download($file) {
		return $this->download_file(false, $file);
	}
	
	public function backup($backup_array) {
		return $this->upload_files(null, $backup_array);
	}
	
	public function delete($files, $method_obj = false, $sizeinfo = array()) {
		return $this->delete_files(false, $files, $method_obj, $sizeinfo);
	}
		
	protected function required_configuration_keys() {
	}

	public function upload_files($ret, $backup_array) {

		global $updraftplus;

		$this->options = $this->get_options();

		if (!$this->options_exist($this->options)) {
			$updraftplus->log('No '.$this->method.' settings were found');
			$updraftplus->log(sprintf(__('No %s settings were found', 'updraftplus'), $this->description), 'error');
			return false;
		}

		$storage = $this->bootstrap();
		if (is_wp_error($storage)) return $updraftplus->log_wp_error($storage, false, true);

		$this->storage = $storage;

		$updraft_dir = trailingslashit($updraftplus->backups_dir_location());

		foreach ($backup_array as $file) {
			$updraftplus->log($this->method." upload ".((!empty($this->options['ownername'])) ? '(account owner: '.$this->options['ownername'].')' : '').": attempt: $file");
			try {
				if ($this->do_upload($file, $updraft_dir.$file)) {
					$updraftplus->uploaded_file($file);
				} else {
					$any_failures = true;
					$updraftplus->log('ERROR: '.$this->method.': Failed to upload file: '.$file);
					$updraftplus->log(__('Error', 'updraftplus').': '.$this->description.': '.sprintf(__('Failed to upload %s', 'updraftplus'), $file), 'error');
				}
			} catch (Exception $e) {
				$any_failures = true;
				$updraftplus->log('ERROR ('.get_class($e).'): '.$this->method.": $file: Failed to upload file: ".$e->getMessage().' (code: '.$e->getCode().', line: '.$e->getLine().', file: '.$e->getFile().')');
				$updraftplus->log(__('Error', 'updraftplus').': '.$this->description.': '.sprintf(__('Failed to upload %s', 'updraftplus'), $file), 'error');
			}
		}

		return (!empty($any_failures)) ? null : true;

	}

	public function listfiles($match = 'backup_') {

		try {

			if (!method_exists($this, 'do_listfiles')) {
				return new WP_Error('no_listing', 'This remote storage method does not support file listing');
			}

			$this->options = $this->get_options();
			if (!$this->options_exist($this->options)) return new WP_Error('no_settings', sprintf(__('No %s settings were found', 'updraftplus'), $this->description));

			$this->storage = $this->bootstrap();
			if (is_wp_error($this->storage)) return $this->storage;

			return $this->do_listfiles($match);
			
		} catch (Exception $e) {
			global $updraftplus;
			$updraftplus->log('ERROR: '.$this->method.": $file: Failed to list files: ".$e->getMessage().' (code: '.$e->getCode().', line: '.$e->getLine().', file: '.$e->getFile().')');
			return new WP_Error('list_failed', $this->description.': '.__('failed to list files', 'updraftplus'));
		}

	}

	public function delete_files($ret, $files, $ignore_it = false) {

		global $updraftplus;

		if (is_string($files)) $files = array($files);

		if (empty($files)) return true;
		if (!method_exists($this, 'do_delete')) {
			$updraftplus->log($this->method.": Delete failed: this storage method does not allow deletions");
			return false;
		}

		if (empty($this->storage)) {

			$this->options = $this->get_options();
			if (!$this->options_exist($this->options)) {
				$updraftplus->log('No '.$this->method.' settings were found');
				$updraftplus->log(sprintf(__('No %s settings were found', 'updraftplus'), $this->description), 'error');
				return false;
			}

			$this->storage = $this->bootstrap();
			if (is_wp_error($this->storage)) return $this->storage;

		}

		$ret = true;

		foreach ($files as $file) {
			$updraftplus->log($this->method.": Delete remote: $file");
			try {
				if (!$this->do_delete($file)) {
					$ret = false;
					$updraftplus->log($this->method.": Delete failed");
				} else {
					$updraftplus->log($this->method.": $file: Delete succeeded");
				}
			} catch (Exception $e) {
				$updraftplus->log('ERROR: '.$this->method.": $file: Failed to delete file: ".$e->getMessage().' (code: '.$e->getCode().', line: '.$e->getLine().', file: '.$e->getFile().')');
				$ret = false;
			}
		}
		
		return $ret;
		
	}

	public function download_file($ret, $files) {

		global $updraftplus;

		if (is_string($files)) $files = array($files);

		if (empty($files)) return true;
		if (!method_exists($this, 'do_download')) {
			$updraftplus->log($this->method.": Download failed: this storage method does not allow downloading");
			$updraftplus->log($this->description.': '.__('This storage method does not allow downloading', 'updraftplus'), 'error');
			return false;
		}

		$this->options = $this->get_options();
		if (!$this->options_exist($this->options)) {
			$updraftplus->log('No '.$this->method.' settings were found');
			$updraftplus->log(sprintf(__('No %s settings were found', 'updraftplus'), $this->description), 'error');
			return false;
		}

		try {
			$this->storage = $this->bootstrap();
			if (is_wp_error($this->storage)) return $updraftplus->log_wp_error($this->storage, false, true);
		} catch (Exception $e) {
			$ret = false;
			$updraftplus->log('ERROR: '.$this->method.": $files[0]: Failed to download file: ".$e->getMessage().' (code: '.$e->getCode().', line: '.$e->getLine().', file: '.$e->getFile().')');
			$updraftplus->log(__('Error', 'updraftplus').': '.$this->description.': '.sprintf(__('Failed to download %s', 'updraftplus'), $files[0]), 'error');
		}

		$ret = true;
		$updraft_dir = untrailingslashit($updraftplus->backups_dir_location());

		foreach ($files as $file) {
			try {
				$fullpath = $updraft_dir.'/'.$file;
				$start_offset = file_exists($fullpath) ? filesize($fullpath) : 0;

				if (false == ($this->do_download($file, $fullpath, $start_offset))) {
					$ret = false;
					$updraftplus->log($this->method." error: failed to download: $file");
					$updraftplus->log("$file: ".sprintf(__("%s Error", 'updraftplus'), $this->description).": ".__('Failed to download', 'updraftplus'), 'error');
				}

			} catch (Exception $e) {
				$ret = false;
				$updraftplus->log('ERROR: '.$this->method.": $file: Failed to download file: ".$e->getMessage().' (code: '.$e->getCode().', line: '.$e->getLine().', file: '.$e->getFile().')');
				$updraftplus->log(__('Error', 'updraftplus').': '.$this->description.': '.sprintf(__('Failed to download %s', 'updraftplus'), $file), 'error');
			}
		}

		return $ret;
	}

	public function config_print() {

		$this->options = $this->get_options();
		$method = $this->method;

		$classes = $this->get_css_classes();

		if ($this->chunked) {
		?>
			<tr class="<?php echo $classes; ?>">
				<td></td>
				<td><p><em><?php printf(__('%s is a great choice, because UpdraftPlus supports chunked uploads - no matter how big your site is, UpdraftPlus can upload it a little at a time, and not get thwarted by timeouts.', 'updraftplus'), $this->description);?></em></p></td>
			</tr>
		<?php
		}
			if (method_exists($this, 'do_config_print')) $this->do_config_print($this->options);

			if (!$this->test_button || (method_exists($this, 'should_print_test_button') && !$this->should_print_test_button())) return;

			echo $this->get_test_button_html($this->description);
	}

	public function config_print_javascript_onready() {
		$this->do_config_javascript();
	}
	
	protected function do_config_javascript() {
	}
	
	protected function options_exist($opts) {
		if (is_array($opts) && !empty($opts)) return true;
		return false;
	}

	public function bootstrap($opts = false, $connect = true) {
		if (false === $opts) $opts = $this->options;
		// Be careful of checking empty($opts) here - some storage methods may have no options until the OAuth token has been obtained
		if ($connect && !$this->options_exist($opts)) return new WP_Error('no_settings', sprintf(__('No %s settings were found', 'updraftplus'), $this->description));
		if (!empty($this->storage) && !is_wp_error($this->storage)) return $this->storage;
		return $this->do_bootstrap($opts, $connect);
	}

	public function credentials_test($posted_settings) {
	
		global $updraftplus;

		$required_test_parameters = $this->do_credentials_test_parameters();

		foreach ($required_test_parameters as $param => $descrip) {
			if (empty($posted_settings[$param])) {
				printf(__("Failure: No %s was given.", 'updraftplus'), $descrip);
				return;
			}
		}

		$this->storage = $this->bootstrap($posted_settings);
		if (is_wp_error($this->storage)) {
			echo __("Failed", 'updraftplus').": ";
			foreach ($this->storage->get_error_messages() as $key => $msg) {
				echo "$msg\n";
			}
			return;
		}

		$testfile = md5(time().rand()).'.txt';
		if ($this->do_credentials_test($testfile, $posted_settings)) {
			_e('Success', 'updraftplus');
			$this->do_credentials_test_deletefile($testfile, $posted_settings);
		} else {
			_e("Failed: We were not able to place a file in that directory - please check your credentials.", 'updraftplus');
		}

	}
}
