<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

class UpdraftCentral_Module_Site_Search {
	const MODULE_NAME = 'site_search';

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action('updraftcentral_load_dashboard_js', array($this, 'load_dashboard_js'));
		add_action('updraftcentral_load_dashboard_css', array($this, 'load_dashboard_css'));
		add_filter('updraftcentral_udrclion', array($this, 'udrclion'));
		add_filter('updraftcentral_template_directories', array($this, 'template_directories'));
		add_action('updraftcentral_dashboard_pre_header', array($this, 'dashboard_pre_header'), 999);
	}

	/**
	 * Function to load the template directories
	 *
	 * @param  string $template_directories - The array with all template directories
	 * @return string $template_directories - The updated array with this modules templates in it
	 */
	public function template_directories($template_directories) {
		$template_directories[self::MODULE_NAME] = __DIR__.'/templates';
		return $template_directories;
	}
	
	/**
	 * Function to load this modules js files
	 *
	 * @param {string} $enqueue_version - the version number
	 * @return {void}
	 */
	public function load_dashboard_js($enqueue_version) {
		wp_enqueue_script('updraftcentral-dashboard-activities-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.'.js', array('updraftcentral-dashboard', 'jquery'), $enqueue_version);
	}
	
	/**
	 * Function to load this modules css files
	 *
	 * @param {string} $enqueue_version - the version number
	 * @return {void}
	 */
	public function load_dashboard_css($enqueue_version) {
		wp_enqueue_style('updraftcentral-dashboard-css-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.'.css', array('updraftcentral-dashboard-css'), $enqueue_version);
	}

	/**
	 * Function to load this modules translations file
	 *
	 * @param {array} $localize -  The array with all the modules translations files
	 * @return {array} $localize - The updated array with this modules templates in it.
	 */
	public function udrclion($localize) {
		$localize[self::MODULE_NAME] = include(__DIR__.'/translations-dashboard.php');
		return $localize;
	}

	/**
	 * Function to load the file with management actions
	 *
	 * @return {void}
	 */
	public function dashboard_pre_header() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/management-actions.php');
	}
}

$updraftcentral_module_site_search = new UpdraftCentral_Module_Site_Search();// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable -- Unused variable $updraftcentral_module_site_search
