<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed.');

require_once(UPDRAFTPLUS_DIR.'/methods/s3.php');

/**
 * Converted to multi-options (Feb 2017-) and previous options conversion removed: Yes
 */
class UpdraftPlus_BackupModule_dreamobjects extends UpdraftPlus_BackupModule_s3 {

	private $dreamobjects_endpoints = array('objects-us-west-1.dream.io');

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
		);
	}

	/**
	 * Retrieve specific options for this remote storage module
	 *
	 * @return Array - an array of options
	 */
	protected function get_config() {
		$opts = $this->get_options();
		$opts['whoweare'] = 'DreamObjects';
		$opts['whoweare_long'] = 'DreamObjects';
		$opts['key'] = 'dreamobjects';
		if (empty($opts['endpoint'])) $opts['endpoint'] = $this->dreamobjects_endpoints[0];
		return $opts;
	}

	public function config_print() {
		$this->config_print_engine('dreamobjects', 'DreamObjects', 'DreamObjects', 'DreamObjects', 'https://panel.dreamhost.com/index.cgi?tree=storage.dreamhostobjects', '<a href="https://dreamhost.com/cloud/dreamobjects/"><img alt="DreamObjects" src="'.UPDRAFTPLUS_URL.'/images/dreamobjects_logo-horiz-2013.png"></a>', $this->dreamobjects_endpoints);
	}

	public function credentials_test($posted_settings) {
		$this->credentials_test_engine($this->get_config(), $posted_settings);
	}
}
