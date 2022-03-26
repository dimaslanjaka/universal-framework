<?php
if (!defined('ABSPATH')) die('Access denied.');

if (!class_exists('WP_REST_Taxonomies_Controller')) {
	include_once ABSPATH . 'wp-includes/rest-api/endpoints/class-wp-rest-taxonomies-controller.php';
}

/**
 * UpdraftCentral_REST_Taxonomies_Controller class. Used to override some basic response
 * details to integrate the remote taxonomy information.
 *
 * Originally copied and edited from WP_REST_Taxonomies_Controller (WordPress 5.0.3). Updated
 * to support higher versions up to WordPress 5.4.
 *
 * @see WP_REST_Taxonomies_Controller
 */
class UpdraftCentral_REST_Taxonomies_Controller extends WP_REST_Taxonomies_Controller {

	public function __construct() {
		parent::__construct();
	}

	/**
	 * Prepares a taxonomy object for serialization.
	 *
	 * @since 4.7.0
	 *
	 * @param stdClass        $taxonomy Taxonomy data.
	 * @param WP_REST_Request $request  Full details about the request.
	 * @return WP_REST_Response Response object.
	 */
	public function prepare_remote_item_for_response($taxonomy, $request) {
		$base = !empty($taxonomy['rest_base']) ? $taxonomy['rest_base'] : $taxonomy['name'];

		$fields = $this->get_fields_for_response($request);
		$data = array();

		if (in_array('name', $fields, true)) {
			$data['name'] = $taxonomy['label'];
		}

		if (in_array('slug', $fields, true)) {
			$data['slug'] = $taxonomy['name'];
		}

		if (in_array('capabilities', $fields, true)) {
			$data['capabilities'] = $taxonomy['cap'];
		}

		if (in_array('description', $fields, true)) {
			$data['description'] = $taxonomy['description'];
		}

		if (in_array('labels', $fields, true)) {
			$data['labels'] = $taxonomy['labels'];
		}

		if (in_array('types', $fields, true)) {
			$data['types'] = $taxonomy['object_type'];
		}

		if (in_array('show_cloud', $fields, true)) {
			$data['show_cloud'] = $taxonomy['show_tagcloud'];
		}

		if (in_array('hierarchical', $fields, true)) {
			$data['hierarchical'] = $taxonomy['hierarchical'];
		}

		if (in_array('rest_base', $fields, true)) {
			$data['rest_base'] = $base;
		}

		if (in_array('visibility', $fields, true)) {
			$data['visibility'] = array(
				'public'             => (bool) $taxonomy['public'],
				'publicly_queryable' => (bool) $taxonomy['publicly_queryable'],
				'show_admin_column'  => (bool) $taxonomy['show_admin_column'],
				'show_in_nav_menus'  => (bool) $taxonomy['show_in_nav_menus'],
				'show_in_quick_edit' => (bool) $taxonomy['show_in_quick_edit'],
				'show_ui'            => (bool) $taxonomy['show_ui'],
			);
		}

		$context = !empty($request['context']) ? $request['context'] : 'view';
		$data = $this->add_additional_fields_to_object($data, $request);
		$data = $this->filter_response_by_context($data, $context);

		// Wrap the data in a response object.
		$response = rest_ensure_response($data);

		$response->add_links(array(
			'collection'                => array(
				'href'                  => rest_url(sprintf('%s/%s', $this->namespace, $this->rest_base)),
			),
			'https://api.w.org/items'   => array(
				'href'                  => rest_url(sprintf('wp/v2/%s', $base)),
			),
		));

		return $response;
	}
}
