<?php
if (!defined('ABSPATH')) die('Access denied.');

if (!class_exists('WP_REST_Posts_Controller')) {
	include_once ABSPATH . 'wp-includes/rest-api/endpoints/class-wp-rest-posts-controller.php';
}

/**
 * UpdraftCentral_REST_Posts_Controller class. Used to override some basic response
 * details to integrate the remote post information.
 *
 * Originally copied and edited from WP_REST_Posts_Controller (WordPress 5.0.3). Updated
 * to support higher versions up to WordPress 5.4.
 *
 * @see WP_REST_Posts_Controller
 */
class UpdraftCentral_REST_Posts_Controller extends WP_REST_Posts_Controller {

	public function __construct($post_type) {
		parent::__construct($post_type);
	}

	/**
	 * Prepares a single post output for response.
	 *
	 * @since 4.7.0
	 *
	 * @param object          $post_obj	A simple (stdClass) object containing basic (public) properties of a remote post object.
	 * @param WP_REST_Request $request 	Request object.
	 * @param array           $misc    	Array containing remote post data.
	 * @return WP_REST_Response Response object.
	 */
	public function prepare_remote_item_for_response($post_obj, $request, $misc) {
		// Make sure that we have a WP_Post object before proceeding
		// with the rest of the process below.
		$post = new WP_Post($post_obj);

		$fields = $this->get_fields_for_response($request);

		// Base fields for every post.
		$data = array();

		if ((function_exists('rest_is_field_included') && rest_is_field_included('id', $fields)) || in_array('id', $fields, true)) {
			$data['id'] = (int) $post->ID;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('date', $fields)) || in_array('date', $fields, true)) {
			$data['date'] = $this->prepare_date_response($post->post_date_gmt, $post->post_date);
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('date_gmt', $fields)) || in_array('date_gmt', $fields, true)) {
			/*
			 * For drafts, `post_date_gmt` may not be set, indicating that the date
			 * of the draft should be updated each time it is saved (see #38883).
			 * In this case, shim the value based on the `post_date` field
			 * with the site's timezone offset applied.
			 */
			if ('0000-00-00 00:00:00' === $post->post_date_gmt) {
				$post_date_gmt = get_gmt_from_date($post->post_date);
			} else {
				$post_date_gmt = $post->post_date_gmt;
			}
			$data['date_gmt'] = $this->prepare_date_response($post_date_gmt);
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('guid', $fields)) || in_array('guid', $fields, true)) {
			$data['guid'] = array(
				/** This filter is documented in wp-includes/post-template.php */
				'rendered' => $misc['guid_rendered'],
				'raw'      => $post->guid,
			);
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('modified', $fields)) || in_array('modified', $fields, true)) {
			$data['modified'] = $this->prepare_date_response($post->post_modified_gmt, $post->post_modified);
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('modified_gmt', $fields)) || in_array('modified_gmt', $fields, true)) {
			/*
			 * For drafts, `post_modified_gmt` may not be set (see `post_date_gmt` comments
			 * above). In this case, shim the value based on the `post_modified` field
			 * with the site's timezone offset applied.
			 */
			if ('0000-00-00 00:00:00' === $post->post_modified_gmt) {
				$post_modified_gmt = gmdate('Y-m-d H:i:s', strtotime($post->post_modified) - (get_option('gmt_offset') * 3600));
			} else {
				$post_modified_gmt = $post->post_modified_gmt;
			}
			$data['modified_gmt'] = $this->prepare_date_response($post_modified_gmt);
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('password', $fields)) || in_array('password', $fields, true)) {
			$data['password'] = $post->post_password;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('slug', $fields)) || in_array('slug', $fields, true)) {
			$data['slug'] = $post->post_name;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('status', $fields)) || in_array('status', $fields, true)) {
			$data['status'] = $post->post_status;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('type', $fields)) || in_array('type', $fields, true)) {
			$data['type'] = $post->post_type;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('link', $fields)) || in_array('link', $fields, true)) {
			$data['link'] = $misc['link'];
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('title', $fields)) || in_array('title', $fields, true)) {
			$data['title'] = array(
				'raw'      => $post->post_title,
				'rendered' => $misc['title_rendered'],
			);
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('content', $fields)) || in_array('content', $fields, true)) {
			$data['content'] = array(
				'raw'           => $post->post_content,
				/** This filter is documented in wp-includes/post-template.php */
				'rendered'      => $misc['post_password_required'] ? '' : $misc['content_rendered'],
				'protected'     => (bool) $post->post_password,
				'block_version' => block_version($post->post_content),
			);
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('excerpt', $fields)) || in_array('excerpt', $fields, true)) {
			/** This filter is documented in wp-includes/post-template.php */
			$excerpt = $misc['excerpt'];
			$data['excerpt'] = array(
				'raw'       => $post->post_excerpt,
				'rendered'  => $misc['post_password_required'] ? '' : $excerpt,
				'protected' => (bool) $post->post_password,
			);
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('author', $fields)) || in_array('author', $fields, true)) {
			$data['author'] = (int) $post->post_author;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('featured_media', $fields)) || in_array('featured_media', $fields, true)) {
			$data['featured_media'] = (int) $misc['featured_media'];
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('parent', $fields)) || in_array('parent', $fields, true)) {
			$data['parent'] = (int) $post->post_parent;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('menu_order', $fields)) || in_array('menu_order', $fields, true)) {
			$data['menu_order'] = (int) $post->menu_order;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('comment_status', $fields)) || in_array('comment_status', $fields, true)) {
			$data['comment_status'] = $post->comment_status;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('ping_status', $fields)) || in_array('ping_status', $fields, true)) {
			$data['ping_status'] = $post->ping_status;
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('sticky', $fields)) || in_array('sticky', $fields, true)) {
			$data['sticky'] = (bool) $misc['sticky'];
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('template', $fields)) || in_array('template', $fields, true)) {
			$template = $misc['template'];
			if ($template) {
				$data['template'] = $template;
			} else {
				$data['template'] = 'default';
			}
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('format', $fields)) || in_array('format', $fields, true)) {
			$data['format'] = $misc['format'];
			if ('false' == $data['format']) $data['format'] = (bool) $data['format'];

			// Fill in blank post format.
			if (empty($data['format'])) {
				$data['format'] = 'standard';
			}
		}

		if ((function_exists('rest_is_field_included') && rest_is_field_included('meta', $fields)) || in_array('meta', $fields, true)) {
			$data['meta'] = $this->meta->get_value($post->ID, $request);
		}

		// We need categories and tags to show up in all WP version starting from WP 3.4, thus,
		// we're going pass a "show_ui = true" filter to the wp_list_filter function. Filtering other
		// taxonomy that are not meant to be shown in any UI elements or section.
		if (isset($misc['taxonomy_objects'])) {
			$taxonomies = wp_list_filter($misc['taxonomy_objects'], array('show_ui' => 'true'));
	
			foreach ($taxonomies as $taxonomy) {
				$tax_name = $taxonomy['name'];
				$base = !empty($taxonomy['rest_base']) ? $taxonomy['rest_base'] : $tax_name;
	
				if ((function_exists('rest_is_field_included') && rest_is_field_included($base, $fields)) || in_array($base, $fields, true)) {
					$terms = $misc['taxonomy_terms'][$tax_name];
	
					// Making sure that the terms collection is not empty before we add its data to the response.
					if (is_array($terms) && !empty($terms)) {
						// Get the first term element and validate if it's an array, it's not empty and it is the one we expected
						$term_0 = reset($terms);
						if (is_array($term_0) && !empty($term_0) && isset($term_0['term_id'])) {
							$terms = array_values(wp_list_pluck($terms, 'term_id'));
							foreach ($terms as $key => $value) {
								if (!empty($value)) {
									$terms[$key] = (int) $value;
								} else {
									// If value is empty, then we remove the empty entry
									// from the terms collection before returning.
									unset($terms[$key]);
								}
							}
						}
					}
					$data[$base] = $terms ? $terms : array();
				}
			}
		}

		if ((bool) $misc['post_type_viewable'] && (bool) $misc['post_type_public']) {
			$sample_permalink = $misc['sample_permalink'];
			if ((function_exists('rest_is_field_included') && rest_is_field_included('permalink_template', $fields)) || in_array('permalink_template', $fields, true)) {
				$data['permalink_template'] = $sample_permalink[0];
			}
			if ((function_exists('rest_is_field_included') && rest_is_field_included('generated_slug', $fields)) || in_array('generated_slug', $fields, true)) {
				$data['generated_slug'] = $sample_permalink[1];
			}
		}

		$context = !empty($request['context']) ? $request['context'] : 'view';
		$data    = $this->add_additional_fields_to_object($data, $request);
		$data    = $this->filter_response_by_context($data, $context);

		// Wrap the data in a response object.
		$response = rest_ensure_response($data);

		$links = $this->prepare_remote_links($post, $misc);
		$response->add_links($links);

		if (!empty($links['self']['href'])) {
			$actions = $this->get_available_remote_actions($post, $request, $misc);

			$self = $links['self']['href'];
			foreach ($actions as $rel) {
				$response->add_link($rel, $self);
			}
		}

		return $response;
	}

	/**
	 * Prepares remote links for the request.
	 *
	 * @param WP_Post $post Post object.
	 * @param array   $misc Miscellaneous data for the Post object
	 * @return array Links for the given post.
	 */
	private function prepare_remote_links($post, $misc) {
		$base = sprintf('%s/%s', $this->namespace, $this->rest_base);

		// Entity meta.
		$links = array(
			'self' => array(
				'href'   => rest_url(trailingslashit($base) . $post->ID),
			),
			'collection' => array(
				'href'   => rest_url($base),
			),
			'about'      => array(
				'href'   => rest_url('wp/v2/types/' . $this->post_type),
			),
		);

		if ((in_array($post->post_type, array('post', 'page'), true) || (bool) $misc['post_type_supports_authors'])
			&& !empty($post->post_author)) {// phpcs:ignore PEAR.ControlStructures.MultiLineCondition.CloseBracketNewLine
			$links['author'] = array(
				'href'       => rest_url('wp/v2/users/' . $post->post_author),
				'embeddable' => true,
			);
		}

		if (in_array($post->post_type, array('post', 'page'), true) || (bool) $misc['post_type_supports_comments']) {
			$replies_url = rest_url('wp/v2/comments');
			$replies_url = add_query_arg('post', $post->ID, $replies_url);

			$links['replies'] = array(
				'href'       => $replies_url,
				'embeddable' => true,
			);
		}

		if (in_array($post->post_type, array('post', 'page'), true) || (bool) $misc['post_type_supports_revisions']) {
			if (isset($misc['post_revisions']) && is_array($misc['post_revisions'])) {
				$revisions       = $misc['post_revisions'];
				$revisions_count = count($revisions);
	
				$links['version-history'] = array(
					'href'  => rest_url(trailingslashit($base) . $post->ID . '/revisions'),
					'count' => $revisions_count,
				);
	
				if ($revisions_count > 0) {
					$last_revision = array_shift($revisions);
	
					$links['predecessor-version'] = array(
						'href' => rest_url(trailingslashit($base) . $post->ID . '/revisions/' . $last_revision),
						'id'   => $last_revision,
					);
				}
			}
		}

		if ((bool) $misc['post_type_hierarchical'] && !empty($post->post_parent)) {
			$links['up'] = array(
				'href'       => rest_url(trailingslashit($base) . (int) $post->post_parent),
				'embeddable' => true,
			);
		}

		// If we have a featured media, add that.
		if ($featured_media = $misc['post_thumbnail_id']) {
			$image_url = rest_url('wp/v2/media/' . $featured_media);

			$links['https://api.w.org/featuredmedia'] = array(
				'href'       => $image_url,
				'embeddable' => true,
			);
		}

		if (!in_array($post->post_type, array('attachment', 'nav_menu_item', 'revision'), true)) {
			$attachments_url = rest_url('wp/v2/media');
			$attachments_url = add_query_arg('parent', $post->ID, $attachments_url);

			$links['https://api.w.org/attachment'] = array(
				'href' => $attachments_url,
			);
		}

		if (isset($misc['taxonomy_names'])) {
			$taxonomies = $misc['taxonomy_names'];
			if (!empty($taxonomies)) {
				$links['https://api.w.org/term'] = array();
	
				foreach ($taxonomies as $tax) {
					if (!empty($misc['taxonomy_objects']) && isset($misc['taxonomy_objects'][$tax])) {
						$taxonomy_obj = $misc['taxonomy_objects'][$tax];
	
						// Skip taxonomies that are not public.
						if (empty($taxonomy_obj['show_in_rest']) || !json_decode($taxonomy_obj['show_in_rest'])) {
							continue;
						}
	
						$tax_base = !empty($taxonomy_obj['rest_base']) ? $taxonomy_obj['rest_base'] : $tax;
						$terms_url = add_query_arg(
							'post',
							$post->ID,
							rest_url('wp/v2/' . $tax_base)
						);
	
						$links['https://api.w.org/term'][] = array(
							'href'       => $terms_url,
							'taxonomy'   => $tax,
							'embeddable' => true,
						);
					}
				}
			}
		}

		return $links;
	}

	/**
	 * Get available remote actions
	 *
	 * @param WP_Post         $post    Post object.
	 * @param WP_REST_Request $request Request object.
	 * @param array           $misc    Miscellaneous data for the Post object
	 * @return array Action links for the given post.
	 */
	private function get_available_remote_actions($post, $request, $misc) {
		if ('edit' !== $request['context']) {
			return array();
		}

		$rels = array();

		if ('attachment' !== $this->post_type && (bool) $misc['can_publish_posts']) {
			$rels[] = 'https://api.w.org/action-publish';
		}

		if ((bool) $misc['can_unfiltered_html']) {
			$rels[] = 'https://api.w.org/action-unfiltered-html';
		}

		if ('post' === $misc['post_type_name']) {
			if ((bool) $misc['can_edit_others_posts'] && (bool) $misc['can_publish_posts']) {
				$rels[] = 'https://api.w.org/action-sticky';
			}
		}

		if ((bool) $misc['post_type_supports_authors']) {
			if ((bool) $misc['can_edit_others_posts']) {
				$rels[] = 'https://api.w.org/action-assign-author';
			}
		}

		if (isset($misc['taxonomy_objects'])) {
			$taxonomies = wp_list_filter($misc['taxonomy_objects'], array('show_in_rest' => 'true'));
			foreach ($taxonomies as $tax) {
				$tax_name = $tax['name'];
				$tax_base = !empty($tax['rest_base']) ? $tax['rest_base'] : $tax_name;
	
				if (!empty($misc['taxonomy_caps']) && isset($misc['taxonomy_caps'][$tax_name])) {
					$tax_caps = $misc['taxonomy_caps'][$tax_name];
					$create_cap = (bool) $tax_caps['hierarchical'] ? (bool) $tax_caps['edit_terms'] : (bool) $tax_caps['assign_terms'];
	
					if ($create_cap) {
						$rels[] = 'https://api.w.org/action-create-' . $tax_base;
					}
	
					if ((bool) $tax_caps['assign_terms']) {
						$rels[] = 'https://api.w.org/action-assign-' . $tax_base;
					}
				}
			}
		}

		return $rels;
	}
}
