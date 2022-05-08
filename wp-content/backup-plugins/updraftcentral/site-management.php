<?php
// @codingStandardsIgnoreStart
/*
Plugin Name: UpdraftCentral Dashboard
Plugin URI: https://updraftcentral.com
Description: Manage your WordPress sites from a central dashboard
Version: 0.8.20
Text Domain: updraftcentral
Domain Path: /languages
Author: David Anderson + Team Updraft
Author URI: https://www.simbahosting.co.uk/s3/shop/
Requires at least: 4.6
License: MIT

Copyright: 2015- David Anderson
*/
// @codingStandardsIgnoreEnd
if (!defined('ABSPATH')) die('Access denied.');

define('UD_CENTRAL_DIR', dirname(__FILE__));
define('UD_CENTRAL_URL', plugins_url('', __FILE__));

// The name of the plugin sub-directory/file.
define('UD_CENTRAL_PLUGIN_NAME', basename(UD_CENTRAL_DIR).'/'.basename(__FILE__));

if (!defined('UPDRAFTCENTRAL_TABLE_PREFIX')) define('UPDRAFTCENTRAL_TABLE_PREFIX', 'updraftcentral_');

if (!class_exists('UpdraftCentral')) :
class UpdraftCentral {
	const VERSION = '0.8.20';

	// Minimum PHP version required to run this plugin
	const PHP_REQUIRED = '5.3';

	// Minimum WP version required to run this plugin
	const WP_REQUIRED = '4.6';

	protected static $_instance = null;

	protected static $_logger_instance = null;

	// This gets filled from the constant, for more convenient access
	public $version;

	// An instance of UpdraftCentral_User
	public $user;

	// An instance of UpdraftCentral_Site_Meta
	public $site_meta;

	private $inited = false;

	private $notices = array();

	public $table_prefix;

	private $template_directories;

	private $semaphores = array();

	public $export_settings_version = '1';

	private $start_time;

	/**
	 * Creates an instance of this class. Singleton Pattern
	 *
	 * @return object Instance of this class
	 */
	public static function instance() {
		if (empty(self::$_instance)) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * UpdraftCentral constructor.
	 *
	 * Does initial checks. Adds necessary hooks, filters and shortcode. Loads modules
	 *
	 * @return self
	 */
	public function __construct() {

		$this->version = self::VERSION;

		// The shortcode will handle + provide output if running on an insufficient PHP/WP version; hence, this goes before the check/return.
		add_shortcode('updraft_central', array($this, 'shortcode'));

		if (version_compare(PHP_VERSION, self::PHP_REQUIRED, '<')) {
			add_action('all_admin_notices', array($this, 'admin_notice_insufficient_php'));
			$abort = true;
		}

		include ABSPATH.WPINC.'/version.php';
		if (version_compare($wp_version, self::WP_REQUIRED, '<')) {// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UndefinedVariable -- $wp_version is part of Wordpress and fine to be ignored
			add_action('all_admin_notices', array($this, 'admin_notice_insufficient_wp'));
			$abort = true;
		}

		if (!empty($abort)) return;

		$this->table_prefix = defined('UPDRAFTCENTRAL_TABLE_PREFIX') ? UPDRAFTCENTRAL_TABLE_PREFIX : 'updraftcentral_';

		add_action('plugins_loaded', array($this, 'plugins_loaded'));
		add_action('init', array($this, 'wp_init'));
		register_activation_hook(__FILE__, array($this, 'activation_hook'));
		register_deactivation_hook(__FILE__, array($this, 'deactivation_hook'));

		if (is_admin()) {
			add_action('admin_menu', array($this, 'admin_menu'));
			// Add settings link in plugin list
			$plugin = plugin_basename(__FILE__);
			add_filter('plugin_action_links_'.$plugin, array($this, 'plugin_action_links'));
			add_filter('network_admin_plugin_action_links_'.$plugin, array($this, 'plugin_action_links'));
		}

		// Possibly redirect on login back to the UC dashboard
		add_action('woocommerce_login_redirect', array($this, 'woocommerce_login_redirect'));

		add_action('updraftcentral_print_dashboard_notices', array($this, 'print_dashboard_notices'));

		if (!empty($_POST['updraftcentral_action']) && 'receive_key' == $_POST['updraftcentral_action']) {
			add_action('init', array($this, 'init_updraftcentral_action_receive_key'));
		}

		add_action('wp_ajax_updraftcentral_dashboard_ajax', array($this, 'updraftcentral_dashboard_ajax'));

		// Needed in Site Meta changes (do_action('updraftcentral_inited') is located within this file)
		add_action('updraftcentral_inited', array($this, 'updraftcentral_add_site_metadata_filter'));

		add_action('updraftcentral_cron', array($this, 'process_cron'));
		add_action('shutdown', array($this, 'schedule_event'));

		add_action('delete_user', array($this, 'delete_user'));
		
		// Add our custom cron schedule:
		add_filter('cron_schedules', array($this, 'add_custom_cron_schedules'));

		// Add WP personal Exporter
		add_filter('wp_privacy_personal_data_exporters', array($this, 'plugin_register_exporters'));

		// Allow both bundled and external modules to hook into various parts of the dashboard
		$this->load_modules();
	}

	/**
	 * Register the data exporter
	 *
	 * @param array $exporters
	 * @return array modified exporters
	 */
	public function plugin_register_exporters($exporters) {
		$exporters[] = array(
			'exporter_friendly_name' => __('Export UpdraftCentral registered sites', 'updraftcentral'),
			'callback'               => array($this, 'export_registered_sites'),
		);
		return $exporters;
	}

	/**
	 * Runs upon the WP delete_user action. We then delete their data.
	 *
	 * @param Integer $user_id - user being deleted
	 */
	public function delete_user($user_id) {
		try {
			$user = $this->get_user_object($user_id);
			if (is_a($user, 'UpdraftCentral_User')) {
				$user->delete_all_sites();
			}
		} catch (Exception $e) {
			error_log("UpdraftCentral::delete_user($user_id): exception: ".get_class($e).": ".$e->getMessage());
		// @codingStandardsIgnoreLine
		} catch (Error $e) {
			error_log("UpdraftCentral::delete_user($user_id): error: ".get_class($e).": ".$e->getMessage());
		}
	}
	
	/**
	 * Inserts the custom "everyminute" schedule as cron option
	 *
	 * @param array $schedules Contains the current list of schedule options
	 * @return array
	 */
	public function add_custom_cron_schedules($schedules) {
		if (!isset($schedules['everyminute'])) {
			$schedules['everyminute'] = array(
				'interval' => 60,
				'display' => __('Once every minute', 'updraftcentral')
			);
		}

		return $schedules;
	}

	/**
	 * Initializes a semaphore object based on a lock name and store it in a semaphores collection/array
	 *
	 * @param string $lock_name The lock name to use for the current semaphore object
	 *
	 * @return void
	 */
	private function init_semaphore($lock_name) {
		try {
			if (empty($lock_name)) {
				UpdraftCentral()->log('UpdraftCentral: a lock name is needed to initialize the semaphore class', 'error');
				return;
			}

			if (!isset($this->semaphores[$lock_name])) {
				if (!class_exists('Updraft_Semaphore_3_0')) include_once UD_CENTRAL_DIR.'/vendor/team-updraft/common-libs/src/updraft-semaphore/class-updraft-semaphore.php';

				$this->semaphores[$lock_name] = new Updraft_Semaphore_3_0($lock_name);
				$this->semaphores[$lock_name]->add_logger(self::get_logger());
			}
		} catch (Exception $e) {
			UpdraftCentral()->log('UpdraftCentral: error initializing semaphore: '.$e->getMessage(), 'error');
		}
	}

	/**
	 * Checks whether there are any available commands waiting to be process
	 *
	 * @return boolean - true when commands are available to process, false otherwise.
	 */
	public function has_scheduled_commands() {
		global $wp_filter;

		if (empty($wp_filter['updraftcentral_scheduled_commands'])) return false;
		
		return $wp_filter['updraftcentral_scheduled_commands']->has_filters();
	}

	/**
	 * Rearrange sites sequence based on availability (reachable status)
	 *
	 * @param array $sites An array containing the current user sites
	 *
	 * @return array
	 */
	private function rearrange_priority($sites) {
		if (empty($sites) || !is_array($sites)) return $sites;

		// Sites are processed in sequence in the same order when they were pulled from the database.
		// Thus, we need to sort them according to their availability. We prioritized those sites that don't
		// have issues when we last run our background process and is reachable in the last 96 hours.

		$reachable = array();
		$unreachable = array();

		foreach ($sites as $site) {
			$alert_icon = apply_filters('updraftcentral_site_alert_icon', '', $site->site_id);
			if ('' == $alert_icon) {
				// No alert icon: signifies that the site was reachable in the last 96 hours.
				$reachable[] = $site;
			} else {
				$unreachable[] = $site;
			}
		}

		return array_merge($reachable, $unreachable);
	}

	/**
	 * Processes scheduled commands for the given user
	 *
	 * @param integer $user_id The current user ID that the command is associated with
	 *
	 * @return void
	 */
	public function process_scheduled_commands($user_id) {
		$user = $this->get_user_object($user_id);
		if (!empty($user) && is_a($user, 'UpdraftCentral_User')) {

			// Pull user sites
			$sites = $user->load_user_sites();

			// No point in continuing if the user currently don't have any sites to
			// execute the commands.
			if (empty($sites) || !is_array($sites)) return;

			$sites = $this->rearrange_priority($sites);

			/**
			 * Commands when added using this filter should have the following structure:
			 *
			 * $scheduled_commands []= array(
			 *		'command' => ,
			 *		'data' => ,
			 *		'maximum_age' => ,
			 *		'is_long_running' =>
			 * );
			 */
			$scheduled_commands = apply_filters('updraftcentral_scheduled_commands', array());
			if (!empty($scheduled_commands)) {
				$command_pipeline = array();
				$short_commands = array();

				// Default: 10 minutes (600 seconds) if UPDRAFTCENTRAL_DATA_MAXIMUM_AGE is not defined
				$default_maximum_age = defined('UPDRAFTCENTRAL_DATA_MAXIMUM_AGE') ? UPDRAFTCENTRAL_DATA_MAXIMUM_AGE : 600;

				foreach ($scheduled_commands as $task) {
					$maximum_age = isset($task['maximum_age']) ? $task['maximum_age'] : $default_maximum_age;
						$is_long_running = isset($task['is_long_running']) ? $task['is_long_running'] : false;

					// Insert maximum_age (freshness of data) into the actual data parameter which will be
					// referenced later in the subsequent process.
					$task['data']['maximum_age'] = $maximum_age;
					
					// If we don't have a valid command format then we continue with the next.
					if (!preg_match('/^([a-z0-9]+)\.(.*)$/', $task['command'], $matches)) {
						UpdraftCentral()->log('UpdraftCentral: "'.$task['command'].'" is not a valid command. Valid command format comes in the form of {command_class_identifier}.{command_action} (e.g. updates.get_updates, etc.)', 'debug');
						continue;
					}

					if (!$is_long_running) {
						// We're preserving these non long running commands that will be wrapped
						// and added as multiplexed commands later.
						$short_commands[$task['command']] = $task['data'];
					} elseif ($is_long_running) {
						$command_pipeline[] = array(
							'data' => array(
								'command' => $task['command'],
								'data' => $task['data']
							)
						);
					}
				}

				// Add non long running commands into pipeline as multiplexed commands
				if (!empty($short_commands)) {
					$command_pipeline[] = array(
						'data' => array(
							'command' => 'core.execute_commands',
							'data' => array(
								'commands' => $short_commands,
								'error_flag' => 3	/* Abort when all command fails - default */
							)
						)
					);
				}

				if (!empty($command_pipeline)) {

					// Set the semaphore lock name for the background process.
					$background_lock_name = 'updraftcentral_cron';

					// Make sure we have a valid semaphore to work on by initializing it
					// whenever needed or make use of one if it was already been set.
					$this->init_semaphore($background_lock_name);

					if (empty($this->semaphores[$background_lock_name])) {
						UpdraftCentral()->log('Failed to initialize a semaphore object - exiting', 'info');
						return;
					}

					$max_execution_time = ini_get('max_execution_time');
					
					// Since the semaphore lock is for 3 minutes, we want to try to run for at least in that region; otherwise the queue may get longer whilst a lock is stuck. We go for 170 to allow a bit of margin for really slow database updates.
					$time_limit = (defined('UPDRAFTCENTRAL_PROCESS_CRON_TIME_LIMIT') && UPDRAFTCENTRAL_PROCESS_CRON_TIME_LIMIT > 5) ? UPDRAFTCENTRAL_PROCESS_CRON_TIME_LIMIT : 170;
					if ((defined('UPDRAFTCENTRAL_PROCESS_CRON_TIME_LIMIT') || $max_execution_time > 5) && $max_execution_time < $time_limit) set_time_limit($time_limit);
					
					if (!$this->semaphores[$background_lock_name]->lock()) {
						UpdraftCentral()->log('Failed to gain semaphore lock - An active background data fetching process appears to be running, if the other process crashed without removing the lock, then another can be started after 3 minutes)', 'info');
						return;
					}

					// N.B. We temporarily store processed sites in the 'uc_cron_sites_processed' user meta
					// in order not to re-processed them, especially when the "last_run" flag for the current user
					// is not updated yet until all sites are processed.

					$processed_sites = get_user_meta($user->user_id, 'uc_cron_sites_processed', true);
					if (empty($processed_sites)) $processed_sites = array();

					foreach ($sites as $site) {
						// Additional check will ensure that we're not running the same process
						// more than once with this current event run.
						if (!in_array($site->site_id, $processed_sites)) {
							// Compute for the elapsed time (in minutes) since we started.
							$elapsed_time = (time() - $this->start_time) / 60;

							// Maximum of 3 minutes (default) process time. If succeeding loop goes beyond the allowable
							// time then the process will be terminated.
							if ($elapsed_time > apply_filters('updraftcentral_max_process_time', 3)) break;

							// Execute all available commands for the currently
							// selected site
							foreach ($command_pipeline as $data) {
								$data['site_id'] = $site->site_id;

								// Setting the "force_save" flag to true saves and caches the result to DB.
								//
								// N.B. This overrides the use of the "updraftcentral_cache_commands" filter where UDC only
								// saves and cache response when any module add certain command(s) that they wish the response
								// to be cached to DB. In this case, we're forcing the save since we're running it in cron.
								
								// Need to check the result if we were able to connect to the site successfully, otherwise,
								// we'll flag it as disconnected.
								$result = $user->send_remote_command($data, true, array());

								if (!empty($result)) {
									$error_data = array();
									if ('error' === $result['responsetype']) {
										$data = array();
										if (isset($result['data'])) {
											$data = $result['data'];
										} else {
											if (isset($result['rpc_response'])) $data = $result['rpc_response'];
											if (isset($result['wrapped_response'])) $data = $result['wrapped_response'];
										}

										$error_data = array(
											'message' => $result['message'],
											'timestamp' => date('Y-m-d H:i:s'),
											'data' => $data
										);
									}
									
									if (is_a($this->site_meta, 'UpdraftCentral_Site_Meta')) {
										$background_error_key = 'background_request_error';
										$site_error = $this->site_meta->get_site_meta($site->site_id, $background_error_key, true);

										if (!empty($site_error) && is_array($site_error)) {
											if (empty($error_data)) {
												// If we reached this area then that would mean that we were able to connect
												// to the remote site wihout issues. Thus, we will remove the flag now.
												$this->site_meta->delete_site_meta($site->site_id, $background_error_key);
											}
										} else {
											if (!empty($error_data)) {
												// No error flag record yet so, we create one. We only need to save once because
												// we're going to compute the time between the last error and the new error from
												// the latest request that we sent.
												$this->site_meta->add_site_meta($site->site_id, $background_error_key, $error_data);
											}
										}
									}
								}
							}

							// By the time we reach here all commands for this particular site have been executed.
							// Thus, we're going to add the site to the $processed_sites array. We cannot put this on top
							// as we need to be sure that all commands are executed before we add this to the "$processed_sites" array.
							array_push($processed_sites, $site->site_id);

							// We need to set/update the 'uc_cron_sites_processed' user meta here since all process
							// will be cut-off abruptly either after the max process time has expired (default 3 minutes)
							// or the seamlock has been released therefore we need to set which sites have already been
							// processed before the process is stopped so that other sites which are not yet processed
							// will get a chance.
							update_user_meta($user->user_id, 'uc_cron_sites_processed', $processed_sites);
						}
					}

					// If the scheduled commands are executed to all user sites then we delete the user meta entry
					// to give room for the next round of process (e.g. after 12 hours).
					if (count($sites) == count($processed_sites)) {
						delete_user_meta($user->user_id, 'uc_cron_sites_processed');
					}

					// Release lock
					$this->semaphores[$background_lock_name]->release();
				}
			}
		}
	}

	/**
	 * Process scheduled events (fetching UpdraftCentral data in the background) through cron
	 *
	 * @return void
	 */
	public function process_cron() {

		// Bypass processing if we don't have any existing commands
		if (!$this->has_scheduled_commands()) return;

		try {

			if (!class_exists('UpdraftCentral_User_Cron')) include_once UD_CENTRAL_DIR.'/classes/user-cron.php';
			$user_cron = new UpdraftCentral_User_Cron();

			$queue = $user_cron->get_process_queue();
			if (!empty($queue)) {
				$this->start_time = time();

				foreach ($queue as $user_id) {
					// Compute for the elapsed time (in minutes) since we started.
					$elapsed_time = (time() - $this->start_time) / 60;

					// Maximum of 3 minutes (default) process time. If succeeding loop goes beyond the allowable
					// time then the process will be terminated.
					if ($elapsed_time > apply_filters('updraftcentral_max_process_time', 3)) break;

						// Process any scheduled commands (if there are any) for the given user.
					$this->process_scheduled_commands($user_id);

					// Update user's last (cron) run field
					$user_cron->update_last_run($user_id);
				}
			}

		} catch (Exception $e) {
			UpdraftCentral()->log('UpdraftCentral: error when running cron event: '.$e->getMessage(), 'error');
		}

	}

	/**
	 * Initializes cron event for background data fetching
	 */
	public function schedule_event() {
		try {
			$current_user = wp_get_current_user();
			if (!function_exists('is_plugin_active')) include_once(ABSPATH.'wp-admin/includes/plugin.php');

			// Make sure we have an entry in the "updraftcentral_user_cron" for the current user
			// for executing the scheduled commands at a later time.
			if (!class_exists('UpdraftCentral_User_Cron')) include_once UD_CENTRAL_DIR.'/classes/user-cron.php';
			$user_cron = new UpdraftCentral_User_Cron();
			$user_cron->maybe_insert_entry($current_user->ID);

			// Register our cron if not yet registered and making sure that we're scheduling our event
			// only if UpdraftCentral is active since we're clearing all events when this plugin is deactivated
			// by the user, so that we won't be registering those already cleared events again by mistake.
			//
			// Updates: "updraftcentral_cron" is now global and runs accros the whole UpdraftCentral dashboard
			// instead of associating it to the individual user.
			if (!wp_next_scheduled('updraftcentral_cron') && is_plugin_active(UD_CENTRAL_PLUGIN_NAME)) {
				wp_schedule_event(time(), 'everyminute', 'updraftcentral_cron');
			}
		} catch (Exception $e) {
			UpdraftCentral()->log($e->getMessage(), 'error');
		}
	}


	public function updraftcentral_add_site_metadata_filter() {
		if (is_a($this->site_meta, 'UpdraftCentral_Site_Meta')) {
			// We're short-circuiting the return by using our own implementation since we have a custom column "created"
			// that would check for the maximum age of the content to return.
			add_filter('get_site_metadata', array($this->site_meta, 'updraftcentral_get_site_metadata'), 10, 6);
			add_filter('get_site_metadata_created', array($this->site_meta, 'updraftcentral_get_site_metadata_created'), 10, 3);
		}
	}

	/**
	 * Compares installed and available version and takes necessary action
	 */
	public function wp_init() {
		include_once UD_CENTRAL_DIR.'/classes/activation.php';
		UpdraftCentral_Activation::check_updates();
	}

	/**
	 * Prevents WooCommerce default redirection to My Accounts page
	 *
	 * @param string $redirect_to
	 * @return mixed
	 */
	public function woocommerce_login_redirect($redirect_to) {
		return empty($_POST['updraftcentral_redirect_on_wc_login']) ? $redirect_to : $_POST['updraftcentral_redirect_on_wc_login'];
	}

	/**
	 * Adds admin notice for insufficient php version.
	 *
	 * @return void
	 */
	public function admin_notice_insufficient_php() {
		$this->show_admin_warning('<strong>'.__('Higher PHP version required', 'updraftcentral').'</strong><br> '.sprintf(__('The %s plugin requires %s version %s or higher - your current version is only %s.', 'updraftcentral'), 'UpdraftCentral', 'PHP', self::PHP_REQUIRED, PHP_VERSION), 'error');
	}

	/**
	 * Adds admin notice for insufficient wp version
	 *
	 * @return void
	 */
	public function admin_notice_insufficient_wp() {
		include ABSPATH.WPINC.'/version.php';
		$this->show_admin_warning('<strong>'.__('Higher WordPress version required', 'updraftcentral').'</strong><br> '.sprintf(__('The %s plugin requires %s version %s or higher - your current version is only %s.', 'updraftcentral'), 'UpdraftCentral', 'WordPress', self::WP_REQUIRED, $wp_version), 'error');// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UndefinedVariable -- Fine to ignore
	}

	/**
	 * Warning message for admin notice
	 *
	 * @param string $message
	 * @param string $class
	 *
	 * @return void
	 */
	public function show_admin_warning($message, $class = 'updated') {
		echo '<div class="updraftcentral_message '.$class.'">'."<p>$message</p></div>";
	}

	/**
	 * Adds admin page for UpdraftCentral plugin
	 *
	 * @return void
	 */
	public function admin_menu() {
		add_menu_page('UpdraftCentral', 'UpdraftCentral', 'manage_options', 'updraft-central', array($this, 'wp_dashboard_page'), UD_CENTRAL_URL.'/images/dashicon.png', 56.8467664);
	}

	/**
	 * These are also available from JS via udclion.common_urls
	 *
	 * @return array
	 */
	public function get_common_urls() {
		return apply_filters('updraftcentral_common_urls', array(
			'support_forum' => 'https://wordpress.org/support/plugin/updraftcentral',
			'faqs' => 'https://updraftplus.com/updraftcentral-frequently-asked-questions/',
			'idea_suggestion' => 'https://updraftplus.com/make-a-suggestion',
			'first_link' => '<a href="http://updraftcentral.com">'.__('Home', 'updraftcentral').'</a>',
			'how_to_install' => 'https://updraftplus.com/faqs/how-do-i-install-updraftcentral/',
			'how_to_add_site' => 'https://updraftplus.com/updraftcentral-how-to-add-a-site/',
			'paid_support' => 'https://updraftplus.com/paid-support-requests/',
			'connection_checklist' => 'https://updraftplus.com/troubleshooting-updraftcentral-connection-issues/',
			'connection_advanced_issues' => 'https://updraftplus.com/faqs/how-can-i-control-a-site-that-has-access-controls-e-g-brower-password-ip-address-restrictions/',
			'get_licences' => false,
		));
	}

	/**
	 * Checks whether UpdraftCentral Premium is installed or not
	 *
	 * @param bool $also_require_active
	 * @return bool
	 */
	public function is_premium_installed($also_require_active = false) {
		if ($also_require_active) return class_exists('UpdraftCentral_Premium');
		if (!function_exists('get_plugins')) include_once(ABSPATH.'wp-admin/includes/plugin.php');
		$plugins = get_plugins();
		$updraftcentral_premium_file = false;
		foreach ($plugins as $key => $value) {
			if ("updraftcentral-premium" == $value['TextDomain']) {
				$updraftcentral_premium_file = $key;
				break;
			}
		}
		return $updraftcentral_premium_file ? true : false;
	}

	/**
	 * Includes dashboard page template and content
	 */
	public function wp_dashboard_page() {
		$extract_these = $this->get_common_urls();
		$this->include_template('wp-admin/dashboard-page.php', false, $extract_these);
	}

	public function init_updraftcentral_action_receive_key() {
		// @codingStandardsIgnoreLine
		@header('Content-Type: application/json');

		$response_array = array(
			'mothership' => 'thatsus',
			'mothership_info' => array('version' => self::VERSION),
		);

		if (empty($_POST['key'])) {
			$response_array['code'] = 'key_invalid';
			$response_array['message'] = 'Necessary data was not supplied';
		} else {

			global $wpdb;
			$ud_rpc = $this->get_udrpc('central_host.updraftplus.com');

			// Normally, key generation takes seconds, even on a slow machine. However, some Windows machines appear to have a setup in which it takes a minute or more. And then, if you're on a double-localhost setup on slow hardware - even worse. It doesn't hurt to just raise the maximum execution time.

			$key_generation_time_limit = (defined('UPDRAFTCENTRAL_SET_TIME_LIMIT') && is_numeric(UPDRAFTCENTRAL_SET_TIME_LIMIT) && UPDRAFTCENTRAL_SET_TIME_LIMIT > 10) ? UPDRAFTCENTRAL_SET_TIME_LIMIT : 900;

			// @codingStandardsIgnoreLine
			@set_time_limit($key_generation_time_limit);

			if (false != $ud_rpc->generate_new_keypair()) {
				$response_array['key_public'] = $ud_rpc->get_key_remote();
				$inserted = $this->wp_insert('site_temporary_keys', array('key_remote_public' => $_POST['key'], 'key_local_private' => $ud_rpc->get_key_local(), 'created' => time()), array('%s', '%s', '%d'));
				if ($inserted) {
					$response_array['key_id'] = $wpdb->insert_id;
				} else {
					$response_array['code'] = 'insert_error';
					$response_array['message'] = 'A database error occurred when attempting to load the key';
				}
			} else {
				$response_array['code'] = 'keygen_error';
				$response_array['message'] = 'An error occurred when attempting to generate a new key-pair';
			}

		}
		echo json_encode($response_array);
		die;
	}

	/**
	 * Handles all ajax requests to this plugin.
	 *
	 * This single method handles and delegates all ajax requests in this plugin.
	 * By doing this, there is no need to add `wp_ajax_{your_action}` hook for every single actions
	 *
	 * @return void
	 */
	public function updraftcentral_dashboard_ajax() {
		if (empty($_REQUEST['subaction']) || empty($_REQUEST['nonce']) || empty($_REQUEST['component']) || !wp_verify_nonce($_REQUEST['nonce'], 'updraftcentral_dashboard_nonce')) die('Security check');

		if ('dashboard' != $_REQUEST['component']) die;

		$response = array();

		if (!$this->init()) {
			$response = array('responsetype' => 'error', 'code' => 'init_failure', 'message' => __('Error:', 'updraftcentral').' '.__('failed to initialise', 'updraftcentral'));
		} else {

			$post_data = stripslashes_deep($_POST);

			if (isset($post_data['data']) && is_array($post_data['data']) && isset($post_data['data']['site_id'])) {
				$site_id = (int) $post_data['data']['site_id'];
				if (!in_array($site_id, array_keys($this->user->sites))) {
					$response = array('responsetype' => 'error', 'code' => 'unauthorised', 'message' => __('Error:', 'updraftcentral').' '.__('you are not authorized to access this site', 'updraftcentral'));
				}
			}

			// Remember, if doing any processing here, that the site has not yet been checked as to whether it is licenced

			// Any data will be in $_REQUEST['data'];
			switch ($_REQUEST['subaction']) {
				default:
				$response = apply_filters('updraftcentral_dashboard_ajaxaction_'.$_REQUEST['subaction'], $response, $post_data);
					break;
			}

		}

		if (empty($response)) {
			$response['responsetype'] = 'error';
			$response['code'] = 'empty';
			$response['message'] = __('Error:', 'updraftcentral').' '.sprintf(__('This action (%s) could not be handled', 'updraftcentral'), $_REQUEST['subaction']);
		} elseif (is_wp_error($response)) {
			$new_response = array(
				'responsetype' => 'error',
				'code' => $response->get_error_code(),
				'message' => __('Error:', 'updraftcentral').' '.$response->get_error_message().' ('.$response->get_error_code().')',
				'data' => $response->get_error_data(),
			);
			$response = $new_response;
		}

		echo json_encode($response);

		die;

	}

	/**
	 * This is shortcode function for [updraft_central] checks the user's access level, and then dispatches to the appropriate page in the /pages sub-directory
	 *
	 * @param  array $atts
	 * @return string
	 */
	public function shortcode($atts) {

		// Short-circuit plugins that run do_shortcode out-of-context (e.g. Relevansii)
		if (is_admin()) return '';

		if (version_compare(PHP_VERSION, self::PHP_REQUIRED, '<')) {
			return sprintf(__('The %s plugin requires %s version %s or higher - your current version is only %s.', 'updraftcentral'), 'UpdraftCentral', 'PHP', self::PHP_REQUIRED, PHP_VERSION);
		}
		include ABSPATH.WPINC.'/version.php';
		if (version_compare($wp_version, self::WP_REQUIRED, '<')) {// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UndefinedVariable -- Fine to ignore
			return sprintf(__('The %s plugin requires %s version %s or higher - your current version is only %s.', 'updraftcentral'), 'UpdraftCentral', 'WordPress', self::WP_REQUIRED, $wp_version);// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UndefinedVariable -- Fine to ignore
		}

		$atts = shortcode_atts(array(
			'page' => 'dashboard',
			'require_role' => 'administrator',
			'require_cap' => false,
		), $atts, 'updraft_central');

		// Security check - only valid characters
		if (!preg_match('/^[_a-z]+$/', $atts['page'])) return;

		ob_start();

		if (!is_user_logged_in()) {
			$this->include_template('dashboard/not-logged-in.php');
		} else {

			add_action('wp_footer', array($this, 'wp_footer'));

			if (!$this->init()) {

				// We want the notice styles
				$this->load_dashboard_css();

				// Get the header, which invokes the notice-printing actions
				$this->include_template('dashboard/header.php');

				// Print this, in case for some reason the notices don't display (or there weren't any)
				echo 'Setup error';

			} else {

				// Check they are a customer (i.e. have customer role)

				$require_role = empty($atts['require_role']) ? false : explode(',', str_replace(' ', '', $atts['require_role']));
				$require_cap = empty($atts['require_cap']) ? false : explode(',', str_replace(' ', '', $atts['require_cap']));

				if (!$this->access_role_check($atts['page'], $require_role, $require_cap)) {
					$this->include_template('dashboard/not-authorised.php');
				} elseif ('dashboard' == $atts['page']) {
					include_once UD_CENTRAL_DIR.'/pages/dashboard.php';
					do_action('updraftcentral_dashboard_loaded');
				}

			}

		}

		return ob_get_clean();
	}

	/**
	 * Includes all module loader files from modules folder.
	 *
	 * @return void
	 */
	private function load_modules() {

		do_action('updraftcentral_load_modules');

		if (is_dir(UD_CENTRAL_DIR.'/modules') && $dir_handle = opendir(UD_CENTRAL_DIR.'/modules')) {
			while (false !== ($e = readdir($dir_handle))) {
				if (is_dir(UD_CENTRAL_DIR.'/modules/'.$e) && file_exists(UD_CENTRAL_DIR.'/modules/'.$e.'/loader.php') && apply_filters('updraftcentral_load_module', true, $e, UD_CENTRAL_DIR.'/modules')) {
					include_once UD_CENTRAL_DIR.'/modules/'.$e.'/loader.php';
				}
			}
			// @codingStandardsIgnoreLine
			@closedir($dir_handle);
		}

		do_action('updraftcentral_loaded_modules');

	}

	/**
	 * Sorts navigation items
	 *
	 * @param string $a	- Navigation item to compare
	 * @param string $b	- Navigation item to compare
	 * @return int		- Result of comparison
	 */
	public function sort_navigation_items($a, $b) {
		if (!is_array($a) || !isset($a['sort_order']) || !is_numeric($a['sort_order'])) return 1;
		if (!is_array($b) || !isset($b['sort_order']) || !is_numeric($b['sort_order'])) return -1;
		if ($a['sort_order'] < $b['sort_order']) return -1;
		if ($a['sort_order'] > $b['sort_order']) return 1;

		return 0;
	}

	/**
	 * Register and enqueues needed js files
	 *
	 * @retun void
	 */
	public function load_dashboard_js() {
		// @codingStandardsIgnoreLine
		$enqueue_version = @constant('WP_DEBUG') ? self::VERSION.'.'.time() : self::VERSION;

		$min_or_not = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';

		// https://github.com/alexei/sprintf.js
		wp_register_script('sprintf', UD_CENTRAL_URL.'/js/sprintf/sprintf'.$min_or_not.'.js', array(), '20151204');

		// https://github.com/digitalbazaar/forge
		wp_register_script('forge', UD_CENTRAL_URL.'/js/forge-js/forge.min.js', array(), '0.7.0');

		wp_register_script('class-udrpc', UD_CENTRAL_URL.'/js/class-udrpc'.$min_or_not.'.js', array('forge'), '0.3.3');

		/*
		// https://github.com/google/caja/
		wp_register_script('caja-html4-defs', UD_CENTRAL_URL.'/js/caja/html4-defs.js', array(), '20151215');
		wp_register_script('caja-uri', UD_CENTRAL_URL.'/js/caja/uri.js', array(), '20151215');
		wp_register_script('google-caja-sanitizer', UD_CENTRAL_URL.'/js/caja/sanitizer.js', array('caja-html4-defs', 'caja-uri'), '20151215');
		*/

		wp_register_script('tether', UD_CENTRAL_URL.'/js/tether/tether'.$min_or_not.'.js', array(), '1.4.0');

		wp_register_script('popperjs', UD_CENTRAL_URL.'/js/popper.js/popper'.$min_or_not.'.js', array(), '1.16.1');

		// starting from version 4.0.0, Bootstrap components (tooltips & dropdowns) require Popper JS
		// https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/js/bootstrap(.min).js
		wp_register_script('bootstrap4', UD_CENTRAL_URL.'/js/bootstrap/bootstrap'.$min_or_not.'.js', array('jquery', 'tether'), '4.4.1');

		// https://github.com/makeusabrew/bootbox/releases/download/v(version)/bootbox(.min).js / http://bootboxjs.com/#download
		wp_register_script('bootbox', UD_CENTRAL_URL.'/js/bootbox/bootbox'.$min_or_not.'.js', array('bootstrap4'), '5.4.0');

		// https://github.com/iyogeshjoshi/google-caja-sanitizer/
		wp_register_script('google-caja-sanitizer', UD_CENTRAL_URL.'/js/caja/sanitizer'.$min_or_not.'.js', array(), '20150315');

		// Handlebars - http://www.handlebarsjs.com - https://github.com/wycats/handlebars.js
		// The "run-time" build handles only pre-compiled templates
		// Visit http://builds.handlebarsjs.com.s3.amazonaws.com/bucket-listing.html?sort=lastmod&sortdir=desc to spot the Git ID for new versions
		// http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars.runtime.min-(Git ID).js - then rename it to match the non-minified version
		// http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars.runtime-v(version).js
		// Rename them all to get rid of the version number from the file - ever-shifting filenames irritate when managing within SVN
		// We used to put the handlebars version here - but then it needed manual updating, which didn't happen, and would result in problems where the old version was cached.
		wp_register_script('handlebars', UD_CENTRAL_URL.'/js/handlebars/handlebars'.$min_or_not.'.js', array(), $enqueue_version);

		wp_register_script('jquery-uc-override', UD_CENTRAL_URL.'/js/deprecated.js', array('jquery'), $enqueue_version);

		// https://github.com/private-face/jquery.fullscreen
		wp_register_script('jquery-fullscreen', UD_CENTRAL_URL.'/js/jquery-fullscreen/jquery.fullscreen'.$min_or_not.'.js', array('jquery', 'jquery-uc-override'), '0.5.1');

		wp_register_script('modernizr-custom', UD_CENTRAL_URL.'/js/modernizr/modernizr-custom'.$min_or_not.'.js', array(), '3.3.1');

		wp_register_script('updraftcentral-queue', UD_CENTRAL_URL.'/js/queue.js', array(), $enqueue_version);
		wp_register_script('d3-queue', UD_CENTRAL_URL.'/js/d3-queue/d3-queue'.$min_or_not.'.js', array(), '3.0.3');

		$library_deps = array('jquery', 'jquery-fullscreen', 'sprintf', 'google-caja-sanitizer', 'bootbox', 'handlebars', 'forge');
		wp_register_script('uc-library', UD_CENTRAL_URL.'/js/uc-library'.$min_or_not.'.js', $library_deps, $enqueue_version);

		wp_register_script('datatables', UD_CENTRAL_URL.'/js/datatables.net/jquery.dataTables'.$min_or_not.'.js', array('jquery'), $enqueue_version);
		wp_register_script('datatables-responsive', UD_CENTRAL_URL.'/js/datatables.net/dataTables.responsive'.$min_or_not.'.js', array('datatables'), $enqueue_version);

		$dashboard_deps = array('jquery', 'popperjs', 'bootbox', 'jquery-fullscreen', 'sprintf', 'class-udrpc', 'google-caja-sanitizer', 'handlebars', 'modernizr-custom', 'updraftcentral-queue', 'd3-queue', 'uc-library', 'jquery-ui-sortable', 'datatables-responsive');

		include ABSPATH.WPINC.'/version.php';
		global $wpdb;

		if (function_exists('curl_version')) {
			$curl_version = curl_version();
			$curl_version = $curl_version['version'];
			 if (!function_exists('curl_exec')) $curl_version .= '/Disabled';
		} else {
			$curl_version = '-';
		}

		$shortcuts = get_user_meta($this->user->user_id, 'updraftcentral_dashboard_shortcuts', true);
		if (!is_array($shortcuts)) $shortcuts = array();

		$pass_to_js = array(
			'udc_version' => self::VERSION,
			'php_version' => PHP_VERSION,
			'wp_version' => $wp_version,// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UndefinedVariable -- Fine to ignore
			'mysql_version' => $wpdb->db_version(),
			'curl_version' => $curl_version,
			'home_url' => home_url(),
			'handlebars' => $this->get_handlebars_data(),
			'show_licence_counts' => apply_filters('updraftcentral_show_licence_counts', false),
			'user_defined_timeout' => $this->user->get_user_defined_timeout(),
			'shortcut_status' => $this->user->get_keyboard_shortcut_status(),
			'load_setting' => $this->user->get_load_setting(),
			'user_defined_shortcuts' => $shortcuts,
		);

		if (!empty($pass_to_js['handlebars']['enqueue'])) {
			$dashboard_deps[] = 'updraftcentral-handlebars-compiled';
			wp_register_script('updraftcentral-handlebars-compiled', $pass_to_js['handlebars']['enqueue']['url'], array('handlebars'), filemtime($pass_to_js['handlebars']['enqueue']['file']));
			unset($pass_to_js['handlebars']['enqueue']);
		}

		// Our dashboard framework
		wp_register_script('updraftcentral-dashboard', UD_CENTRAL_URL.'/js/dashboard'.$min_or_not.'.js', $dashboard_deps, $enqueue_version);

		$localize = array_merge(
			array('common_urls' => $this->get_common_urls()),
			$pass_to_js,
			include(UD_CENTRAL_DIR.'/dashboard-translations.php'),
			include(UD_CENTRAL_DIR.'/keyboard-mappings.php')
		);

		wp_localize_script('updraftcentral-dashboard', 'udclion', apply_filters('updraftcentral_udrclion', $localize));

		do_action('updraftcentral_load_dashboard_js', $enqueue_version);

		wp_enqueue_script('jquery-ui-tabs', array('jquery', 'jquery-ui'));
	}

	/**
	 * Gets template directory
	 *
	 * @return mixed
	 */
	public function get_templates_dir() {
		return apply_filters('updraftcentral_templates_dir', wp_normalize_path(UD_CENTRAL_DIR.'/templates'));
	}

	/**
	 * Gets templates URL
	 *
	 * @return mixed
	 */
	public function get_templates_url() {
		return apply_filters('updraftcentral_templates_url', UD_CENTRAL_URL.'/templates');
	}

	/**
	 * Stores all template directories in an array
	 *
	 * @return void
	 */
	private function register_template_directories() {

		$template_directories = array();

		$templates_dir = $this->get_templates_dir();

		if ($dh = opendir($templates_dir)) {
			while (($file = readdir($dh)) !== false) {
				if ('.' == $file || '..' == $file) continue;
				if (is_dir($templates_dir.'/'.$file)) {
					$template_directories[$file] = $templates_dir.'/'.$file;
				}
			}
			closedir($dh);
		}

		// This is the optimal hook for most extensions to hook into
		$this->template_directories = apply_filters('updraftcentral_template_directories', $template_directories);

	}

	/**
	 * Compile and return all handlebars templates
	 *
	 * @return array A list of handlebars templates to compile and/or scripts to enqueue, plus a base URL
	 */
	private function get_handlebars_data() {

		$templates_dir = $this->get_templates_dir();
		$templates_url = $this->get_templates_url();

		$handlebars = array('base' => $templates_url);

		$handlebars_compile = array();

		$compiled_file = apply_filters('updraftcentral_handlebars_templates_compiled_file', $templates_dir.'/handlebars-compiled.js');

		if ((!defined('UPDRAFTCENTRAL_DEV_ENVIRONMENT') || !UPDRAFTCENTRAL_DEV_ENVIRONMENT) && file_exists($compiled_file)) {
			$handlebars['enqueue'] = apply_filters('updraftcentral_handlebars_templates_enqueue', array('url' => $templates_url.'/handlebars-compiled.js', 'file' => $compiled_file));
		}

		if ((defined('UPDRAFTCENTRAL_DEV_ENVIRONMENT') && UPDRAFTCENTRAL_DEV_ENVIRONMENT) || !file_exists($compiled_file)) {
			foreach ($this->template_directories as $prefix => $directory) {
				$templates = $this->register_handlebars_templates($prefix, $directory);
				$handlebars_compile = array_merge($handlebars_compile, $templates);
			}
		}

		$handlebars['compile'] = apply_filters('updraftcentral_handlebars_compile', $handlebars_compile);

		return $handlebars;
	}

	/**
	 * This method is for telling UpdraftCentral to recursively scan the indicated directory, and to add all found handlebars templates (i.e. ones ending in .handlebars.html) to the list of templates to (potentially) compile
	 *
	 * @param  string $prefix
	 * @param  string $directory
	 * @return array
	 */
	public function register_handlebars_templates($prefix, $directory) {

		$handlebars_compile = array();

		try {

			$directory_iterator = new RecursiveDirectoryIterator($directory);
			$iterator = new RecursiveIteratorIterator($directory_iterator);
			$regex = new RegexIterator($iterator, '/^.+\.handlebars\.html$/i', RecursiveRegexIterator::GET_MATCH);

			foreach ($regex as $files) {
				foreach ($files as $file) {
					$basename = substr($file, 1 + strlen($directory));
					$template_name = $prefix.'-'.str_replace('/', '-', wp_normalize_path(substr($basename, 0, -strlen('.handlebars.html'))));
					$get_template_from = apply_filters('updraftcentral_handlebars_template_file', $file, $template_name);
					$handlebars_compile[$template_name] = apply_filters('updraftcentral_handlebars_template_contents', file_get_contents($get_template_from), $template_name, $get_template_from);
				}

			}
		} catch (Exception $e) {
			error_log('UpdraftCentral: error when scanning for handlebars templates: '.$e->getMessage());
		}

		return $handlebars_compile;
	}

	/**
	 * Enqueues required stylesheets
	 *
	 * @return void
	 */
	public function load_dashboard_css() {
		// @codingStandardsIgnoreLine
		$enqueue_version = @constant('WP_DEBUG') ? self::VERSION.'.'.time() : self::VERSION;

		wp_enqueue_style('updraftcentral-dashboard-css', UD_CENTRAL_URL.'/css/dashboard.css', array('dashicons'), $enqueue_version);

		wp_enqueue_style('updraftcentral-mobile-css', UD_CENTRAL_URL.'/css/mobile.css', array('updraftcentral-dashboard-css'), $enqueue_version);

		// Temporary file for developers to add CSS in without stepping on the toes of people working on styling
		wp_enqueue_style('updraftcentral-dashboard-temp-css', UD_CENTRAL_URL.'/css/dashboard-temp.css', array('updraftcentral-dashboard-css'), $enqueue_version);
		
		// Loads Google fonts.
		wp_enqueue_style('updraftcentral-google-fonts-source-sans-pro', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700', $enqueue_version);
		
		// Temp new design
		wp_enqueue_style('updraftcentral-new-design', UD_CENTRAL_URL.'/css/dashboard-design-temp.css', array('updraftcentral-dashboard-css'), $enqueue_version);

		wp_enqueue_style('datatables', UD_CENTRAL_URL.'/css/datatables.net/css/jquery.dataTables.min.css', array('updraftcentral-dashboard-temp-css'), $enqueue_version);
		wp_enqueue_style('datatables-responsive', UD_CENTRAL_URL.'/css/datatables.net/css/responsive.dataTables.min.css', array('datatables'), $enqueue_version);

		do_action('updraftcentral_load_dashboard_css', $enqueue_version);
	}

	/**
	 * Enqueues Bootstrap stylesheet and dequeues old PageLines
	 *
	 * @return void
	 */
	public function wp_footer() {
		// @codingStandardsIgnoreLine
		$bootstrap_file = @constant('SCRIPT_DEBUG') ? 'bootstrap' : 'bootstrap.min';
		// https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/$bootstrap_file
		wp_enqueue_style('bootstrap4', UD_CENTRAL_URL."/css/bootstrap/${bootstrap_file}.css", array(), '4.4.1');

		// Old testing sandbox used PageLines; no longer; but perhaps someone else will be doing
		wp_dequeue_script('pagelines-bootstrap-all');

	}

	/**
	 * Sets up text domain for plugin upon the WordPress action plugins_loaded
	 *
	 * @return void
	 */
	public function plugins_loaded() {
		load_plugin_textdomain('updraftcentral', false, basename(UD_CENTRAL_DIR).'/languages');
	}

	/**
	 * Verify whether the currently logged-in WP user is allowed to access the specified page (or any pages)
	 *
	 * @param Boolean|String $page		   - The page
	 * @param Boolean|String $require_role - Require the user to have a particular role
	 * @param Boolean		 $require_cap  - Require the user to have a particular capability
	 *
	 * @return Boolean - the result
	 */
	public function access_role_check($page = false, $require_role = false, $require_cap = false) {

		$current_user = wp_get_current_user();
		$user_roles = $current_user->roles;

		$allowed = false;

		if (is_super_admin()) $allowed = true;

		// With this option, *any* matching role grants access
		if (is_array($require_role) && !empty($require_role)) {
			foreach ($require_role as $rr) {
				if (in_array(trim(strtolower($rr)), $user_roles)) {
					$allowed = true;
					break;
				}
			}
		} else {
			$allowed = true;
		}

		// With this option, *all* specified capabilities are required
		if ($allowed && is_array($require_cap) && !empty($require_cap)) {
			foreach ($require_cap as $rc) {
				if (!current_user_can($rc)) {
					$allowed = false;
					break;
				}
			}
		}

		return apply_filters('updraftcentral_access_role_check', $allowed, $current_user, $page, $require_role, $require_cap);
	}

	/**
	 * Runs upon plugin activation to check requirements and create tables
	 *
	 * @return void
	 */
	public function activation_hook() {
		include_once UD_CENTRAL_DIR.'/classes/activation.php';
		UpdraftCentral_Activation::install();
	}

	/**
	 * Runs upon plugin deactivation to do housekeeping or cleanup
	 *
	 * @return void
	 */
	public function deactivation_hook() {
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
	 * Stores notices in an array
	 *
	 * @param string $content	Notice message to log
	 * @param string $level		Notice level e.g. error
	 * @param bool   $unique_id	Unique ID of notice message
	 * @param array  $options	Options for notice message. eg. can close?
	 * @return void
	 */
	public function log_notice($content, $level = 'error', $unique_id = false, $options = array()) {
		if (apply_filters('updraftcentral_log_notice', true, $content, $level, $unique_id)) {

			$defaults = array(
				'show_dismiss' => 'true'
			);

			$options = wp_parse_args($options, $defaults);

			$log_this = apply_filters('updraftcentral_log_notice_content', array('level' => $level, 'content' => $content, 'options' => $options), $level, $unique_id);

			if ($unique_id) {
				$this->notices[$unique_id] = $log_this;
			} else {
				$this->notices[] = $log_this;
			}
		}
	}

	/**
	 * Remove a previously added notice
	 *
	 * @param string $notice_id
	 * @return void
	 */
	public function remove_notice($notice_id) {
		if (isset($this->notices[$notice_id])) {
			unset($this->notices[$notice_id]);
		}
	}

	/**
	 * Includes a notices template and displays logged notices using that template
	 *
	 * @return void
	 */
	public function print_dashboard_notices() {
		// We only want one notice area
		static $printed_notice_container = false;
		if ($printed_notice_container) return;
		$this->include_template('dashboard/notices.php', false, array('notices' => $this->notices));
		$printed_notice_container = true;
	}

	/**
	 * Initalizes plugin functionality
	 *
	 * Sets up an array of template directories to use, current user
	 * Includes Site meta and options class
	 *
	 * @return bool Returns true upon successful initialisation, else false.
	 */
	private function init() {
		if ($this->inited) return true;

		if (!is_user_logged_in()) return false;

		$this->register_template_directories();

		$user = wp_get_current_user();

		try {
			$this->user = $this->get_user_object($user->ID);
		} catch (Exception $e) {
			$failure = true;
			$this->log_notice($e->getMessage().' ('.get_class($e).')', 'error');
		}

		if (!class_exists('UpdraftCentral_Site_Meta')) include_once UD_CENTRAL_DIR.'/classes/site-meta.php';

		if (!class_exists('UpdraftCentral_Options')) include_once UD_CENTRAL_DIR.'/classes/updraftcentral-options.php';

		try {
			$this->site_meta = new UpdraftCentral_Site_Meta($this->table_prefix);
		} catch (Exception $e) {
			$failure = true;
			$this->log_notice($e->getMessage().' ('.get_class($e).')', 'error');
		}

		if (empty($failure)) {
			$this->inited = true;
			do_action('updraftcentral_inited');
		}

		return $this->inited;
	}

	/**
	 * Get user object based on id
	 *
	 * @param int $user_id - User ID
	 * @return    UpdraftCentral_User - UpdraftCentral user object
	 */
	public function get_user_object($user_id) {
		if (!class_exists('UpdraftCentral_User')) include_once UD_CENTRAL_DIR.'/classes/user.php';

		return new UpdraftCentral_User($user_id);
	}

	/**
	 * Gets an RPC object, and sets some defaults on it that we always want
	 *
	 * @param  string $indicator_name
	 * @return UpdraftPlus_Remote_Communications
	 */
	public function get_udrpc($indicator_name = 'central.updraftplus.com') {
	
		if (class_exists('GuzzleHttp\Client') && class_exists('GuzzleHttp\Utils')) {
			// No-op. Trying to reduce changes of one class getting loaded from a different version of Guzzle when more than one auto-loader has registered a version, via invoking any existing auto-loader first.
		}
		// Include composer autoload.php to get libraries
		include_once UD_CENTRAL_DIR.'/vendor/autoload.php';

		// Check if UpdraftPlus_Remote_Communications is present before including class-udrpc.php
		if (!class_exists('UpdraftPlus_Remote_Communications')) include_once UD_CENTRAL_DIR.'/classes/class-udrpc.php';

		$ud_rpc = new UpdraftPlus_Remote_Communications($indicator_name);
		$ud_rpc->set_can_generate(true);

		return $ud_rpc;
	}

	/**
	 * Adds settings and UDC site links to plugin links in WordPress Dashboard Plugins Page
	 *
	 * @param string $links	- Existing links to be used in plugin dashboard page
	 * @return mixed $links - Updated links array
	 */
	public function plugin_action_links($links) {

		$link = '<a href="'.admin_url('admin.php?page=updraft-central').'">'.__('Settings', 'updraftcentral').'</a>';
		array_unshift($links, $link);

		$link2 = '<a href="http://updraftcentral.com">'.__('UpdraftCentral website', 'updraftcentral').'</a>';

		array_unshift($links, $link2);

		return $links;
	}

	/**
	 * Includes templates from mentioned path. Either returns it or echos it
	 *
	 * @param string $path					 - Path of template file to be included
	 * @param bool   $return_instead_of_echo - Option to echo or return template
	 * @param array  $extract_these			 - Data available to template
	 * @return string
	 */
	public function include_template($path, $return_instead_of_echo = false, $extract_these = array()) {
		if ($return_instead_of_echo) ob_start();

		if (preg_match('#^([^/]+)/(.*)$#', $path, $matches)) {
			$prefix = $matches[1];
			$suffix = $matches[2];
			if (isset($this->template_directories[$prefix])) {
				$template_file = $this->template_directories[$prefix].'/'.$suffix;
			}
		}

		// @codingStandardsIgnoreStart
		// Not yet used
		// 	public function wp_get_var($table, $where) {
		// 		global $wpdb;
		// 		$var = $wpdb->get_var("SELECT * FROM ".$wpdb->base_prefix.$this->table_prefix.$table." WHERE ".$where);
		// 		if (null === $var && !empty($wpdb->last_error)) return new WP_Error('database_getvar_error', $wpdb->last_error);
		// 		return $var;
		// 	}
		// @codingStandardsIgnoreEnd

		if (!isset($template_file)) {
			$template_file = UD_CENTRAL_DIR.'/templates/'.$path;
		}

		$template_file = apply_filters('updraftcentral_template', $template_file, $path);

		do_action('updraftcentral_before_template', $path, $template_file, $return_instead_of_echo, $extract_these);

		if (!file_exists($template_file)) {
			error_log("UpdraftCentral: template not found: $template_file");
			echo __('Error:', 'updraftcentral').' '.__('template not found', 'updraftcentral')." ($path)";
		} else {
			extract($extract_these);
			$updraft_central = $this;// phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable -- Fine to ignore since usage is done within the included template file.
			include $template_file;
		}

		do_action('updraftcentral_after_template', $path, $template_file, $return_instead_of_echo, $extract_these);

		if ($return_instead_of_echo) return ob_get_clean();
	}

	/**
	 * Selects a row of data and returns it
	 *
	 * @see WPDB::get_row()
	 * @param string $table	- Table name to be retrieved
	 * @param string $where	- Condition to match with retrieved data
	 * @return array | WP_Error - Array of retrieved row data or a WP_Error object
	 */
	public function wp_get_row($table, $where) {
		global $wpdb;
		$row = $wpdb->get_row('SELECT * FROM '.$wpdb->base_prefix.$this->table_prefix.$table.' WHERE '.$where);
		if (null === $row && !empty($wpdb->last_error)) return new WP_Error('database_get_row_error', $wpdb->last_error);

		return $row;
	}

	/**
	 * Performs a database delete operation. A thin layer on WPDB::delete().
	 *
	 * @see    WPDB::delete()
	 * @param  String $table - the table to delete from (without any of our prefixes)
	 * @param  Array  $where - A named array of WHERE clauses (in column/value pairs)
	 * @return Integer|WP_Error - the number of rows deleted, or a WP_Error object
	 */
	public function wp_delete($table, $where) {
		global $wpdb;
		$deleted = $wpdb->delete($wpdb->base_prefix.$this->table_prefix.$table, $where);
		if (false === $deleted) return new WP_Error('database_delete_error', $wpdb->last_error);

		return $deleted;
	}

	/**
	 * Performs a database insert operation. A thin layer on WPDB::insert().
	 *
	 * @see    WPDB::insert()
	 * @param  String 			 $table  - the table to insert into (without any of our prefixes)
	 * @param  Array 			 $data   - A named array of column/value pairs
	 * @param  Array|String|null $format - An array of formats to be mapped to each of the value in $data. If string, that format will be used for all of the values in $data.
	 * @return Integer|WP_Error - the number of rows inserted, or a WP_Error object
	 */
	public function wp_insert($table, $data, $format = null) {
		global $wpdb;
		$inserted = $wpdb->insert($wpdb->base_prefix.$this->table_prefix.$table, $data, $format);
		if (false === $inserted) return new WP_Error('database_add_error', $wpdb->last_error);

		return $inserted;
	}

	/**
	 * Performs a database update operation. A thin layer on WPDB::update().
	 *
	 * @see WPDB::insert()
	 * @param  String 			 $table  	   - the table to insert into (without any of our prefixes)
	 * @param  Array 			 $data 		   - A named array of column/value pairs
	 * @param  Array 			 $where 	   - A named array of WHERE clauses (in column/value pairs)
	 * @param  Array|String|null $format 	   - An array of formats to be mapped to each of the value in $data. If string, that format will be used for all of the values in $data.
	 * @param  Array|String|null $where_format - An array of formats to be mapped to each of the value in $where. If string, that format will be used for all of the values in $data.
	 * @return Integer|WP_Error - the number of rows updated, or a WP_Error object
	 */
	public function wp_update($table, $data, $where, $format = null, $where_format = null) {
		global $wpdb;
		$updated = $wpdb->update($wpdb->base_prefix.$this->table_prefix.$table, $data, $where, $format, $where_format);
		if (false === $updated) return new WP_Error('database_update_error', $wpdb->last_error);

		return $updated;
	}

	/**
	 * Does not have to (and should not be relied upon to) be able to infallibly detect
	 *
	 * @param  string $url
	 * @return boolean
	 */
	public function url_looks_internal($url) {
		$url_host = strtolower(parse_url($url, PHP_URL_HOST));
		if (0 === strpos($url_host, 'localhost') || strpos($url_host, '127.') === 0 || strpos($url_host, '10.') === 0 || '::1' == $url_host || substr($url_host, -10, 10) == '.localhost' || substr($url_host, -4, 4) == '.dev' || '.localdomain' == substr($url_host, -12, 12)) return true;

		return false;
	}

	/**
	 * Return instance of Updraft_Logger
	 *
	 * @return Updraft_Logger
	 */
	public static function get_logger() {
		if (empty(self::$_logger_instance)) {
			if (!class_exists('UpdraftCentral_Logger')) include_once UD_CENTRAL_DIR.'/classes/class-updraftcentral-logger.php';
			$updraft_logger = new UpdraftCentral_Logger();

			// Loggers must implement the "Updraft_Logger_Interface"
			// interface to be added as valid loggers
			$loggers = apply_filters('updraftcentral_loggers', $updraft_logger->get_loggers());
			if (!empty($loggers)) {
				foreach ($loggers as $logger) {
					$updraft_logger->add_logger($logger);
				}
			}

			// Making sure that we have at least 1 logger to use in case all else fails.
			$updraft_loggers = $updraft_logger->get_loggers();
			if (empty($updraft_loggers)) {
				// Add PHP Logger as the default logger if no logger is available
				if (!class_exists('UpdraftCentral_PHP_Logger')) include_once UD_CENTRAL_DIR.'/classes/class-updraftcentral-php-logger.php';
				$logger = new UpdraftCentral_PHP_Logger();
				$updraft_logger->add_logger($logger);
			}

			self::$_logger_instance = $updraft_logger;
		}

		return self::$_logger_instance;
	}

	/**
	 * Message to capture or log
	 *
	 * @param string $message Message to insert into the log.
	 * @param string $level   The type of message this current log contain (e.g. info, warning, debug, error)
	 * @param array  $context Context of the log.
	 */
	public function log($message, $level = 'debug', $context = array()) {
		// For now, we set the $level to 'debug' as default when logging (mostly for debugging purposes).
		// The level can be in the form of 'info', 'warning', etc. Please refer to the 'Updraft_Log_Levels'
		// class for a complete list of level definitions.
		self::get_logger()->log($message, $level, $context);
	}

	/**
	 * Checks whether the submitted data is a valid json-encoded string
	 *
	 * @param  Mixed $data The data to validate
	 * @return Boolean - True when $data is a valid json string, False otherwise.
	 */
	public function is_json($data) {
	   return is_string($data) && is_array(json_decode($data, true)) ? true : false;
	}

	/**
	 * JSON encodes data whenever applicable
	 *
	 * @param  Mixed $data The data to process
	 * @return Mixed
	 */
	public function maybe_json_encode($data) {
		// We only encode data that is currently not json-encoded and
		// those that has 'object' or 'array' data types. Otherwise, we'll return
		// them as is.
		if (in_array(gettype($data), array('object', 'array'))) {
			$data = json_encode($data);
		}

		return $data;
	}

	/**
	 * JSON decodes data to its original form whenever applicable
	 *
	 * @param  Mixed $data The data to process
	 * @return Mixed
	 */
	public function maybe_json_decode($data) {
		// Decode data to its original form only when the given $data
		// is a valid json string.
		if (is_array($data)) {
			foreach ($data as $key => $value) {
				if ($this->is_json($value)) {
					$data[$key] = json_decode($value, true);
				}
			}
		} else {
			if ($this->is_json($data)) {
				$data = json_decode($data, true);
			}
		}

		return $data;
	}

	/**
	 * This is part of the wp_privacy_personal_data_erasers
	 * THis will export the list of sites registered by the user
	 *
	 * @param string $email_address The email of user sites to be exported
	 * @return array
	 */
	public function export_registered_sites($email_address) {
		// Get user ID by emails
		$user_id = get_user_by('email', $email_address);
		$export_items = array();

		// Check to make sure a user has returned
		if ($user_id && $user_id->ID) {
			// Get user
			$user = $this->get_user_object($user_id->ID);

			// Get user sites
			$sites = $user->load_user_sites();

			// Check if the user has added any sites
			if (!empty($sites)) {
				// Get each site information and add it to the export array
				foreach ($sites as $site) {
					// Add this group of items to the exporters data array.
					$export_items[] = array(
						'group_id'    => "registered-sites",
						'group_label' => __('UpdraftCentral Registered sites', 'updraftcentral'),
						'item_id'     => "registered-sites-{$user_id->ID}",
						'data'        => array(
							array(
								'name'  => __('Remote user login', 'updraftcentral'),
								'value' => $site->remote_user_login
							),
							array(
								'name'  => __('Remote user ID', 'updraftcentral'),
								'value' => $site->remote_user_id
							),
							array(
								'name'  => __('Description', 'updraftcentral'),
								'value' => $site->description
							),
							array(
								'name'  => __('URL', 'updraftcentral'),
								'value' => $site->url
							),
						)
					);

					// Get site meta info
					if (!class_exists('UpdraftCentral_Site_Meta')) include_once UD_CENTRAL_DIR.'/classes/site-meta.php';

					// Call site meta class
					$get_site_meta = new UpdraftCentral_Site_Meta($this->table_prefix);

					// Add site meta data to the sites
					$sites_meta = $get_site_meta->get_site_meta($site->site_id, 'site_tag', false, false, true);


					if (!empty($sites_meta)) {
						foreach ($sites_meta as $meta) {
							$export_items[] = array(
								'data'        => array(
									array(
										'name'  => __('Meta ID', 'updraftcentral'),
										'value' => $meta->meta_id
									),
									array(
										'name'  => __('Meta key', 'updraftcentral'),
										'value' => $meta->meta_key
									),
									array(
										'name'  => __('Meta value', 'updraftcentral'),
										'value' => $meta->meta_value
									),
									array(
										'name'  => __('Created', 'updraftmanager'),
										'value' => $meta->updraftcentral
									),
								)
							);
						}
					}
				}
			} else {
				$export_items[] = array(
					'group_id'    => "registered-sites",
					'group_label' => __('registered sites', 'updraftcentral'),
					'item_id'     => "registered-sites-{$user_id->ID}",
					'data'        => array(
						array(
							'name'  => __('No sites found', 'updraftcentral'),
							'value' => 'No Sites Found'
						),
					)
				);
			}
		} else {
			$export_items[] = array(
				'group_id'    => "registered-sites",
				'group_label' => __('registered sites', 'updraftcentral'),
				'item_id'     => "registered-sites-{$user_id->ID}",
				'data'        => array(
					array(
						'name'  => __('Not Found', 'updraftcentral'),
						'value' => 'User Not Found'
					),
				)
			);
		}

		// Return once completed
		return array(
			'data' => $export_items,
			'done' => true,
		);
	}
}

endif;

/**
 * Creates an instance of UpdraftCentral class
 *
 * @return object
 */
function UpdraftCentral() {
	return UpdraftCentral::instance();
}

$GLOBALS['updraft_central'] = UpdraftCentral();
