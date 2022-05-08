<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

if (defined('UPDRAFTCENTRAL_ENABLE_WPO') && !UPDRAFTCENTRAL_ENABLE_WPO) return;

/**
 * This class handles WP-Optimize management remotely
 *
 * Provides a way to access and update `WP-Optimize`, `Table Information` and `Settings` tabs
 * of WP-Optimize plugin
 */
class UpdraftCentral_Module_WPO {

	const MODULE_NAME = 'wpo';

	private $min_or_not;

	/**
	 * UpdraftCentral_Module_WPO constructor.
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
		
		$this->min_or_not = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
	}
	
	/**
	 * Enqueues WP-Optimize module's js files
	 *
	 * @param  string $enqueue_version The version number
	 * @return void
	 */
	public function load_dashboard_js($enqueue_version) {
		wp_enqueue_script('updraftcentral-dashboard-activities-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.$this->min_or_not.'.js', array('updraftcentral-dashboard', 'jquery'), $enqueue_version);

		// Using tablesorter to help with organising the DB size on Table Information
		// https://github.com/Mottie/tablesorter
		wp_enqueue_script('tablesorter-js', UD_CENTRAL_URL.'/js/tablesorter/jquery.tablesorter'.$this->min_or_not.'.js', array('jquery'), $enqueue_version);
		
		wp_enqueue_script('tablesorter-widgets-js', UD_CENTRAL_URL.'/js/tablesorter/jquery.tablesorter.widgets'.$this->min_or_not.'.js', array('jquery'), $enqueue_version);

		wp_enqueue_script('jquery-serialize-json', UD_CENTRAL_URL.'/js/serialize-json/jquery.serializejson'.$this->min_or_not.'.js', array('jquery'), $enqueue_version);

		// De-register to defeat any plugins that may have registered incompatible versions (e.g. WooCommerce 2.5 beta1 still has the Select 2 3.5 series)
		wp_deregister_script('select2');
		wp_deregister_style('select2');

		$select2_version = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '4.0.3'.'.'.time() : '4.0.3';

		wp_enqueue_script('select2', UD_CENTRAL_URL."/js/select2/select2".$this->min_or_not.".js", array('jquery'), $select2_version);
		wp_enqueue_style('select2', UD_CENTRAL_URL."/css/select2/select2".$this->min_or_not.".css", array(), $select2_version);
	}
	
	/**
	 * Enqueues WP-Optimize module's css files
	 *
	 * @param  string $enqueue_version The version number
	 * @return void
	 */
	public function load_dashboard_css($enqueue_version) {
		wp_enqueue_style('updraftcentral-dashboard-css-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.$this->min_or_not.'.css', array('updraftcentral-dashboard-css'), $enqueue_version);

		wp_enqueue_style('tablesorter-css', UD_CENTRAL_URL.'/css/tablesorter/theme.default.min.css', array(), $enqueue_version);
	}
	
	/**
	 * Loads WP-Optimize module's translations file
	 *
	 * @param  array $localize The array with all the modules translations files
	 * @return array The updated array with translations
	 */
	public function udrclion($localize) {
		$localize[self::MODULE_NAME] = include(__DIR__.'/translations-dashboard.php');
		$localize[self::MODULE_NAME]['images'] = trailingslashit(plugins_url('images', __FILE__));
		return $localize;
	}
	
	/**
	 * Adds the buttons in the site row for WP-Optimize module
	 *
	 * @return void
	 */
	public function site_row_after_buttons() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/site-row-buttons.php');
	}

	/**
	 * Adds 'WP-Optimize' navigation item to main navigation
	 *
	 * @param  array $items An array of module names as navigation items
	 * @return array Updated array with this module's name
	 */
	public function main_navigation_items($items) {

		$items[self::MODULE_NAME] = array('label' => __('WP-Optimize', 'updraftcentral'), 'sort_order' => 35);
		
		return $items;
	}

	/**
	 * Adds site management buttons at the top
	 */
	public function dashboard_post_navigation() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/management-actions.php');
	}

	/**
	 * Adds WP-Optimize module's template directory
	 *
	 * @param  array $template_directories The array with all modules template directories
	 * @return array The updated array with this module's template directory in it.
	 */
	public function template_directories($template_directories) {
		$template_directories[self::MODULE_NAME] = __DIR__.'/templates';
		return $template_directories;
	}
}

new UpdraftCentral_Module_WPO();
