<?php

namespace KaliForms\Inc\Utils;

class UserPlaceholders
{
	/**
	 * Plugin slug
	 *
	 * @var string
	 */
	protected $slug = 'kaliforms';

	/**
	 * General placeholders array
	 *
	 * @var array
	 */
	public $placeholders = [];

	/**
	 * Class constructor
	 */
	public function __construct()
	{
		$this->set_placeholders();
	}

	/**
	 * @return array
	 */
	public function set_placeholders()
	{
		if (!is_user_logged_in()) {
			return $this->placeholders = [];
		}

		$user = wp_get_current_user();

		$this->placeholders = [
			'{userId}' => $user->ID,
			'{userEmail}' => $user->user_email,
			'{userNicename}' => $user->user_nicename,
			'{userLogin}' => $user->user_login,
			'{userDisplayName}' => $user->display_name,
		];

		return $this->placeholders = apply_filters($this->slug . '_user_placeholders', $this->placeholders);
	}
}
