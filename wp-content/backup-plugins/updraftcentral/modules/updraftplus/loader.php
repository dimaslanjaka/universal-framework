<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

class UpdraftCentral_Module_UpdraftPlus {
	const MODULE_NAME = 'updraftplus';

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

		/* Backup */
		$shortcuts['backup_site'] = array(
			'key' => 'B',
			'description' => __('Backup site', 'updraftcentral'),
			'action' => 'updraftcentral_site_backup_now', // ID or class name or a jQuery selector or a callback function (only applicable when registered from javascript). Element to trigger to load the content.
			'menu' => 'backups', // Name of the navigation item or menu, since MODULE_NAME name isn't the same with the navigation item name we can't use that.
			'popup' => true // Indicates whether this action generates a popup window. Will clear the extracontents container before showing the popup to avoid confusion when displaying content to the user.
		);
		
		/* Backup Increment */
		$shortcuts['backup_site_increment'] = array(
			'key' => 'I',
			'description' => __('Backup site increment', 'updraftcentral'),
			'action' => 'updraftcentral_site_backup_now_increment', // ID or class name or a jQuery selector or a callback function (only applicable when registered from javascript). Element to trigger to load the content.
			'menu' => 'backups', // Name of the navigation item or menu, since MODULE_NAME name isn't the same with the navigation item name we can't use that.
			'popup' => true // Indicates whether this action generates a popup window. Will clear the extracontents container before showing the popup to avoid confusion when displaying content to the user.
		);

		/* Existing Backups */
		$shortcuts['existing_backups'] = array(
			'key' => 'E',
			'description' => __('Existing backups', 'updraftcentral'),
			'action' => 'updraftcentral_site_backups_manage',
			'menu' => 'backups'
		);

		/* Settings */
		$shortcuts['backup_settings'] = array(
			'key' => 'Z',
			'description' => __('Backup settings', 'updraftcentral'),
			'action' => 'updraftcentral_site_backup_settings',
			'menu' => 'backups'
		);

		/* Site Configuration and Sites section */
		$shortcuts['site_configuration'] = array(
			'key' => 'X',
			'description' => __('Site configuration', 'updraftcentral'),
			'action' => 'div.updraft_site_actions span.updraftcentral_site_editdescription > span',
			'menu' => '' /* If empty, defaults to "Sites" section. Since site configuration runs across all sections/tabs with the same content to load. */
		);

		$shortcuts['sites'] = array(
			'key' => 'S',
			'description' => __('Go back to Sites', 'updraftcentral'),
			'action' => '',
			'menu' => 'sites'
		);

		return $shortcuts;
	}

	public function template_directories($template_directories) {
		$template_directories[self::MODULE_NAME] = __DIR__.'/templates';

		return $template_directories;
	}

	public function site_row_after_buttons() {
		UpdraftCentral()->include_template(self::MODULE_NAME.'/site-row-buttons.php');
	}

	public function load_dashboard_css($enqueue_version) {
		wp_enqueue_style('jquery-labelauty', UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/jquery-labelauty.css', array(), '20160622-ud');
		wp_enqueue_style('updraftcentral-dashboard-css-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.'.css', array('updraftcentral-dashboard-css'), $enqueue_version);
	}

	public function load_dashboard_js($enqueue_version) {
		$min_or_not = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
		
		// Code on top of the framework for doing actual work
		wp_register_script('jquery-labelauty', UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/jquery-labelauty.js', array('jquery'), '20150925');

		wp_enqueue_script('updraftcentral-dashboard-activities-'.self::MODULE_NAME, UD_CENTRAL_URL.'/modules/'.self::MODULE_NAME.'/'.self::MODULE_NAME.$min_or_not.'.js', array('updraftcentral-dashboard', 'jquery-labelauty'), $enqueue_version);
	}

	public function main_navigation_items($items) {
		$items['backups'] = array('label' => __('Backups', 'updraftcentral'), 'sort_order' => 20);

		return $items;
	}

	public function udrclion($localize) {
		$localize['updraftplus'] = include __DIR__.'/translations-dashboard.php';
		$localize['updraftplus']['conditional_logic'] = array(
			'day_of_the_week_options' => $this->list_days_of_the_week(),
			'logic_options' => array(
				array(
					'label' => __('on every backup', 'updraftcentral'),
					'value' => '',
				),
				array(
					'label' => __('if any of the following conditions are matched:', 'updraftcentral'),
					'value' => 'any',
				),
				array(
					'label' => __('if all of the following conditions are matched:', 'updraftcentral'),
					'value' => 'all',
				),
			),
			'operand_options' => array(
				array(
					'label' => __('Day of the week', 'updraftcentral'),
					'value' => 'day_of_the_week',
				),
				array(
					'label' => __('Day of the month', 'updraftcentral'),
					'value' => 'day_of_the_month',
				),
			),
			'operator_options' => array(
				array(
					'label' => __('is', 'updraftcentral'),
					'value' => 'is',
				),
				array(
					'label' => __('is not', 'updraftcentral'),
					'value' => 'is_not',
				),
			),
		);

		return $localize;
	}

	public function dashboard_post_navigation() {
		global $updraft_central;
		$updraft_central->include_template(self::MODULE_NAME.'/management-actions.php');
	}

	/**
	 * Return a listing of days of the week
	 *
	 * @param Boolean $respect_start_of_week whether to use the WordPress's start_of_week setting
	 * @return Array the days of the week
	 */
	private function list_days_of_the_week($respect_start_of_week = true) {
		global $wp_locale;
		$days_of_the_week = array();
		$start = $respect_start_of_week ? get_option('start_of_week', 1) : 1;
		for ($i = $start; $i < $start + 7; $i++) {
			$days_of_the_week[] = array(
				'index' => $i % 7,
				'value' => $wp_locale->get_weekday($i % 7),
			);
		}
		return $days_of_the_week;
	}
}

$updraftcentral_module_updraftplus = new UpdraftCentral_Module_UpdraftPlus();// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable -- Unused variable $updraftcentral_module_updraftplus
