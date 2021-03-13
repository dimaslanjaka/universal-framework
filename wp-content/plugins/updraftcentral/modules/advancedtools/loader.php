<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

/**
 * This class handles Advanced Tools option
 *
 * Provides a way to access and update `advanced tools` tab
 * of UpdraftPlus Backup/Restore plugin
 */
class UpdraftCentral_Module_AdvancedTools {

	const MODULE_NAME = 'advancedtools';

	/**
	 * UpdraftCentral_Module_AdvancedTools constructor.
	 *
	 * Adds required actions and filter hooks
	 */
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
	}

	/**
	 * Adds keyboard shortcut(s) available for this module
	 *
	 * @param array $shortcuts UpdraftCentral keyboard shortcuts
	 * @return array Updated UpdraftCentral keyboard shortcuts
	 */
	public function keyboard_shortcuts($shortcuts) {
		$shortcuts['show_advanced_tools'] = array(
			'key' => 'T',
			'description' => __('Show advanced tools', 'updraftcentral'),
			'action' => 'updraftcentral_site_advanced_settings', /* ID or class name or a jQuery selector or a callback function (only applicable when registered from javascript). Element to trigger to load the content. */
			'menu' => self::MODULE_NAME /* Name of the navigation item or menu. */
		);

		return $shortcuts;
	}

	/**
	 * Enqueues Advanced Tools module's js files
	 *
	 * @param  string $enqueue_version The version number
	 * @return void
	 */
	public function load_dashboard_js($enqueue_version) {
			wp_enqueue_script('updraftcentral-dashboard-activities-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.'.js', array('updraftcentral-dashboard', 'jquery'), $enqueue_version);
	}

	/**
	 * Enqueues Advanced Tools module's css files
	 *
	 * @param  string $enqueue_version The version number
	 * @return void
	 */
	public function load_dashboard_css($enqueue_version) {
		wp_enqueue_style('updraftcentral-dashboard-css-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.'.css', array('updraftcentral-dashboard-css'), $enqueue_version);
	}

	/**
	 * Loads Advanced Tools module's translations file
	 *
	 * @param  array $localize The array with all the modules translations files
	 * @return array The updated array with translations
	 */
	public function udrclion($localize) {
		$localize[self::MODULE_NAME] = include(__DIR__.'/translations-dashboard.php');
		return $localize;
	}

	/**
	 * Adds the buttons in the site row for Advanced Tools module
	 *
	 * @return void
	 */
	public function site_row_after_buttons() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/site-row-buttons.php');
	}

	/**
	 * Adds 'Tools' navigation item to main navigation
	 *
	 * @param  array $items An array of module names as navigation items
	 * @return array Updated array with this module's name
	 */
	public function main_navigation_items($items) {

		$items[self::MODULE_NAME] = array('label' => __('Tools', 'updraftcentral'), 'sort_order' => 50);
		
		return $items;
	}

	/**
	 * Adds site management buttons at the top
	 */
	public function dashboard_post_navigation() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/management-actions.php');
	}

	/**
	 * Adds Advanced Tools module's template directory
	 *
	 * @param  array $template_directories The array with all modules template directories
	 * @return array The updated array with this module's template directory in it.
	 */
	public function template_directories($template_directories) {
		$template_directories[self::MODULE_NAME] = __DIR__.'/templates';
		return $template_directories;
	}
}

new UpdraftCentral_Module_AdvancedTools();
