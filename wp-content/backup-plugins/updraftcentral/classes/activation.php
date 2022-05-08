<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

/**
 * This class sets up database upon plugin activation
 *
 * Creates 3 tables with prefix upon plugin activation.
 * Also handles table structure changes
 */
class UpdraftCentral_Activation {

	/**
	 * Table prefix string
	 *
	 * @var string $table_prefix
	 */
	private static $table_prefix;

	/**
	 * A array of method that handle table structure upgrades
	 *
	 * @var array $db_updates
	 */
	private static $db_updates = array(
		'0.3.8' => array(
			'update_038_add_admin_url_column_to_sites',
		),
		'0.6.3' => array(
			'update_063_add_created_column_to_sitemeta',
		),
		'0.7.1' => array(
			'update_071_create_user_cron_table',
		),
		'0.8.19' => array(
			'update_0819_create_events_table',
		),
	);

	/**
	 * Retrieves the string containing the character set
	 * and collation to use during the table creation process
	 *
	 * @return string
	 */
	private static function get_collation() {
		global $wpdb;

		$collate = '';

		if ($wpdb->has_cap('collation')) {
			if (!empty($wpdb->charset)) {
				$collate .= "DEFAULT CHARACTER SET $wpdb->charset";
			}
			if (!empty($wpdb->collate)) {
				$collate .= " COLLATE $wpdb->collate";
			}
		}

		return $collate;
	}

	/**
	 * Initialize properties
	 *
	 * Initializes table prefix property with a custom prefix
	 *
	 * @return void
	 */
	public static function init() {
		self::$table_prefix = defined('UPDRAFTCENTRAL_TABLE_PREFIX') ? UPDRAFTCENTRAL_TABLE_PREFIX : 'updraftcentral_';
	}

	/**
	 * Sets table prefix, creates 3 tables and updates options table with
	 * db structure version
	 *
	 * @return void
	 */
	public static function install() {
		self::init();
		self::create_tables();
		update_option('updraftcentral_dbversion', UpdraftCentral()->version);
	}

	/**
	 * Checks installed version and current version and make necessary changes to
	 * database table structure
	 *
	 * @return void
	 */
	public static function check_updates() {
		self::init();
		$our_version = UpdraftCentral()->version;
		$db_version = get_option('updraftcentral_dbversion');
		if (!$db_version || version_compare($our_version, $db_version, '>')) {
			foreach (self::$db_updates as $version => $updates) {
				if (version_compare($version, $db_version, '>')) {
					foreach ($updates as $update) {
						call_user_func(array(__CLASS__, $update));
					}
				}
			}
			do_action('updraftcentral_version_updated', UpdraftCentral()->version);
		}
		update_option('updraftcentral_dbversion', UpdraftCentral()->version);
	}

	/**
	 * Creates the "events" table
	 *
	 * @return void
	 */
	public static function update_0819_create_events_table() {
		global $wpdb;

		$our_prefix = $wpdb->base_prefix.self::$table_prefix;
		$collate = self::get_collation();

		if (!function_exists('dbDelta')) include_once ABSPATH.'wp-admin/includes/upgrade.php';
		$create_tables = 'CREATE TABLE '.$our_prefix."events (
			event_id bigint(20) NOT NULL auto_increment,
			time int NOT NULL,
			site_id bigint(20) NOT NULL,
			event_type text NOT NULL,
			event_name text NOT NULL,
			event_data mediumtext,
			event_status text NOT NULL,
			event_result_data mediumtext,
			PRIMARY KEY  (event_id),
			KEY site_id (site_id)
			) $collate;
		";

		dbDelta($create_tables);
	}

	/**
	 * Creates the "user_cron" table and some housekeeping of clearing the previously
	 * registered (deprecated) cron events
	 *
	 * @return void
	 */
	public static function update_071_create_user_cron_table() {
		global $wpdb;

		$our_prefix = $wpdb->base_prefix.self::$table_prefix;
		$collate = self::get_collation();

		$user_cron_table = $our_prefix.'user_cron';
		if ($user_cron_table !== $wpdb->get_var("SHOW TABLES LIKE '".$user_cron_table."'")) {
		if (!function_exists('dbDelta')) include_once ABSPATH.'wp-admin/includes/upgrade.php';

		$create_tables = 'CREATE TABLE '.$our_prefix."user_cron (
			id bigint(20) NOT NULL auto_increment,
			user_id bigint(20) NOT NULL,
			last_run bigint(20) DEFAULT 0,
			PRIMARY KEY  (id),
			KEY user_id (user_id),
			KEY last_run (last_run)
			) $collate;
		";

		dbDelta($create_tables);
		}


		// Remove previously scheduled (deprecated) "updraftcentra_cron" events in WP-Cron
		// Cleanup previous (no longer needed) crons, since we're now using a single cron
		// for the site's cron process instead of per user.
		if (!function_exists('_get_cron_array')) include ABSPATH.WPINC.'/cron.php';

		$crons = _get_cron_array();
		if (!empty($crons)) {
			foreach ($crons as $cron) {
				foreach ($cron as $key => $value) {
					if (preg_match('#^updraftcentral#', $key)) {
						foreach ($value as $schedule) {
							wp_clear_scheduled_hook($key, $schedule['args']);
						}
					}
				}
			}
		}
	}

	/**
	 * Add the 'created' column to the sitemeta table
	 *
	 * @return void
	 */
	public static function update_063_add_created_column_to_sitemeta() {
		global $wpdb;
		$our_prefix = $wpdb->base_prefix.self::$table_prefix;
		$wpdb->query('ALTER TABLE '.$our_prefix.'sitemeta ADD created bigint(20) DEFAULT 0 AFTER meta_value');
	}

	/**
	 * Add the 'admin_url' column to the sites table
	 *
	 * @return void
	 */
	public static function update_038_add_admin_url_column_to_sites() {
		global $wpdb;
		$our_prefix = $wpdb->base_prefix.self::$table_prefix;
		$wpdb->query('ALTER TABLE '.$our_prefix.'sites ADD admin_url varchar(300) AFTER url');
	}

	/**
	 * Creates 3 tables to use with UpdraftCentral
	 *
	 * @return void
	 */
	public static function create_tables() {
		global $wpdb;

		$our_prefix = $wpdb->base_prefix.self::$table_prefix;
		$collate = self::get_collation();

		include_once ABSPATH.'wp-admin/includes/upgrade.php';

		// Important: obey the magical/arbitrary rules for formatting this stuff: https://codex.wordpress.org/Creating_Tables_with_Plugins
		// Otherwise, you get SQL errors and unwanted header output warnings when activating
		
		$create_tables = 'CREATE TABLE '.$our_prefix."sites (
			site_id bigint(20) NOT NULL auto_increment,
			user_id bigint(20) NOT NULL,
			url varchar(300) NOT NULL,
			admin_url varchar(300),
			key_local_private blob,
			key_remote_public blob,
			key_name_indicator varchar(200) NOT NULL,
			description text,
			sequence_id bigint(20) DEFAULT 0,
			remote_user_id bigint(20) NOT NULL,
			remote_user_login varchar(60),
			remote_site_id bigint(20) DEFAULT 0,
			connection_method varchar(30),
			send_cors_headers tinyint(1) DEFAULT 1,
			PRIMARY KEY  (site_id),
			KEY user_id (user_id)
			) $collate;
		";
		// KEY attribute_name (attribute_name)
		dbDelta($create_tables);

		$create_tables = 'CREATE TABLE '.$our_prefix."site_temporary_keys (
			key_id bigint(20) NOT NULL auto_increment,
			key_local_private blob,
			key_remote_public blob,
			created bigint(20),
			PRIMARY KEY  (key_id),
			KEY created (created)
			) $collate;
		";

		dbDelta($create_tables);

		$max_index_length = 191;
		$create_tables = 'CREATE TABLE '.$our_prefix."sitemeta (
			meta_id bigint(20) NOT NULL auto_increment,
			site_id bigint(20) NOT NULL default '0',
			meta_key varchar(255) default NULL,
			meta_value longtext,
			created bigint(20) DEFAULT 0,
			PRIMARY KEY  (meta_id),
			KEY meta_key (meta_key($max_index_length)),
			KEY site_id (site_id)
			) $collate;
		";

		dbDelta($create_tables);

		$create_tables = 'CREATE TABLE '.$our_prefix."user_cron (
			id bigint(20) NOT NULL auto_increment,
			user_id bigint(20) NOT NULL,
			last_run bigint(20) DEFAULT 0,
			PRIMARY KEY  (id),
			KEY user_id (user_id),
			KEY last_run (last_run)
			) $collate;
		";

		dbDelta($create_tables);

		$create_tables = 'CREATE TABLE '.$our_prefix."events (
			event_id bigint(20) NOT NULL auto_increment,
			time int NOT NULL,
			site_id bigint(20) NOT NULL,
			event_type text NOT NULL,
			event_name text NOT NULL,
			event_data mediumtext,
			event_status text NOT NULL,
			event_result_data mediumtext,
			PRIMARY KEY  (event_id),
			KEY site_id (site_id)
			) $collate;
		";

		dbDelta($create_tables);
	}
}
