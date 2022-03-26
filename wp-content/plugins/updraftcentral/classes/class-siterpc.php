<?php

if (!class_exists('UpdraftCentral_Remote_Communications')) :

/**
 * This class dispatches command(s) to the remote website
 *
 * Pre-validates submitted data, sends command and processes
 * the response received. Also responsible for caching result data
 * whenever applicable, and can pull cached data whether or not having
 * a maximum age (in seconds).
 */
class UpdraftCentral_Remote_Communications {

	private $is_preencrypted;

	private $command;

	private $rc;

	private $user;

	private $data;

	private $site_id;

	private $site;

	private $ud_rpc;

	private $site_meta;

	private $admin_url;

	private $errors;

	private $response;

	private $table_prefix;

	/**
	 * UpdraftCentral_Remote_Communications constructor.
	 *
	 * Does initial checks, pre-load certain properties needed to communicate to the remote website
	 * and loads an error collection needed when returning errors to the caller.
	 *
	 * @param object $user      An UpdraftCentral_User instance
	 * @param array  $response  An initial response array
	 * @param array  $post_data Request data for processing
	 * @return self
	 */
	public function __construct($user, $response, $post_data) {
		if (!is_a($user, 'UpdraftCentral_User')) {
			throw new Exception('Unexpected parameter. Argument to UpdraftCentral_Remote_Communications needs to be of type UpdraftCentral_User.');
		}

		$this->rc = UpdraftCentral();
		$this->user = $user;
		$this->data = $post_data;
		$this->response = $response;

		$this->is_preencrypted = !empty($post_data['site_rpc_preencrypted']);
		$this->site_id = (int) $post_data['site_id'];
		$this->site = $user->sites[$this->site_id];
		$this->ud_rpc = $this->rc->get_udrpc($this->site->key_name_indicator);
		$this->table_prefix = defined('UPDRAFTCENTRAL_TABLE_PREFIX') ? UPDRAFTCENTRAL_TABLE_PREFIX : 'updraftcentral_';

		$this->site_meta = empty($user->sites_meta[$this->site->site_id]) ? array() : $user->sites_meta[$this->site->site_id];
		$this->admin_url = empty($this->site->admin_url) ? $this->site->url : untrailingslashit($this->site->admin_url).'/admin-ajax.php';
		if (preg_match('#/admin-ajax.php$#', $this->admin_url)) {
			// wp-admin/admin-ajax.php before WP 3.5 will die() if $_REQUEST['action'] is not set (3.2) or is empty (3.4). Later WP versions also check that, but after (instead of before) wp-load.php, which is where we are ultimately hooked in.
			$this->admin_url .= '?action=updraft_central';
		}

		$this->ud_rpc->set_destination_url($this->admin_url);
		$this->load_errors();
	}

	/**
	 * Loads required objects if they're currently not available for the
	 * current request/process.
	 *
	 * @internal
	 */
	private function maybe_load_objects() {
		// We'll make sure that we don't have an empty site_meta instance or
		// any object needed by the process.
		if (empty($this->rc)) {
			$this->rc = UpdraftCentral();
		}

		if (empty($this->rc->site_meta)) {
			if (!class_exists('UpdraftCentral_Site_Meta')) include_once UD_CENTRAL_DIR.'/classes/site-meta.php';
			$this->rc->site_meta = new UpdraftCentral_Site_Meta($this->table_prefix);
		}
	}

	/**
	 * Loads error collection that will be referenced when
	 * returning specific error code for a failed process.
	 *
	 * @internal
	 */
	private function load_errors() {
		$errors = array(
			'generic_error' => __('An error has occurred while processing your request.', 'updraftcentral'),
			'missing_data' => __('Missing information', 'updraftcentral'),
			'nonexistent_site' => sprintf(__('This site (%d / %d) was not found', 'updraftcentral'), $this->user->user_id, $this->site_id),
			'nonexistent_site_key' => sprintf(__('The key for this site (%d / %d) was not found', 'updraftcentral'), $this->user->user_id, $this->site_id),
			'site_unlicensed' => apply_filters('updraftcentral_site_unlicensed_message', __('You have more sites in your dashboard than licences. As a result, you cannot perform actions on this site.', 'updraftcentral').' '.__('You will need to obtain more licences, or remove some sites.', 'updraftcentral')),
			'cannot_contact_localdev' => __('You cannot contact a website hosted on a site-local network (e.g. localhost) from this dashboard - it cannot be reached.', 'updraftcentral'),
			'no_digest_before_php54' => sprintf(__('To use HTTP digest authentication, your server running the UpdraftCentral dashboard needs at least PHP %s (your version is %s)', 'updraftcentral'), '5.4', PHP_VERSION),
			'incompatible_udrpc_php' => sprintf(__('The loaded UDRPC library (%s) is too old - you probably need to update your installed UpdraftPlus on the server', 'updraftcentral'), $this->ud_rpc->version),
		);

		$this->errors = $errors;
	}

	/**
	 * Pulls information regarding the error
	 *
	 * @internal
	 * @param  string $code A unique error code that is used to pull the error information
	 * @return array - Returns the error information for a specific error key/code
	 */
	private function return_error($code) {
		$response = array(
			'responsetype' => 'error',
			'code' => $code,
			'message' => isset($this->errors[$code]) ? $this->errors[$code] : $this->errors['generic_error']
		);

		return $response;
	}

	/**
	 * Validates if the cached data is still acceptable based from
	 * the maximum age required
	 *
	 * @internal
	 * @param string $created 	  The time (number of seconds) when the data was cached/stored in DB
	 * @param int    $maximum_age The maximum age (in seconds) to consider the cached data is still acceptable for consumption
	 * @return boolean - True if cached data is within the maximum age required, False otherwise
	 */
	private function check_data_validity($created, $maximum_age) {
		return (time() - (int) $created) <= $maximum_age;
	}

	/**
	 * Cache the response received from the remote website
	 *
	 * @internal
	 * @param array  $response The response array that contains the result of the command that was sent to the remote website
	 * @param string $meta_key A unique string that serves as an identifier for the cached data
	 * @return boolean - True if data was successfully cached, False otherwise
	 */
	private function cache_response($response, $meta_key) {
		if (!empty($response)) {
			// Check to see if we have an existing meta for data caching. If so, update the
			// cached data with the current response, otherwise we'll create a new entry in DB.
			$check = $this->rc->site_meta->get_site_meta($this->site_id, $meta_key, true);

			if (!empty($check)) {
				$result = $this->rc->site_meta->update_site_meta($this->site_id, $meta_key, $response);
			} else {
				$result = $this->rc->site_meta->add_site_meta($this->site_id, $meta_key, $response);
			}

			if (false !== $result) return true;
		}

		return false;
	}

	/**
	 * Pulls the cached/stored data either from the in-memory data loaded
	 * by the UpdraftCentral_User or from DB
	 *
	 * @internal
	 * @param string $meta_key    A unique string that serves as an identifier for the cached data
	 * @param int    $maximum_age The maximum age (in seconds) to consider the cached data is still acceptable for consumption
	 * @return mixed - Returns the stored data if successful, False otherwise
	 */
	private function get_cached_data($meta_key, $maximum_age) {

		$maximum_age = empty($maximum_age) ? false : (int) $maximum_age;
		if ($maximum_age) {
			// Check in-memory data first (loaded under UpdraftCentral_User->load_user_sites()) before checking the DB
			if (!empty($this->user->sites_meta[$this->site_id]) && isset($this->user->sites_meta[$this->site_id][$meta_key])) {
				$loaded_data = $this->user->sites_meta[$this->site_id][$meta_key];
				if ($this->check_data_validity($loaded_data->created, $maximum_age)) {
					return $loaded_data->value;
				}
			}

			// Anything can happen from the time the sites meta were loaded during UDC page load.
			// Due to ajax requests it can be populated along the way, thus, if the above in-memory check
			// fails we'll proceed in checking the DB.
			$stored_data = $this->rc->site_meta->updraftcentral_get_site_metadata(null, $this->site_id, $meta_key, true, $maximum_age);
			if (!empty($stored_data)) {
				return $stored_data;
			}
		}

		return false;
	}

	/**
	 * Cache response whenever applicable
	 *
	 * @internal
	 * @param  string  $command    The command to execute
	 * @param  array   $response   The response array that contains the result of the command that was sent to the remote website
	 * @param  string  $meta_key   A unique string that serves as an identifier for the cached data
	 * @param  boolean $force_save Optional. A flag to indicate whether we need to force the saving of the response from the remote website
	 * @return array - The original response array
	 */
	private function maybe_cache_response($command, $response, $meta_key, $force_save = false) {
		// We're only saving the response to DB if $reply is not an instance
		// of WP_Error class and command is currently not empty.
		$reply = isset($response['reply']) ? $response['reply'] : $response;

		if (!is_wp_error($reply) && !empty($command)) {
			$remote_response = isset($reply['response']) ? $reply['response'] : null;

			// Caching is only applicable to non-preencrypted data.
			if (!$this->is_preencrypted && !empty($remote_response) && 'rpcerror' !== $remote_response) {

				if ($force_save) {
					// If $force_save is true then we're forced to save the response to DB. Most likely, this is
					// set(required) from a CRON process where the results are force to be saved into DB.
					$this->cache_response($response, $meta_key);
				} else {
					// Here, we're only storing/caching the response when needed, as not all commands
					// requires caching. Add an 'updraftcentral_cache_commands' filter the UDC module if you wish to cache
					// any specific commands.
					$commands = apply_filters('updraftcentral_cache_commands', array());
					if (in_array($command, $commands) && !empty($meta_key)) {
						$this->cache_response($response, $meta_key);
					}
				}

			}
		}

		return $response;
	}

	/**
	 * Do a post check of the result/response of the currently executed command
	 *
	 * @param  array $result The result of the command that was sent to the remote website
	 * @return array - The request's response
	 */
	private function response_post_check($result) {

		$caught_output = $result['caught_output'];
		$reply = $result['reply'];
		$response = $this->response;

		// Pass on PHP events from the remote side
		if (!empty($response['data']['php_events'])) $response['php_events'] = $response['data']['php_events'];
		if (!empty($caught_output)) $response['mothership_caught_output'] = $caught_output;
		if (is_wp_error($reply)) {
			$response['responsetype'] = 'error';
			$response['message'] = $reply->get_error_message();
			$response['code'] = $reply->get_error_code();
			$response['data'] = $reply->get_error_data();
		} elseif (is_array($reply) && !empty($reply['response']) && 'error' == $reply['response']) {
			$response['responsetype'] = 'error';
			$response['message'] = empty($reply['message']) ? __('The connection to the remote site returned an error', 'updraftcentral') : $reply['message'];
			$response['data'] = $reply;
		} elseif ((!$this->is_preencrypted && (!is_array($reply) || empty($reply['response']) || (('ping' == $this->command && 'pong' != $reply['response'])) && 'rpcok' != $reply['response'])) || ($this->is_preencrypted && null === ($decoded_reply = json_decode($reply, true)) && (false == ($found_at = strpos($reply, '{"format":')) || null === ($decoded_reply = json_decode(substr($reply, $found_at), true))))) {
			// If it is pre-encrypted, we expect a field 'udrpc_message' in the reply (after it's been JSON-decoded). We could check that. But instead, we just pass it back to the browser, since it'll be checked there anyway.
			$response['responsetype'] = 'error';
			$response['message'] = __('There was an error in contacting the remote site.', 'updraftcentral').' '.__("You should check that the remote site is online, is not firewalled, has remote control enabled, and that no security module is blocking the access. Then, check the logs on the remote site and your browser's JavaScript console.", 'updraftcentral').' '.__('If none of that helps, then you should try re-adding the site with a fresh key.', 'updraftcentral');
			$response['data'] = $reply;
			$response['code'] = 'no_pong';
		} else {
			$response['responsetype'] = 'ok';
			$response['message'] = __('The site was connected to, and returned a response', 'updraftcentral');
			if ($this->is_preencrypted) {
				$response['wrapped_response'] = $decoded_reply;
			} elseif ('siteinfo' == $this->command) {
				$response['rpc_response'] = $this->user->deep_sanitize($reply);
			} else {
				$response['rpc_response'] = $reply;
			}
		}

		return $response;
	}

	/**
	 * Generates a unique key out from the site id, command and data parameters to
	 * be used as a meta key when saving the data to the DB.
	 *
	 * @param string $command The current command to execute
	 * @param array  $data    An array containing the command parameters
	 * @return string - The generated key
	 */
	public function generate_meta_key($command, $data) {
		// The "maximum_age" info was purposely injected to aide in checking
		// the freshness of data. Since this is not part of the original data parameter
		// that is submitted alongside the command therefore, we remove it when generating a meta key.

		if (isset($data['commands'])) {
			// For multiplexed command, we run through each registered commands and remove the field
			foreach ($data['commands'] as $key => $value) {
				if (isset($value['maximum_age'])) unset($data['commands'][$key]['maximum_age']);
			}

			$data = $data['commands'];
		} else {
			if (isset($data['maximum_age'])) unset($data['maximum_age']);
		}

		return $this->user->generate_cache_key($this->site_id, $command, $data);
	}

	/**
	 * Retrieves a previously stored (cached) response from the remote site for the given command if
	 * available and that the maximum age of the data has not been reached or expired.
	 *
	 * @param string $command The current command to execute
	 * @param array  $data    An array containing the command parameters
	 * @return array
	 */
	private function retrieve_cached_data($command, $data) {
		// Default: 10 minutes (600 seconds) if UPDRAFTCENTRAL_DATA_MAXIMUM_AGE is not defined
		//
		// N.B. The maximum_age should be found attached to the "data" parameter if the developer
		// wishes to have a specific maximum age (freshness of data) for the current command, otherwise
		// the default_maximum_age will be used.
		$default_maximum_age = (defined('UPDRAFTCENTRAL_DATA_MAXIMUM_AGE')) ? UPDRAFTCENTRAL_DATA_MAXIMUM_AGE : 600;

		// Generate a key for this command and its underlying data (command parameters) to be use for
		// saving and retrieving the response to/from the DB.
		$key = $this->generate_meta_key($command, $data);
		$maximum_age = isset($data['maximum_age']) ? $data['maximum_age'] : $default_maximum_age;

		// Retrieves and return the cached data using the "$key" as "meta_key" field in the "sites_meta" table if available
		// and the maximum_age has not been reached.
		$cached_data = $this->get_cached_data($key, $maximum_age);

		$result = array();
		if (!empty($cached_data)) {
			$result = $this->response_post_check($cached_data);
		}

		// The generated key will serve as a reference for saving and retrieving the stored/cached value
		// from the "sites_meta" table in DB. The key is composed of the currently requested or executed command
		// (e.g. 'updates.get_updates') along with its submitted data that serves as parameters to the
		// command (e.g. array('force_refresh' => false)).
		return array(
			'key' => $key,
			'data' => $result
		);
	}

	/**
	 * Sends command to the remote website and processes the response
	 *
	 * @param  boolean $force_save Optional. A flag to indicate whether we need to force the saving of the response from the remote website
	 * @return array - The response array that contains the result of the currently processed command
	 */
	public function send_message($force_save = false) {

		$this->command = isset($this->data['data']['command']) ? (string) $this->data['data']['command'] : '';
		$is_multiplexed = ('core.execute_commands' === $this->command) ? true : false;

		$data = isset($this->data['data']['data']) ? $this->data['data']['data'] : null;
		if ($this->is_preencrypted) $data = $this->data['wrapped_message'];

		$cached_data = array();
		$computed_meta_key = '';

		if (!empty($data)) {
			// Possibly load required objects for this process if not available.
			$this->maybe_load_objects();

			// We're pulling individual cache data for the same sub-command
			// if we've already had a previously cached response.
			if ($is_multiplexed) {
				$computed_keys = array();
				$result = array();

				// Make sure that we're getting the latest cached data for the command
				// instead of an old result from a multiplexed command's response.
				//
				// N.B. Need to run through all available commands under the multiplexed
				// command executed to get the latest (fresh) data that was previously cached
				// if available.
				foreach ($data['commands'] as $sub_command => $sub_data) {
					$cached = $this->retrieve_cached_data($sub_command, $sub_data);

					$computed_keys[$sub_command] = $cached['key'];
					if (!empty($cached['data'])) $result[$sub_command] = $cached['data'];
				}

				// Update the reply with the latest cached response whenever applicable.
				if (!empty($result)) {
					$cached_data['data'] = array(
						'reply' => $result
					);
				}
			} else {
				$cached_data = $this->retrieve_cached_data($this->command, $data);
				$computed_meta_key = $cached_data['key'];
			}

			// Return any cached data found if not empty.
			if (!empty($cached_data['data'])) {
				// N.B. This is safe since we're only saving (caching) if we don't encounter any error in the caught_output
				// as it won't make any sense if we're saving errors.
				if (isset($cached_data['data']['reply']) && !isset($cached_data['data']['caught_output'])) {
					$command_data = array(
						'caught_output' => '',
						'reply' => $cached_data['data']['reply']
					);

					$cached_data['data'] = $this->response_post_check($command_data);
				}

				return $cached_data['data'];
			}
		}

		// If we reached this far then that would mean that we currently don't have any cache data
		// associated with the submitted command. Thus, we will proceed in sending the request to the remote website.

		// @codingStandardsIgnoreLine
		@ob_start();

		if (!empty($this->site_meta['http_username']->value)) {
			$authentication_method = empty($this->site_meta['http_authentication_method']->value) ? 'basic' : $this->site_meta['http_authentication_method']->value;
			$http_password = empty($this->site_meta['http_password']->value) ? '' : (string) $this->site_meta['http_password']->value;

			if ('basic' != $authentication_method && version_compare(PHP_VERSION, '5.4', '<')) {
				$error_code = 'no_digest_before_php54';
				$reply = new WP_Error($error_code, $this->errors[$error_code], PHP_VERSION);
			} else {
				// Guzzle supports HTTP digest authentication - the WP HTTP API doesn't.
				if (!class_exists('GuzzleHttp\Client')) include_once UD_CENTRAL_DIR.'/vendor/autoload.php';
				$guzzle_client = new GuzzleHttp\Client();

				if (!method_exists($this->ud_rpc, 'set_http_transport') || !method_exists($this->ud_rpc, 'set_http_credentials')) {
					// That's the probable cause, because we can assume that UC has a bundled UDRPC that's new enough.
					$error_code = 'incompatible_udrpc_php';
					$reply = new WP_Error($error_code, $this->errors[$error_code]);
				} else {
					$this->ud_rpc->set_http_transport($guzzle_client);
					$this->ud_rpc->set_http_credentials(array('username' => $this->site_meta['http_username']->value, 'password' => $http_password, 'authentication_method' => $authentication_method));
				}
			}
		}

		if ($this->is_preencrypted) {
			// Command is not applicable to this area, so we empty it if we have a pre-encrypted data
			// since subsequent process may want to check the command before proceeding.
			$this->command = '';

			$reply = $this->user->send_message($this->ud_rpc, '__updraftcentral_internal_preencrypted', $data, 30);
		} else {
			$this->ud_rpc->set_key_local($this->site->key_local_private);
			$this->ud_rpc->set_key_remote($this->site->key_remote_public);
			$this->ud_rpc->activate_replay_protection();

			$reply = $this->user->send_message($this->ud_rpc, $this->command, $data, 30);
		}

		// @codingStandardsIgnoreStart
		$caught_output = @ob_get_contents();
		@ob_end_clean();
		// @codingStandardsIgnoreEnd

		// Check if we're currently running a multiplexed command. If so,
		// we're going to save each individual results separately, so that it can be retrieved later
		// when a command is sent individually with the same signature (command name and data parameters).
		if ($is_multiplexed) {
			// N.B. We don't cache the generic multiplexed command ('core.execute_commands') but instead
			// we save each individual commands separately so that we can pull individual request's result
			// that were cached/saved previously.
			$output = array(
				'caught_output' => $caught_output,
				'reply' => $reply
			);

			$result = $this->response_post_check($output);
			if ('ok' === $result['responsetype'] && is_array($result['rpc_response'])) {
				// Save generic response signature here, we're going to use this later when
				// caching individual responses for each executed commands by overriding its
				// "data" field with the actual response data for that command before saving it to DB.
				$store_data = $output;

				foreach ($result['rpc_response']['data'] as $command => $data) {
					if (isset($computed_keys[$command])) {
						$key = $computed_keys[$command];

						if ('rpcok' == $data['response']) {
							$store_data['reply']['data'] = $data['data'];
							$this->maybe_cache_response($command, $store_data, $key, $force_save);
						}
					}
				}
			}

		} else {
			// Make sure that we have a meta_key generated for the new request.
			if (empty($computed_meta_key)) {
				$computed_meta_key = $this->generate_meta_key($this->command, $data);
			}

			// Cache response whenever applicable
			$result = $this->response_post_check($this->maybe_cache_response($this->command, array(
				'caught_output' => $caught_output,
				'reply' => $reply
			), $computed_meta_key, $force_save));
		}

		return $result;
	}

	/**
	 * Validates the submitted data before sending the command to the remote site
	 *
	 * @return mixed - True on success, an error array containing the error information on failure
	 */
	public function validate_input() {
		if (!empty($this->data)) {

			// Check the sent data
			if ($this->is_preencrypted) {
				if (!isset($this->data['wrapped_message']) || !is_array($this->data['wrapped_message']) || empty($this->data['site_id']) || !is_numeric($this->data['site_id'])) {

					return $this->return_error('missing_data');
				}
			} else {
				if (!isset($this->data['data']) || !is_array($this->data['data']) || empty($this->data['data']['command']) || empty($this->data['site_id']) || !is_numeric($this->data['site_id'])) {

					return $this->return_error('missing_data');
				}
			}

			// This is also a security check - whether the specified site belongs to the current user
			if (empty($this->site)) {
				return $this->return_error('nonexistent_site');
			}

			if (empty($this->site->key_local_private)) {
				return $this->return_error('nonexistent_site_key');
			}

			if (!empty($this->site->unlicensed)) {
				return $this->return_error('site_unlicensed');
			}

			if ($this->rc->url_looks_internal($this->site->url) && !$this->rc->url_looks_internal(site_url()) && !apply_filters('updraftcentral_allow_contacting_internal_url_from_server', true, $this->site->url)) {
				return $this->return_error('cannot_contact_localdev');
			}

			return true;
		} else {
			return $this->return_error('missing_data');
		}
	}
}

endif;
