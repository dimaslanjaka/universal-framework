<?php

if (!defined('UD_CENTRAL_DIR')) die('No direct access allowed');

// Options handling
if (!defined('ABSPATH')) die('No direct access allowed');

if (class_exists('UpdraftCentral_Options')) return;

class UpdraftCentral_Options {
	
	public static function get_option($option, $default = false) {
		$tmp = get_site_option('updraftcentral_options');
		if (isset($tmp[$option])) {
			return $tmp[$option];
		} else {
			return $default;
		}
	}

	public static function update_option($option, $value, $use_cache = true) {
		$tmp = get_site_option('updraftcentral_options', array(), $use_cache);
		if (!is_array($tmp)) $tmp = array();
		$tmp[$option] = $value;
		return update_site_option('updraftcentral_options', $tmp);
	}

	public static function delete_option($option) {
		$tmp = get_site_option('updraftcentral_options');
		if (is_array($tmp)) {
			if (isset($tmp[$option])) unset($tmp[$option]);
		} else {
			$tmp = array();
		}
		update_site_option('updraftcentral_options', $tmp);
	}
}
