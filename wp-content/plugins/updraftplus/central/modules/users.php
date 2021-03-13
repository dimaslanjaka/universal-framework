<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No access.');

class UpdraftCentral_Users_Commands extends UpdraftCentral_Commands {

	private function _search_users($query) {
		$this->_admin_include('user.php');
		$query1 = new WP_User_Query(array(
			'orderby' => 'ID',
			'order' => 'ASC',
			'role'=> $query["role"],
			'search' => '*' . esc_attr($query["search"]) . '*',
		));
		$query2 = new WP_User_Query(array(
			'orderby' => 'ID',
			'order' => 'ASC',
			'role'=> $query["role"],
			'meta_query'=>array(
				'relation' => 'OR',
				array(
						'key' => 'first_name',
						'value' => $query["search"],
						'compare' => 'LIKE'
				),
				array(
						'key' => 'last_name',
						'value' => $query["search"],
						'compare' => 'LIKE'
				),
			)
		));

		if (empty($query1->results)) {
			$query1->results = array();
		}
		if (empty($query2->results)) {
			$query2->results = array();
		}
		if (empty($query1->results) && empty($query2->results)) {
			return array("message" => "users_not_found");
		}
		
		$found_users = array_merge($query1->results, $query2->results);
		$users = array();
		foreach ($found_users as $new_user) {
			$new = true;
			foreach ($users as $user) {
				if ($new_user == $user) {
					$new = false;
				}
			};
			if ($new) {
				array_push($users, $new_user);
			}
		};
		
		return $users;
	}

	private function _calculate_pages($query) {
	
		$per_page_options = array(10, 20, 30, 40, 50);

		if (!empty($query)) {
			
			if (!empty($query['search'])) {
				return array(
					page_count => 1,
					page_no => 1
				);
			}
			
			$pages = array();
			$page_query = new WP_User_Query(array('role' => $query["role"]));
			$page_count = ceil($page_query->total_users / $query["per_page"]);
			if ($page_count > 1) {

				for ($i = 0; $i < $page_count; $i++) {
					if ($i + 1 == $query['page_no']) {
						$paginator_item = array(
							"value"=>$i+1,
							"setting"=>"disabled"
						);
					} else {
						$paginator_item = array(
							"value"=>$i+1
						);
					}
					array_push($pages, $paginator_item);
				};

				if ($query['page_no'] >= $page_count) {
					$page_next = array(
						"value"=>$page_count,
						"setting"=>"disabled"
					);
				} else {
					$page_next = array(
						"value"=>$query['page_no'] + 1
					);
				};
				if (1 === $query['page_no']) {
					$page_prev = array(
						"value"=>1,
						"setting"=>"disabled"
					);
				} else {
					$page_prev = array(
						"value"=>$query['page_no'] - 1
					);
				};

				return array(
					"page_no" => $query['page_no'],
					"per_page" => $query["per_page"],
					"page_count" => $page_count,
					"pages" => $pages,
					"page_next" => $page_next,
					"page_prev" => $page_prev,
					"total_results" => $page_query->total_users,
					"per_page_options" => $per_page_options
				);

			} else {
				return array(
					"page_no" => $query['page_no'],
					"per_page" => $query["per_page"],
					"page_count" => $page_count,
					"total_results" => $page_query->total_users,
					"per_page_options" => $per_page_options
				);
			}
		} else {
			return array(
				"per_page_options" => $per_page_options
			);
		}
	}
	
	public function check_username($params) {
		$this->_admin_include('user.php');
		$username = $params['user_name'];
		
		$blog_id = get_current_blog_id();
		if (!empty($params['site_id'])) {
			$blog_id = $params['site_id'];
		}
		
		
		// Here, we're switching to the actual blog that we need
		// to pull users from.
		
		$switched = function_exists('switch_to_blog') ? switch_to_blog($blog_id) : false;
		
		if (username_exists($username) && is_user_member_of_blog(username_exists($username), $blog_id)) {
			$result = array("valid" => false, "message" => 'username_exists');
			return $this->_response($result);
		}
		if (!validate_username($username)) {
			$result = array("valid" => false, "message" => 'username_invalid');
			return $this->_response($result);
		}
		
		
		// Here, we're restoring to the current (default) blog before we
		// do the switched.
		
		if (function_exists('restore_current_blog') && $switched) {
			restore_current_blog();
		}
		
		$result = array("valid" => true, "message" => 'username_valid');
		return $this->_response($result);
	}
	
	/**
	 * Pulls blog sites available
	 * for the current WP instance.
	 * If the site is a multisite, then sites under the network
	 * will be pulled, otherwise, it will return an empty array.
	 *
	 * @returns Array - an array of sites
	 */
	private function _get_blog_sites() {
		
		if (!is_multisite()) return array();
		
		// Initialize array container
		$sites = $network_sites = array();
		
		// Check to see if latest get_sites (available on WP version >= 4.6) function is
		// available to pull any available sites from the current WP instance. If not, then
		// we're going to use the fallback function wp_get_sites (for older version).
		if (function_exists('get_sites') && class_exists('WP_Site_Query')) {
			$network_sites = get_sites();
		} else {
			if (function_exists('wp_get_sites')) {
				$network_sites = wp_get_sites();
			}
		}
		
		// We only process if sites array is not empty, otherwise, bypass
		// the next block.
		if (!empty($network_sites)) {
			foreach ($network_sites as $site) {
				
				// Here we're checking if the site type is an array, because
				// we're pulling the blog_id property based on the type of
				// site returned.
				// get_sites returns an array of object, whereas the wp_get_sites
				// function returns an array of array.
				$blog_id = is_array($site) ? $site['blog_id'] : $site->blog_id;
				
				
				// We're saving the blog_id and blog name as an associative item
				// into the sites array, that will be used as "Sites" option in
				// the frontend.
				$sites[$blog_id] = get_blog_details($blog_id)->blogname;
			}
		}
		
		return $sites;
	}
	
	public function check_email($params) {
		$this->_admin_include('user.php');
		$email = $params['email'];
		
		$blog_id = get_current_blog_id();
		if (isset($params['site_id']) && 0 !== $params['site_id']) {
			$blog_id = $params['site_id'];
		}
		
		
		// Here, we're switching to the actual blog that we need
		// to pull users from.
		
		$switched = false;
		if (function_exists('switch_to_blog')) {
			$switched = switch_to_blog($blog_id);
		}
		
		if (is_email($email) === false) {
			$result = array("valid" => false, "message" => 'email_invalid');
			return $this->_response($result);
		}
		
		if (email_exists($email) && is_user_member_of_blog(email_exists($email), $blog_id)) {
			$result = array("valid" => false, "message" => 'email_exists');
			return $this->_response($result);
		}
		
		// Here, we're restoring to the current (default) blog before we
		// do the switched.
		
		if (function_exists('restore_current_blog') && $switched) {
			restore_current_blog();
		}
		
		$result = array("valid" => true, "message" => 'email_valid');
		return $this->_response($result);
	}
	
	/**
	 * The get_users function pull all the users from the database
	 * based on the current search parameters/filters. Please see _search_users
	 * for the breakdown of these parameters.
	 *
	 * @param  array $query
	 * @return array
	 */
	public function get_users($query) {
		$this->_admin_include('user.php');
		
		$users;
		// Here, we're getting the current blog id. If blog id
		// is passed along with the parameters then we override
		// that current (default) value with the parameter blog id value.
		$blog_id = get_current_blog_id();
		if (isset($query['site_id']) && 0 !== $query['site_id']) $blog_id = $query['site_id'];
		
		
		// Here, we're switching to the actual blog that we need
		// to pull users from.
		
		$switched = false;
		if (function_exists('switch_to_blog')) {
			$switched = switch_to_blog($blog_id);
		}
		
		if (!empty($query["search"])) {
			$users = $this->_search_users($query);
		} else {
			if (empty($query["per_page"])) {
				$query["per_page"] = 10;
			}
			if (empty($query['page_no'])) {
				$query['page_no'] = 1;
			}
			if (empty($query["role"])) {
				$query["role"] = "";
			}
			
			$user_query = new WP_User_Query(array(
				'orderby' => 'ID',
				'order' => 'ASC',
				'number' => $query["per_page"],
				'paged'=> $query['page_no'],
				'role'=> $query["role"]
			));
			
			if (empty($user_query->results)) {
				$result = array("message" => 'users_not_found');
				return $this->_response($result);
			}
			
			$users = $user_query->results;
		}
		
		foreach ($users as &$user) {
			$user_object = get_userdata($user->ID);
			if (method_exists($user_object, 'to_array')) {
				$user = $user_object->to_array();
				$user["roles"] = $user_object->roles;
				$user["first_name"] = $user_object->first_name;
				$user["last_name"] = $user_object->last_name;
				$user["description"] = $user_object->description;
			} else {
				$user = $user_object;
			}
		}
		
		$result = array(
			"users"=>$users,
			"paging" => $this->_calculate_pages($query)
		);
		
		// Here, we're restoring to the current (default) blog before we
		// do the switched.
		
		if (function_exists('restore_current_blog') && $switched) {
			restore_current_blog();
		}
		return $this->_response($result);
	}
	
	public function add_user($user) {
		$this->_admin_include('user.php');
		// Here, we're getting the current blog id. If blog id
		// is passed along with the parameters then we override
		// that current (default) value with the parameter blog id value.

		
		$blog_id = get_current_blog_id();
		if (isset($user['site_id']) && 0 !== $user['site_id']) $blog_id = $user['site_id'];
		
		
		// Here, we're switching to the actual blog that we need
		// to pull users from.
		
		$switched = false;
		if (function_exists('switch_to_blog')) {
			$switched = switch_to_blog($blog_id);
		}
		
		if (!current_user_can('create_users') && !is_super_admin()) {
			$result = array("error" => true, "message" => "user_create_no_permission");
			return $this->_response($result);
		}
		if (is_email($user["user_email"]) === false) {
			$result = array("error" => true, "message" => "email_invalid");
			return $this->_response($result);
		}
		if (email_exists($user["user_email"]) && is_user_member_of_blog(email_exists($user["user_email"]), $blog_id)) {
			$result = array("error" => true, "message" => "email_exists");
			return $this->_response($result);
		}
		if (username_exists($user["user_login"]) && is_user_member_of_blog(username_exists($user["user_login"]), $blog_id)) {
			$result = array("error" => true, "message" => "username_exists");
			return $this->_response($result);
		}
		if (!validate_username($user["user_login"])) {
			$result = array("error" => true, "message" => 'username_invalid');
			return $this->_response($result);
		}
		if (isset($user['site_id']) && !current_user_can('manage_network_users')) {
			$result = array("error" => true, "message" => 'user_create_no_permission');
			return $this->_response($result);
		}
		
		if (email_exists($user["user_email"]) && !is_user_member_of_blog(email_exists($user["user_email"]), $blog_id)) {
			$user_id = email_exists($user["user_email"]);
		} else {
			$user_id = wp_insert_user($user);
		}
		$role = $user['role'];
		if (is_multisite()) {
			add_existing_user_to_blog(array('user_id' => $user_id, 'role' => $role));
		}
		
		// Here, we're restoring to the current (default) blog before we
		// do the switched.
		
		if (function_exists('restore_current_blog') && $switched) {
			restore_current_blog();
		}
		
		if ($user_id > 0) {
			$result = array("error" => false, "message" => "user_created_with_user_name", "values" => array($user['user_login']));
			return $this->_response($result);
		} else {
			$result = array("error" => true, "message" => "user_create_failed", "values" => array($user));
		}
		
		
		return $this->_response($result);
	}
	
	/**
	 * [delete_user - UCP: users.delete_user]
	 *
	 * This function is used to check to make sure the user_id is valid and that it has has user delete permissions.
	 * If there are no issues, the user is deleted.
	 *
	 * current_user_can: 	This check the user permissons from UCP
	 * get_userdata:		This get the user data on the data from user_id in the $user_id array
	 * wp_delete_user:		Deleting users on the User ID (user_id) and, IF Specified, the Assigner ID (assign_user_id).
	 *
	 * @param  [type] $params [description] THis is an Array of params sent over from UpdraftCentral
	 * @return [type] Array     [description] This will send back an error array along with message if there are any issues with the user_id
	 */
	public function delete_user($params) {
		$this->_admin_include('user.php');
		$user_id = $params['user_id'];
		$assign_user_id = $params["assign_user_id"];
		// Here, we're getting the current blog id. If blog id
		// is passed along with the parameters then we override
		// that current (default) value with the parameter blog id value.

		$blog_id = get_current_blog_id();
		if (isset($params['site_id']) && 0 !== $params['site_id']) $blog_id = $params['site_id'];
		
		$switched = false;
		if (function_exists('switch_to_blog')) {
			$switched = switch_to_blog($blog_id);
		}
		
		if (!current_user_can('delete_users') && !is_super_admin()) {
			$result = array("error" => true, "message" => "user_delete_no_permission");
			return $this->_response($result);
		}
		if (get_userdata($user_id) === false) {
		  $result = array("error" => true, "message" => "user_not_found");
		  return $this->_response($result);
		}
		
		if (wp_delete_user($user_id, $assign_user_id)) {
			$result = array("error" => false, "message" => "user_deleted");
		} else {
			$result = array("error" => true, "message" => "user_delete_failed");
		}
		
		// Here, we're restoring to the current (default) blog before we
		// do the switched.

		if (function_exists('restore_current_blog') && $switched) {
			restore_current_blog();
		}
		
		return $this->_response($result);
	}
	
	public function edit_user($user) {
		$this->_admin_include('user.php');
		
		// Here, we're getting the current blog id. If blog id
		// is passed along with the parameters then we override
		// that current (default) value with the parameter blog id value.

		$blog_id = get_current_blog_id();
		if (isset($user['site_id']) && 0 !== $user['site_id']) $blog_id = $user['site_id'];
		
		// Here, we're switching to the actual blog that we need
		// to apply our changes.

		$switched = false;
		if (function_exists('switch_to_blog')) {
			$switched = switch_to_blog($blog_id);
		}
		
		if (!current_user_can('edit_users') && !is_super_admin() && get_current_user_id() !== $user["ID"]) {
			$result = array("error" => true, "message" => "user_edit_no_permission");
			return $this->_response($result);
		}
		
		if (false === get_userdata($user["ID"])) {
			$result = array("error" => true, "message" => "user_not_found");
			return $this->_response($result);
		}
		if (get_current_user_id() == $user["ID"]) {
			unset($user["role"]);
		}
		
		/* Validate Username*/
		if (!validate_username($user["user_login"])) {
			$result = array("error" => true, "message" => 'username_invalid');
			return $this->_response($result);
		}
		/* Validate Email if not the same*/
		
		$remote_user = get_userdata($user["ID"]);
		$old_email = $remote_user->user_email;
		
		if ($user['user_email'] !== $old_email) {
			if (is_email($user['user_email']) === false) {
				$result = array("error" => true, "message" => 'email_invalid');
				return $this->_response($result);
			}
			
			if (email_exists($user['user_email'])) {
				$result = array("error" => true, "message" => 'email_exists');
				return $this->_response($result);
			}
		}
		
		
		$user_id = wp_update_user($user);
		if (is_wp_error($user_id)) {
			$result = array("error" => true, "message" => "user_edit_failed_with_error", "values" => array($user_id));
		} else {
			$result = array("error" => false, "message" => "user_edited_with_user_name", "values" => array($user["user_login"]));
		}
		
		// Here, we're restoring to the current (default) blog before we
		// do the switched.

		if (function_exists('restore_current_blog') && $switched) {
			restore_current_blog();
		}
		
		return $this->_response($result);
	}

	public function get_roles() {
		$this->_admin_include('user.php');
		$roles = array_reverse(get_editable_roles());
		return $this->_response($roles);
	}

	public function get_user_filters() {
		$this->_admin_include('user.php');
		
		// Pull sites options if available.
		$sites = $this->_get_blog_sites();
		
		$result = array(
			"sites" => $sites,
			"roles" => array_reverse(get_editable_roles()),
			"paging" => $this->_calculate_pages(null),
		);
		return $this->_response($result);
	}
}
