<?php
if (!defined('ABSPATH')) die('Access denied.');

if (!class_exists('UpdraftCentral_Editor')) :

/**
 * UpdraftCentral_Editor class.
 *
 * Primarily used for loading the classic and block editor resources and handles UpdraftCentral's REST
 * requests using the block editor to edit remote pages or posts.
 */
class UpdraftCentral_Editor {

	public $type = '';

	protected static $_instance = null;

	/**
	 * Initialize prechecks and hooks for this editor class
	 *
	 * @return void
	 */
	public function load() {
		if (!class_exists('UpdraftCentral_REST_Posts_Controller')) include_once UD_CENTRAL_DIR.'/classes/class-rest-posts-controller.php';
		if (!class_exists('UpdraftCentral_REST_Users_Controller')) include_once UD_CENTRAL_DIR.'/classes/class-rest-users-controller.php';
		if (!class_exists('UpdraftCentral_REST_Taxonomies_Controller')) include_once UD_CENTRAL_DIR.'/classes/class-rest-taxonomies-controller.php';
		if (!class_exists('UpdraftCentral_REST_Terms_Controller')) include_once UD_CENTRAL_DIR.'/classes/class-rest-terms-controller.php';

		add_filter('rest_pre_dispatch', array($this, 'intercept_request_data'), 0, 3);
		add_action('updraftcentral_load_dashboard_js', array($this, 'enqueue_editor_scripts'));
	}

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
	 * Saves placeholder details for later use and enqueus needed resources
	 *
	 * @return void
	 */
	public function enqueue_editor_scripts() {
		global $post, $post_type, $post_type_object;
		
		// We'll create a dummy post or page with status draft (if not yet created) and return its ID.
		// We will used this post or page object to preload any scripts needed by the editor later on, since
		// ajax-based calls will no longer have that opporturnity to load resources (which is only done during page load).
		$post_id = $this->get_placeholder_id($this->type);
		if (!empty($post_id)) {
			$post = get_post($post_id);

			$post_type = get_post_type($post);
			$post_type_object = get_post_type_object($post_type);

			if (!function_exists('get_current_screen')) {
				include_once(ABSPATH . 'wp-admin/includes/screen.php');
				include_once ABSPATH . 'wp-admin/includes/template.php';
			}

			if (!function_exists('get_page_templates')) {
				include_once ABSPATH . 'wp-admin/includes/theme.php';
			}

			$this->load_block_editor_resources();
		}

		$min_or_not = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
		wp_enqueue_script('postbox', admin_url("js/postbox".$min_or_not.".js"), array('jquery-ui-sortable'), UpdraftCentral()->version, 1);
	}

	/**
	 * Loads block editor resources. Copied from wp-admin/edit-form-blocks.php (WP 5.0) and made
	 * some adjustments (remove and alter lines) to prevent loading the editor prematurely, as we need it to load
	 * on demand basing on the current page/post selected. Updated to support WP 5.4 changes.
	 *
	 * N.B. Applies to WP 5.0 and later only (that is for the core-integrated version).
	 *
	 * @return void
	 */
	private function load_block_editor_resources() {
		global $post_type_object, $post, $wp_meta_boxes;

		/*
		 * Emoji replacement is disabled for now, until it plays nicely with React.
		 */
		remove_action('admin_print_scripts', 'print_emoji_detection_script');

		/*
		 * Block editor implements its own Options menu for toggling Document Panels.
		 */
		add_filter('screen_options_show_screen', '__return_false');

		wp_enqueue_script('heartbeat');
		wp_enqueue_script('wp-edit-post');
		wp_enqueue_script('wp-format-library');

		// Get admin url for handling meta boxes.
		$meta_box_nonce = wp_create_nonce('meta-box-loader');

		$meta_box_url = admin_url('post.php');
		$meta_box_url = add_query_arg(
			array(
				'post'            => $post->ID,
				'action'          => 'edit',
				'meta-box-loader' => true,
				'meta-box-loader-nonce'	=> $meta_box_nonce,
				'_wpnonce'        		=> $meta_box_nonce,	// Supports legacy code prior to 5.4
			),
			$meta_box_url
		);
		wp_add_inline_script(
			'wp-editor',
			sprintf('var _wpMetaBoxUrl = %s;', wp_json_encode($meta_box_url)),
			'before'
		);

		/*
		 * Initialize the editor.
		 */

		$align_wide    = get_theme_support('align-wide');
		$color_palette = current((array) get_theme_support('editor-color-palette'));
		$font_sizes    = current((array) get_theme_support('editor-font-sizes'));
		$gradient_presets = current((array) get_theme_support('editor-gradient-presets'));
		$custom_line_height = get_theme_support('custom-line-height');
		$custom_units = get_theme_support('custom-units');

		/**
		 * Filters the allowed block types for the editor, defaulting to true (all
		 * block types supported).
		 *
		 * @since 5.0.0
		 *
		 * @param bool|array $allowed_block_types Array of block type slugs, or
		 *                                        boolean to enable/disable all.
		 * @param WP_Post $post                    The post resource data.
		 */
		$allowed_block_types = apply_filters('allowed_block_types', true, $post);

		/*
		 * Get all available templates for the post/page attributes meta-box.
		 * The "Default template" array element should only be added if the array is
		 * not empty so we do not trigger the template select element without any options
		 * besides the default value.
		 */
		$available_templates = wp_get_theme()->get_page_templates(get_post($post->ID));
		$available_templates = !empty($available_templates) ? array_merge(array('' => apply_filters('default_page_template_title', __('Default template'), 'rest-api')), $available_templates) : $available_templates;

		// Media settings.
		$max_upload_size = wp_max_upload_size();
		if (!$max_upload_size) {
			$max_upload_size = 0;
		}

		// Image sizes.

		/** This filter is documented in wp-admin/includes/media.php */
		$image_size_names = apply_filters(
			'image_size_names_choose',
			array(
				'thumbnail' => __('Thumbnail'),
				'medium'    => __('Medium'),
				'large'     => __('Large'),
				'full'      => __('Full Size'),
			)
		);

		$available_image_sizes = array();
		foreach ($image_size_names as $image_size_slug => $image_size_name) {
			$available_image_sizes[] = array(
				'slug' => $image_size_slug,
				'name' => $image_size_name,
			);
		}

		$image_dimensions = array();
		if (function_exists('wp_get_registered_image_subsizes')) {
			$all_sizes = wp_get_registered_image_subsizes();
			foreach ($available_image_sizes as $size) {
				$key = $size['slug'];
				if (isset($all_sizes[$key])) {
					$image_dimensions[$key] = $all_sizes[$key];
				}
			}
		}

		if (!function_exists('wp_check_post_lock')) {
			include_once ABSPATH.'wp-admin/includes/post.php';
		}

		// Lock settings.
		$user_id = wp_check_post_lock($post->ID);
		if ($user_id) {
			$locked = false;

			/** This filter is documented in wp-admin/includes/post.php */
			if (apply_filters('show_post_locked_dialog', true, $post, $user_id)) {
				$locked = true;
			}

			$user_details = null;
			if ($locked) {
				$user         = get_userdata($user_id);
				$user_details = array(
					'name' => $user->display_name,
				);
			}

			$lock_details = array(
				'isLocked' => $locked,
				'user'     => $user_details,
			);
		} else {
			// Lock the post.
			$active_post_lock = wp_set_post_lock($post->ID);
			if ($active_post_lock) {
				$active_post_lock = esc_attr(implode(':', $active_post_lock));
			}

			$lock_details     = array(
				'isLocked'       => false,
				'activePostLock' => $active_post_lock,
			);
		}

		/**
		 * Filters the body placeholder text.
		 *
		 * @since 5.0.0
		 *
		 * @param string  $text Placeholder text. Default 'Start writing or type / to choose a block'.
		 * @param WP_Post $post Post object.
		 */
		$body_placeholder = apply_filters('write_your_story', __('Start writing or type / to choose a block'), $post);

		$editor_settings = array(
			'alignWide'              => $align_wide,
			'availableTemplates'     => $available_templates,
			'allowedBlockTypes'      => $allowed_block_types,
			'disableCustomColors'    => get_theme_support('disable-custom-colors'),
			'disableCustomFontSizes' => get_theme_support('disable-custom-font-sizes'),
			'disableCustomGradients' => get_theme_support('disable-custom-gradients'),
			'disablePostFormats'     => ! current_theme_supports('post-formats'),
			/** This filter is documented in wp-admin/edit-form-advanced.php */
			'titlePlaceholder'       => apply_filters('enter_title_here', __('Add title'), $post),
			'bodyPlaceholder'        => $body_placeholder,
			'isRTL'                  => is_rtl(),
			'autosaveInterval'       => defined('AUTOSAVE_INTERVAL') ? AUTOSAVE_INTERVAL : 10,
			'maxUploadFileSize'      => $max_upload_size,
			'allowedMimeTypes'       => get_allowed_mime_types(),
			'defaultEditorStyles'    => array(),
			'styles'                 => array(),
			'imageSizes'             => $available_image_sizes,
			'imageDimensions'        => $image_dimensions,
			'richEditingEnabled'     => user_can_richedit(),
			'postLock'               => $lock_details,
			'postLockUtils'          => array(
				'nonce'       => wp_create_nonce('lock-post_' . $post->ID),
				'unlockNonce' => wp_create_nonce('update-post_' . $post->ID),
				'ajaxUrl'     => admin_url('admin-ajax.php'),
			),

			// N.B. We will not support custom fields for now as this will complicate things even further. Perhaps
			// in the near future we will as the need and demand arises.
			'enableCustomFields'     => false,
			'enableCustomLineHeight' => $custom_line_height,
			'enableCustomUnits'      => $custom_units,
		);

		if (class_exists('WP_Block_Patterns_Registry')) {
			$editor_settings['__experimentalBlockPatterns'] = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
		}

		if (class_exists('WP_Block_Pattern_Categories_Registry')) {
			$editor_settings['__experimentalBlockPatternCategories'] = WP_Block_Pattern_Categories_Registry::get_instance()->get_all_registered();
		}

		$autosave = wp_get_post_autosave($post->ID);
		if ($autosave) {
			if (mysql2date('U', $autosave->post_modified_gmt, false) > mysql2date('U', $post->post_modified_gmt, false)) {
				$editor_settings['autosave'] = array(
					'editLink' => get_edit_post_link($autosave->ID),
				);
			} else {
				wp_delete_post_revision($autosave->ID);
			}
		}

		if (false !== $color_palette) {
			$editor_settings['colors'] = $color_palette;
		}

		if (false !== $font_sizes) {
			$editor_settings['fontSizes'] = $font_sizes;
		}

		if (false !== $gradient_presets) {
			$editor_settings['gradients'] = $gradient_presets;
		}

		if (!empty($post_type_object->template)) {
			$editor_settings['template']     = $post_type_object->template;
			$editor_settings['templateLock'] = !empty($post_type_object->template_lock) ? $post_type_object->template_lock : false;
		}

		$is_new_post = false;
		if ('auto-draft' === $post->post_status) {
			$is_new_post = true;
		}

		// If there's no template set on a new post, use the post format, instead.
		if ($is_new_post && !isset($editor_settings['template']) && 'post' === $post->post_type) {
			$post_format = get_post_format($post);
			if (in_array($post_format, array('audio', 'gallery', 'image', 'quote', 'video'), true)) {
				$editor_settings['template'] = array(array("core/$post_format"));
			}
		}

		/**
		 * Scripts
		 */
		wp_enqueue_media(
			array(
				'post' => $post->ID,
			)
		);
		wp_tinymce_inline_scripts();
		wp_enqueue_editor();

		/**
		 * Styles
		 */
		wp_enqueue_style('wp-edit-post');
		wp_enqueue_style('wp-format-library');

		/**
		 * Fires after block assets have been enqueued for the editing interface.
		 *
		 * Call `add_action` on any hook before 'admin_enqueue_scripts'.
		 *
		 * In the function call you supply, simply use `wp_enqueue_script` and
		 * `wp_enqueue_style` to add your functionality to the block editor.
		 *
		 * @since 5.0.0
		 */
		do_action('enqueue_block_editor_assets');

		// In order to duplicate classic meta box behaviour, we need to run the classic meta box actions.
		require_once(ABSPATH . 'wp-admin/includes/meta-boxes.php');
		register_and_do_post_meta_boxes($post);

		// Check if the Custom Fields meta box has been removed at some point.
		if (isset($wp_meta_boxes[$post->post_type]) && isset($wp_meta_boxes[$post->post_type]['normal']) && isset($wp_meta_boxes[$post->post_type]['normal']['core'])) {
			$core_meta_boxes = $wp_meta_boxes[$post->post_type]['normal']['core'];
			if (!isset($core_meta_boxes['postcustom']) || !$core_meta_boxes['postcustom']) {
				unset($editor_settings['enableCustomFields']);
			}
		}

		/**
		 * Filters the settings to pass to the block editor.
		 *
		 * @since 5.0.0
		 *
		 * @param array   $editor_settings Default editor settings.
		 * @param WP_Post $post            Post being edited.
		 */
		$editor_settings = apply_filters('block_editor_settings', $editor_settings, $post);
		update_user_meta(get_current_user_id(), 'updraftcentral_editor_settings', $editor_settings);
	}

	/**
	 * Retrieves the placeholder id created for the current type (e.g. 'post' or 'page')
	 *
	 * @param string $type Determines which type of ID to return (either 'post' or 'page')
	 * @return int|boolean
	 */
	public function get_placeholder_id($type) {
		if (in_array($type, array('page', 'post'))) {
			$post_id = $this->maybe_create_post_and_return_id(array(
				'post_title' => __('UpdraftCentral Editor Placeholder', 'updraftcentral'),
				'post_name' => 'uc-editor-placeholder-'.$type,
				'post_content' => sprintf(__('UpdraftCentral plugin uses this %s as a placeholder when loading the %s editor. You should leave it with "Draft" status.', 'updraftcentral'), $type, $type),
				'post_status' => 'draft',
				'post_type' => $type
			));
			return $post_id;
		}

		return false;
	}

	/**
	 * Sends the command to the remote website
	 *
	 * @param int    $user_id The current user ID
	 * @param string $command The command to process
	 * @param array  $params  The parameters that goes along with the current request
	 * @return array
	 */
	private function send_remote_command($user_id, $command, $params) {
		$user = UpdraftCentral()->get_user_object($user_id);
		if (!empty($user) && !empty($params['site_id'])) {
			$remote_params = array(
				'site_id' => $params['site_id'],
				'data' => array(
					'command' => $command,
					'data' => $params,
				)
			);

			$remote_response = $user->send_remote_command($remote_params);
			if (!empty($remote_response) && 'ok' == $remote_response['responsetype']) {
				if ('rpcok' == $remote_response['rpc_response']['response']) {
					$data = $remote_response['rpc_response']['data'];
					return $data;
				} elseif ('rpcerror' == $remote_response['rpc_response']['response']) {
					return new WP_Error('updraftcentral_rpcerror', __('The remote website responded with an error.', 'updraftcentral'), $remote_response['rpc_response']['data']);
				}
			} else {
				return new WP_Error('updraftcentral_communication_error', __('An error has occurred while communicating to the remote website.', 'updraftcentral'));
			}
		} else {
			return new WP_Error('updraftcentral_missing_fields', __('The required object has not been found.', 'updraftcentral'));
		}
	}

	/**
	 * Returns an instance of an UpdraftCentral_Site_Meta class that is used to manage
	 * our site meta entries
	 *
	 * @return UpdraftCentral_Site_Meta
	 */
	private function get_site_meta_instance() {
		$site_meta = UpdraftCentral()->site_meta;
		if (empty($site_meta)) {
			if (!class_exists('UpdraftCentral_Site_Meta')) include_once UD_CENTRAL_DIR.'/classes/site-meta.php';

			return new UpdraftCentral_Site_Meta(UpdraftCentral()->table_prefix);
		}

		return $site_meta;
	}

	/**
	 * Intercepts request params/data and bypass default (local) processing
	 *
	 * @param mixed           $response Current response, either response or `null` to indicate pass-through.
	 * @param WP_REST_Server  $handler  ResponseHandler instance (usually WP_REST_Server).
	 * @param WP_REST_Request $request  The request that was used to make current response.
	 * @return WP_REST_Response
	 */
	public function intercept_request_data($response, $handler, $request) {

		// Check whether we received an updraftcentral "uc_nonce", "uc_refIds" and "site_id" and "post_type" data. This also helps in preventing any overlap
		// or overwrites when the user is using the Block editor in the WP admin area. Thus, we're only
		// executing the processes below if the current request is made through UpdraftCentral.
		$params = $request->get_params();
		if (empty($params['uc_nonce']) || empty($params['uc_refIds']) || empty($params['site_id']) || empty($params['post_type'])) return $response;

		$uc_nonce = is_array($params['uc_nonce']) ? $params['uc_nonce'][0] : $params['uc_nonce'];
		$uc_refIds = is_array($params['uc_refIds']) ? $params['uc_refIds'][0] : $params['uc_refIds'];
		$site_id = is_array($params['site_id']) ? $params['site_id'][0] : $params['site_id'];
		$post_type = is_array($params['post_type']) ? $params['post_type'][0] : $params['post_type'];

		list($user_id, $post_id) = explode('|', base64_decode($uc_refIds));
		if (empty($user_id) || empty($post_id)) return $response;

		// Verify the nonce submitted
		if (!wp_verify_nonce($uc_nonce, 'updraftcentral-editpost-'.$post_id)) {
			return $response;
		}

		// Pull the (stored) preloaded information from the remote website to be use for the REST request
		// initiated by the UpdraftCentral editor.
		$site_meta = $this->get_site_meta_instance();

		$preloaded_data = $site_meta->get_site_meta($site_id, 'updraftcentral_editor_preloaded_data_'.$post_type, true);
		if (!empty($preloaded_data)) {
			if (isset($preloaded_data['post_data'])) {
				$post_data = $preloaded_data['post_data'];
				$post = $this->setup_remotepost_data($post_data['post'], true);
			}
		}

		$match_result = preg_match('#^/wp/v2/(pages|posts)/([0-9]+)#', $request->get_route(), $matches);
		if (!empty($match_result) && $post) {
			$params = $request->get_params();
			$post_id = $matches[2];

			switch ($request->get_method()) {
				case 'GET':
					$controller = new UpdraftCentral_REST_Posts_Controller($post->post_type);
					$misc = $this->attach_media_to_post($post_data['misc'], $post);

					$response = $controller->prepare_remote_item_for_response($post, $request, $misc);
					break;
				case 'PUT':
					if (!empty($params['featured_media'])) {
						$params['featured_media_url'] = wp_get_attachment_url($params['featured_media']);
						$dir = wp_upload_dir();

						$image_info = wp_get_attachment_metadata($params['featured_media'], true);
						if (is_array($image_info) && !empty($image_info['file'])) {
							$image_file = trailingslashit($dir['basedir']).$image_info['file'];
							if (file_exists($image_file)) {
								$params['featured_media_data'] = base64_encode(file_get_contents($image_file, false, null));
							}
						}
					}

					$command = ('pages' == $matches[1]) ? 'pages.save' : 'posts.save';
					if (!isset($request['context'])) $request['context'] = 'edit';

					// On latest WP (e.g. 5.6) 'menu_order' is passed by the block editor instead of 'order', thus, we need
					// to make sure that it is compatible with our service handler.
					if (isset($params['menu_order'])) $params['order'] = $params['menu_order'];

					// On latest WP (e.g. 5.6) a NULL value is passed instead of zero, thus, we'll make some
					// adjustment before sending it to our service handler for compatibility.
					//
					// N.B. Running the check directly with "isset" and "empty" won't work since we need to make
					// sure that we will only process if the fields were actually edited and the block editor will
					// only send the fields of those edited post or page properties. Thus, we used the "array_key_exists"
					// method here before checking if the value is NULL.
					if (array_key_exists('parent', $params) && is_null($params['parent'])) $params['parent'] = 0;

					$data = $this->send_remote_command($user_id, $command, $params);
					if (!is_wp_error($data) && !empty($data)) {
						$post = json_decode($data['post']);
						$misc = $this->attach_media_to_post($data['misc'], $post);

						// Update/replace existing preloaded post data with the recent
						// changes so that it gets reflected all throughout UpdraftCentral.
						$post_data = array(
							'post' => $post,
							'misc' => $misc
						);

						$preloaded_data['post_data'] = $post_data;
						$site_meta->update_site_meta($site_id, 'updraftcentral_editor_preloaded_data_'.$post_type, $preloaded_data);

						if (!empty($data['options'])) {
							$post_data['options'] = $data['options'];
						}

						// Generate the response
						$controller = new UpdraftCentral_REST_Posts_Controller($post->post_type);
						$response = $controller->prepare_remote_item_for_response($post, $request, $misc);

						$response_data = $response->get_data();
						if (!empty($response_data)) {
							// We need to add the post_data field to the response in order
							// to update the current list item's information
							$response_data['post_data'] = $post_data;
							$response->set_data($response_data);
						}
					} else {
						if (is_wp_error($data)) {
							// Default message if we can't pull any relevant error messages from $data
							$error_message = __('An unknown error has occurred while processing your request. Please contact our support on updraftplus.com so that we can properly escalate the issue.', 'updraftcentral');

							$messages = $data->get_error_messages();
							if (!empty($messages)) {
								$error_message = $messages[0];
							}

							// More specific error information - will override any previous one
							$error_data = $data->get_error_data();
							if (isset($error_data['data']) && isset($error_data['data']['message'])) {
								$error_message = $error_data['data']['message'];
							}

							return new WP_Error('rest_remote_save_failed', $error_message);
						} else {
							return new WP_Error('rest_remote_save_failed', __('An unknown error has occurred while processing your request. Please contact our support on updraftplus.com so that we can properly escalate the issue.', 'updraftcentral'));
						}
					}
					break;
			}
		}

		if ('/wp/v2/users' == $request->get_route() && 'GET' == $request->get_method()) {
			$data = $preloaded_data['authors'];

			$items = array();
			foreach ($data as $item) {
				$remote_item = json_decode($item['user']);

				$controller = new UpdraftCentral_REST_Users_Controller;
				$response = $controller->prepare_remote_item_for_response($remote_item, $request, $item['misc']);

				$merged_data = array_merge($response->get_data(), array('_links' => $response->get_links()));
				array_push($items, $merged_data);
			}

			$response = new WP_REST_Response($items);
		}

		if ('/wp/v2/pages' == $request->get_route() && 'GET' == $request->get_method()) {
			$data = $preloaded_data['parent_pages'];

			$items = array();
			foreach ($data as $item) {
				$remote_item = json_decode($item['post']);
				if ($post && $remote_item && $post->ID != $remote_item->ID) {
					$controller = new UpdraftCentral_REST_Posts_Controller($remote_item->post_type);
					$response = $controller->prepare_remote_item_for_response($remote_item, $request, $item['misc']);
	
					$merged_data = array_merge($response->get_data(), array('_links' => $response->get_links()));
					array_push($items, $merged_data);
				}
			}

			$response = new WP_REST_Response($items);
		}

		if ('/wp/v2/taxonomies' == $request->get_route() && 'GET' == $request->get_method()) {
			$controller = new UpdraftCentral_REST_Taxonomies_Controller;
			if (isset($preloaded_data['taxonomies'])) {
				$data = $preloaded_data['taxonomies'];
	
				$taxonomies = isset($data['taxonomies']) ? $data['taxonomies'] : array();
				if (!empty($taxonomies) && is_array($taxonomies)) {
					foreach ($taxonomies as $key => $value) {
						$tax = $controller->prepare_remote_item_for_response($value, $request);
						$taxonomies[$key] = $controller->prepare_response_for_collection($tax);
					}
				}
	
				$response = new WP_REST_Response($taxonomies);
			}
		}

		$match_result = preg_match('#^/wp/v2/taxonomies/(.*)#', $request->get_route(), $matches);
		if (!empty($match_result) && 'GET' == $request->get_method()) {
			$taxonomy = $matches[1];

			$controller = new UpdraftCentral_REST_Taxonomies_Controller;
			if (isset($preloaded_data['taxonomies'])) {
				$data = $preloaded_data['taxonomies'];
				
				$result = array();
				$taxonomies = isset($data['taxonomies']) ? $data['taxonomies'] : array();
				if (!empty($taxonomies) && is_array($taxonomies)) {
					foreach ($taxonomies as $key => $value) {
						$tax = $controller->prepare_remote_item_for_response($value, $request);
						$taxonomies[$key] = $controller->prepare_response_for_collection($tax);
					}
	
					if (!empty($taxonomy) && isset($taxonomies[$taxonomy])) {
						// For individual taxonomy retrieval
						$result = $taxonomies[$taxonomy];
						if (!empty($params['context']) && 'edit' === $params['context']) {
							if (isset($result['_links'])) unset($result['_links']);
						}
					}
				}
	
				$response = new WP_REST_Response($result);
			}
		}

		if ('/wp/v2/categories' == $request->get_route() && 'GET' == $request->get_method()) {
			$controller = new UpdraftCentral_REST_Terms_Controller('category');
			$taxonomies = $preloaded_data['taxonomies']['taxonomies'];

			$terms = array();
			$categories = isset($preloaded_data['categories']) ? $preloaded_data['categories'] : array();
			if (!empty($categories) && is_array($categories)) {
				$terms = $categories['terms'];
				foreach ($terms as $key => $value) {
					if (isset($value['term'])) {
						$term = json_decode($value['term']);

						$misc = $value['misc'];
						$misc['taxonomy_obj'] = $taxonomies[$misc['taxonomy']];

						$item = $controller->prepare_remote_item_for_response($term, $request, $misc);
						$terms[$key] = $controller->prepare_response_for_collection($item);
					}
				}
			}

			$response = new WP_REST_Response($terms);
		}

		if ('/wp/v2/tags' == $request->get_route() && 'GET' == $request->get_method()) {
			$controller = new UpdraftCentral_REST_Terms_Controller('post_tag');
			$taxonomies = $preloaded_data['taxonomies']['taxonomies'];

			$terms = array();
			$tags = isset($preloaded_data['tags']) ? $preloaded_data['tags'] : array();
			if (!empty($tags) && is_array($tags)) {
				$terms = $tags['terms'];

				foreach ($terms as $key => $value) {
					if (isset($value['term'])) {
						$term = json_decode($value['term']);
						$misc = $value['misc'];
						$misc['taxonomy_obj'] = $taxonomies[$misc['taxonomy']];

						$item = $controller->prepare_remote_item_for_response($term, $request, $misc);
						$terms[$key] = $controller->prepare_response_for_collection($item);
					}
				}
			}

			$response = new WP_REST_Response($terms);
		}

		if ('/wp/v2/categories' == $request->get_route() && 'POST' === $request->get_method()) {
			$data = $this->send_remote_command($user_id, 'posts.add_category', $params);
			if (!is_wp_error($data) && !empty($data)) {
				$categories = json_decode($data['categories'], true);

				// Update preloaded data:
				$preloaded_data['categories'] = $categories;
				$site_meta->update_site_meta($site_id, 'updraftcentral_editor_preloaded_data_'.$post_type, $preloaded_data);

				unset($data['categories']);
				$response = new WP_REST_Response($data);
			}
		}

		if ('/wp/v2/tags' == $request->get_route() && 'POST' === $request->get_method()) {
			$data = $this->send_remote_command($user_id, 'posts.add_tag', $params);
			if (!is_wp_error($data) && !empty($data)) {
				$tags = json_decode($data['tags'], true);

				// Update preloaded data:
				$preloaded_data['tags'] = $tags;
				$site_meta->update_site_meta($site_id, 'updraftcentral_editor_preloaded_data_'.$post_type, $preloaded_data);

				unset($data['tags']);
				$response = new WP_REST_Response($data);
			}
		}

		return $response;
	}

	/**
	 * Creates a new post or return the ID of the existing post
	 *
	 * @param array $data An array of information needed to create a new post if applicable
	 * @return int|bool
	 */
	private function maybe_create_post_and_return_id($data) {
		global $wpdb;
		$query = $wpdb->prepare('SELECT ID FROM '.$wpdb->posts.' WHERE post_name = %s', $data['post_name']);
		$wpdb->query($query);

		if ($wpdb->num_rows) {
			$post_id = intval($wpdb->get_var($query));
		} else {
			$post_id = wp_insert_post($data);
		}
		
		if (is_wp_error($post_id) || empty($post_id)) return false;
		return $post_id;
	}

	/**
	 * Loads metaboxees for the classic editor
	 *
	 * @param string  $post_type Type of the post submitted
	 * @param WP_Post $post      A WP_Post object
	 * @return void
	 */
	public function load_metaboxes($post_type, $post) {
		global $post_type_object;

		add_meta_box('submitdiv', __('Publish', 'updraftcentral'), 'post_submit_meta_box', $post->post_type, 'side', 'core', null);

		if ('page' == $post->post_type) {
			if (post_type_supports($post->post_type, 'page-attributes') || count(get_page_templates($post)) > 0) {
				add_meta_box('pageparentdiv', $post_type_object->labels->attributes, 'page_attributes_meta_box', $post->post_type, 'side', 'core');
			}
		} else {
			add_meta_box('categorydiv', __('Categories', 'updraftcentral'), array($this, 'post_categories_meta_box'), $post->post_type, 'side', 'core', null);

			add_meta_box('tagsdiv-post_tag', __('Tags', 'updraftcentral'), array($this, 'post_tags_meta_box'), $post->post_type, 'side', 'core', null);
		}

		if (post_type_supports($post->post_type, 'thumbnail') && current_user_can('upload_files')) {
			add_meta_box('postimagediv', esc_html($post_type_object->labels->featured_image), 'post_thumbnail_meta_box', $post->post_type, 'side', 'low');
		}
	}

	/**
	 * Fetch parent pages for the particular post object (applicable to 'page' post type)
	 *
	 * @return array
	 */
	public function load_remote_pages() {
		global $post, $site_id;

		$user = UpdraftCentral()->get_user_object(get_current_user_id());
		$remote_params = array(
			'site_id' => $site_id,
			'data' => array(
				'command' => 'pages.get_parent_pages',
				'data' => array(
					'page' => 1,
					'per_page' => 100,
					'exclude' => array($post->ID),
					'order' => 'ASC',
					'orderby' => 'menu_order',
					'status' => 'publish'
				),
			)
		);

		$remote_response = $user->send_remote_command($remote_params);
		if (!empty($remote_response) && 'ok' == $remote_response['responsetype']) {
			if ('rpcok' == $remote_response['rpc_response']['response']) {
				$data = $remote_response['rpc_response']['data'];
				return $data['pages'];
			}
		}

		return array();
	}

	/**
	 * Setup the global post data so that any underlying processes will
	 * get to see and acknowledge the remote post as the current object
	 *
	 * @param array $post_data      The current post data to edit
	 * @param bool  $disable_screen Whether to disable setting the screen or not
	 * @return WP_Post
	 */
	private function setup_remotepost_data($post_data, $disable_screen = false) {
		global $post;

		// We need to setup and cache this edited post data so that other processes
		// or hooks that will eventually rely on this information will succeed.
		$post = new WP_Post((object) $post_data);
		if ($post) {
			setup_postdata($post);
			if (!$disable_screen) {
				set_current_screen($post->post_type);
			}

			// Make sure that this new object gets inserted into the cache
			// otherwise, WP won't be able to see this information as these are
			// coming from the remote website and not a local WP_Post object.
			//
			// N.B. This will bypass checking the post information from the database
			// which in reality doesn't actually exists locally since it is coming from
			// the remote website.
			wp_cache_set($post->ID, $post, 'posts');
		}

		return $post;
	}

	/**
	 * Store preloaded data from remote which will be accessed later, making succeeding
	 * access to these information much more faster the next time around.
	 *
	 * @param array $params The parameters that goes along with the current request
	 * @return void
	 */
	public function maybe_store_preloaded_data($params) {

		$data = array();
		// Preloaded data such as remote taxonomies, categories and tags are stored here if
		// they exists as not to redo the whole request when a new REST request is executed.
		if (!empty($params['preloaded_data'])) {
			$data = json_decode($params['preloaded_data'], true);
		}

		if (!empty($params['post_data'])) {
			global $post, $post_data;

			// We might as well store the currently edited post here so that any succeeding REST
			// request for this particular `post` information will no longer require us to initiate another request
			// just for getting the same information from the remote website (which is kind of redundant
			// since we've already got those data loaded in the first place).
			$post_data = json_decode($params['post_data'], true);
			$data['post_data'] = $post_data;

			// Setup remote post for local access
			$post = $this->setup_remotepost_data($post_data['post']);
		}

		// Store preloaded data as user meta, thus, making them unique for every user wanting
		// to edit their own remote posts or pages.
		if (!empty($data) && !empty($params['site_id'])) {
			global $site_id;

			$site_id = $params['site_id'];
			$site_meta = $this->get_site_meta_instance();
			$site_meta->update_site_meta($site_id, 'updraftcentral_editor_preloaded_data_'.$post->post_type, $data);
		}
	}

	/**
	 * Loads the Gutenberg needed information to successfully load the block
	 * editor in the client.
	 *
	 * @param array	$params	A collection of information needed when loading the editor
	 * @return array
	 */
	public function load_gutenberg_editor($params) {
		global $post, $post_data;

		// Store preloaded data if not yet been stored.
		$this->maybe_store_preloaded_data($params);

		ob_start();
		the_block_editor_meta_boxes();
		$metaboxes = ob_get_contents();
		ob_end_clean();

		$nonce = wp_create_nonce('updraftcentral-editpost-'.$post->ID);
		$info = array(
			'uc_nonce' => $nonce,
			'uc_refIds' => base64_encode(get_current_user_id().'|'.$post->ID)
		);

		$settings = get_user_meta(get_current_user_id(), 'updraftcentral_editor_settings', true);
		$settings['availableTemplates'] = array();
		if (isset($settings['availableTemplates']) && !empty($params['template_options'])) {
			$templates = array();
			$options = $params['template_options'];
			
			if (!empty($options)) {
				foreach ($options as $value) {
					$templates[$value['filename']] = $value['template'];
				}
			}

			$settings['availableTemplates'] = array_merge(array('' => __('Default template', 'updraftcentral')), $templates);
		}

		$misc = $this->attach_media_to_post($post_data['misc'], $post);
		return array(
			'post' => $post,
			'misc' => $misc,
			'logo' => trailingslashit(UD_CENTRAL_URL).'images/updraftcentral-logo-landscape.png',
			'metaboxes' => $metaboxes,
			'settings' => $settings,
			'info' => $info,
			'has_upload_permissions' => current_user_can('upload_files'), // N.B. We're using the local media library interface when uploading/editing the featured image, so we need to check whether the UpdraftCentral user have the "upload_files" permission. Otherwise, the user won't be able to edit the featured image of a post or page or upload a new one for that matter.
			'block_categories' => get_block_categories($post),
			'block_definitions' => get_block_editor_server_block_settings()
		);
	}

	/**
	 * Loads the Classic Editor
	 *
	 * @param array	$params	A collection of information needed when loading the editor
	 * @return array
	 */
	public function load_classic_editor($params) {
		global $post_type_object, $post, $site_id, $uc_categories_meta_box, $uc_tags_meta_box, $post_data;

		// Store preloaded data if not yet been stored.
		$this->maybe_store_preloaded_data($params);

		$item = $post_data['misc'];
		$site_id = $params['site_id'];
		$data = array();

		if (!empty($item)) {
			if ($post) {
				include_once ABSPATH . 'wp-admin/includes/meta-boxes.php';
				include_once ABSPATH . 'wp-admin/includes/template.php';

				$item = $this->attach_media_to_post($item, $post);
				$post_type_object = get_post_type_object($post->post_type);
				set_current_screen($post->post_type);

				// Make sure that we add the necessary metaboxes for our current post_type (e.g. page or post)
				// before actually rendering them.
				add_action('add_meta_boxes', array($this, 'load_metaboxes'), 10, 2);
				do_action('add_meta_boxes', $post->post_type, $post);

				// Grab editor content to put inside a variable
				ob_start();
				wp_editor($post->post_content, 'uc_classic_editor');
				$editor = ob_get_contents();
				ob_end_clean();

				// Now grab the metaboxes content
				ob_start();
				do_meta_boxes($post->post_type, 'side', $post);
				$metaboxes = ob_get_contents();
				ob_end_clean();

				$data = array(
					'post' => $post,
					'misc' => $item,
					'logo' => trailingslashit(UD_CENTRAL_URL).'images/updraftcentral-logo-landscape.png',
					'editor' => $editor,
					'metaboxes' => $metaboxes,
					'tags_metabox_content' => $uc_tags_meta_box,
					'categories_metabox_content' => $uc_categories_meta_box
				);
			}
		}

		return $data;
	}

	/**
	 * Searches for the media ID of a given attachment/image
	 *
	 * @param string $filename The filename of the image/media
	 * @return int|bool
	 */
	private function get_media_id_by_name($filename) {
		global $wpdb;
		$media_id = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE guid LIKE '%s'", '%'.$filename));

		return $media_id ?: false;
	}

	/**
	 * Prepares the image for attachment and attaches it to the post object
	 *
	 * @param array   $item A data array containing the featured image information
	 * @param WP_Post $post The WP_Post object to where the featured image is to be attached
	 *
	 * @return array
	 */
	private function attach_media_to_post($item, $post) {

		// Nothing to do if "featured_media" and "featured_media_url" are both empty, thus, we bail.
		$featured_media = (int) $item['featured_media'];
		if (empty($featured_media) && empty($item['featured_media_url'])) return $item;

		// Attach remote media if non-existing. If 'featured_media' is empty or zero
		// and the 'feature_media_url' is non-empty meaning we haven't gotten any local media reference just yet.
		// Thus, we're going to attach the remote media to this current post so that the editors can consume
		// and display the image to the users.
		if (empty($featured_media) && !empty($item['featured_media_url'])) {
			$media_id = $this->maybe_download_remote_image($item['featured_media_url']);
			if (!empty($media_id)) {
				$item['featured_media'] = (int) $media_id;
			}
		} else {
			// Check if featured media (image) still exists, meaning, not deleted/removed.
			if (!empty($featured_media)) {
				$attachment = wp_get_attachment_image_src($featured_media);
				if (empty($attachment)) {
					$item['featured_media'] = 0;

					// Try downloading the image, if the remote page/post currently has
					// a featured_media_url set.
					if (!empty($item['featured_media_url'])) {
						$media_id = $this->maybe_download_remote_image($item['featured_media_url']);
						if (!empty($media_id)) {
							$item['featured_media'] = (int) $media_id;
						}
					}
				}
			}
		}

		if (!empty($item['featured_media']) && $post) {
			set_post_thumbnail($post, (int) $item['featured_media']);
		}

		return $item;
	}

	/**
	 * Saves or downloads the media (attachment/image) from UpdraftCentral
	 *
	 * @param string $image_url  The URL of the image to download (if needed)
	 * @param string $image_data The image data to save. If empty, image_url will be used to download the image
	 * @return int
	 */
	private function maybe_download_remote_image($image_url, $image_data = '') {
		if (empty($image_url)) return false;

		$image = pathinfo($image_url);
		$image_name = $image['basename'];

		$media_id = $this->get_media_id_by_name($image_name);
		if (!empty($media_id)) {
			return $media_id;
		}

		$upload_dir = wp_upload_dir();
		if (empty($image_data)) {
			$response = wp_remote_get($image_url);
			if (!is_wp_error($response)) {
				$image_data = wp_remote_retrieve_body($response);
			}
		} else {
			$image_data = base64_decode($image_data);
		}

		$media_id = 0;
		if (!empty($image_data)) {
			$filename = $image_name;

			if (wp_mkdir_p($upload_dir['path'])) {
				$file = trailingslashit($upload_dir['path']).$filename;
				$guid = trailingslashit($upload_dir['url']).$filename;
			} else {
				$file = trailingslashit($upload_dir['basedir']).$filename;
				$guid = trailingslashit($upload_dir['baseurl']).$filename;
			}

			file_put_contents($file, $image_data);
			$wp_filetype = wp_check_filetype($filename, null);

			$attachment = array(
				'guid' => $guid,
				'post_mime_type' => $wp_filetype['type'],
				'post_title'     => sanitize_file_name($filename),
				'post_content'   => '',
				'post_status'    => 'inherit'
			);

			$media_id = wp_insert_attachment($attachment, $file);
			include_once(ABSPATH . 'wp-admin/includes/image.php');

			$attach_data = wp_generate_attachment_metadata($media_id, $file);
			wp_update_attachment_metadata($media_id, $attach_data);
		}

		return $media_id;
	}

	/**
	 * Gathers post categories metabox information to be rendered
	 * in the client later on using the Handlerbarsjs templating system
	 *
	 * @param WP_Post $post Post object
	 */
	public function post_categories_meta_box($post) {
		global $uc_categories_meta_box, $site_id;

		$site_meta = $this->get_site_meta_instance();
		$preloaded_data = $site_meta->get_site_meta($site_id, 'updraftcentral_editor_preloaded_data_'.$post->post_type, true);
		$options = $misc = array();

		if (!empty($preloaded_data)) {
			if (isset($preloaded_data['categories'])) {
				$options = $preloaded_data['categories']['misc'];
			}

			if (isset($preloaded_data['post_data'])) {
				$misc = $preloaded_data['post_data']['misc'];
			}
		}

		if (empty($options) || empty($misc)) return;

		$taxonomy = json_decode($options['tax']);
		$popular_terms_checklist = $options['popular'];
		$terms_checklist = $misc['categories_checklist'];
		$parent_dropdown = $options['parent_dropdown'];

		// We're pulling and rendering the template in the client, so, we're
		// preparing the information for the template's consumption.
		$uc_categories_meta_box = array(
			'labels' => array(
				'all_items' => isset($taxonomy->labels->all_items) ? $taxonomy->labels->all_items : __('All Categories', 'updraftcentral'),
				'most_used' => isset($taxonomy->labels->most_used) ? esc_html($taxonomy->labels->most_used) : __('Most Used', 'updraftcentral'),
				'add_new_item' => isset($taxonomy->labels->add_new_item) ? $taxonomy->labels->add_new_item : __('Add New Category', 'updraftcentral')
			),
			'attributes' => array(
				'new_item_name' => isset($taxonomy->labels->new_item_name) ? esc_attr($taxonomy->labels->new_item_name) : __('New Category Name', 'updraftcentral'),
				'add_new_item' => isset($taxonomy->labels->add_new_item) ? esc_attr($taxonomy->labels->add_new_item) : __('Add New Category', 'updraftcentral')
			),
			'can_edit_terms' => (bool) $options['capabilities']['can_edit_terms'],
			'popular_terms_checklist' => $popular_terms_checklist,
			'terms_checklist' => $terms_checklist,
			'parent_dropdown' => $parent_dropdown
		);
	}

	/**
	 * Gathers post tags metabox information to be rendered
	 * in the client later on using the Handlerbarsjs templating system
	 *
	 * @param WP_Post $post Post object
	 */
	public function post_tags_meta_box($post) {
		global $uc_tags_meta_box, $site_id;

		$site_meta = $this->get_site_meta_instance();
		$preloaded_data = $site_meta->get_site_meta($site_id, 'updraftcentral_editor_preloaded_data_'.$post->post_type, true);
		$options = $misc = array();

		if (!empty($preloaded_data)) {
			if (isset($preloaded_data['tags'])) {
				$options = $preloaded_data['tags']['misc'];
			}

			if (isset($preloaded_data['post_data'])) {
				$misc = $preloaded_data['post_data']['misc'];
			}
		}

		if (empty($options) || empty($misc)) return;

		$tag_cloud = $options['tag_cloud'];
		$taxonomy = json_decode($options['tax']);

		$terms_list = array();
		$terms_to_edit = '';
		if (!empty($misc['tags_list'])) {
			$terms_to_edit = str_replace(', ', ',', $misc['tags_list']);
			$terms_list = explode(',', $terms_to_edit);
		}

		// We're pulling and rendering the template in the client, so, we're
		// preparing the information for the template's consumption.
		$uc_tags_meta_box = array(
			'labels' => array(
				'add_or_remove_items' => isset($taxonomy->labels->add_or_remove_items) ? $taxonomy->labels->add_or_remove_items : __('Add or remove tags', 'updraftcentral'),
				'add_new_item' => isset($taxonomy->labels->add_new_item) ? $taxonomy->labels->add_new_item : __('Add New Tag', 'updraftcentral'),
				'separate_items_with_commas' => isset($taxonomy->labels->separate_items_with_commas) ? $taxonomy->labels->separate_items_with_commas : __('Separate tags with commas', 'updraftcentral'),
				'no_terms' => isset($taxonomy->labels->no_terms) ? $taxonomy->labels->no_terms : __('No tags', 'updraftcentral'),
				'choose_from_most_used' => isset($taxonomy->labels->choose_from_most_used) ? $taxonomy->labels->choose_from_most_used : __('Choose from the most used tags', 'updraftcentral')
			),
			'attributes' => array(
				'add' => __('Add', 'updraftcentral'),
			),
			'can_assign_terms' => (bool) $options['capabilities']['can_assign_terms'],
			'terms_to_edit' => $terms_to_edit,
			'terms_list' => $terms_list,
			'tag_cloud' => $tag_cloud
		);
	}
}

endif;
