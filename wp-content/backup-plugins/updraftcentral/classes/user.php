<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

if (!class_exists('UpdraftCentral_User')) :

class UpdraftCentral_User {

	private $rc;

	public $user_id = null;

	public $sites = null;

	public $sites_meta = null;

	private $php_events;

	private $licence_manager = null;

	public function __construct($user_id) {

		$this->user_id = (int) $user_id;

		// We only check for the login state if the request is not coming from
		// a cron event call
		if (!defined('DOING_CRON') || !DOING_CRON) {
			if (!is_user_logged_in()) throw new Exception('The current visitor is not logged in');
		}

		global $wpdb;
		$this->rc = UpdraftCentral();
		$this->sites_table = $wpdb->base_prefix.$this->rc->table_prefix.'sites';
		$this->sitemeta_table = $wpdb->base_prefix.$this->rc->table_prefix.'sitemeta';

		add_filter('updraftcentral_dashboard_ajaxaction_newsite', array($this, 'dashboard_ajaxaction_newsite'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_import_settings', array($this, 'dashboard_ajaxaction_import_settings'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_export_settings', array($this, 'dashboard_ajaxaction_export_settings'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_edit_site_configuration', array($this, 'dashboard_ajaxaction_edit_site_configuration'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_edit_site_connection_method', array($this, 'dashboard_ajaxaction_edit_site_connection_method'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_delete_site', array($this, 'dashboard_ajaxaction_delete_site'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_sites_html', array($this, 'dashboard_ajaxaction_sites_html'));
		add_filter('updraftcentral_dashboard_ajaxaction_site_rpc', array($this, 'dashboard_ajaxaction_site_rpc'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_manage_site_order', array($this, 'dashboard_ajaxaction_manage_site_order'), 10, 2);

		add_filter('updraftcentral_load_user_sites', array($this, 'load_user_sites_filter'));
		add_filter('updraftcentral_dashboard_ajaxaction_manage_site_meta', array($this, 'dashboard_ajaxaction_manage_site_meta'), 10, 2);

		// Manage dashboard shortcuts through ajax request
		add_filter('updraftcentral_dashboard_ajaxaction_shortcuts', array($this, 'dashboard_ajaxaction_shortcuts'), 10, 2);

		// Handles module visibility
		add_filter('updraftcentral_main_navigation_items', array($this, 'main_navigation_items'));
		add_filter('updraftcentral_dashboard_ajaxaction_module_visibility', array($this, 'dashboard_ajaxaction_module_visibility'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_reset_modules_visibility', array($this, 'dashboard_ajaxaction_reset_modules_visibility'), 10, 2);

		// Save timeout settings
		add_filter('updraftcentral_dashboard_ajaxaction_save_timeout', array($this, 'dashboard_ajaxaction_save_timeout'), 10, 2);

		add_filter('updraftcentral_dashboard_ajaxaction_cache_response', array($this, 'dashboard_ajaxaction_cache_response'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_save_settings', array($this, 'dashboard_ajaxaction_save_settings'), 10, 2);
		add_filter('updraftcentral_site_alert_icon', array($this, 'dashboard_site_alert_icon'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_log_event', array($this, 'dashboard_ajaxaction_log_event'), 10, 2);
		add_filter('updraftcentral_dashboard_ajaxaction_events', array($this, 'dashboard_ajaxaction_events'), 10, 2);
		add_filter('updraftcentral_site_data_attributes', array($this, 'dashboard_attach_cached_data'), 10, 2);

		// Load licence manager - this needs loading before the sites themselves are
		if (!class_exists('UpdraftCentral_Licence_Manager')) include_once UD_CENTRAL_DIR.'/classes/licence-manager.php';

		// Allow developers to implement their own licence management
		$licence_manager_class = apply_filters('updraftcentral_licence_manager_class', 'UpdraftCentral_Licence_Manager');

		$this->licence_manager = new $licence_manager_class($this, $this->rc);

		$this->load_user_sites();

	}

	/**
	 * Attach cache data of a particular site to its site row attributes
	 *
	 * @param string $site_attributes Attribute string of the site
	 * @param object $site            The site where the cached data attribute is to be added
	 *
	 * @return string
	 */
	public function dashboard_attach_cached_data($site_attributes, $site) {		
		$data = $this->load_cached_data($site->site_id);
		if (!empty($data)) {
			$site_attributes .= ' data-cached_data="'.base64_encode(json_encode($data)).'"';
		}
		
		return $site_attributes;
	}

	/**
	 * Loads all events recorded/logged and their corresponding response data
	 *
	 * @param array $response  A response array where we insert our request response
	 * @param array $post_data Parameters passed as an additional argument(s) to the request
	 *
	 * @calls die()
	 */
	public function dashboard_ajaxaction_events($response, $post_data) {
		global $wpdb;
		$our_prefix = $wpdb->base_prefix.$this->rc->table_prefix;

		$response = array(
			"draw" => 0,
			"recordsTotal" => 0,
			"recordsFiltered" => 0,
			"data" => array()
		);

		$data = $post_data['data'];
		if (!empty($data)) {
			$draw = $data['draw'];
			$row = $data['start'];
			$row_per_page = $data['length'];
			$column_index = $data['order'][0]['column'];
			$column_name = $data['columns'][$column_index]['data'];
			$column_sort_order = $data['order'][0]['dir'];
			$search_value = $data['search']['value'];

			$sql = 'SELECT e.*, s.description';
			$from = 'FROM '.$our_prefix.'events e, '.$our_prefix.'sites s';
			$where = 'WHERE e.site_id = s.site_id';
			$order = 'ORDER BY e.time DESC';
			$limit = 'LIMIT %d,%d';

			// If event_name is passed as sorting field we will use the event_data since
			// it holds the actual plugin and theme name.
			if ('event_name' === $column_name) {
				$column_name = 'event_data';
			}

			// We can't add the order clause fields into wpdb->prepare since it will convert the
			// values into 'field_name' 'ASC' or 'field_name' 'DESC', thus breaking the sorting
			// capability of the datatables.net plugin. Therefore, we'll just have to sanitize
			// it manually through WordPress' sanitize_sql_orderby method.
			$order_by = sanitize_sql_orderby($column_name.' '.$column_sort_order);
			if (false !== $order_by) {
				$order = 'ORDER BY '.$order_by;
			}
			
			if (!empty($search_value)) {
			   $where .= ' AND (e.event_type LIKE %s OR e.event_name LIKE %s OR e.event_status LIKE %s OR s.description LIKE %s OR DATE(FROM_UNIXTIME(e.time)) LIKE %s OR SUBSTRING_INDEX(e.event_data, "\",", 1) LIKE %s)';
			}

			$sql = $sql.' '.$from.' '.$where.' '.$order.' '.$limit;

			$total_records = 0;
			if (!empty($search_value)) {
				$search_value = '%'.$search_value.'%';
				$search_event_data = '%"name":"%'.$search_value.'%';

				$total_records = $wpdb->get_var($wpdb->prepare('SELECT COUNT(e.event_id) '.$from.' '.$where, $search_value, $search_value, $search_value, $search_value, $search_value, $search_event_data));
				$result = $wpdb->get_results($wpdb->prepare($sql, $search_value, $search_value, $search_value, $search_value, $search_value, $search_event_data, $row, $row_per_page), ARRAY_A);
			} else {
				// We don't need the wpdb->prepare in getting the $total_records here since there's no token or
				// user inputted data to replace in this COUNT query.
				$total_records = $wpdb->get_var('SELECT COUNT(e.event_id) '.$from.' '.$where);
				$result = $wpdb->get_results($wpdb->prepare($sql, $row, $row_per_page), ARRAY_A);
			}

			$result_data = array();

			$total_records_with_limit = 0;
			if (!empty($result)) {
				$total_records_with_limit = count($result);
				foreach ($result as $item) {
					$event_name = $this->get_readable_text($item['event_data'], $item['event_name'], $item['event_type']);
					$result_data []= array(
						'event_name' => $event_name,
						'description' => $item['description'],
						'event_status' => $item['event_status'],
						'time' => date('Y-m-d H:i:s', $item['time']),
						'event_result_data' => '<a href="#" class="updraftcentral_events_result_view" data-event_result_data="'.base64_encode($item['event_result_data']).'">view</a>'
					);
				}
			}

			$response = array(
				"draw" => intval($draw),
				"recordsTotal" => $total_records ?: 0,
				"recordsFiltered" => $total_records_with_limit ?: 0,
				"data" => $result_data
			);
		}

		echo json_encode($response);
		die();
	}

	/**
	 * Builds a readable report/line to be presented to the user on the events table
	 *
	 * @param string $event_data The stored/logged event information
	 * @param string $event_name The name of the event
	 * @return string
	 */
	private function get_readable_text($event_data, $event_name) {
		$event_data = json_decode($event_data, true);
		$text = '';
		if (!empty($event_data) && isset($event_data['name'])) {
			list($event_type, $item_type) = explode('.', $event_name);
			$item = $event_data['name'];

			if ('plugin' === $item_type) {
				$item_type = __('plugin', 'updraftcentral');
			} elseif ('theme' === $item_type) {
				$item_type = __('theme', 'updraftcentral');
			} elseif ('core' === $item_type) {
				$item_type = __('core', 'updraftcentral');
			} elseif ('translation' === $item_type) {
				$item_type = __('translation', 'updraftcentral');
			}

			switch ($event_type) {
				case 'install':
					$text = sprintf(__('Installation of the %s %s', 'updraftcentral'), $item, $item_type);
					break;
				case 'update':
					$text = sprintf(__('Update of the %s %s', 'updraftcentral'), $item, $item_type);
					break;
				case 'delete':
					$text = sprintf(__('Deletion of the %s %s', 'updraftcentral'), $item, $item_type);
					break;
				case 'activate':
					$text = sprintf(__('Activation of the %s %s', 'updraftcentral'), $item, $item_type);
					break;
				case 'deactivate':
					$text = sprintf(__('Deactivation of the %s %s', 'updraftcentral'), $item, $item_type);
					break;
				case 'install_activate':
					$text = sprintf(__('Installation and activation of the %s %s', 'updraftcentral'), $item, $item_type);
					break;
			}
		}

		return $text;
	}

	/**
	 * Returns an icon string if a site is not reacheable in the last 96 hours
	 * 
	 * Used by the WP filter updraftcentral_site_alert_icon
	 *
	 * @param string  $html	   HTML to use for an icon
	 * @param integer $site_id The ID of the site to check
	 *
	 * @return string - filtered value
	 */
	public function dashboard_site_alert_icon($html, $site_id) {

		// We're going to make sure that site_meta is not null before using it as it is being
		// called early in the process within cron (see UpdraftCentral::rearrange_priority)
		$site_meta = $this->rc->site_meta;
		if (!is_a($site_meta, 'UpdraftCentral_Site_Meta')) {
			if (!class_exists('UpdraftCentral_Site_Meta')) include_once UD_CENTRAL_DIR.'/classes/site-meta.php';
			$site_meta = new UpdraftCentral_Site_Meta($this->rc->table_prefix);
		}

		$meta = $site_meta->get_site_meta($site_id, 'background_request_error', true, false, true);

		if (!empty($meta) && is_array($meta) && !empty($meta['created'])) {
			$result = $meta['meta_value'];

			if (!empty($result) && is_array($result) && isset($result['message'])) {
				$timestamp = $meta['created'];
				$elapsed_hours = (time() - $timestamp)/3600;
	
				// If it has not been possible to contact the site using our background/cron mechanism in the last 96 hours
				// then display an alert icon next to the site.
				if ($elapsed_hours >= 96) {
						$message = !empty($result['message']) ? $result['message'] : __('Could not connect to remote site successfully.', 'updraftcentral');
					return '<span class="dashicons dashicons-warning uc_site_alert_icon" title="'.$message.'"></span>';
				}
			}
		}

		return $html;
	}

	/**
	 * Saves a copy of the remote response as a result of executing the
	 * the submitted command along with its parameters.
	 *
	 * @param array $response  A response array where we insert our request response
	 * @param array $post_data Parameters passed as an additional argument(s) to the request
	 * @return array
	 */
	public function dashboard_ajaxaction_log_event($response, $post_data) {
		global $wpdb;
		$our_prefix = $wpdb->base_prefix.$this->rc->table_prefix;

		$response['responsetype'] = 'ok';
		$response['message'] = 'success';
		$data = $post_data['data'];

		if (!empty($data)) {
			$format = array('%d', '%s', '%s', '%s', '%s', '%s', '%d');
			if (isset($data['bulk']) && 1 === intval($data['bulk'])) {
				$data = $data['data'];
				if (is_array($data)) {
					for ($i=0; $i<count($data); $i++) {
						$data[$i]['time'] = time();
						$wpdb->insert($our_prefix.'events', $data[$i], $format);
					}
				}
			} else {
				$data['time'] = time();
				$wpdb->insert($our_prefix.'events', $data, $format);
			}
		}

		return $response;
	}

	/**
	 * Saves a copy of the remote (successful) response as a result of executing the
	 * the submitted command along with its parameters.
	 *
	 * @param array $response  A response array where we insert our request response
	 * @param array $post_data Parameters passed as an additional argument(s) to the request
	 * @return array
	 */
	public function dashboard_ajaxaction_cache_response($response, $post_data) {
		$response['responsetype'] = 'ok';
		$response['message'] = 'success';
		$data = $post_data['data'];
		$site_meta = $this->rc->site_meta;

		if (isset($data['data']['force_refresh'])) {
			// Make sure that we are passing an actual boolean value rather than a string
			// representation of any boolean passed to the "force_refresh" parameter.
			$data['data']['force_refresh'] = filter_var($data['data']['force_refresh'], FILTER_VALIDATE_BOOLEAN);
		}

		if (!isset($data['data'])) $data['data'] = array();
		$cache_key = $this->generate_cache_key($data['site_id'], $data['command'], $data['data']);

		if (!empty($data['response_data'])) {
			$check = $site_meta->get_site_meta($data['site_id'], $cache_key, true);
			if (!empty($check)) {
				$result = $site_meta->update_site_meta($data['site_id'], $cache_key, $data['response_data']);
			} else {
				$result = $site_meta->add_site_meta($data['site_id'], $cache_key, $data['response_data']);
			}

			if (false !== $result) {
				$result = $this->get_sites_cached_responses($cache_key, $data['site_id']);
				if (!empty($result)) {
					$response['data'] = $result;
				}
			}
		}

		return $response;
	}

	/**
	 * Loads cached data for the given site as a result from a previously run cron process
	 *
	 * @param integer $site_id The ID of the site where the cached data is to be pulled from
	 *
	 * @return array
	 */
	public function load_cached_data($site_id) {
		$cached_data = array();

		// Retrieves all (scheduled) commands that were registered using the
		// "updraftcentral_scheduled_commands" filter.
		$scheduled_commands = apply_filters('updraftcentral_scheduled_commands', array());
		if (!empty($scheduled_commands)) {
			if (!is_array($this->sites)) $this->load_user_sites();

			foreach ($scheduled_commands as $item) {
				$command = $item['command'];
				$data = $item['data'];

				$cache_key = $this->generate_cache_key($site_id, $command, $data);
				$cached_data[$command] = $this->get_sites_cached_responses($cache_key, $site_id);
			}
		}

		return $cached_data;
	}

	/**
	 * Retrieves all stored (cached) responses for the given site
	 *
	 * @param string  $key     The meta key
	 * @param integer $site_id The ID of the site
	 *
	 * @return array|object|null
	 */
	private function get_sites_cached_responses($key, $site_id) {
		global $wpdb;
		$our_prefix = $wpdb->base_prefix.$this->rc->table_prefix;

		$responses = $wpdb->get_row($wpdb->prepare("SELECT `site_id`, `created`, `meta_value` as `response` FROM ".$our_prefix."sitemeta WHERE `site_id` = %d AND `meta_key` = %s", $site_id, $key));

		return $responses;
	}

	/**
	 * Retrieves available items for update from the stored/cached data
	 *
	 * @param integer $site_id The ID of the site where to pull the available updates from
	 *
	 * @return array
	 */
	private function get_updates_count_from_cache($site_id) {
		global $wpdb;

		$site_meta = $this->rc->site_meta;
		$our_prefix = $wpdb->base_prefix.$this->rc->table_prefix;

		$cache_key = $this->generate_cache_key($site_id, 'updates.get_updates', array('force_refresh' => false));
		$response = $site_meta->get_site_meta($site_id, $cache_key, true);

		$counts = array('plugins' => 0, 'themes' => 0, 'core' => 0, 'translations' => 0);
		if (is_array($response) && !empty($response)) {
			if (isset($response['reply']) && isset($response['reply']['data'])) {
				$data = $response['reply']['data'];
				foreach ($data as $key => $value) {
					if (isset($counts[$key])) {
						if ('translations' === $key && isset($value['items'])) {
							$counts[$key] = count($value['items']);
						} else {
							$counts[$key] = count($value);
						}
					}
				}
			}
		}

		return $counts;
	}

	/**
	 * Generates a unique key out from the site id, command and data parameters to
	 * be used as a "meta_key" field when saving the data to the DB.
	 *
	 * @param integer $site_id The ID of the site where the command is to be executed
	 * @param string  $command The current command to execute
	 * @param array   $data    An array containing the command parameters
	 * @return string - The generated key
	 */
	public function generate_cache_key($site_id, $command, $data) {
		// N.B. The "meta_key" field format in the "sites_meta" table is done this way in order to store distinct
		// responses for each command submitted. So, we better reconstruct the same key for each sites before
		// saving and retrieving any available data to/in the DB as cached information.
		$command_data_key = '_command'.$command.serialize($data);
		return 'cached_data_'.md5('_site'.$site_id.$command_data_key);
	}

	/**
	 * Saves updraftcentral settings
	 *
	 * @param array $response  A response array where we insert our request response
	 * @param array $post_data Parameters passed as an additional argument(s) to the request
	 * @return array
	 */
	public function dashboard_ajaxaction_save_settings($response, $post_data) {
		$response['responsetype'] = 'ok';
		$response['message'] = 'success';

		$data = $post_data['data'];

		// Save load setting
		if (!empty($data['load_setting'])) {
			update_user_meta($this->user_id, 'updraftcentral_dashboard_load_setting', $data['load_setting']);
		}

		// Save timeout settings
		if (!empty($data['timeout'])) {
			update_user_meta($this->user_id, 'updraftcentral_dashboard_user_defined_timeout', $data['timeout']);
		}

		// Save keyboard shortcuts status
		if (!empty($data['shortcut_status'])) {
			update_user_meta($this->user_id, 'updraftcentral_dashboard_shortcut_status', $data['shortcut_status']);
		}

		return $response;
	}

	/**
	 * Gets the UpdraftCentral load setting
	 *
	 * @return string
	 */
	public function get_load_setting() {
		$load_setting = 'active';	// Default: "active"
		if (!empty($this->user_id)) {
			$value = get_user_meta($this->user_id, 'updraftcentral_dashboard_load_setting', true);
			if (!empty($value)) $load_setting = $value;
		}

		return $load_setting;
	}

	/**
	 * Gets the keyboard shortcut active/inactive status
	 *
	 * @return integer
	 */
	public function get_keyboard_shortcut_status() {
		$shortcut_status = 'active';	// Default: "active" (UpdraftCentral keyboard shortcuts features is active by default)
		if (!empty($this->user_id)) {
			$value = get_user_meta($this->user_id, 'updraftcentral_dashboard_shortcut_status', true);
			if (!empty($value)) $shortcut_status = $value;
		}

		return $shortcut_status;
	}

	/**
	 * Saves user-defined timeout settings
	 *
	 * @param array $response  A response array where we insert our request response
	 * @param array $post_data Parameters passed as an additional argument(s) to the request
	 * @return array
	 */
	public function dashboard_ajaxaction_save_timeout($response, $post_data) {
		$response['responsetype'] = 'ok';
		$response['message'] = 'success';

		$timeout = $post_data['data']['timeout'];
		if (!empty($timeout)) {
			update_user_meta($this->user_id, 'updraftcentral_dashboard_user_defined_timeout', $timeout);
		}

		return $response;
	}

	/**
	 * Gets the user defined timeout settings
	 *
	 * @param integer $default_timeout The default timeout when no user defined timeout is set. Defaults to 30 seconds.
	 * @return integer
	 */
	public function get_user_defined_timeout($default_timeout = 30) {
		if (!empty($this->user_id)) {
			$timeout = get_user_meta($this->user_id, 'updraftcentral_dashboard_user_defined_timeout', true);
			if (!empty($timeout)) return (int) $timeout;
		}

		return $default_timeout;
	}

	/**
	 * Retrieves all available tags for this user, filterable through site id and/or tag name
	 *
	 * @param integer $site_id  Optional. The ID of the site where the tags is to be pulled from
	 * @param string  $tag_name Optional. The name of the tag to search for
	 *
	 * @return array|string|null
	 */
	public function get_site_tags($site_id = 0, $tag_name = '') {
	
		if (!$data = wp_cache_get($this->user_id, 'updraftcentral_tags')) {
			$all_tags = $site_tags = $site_tags_by_name = array();
	
			$user_tags = $this->get_site_tags_from_db();
			foreach ($user_tags as $tag) {
				$site_tags[$tag->site_id][$tag->meta_id] = $tag->meta_value;

				$key_name = strtolower($tag->meta_value);
				$site_tags_by_name[$tag->site_id][$key_name] = $tag->meta_value;
				$all_tags[$tag->meta_id] = $tag->meta_value;
			}

			$data = array(
				'site_tags' => $site_tags,
				'site_tags_by_name' => $site_tags_by_name,
				'all_tags' => $all_tags
			);
			wp_cache_add($this->user_id, $data, 'updraftcentral_tags');
		}

		if (!empty($site_id) && empty($tag_name)) {
			$site_tags = $data['site_tags'];
			if (isset($site_tags[$site_id])) return $site_tags[$site_id];

		} elseif (!empty($site_id) && !empty($tag_name)) {
			$site_tags = $data['site_tags_by_name'];

			$key_name = strtolower($tag_name);
			if (isset($site_tags[$site_id]) && isset($site_tags[$site_id][$key_name])) return $site_tags[$site_id][$key_name];

		} elseif (empty($site_id) && empty($tag_name)) {
			return $data['all_tags'];
		}
			
		return null;
	}

	/**
	 * Force refresh of site tags by removing previously stored cache
	 * in order to give way for a newly pulled data from database.
	 *
	 * @return void
	 */
	public function refresh_site_tags() {

		wp_cache_delete($this->user_id, 'updraftcentral_tags');

		// Load the latest or updated list of tags from DB and save result in cache.
		$this->get_site_tags();
	}

	/**
	 * Retrieves all available tags for this user, filterable through site id and/or tag name
	 *
	 * @param integer $site_id  Optional. The ID of the site where the tags is to be pulled from
	 * @param string  $tag_name Optional. The name of the tag to search for
	 *
	 * @return array|object|null
	 */
	private function get_site_tags_from_db($site_id = 0, $tag_name = '') {
	
		global $wpdb;
		
		$our_prefix = $wpdb->base_prefix.$this->rc->table_prefix;
		
		$site_filter = empty($site_id) ? '' : ' AND s.`site_id` = '.$site_id;
		$tag_filter = empty($tag_name) ? '' : ' AND m.`meta_value` = "'.esc_sql($tag_name).'"';

		$tags = $wpdb->get_results('SELECT m.*, s.`user_id` FROM '.$our_prefix.'sitemeta AS m INNER JOIN '.$our_prefix.'sites AS s ON m.`site_id` = s.`site_id` WHERE m.`meta_key` = "site_tag" AND s.`user_id` = '.$this->user_id.$site_filter.$tag_filter.' ORDER BY m.`meta_value` ASC');

		return $tags;
	}

	/**
	 * Saves user-defined shortcut keys and returns shortcut collection
	 *
	 * @param array $response  A response array where we insert our request response
	 * @param array $post_data Parameters passed as an additional argument(s) to the request
	 * @return array
	 */
	public function dashboard_ajaxaction_shortcuts($response, $post_data) {

		$response['responsetype'] = 'ok';
		$response['message'] = 'success';

		$shortcuts = get_user_meta($this->user_id, 'updraftcentral_dashboard_shortcuts', true);
		if (!is_array($shortcuts)) $shortcuts = array();

		if (isset($post_data['data']['key'])) {
			$shortcuts[$post_data['data']['name']] = $post_data['data']['key'];
		} elseif (isset($post_data['data']['clear'])) {
			$shortcuts = array();
		}

		update_user_meta($this->user_id, 'updraftcentral_dashboard_shortcuts', $shortcuts);

		// Return current shortcuts collection
		$response['shortcuts'] = $shortcuts;
		
		return $response;
		
	}
	
	/**
	 * Process site meta management actions (add, delete, update and get) through ajax request
	 *
	 * @param  array $response
	 * @param  array $post_data - site meta parameters for the current action
	 * @return array
	 */
	public function dashboard_ajaxaction_manage_site_meta($response, $post_data) {

		try {

			$response['responsetype'] = 'ok';
			$response['message'] = '';

			$site_meta = $this->rc->site_meta;

			if (!empty($site_meta)) {
				$data = $post_data['data'];

				switch ($data['action']) {
					case 'add':
						$response['data'] = $site_meta->add_site_meta($data['site_id'], $data['meta_key'], $data['meta_value'], $data['unique']);
						break;
					case 'delete':
						$response['data'] = $site_meta->delete_site_meta($data['site_id'], $data['meta_key'], $data['meta_value']);
						break;
					case 'get':
						$response['data'] = $site_meta->get_site_meta($data['site_id'], $data['key'], $data['single']);
						break;
					case 'update':
						$response['data'] = $site_meta->update_site_meta($data['site_id'], $data['meta_key'], $data['meta_value'], $data['prev_value']);
						break;
					default:
						$response['message'] = 'The submitted site meta command was not recognized.';
						break;
				}
			} else {
				$response['message'] = 'Unable to pull the site meta instance.';
			}
		} catch (Exception $e) {
			$response['responsetype'] = 'error';
			$response['message'] = $e->getMessage();
			// @codingStandardsIgnoreLine
		} catch (Error $e) {
			$response['responsetype'] = 'error';
			$response['message'] = $e->getMessage();
		}

		return $response;
	}

	/**
	 * Used to update sort order in user meta
	 *
	 * @param  array $response
	 * @param  array $post_data - site_order is an indexed array of site id's in the sorted order
	 * @return array
	 */
	public function dashboard_ajaxaction_manage_site_order($response, $post_data) {

		if (isset($post_data['data']['site_order'])) {

			$user_id = $this->user_id;
			$response['responsetype'] = "ok";
			$response['message'] = 'No change';

			if (get_user_meta($user_id, 'updraftcentral_dashboard_site_order', true) !== $post_data['data']['site_order']) { // only update if needed (user dragged and dropped in same place)

				if (update_user_meta($user_id, 'updraftcentral_dashboard_site_order', $post_data['data']['site_order'])) {
					$response['message'] = 'success';
				} else {
					$response['message'] = 'fail';
				}
			}
		} else {
			$response['responsetype'] = "error";
			$response['message'] = "Missing site order data";
		}

		return $response;
	}

	public function get_licence_manager() {
		return $this->licence_manager;
	}

	/**
	 * TODO: 1) Catch PHP events on the mothership, pass them on and let them be console.logged
	 * 		 2) Pass on caught output from the remote side, and get it console.logged
	 *
	 * @param  array $response
	 * @param  array $post_data
	 * @return array
	 */
	public function dashboard_ajaxaction_site_rpc($response, $post_data) {

		return $this->send_remote_command($post_data, false, $response);

	}

	/**
	 * Sends UpdraftCentral's command to the remote website
	 *
	 * @param array   $data 	  An array container the command to execute along with its command parameters
	 * @param boolean $force_save Optional. A flag that indicates whether UpdraftCentral will save and cache the response from the remote website
	 * @param array   $response   Optional. A response container that gets populated with the remote website's response from the current request
	 */
	public function send_remote_command($data, $force_save = false, $response = array()) {

		// Allow other components to intercept and deal with the command
		if (null !== ($response = apply_filters('updraftcentral_send_remote_command_shortcircuit', null, $this, $data, $response))) {
			return $response;
		}
	
		try {

			// Load site rpc
			if (!class_exists('UpdraftCentral_Remote_Communications')) include_once UD_CENTRAL_DIR.'/classes/class-siterpc.php';
			$site_rpc = new UpdraftCentral_Remote_Communications($this, $response, $data);

			if ($validate_result = $site_rpc->validate_input()) {
				// Send command to remote website.
				$response = $site_rpc->send_message($force_save);
			} else {
				// Return error from validation process
				$response = $validate_result;
			}

		} catch (Exception $e) {
			$response['responsetype'] = 'error';
			$response['message'] = $e->getMessage();
		}

		return $response;
	}

	public function deep_sanitize($input, $sanitize_function = 'htmlspecialchars') {
		if (is_string($input)) return call_user_func($sanitize_function, $input);
		if (is_array($input)) {
			foreach ($input as $k => $v) {
				$input[$k] = $this->deep_sanitize($v, $sanitize_function);
			}
		}

		return $input;
	}

	public function send_message($ud_rpc, $message, $data = null, $timeout = 30) {
		$this->php_events = array();

		// Override http timeout argument based from the user defined timeout
		$timeout = $this->get_user_defined_timeout($timeout);

		if ('__updraftcentral_internal_preencrypted' == $message) {

			$post_options = array(
				'timeout' => $timeout,
				'body' => $data,
			);

			$post_options = apply_filters('udrpc_post_options', $post_options, $message, $data, $timeout, $this);

			try {
				$post = $ud_rpc->http_post($post_options);
			} catch (Exception $e) {
				// Curl can return an error code 0, which causes WP_Error to return early, without recording the message. So, we prefix the code.
				return new WP_Error('http_post_'.$e->getCode(), $e->getMessage());
			}

			if (is_wp_error($post)) return $post;

			if (empty($post['response']) || empty($post['response']['code'])) return new WP_Error('empty_http_code', 'Unexpected HTTP response code');

			if ($post['response']['code'] < 200 || $post['response']['code'] >= 300) return new WP_Error('unexpected_http_code', 'Unexpected HTTP response code ('.$post['response']['code'].')', $post);

			if (empty($post['body'])) return new WP_Error('empty_response', 'Empty response from remote site');

			return (string) $post['body'];

		} else {
			$response = $ud_rpc->send_message($message, $data, $timeout);
		}

		// TODO: Handle caught_output
		
		if (is_array($response) && !empty($response['data']) && is_array($response['data']) && !empty($response['data']['php_events']) && !empty($response['data']['previous_data'])) {
		// global $updraftplus;
			$this->php_events = $response['data']['php_events'];
			if (defined('WP_DEBUG') && WP_DEBUG) {
				foreach ($response['data']['php_events'] as $logline) {
					error_log('From remote side: '.$logline);
				}
			}
			$response['data'] = $response['data']['previous_data'];
		}

		return $response;
	}

	public function dashboard_ajaxaction_sites_html($response) {
		$response['responsetype'] = 'ok';
		$response['sites_html'] = $this->get_sites_html();
		$response['status_info'] = array(
			'how_many_licences_in_use' => $this->licence_manager->how_many_licences_in_use(),
			'how_many_licences_available' => $this->licence_manager->how_many_licences_available(),
		);
		$response['message'] = __('The site list has been refreshed.', 'updraftcentral');

		return $response;
	}

	public function dashboard_ajaxaction_delete_site($response, $post_data) {
		if (isset($post_data['data']) && is_array($post_data['data']) && !empty($post_data['data']['site_id'])) {

			$deleted = $this->delete_site_by_id((int) $post_data['data']['site_id']);

			if (is_wp_error($deleted)) {
				$response = $deleted;
			} else {
				$response['responsetype'] = 'ok';
				$response['status_info'] = array(
					'how_many_licences_in_use' => $this->licence_manager->how_many_licences_in_use(),
					'how_many_licences_available' => $this->licence_manager->how_many_licences_available(),
				);
				$response['sites_html'] = $this->get_sites_html();
				$response['message'] = __('The site was successfully deleted from your dashboard.', 'updraftcentral');
			}

		} else {
			$response['responsetype'] = 'error';
			$response['code'] = 'missing_data';
			$response['message'] = __('Missing information', 'updraftcentral');
		}

		return $response;
	}

	public function dashboard_ajaxaction_edit_site_connection_method($response, $post_data) {

		if (isset($post_data['data']) && is_array($post_data['data']) && !empty($post_data['data']['site_id'])) {

			$site_id = (int) $post_data['data']['site_id'];

			$connection_method = isset($post_data['data']['connection_method']) ? (string) $post_data['data']['connection_method'] : 'direct_default_auth';

			$updated = $this->rc->wp_update('sites',
				array(
					'connection_method' => $connection_method,
				),
				array(
					'user_id' => $this->user_id,
					'site_id' => $site_id,
				),
				array(
					'%s',
				),
				array(
					'%d',
					'%d',
				)
			);

			if (is_numeric($updated)) {
				$response['responsetype'] = 'ok';

				$this->load_user_sites();
				$response['sites_html'] = $this->get_sites_html();
				$response['status_info'] = array(
					'how_many_licences_in_use' => $this->licence_manager->how_many_licences_in_use(),
					'how_many_licences_available' => $this->licence_manager->how_many_licences_available(),
				);

				$response['message'] = __('The site configuration was successfully edited.', 'updraftcentral');
			} else {
				$response = $updated;
			}

		} else {
			$response['responsetype'] = 'error';
			$response['code'] = 'missing_data';
			$response['message'] = __('Missing information', 'updraftcentral');
		}

		return $response;

	}

	public function dashboard_ajaxaction_edit_site_configuration($response, $post_data) {

		if (isset($post_data['data']) && is_array($post_data['data']) && !empty($post_data['data']['site_id']) && isset($post_data['data']['description'])) {

			$site_id = (int) $post_data['data']['site_id'];

			$connection_method = isset($post_data['data']['connection_method']) ? (string) $post_data['data']['connection_method'] : 'direct_default_auth';
			$send_cors_headers = (isset($post_data['data']['send_cors_headers']) && $post_data['data']['send_cors_headers']) ? 1 : 0;

			$updated = $this->rc->wp_update('sites',
				array(
					'description' => (string) $post_data['data']['description'],
					'connection_method' => $connection_method,
					'send_cors_headers' => $send_cors_headers,
				),
				array(
					'user_id' => $this->user_id,
					'site_id' => $site_id,
				),
				array(
					'%s',
					'%s',
					'%d',
				),
				array(
					'%d',
					'%d',
				)
			);

			if (is_numeric($updated)) {
				$response['responsetype'] = 'ok';

				$extra_site_info_unparsed = empty($post_data['data']['extra_site_info']) ? false : $post_data['data']['extra_site_info'];
				if (!$extra_site_info_unparsed) {
					$extra_site_info = array();
				} else {
					parse_str($extra_site_info_unparsed, $extra_site_info);
				}

				if (!empty($extra_site_info)) {
					foreach ($extra_site_info as $meta_key => $meta_value) {
						$this->rc->site_meta->update_site_meta($site_id, $meta_key, $meta_value);
					}
				}

				$this->load_user_sites();
				$response['sites_html'] = $this->get_sites_html();
				$response['status_info'] = array(
					'how_many_licences_in_use' => $this->licence_manager->how_many_licences_in_use(),
					'how_many_licences_available' => $this->licence_manager->how_many_licences_available(),
				);

				$response['message'] = __('The site configuration was successfully edited.', 'updraftcentral');
			} else {

				$response = $updated;
			}

		} else {
			$response['responsetype'] = 'error';
			$response['code'] = 'missing_data';
			$response['message'] = __('Missing information', 'updraftcentral');
		}

		return $response;
	}

	/**
	 * Imports user's settings
	 *
	 * @param array $response  Respose array to be filtered
	 * @param array $post_data The request data
	 * @return array
	 */
	public function dashboard_ajaxaction_import_settings($response, $post_data) {

		$posted_data = json_decode($post_data['data'], true);
		if (empty($posted_data)) {
			return;
		}

		try {

			$tmp_name = $_FILES['file']['tmp_name'];
			$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
			$errors = array();

			if (UPLOAD_ERR_OK == $_FILES['file']['error'] && is_uploaded_file($tmp_name)) {
				$content = json_decode(file_get_contents($tmp_name), true);
				if ('json' === $ext && $content) {
					$encrypted = false;

					// Check whether the imported file is encrypted or not by identifying
					// any encryption marks padded during the export process
					$version = base64_decode($content['version']);
					if (!empty($version)) {
						if (false !== strpos($version, ':')) $encrypted = true;
					}

					if ($encrypted) {
						if (!empty($posted_data['phrase'])) {
							$content = $this->decrypt_data($content, $posted_data['phrase']);
						} else {
							$errors[] = __('It appears that the imported file is encrypted. Please provide the phrase you used to encrypt the file and try again.', 'updraftcentral');
						}
					}

					if (isset($content['version'])) {
						if (version_compare($content['version'], $this->rc->export_settings_version, '>')) {
							$errors[] = sprintf(__('The imported file was created by a later version of UpdraftCentral (%s). Your current UpdraftCentral version is %s. Please upgrade your UpdraftCentral plugin and try again.', 'updraftcentral'), $content['updraftcentral_version'], $this->rc->version);
						}
					} else {
						$errors[] = $content;
					}

					if (empty($errors)) {
						global $wpdb;

						$site_meta = $this->rc->site_meta;
						if (!empty($content['sites'])) {
							foreach ($content['sites'] as $site) {
								// The "delete_site_by_url" is already called by the "add_site" function prior to inserting
								// a new site record, thus, we no longer have to explicitly call it here.
								$result = $this->add_site($site['url'], $site['admin_url'], $site['key_local_private'], $site['key_remote_public'], $site['remote_user_id'], $site['remote_user_login'], $site['key_name_indicator'], $site['remote_site_id'], $site['description'], $site['connection_method'], $site['send_cors_headers']);

								if (is_wp_error($result)) {
									$error_message = $result->get_error_message();

									// Making sure that the same error does not repeat twice or more.
									if (!in_array($error_message, $errors)) {
										$errors[] = $error_message;
									}
								} else {
									$site_id = $wpdb->insert_id;
									if (!empty($site['sitemeta']) && !empty($site_meta)) {
										$site_meta->delete_site_meta_by_site_id($site_id);

										foreach ($site['sitemeta'] as $meta) {
											$site_meta->add_site_meta($site_id, $meta['meta_key'], $meta['meta_value']);
										}
									}
								}
							}
						}

						if (!empty($content['usermeta'])) {
							$this->set_updraftcentral_usermeta($content['usermeta'], $this->user_id);
						}
					}
				} else {
					$errors[] = __('Invalid import file', 'updraftcentral');
				}
			} else {
				$errors[] = __('There appears to be a problem uploading the file. Please make sure that you have the right permission to upload files in this server.', 'updraftcentral');
			}

			$response['data'] = array(
				'errors' => $errors
			);

			$response['responsetype'] = 'ok';
			$response['code'] = 'import_settings';
			$response['message'] = 'success';
		} catch (Exception $e) {
			$response['responsetype'] = 'error';
			$response['code'] = 'import_failed';
			$response['message'] = $e->getMessage();
		}

		return $response;
	}

	/**
	 * Exports user's settings
	 *
	 * @param array $response  Respose array to be filtered
	 * @param array $post_data The request data
	 * @return array
	 */
	public function dashboard_ajaxaction_export_settings($response, $post_data) {

		$posted_data = $post_data['data'];
		if (empty($posted_data)) {
			return;
		}

		$uc_version = UpdraftCentral()->version;
		$user = wp_get_current_user();

		// Other keys might be added in the future (e.g. in new modules or future tasks), thus,
		// we're having the keys filterable here so that anyone can add their respective user meta keys
		// to be included during the export process.
		$uc_usermeta_keys = apply_filters('updraftcentral_usermeta_keys', array(
			'updraftcentral_modules_visibility',
			'updraftcentral_dashboard_shortcuts',
			'updraftcentral_dashboard_user_defined_timeout',
		));

		$data = array(
			'updraftcentral_version' => $uc_version,
			'user' => $user->display_name,
			'user_email' => $user->user_email,
			'site_name' => get_bloginfo('name'),
			'site_url' => get_bloginfo('url'),
			'date' => date('Y-m-d H:i:s'),
			'version' => $this->rc->export_settings_version,
			'sites' => $this->load_sites_for_export(),
			'usermeta' => $this->get_updraftcentral_usermeta($uc_usermeta_keys, $user->ID),
		);

		try {

			if (!empty($posted_data['phrase'])) {
				$data = $this->encrypt_data($data, $posted_data['phrase']);
			}

			$blog_name = sanitize_title(get_bloginfo('name'));
			$file_name = apply_filters('updraftcentral_export_file_name', 'updraftcentral-settings-'.$blog_name.'.json');

			$response['data'] = array(
				'json_data' => json_encode($data),
				'file_name' => $file_name,
			);

			$response['responsetype'] = 'ok';
			$response['code'] = 'export_settings';
			$response['message'] = 'success';
			return $response;
	
		} catch (Exception $e) {
			$response['responsetype'] = 'error';
			$response['code'] = 'export_failed';
			$response['message'] = $e->getMessage();

			return $response;
		}
	}

	/**
	 * Sets usermeta information in bulk based from an array of meta collection
	 *
	 * @param array   $usermetas A collection of user meta to add
	 * @param integer $user_id   The ID of the current user
	 * @return boolean
	 */
	private function set_updraftcentral_usermeta($usermetas, $user_id) {
		global $wpdb;

		if (empty($usermetas) || empty($user_id)) return false;

		$meta_keys = array_map(function($item) {
			if (false !== strpos($item['meta_key'], 'updraftcentral')) {
				return addslashes($item['meta_key']);
			}
		}, $usermetas);

		$items = array();

		if (!empty($meta_keys)) {
			$meta_keys = "'".implode("','", $meta_keys)."'";

			// Delete any existing usermeta found
			$wpdb->query($wpdb->prepare("DELETE FROM $wpdb->usermeta WHERE `user_id` = %d AND `meta_key` IN (".$meta_keys.")", $user_id));

			// Create/insert new usermeta based from the submitted information
			$user_id = get_current_user_id();
			foreach ($usermetas as $meta) {
				if (false !== strpos($meta['meta_key'], 'updraftcentral')) {
					$meta['user_id'] = $user_id;
					$result = $wpdb->insert($wpdb->usermeta, $meta);
					if ($result) {
						array_push($items, $wpdb->insert_id);
					}
				}
			}
		}

		return count($items) ? true : false;
	}

	/**
	 * Retrieves usermeta information based from an array of meta keys
	 *
	 * @param array   $keys    A collection of meta keys where the data is to be pulled from
	 * @param integer $user_id The ID of the current user
	 * @return array
	 */
	private function get_updraftcentral_usermeta($keys, $user_id) {
		global $wpdb;

		if (empty($keys) || empty($user_id)) return array();

		$meta_keys = "'".implode("','", $keys)."'";
		$metas = $wpdb->get_results($wpdb->prepare("SELECT `meta_key`, `meta_value` FROM $wpdb->usermeta WHERE `user_id` = %d AND `meta_key` IN (".$meta_keys.")", $user_id), ARRAY_A);
	
		if (!empty($metas)) {
			$metas = array_map('maybe_unserialize', $metas);
		}
	
		return $metas;
	}

	/**
	 * Encrypts data using an encryption or pass phrase
	 *
	 * @param array $data        The data to encrypt
	 * @param array $passphrase  A phrase to be used to encrypt the data into ciphertext
	 * @param array $result_data The resulting array that will contained the encrypted data
	 * @return array
	 */
	private function encrypt_data($data, $passphrase, &$result_data = array()) {
		if (!empty($data)) {
			foreach ($data as $key => $value) {
				if (is_object($value)) {
					// Here, we're converting the object into array before we proceed
					// with the rest of the process to cover all data as possible during encryption.
					//
					// N.B. We're using deep conversion using the two json functions (json_encode and json_decode)
					// rather than casting the object directly using (array) since we wanted to convert all
					// object instances found within the $value down to the lowest level.
					$value = json_decode(json_encode($value), true);
				}

				if (is_array($value)) {
					$result_data[$key] = array();
					$this->encrypt_data($value, $passphrase, $result_data[$key]);
				} else {
					$result_data[$key] = $this->encrypt_with_passphrase($value, $passphrase);
				}
			}
		}

		return $result_data;
	}

	/**
	 * Decrypts data using an encryption or pass phrase
	 *
	 * @param array $data        The data to decrypt
	 * @param array $passphrase  A phrase to be used to decrypt the data back into plaintext
	 * @param array $result_data The resulting array that will contained the decrypted data
	 * @return array
	 */
	private function decrypt_data($data, $passphrase, &$result_data = array()) {
		if (!empty($data)) {
			foreach ($data as $key => $value) {
				if (is_object($value)) {
					// Here, we're converting the object into array before we proceed
					// with the rest of the process to cover all data as possible during decryption.
					//
					// N.B. We're using deep conversion using the two json functions (json_encode and json_decode)
					// rather than casting the object directly using (array) since we wanted to convert all
					// object instances found within the $value down to the lowest level.
					$value = json_decode(json_encode($value), true);
				}

				if (is_array($value)) {
					$result_data[$key] = array();
					$this->decrypt_data($value, $passphrase, $result_data[$key]);
				} else {
					$decrypt_result = $this->decrypt_with_passphrase($value, $passphrase);
					if (!is_wp_error($decrypt_result)) {
						$result_data[$key] = $decrypt_result;
					} else {
						return $decrypt_result->get_error_message();
					}
				}
			}
		}

		return $result_data;
	}

	/**
	 * Make sure phpseclib classes are loaded
	 */
	public function load_crypto() {
		$pdir = UD_CENTRAL_DIR.'/vendor/phpseclib/phpseclib/phpseclib';
		if (false === strpos(get_include_path(), $pdir)) set_include_path($pdir.PATH_SEPARATOR.get_include_path());
		if (!class_exists('Crypt_Rijndael')) include_once 'Crypt/Rijndael.php';
		if (!class_exists('Crypt_RSA')) include_once 'Crypt/RSA.php';
		if (!class_exists('Crypt_Hash')) include_once 'Crypt/Hash.php';
	}
	
	/**
	 * Encrypts information using an encryption or pass phrase
	 *
	 * @param array $plaintext  The information to encrypt
	 * @param array $passphrase A phrase to be used to encrypt the data into ciphertext
	 * @return array
	 */
	public function encrypt_with_passphrase($plaintext, $passphrase) {

		$this->load_crypto();

		$crypto = new Crypt_Rijndael(CRYPT_MODE_CTR);
		$hmac = ':';
		if (!empty($passphrase)) {
			$crypto->setKey($passphrase);

			$hash = new Crypt_Hash('sha256');
			$hash->setKey($passphrase);
			$hmac = base64_encode($hash->hash($passphrase)).':';
		}

		$crypto_string = crypt_random_string($crypto->getBlockLength() >> 3);
		$crypto->setIV($crypto_string);
		$crypto->disablePadding();

		$encrypted = base64_encode($crypto_string).':'.base64_encode($crypto->encrypt($plaintext));

		// Here, we're keeping the actual boolean representation of the original data
		// making sure that "true" or "false" boolean value are not converted into
		// its numerical counterpart as "1" or "0" after decryption.
		$boolean_str = array('false', 'true');
		if (in_array(strtolower($plaintext), $boolean_str) || is_bool($plaintext)) {
			$encrypted .= ':bool'.(is_string($plaintext) ? '/s' : '/b');
		}
		return base64_encode($hmac.$encrypted);
	}

	/**
	 * Decrypts information using an encryption or pass phrase
	 *
	 * @param array $ciphertext The information to decrypt
	 * @param array $passphrase A phrase to be used to decrypt the data back into plaintext
	 * @return array
	 */
	public function decrypt_with_passphrase($ciphertext, $passphrase) {
		$this->load_crypto();

		$struct = explode(':', base64_decode($ciphertext));
		$hmac = $struct[0];
		$crypt_string = $struct[1];
		$ciphertext = $struct[2];
		$bool_flag = isset($struct[3]) ? $struct[3] : 0;

		$ciphertext = base64_decode($ciphertext);
		$crypt_string = base64_decode($crypt_string);

		$crypto = new Crypt_Rijndael(CRYPT_MODE_CTR);
		if (!empty($passphrase)) {
			$hash = new Crypt_Hash('sha256');
			$hash->setKey($passphrase);
			if (base64_decode($hmac) !== $hash->hash($passphrase)) {
				return new WP_Error('updraftcentral_unauthorized', __('You are not authorized to view this information. The encryption phrase needed to unlock this file is incorrect.', 'updraftcentral'));
			}

			$crypto->setKey($passphrase);
		}

		$crypto->setIV($crypt_string);
		$crypto->disablePadding();

		$plaintext = $crypto->decrypt($ciphertext);
		
		$boolean_arr = array('false', 'true');
		if (!empty($bool_flag) && in_array($bool_flag, array('bool/s', 'bool/b'))) {
			if (is_numeric($plaintext)) $plaintext = $boolean_arr[intval($plaintext)];
			if ('bool/b' === $bool_flag) $plaintext = filter_var($plaintext, FILTER_VALIDATE_BOOLEAN) ? true : false;
		}

		return $plaintext;
	}

	/**
	 * Loads all available sites along with their current sitemeta informations
	 * for the given user
	 *
	 * @return array
	 */
	private function load_sites_for_export() {
		global $wpdb;
		$list = $wpdb->get_results('SELECT * FROM `'.$this->sites_table.'` WHERE `user_id`='.absint($this->user_id));

		$sites = array();
		if (is_array($list) && !empty($list)) {
			foreach ($list as $site) {
				$sitemeta = $wpdb->get_results('SELECT `meta_key`, `meta_value` FROM `'.$this->sitemeta_table.'` WHERE `site_id`='.absint($site->site_id));

				$metas = array();
				if (is_array($sitemeta) && !empty($sitemeta)) {
					foreach ($sitemeta as $meta) {
						array_push($metas, (array) $meta);
					}
				}

				// Remove unwanted fields (we don't need this ID fields in the export file)
				unset($site->site_id);
				unset($site->user_id);

				$site->sitemeta = $metas;
				array_push($sites, (array) $site);
			}
		}

		return $sites;
	}

	/**
	 * Adds a new site to the user's sites collection
	 *
	 * @param array $response
	 * @param array $post_data
	 * @param bool  $render_sites - Controls whether to render the sites' HTML or not.
	 * @return array
	 */
	public function dashboard_ajaxaction_newsite($response, $post_data, $render_sites = true) {

		if (empty($post_data['data']) || !is_array($post_data['data']) || empty($post_data['data']['key'])) {
			$response['responsetype'] = 'error';
			$response['code'] = 'empty';
			$response['message'] = __('Please enter the site key.', 'updraftcentral');
		} else {

			$site_key = $post_data['data']['key'];

			$extra_site_info_unparsed = empty($post_data['data']['extra_site_info']) ? false : $post_data['data']['extra_site_info'];
			if (!$extra_site_info_unparsed) {
				$extra_site_info = array();
			} else {
				parse_str($extra_site_info_unparsed, $extra_site_info);
			}

			$ud_rpc = $this->rc->get_udrpc();

			// A bundle has these keys: key, name_indicator, url
			$decode_bundle = $ud_rpc->decode_portable_bundle($site_key, 'base64_with_count');

			if (!is_array($decode_bundle) || !empty($decode_bundle['code'])) {
				$response['responsetype'] = 'error';
				$response['message'] = __('Error:', 'updraftcentral');
				$response['code'] = empty($decode_bundle['code']) ? 'could_not_decode' : $decode_bundle['code'];
				if (!empty($decode_bundle['code']) && 'invalid_wrong_length' == $decode_bundle['code']) {
					$response['message'] .= ' '.__('The entered key was the wrong length - please try again.', 'updraftcentral');
				} elseif (!empty($decode_bundle['code']) && 'invalid_corrupt' == $decode_bundle['code']) {
					$response['message'] .= ' '.__('The entered key was corrupt - please try again.', 'updraftcentral').' ('.$decode_bundle['data'].')';
				} elseif (empty($decode_bundle['key']) || empty($decode_bundle['url']) || empty($decode_bundle['name_indicator'])) {
					$response['message'] .= ' '.__('The entered key was corrupt - please try again.', 'updraftcentral');
					$response['data'] = $decode_bundle;
				}
			} elseif (empty($decode_bundle['key']) || empty($decode_bundle['url']) || empty($decode_bundle['user_id'])) {
					$response['message'] = __('Error:', 'updraftcentral').' '.__('The entered key was corrupt - please try again.', 'updraftcentral');
					$response['code'] = 'corrupt_key';
					$response['data'] = $decode_bundle;
			} else {

				if (trailingslashit(network_site_url()) == $decode_bundle['url'] && !apply_filters('updraftcentral_allow_self_control', true)) {
					$response['responsetype'] = 'error';
					$response['code'] = 'this_site';
					$response['message'] = __('Error:', 'updraftcentral').' '.__('The entered key does not belong to a remote site (it belongs to this one).', 'updraftcentral');
				} elseif ($this->rc->url_looks_internal($decode_bundle['url']) && !$this->rc->url_looks_internal(site_url()) && !apply_filters('updraftcentral_allow_adding_internal_url', true, $decode_bundle['url'])) {
					// The default is to allow it, because as long as your browser is running on the same machine as the site is on, it can work.
					$response['responsetype'] = 'error';
					$response['code'] = 'cant_add_localhost';
					$response['message'] = __('Error:', 'updraftcentral').' '.__('The entered key belongs to a local development website - these cannot be controlled from this dashboard because it is not reachable from an external network.', 'updraftcentral');
				} else {
					// Was the key sent SSL to us directly?
					$key = $decode_bundle['key'];
					if (is_array($key) && !empty($key['key_hash']) && isset($key['key_id'])) {
						global $wpdb;
						// Allow them 3 hours to copy-and-paste their key
						$wpdb->query('DELETE FROM '.$wpdb->base_prefix.$this->rc->table_prefix.'site_temporary_keys WHERE created<='.(int) (time() - 10800));
						$key_info = $this->rc->wp_get_row('site_temporary_keys', $wpdb->prepare('key_id=%d', $key['key_id']));
						if (is_object($key_info) && !empty($key_info->key_local_private) && !empty($key_info->key_remote_public)) {
							$this->rc->wp_delete('site_temporary_keys', array('key_id' => $key['key_id']));
							$key_hash = hash('sha256', $key_info->key_remote_public);

							// @codingStandardsIgnoreLine
							if ((function_exists('hash_equals') && hash_equals($key_hash, $key['key_hash'])) || (!function_exists('hash_equals') && $key_hash === $key['key_hash'])) {
								$key_local_private = $key_info->key_local_private;
								$key_remote_public = $key_info->key_remote_public;
							} else {
								$response['responsetype'] = 'error';
								$response['code'] = 'wrong_hash';
								$response['message'] = __('Error:', 'updraftcentral').' '.apply_filters('updraftcentral_wrong_hash_message', __('This key could not be added, as it appears to be corrupt - please try again.', 'updraftcentral'));

								return $response;
							}
						} else {
							$response['responsetype'] = 'error';
							$response['code'] = 'no_key_found';
							$response['message'] = __('Error:', 'updraftcentral').' '.apply_filters('updraftcentral_no_key_found_message', __('This key could not be added - it may be too long since you generated it; please try again.', 'updraftcentral'));

							return $response;
						}

					} elseif (!empty($decode_bundle['mothership_firewalled'])) {

						// Need to do direct AJAX from the browser to the mothership to send our key
				
						$ud_rpc = $this->rc->get_udrpc('central_host.updraftplus.com');
						if (false != $ud_rpc->generate_new_keypair()) {
							$key_remote_public = $key;
							$key_local_private = $ud_rpc->get_key_local();
						} else {
							$response['responsetype'] = 'error';
							$response['code'] = 'keygen_error';
							$response['message'] = 'An error occurred when attempting to generate a new key-pair';

							return $response;
						}

					} else {
						$key_remote_public = $key;
						$key_local_private = false;
					}

					$remote_site_id = empty($decode_bundle['ms_id']) ? 0 : $decode_bundle['ms_id'];
					$description = isset($decode_bundle['site_title']) ? (string) $decode_bundle['site_title'] : '';

					$send_cors_headers = (isset($post_data['data']['send_cors_headers']) && !$post_data['data']['send_cors_headers']) ? 0 : 1;
					$connection_method = isset($post_data['data']['connection_method']) ? (string) $post_data['data']['connection_method'] : 'direct_default_auth';

					$site_url = $decode_bundle['url'];

					// Supply a default for legacy format keys that didn't include the admin URL
					$admin_url = empty($decode_bundle['admin_url']) ? trailingslashit($site_url).'wp-admin' : $decode_bundle['admin_url'];

					$added = $this->add_site($site_url, $admin_url, $key_local_private, $key_remote_public, $decode_bundle['user_id'], $decode_bundle['user_login'], $decode_bundle['name_indicator'], $remote_site_id, $description, $connection_method, $send_cors_headers);

					if (true === $added) {
						$response['responsetype'] = 'ok';

						global $wpdb;
						$new_site_id = $wpdb->insert_id;

						if (!empty($extra_site_info)) {
							if (!is_array($this->sites_meta)) $this->sites_meta = array();
							if (empty($this->sites_meta[$new_site_id])) $this->sites_meta[$new_site_id] = array();
							foreach ($extra_site_info as $meta_key => $meta_value) {
								if (!$meta_value) continue;
								// Don't bother to save the default value on the initial adding of the site
								if ('http_authentication_method' == $meta_key && 'basic' == $meta_value) continue;
								$result = $this->rc->site_meta->add_site_meta($new_site_id, $meta_key, $meta_value);
								if (false !== $result) {
									$created = apply_filters("get_site_metadata_created", false, $new_site_id, $meta_key);
									if (!$created) {
										// Fallback if in case we fail to retrieve the "created" value from
										// the site metadata table. But most likely, if the add_site_meta succeeded
										// then we would have a value for the $created variable.
										$created = time();
									}

									$meta = new stdClass();
									$meta->value = $meta_value;
									$meta->created = $created;

									// We update the in-memory copy because this is used by get_sites_html()
									$this->sites_meta[$new_site_id][$meta_key] = $meta;
								}
							}
						}

						if (!empty($new_site_id)) {
							if (isset($post_data['data']['tags'])) {
								do_action('updraftcentral_new_site_added', array('tags' => $post_data['data']['tags'], 'site_id' => $new_site_id));
							}
							$response['tags'] = apply_filters('updraftcentral_get_user_tags', []);
						}

						// Return the new HTML widget to the front end
						$response['sites_html'] = $render_sites ? $this->get_sites_html() : '';
						$response['status_info'] = array(
							'how_many_licences_in_use' => $this->licence_manager->how_many_licences_in_use(),
							'how_many_licences_available' => $this->licence_manager->how_many_licences_available(),
						);

						$response['message'] = __('The key was successfully added.', 'updraftcentral').' '.__('It is for interacting with the following site: ', 'updraftcentral').htmlspecialchars($decode_bundle['url']);

						if (!empty($decode_bundle['mothership_firewalled_callback_url'])) {
							$response['key_needs_sending'] = array(
								'site_id' => $new_site_id,
								'url' => $decode_bundle['mothership_firewalled_callback_url'],
								'updraft_key_index' => $decode_bundle['updraft_key_index'],
								'remote_public_key' => $ud_rpc->get_key_remote(),
							);
						}

					} else {
						$response['responsetype'] = 'error';
						$response['code'] = $added->get_error_code();
						$response['message'] = __('Error:', 'updraftcentral').' '.$added->get_error_message();
					}

				}
			}
		}

		return $response;
	}

	public function load_user_sites_filter($sites) {
		$how_many_licences_available = $this->licence_manager->how_many_licences_available();
		$how_many_licences_in_use = count($sites);

		if ($how_many_licences_available >= $how_many_licences_in_use || $how_many_licences_available < 0) return $sites;

		$log_message = sprintf(__('You have more sites being managed (%d) than active licences (%d) - you will need to obtain more licences in order to manage all of your managed sites.', 'updraftcentral'), $how_many_licences_in_use, $how_many_licences_available);

		$this->rc->log_notice($log_message, 'error', 'not_enough_licences');

		$i = 0;
		foreach ($sites as $site_id => $site) {
			if ($i >= $how_many_licences_available) {
				$site->unlicensed = true;
				$sites[$site_id] = $site;
			}
			++$i;
		}

		return $sites;
	}

	/**
	 * Populate $this->sites and $this->sites_meta in accordance with the current user ($this->user_id)
	 *
	 * @return Array|WP_Error - either the same list of sites as will be in $this->sites, or a WP_Error if something went wrong
	 */
	public function load_user_sites() {
		global $wpdb;
		$sites = $wpdb->get_results('SELECT * FROM '.$this->sites_table.' WHERE user_id='.absint($this->user_id));

		$this->sites_meta = array();
		
		$subsequent_site = false;
		if (is_array($sites) && !empty($sites)) {
			$sites_meta_sql = 'SELECT * FROM '.$this->sitemeta_table.' WHERE site_id IN (';
			foreach ($sites as $site) {
				if ($subsequent_site) {
					$sites_meta_sql .= ',';
				} else {
					$subsequent_site = true;
				}
				$sites_meta_sql .= absint($site->site_id);
			}
			$sites_meta_sql .= ')';
			$sites_meta = $wpdb->get_results($sites_meta_sql, ARRAY_A);

			if (!empty($sites_meta)) {
				$sites_meta = array_map(array(UpdraftCentral(), 'maybe_json_decode'), $sites_meta);
			}
		} else {
			$sites_meta = array();
		}
		
		if (is_array($sites_meta)) {
			foreach ($sites_meta as $meta_row) {
				if (isset($meta_row['site_id'])) {
					// N.B. Since we're trying to include the 'created' column in the site metadata when loaded or pulled from
					// the database, therefore, we assign an anonymous object to encapsulate the value of the current meta_key along with
					// its created column.

					$meta = new stdClass();
					$meta->value = $meta_row['meta_value'];
					$meta->created = $meta_row['created'];

					$this->sites_meta[$meta_row['site_id']][$meta_row['meta_key']] = $meta;
				}
			}
		}

		if (is_array($sites)) {
		
			$processed_sites = array();
			foreach ($sites as $site) {
				$processed_sites[$site->site_id] = $site;
			}
			$this->sites = apply_filters('updraftcentral_load_user_sites', $processed_sites, $this, $this->licence_manager);

			return $this->sites;
			
		} elseif (is_wp_error($sites)) {
		
			$this->rc->log_notice($sites);
			$this->sites = null;

			return $sites;
		}
	}

	/**
	 * Get the HTML to render the site list in the dashboard
	 *
	 * @return String
	 */
	public function get_sites_html() {

		$ret = '';

		// Get sites. Print a line for each of them.
		if (empty($this->sites) || !is_array($this->sites)) {
			$ret .= $this->rc->include_template('sites/none-set-up.php', true, array('common_urls' => $this->rc->get_common_urls()));
		} else {

			// retrieve metadata if any exists
			$user_id = $this->user_id;

			// ensure we have an array (in even of no metadata)

			if (!$site_order_meta = get_user_meta($user_id, 'updraftcentral_dashboard_site_order', true)) {
				$site_order_meta = array();
			}

			// Add existing sites if not in siteOrderMeta (i.e. any new added sites or handling no meta data)

			foreach ($this->sites as $site) {
				if (!in_array($site->site_id, $site_order_meta)) {
					array_push($site_order_meta, $site->site_id);
				}
			}

			// Render the site rows in site_order_meta sequence using site_id to reference sites object

			foreach ($site_order_meta as $site_id_meta) {

				// Ignore invalid or removed sites

				if (!empty($this->sites[$site_id_meta])) {

					$connection_method = isset($this->sites[$site_id_meta]->connection_method) ? (string) $this->sites[$site_id_meta]->connection_method : 'direct_default_auth';
					$send_cors_headers = (isset($this->sites[$site_id_meta]->send_cors_headers) && !$this->sites[$site_id_meta]->send_cors_headers) ? 0 : 1;

					$site_data_attributes = 'data-site_url="' . esc_attr($this->sites[$site_id_meta]->url) . '" data-site_id="' . (int) $site_id_meta . '" data-key_name_indicator="' . esc_attr($this->sites[$site_id_meta]->key_name_indicator) . '" data-site_description="' . (($this->sites[$site_id_meta]->description) ? esc_attr($this->sites[$site_id_meta]->description) : esc_attr($this->sites[$site_id_meta]->url)) . '" data-remote_user_id="' . (int) $this->sites[$site_id_meta]->remote_user_id . '" data-remote_user_login="' . esc_attr($this->sites[$site_id_meta]->remote_user_login) . '"';

					if (empty($this->sites[$site_id_meta]->admin_url)) {
						$admin_url = trailingslashit($this->sites[$site_id_meta]->url) . 'wp-admin';
					} else {
						$admin_url = $this->sites[$site_id_meta]->admin_url;
					}
					$site_data_attributes .= ' data-admin_url="' . esc_attr($admin_url) . '"';

					$site_meta = empty($this->sites_meta[$site_id_meta]) ? array() : $this->sites_meta[$site_id_meta];
					if (!empty($site_meta)) {
						if (!empty($site_meta['http_username']->value)) {
							$http_password = empty($site_meta['http_password']->value) ? '' : $site_meta['http_password']->value;
							$site_data_attributes .= ' data-http_username="' . esc_attr($site_meta['http_username']->value) . '" data-http_password="' . esc_attr($http_password) . '"';
							if (!empty($site_meta['http_authentication_method']->value)) $site_data_attributes .= ' data-http_authentication_method="' . $site_meta['http_authentication_method']->value . '"';
						}
					}

					if (empty($this->sites[$site_id_meta]->unlicensed)) {
						if ('via_mothership_encrypting' != $connection_method) {
							$site_data_attributes .= ' data-site_remote_public_key="' . esc_attr($this->sites[$site_id_meta]->key_remote_public) . '" data-site_local_private_key="' . esc_attr($this->sites[$site_id_meta]->key_local_private) . '"';
						}
					} else {
						$site_data_attributes .= ' data-site_unlicensed="1"';
					}

					$site_data_attributes .= ' data-connection_method="' . esc_attr($connection_method) . '" data-send_cors_headers="' . $send_cors_headers . '"';

					// Check whether this site was tagged as suspended
					$tagged = $this->get_site_tags($site_id_meta, 'Suspended');
					$suspended = !empty($tagged);

					$site_data_attributes = apply_filters('updraftcentral_site_data_attributes', $site_data_attributes, $this->sites[$site_id_meta]);
					$site_alert_icon = apply_filters('updraftcentral_site_alert_icon', '', $site_id_meta);
					$available_updates = $this->get_updates_count_from_cache($site_id_meta);
					
					$ret .= $this->rc->include_template('sites/site-row.php', true, array('site' => $this->sites[$site_id_meta], 'site_meta' => $site_meta, 'site_data_attributes' => $site_data_attributes, 'suspended' => $suspended, 'site_alert_icon' => $site_alert_icon, 'available_updates' => $available_updates));
				}
			}
		}

		return $ret;
	}

	/**
	 * Returns false if not authorised at all; or a timestamp if it's authorised until a particular date
	 *
	 * @param  int $site_id [description]
	 * @return boolean|integer
	 */
	public function authorised_for_site_until($site_id) {

		if (!is_array($this->sites)) $this->load_user_sites();

		if (is_array($this->sites)) {
			foreach ($this->sites as $site) {
				if ((int) $site_id == (int) $site->site_id && isset($site->licence_until)) {
					return apply_filters('updraftcentral_authorised_for_site_until', (int) $site->licence_until, $site_id, $this->sites);
				}
			}
		}

		return apply_filters('updraftcentral_authorised_for_site_until', false, $site_id, $this->sites);

	}

	/**
	 * Adding a site
	 *
	 * @param  string  $url
	 * @param  string  $admin_url
	 * @param  string  $key_local_private
	 * @param  string  $key_remote_public
	 * @param  integer $remote_user_id
	 * @param  string  $remote_user_login
	 * @param  string  $key_name_indicator
	 * @param  integer $remote_site_id
	 * @param  string  $description
	 * @param  string  $connection_method
	 * @param  Boolean $send_cors_headers
	 * @return Boolean|WP_Error - if a Boolean, then it will be true
	 */
	public function add_site($url, $admin_url, $key_local_private, $key_remote_public, $remote_user_id, $remote_user_login, $key_name_indicator, $remote_site_id = 0, $description = '', $connection_method = 'direct_default_auth', $send_cors_headers = 1) {

		if (!$this->user_can('add_site')) return new WP_Error('permission_denied', __('You do not have the permission to do this.', 'updraftcentral'), $this->user_id);

		if (!$this->licence_manager->is_slot_available(array('url' => $url))) {
			return new WP_Error('no_licences_available', apply_filters('updraftcentral_no_licences_available_message', __('You have no licences available - to add a site, you will need to obtain some more.', 'updraftcentral')));
		}

		$this->delete_site_by_url($url);

		$added = $this->rc->wp_insert('sites',
			array(
				'user_id' => $this->user_id,
				'url' => $url,
				'admin_url' => $admin_url,
				'key_local_private' => $key_local_private,
				'key_remote_public' => $key_remote_public,
				'description' => $description,
				'connection_method' => $connection_method,
				'send_cors_headers' => $send_cors_headers,
				'sequence_id' => 0,
				'remote_user_id' => $remote_user_id,
				'remote_user_login' => $remote_user_login,
				'remote_site_id' => $remote_site_id,
				'key_name_indicator' => $key_name_indicator,
			),
			array(
				'%d',
				'%s',
				'%s',
				'%s',
				'%s',
				'%s',
				'%s',
				'%d',
				'%d',
				'%d',
				'%s',
				'%d',
				'%s',
			)
		);

		if (is_numeric($added)) {
			$result = true;
		} else {
			$result = $added;
		}

		$this->load_user_sites();

		return $result;

	}

	/**
	 * Delete all site meta for a specified site
	 *
	 * @param Integer $site_id - the site ID
	 *
	 * @uses UpdraftCentral::wp_delete()
	 *
	 * @return Integer|WP_Error - the number of rows deleted, or a WP_Error object
	 */
	public function delete_site_meta($site_id) {
		return $this->rc->wp_delete('sitemeta', array('site_id' => $site_id));
	}

	/**
	 * Delete all sites for the user
	 */
	public function delete_all_sites() {
	
		if (!is_array($this->sites)) return;
	
		$counter = 1;
	
		foreach ($this->sites as $site_id => $site) {
			$reload_user_sites = ($counter >= $this->sites);
			$this->delete_site_by_id($site_id, $reload_user_sites);
			$counter ++;
		}
	
	}
	
	public function delete_site_by_id($site_id, $reload_user_sites = true) {
		$result = $this->rc->wp_delete('sites', array('user_id' => $this->user_id, 'site_id' => $site_id));
		$this->delete_site_meta($site_id);
		if ($reload_user_sites) $this->load_user_sites();

		return $result;
	}

	public function delete_site_by_url($url) {

		// We used to do a direct delete... but we need the site ID in order to be able to wipe the site meta
		// $result = $this->rc->wp_delete('sites', array('user_id' => $this->user_id, 'url' => $url));

		$result = 0;

		foreach ($this->sites as $site_id => $site) {
			if (strtolower($url) == strtolower($site->url)) {
				$result += $this->delete_site_by_id($site_id, false);
			}
		}

		$this->load_user_sites();

		return $result;
	}

	/**
	 * This just gives some potential for the future, currently - currently, there's nothing we're forbidding through this mechanism
	 *
	 * @param  string $do_what
	 * @return Boolean
	 */
	public function user_can($do_what) {
		$result = false;
		
		$old_user_id = get_current_user_id();
		if ($old_user_id != $this->user_id) wp_set_current_user($this->user_id);
		
		$is_admin = apply_filters('updraftcentral_user_can_is_admin', current_user_can('manage_options'), $this);
		
		if ($old_user_id != $this->user_id) wp_set_current_user($old_user_id);
		
		switch ($do_what) {
			case 'add_site':
				$result = $is_admin;
				break;
			case 'delete_site':
				$result = $is_admin;
				break;
		}

		return apply_filters('updraftcentral_user_can', $result, $do_what, $this);
	}

	/**
	 * Gets list of loaded modules by hooking into `updraftcentral_main_navigation_items` filter
	 * and sets each available module's visibility as user_meta if not already set.
	 *
	 * @param  array $loaded_modules An array of loaded modules
	 * @return array An array of loaded modules
	 */
	public function main_navigation_items($loaded_modules) {

		if ('' === get_user_meta($this->user_id, 'updraftcentral_modules_visibility', true)) {
			$updraftcentral_modules_visibility = array();
			foreach ($loaded_modules as $id => $item) {
				if ('sites' !== $id) {
					$updraftcentral_modules_visibility[$id] = true;
				}
			}
			// @codingStandardsIgnoreLine
			add_user_meta($this->user_id, 'updraftcentral_modules_visibility', $updraftcentral_modules_visibility, true);
		}

		return $loaded_modules;
	}

	/**
	 * Handles module visibility status when it is changed in frontend.
	 *
	 * It fires when ajax call is made with `module_visibility` action.
	 * Hooks into `updraftcentral_dashboard_ajaxaction_module_visibility` filter.
	 * Receives module_id and its visibility and updates module's visibility status in
	 * database as user_meta and returns the result of ajax call
	 *
	 * @param  array $response  An array to be returned to ajax call
	 * @param  array $post_data An array of data from ajax call
	 * @return array An array of data contains result of ajax call
	 */
	public function dashboard_ajaxaction_module_visibility($response, $post_data) {

		if (empty($post_data['data']) || !is_array($post_data['data'])) {
			$response['responsetype'] = 'error';
			$response['code'] = 'empty';
			$response['message'] = __('There was a error, please try again.', 'updraftcentral');
		} else {
			$module_id = $post_data['data']['module_id'];
			$visibility = $post_data['data']['visibility'];
			$updraftcentral_modules_visibility = get_user_meta($this->user_id, 'updraftcentral_modules_visibility', true);
			if ("true" === $visibility) {
				$updraftcentral_modules_visibility[$module_id] = true;
			} else {
				$updraftcentral_modules_visibility[$module_id] = false;
			}
			update_user_meta($this->user_id, 'updraftcentral_modules_visibility', $updraftcentral_modules_visibility);

			$response['responsetype'] = 'ok';
			$response['message'] = __('Visibility changed successfully', 'updraftcentral');
		}

		$response['data'] = $post_data;

		return $response;
	}

	/**
	 * Resets all modules visibility status.
	 *
	 * It fires when ajax call is made with `reset_modules_visibility` action.
	 * Hooks into `updraftcentral_dashboard_ajaxaction_reset_modules_visibility` filter.
	 * Updates every module's visibility status in
	 * database as user_meta and returns the result of ajax call
	 *
	 * @param  array $response  An array to be returned to ajax call
	 * @param  array $post_data An array of data from ajax call
	 * @return array An array of data contains result of ajax call
	 */
	public function dashboard_ajaxaction_reset_modules_visibility($response, $post_data) {
		if (empty($post_data['data']) || 'all' !== $post_data['data']) {
			$response['responsetype'] = 'error';
			$response['code'] = 'empty';
			$response['message'] = __('There was a error, please try again.' . $post_data['data'], 'updraftcentral');
		} else {
			$updraftcentral_modules_visibility = get_user_meta($this->user_id, 'updraftcentral_modules_visibility', true);
			foreach ($updraftcentral_modules_visibility as $module_id => $visibility) {
				$updraftcentral_modules_visibility[$module_id] = true;
			}
			update_user_meta($this->user_id, 'updraftcentral_modules_visibility', $updraftcentral_modules_visibility);
			$response['responsetype'] = 'ok';
			$response['message'] = __('Visibility changed successfully', 'updraftcentral');
		}
		$response['data'] = $post_data;
		return $response;
	}
}

endif;
