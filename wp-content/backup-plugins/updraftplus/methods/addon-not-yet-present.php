<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed.');

if (!class_exists('UpdraftPlus_BackupModule')) require_once(UPDRAFTPLUS_DIR.'/methods/backup-module.php');

class UpdraftPlus_BackupModule_AddonNotYetPresent extends UpdraftPlus_BackupModule {

	private $method;

	private $description;

	public function __construct($method, $description, $required_php = false, $image = null) {
		$this->method = $method;
		$this->description = $description;
		$this->required_php = $required_php;
		$this->image = $image;
		$this->error_msg = 'This remote storage method ('.$this->description.') requires PHP '.$this->required_php.' or later';
		$this->error_msg_trans = sprintf(__('This remote storage method (%s) requires PHP %s or later.', 'updraftplus'), $this->description, $this->required_php);
	}

	public function backup($backup_array) {

		global $updraftplus;

		$updraftplus->log("You do not have the UpdraftPlus ".$this->method.' add-on installed - get it from '.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/").'');
		
		$updraftplus->log(sprintf(__('You do not have the UpdraftPlus %s add-on installed - get it from %s', 'updraftplus'), $this->description, ''.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/").''), 'error', 'missingaddon-'.$this->method);
		
		return false;

	}

	public function delete($files, $method_obj = false, $sizeinfo = array()) {

		global $updraftplus;

		$updraftplus->log('You do not have the UpdraftPlus '.$this->method.' add-on installed - get it from '.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/").'');
		
		$updraftplus->log(sprintf(__('You do not have the UpdraftPlus %s add-on installed - get it from %s', 'updraftplus'), $this->description, ''.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/").''), 'error', 'missingaddon-'.$this->method);

		return false;

	}

	public function listfiles($match = 'backup_') {
		return new WP_Error('no_addon', sprintf(__('You do not have the UpdraftPlus %s add-on installed - get it from %s', 'updraftplus'), $this->description, ''.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/")));
	}

	/**
	 * download method: takes a file name (base name), and removes it from the cloud storage
	 *
	 * @param  string $file specific file for being removed from cloud storage
	 * @return boolean
	 */
	public function download($file) {

		global $updraftplus;

		$updraftplus->log('You do not have the UpdraftPlus '.$this->method.' add-on installed - get it from '.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/").'');
		$updraftplus->log(sprintf(__('You do not have the UpdraftPlus %s add-on installed - get it from %s', 'updraftplus'), $this->description, ''.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/").''), 'error', 'missingaddon-'.$this->method);
		return false;

	}

	public function config_print() {

		$link = sprintf(__('%s support is available as an add-on', 'updraftplus'), $this->description).' - <a href="'.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/".$this->method."/").'">'.__('follow this link to get it', 'updraftplus');

		$default = '
		<tr class="updraftplusmethod '.$this->method.'">
			<th>'.$this->description.':</th>
			<td>'.((!empty($this->image)) ? '<p><img src="'.UPDRAFTPLUS_URL.'/images/'.$this->image.'"></p>' : '').$link.'</a></td>
			</tr>';

		if (version_compare(phpversion(), $this->required_php, '<')) {
			$default .= '<tr class="updraftplusmethod '.$this->method.'">
			<th></th>
			<td>
				<em>
					'.htmlspecialchars($this->error_msg_trans).'
					'.htmlspecialchars(__('You will need to ask your web hosting company to upgrade.', 'updraftplus')).'
					'.sprintf(__('Your %s version: %s.', 'updraftplus'), 'PHP', phpversion()).'
				</em>
			</td>
			</tr>';
		}

		echo $default;
		
	}
}
