<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

class UpdraftCentral_Module_UpdraftVault {

	const MODULE_NAME = 'updraftvault';

	private $min_or_not;

	public function __construct() {
		add_action('updraftcentral_load_dashboard_js', array($this, 'load_dashboard_js'));
		add_action('updraftcentral_load_dashboard_css', array($this, 'load_dashboard_css'));
		add_action('updraftcentral_dashboard_post_navigation', array($this, 'dashboard_post_navigation'));
		add_action('updraftcentral_site_row_after_buttons', array($this, 'site_row_after_buttons'));
		add_filter('updraftcentral_main_navigation_items', array($this, 'main_navigation_items'));
		add_filter('updraftcentral_udrclion', array($this, 'udrclion'));
		add_filter('updraftcentral_template_directories', array($this, 'template_directories'));

		// Add available shortcuts for this module
		add_filter('updraftcentral_keyboard_shortcuts', array($this, 'keyboard_shortcuts'));
		
		$this->min_or_not = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
	}

	/**
	 * Adds keyboard shortcut(s) available for this module
	 *
	 * @param array $shortcuts UpdraftCentral keyboard shortcuts
	 * @return array Updated UpdraftCentral keyboard shortcuts
	 */
	public function keyboard_shortcuts($shortcuts) {
		$shortcuts['browse_updraftvault_files'] = array(
			'key' => 'V',
			'description' => __('Browse UpdraftVault files', 'updraftcentral'),
			'action' => 'updraftcentral_site_browse_files', /* ID or class name or a jQuery selector or a callback function (only applicable when registered from javascript). Element to trigger to load the content. */
			'menu' => self::MODULE_NAME /* Name of the navigation item or menu. */
		);

		return $shortcuts;
	}
	
	public function load_dashboard_js($enqueue_version) {
		wp_enqueue_script('amazon-aws-s3-js-sdk', UD_CENTRAL_URL.'/js/aws-sdk/aws-sdk'.$this->min_or_not.'.js', array(), '2.2.47');
		wp_enqueue_script('updraftcentral-dashboard-activities-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.$this->min_or_not.'.js', array('updraftcentral-dashboard', 'jquery'), $enqueue_version);
	}
	
	public function load_dashboard_css($enqueue_version) {
		wp_enqueue_style('updraftcentral-dashboard-css-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.$this->min_or_not.'.css', array('updraftcentral-dashboard-css'), $enqueue_version);
	}
	
	public function udrclion($localize) {
		$localize[self::MODULE_NAME] = include(__DIR__.'/translations-dashboard.php');
		return $localize;
	}
	
	public function site_row_after_buttons() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/site-row-buttons.php');
	}

	public function main_navigation_items($items) {

		$items[self::MODULE_NAME] = array('label' => __('UpdraftVault', 'updraftcentral'), 'sort_order' => 35);
		
		return $items;
	}

	public function dashboard_post_navigation() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/management-actions.php');
	}

	public function template_directories($template_directories) {
		$template_directories[self::MODULE_NAME] = __DIR__.'/templates';
		return $template_directories;
	}
}

new UpdraftCentral_Module_UpdraftVault();
