<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

/**
 * Handles DB request intended for the "updraftcentral_user_cron" table
 */
class UpdraftCentral_User_Cron {
	
	/**
	 * The name of the table that we are working on that
	 * is stored in the Database. Includes the actual name with prefixes.
	 *
	 * @internal
	 * @var string $table
	 */
	private $table;


	/**
	 * The class constructor. Initializes the $table member variable.
	 */
	public function __construct() {
		global $wpdb;

		$table_prefix = UpdraftCentral()->table_prefix;
		$this->table = $wpdb->base_prefix.$table_prefix.'user_cron';
	}

	/**
	 * Retrieves a list of user IDs where the user's pending cron process
	 * had passed a certain process interval (1 hour at least)
	 *
	 * @param int|boolean $limit Optional. The number of record(s) to return. Defaults to return every records it can find.
	 * @return array - The list of user IDs found.
	 */
	public function get_process_queue($limit = false) {
		global $wpdb;

		// At least the minimum time interval the last process was executed. Default to 1 hour (3600).
		$process_interval = apply_filters('updraftcentral_process_interval', 3600);

		$records_to_return = "";
		if (false !== $limit && is_int($limit)) {
			$records_to_return = " LIMIT ".$limit;
		}

		$result = $wpdb->get_col($wpdb->prepare("SELECT user_id FROM {$this->table} WHERE (UNIX_TIMESTAMP()-last_run) > %d ORDER BY last_run DESC".$records_to_return, $process_interval));

		return $result;
	}

	/**
	 * Updates the last_run field for the given user.
	 *
	 * @param int $user_id The ID of the user
	 * @return boolean - True, when the update process succeeded. False, otherwise.
	 */
	public function update_last_run($user_id) {
		global $wpdb;

		$data = array('last_run' => time());
		$where = compact('user_id');

		// Run the update query, all fields in $data are %s, $where is a %d.
		$result = $wpdb->update($this->table, $data, $where, '%d', '%d');
		if (false !== $result) {
			return true;
		}

		return false;
	}

	/**
	 * Insert a new entry in the "updraftcentral_user_cron" table for the current user
	 * if it doesn't exists yet
	 *
	 * @param int $user_id The ID of the user
	 * @return boolean - True, when the insert process succeeded. False, otherwise.
	 */
	public function maybe_insert_entry($user_id) {
		global $wpdb;

		$result = $wpdb->get_col($wpdb->prepare("SELECT id FROM {$this->table} WHERE user_id = %d", $user_id));
		if (empty($result) && !empty($user_id)) {
			// We make sure that this gets picked up by the "get_process_queue" api by deducting 24 hours
			// from the current time. This applies to new entries only, since no process has been check yet for these new entries.
			$last_run = time() - (24 * 60 * 60);

			$data = compact('user_id', 'last_run');
			$result = $wpdb->insert($this->table, $data, '%d');
			if (false !== $result) {
				return true;
			}
		}

		return false;
	}
}
