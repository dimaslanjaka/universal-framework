<?php

if (!defined('UD_CENTRAL_DIR')) die('No direct access allowed');

if (!class_exists('Updraft_Notices_1_0')) require_once(UD_CENTRAL_DIR.'/modules/notices/updraft-notices.php');

class UpdraftCentral_Notices extends Updraft_Notices_1_0 {

	protected static $_instance = null;

	private $initialized = false;

	protected $notices_content = array();
	
	protected $self_affiliate_id;

	public static function instance() {
		if (empty(self::$_instance)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	protected function populate_notices_content() {
		
		$parent_notice_content = parent::populate_notices_content();

		$child_notice_content = array(
			1 => array(
				'prefix' => __('Reason to upgrade to UpdraftCentral Premium #1:', 'updraftcentral'),
				'title' => '',
				'text' => __('Enjoy the benefits of professional, fast, and friendly help whenever you need it.', 'updraftcentral'),
				'image' => 'support.png',
				'button_link' => 'https://updraftcentral.com/?utm_source=updraftcentral-plugin-page&utm_medium=banner',
				'button_meta' => 'updraftcentral',
				'dismiss_time' => 'dismiss_notice',
				'supported_positions' => $this->dashboard_top_or_report,
				'validity_function' => 'is_updraftcentralpremium_installed',
			),
			2 => array(
				'prefix' => __('Reason to upgrade to UpdraftCentral Premium #2:', 'updraftcentral'),
				'title' => '',
				'text' => __('Create and manage users on all your WordPress sites from one place!', 'updraftcentral'),
				'image' => 'users.png',
				'button_link' => 'https://updraftcentral.com/?utm_source=updraftcentral-plugin-page&utm_medium=banner',
				'button_meta' => 'updraftcentral',
				'dismiss_time' => 'dismiss_notice',
				'supported_positions' => $this->dashboard_top_or_report,
				'validity_function' => 'is_updraftcentralpremium_installed',
			),
			3 => array(
				'prefix' => __('Reason to upgrade to UpdraftCentral Premium #3:', 'updraftcentral'),
				'title' => '',
				'text' => __('Upgrade to UpdraftCentral Cloud to let us host and maintain it to save you time and effort.', 'updraftcentral'),
				'image' => 'cloud.png',
				'button_link' => 'https://updraftcentral.com/?utm_source=updraftcentral-plugin-page&utm_medium=banner',
				'button_meta' => 'updraftcentral',
				'dismiss_time' => 'dismiss_notice',
				'supported_positions' => $this->dashboard_top_or_report,
				'validity_function' => 'is_updraftcentralpremium_installed',
			),
		);

		return array_merge($parent_notice_content, $child_notice_content);
	}
	
	/**
	 * Call this method to setup the notices
	 */
	public function notices_init() {
		if ($this->initialized) return;
		$this->initialized = true;
		$this->notices_content = (defined('UPDRAFTCENTRAL_NOADS_B') && UPDRAFTCENTRAL_NOADS_B) ? array() : $this->populate_notices_content();
	}

	protected function is_updraftcentralpremium_installed($product = 'updraftcentral-premium', $also_require_active = false) {
		return parent::is_plugin_installed($product, $also_require_active);
	}

	protected function translation_needed($plugin_base_dir = null, $product_name = null) {// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable -- Declaration of UpdraftCentral_Notices::translation_needed() should be compatible with Updraft_Notices_1_0::translation_needed
		return parent::translation_needed(UD_CENTRAL_DIR, 'updraftcentral');
	}
	
	protected function url_start($html_allowed, $url, $https = false, $website_home = 'updraftcentral.com') {
		return parent::url_start($html_allowed, $url, $https, $website_home);
	}
	
	protected function check_notice_dismissed($dismiss_time) {

		$time_now = defined('UPDRAFTCENTRAL_NOTICES_FORCE_TIME') ? UPDRAFTCENTRAL_NOTICES_FORCE_TIME : time();
	
		$notice_dismiss = ($time_now < UpdraftCentral_Options::get_option('dismissed_general_notices_until', 0));

		$dismiss = false;

		if ('dismiss_notice' == $dismiss_time) $dismiss = $notice_dismiss;

		return $dismiss;
	}

	protected function render_specified_notice($advert_information, $return_instead_of_echo = false, $position = 'top') {
	
		if ('bottom' == $position) {
			$template_file = 'bottom-notice.php';
		} elseif ('report' == $position) {
			$template_file = 'report.php';
		} elseif ('report-plain' == $position) {
			$template_file = 'report-plain.php';
		} else {
			$template_file = 'horizontal-notice.php';
		}

		return UpdraftCentral()->include_template('notices/'.$template_file, $return_instead_of_echo, $advert_information);
	}
}

$GLOBALS['updraftcentral_notices'] = UpdraftCentral_Notices::instance();
