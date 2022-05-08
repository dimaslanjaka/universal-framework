<?php
if (!defined('ABSPATH')) die('Access denied.');

if (!class_exists('WP_REST_Users_Controller')) {
	include_once ABSPATH . 'wp-includes/rest-api/endpoints/class-wp-rest-users-controller.php';
}

/**
 * UpdraftCentral_REST_Users_Controller class. Used to override some basic response
 * details to integrate the remote user information.
 *
 * Originally copied and edited from WP_REST_Users_Controller (WordPress 5.0.3). Updated
 * to support higher versions up to WordPress 5.4.
 *
 * @see WP_REST_Users_Controller
 */
class UpdraftCentral_REST_Users_Controller extends WP_REST_Users_Controller {

	public function __construct() {
		parent::__construct();
	}

	/**
	 * Prepares a single user output for response.
	 *
	 * @since 4.7.0
	 *
	 * @param object          $user_obj A simple (stdClass) object containing basic (public) properties of a remote user object.
	 * @param WP_REST_Request $request  Request object.
	 * @param array           $misc     Array containing remote user data.
	 * @return WP_REST_Response Response object.
	 */
	public function prepare_remote_item_for_response($user_obj, $request, $misc) {

		// Make sure that we have a WP_User object before proceeding
		// with the rest of the process below.
		$user = new WP_User();
		foreach (get_object_vars($user_obj) as $key => $value) {
			$user->{$key} = $value;
		}

		$data   = array();
		$fields = $this->get_fields_for_response($request);

		if (in_array('id', $fields, true)) {
			$data['id'] = $user->ID;
		}

		if (in_array('username', $fields, true)) {
			$data['username'] = $user->user_login;
		}

		if (in_array('name', $fields, true)) {
			$data['name'] = $user->display_name;
		}

		if (in_array('first_name', $fields, true)) {
			$data['first_name'] = $user->first_name;
		}

		if (in_array('last_name', $fields, true)) {
			$data['last_name'] = $user->last_name;
		}

		if (in_array('email', $fields, true)) {
			$data['email'] = $user->user_email;
		}

		if (in_array('url', $fields, true)) {
			$data['url'] = $user->user_url;
		}

		if (in_array('description', $fields, true)) {
			$data['description'] = $user->description;
		}

		if (in_array('link', $fields, true)) {
			$data['link'] = $misc['link'];
		}

		if (in_array('locale', $fields, true)) {
			$data['locale'] = $misc['locale'];
		}

		if (in_array('nickname', $fields, true)) {
			$data['nickname'] = !empty($user->nickname) ? $user->nickname : '';
		}

		if (in_array('slug', $fields, true)) {
			$data['slug'] = $user->user_nicename;
		}

		if (in_array('roles', $fields, true)) {
			$roles = $user->roles;
			// Just in case other plugins were messing around with the roles array.
			if (is_object($roles)) {
				$filtered_roles = array_filter(get_object_vars($roles), 'is_string');
				$roles = ($filtered_roles && !empty($filtered_roles)) ? $filtered_roles : array();
			}

			// Defensively call array_values() to ensure an array is returned.
			$data['roles'] = array_values($roles);
		}

		if (in_array('registered_date', $fields, true)) {
			$data['registered_date'] = $misc['registered_date'];
		}

		if (in_array('capabilities', $fields, true)) {
			$data['capabilities'] = (object) $user->allcaps;
		}

		if (in_array('extra_capabilities', $fields, true)) {
			$data['extra_capabilities'] = (object) $user->caps;
		}

		if (in_array('avatar_urls', $fields, true)) {
			$data['avatar_urls'] = rest_get_avatar_urls($user->user_email);
		}

		if (in_array('meta', $fields, true)) {
			$data['meta'] = $this->meta->get_value($user->ID, $request);
		}

		$context = !empty($request['context']) ? $request['context'] : 'embed';

		$data = $this->add_additional_fields_to_object($data, $request);
		$data = $this->filter_response_by_context($data, $context);

		// Wrap the data in a response object.
		$response = rest_ensure_response($data);
		$response->add_links($this->prepare_links($user));

		return $response;
	}
}
