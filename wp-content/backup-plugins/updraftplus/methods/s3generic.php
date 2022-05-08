<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed.');

require_once(UPDRAFTPLUS_DIR.'/methods/s3.php');

/**
 * Converted to multi-options (Feb 2017-) and previous options conversion removed: Yes
 */
class UpdraftPlus_BackupModule_s3generic extends UpdraftPlus_BackupModule_s3 {

	protected function set_region($obj, $region = '', $bucket_name = '') {
		$config = $this->get_config();
		$endpoint = ('' != $region && 'n/a' != $region) ? $region : $config['endpoint'];
		global $updraftplus;
		if ($updraftplus->backup_time) $updraftplus->log("Set endpoint: $endpoint");
		$obj->setEndpoint($endpoint);
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
			'endpoint' => '',
		);
	}

	/**
	 * Retrieve specific options for this remote storage module
	 *
	 * @return Array - an array of options
	 */
	protected function get_config() {
		$opts = $this->get_options();
		$opts['whoweare'] = 'S3';
		$opts['whoweare_long'] = __('S3 (Compatible)', 'updraftplus');
		$opts['key'] = 's3generic';
		return $opts;
	}

	public function config_print() {
		// 5th parameter = control panel URL
		// 6th = image HTML
		$this->config_print_engine('s3generic', 'S3', __('S3 (Compatible)', 'updraftplus'), 'S3', '', '', true);
	}

	public function credentials_test($posted_settings) {
		$this->credentials_test_engine($this->get_config(), $posted_settings);
	}
}
