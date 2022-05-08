<?php
// @codingStandardsIgnoreFile
if (!defined('UD_CENTRAL_DIR')) die('Security check');

/**
 * Largely from wp-includes/meta.php and wp-includes/user.php
 *
 * Firstly is our constructor, which accepts + stores the table prefix.
 * Next come the methods for accessing meta data.
 * Next comes the WP infrastructure, which only required very minor modifications (mostly, removing the table name check and calling $this->function instead of functions directly
 */
class UpdraftCentral_Site_Meta {
	private $_uc_table_prefix;

	public function __construct($table_prefix) {
		$this->_uc_table_prefix = $table_prefix;
	}

	/**
	 * Retrieve metadata for the specified website.
	 *
	 * @param mixed 	$data			The value on which the filters hooked are applied on.
	 * @param int    	$site_id		Website ID of the object metadata is for
	 * @param string 	$meta_key		Optional. Metadata key. If not specified, retrieve all metadata for the specified website.
	 * @param bool   	$single			Optional, default is false.
	 * 									If true, return only the first value of the specified meta_key.
	 * 									This parameter has no effect if meta_key is not specified.
	 * @param bool|int 	$maximum_age 	Optional, default is false. 
	 * 									If value is integer, only return data that is equal or less than the maximum age.
	 * 									Otherwise (if false), it will return all data with any age. 
	 * @param bool      $with_fields    Indicates whether a complete record with field names will be returned
	 *
	 * @return mixed	For single the metadata value, or array of values if single = false or the original value of $data
	 */
	public function updraftcentral_get_site_metadata($data, $site_id, $meta_key = "", $single = false, $maximum_age = false, $with_fields = false) {
		global $wpdb;

		$table = $this->_get_meta_table('site');
		if (!$table) {
			return $data;
		}

		if (!absint($site_id)) {
			return $data;
		}

		if (!empty($meta_key)) {
			$meta_key = wp_unslash($meta_key);

			$meta_values = array();
			if (false !== $maximum_age) {
				if (!is_numeric($maximum_age)) {
					return $data;
				}

				if ($with_fields) {
					$meta_values = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE meta_key = %s AND site_id = %d AND (UNIX_TIMESTAMP()-created) <= %s", $meta_key, $site_id, $maximum_age), ARRAY_A);
				} else {
					$meta_values = $wpdb->get_col($wpdb->prepare("SELECT meta_value FROM $table WHERE meta_key = %s AND site_id = %d AND (UNIX_TIMESTAMP()-created) <= %s", $meta_key, $site_id, $maximum_age));
				}
			} else {
				if ($with_fields) {
					$meta_values = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE meta_key = %s AND site_id = %d", $meta_key, $site_id), ARRAY_A);
				} else {
					$meta_values = $wpdb->get_col($wpdb->prepare("SELECT meta_value FROM $table WHERE meta_key = %s AND site_id = %d", $meta_key, $site_id));
				}
			}
		} else {
			if ($with_fields) {
				$meta_values = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE site_id = %d", $site_id), ARRAY_A);
			} else {
				$meta_values = $wpdb->get_col($wpdb->prepare("SELECT meta_value FROM $table WHERE site_id = %d", $site_id));	
			}
		}

		if (empty($meta_values)) {
			// N.B. Here, we're returning false if $meta_values is empty since we are
			// shortcircuiting the result from the current query it is best to return
			// the actual "false" value rather than returning the default $data value
			// which can be null. A return value of null does not actually return this
			// result as empty (which is our expected result if the query fails) because it will still check
			// WordPress's own caching implementation and fill it if this call returns null.
			return false;
		} else {
			if ($single) {
				$meta_values = $meta_values[0];
				if (!is_array($meta_values)) return UpdraftCentral()->maybe_json_decode($meta_values);
			}

			return array_map(array(UpdraftCentral(), 'maybe_json_decode'), $meta_values);
		}
	}

	/**
	 * Retrieve the value of the "created" column from the sitemeta table
	 *
	 * @param mixed 	$data			The value on which the filters hooked are applied on.
	 * @param int    	$site_id		Website ID of the object metadata is for
	 * @param string 	$meta_key		Metadata key. If not specified, retrieve all metadata for the specified website.
	 *
	 * @return mixed	Created column value, or the origin $data value
	 */
	public function updraftcentral_get_site_metadata_created($data, $site_id, $meta_key) {
		global $wpdb;

		$table = $this->_get_meta_table('site');
		if (!$table) {
			return $data;
		}

		if (!absint($site_id)) {
			return $data;
		}

		if (!isset($meta_key) || empty($meta_key)) {
			return $data;
		}

		$meta_key = wp_unslash($meta_key);
		$result = $wpdb->get_col($wpdb->prepare("SELECT created FROM $table WHERE meta_key = %s AND site_id = %d", $meta_key, $site_id));

		if (empty($result)) {
			return $data;
		} else {
			return $result[0];
		}

	}

	/**
	 * Delete all site meta belonging to a particular site through its ID
	 *
	 * @param int $site_id Website ID of the object metadata is from
	 *
	 * @return boolean
	 */
	public function delete_site_meta_by_site_id($site_id) {
		global $wpdb;

		$table = $this->_get_meta_table('site');
		if (!$table) {
			return false;
		}

		if (!$site_id) {
			return false;
		}

		$count = $wpdb->query($wpdb->prepare("DELETE FROM $table WHERE `site_id` = %d", $site_id));
		if (!$count)
			return false;

		return true;
	}

	/**
	 * Add meta data field to a site.
	 *
	 * @since 3.0.0
	 *
	 * @param int    $site_id    Site ID.
	 * @param string $meta_key   Metadata name.
	 * @param mixed  $meta_value Metadata value.
	 * @param bool   $unique     Optional, default is false. Whether the same key should not be added.
 *
	 * @return int|false Meta ID on success, false on failure.
	 */
	public function add_site_meta($site_id, $meta_key, $meta_value, $unique = false) {
		return $this->add_metadata('site', $site_id, $meta_key, $meta_value, $unique);
	}

	/**
	 * Remove metadata matching criteria from a site.
	 *
	 * You can match based on the key, or key and value. Removing based on key and
	 * value, will keep from removing duplicate metadata with the same key. It also
	 * allows removing all metadata matching key, if needed.
	 *
	 * @param int    $site_id    Site ID
	 * @param string $meta_key   Metadata name.
	 * @param mixed  $meta_value Optional. Metadata value.
 *
	 * @return bool True on success, false on failure.
	 */
	public function delete_site_meta($site_id, $meta_key, $meta_value = '') {
		return $this->delete_metadata('site', $site_id, $meta_key, $meta_value);
	}

	/**
	 * Retrieve site meta field for a site.
	 *
	 * @param int    $site_id Site ID.
	 * @param string $key     Optional. The meta key to retrieve. By default, returns data for all keys.
	 * @param bool   $single  Whether to return a single value.
	 * @param bool|int $maximum_age Optional, default is false. 
	 *								If value is integer, only return data that is equal or less than the maximum age.
	 *								Otherwise (if false), it will return all data with any age.
	 * @param bool   $with_fields Indicates whether a complete record with field names will be returned 
 *
	 * @return mixed Will be an array if $single is false. Will be value of meta data field if $single is true.
	 */
	public function get_site_meta($site_id, $key = '', $single = false, $maximum_age = false, $with_fields = false) {
		return $this->get_metadata('site', $site_id, $key, $single, $maximum_age, $with_fields);
	}

	/**
	 * Update site meta field based on site ID.
	 *
	 * Use the $prev_value parameter to differentiate between meta fields with the
	 * same key and site ID.
	 *
	 * If the meta field for the site does not exist, it will be added.
	 *
	 * @param int    $site_id    Site ID.
	 * @param string $meta_key   Metadata key.
	 * @param mixed  $meta_value Metadata value.
	 * @param mixed  $prev_value Optional. Previous value to check before removing.
 *
	 * @return int|bool Meta ID if the key didn't exist, true on successful update, false on failure.
	 */
	public function update_site_meta($site_id, $meta_key, $meta_value, $prev_value = '') {
		return $this->update_metadata('site', $site_id, $meta_key, $meta_value, $prev_value);
	}

	/**
	 * Retrieve the name of the metadata table for the specified object type.
	 *
	 * @since 2.9.0
	 *
	 * @global wpdb $wpdb WordPress database abstraction object.
	 *
	 * @param string $type Type of object to get metadata table for (e.g., comment, post, or user)
 *
	 * @return string|false Metadata table name, or false if no metadata table exists
	 */
	private function _get_meta_table($type) {

		global $wpdb;

		$table_name = $type.'meta';

		return $wpdb->base_prefix.$this->_uc_table_prefix.$table_name;
	}

	/**
	 * Add metadata for the specified object.
	 *
	 * @global wpdb $wpdb WordPress database abstraction object.
	 *
	 * @param string $meta_type  Type of object metadata is for (e.g., comment, post, or user)
	 * @param int    $object_id  ID of the object metadata is for
	 * @param string $meta_key   Metadata key
	 * @param mixed  $meta_value Metadata value. Must be serializable if non-scalar.
	 * @param bool   $unique     Optional, default is false.
	 *                           Whether the specified metadata key should be unique for the object.
	 *                           If true, and the object already has a value for the specified metadata key,
	 *                           no change will be made.
 *
	 * @return int|false The meta ID on success, false on failure.
	 */
	public function add_metadata($meta_type, $object_id, $meta_key, $meta_value, $unique = false) {
		global $wpdb;

		if (!$meta_type || !$meta_key || !is_numeric($object_id)) {
			return false;
		}

		$object_id = absint($object_id);
		if (!$object_id) {
			return false;
		}

		$table = $this->_get_meta_table($meta_type);
		if (!$table) {
			return false;
		}

		$column = sanitize_key($meta_type.'_id');

		// expected_slashed ($meta_key)
		$meta_key = wp_unslash($meta_key);
		$meta_value = wp_unslash($meta_value);
		$meta_value = $this->sanitize_meta($meta_key, $meta_value, $meta_type);

		/**
		 * Filter whether to add metadata of a specific type.
		 *
		 * The dynamic portion of the hook, `$meta_type`, refers to the meta
		 * object type (comment, post, or user). Returning a non-null value
		 * will effectively short-circuit the public function.
		 *
		 * @since 3.1.0
		 *
		 * @param null|bool $check      Whether to allow adding metadata for the given type.
		 * @param int       $object_id  Object ID.
		 * @param string    $meta_key   Meta key.
		 * @param mixed     $meta_value Meta value. Must be serializable if non-scalar.
		 * @param bool      $unique     Whether the specified meta key should be unique
		 *                              for the object. Optional. Default false.
		 */
		$check = apply_filters("add_{$meta_type}_metadata", null, $object_id, $meta_key, $meta_value, $unique);
		if (null !== $check)
			return $check;

		if ($unique && $wpdb->get_var($wpdb->prepare(
			"SELECT COUNT(*) FROM $table WHERE meta_key = %s AND $column = %d",
			$meta_key, $object_id)))
			return false;

		$_meta_value = $meta_value;
		$meta_value = UpdraftCentral()->maybe_json_encode($meta_value);

		/*
		* Fires immediately before meta of a specific type is added.
		*
		* The dynamic portion of the hook, `$meta_type`, refers to the meta
		* object type (comment, post, or user).
		*
		* @since 3.1.0
		*
		* @param int    $object_id  Object ID.
		* @param string $meta_key   Meta key.
		* @param mixed  $meta_value Meta value.
		*/
		do_action("add_{$meta_type}_meta", $object_id, $meta_key, $_meta_value);

		$result = $wpdb->insert($table, array(
			$column => $object_id,
			'meta_key' => $meta_key,
			'meta_value' => $meta_value,
			'created' => time(),
		));

		if (!$result)
			return false;

		$mid = (int) $wpdb->insert_id;

		wp_cache_delete($object_id, $meta_type.'_meta');

		/*
		* Fires immediately after meta of a specific type is added.
		*
		* The dynamic portion of the hook, `$meta_type`, refers to the meta
		* object type (comment, post, or user).
		*
		* @since 2.9.0
		*
		* @param int    $mid        The meta ID after successful update.
		* @param int    $object_id  Object ID.
		* @param string $meta_key   Meta key.
		* @param mixed  $meta_value Meta value.
		*/
		do_action("added_{$meta_type}_meta", $mid, $object_id, $meta_key, $_meta_value);

		return $mid;
	}

	/**
	 * Update metadata for the specified object. If no value already exists for the specified object
	 * ID and metadata key, the metadata will be added.
	 *
	 * @since 2.9.0
	 *
	 * @global wpdb $wpdb WordPress database abstraction object.
	 *
	 * @param string $meta_type  Type of object metadata is for (e.g., comment, post, or user)
	 * @param int    $object_id  ID of the object metadata is for
	 * @param string $meta_key   Metadata key
	 * @param mixed  $meta_value Metadata value. Must be serializable if non-scalar.
	 * @param mixed  $prev_value Optional. If specified, only update existing metadata entries with
	 * 		                     the specified value. Otherwise, update all entries.
 *
	 * @return int|bool Meta ID if the key didn't exist, true on successful update, false on failure.
	 */
	public function update_metadata($meta_type, $object_id, $meta_key, $meta_value, $prev_value = '') {
		global $wpdb;

		if (!$meta_type || !$meta_key || !is_numeric($object_id)) {
			return false;
		}

		$object_id = absint($object_id);
		if (!$object_id) {
			return false;
		}

		$table = $this->_get_meta_table($meta_type);
		if (!$table) {
			return false;
		}

		$column = sanitize_key($meta_type.'_id');
		$id_column = 'user' == $meta_type ? 'umeta_id' : 'meta_id';

		// expected_slashed ($meta_key)
		$meta_key = wp_unslash($meta_key);
		$passed_value = $meta_value;
		$meta_value = wp_unslash($meta_value);
		$meta_value = $this->sanitize_meta($meta_key, $meta_value, $meta_type);

		/**
		 * Filter whether to update metadata of a specific type.
		 *
		 * The dynamic portion of the hook, `$meta_type`, refers to the meta
		 * object type (comment, post, or user). Returning a non-null value
		 * will effectively short-circuit the public function.
		 *
		 * @since 3.1.0
		 *
		 * @param null|bool $check      Whether to allow updating metadata for the given type.
		 * @param int       $object_id  Object ID.
		 * @param string    $meta_key   Meta key.
		 * @param mixed     $meta_value Meta value. Must be serializable if non-scalar.
		 * @param mixed     $prev_value Optional. If specified, only update existing
		 *                              metadata entries with the specified value.
		 *                              Otherwise, update all entries.
		 */
		$check = apply_filters("update_{$meta_type}_metadata", null, $object_id, $meta_key, $meta_value, $prev_value);
		if (null !== $check) return (bool) $check;

		// Compare existing value to new value if no prev value given and the key exists only once.
		if (empty($prev_value)) {
			$old_value = $this->get_metadata($meta_type, $object_id, $meta_key);

			$is_countable = function_exists('is_countable') ? is_countable($old_value) : is_array($old_value);
			if ($is_countable && 1 === count($old_value)) { 
				if ($old_value[0] === $meta_value) return false;
			}
		}

		$meta_ids = $wpdb->get_col($wpdb->prepare("SELECT $id_column FROM $table WHERE meta_key = %s AND $column = %d", $meta_key, $object_id));
		if (empty($meta_ids)) {
			return $this->add_metadata($meta_type, $object_id, $meta_key, $passed_value);
		}

		$_meta_value = $meta_value;
		$meta_value = UpdraftCentral()->maybe_json_encode($meta_value);
		$created = time();

		$data = compact('meta_value', 'created');
		$where = array($column => $object_id, 'meta_key' => $meta_key);

		if (!empty($prev_value)) {
			$prev_value = UpdraftCentral()->maybe_json_encode($prev_value);
			$where['meta_value'] = $prev_value;
		}

		foreach ($meta_ids as $meta_id) {
			/*
			* Fires immediately before updating metadata of a specific type.
			*
			* The dynamic portion of the hook, `$meta_type`, refers to the meta
			* object type (comment, post, or user).
			*
			* @since 2.9.0
			*
			* @param int    $meta_id    ID of the metadata entry to update.
			* @param int    $object_id  Object ID.
			* @param string $meta_key   Meta key.
			* @param mixed  $meta_value Meta value.
			*/
			do_action("update_{$meta_type}_meta", $meta_id, $object_id, $meta_key, $_meta_value);
		}

		if ('post' == $meta_type) {
			foreach ($meta_ids as $meta_id) {
				/*
				* Fires immediately before updating a post's metadata.
				*
				* @since 2.9.0
				*
				* @param int    $meta_id    ID of metadata entry to update.
				* @param int    $object_id  Object ID.
				* @param string $meta_key   Meta key.
				* @param mixed  $meta_value Meta value.
				*/
				do_action('update_postmeta', $meta_id, $object_id, $meta_key, $meta_value);
			}
		}

		$result = $wpdb->update($table, $data, $where);
		if (!$result)
			return false;

		wp_cache_delete($object_id, $meta_type.'_meta');

		foreach ($meta_ids as $meta_id) {
			/*
			* Fires immediately after updating metadata of a specific type.
			*
			* The dynamic portion of the hook, `$meta_type`, refers to the meta
			* object type (comment, post, or user).
			*
			* @since 2.9.0
			*
			* @param int    $meta_id    ID of updated metadata entry.
			* @param int    $object_id  Object ID.
			* @param string $meta_key   Meta key.
			* @param mixed  $meta_value Meta value.
			*/
			do_action("updated_{$meta_type}_meta", $meta_id, $object_id, $meta_key, $_meta_value);
		}

		if ('post' == $meta_type) {
			foreach ($meta_ids as $meta_id) {
				/*
				* Fires immediately after updating a post's metadata.
				*
				* @since 2.9.0
				*
				* @param int    $meta_id    ID of updated metadata entry.
				* @param int    $object_id  Object ID.
				* @param string $meta_key   Meta key.
				* @param mixed  $meta_value Meta value.
				*/
				do_action('updated_postmeta', $meta_id, $object_id, $meta_key, $meta_value);
			}
		}

		return true;
	}

	/**
	 * Delete metadata for the specified object.
	 *
	 * @since 2.9.0
	 *
	 * @global wpdb $wpdb WordPress database abstraction object.
	 *
	 * @param string $meta_type  Type of object metadata is for (e.g., comment, post, or user)
	 * @param int    $object_id  ID of the object metadata is for
	 * @param string $meta_key   Metadata key
	 * @param mixed  $meta_value Optional. Metadata value. Must be serializable if non-scalar. If specified, only delete
	 *                           metadata entries with this value. Otherwise, delete all entries with the specified meta_key.
	 *                           Pass `null, `false`, or an empty string to skip this check. (For backward compatibility,
	 *                           it is not possible to pass an empty string to delete those entries with an empty string
	 *                           for a value.)
	 * @param bool   $delete_all Optional, default is false. If true, delete matching metadata entries for all objects,
	 *                           ignoring the specified object_id. Otherwise, only delete matching metadata entries for
	 *                           the specified object_id.
 *
	 * @return bool True on successful delete, false on failure.
	 */
	public function delete_metadata($meta_type, $object_id, $meta_key, $meta_value = '', $delete_all = false) {
		global $wpdb;

		if (!$meta_type || !$meta_key || !is_numeric($object_id) && !$delete_all) {
			return false;
		}

		$object_id = absint($object_id);
		if (!$object_id && !$delete_all) {
			return false;
		}

		$table = $this->_get_meta_table($meta_type);
		if (!$table) {
			return false;
		}

		$type_column = sanitize_key($meta_type.'_id');
		$id_column = 'user' == $meta_type ? 'umeta_id' : 'meta_id';
		// expected_slashed ($meta_key)
		$meta_key = wp_unslash($meta_key);
		$meta_value = wp_unslash($meta_value);

		/*
		* Filter whether to delete metadata of a specific type.
		*
		* The dynamic portion of the hook, `$meta_type`, refers to the meta
		* object type (comment, post, or user). Returning a non-null value
		* will effectively short-circuit the public function.
		*
		* @since 3.1.0
		*
		* @param null|bool $delete     Whether to allow metadata deletion of the given type.
		* @param int       $object_id  Object ID.
		* @param string    $meta_key   Meta key.
		* @param mixed     $meta_value Meta value. Must be serializable if non-scalar.
		* @param bool      $delete_all Whether to delete the matching metadata entries
		*                              for all objects, ignoring the specified $object_id.
		*                              Default false.
		*/
		$check = apply_filters("delete_{$meta_type}_metadata", null, $object_id, $meta_key, $meta_value, $delete_all);
		if (null !== $check)
			return (bool) $check;

		$_meta_value = $meta_value;
		$meta_value = UpdraftCentral()->maybe_json_encode($meta_value);

		$query = $wpdb->prepare("SELECT $id_column FROM $table WHERE meta_key = %s", $meta_key);

		if (!$delete_all)
			$query .= $wpdb->prepare(" AND $type_column = %d", $object_id);

		if ('' !== $meta_value && null !== $meta_value && false !== $meta_value)
			$query .= $wpdb->prepare(' AND meta_value = %s', $meta_value);

		$meta_ids = $wpdb->get_col($query);
		if (!count($meta_ids))
			return false;

		if ($delete_all)
			$object_ids = $wpdb->get_col($wpdb->prepare("SELECT $type_column FROM $table WHERE meta_key = %s", $meta_key));

		/*
		* Fires immediately before deleting metadata of a specific type.
		*
		* The dynamic portion of the hook, `$meta_type`, refers to the meta
		* object type (comment, post, or user).
		*
		* @since 3.1.0
		*
		* @param array  $meta_ids   An array of metadata entry IDs to delete.
		* @param int    $object_id  Object ID.
		* @param string $meta_key   Meta key.
		* @param mixed  $meta_value Meta value.
		*/
		do_action("delete_{$meta_type}_meta", $meta_ids, $object_id, $meta_key, $_meta_value);

		// Old-style action.
		if ('post' == $meta_type) {
			/*
			* Fires immediately before deleting metadata for a post.
			*
			* @since 2.9.0
			*
			* @param array $meta_ids An array of post metadata entry IDs to delete.
			*/
			do_action('delete_postmeta', $meta_ids);
		}

		$query = "DELETE FROM $table WHERE $id_column IN( ".implode(',', $meta_ids).' )';

		$count = $wpdb->query($query);

		if (!$count)
			return false;

		if ($delete_all) {
			foreach ((array) $object_ids as $o_id) {
				wp_cache_delete($o_id, $meta_type.'_meta');
			}
		} else {
			wp_cache_delete($object_id, $meta_type.'_meta');
		}

		/*
		* Fires immediately after deleting metadata of a specific type.
		*
		* The dynamic portion of the hook name, `$meta_type`, refers to the meta
		* object type (comment, post, or user).
		*
		* @since 2.9.0
		*
		* @param array  $meta_ids   An array of deleted metadata entry IDs.
		* @param int    $object_id  Object ID.
		* @param string $meta_key   Meta key.
		* @param mixed  $meta_value Meta value.
		*/
		do_action("deleted_{$meta_type}_meta", $meta_ids, $object_id, $meta_key, $_meta_value);

		// Old-style action.
		if ('post' == $meta_type) {
			/*
			* Fires immediately after deleting metadata for a post.
			*
			* @since 2.9.0
			*
			* @param array $meta_ids An array of deleted post metadata entry IDs.
			*/
			do_action('deleted_postmeta', $meta_ids);
		}

		return true;
	}

	/**
	 * Retrieve metadata for the specified object.
	 *
	 * @since 2.9.0
	 *
	 * @param string $meta_type Type of object metadata is for (e.g., comment, post, or user)
	 * @param int    $object_id ID of the object metadata is for
	 * @param string $meta_key  Optional. Metadata key. If not specified, retrieve all metadata for
	 * 		                    the specified object.
	 * @param bool   $single    Optional, default is false.
	 *                          If true, return only the first value of the specified meta_key.
	 *                          This parameter has no effect if meta_key is not specified.
	 * @param bool|int $maximum_age Optional, default is false. 
	 *								If value is integer, only return data that is equal or less than the maximum age.
	 *								Otherwise (if false), it will return all data with any age. 
	 * @param bool   $with_fields Indicates whether a complete record with field names will be returned
 *
	 * @return mixed Single metadata value, or array of values
	 */
	public function get_metadata($meta_type, $object_id, $meta_key = '', $single = false, $maximum_age = false, $with_fields = false) {
	
		if (!$meta_type || !is_numeric($object_id)) return false;

		$object_id = absint($object_id);
		if (!$object_id) return false;

		/*
		* Filter whether to retrieve metadata of a specific type.
		*
		* The dynamic portion of the hook, `$meta_type`, refers to the meta
		* object type (comment, post, or user). Returning a non-null value
		* will effectively short-circuit the public function.
		*
		* @since 3.1.0
		*
		* @param null|array|string $value     The value get_metadata() should return - a single metadata value,
		*                                     or an array of values.
		* @param int               $object_id Object ID.
		* @param string            $meta_key  Meta key.
		* @param bool              $single    Whether to return only the first value of the specified $meta_key.
		* @param int               $maximum_age Determines how fresh the data that needs to be pulled.
		* @param bool              $with_fields Indicates whether a complete record with field names will be returned
		*/
		$check = apply_filters("get_{$meta_type}_metadata", null, $object_id, $meta_key, $single, $maximum_age, $with_fields);
		if (null !== $check) {
			if ($single && is_array($check) && isset($check[0])) {
				return $check[0];
			} else {
				return $check;
			}
		}

		$meta_cache = wp_cache_get($object_id, $meta_type.'_meta');

		if (!$meta_cache) {
			$meta_cache = $this->update_meta_cache($meta_type, array($object_id));
			$meta_cache = $meta_cache[$object_id];
		}

		if (!$meta_key) return $meta_cache;

		if (isset($meta_cache[$meta_key])) {
			if ($single)
				return UpdraftCentral()->maybe_json_decode($meta_cache[$meta_key][0]);
			else
				return array_map(array(UpdraftCentral(), 'maybe_json_decode'), $meta_cache[$meta_key]);
		}

		if ($single) {
			return '';
		} else {
			return array();
		}
	}

	/**
	 * Determine if a meta key is set for a given object.
	 *
	 * @since 3.3.0
	 *
	 * @param string $meta_type Type of object metadata is for (e.g., comment, post, or user)
	 * @param int    $object_id ID of the object metadata is for
	 * @param string $meta_key  Metadata key.
 *
	 * @return bool True of the key is set, false if not.
	 */
	public function metadata_exists($meta_type, $object_id, $meta_key) {
		if (!$meta_type || !is_numeric($object_id)) {
			return false;
		}

		$object_id = absint($object_id);
		if (!$object_id) {
			return false;
		}

		/* This filter is documented in wp-includes/meta.php */
		$check = apply_filters("get_{$meta_type}_metadata", null, $object_id, $meta_key, true);
		if (null !== $check)
			return (bool) $check;

		$meta_cache = wp_cache_get($object_id, $meta_type.'_meta');

		if (!$meta_cache) {
			$meta_cache = $this->update_meta_cache($meta_type, array($object_id));
			$meta_cache = $meta_cache[$object_id];
		}

		if (isset($meta_cache[ $meta_key ]))
			return true;

		return false;
	}

	/**
	 * Get meta data by meta ID.
	 *
	 * @since 3.3.0
	 *
	 * @global wpdb $wpdb WordPress database abstraction object.
	 *
	 * @param string $meta_type Type of object metadata is for (e.g., comment, post, term, or user).
	 * @param int    $meta_id   ID for a specific meta row
 *
	 * @return object|false Meta object or false.
	 */
	public function get_metadata_by_mid($meta_type, $meta_id) {
		global $wpdb;

		if (!$meta_type || !is_numeric($meta_id)) {
			return false;
		}

		$meta_id = absint($meta_id);
		if (!$meta_id) {
			return false;
		}

		$table = $this->_get_meta_table($meta_type);
		if (!$table) {
			return false;
		}

		$id_column = ('user' == $meta_type) ? 'umeta_id' : 'meta_id';

		$meta = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE $id_column = %d", $meta_id));

		if (empty($meta))
			return false;

		if (isset($meta->meta_value))
			$meta->meta_value = UpdraftCentral()->maybe_json_decode($meta->meta_value);

		return $meta;
	}

	/**
	 * Update meta data by meta ID.
	 *
	 * @since 3.3.0
	 *
	 * @global wpdb $wpdb WordPress database abstraction object.
	 *
	 * @param string $meta_type  Type of object metadata is for (e.g., comment, post, or user)
	 * @param int    $meta_id    ID for a specific meta row
	 * @param string $meta_value Metadata value
	 * @param string $meta_key   Optional, you can provide a meta key to update it
 *
	 * @return bool True on successful update, false on failure.
	 */
	public function update_metadata_by_mid($meta_type, $meta_id, $meta_value, $meta_key = false) {
		global $wpdb;

		// Make sure everything is valid.
		if (!$meta_type || !is_numeric($meta_id)) {
			return false;
		}

		$meta_id = absint($meta_id);
		if (!$meta_id) {
			return false;
		}

		$table = $this->_get_meta_table($meta_type);
		if (!$table) {
			return false;
		}

		$column = sanitize_key($meta_type.'_id');
		$id_column = 'user' == $meta_type ? 'umeta_id' : 'meta_id';

		// Fetch the meta and go on if it's found.
		if ($meta = $this->get_metadata_by_mid($meta_type, $meta_id)) {
			$original_key = $meta->meta_key;
			$object_id = $meta->{$column};

			// If a new meta_key (last parameter) was specified, change the meta key,
			// otherwise use the original key in the update statement.
			if (false === $meta_key) {
				$meta_key = $original_key;
			} elseif (!is_string($meta_key)) {
				return false;
			}

			// Sanitize the meta
			$_meta_value = $meta_value;
			$meta_value = $this->sanitize_meta($meta_key, $meta_value, $meta_type);
			$meta_value = UpdraftCentral()->maybe_json_encode($meta_value);

			// Format the data query arguments.
			$data = array(
				'meta_key' => $meta_key,
				'meta_value' => $meta_value,
			);

			// Format the where query arguments.
			$where = array();
			$where[$id_column] = $meta_id;

			/* This action is documented in wp-includes/meta.php */
			do_action("update_{$meta_type}_meta", $meta_id, $object_id, $meta_key, $_meta_value);

			if ('post' == $meta_type) {
				/* This action is documented in wp-includes/meta.php */
				do_action('update_postmeta', $meta_id, $object_id, $meta_key, $meta_value);
			}

			// Run the update query, all fields in $data are %s, $where is a %d.
			$result = $wpdb->update($table, $data, $where, '%s', '%d');
			if (!$result)
				return false;

			// Clear the caches.
			wp_cache_delete($object_id, $meta_type.'_meta');

			/* This action is documented in wp-includes/meta.php */
			do_action("updated_{$meta_type}_meta", $meta_id, $object_id, $meta_key, $_meta_value);

			if ('post' == $meta_type) {
				/* This action is documented in wp-includes/meta.php */
				do_action('updated_postmeta', $meta_id, $object_id, $meta_key, $meta_value);
			}

			return true;
		}

		// And if the meta was not found.
		return false;
	}

	/**
	 * Delete meta data by meta ID.
	 *
	 * @since 3.3.0
	 *
	 * @global wpdb $wpdb WordPress database abstraction object.
	 *
	 * @param string $meta_type Type of object metadata is for (e.g., comment, post, term, or user).
	 * @param int    $meta_id   ID for a specific meta row
 *
	 * @return bool True on successful delete, false on failure.
	 */
	public function delete_metadata_by_mid($meta_type, $meta_id) {
		global $wpdb;

		// Make sure everything is valid.
		if (!$meta_type || !is_numeric($meta_id)) {
			return false;
		}

		$meta_id = absint($meta_id);
		if (!$meta_id) {
			return false;
		}

		$table = $this->_get_meta_table($meta_type);
		if (!$table) {
			return false;
		}

		// object and id columns
		$column = sanitize_key($meta_type.'_id');
		$id_column = 'user' == $meta_type ? 'umeta_id' : 'meta_id';

		// Fetch the meta and go on if it's found.
		if ($meta = $this->get_metadata_by_mid($meta_type, $meta_id)) {
			$object_id = $meta->{$column};

			/* This action is documented in wp-includes/meta.php */
			do_action("delete_{$meta_type}_meta", (array) $meta_id, $object_id, $meta->meta_key, $meta->meta_value);

			// Old-style action.
			if ('post' == $meta_type || 'comment' == $meta_type) {
				/*
				* Fires immediately before deleting post or comment metadata of a specific type.
				*
				* The dynamic portion of the hook, `$meta_type`, refers to the meta
				* object type (post or comment).
				*
				* @since 3.4.0
				*
				* @param int $meta_id ID of the metadata entry to delete.
				*/
				do_action("delete_{$meta_type}meta", $meta_id);
			}

			// Run the query, will return true if deleted, false otherwise
			$result = (bool) $wpdb->delete($table, array($id_column => $meta_id));

			// Clear the caches.
			wp_cache_delete($object_id, $meta_type.'_meta');

			/* This action is documented in wp-includes/meta.php */
			do_action("deleted_{$meta_type}_meta", (array) $meta_id, $object_id, $meta->meta_key, $meta->meta_value);

			// Old-style action.
			if ('post' == $meta_type || 'comment' == $meta_type) {
				/*
				* Fires immediately after deleting post or comment metadata of a specific type.
				*
				* The dynamic portion of the hook, `$meta_type`, refers to the meta
				* object type (post or comment).
				*
				* @since 3.4.0
				*
				* @param int $meta_ids Deleted metadata entry ID.
				*/
				do_action("deleted_{$meta_type}meta", $meta_id);
			}

			return $result;

		}

		// Meta id was not found.
		return false;
	}

	/**
	 * Update the metadata cache for the specified objects.
	 *
	 * @since 2.9.0
	 *
	 * @global wpdb $wpdb WordPress database abstraction object.
	 *
	 * @param string    $meta_type  Type of object metadata is for (e.g., comment, post, or user)
	 * @param int|array $object_ids Array or comma delimited list of object IDs to update cache for
 *
	 * @return array|false Metadata cache for the specified objects, or false on failure.
	 */
	public function update_meta_cache($meta_type, $object_ids) {
		global $wpdb;

		if (!$meta_type || !$object_ids) {
			return false;
		}

		$table = $this->_get_meta_table($meta_type);
		if (!$table) {
			return false;
		}

		$column = sanitize_key($meta_type.'_id');

		if (!is_array($object_ids)) {
			$object_ids = preg_replace('|[^0-9,]|', '', $object_ids);
			$object_ids = explode(',', $object_ids);
		}

		$object_ids = array_map('intval', $object_ids);

		$cache_key = $meta_type.'_meta';
		$ids = array();
		$cache = array();
		foreach ($object_ids as $id) {
			$cached_object = wp_cache_get($id, $cache_key);
			if (false === $cached_object)
				$ids[] = $id;
			else
				$cache[$id] = $cached_object;
		}

		if (empty($ids))
			return $cache;

		// Get meta info
		$id_list = implode(',', $ids);
		$id_column = 'user' == $meta_type ? 'umeta_id' : 'meta_id';
		$meta_list = $wpdb->get_results("SELECT $column, meta_key, meta_value FROM $table WHERE $column IN ($id_list) ORDER BY $id_column ASC", ARRAY_A);

		if (!empty($meta_list)) {
			foreach ($meta_list as $metarow) {
				$mpid = intval($metarow[$column]);
				$mkey = $metarow['meta_key'];
				$mval = $metarow['meta_value'];

				// Force subkeys to be array type:
				if (!isset($cache[$mpid]) || !is_array($cache[$mpid]))
					$cache[$mpid] = array();
				if (!isset($cache[$mpid][$mkey]) || !is_array($cache[$mpid][$mkey]))
					$cache[$mpid][$mkey] = array();

				// Add a value to the current pid/key:
				$cache[$mpid][$mkey][] = $mval;
			}
		}

		foreach ($ids as $id) {
			if (!isset($cache[$id]))
				$cache[$id] = array();
			wp_cache_add($id, $cache[$id], $cache_key);
		}

		return $cache;
	}

	/**
	 * Given a meta query, generates SQL clauses to be appended to a main query.
	 *
	 * @since 3.2.0
	 * @see WP_Meta_Query
	 *
	 * @param array $meta_query         A meta query.
	 * @param string $type              Type of meta.
	 * @param string $primary_table     Primary database table name.
	 * @param string $primary_id_column Primary ID column name.
	 * @param object $context           Optional. The main query object
 *
	 * @return array Associative array of `JOIN` and `WHERE` SQL.
	 */
	public function get_meta_sql($meta_query, $type, $primary_table, $primary_id_column, $context = null) {
		$meta_query_obj = new WP_Meta_Query($meta_query);

		return $meta_query_obj->get_sql($type, $primary_table, $primary_id_column, $context);
	}

	/**
	 * Determine whether a meta key is protected.
	 *
	 * @since 3.1.3
	 *
	 * @param string      $meta_key Meta key
	 * @param string|null $meta_type
 *
	 * @return bool True if the key is protected, false otherwise.
	 */
	public function is_protected_meta($meta_key, $meta_type = null) {
		$protected = ('_' == $meta_key[0]);

		/*
		* Filter whether a meta key is protected.
		*
		* @since 3.2.0
		*
		* @param bool   $protected Whether the key is protected. Default false.
		* @param string $meta_key  Meta key.
		* @param string $meta_type Meta type.
		*/
		return apply_filters('is_protected_meta', $protected, $meta_key, $meta_type);
	}

	/**
	 * Sanitize meta value.
	 *
	 * @since 3.1.3
	 *
	 * @param string $meta_key   Meta key
	 * @param mixed  $meta_value Meta value to sanitize
	 * @param string $meta_type  Type of meta
 *
	 * @return mixed Sanitized $meta_value
	 */
	public function sanitize_meta($meta_key, $meta_value, $meta_type) {

		/*
		* Filter the sanitization of a specific meta key of a specific meta type.
		*
		* The dynamic portions of the hook name, `$meta_type`, and `$meta_key`,
		* refer to the metadata object type (comment, post, or user) and the meta
		* key value,
		* respectively.
		*
		* @since 3.3.0
		*
		* @param mixed  $meta_value Meta value to sanitize.
		* @param string $meta_key   Meta key.
		* @param string $meta_type  Meta type.
		*/
		return apply_filters("sanitize_{$meta_type}_meta_{$meta_key}", $meta_value, $meta_key, $meta_type);
	}

	/**
	 * Register meta key.
	 *
	 * @since 3.3.0
	 *
	 * @param string       $meta_type         Type of meta
	 * @param string       $meta_key          Meta key
	 * @param string|array $sanitize_callback A public function or method to call when sanitizing the value of $meta_key.
	 * @param string|array $auth_callback     Optional. A public function or method to call when performing edit_post_meta, add_post_meta, and delete_post_meta capability checks.
	 */
	public function register_meta($meta_type, $meta_key, $sanitize_callback, $auth_callback = null) {
		if (is_callable($sanitize_callback))
			add_filter("sanitize_{$meta_type}_meta_{$meta_key}", $sanitize_callback, 10, 3);

		if (empty($auth_callback)) {
			if ($this->is_protected_meta($meta_key, $meta_type))
				$auth_callback = '__return_false';
			else
				$auth_callback = '__return_true';
		}

		if (is_callable($auth_callback))
			add_filter("auth_{$meta_type}_meta_{$meta_key}", $auth_callback, 10, 6);
	}
}
