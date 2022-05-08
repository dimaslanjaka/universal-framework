<?php
	
if (!defined('UD_CENTRAL_DIR')) die('Security check');

/**
 * This class displays recorded Events
 */
class UpdraftCentral_Module_Events {

	const MODULE_NAME = 'events';

	private $min_or_not;

	/**
	 * UpdraftCentral_Module_Events constructor.
	 *
	 * Adds required actions and filter hooks
	 */
	public function __construct() {
		add_action('updraftcentral_load_dashboard_css', array($this, 'load_dashboard_css'));
		add_action('updraftcentral_dashboard_post_navigation', array($this, 'dashboard_post_navigation'));
		add_action('updraftcentral_dashboard_post_content', array($this, 'dashboard_post_content'));
		add_filter('updraftcentral_main_navigation_items', array($this, 'main_navigation_items'));
		add_filter('updraftcentral_template_directories', array($this, 'template_directories'));
		add_action('updraftcentral_load_dashboard_js', array($this, 'load_dashboard_js'));
		add_filter('updraftcentral_udrclion', array($this, 'udrclion'));

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
		$shortcuts['events'] = array(
			'key' => 'E',
			'description' => __('Events', 'updraftcentral'),
			'action' => '', /* ID or class name or a jQuery selector or a callback function (only applicable when registered from javascript). Element to trigger to load the content. In this case, this shortcut does not need any element to display its content since it automatically displays them. */
			'menu' => self::MODULE_NAME, /* Name of the navigation item or menu. */
			'site_required' => false /* Content is not associated or linked to a site. */
		);

		return $shortcuts;
	}

	/**
	 * Loads Events module's template directory
	 *
	 * @param  array $template_directories The array with all modules template directories
	 * @return array The updated array with this module's template directory in it.
	 */
	public function template_directories($template_directories) {
		$template_directories[self::MODULE_NAME] = __DIR__.'/templates';
		return $template_directories;
	}

	/**
	 * Enqueues Events module's js files
	 *
	 * @param  string $enqueue_version The version number
	 * @return void
	 */
	public function load_dashboard_js($enqueue_version) {
		wp_enqueue_script('updraftcentral-dashboard-activities-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.$this->min_or_not.'.js', array('updraftcentral-dashboard', 'jquery'), $enqueue_version);
	}

	/**
	 * Enqueues Events module's css files
	 *
	 * @param  string $enqueue_version The version number
	 * @return void
	 */
	public function load_dashboard_css($enqueue_version) {
		wp_enqueue_style('updraftcentral-dashboard-css-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.'.css', array('updraftcentral-dashboard-css'), $enqueue_version);
	}

	/**
	 * Loads Events module's translations file
	 *
	 * @param  array $localize The array with all the modules translations files
	 * @return array The updated array with translations
	 */
	public function udrclion($localize) {
		$localize[self::MODULE_NAME] = include(__DIR__.'/translations-dashboard.php');
		return $localize;
	}

	/**
	 * Adds 'Events' menu to main navigation
	 *
	 * @param  array $items An array of module names as navigation items
	 * @return array Updated array with 'Upgrade' menu, if premium version of plugin not installed
	 */
	public function main_navigation_items($items) {
		$items[self::MODULE_NAME] = array('label' => __('Events', 'updraftcentral'), 'sort_order' => 999);
		return $items;
	}

	/**
	 * Adds site management buttons at the top
	 */
	public function dashboard_post_navigation() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/management-actions.php');
	}

	/**
	 * Includes events table template
	 *
	 * @return void
	 */
	public function dashboard_post_content() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/events-table.php');
	}
}

new UpdraftCentral_Module_Events();
