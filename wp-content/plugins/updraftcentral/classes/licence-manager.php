<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

/*
Handles entitlements.

This default class handles entitlements in conjunction with the Simba Plugins Updates + Licensing Manager - https://wordpress.org/plugins/simba-plugin-updates-manager/ . Thus, you will need that plugin to be installed and active, if you want to handle licensing - otherwise, all usage is unlimited (for users who can get to the dashboard).

If it is installed, then admins get unlimited access, and everyone else requires valid licenses. You can modify this with the updraftcentral_licencemanager_nolicencesrequired filter to remove all licensing; or, various other filters to replace things piecemeal.

*/

if (!class_exists('UpdraftCentral_Licence_Manager')) :

class UpdraftCentral_Licence_Manager {

	private $user = null;

	private $rc = null;

	private $no_licences_required = false;

	/**
	 * Pass in a UpdraftCentral_User
	 *
	 * @param string $user
	 * @param array  $central_object
	 */
	public function __construct($user, $central_object) {

		/*
		Filter: updraftcentral_licencemanager_nolicencesrequired
		Use this filter to de-activate licensing for specified users - allow unlimited access to everyone. By default, we limit it to admins.
		(You then also need to hook into various other filters in order to actually do something useful - the default values allow everyone unlimited licences)
		e.g. to optionally integrate with the Simba updates/licensing manager
		$simba_manager_installed = class_exists('Updraft_Manager_Premium');
		$no_licences_required = ($no_licences_required || !$simba_manager_installed);
		$require_spm_version = '1.5.15';
		if (!$no_licences_required && (!$simba_manager_installed || !defined('UDMANAGER_VERSION') || !version_compare(UDMANAGER_VERSION, $require_spm_version, '>='))) {
			throw new Exception(sprintf('The Simba updates + licensing manager (version %s or later) is required - please install and activate it.', $require_spm_version));
		}
		*/

		$this->no_licences_required = apply_filters('updraftcentral_licencemanager_nolicencesrequired', true, $user);
		$this->user = $user;
		$this->rc = $central_object;

		add_shortcode('updraftcentral_licences_in_use', array($this, 'how_many_licences_in_use'));
		add_shortcode('updraftcentral_licences_total', array($this, 'how_many_licences_available'));
	}

	/**
	 * Indicate whether a licence slot is available or not
	 *
	 * @used-by UpdraftCentral_User::add_site()
	 * @param array $params any parameters that one need to filter.
	 *
	 * @return Boolean
	 */
	public function is_slot_available($params = array()) {
	
		$licences_in_use = $this->how_many_licences_in_use();
		$licences_available = $this->how_many_licences_available();
			
		if ($this->no_licences_required) {
			$is_available = true;
		} else {
			$is_available = ($licences_available < 0 || $licences_in_use < $licences_available);
		}

		return apply_filters('updraftcentral_licencemanager_is_slot_available', $is_available, $this, $this->user, $licences_in_use, $licences_available, $params);
	}

	/**
	 * Used both internally, and as a shortcode
	 *
	 * @return Integer
	 */
	public function how_many_licences_in_use() {
	
		if (!is_array($this->user->sites)) {
			$in_use = 0;
		} else {
			$in_use = count($this->user->sites);
		}

		return apply_filters('updraftcentral_licencemanager_how_many_licences_in_use', $in_use, $this, $this->user);
	}

	public function get_entitlements_expiring_in($expire_window_begin, $expire_window_end) {

		/*
		Example if integrating with Simba Updates/Licensing manager:
		return count(Updraft_Manager_Premium::db_get_all_entitlements($user->user_id, $expire_window_begin, $expire_window_end, array('updraft-central'), 'updraft-central'))
		No format for the returned array is specified or needed. The only important thing is that there's 1 entry for each entitlement. You can just push a value of 'true' on for each licence if there's no info needed.
		Returns -1 for 'unlimited'
		*/

		return apply_filters('updraftcentral_licencemanager_get_entitlements_expiring_in', 0, $expire_window_begin, $expire_window_end, $this, $this->user);

	}

	/**
	 * How many licences recently expired
	 *
	 * @param  integer $how_long_ago Default: 4 weeks
	 * @return array
	 */
	public function how_many_licences_recently_expired($how_long_ago = 2419200) {
		if ($this->no_licences_required) {
			$how_many = 0;
		} else {
			$time_now = time();
			$how_many = $this->get_entitlements_expiring_in($time_now, ($time_now - $how_long_ago));
		}

		return apply_filters('updraftcentral_how_many_licences_recently_expired', $how_many, $how_long_ago, $this, $this->user);
	}

	/**
	 * How many licences soon expiring
	 *
	 * @param  integer $in_next Default: 4 weeks
	 * @return array
	 */
	public function how_many_licences_soon_expiring($in_next = 2419200) {
		if ($this->no_licences_required) {
			$how_many = 0;
		} else {
			$time_now = time();
			$how_many = $this->get_entitlements_expiring_in($time_now, ($time_now + $in_next));
		}

		return apply_filters('updraftcentral_how_many_licences_soon_expiring', $how_many, $in_next, $this, $this->user);
	}

	/**
	 * Used both internally, and as a shortcode
	 *
	 * @return array
	 */
	public function how_many_licences_available() {
		if ($this->no_licences_required) {
			$entitlements_available = -1;
		} else {
			$entitlements_available = $this->get_entitlements_expiring_in(time(), PHP_INT_MAX);
		}

		return apply_filters('updraftcentral_how_many_licences_available', $entitlements_available, $this, $this->user, $this->no_licences_required);
	}
}

endif;
