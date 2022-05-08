<?php
if (!defined('ABSPATH')) die('Access denied.');

if (!class_exists('WP_REST_Terms_Controller')) {
	include_once ABSPATH . 'wp-includes/rest-api/endpoints/class-wp-rest-terms-controller.php';
}

/**
 * UpdraftCentral_REST_Terms_Controller class. Used to override some basic response
 * details to integrate the remote term information.
 *
 * Originally copied and edited from WP_REST_Terms_Controller (WordPress 5.0.3). Updated
 * to support higher versions up to WordPress 5.4.
 *
 * @see WP_REST_Terms_Controller
 */
class UpdraftCentral_REST_Terms_Controller extends WP_REST_Terms_Controller {

	public function __construct($taxonomy) {
		parent::__construct($taxonomy);
	}

	/**
	 * Prepares a single term output for response.
	 *
	 * @since 4.7.0
	 *
	 * @param obj             $item    Term object.
	 * @param WP_REST_Request $request Request object.
	 * @param array           $misc    Array containing remote term data.
	 * @return WP_REST_Response $response Response object.
	 */
	public function prepare_remote_item_for_response($item, $request, $misc) {

		$fields = $this->get_fields_for_response($request);
		$params = $request->get_params();
		$data   = array();

		// If we have an array then make sure that it is converted to object
		$item = $this->maybe_convert_to_object($item);

		if (in_array('id', $fields, true)) {
			$data['id'] = (int) $item->term_id;
		}

		if (in_array('count', $fields, true)) {
			$data['count'] = (int) $item->count;
		}

		if (in_array('description', $fields, true)) {
			$data['description'] = $item->description;
		}

		if (in_array('link', $fields, true)) {
			$data['link'] = $misc['link'];
		}

		if (in_array('name', $fields, true)) {
			$data['name'] = $item->name;
		}

		if (in_array('slug', $fields, true)) {
			$data['slug'] = $item->slug;
		}

		if (in_array('taxonomy', $fields, true)) {
			$data['taxonomy'] = $item->taxonomy;
		}

		if (in_array('parent', $fields, true)) {
			$data['parent'] = (int) $item->parent;
		}

		if (in_array('meta', $fields, true)) {
			$data['meta'] = $this->meta->get_value($item->term_id, $request);
		}

		$context = !empty($request['context']) ? $request['context'] : 'view';
		$data    = $this->add_additional_fields_to_object($data, $request);
		$data    = $this->filter_response_by_context($data, $context);

		$response = rest_ensure_response($data);
		if (empty($params['_fields']) || (is_array($params['_fields']) && in_array('_links', $params['_fields']))) {
			$response->add_links($this->prepare_remote_links($item, $misc));
		}

		return $response;
	}

	/**
	 * Prepares remote links for the request.
	 *
	 * @param object $term Term object.
	 * @param array  $misc Miscellaneous data for the Term object
	 * @return array Links for the given term.
	 */
	private function prepare_remote_links($term, $misc) {
		$base = $this->namespace . '/' . $this->rest_base;
		$links = array(
			'self'       => array(
				'href' => rest_url(trailingslashit($base) . $term->term_id),
			),
			'collection' => array(
				'href' => rest_url($base),
			),
			'about'      => array(
				'href' => rest_url(sprintf('wp/v2/taxonomies/%s', $this->taxonomy)),
			),
		);

		if ($term->parent) {
			$parent_term = $misc['parent_term'];
			if (!empty($parent_term)) {
				$parent_term = $this->maybe_convert_to_object(json_decode($parent_term));
				$links['up'] = array(
					'href'       => rest_url(trailingslashit($base) . $parent_term->term_id),
					'embeddable' => true,
				);
			}
		}

		$taxonomy_obj = $this->maybe_convert_to_object($misc['taxonomy_obj']);
		if (empty($taxonomy_obj->object_type)) {
			return $links;
		}

		$post_type_links = array();
		foreach ($taxonomy_obj->object_type as $type) {
			if (!in_array(strtolower($type), array('post', 'page'))) continue;

			$post_type_object = get_post_type_object($type);
			if (empty($post_type_object) || empty($post_type_object->show_in_rest)) {
				continue;
			}

			$rest_base = !empty($post_type_object->rest_base) ? $post_type_object->rest_base : $post_type_object->name;
			$post_type_links[] = array(
				'href' => add_query_arg($this->rest_base, $term->term_id, rest_url(sprintf('wp/v2/%s', $rest_base))),
			);
		}

		if (!empty($post_type_links)) {
			$links['https://api.w.org/post_type'] = $post_type_links;
		}

		return $links;
	}

	/**
	 * Convert an array of data into its object representation
	 *
	 * @param array $item Item to check and convert into object
	 * @return object
	 */
	private function maybe_convert_to_object($item) {
		if (!empty($item) && is_array($item)) {
			$term = new stdClass();
			foreach ($item as $key => $value) {
				if (!empty($value) && is_array($value)) {
					$this->maybe_convert_to_object($value);
				} else {
					$term->{$key} = $value;
				}
			}
			$item = $term;
		}

		return $item;
	}
}
