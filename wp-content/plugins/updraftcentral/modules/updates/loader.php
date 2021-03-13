<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

class UpdraftCentral_Module_Updates {
	const MODULE_NAME = 'updates';

	public function __construct() {
		add_action('updraftcentral_load_dashboard_js', array($this, 'load_dashboard_js'));
		add_action('updraftcentral_load_dashboard_css', array($this, 'load_dashboard_css'));
		add_filter('updraftcentral_udrclion', array($this, 'udrclion'));
		add_action('updraftcentral_dashboard_post_navigation', array($this, 'dashboard_post_navigation'));
		add_filter('updraftcentral_main_navigation_items', array($this, 'main_navigation_items'));
		add_action('updraftcentral_site_row_after_buttons', array($this, 'site_row_after_buttons'));
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
		$shortcuts['mass_updates'] = array(
			'key' => 'M',
			'description' => __('Mass updates', 'updraftcentral'),
			'action' => 'updraftcentral_action_show_all_updates', /* ID or class name or a jQuery selector or a callback function (only applicable when registered from javascript). Element to trigger to load the content. */
			'menu' => self::MODULE_NAME,  /* Name of the navigation item or menu. */
			'site_required' => false /* Content is not associated or linked to a site. */
		);

		return $shortcuts;
	}

	public function site_row_after_buttons() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/site-row-buttons.php');
	}

	public function template_directories($template_directories) {
		$template_directories[self::MODULE_NAME] = __DIR__.'/templates';

		return $template_directories;
	}

	public function load_dashboard_js($enqueue_version) {
		$min_or_not = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
		// Code on top of the framework for doing actual work
		wp_enqueue_script('updraftcentral-dashboard-activities-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.$min_or_not.'.js', array('updraftcentral-dashboard', 'jquery'), $enqueue_version);
	
		wp_enqueue_script('jquery-ui-progressbar', array('jquery', 'jquery-ui'));
	}

	public function load_dashboard_css($enqueue_version) {
		wp_enqueue_style('updraftcentral-dashboard-css-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.'.css', array('updraftcentral-dashboard-css'), $enqueue_version);
	}

	public function main_navigation_items($items) {
		$items[self::MODULE_NAME] = array('label' => __('Updates', 'updraftcentral'), 'sort_order' => 30);

		return $items;
	}

	public function udrclion($localize) {
		$localize[self::MODULE_NAME] = include __DIR__.'/translations-dashboard.php';

		return $localize;
	}

	public function dashboard_post_navigation() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/management-actions.php');
	}
}

new UpdraftCentral_Module_Updates();
