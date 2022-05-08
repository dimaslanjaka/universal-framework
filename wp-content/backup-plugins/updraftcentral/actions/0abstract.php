<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');
/**
 * Abstract class for All Remote Commmunication actions for available sites
 */
abstract class UpdraftRC_Action {

	// By default, a nonce is required - so individual actions must explicitly disable this if not required.
	public $check_nonce = 'updraftcentral';

	// Whether to show the page header (boolean)
	public $show_header = true;

	// Mothership
	protected $rc;

	protected $user;

	protected $sites;

	/**
	 * Make sure to call parent::__construct() if using your own constructor
	 */
	public function __construct() {
		global $updraft_central;
		$this->rc = $updraft_central;
		$this->user = $this->rc->user;
		$this->sites = $this->user->sites;
	}

	/**
	 * Authorisation checks. Return a boolean result.
	 *
	 * @return Boolean
	 */
	public function auth_check() {
		return true;
	}

	/**
	 * Echo your output
	 */
	public function render() {
	}
}
