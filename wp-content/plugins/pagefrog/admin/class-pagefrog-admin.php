<?php

include_once "pagefrog-preview.php"; // holds render_preview
include_once "pagefrog-styling.php"; // holds render_styling_page
include_once "pagefrog-post-metadata.php"; // holds PageFrog_PostStatus
include_once "class-pagefrog-styling-storage.php"; // holds PageFrog_Styling_Storage
include_once "class-pagefrog-utils.php"; // holds PageFrog_Utils
include_once "pagefrog-analytics.php"; // holds add_analytics_settings_fields
include_once "pagefrog-settings.php"; // holds render_settings_page
include_once "pagefrog-ads.php"; // holds render_ads_page

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://pagefrog.com
 * @since      1.0.0
 *
 * @package    PageFrog
 * @subpackage PageFrog/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    PageFrog
 * @subpackage PageFrog/admin
 * @author     PageFrog Team <team@pagefrog.com>
 */
class PageFrog_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles($hook) {
		// register all the styles we might use
		wp_register_style('admin_css', plugin_dir_url(__FILE__) . 'css/pagefrog-admin.css', array(), $this->version, 'all');
		wp_register_style('spectrum_css', plugin_dir_url(__FILE__) . 'css/spectrum.css', array(), $this->version, 'all');
		wp_register_style('walkthrough_css', plugin_dir_url(__FILE__) . 'css/walkthrough.css', array(), $this->version, 'all');
        wp_register_style('jquery_ui', plugin_dir_url(__FILE__) . 'css/jquery-ui.min.css', array(), $this->version, 'all');

		if ($hook === 'post.php') {
			wp_enqueue_style( 'jquery_ui' );
			wp_enqueue_style( 'admin_css' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG']
		) {
			wp_enqueue_style( 'jquery_ui' );
			wp_enqueue_style( 'admin_css' );
			wp_enqueue_style( 'spectrum_css' );
			wp_enqueue_style( 'thickbox' );
			wp_enqueue_style( 'walkthrough_css' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_SETUP_PAGE_SLUG']
		) {
		    wp_enqueue_style( 'jquery_ui' );
			wp_enqueue_style( 'admin_css' );
			wp_enqueue_style( 'thickbox' );
			wp_enqueue_style( 'walkthrough_css' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG']
		) {
			wp_enqueue_style( 'admin_css' );
			wp_enqueue_style( 'thickbox' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_CONTACT_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_CONTACT_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_CONTACT_PAGE_SLUG']
		) {
			wp_enqueue_style( 'admin_css' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG']
		) {
			wp_enqueue_style( 'admin_css' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_ADS_PAGE_SLUG']
		) {
			wp_enqueue_style( 'admin_css' );
			wp_enqueue_style( 'thickbox' );
		}
		if ($hook === 'edit.php') {
			wp_enqueue_style( 'jquery_ui' );
			wp_enqueue_style( 'thickbox' );
			wp_enqueue_style( 'admin_css' );
		}
		if ( isset( $_GET['pagefrog_contact'] ) && $_GET['pagefrog_contact'] == 'true' ) {
		    wp_enqueue_style( 'jquery_ui' );
			wp_enqueue_style( 'wp-pointer' );
		}
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts($hook) {
		// register all the scripts we might use
		wp_register_script('pagefrog_setup_js', plugin_dir_url(__FILE__) . 'js/pagefrog-setup.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_styling_js', plugin_dir_url(__FILE__) . 'js/pagefrog-styling.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_spectrum_js', plugin_dir_url(__FILE__) . 'js/spectrum.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_previews_js', plugin_dir_url(__FILE__) . 'js/pagefrog-previews.js', array( 'jquery', 'jquery-ui-tooltip' ), $this->version, false);
		wp_register_script('pagefrog_change_thickbox_text_js', plugin_dir_url(__FILE__) . 'js/pagefrog-change-thickbox-text.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_postlistings_js', plugin_dir_url(__FILE__) . 'js/pagefrog-postlistings.js', array( 'jquery', 'jquery-ui-tooltip' ), $this->version, false);
		wp_register_script('pagefrog_zeroclipboard_js', plugin_dir_url(__FILE__) . 'js/ZeroClipboard.min.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_contact_js', plugin_dir_url(__FILE__) . 'js/pagefrog-contact.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_analytics_js', plugin_dir_url(__FILE__) . 'js/pagefrog-analytics.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_contact_tooltip_js', plugin_dir_url(__FILE__) . 'js/pagefrog-contact-tooltip.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_settings_js', plugin_dir_url(__FILE__) . 'js/pagefrog-settings.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_tabs_js', plugin_dir_url(__FILE__) . 'js/pagefrog-tabs.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_ads_js', plugin_dir_url(__FILE__) . 'js/pagefrog-eh-dee-es.js', array( 'jquery' ), $this->version, false);
		wp_register_script('pagefrog_sync_hidden_forms_js', plugin_dir_url(__FILE__) . 'js/pagefrog-sync-hidden-forms.js', array( 'jquery' ), $this->version, false);

		// add them where necessary
		if ($hook == 'post.php') {
			wp_enqueue_script( 'pagefrog_previews_js' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG']
		) {
			wp_enqueue_script( 'pagefrog_styling_js' );
			wp_enqueue_script( 'pagefrog_spectrum_js' );
			wp_enqueue_script( 'thickbox' );
			wp_enqueue_script( 'pagefrog_previews_js' );
			wp_enqueue_script( 'pagefrog_tabs_js' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_SETUP_PAGE_SLUG']
		) {
			wp_enqueue_script( 'thickbox' );
			wp_enqueue_script( 'pagefrog_setup_js' );
			wp_enqueue_script( 'pagefrog_zeroclipboard_js' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG']
		) {
			wp_enqueue_script( 'thickbox' );
			wp_enqueue_script( 'pagefrog_analytics_js' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_CONTACT_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_CONTACT_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_CONTACT_PAGE_SLUG']
		) {
			wp_enqueue_script( 'pagefrog_contact_js' );	
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG']
		) {
			wp_enqueue_script( 'pagefrog_settings_js' );
			wp_enqueue_script( 'pagefrog_sync_hidden_forms_js' );
		}
		if (
			$hook === 'toplevel_page_' . $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'] ||
			$hook === 'mobile-menu_page_' . $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'] ||
			$hook === 'mobile-formats_page_' . $GLOBALS['PAGEFROG_ADS_PAGE_SLUG']
		) {
			wp_enqueue_script( 'pagefrog_ads_js' );
			wp_enqueue_script( 'pagefrog_sync_hidden_forms_js' );
			wp_enqueue_script( 'thickbox' );
		}
		if($hook === 'media-upload-popup' && isset($_GET['pagefrog_settings']) && $_GET['pagefrog_settings'] == 'true') {
			wp_enqueue_script( 'pagefrog_change_thickbox_text_js' );
		}
		if($hook === 'edit.php') {
			wp_enqueue_script( 'thickbox' );
			wp_enqueue_script( 'pagefrog_postlistings_js' );
			wp_enqueue_script( 'pagefrog_previews_js' );
		}
		if ( isset( $_GET['pagefrog_contact'] ) && $_GET['pagefrog_contact'] === 'true' ) {
			wp_enqueue_script( 'pagefrog_contact_tooltip_js' );
			wp_enqueue_script( 'wp-pointer' );
		}
	}

	/**
	 * Register the meta boxes for the admin area.
	 *
	 * @since 	1.0.0
	 */
	public function add_meta_boxes() {
		$post_types = PageFrog_NewPostSettings_Storage::get_post_types();
		foreach ( $post_types as $label => $post_type ) {
			add_meta_box(
				'pagefrog-preview-meta-box', // id of the box
				'Mobile Preview',  // title of the box
				array( $this, 'render_preview_meta_box' ), // callback to render the box
				$label, // type of admin page to show the meta box (post, page, or custom)
				'side', // position of the meta box (normal, advanced, or side)
				'high', // meta box priority (default, core, high, or low)
				null // args to pass to render_preview_meta_box
			);
		}
	}

	/**
	 * Add the endpoints for the previews.
	 *
	 * @since 	1.0.0
	 */
	public function hook_up_previews() {
		add_rewrite_endpoint( $GLOBALS['PAGEFROG_PREVIEW_VAR'], EP_PERMALINK );
		add_post_type_support( 'post', $GLOBALS['PAGEFROG_PREVIEW_VAR'] );
	}

	/**
	 * Maybe handles the request (checks first if it is actually a preview request).
	 *
	 * @since 	1.0.0
	 */
	public function maybe_handle_preview() {
		if ( ! is_singular() ) {
			return;
		}

		if ( ! isset( $_GET[$GLOBALS['PAGEFROG_PREVIEW_VAR']] ) ) {
			return;
		}
		$preview_format = $_GET[$GLOBALS['PAGEFROG_PREVIEW_VAR']];
		$is_preview_endpoint = $preview_format == 'amp' || $preview_format == 'fbia' || $preview_format == 'raw'  || $preview_format == 'fbia_raw';

		if ( ! $is_preview_endpoint ) {
			return;
		} else {
			add_action( 'template_redirect', array($this, 'really_handle_preview'));
		}
	}

	/**
	 * Maybe unattach plugins for this request (if it is amp and the user requested that).
	 *
	 * @since 	1.0.7.2
	 */
	public function maybe_disable_plugins( ) {
		global $wp_filter;
		/*
		 * The $wp_filter variable holds a list of hooks in the format
		 * $wp_filter[hook_name][priority_integer][name_of_callable] = array(
		 * 		function => 'name_of_callable' string, or array with [0] pointing to an object and
		 *                     [1] pointing to the name of the function to be called on that object,
		 *		accepted_args => number of accepted args (int)
		 * )
		 *
		 * Note that $wp_filter does not differentiate between actions and filters, so we can just call
		 * remove_filter for both.
		 */


		// check if we are on an amp endpoint
		if ( 
			( defined( 'AMP_QUERY_VAR' ) && false !== get_query_var( AMP_QUERY_VAR, false ) ) || 
			( isset( $GLOBALS['PRETEND_AMP_WP_IS_INSTALLED'] ) && $GLOBALS['PRETEND_AMP_WP_IS_INSTALLED'] == true && isset( $GLOBALS['PRETEND_AMP_WP_IS_ACTIVATED'] ) && $GLOBALS['PRETEND_AMP_WP_IS_ACTIVATED'] === true )
		) {
			// check if we should remove plugins from amp input
			$new_posts = new PageFrog_NewPostSettings_Storage();
			if ( ! $new_posts->get_amp_disable_other_plugins_bool() ) {
				// we aren't supposed to remove other plugins
				return array();
			}

			// if we reach here, we need to remove the plugins
			$to_remove = array();
			// iterate over all of the hooks, recording which ones we think maybe we should remove
			foreach ( $wp_filter as $hook => $hook_group ) {
				foreach ( $hook_group as $priority => $priority_group ) {
					foreach ( $priority_group as $callable => $callable_group ) {
						try {
							if ( is_array( $callable_group['function'] ) ) {
								// it looks like we have a class method that we are analyzing
								// get hte file path to the function
								if ( is_string( $callable_group['function'][0] ) ) {
									// it's a static method
									$refl = new ReflectionMethod( $callable_group['function'][0] . '::' . $callable_group['function'][1] );
								} else {
									// it's an instance method
									$refl = new ReflectionClass( get_class( $callable_group['function'][0] ) );
								}
							} else {
								// it looks like we have a simple function that we are analyzing
								// get the file path to the function
								$refl = new ReflectionFunction( $callable_group['function'] );
							}

							// get the file path
							$file_path = $refl->getFileName();

							// check if the function is inside of the plugins directory
							if (
								PageFrog_Utils::starts_with( $file_path, WP_PLUGIN_DIR )
							) {

								// check if the function is not part of pagefrog and not part of the amp-wp plugins
								if (
									! PageFrog_Utils::contains( $file_path, WP_PLUGIN_DIR . '/amp/' ) &&
									! PageFrog_Utils::contains( $file_path, WP_PLUGIN_DIR . '/pagefrog/' ) &&
									! PageFrog_Utils::contains( $file_path, WP_PLUGIN_DIR . '/pageforg-wp/' )
									) {
									// this one should be removed, add it to the list
									$to_remove[] = array(
										'hook' => $hook,
										'callable' => $callable_group['function'],
										'priority' => $priority
									);
								}
							} else if ( 
								PageFrog_Utils::ends_with( $file_path, 'functions.php' ) &&
								PageFrog_Utils::contains( $file_path, 'themes' ) 
							) {
								// this is probably good to remove too
								$to_remove[] = array(
									'hook' => $hook,
									'callable' => $callable_group['function'],
									'priority' => $priority
								);
							}
						} catch ( ReflectionException $e ) {
							// it's a private function, must be wordpress core stuff. Keep this one.
						}
					}
				}
			}

			foreach ( $to_remove as $remove ) {
				// remove the filter
				$success = remove_filter($remove['hook'], $remove['callable'], $remove['priority']);
			}
			return $to_remove;
		}
		return array();
	}

	/**
	 * Really handles the request for a preview.
	 *
	 * @since 	1.0.0
	 */
	public function really_handle_preview($test_mode=false) {
		$post_id = get_queried_object_id();
		if ( ! isset( $_GET[$GLOBALS['PAGEFROG_PREVIEW_VAR']] ) ) {
			return;
		}
		$preview_format = $_GET[$GLOBALS['PAGEFROG_PREVIEW_VAR']];

		if ($preview_format == 'fbia') {
		    $template_file = PF__PLUGIN_DIR . 'templates/pagefrog-instant-article-preview.php';
            load_template($template_file, false);
        }
        else if ($preview_format == 'amp') {
            $this->amp_render_template( $post_id );
        }
        else if ($preview_format == 'raw') {
            $template_file = PF__PLUGIN_DIR . 'templates/pagefrog-preview-raw.php';
            load_template($template_file, false);
        }
        else if ($preview_format == 'fbia_raw') {
            $template_file = PF__PLUGIN_DIR . 'templates/pagefrog-instant-article-raw.php';
            load_template($template_file, false);
        }

        if( ! $test_mode ) {
            exit;
        }
	}

	/**
	 * Add the sanitizer for amp ads.
	 *
	 * @since 1.0.6
	 */
	public function add_amp_ads_sanitizer( $sanitizer_classes, $post ) {
		require_once( dirname( __FILE__ ) . '/class-amp-ads-injection-sanitizer.php' );
		$ads = new PageFrog_AdSettings_Storage();
		$sanitizer_classes['PageFrog_Amp_Ad_Injection_Sanitizer'] = array(
			'ads' => $ads
		);
		return $sanitizer_classes;
	}

	/**
	 * Add the sanitizer for header images.
	 *
	 * @since 1.0.8
	 */
	public function add_amp_header_image_sanitizer( $sanitizer_classes, $post ) {
		require_once( dirname( dirname( __FILE__ ) ) . '/public/class-amp-header-image-sanitizer.php' );
		$new_posts = new PageFrog_NewPostSettings_Storage();
		$sanitizer_classes['PageFrog_Amp_Header_Image_Sanitizer'] = array(
			'new_posts' => $new_posts,
			'post' => $post
		);
		return $sanitizer_classes;
	}

	/**
	 * Render the Pagefrog Preview Meta Box.
	 *
	 * @param WP_Post $post the post object.
	 */
	public function render_preview_meta_box( $post ) {
		render_preview($post);
	}

	/**
	 * Register the AJAX call to generate a preview.
	 *
	 * @since 1.0.0
	 */
	public function pagefrog_get_preview_callback() {
		$post_id = $_GET['post_id'];
		$format = $_GET['format'];

		// get the post from the db. First look for the most recent revision that we should work on.
		$post_revisions = wp_get_post_revisions($post_id);
		$post = reset($post_revisions); // gets the first element (the most recent revision)
		if ($post == False) {
			$post = get_post($post_id); // gets the most recent published version, if no revisions are hanging around
		}
		if ($post == False || $post == null) {
			wp_die("Looks like you've selected an invalid post!");
		}

		$preview_url = $this->get_preview_post_link( $post_id, array(
			$GLOBALS['PAGEFROG_PREVIEW_VAR'] => $format
		));

		// check to make sure we are on the same protocol: http or https
		if ( isset( $_SERVER['HTTPS'] ) && PageFrog_Utils::starts_with( $preview_url, 'http:' ) ) {
				$preview_url = preg_replace( "/^http/", "https", $preview_url );
		}

		$post_status = new PageFrog_PostStatus( $post_id );

		wp_send_json(array(
			'fbia_status' => $post_status->get_fbia_status(),
			'amp_status' => $post_status->get_amp_status(),
			'amp_capable' => wp_amp_plugin_is_installed() && wp_amp_plugin_is_active(),
			'preview_url' => $preview_url,
		));
	}

	private function get_preview_post_link( $post = null, $query_args = array(), $preview_link = '' ) {
		// this is a copy from the wordpress core, included here for backwards compatibility.
    $post = get_post( $post );
    if ( ! $post ) {
      return;
    }
 
    $post_type_object = get_post_type_object( $post->post_type );
    if ( $post_type_object->publicly_queryable || ( $post_type_object->_builtin && $post_type_object->public ) ) {
      if ( ! $preview_link ) {
        $preview_link = get_permalink( $post );
      }

      $query_args['preview'] = 'true';
      $preview_link = add_query_arg( $query_args, $preview_link );
    }
 
    return apply_filters( 'preview_post_link', $preview_link, $post );
	}


	/**
	 * Register the options page for the plugin.
	 *
	 * The options page is where the user can set template-level stuff;
	 * like font colors, styles, logo, etc.
	 *
	 * @since 1.0.0
	 */
	public function add_settings_page() {
		add_menu_page(
			'Setup | PageFrog', // the title of the page when the browser visits it
			'Mobile Formats', // the text in the menu
			'manage_options', // gives the plugin the ability to save settings
			$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'], // the slug that this menu uses
			array( $this, 'render_setup_page' ), // the function that will render the admin page
			plugin_dir_url(__FILE__) . 'images/logo-pf.svg' // the url for the icon
		);
		add_submenu_page(
			$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'],
			'Setup | Pagefrog',
			'Setup',
			'manage_options',
			$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'],
			array( $this, 'render_setup_page' )
		);
		add_submenu_page(
			$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'], // the slug name for the parent menu
			'Styling | PageFrog', // the title of the page when the browser visits it
			'Styling', // the name of the option in the menu
			'manage_options', // gives the plugin the ability to save settings
			$GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'], // this submenu's slug
			array( $this, 'render_styling_page' ) // the function that will render the admin page
		);
		add_submenu_page(
			$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'],
			'Analytics | PageFrog',
			'Analytics',
			'manage_options',
			$GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
			array( $this, 'render_analytics_page' )
		);
		add_submenu_page(
			$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'],
			'Ads | PageFrog',
			'Ads',
			'manage_options',
			$GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
			array( $this, 'render_ads_page' )
		);
		add_submenu_page(
			$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'],
			'Settings | PageFrog',
			'Settings',
			'manage_options',
			$GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'],
			array( $this, 'render_settings_page' )
		);
		add_submenu_page(
			$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'],
			'Contact | PageFrog',
			'Contact & Help',
			'manage_options',
			$GLOBALS['PAGEFROG_CONTACT_PAGE_SLUG'],
			array( $this, 'render_contact_page' )
		);
	}

	/**
	 * Renders the PageFrog ads page.
	 *
	 * @since 1.0.6
	 */
	public function render_ads_page() {
		render_ads_page();
	}

	/**
	 * Adds the settings that need to be defined to use analytics.
	 *
	 * @since 1.0.6
	 */
	public function add_ads_settings_fields() {
		add_ads_settings_fields();
	}

	/**
	 * Renders the PageFrog contact page.
	 *
	 * @since 1.0.4
	 */
	public function render_contact_page() {
		include( dirname( __FILE__ ) . '/pagefrog-contact.php' );
	}

	/**
	 * Renders the PageFrog settings page.
	 *
	 * @since 1.0.4
	 */
	public function render_settings_page() {
		render_settings_page();
	}

	/**
	 * Adds the settings that need to be defined to set the status of new posts.
	 *
	 * @since 1.0.4
	 */
	public function add_settings_fields() {
		add_settings_fields();
	}

	/**
	 * Renders the PageFrog styling page.
	 *
	 * @since 1.0.0
	 */
	public function render_styling_page() {
		render_styling_page();
	}

	/**
	 * Adds the settings that need to be defined to use the plugin (font colors, styles, etc.).
	 *
	 * @since 1.0.0
	 */
	public function add_styling_settings_fields() {
		add_styling_settings_fields();
	}

	/**
	 * Renders the PageFrog analytics page.
	 *
	 * @since 1.0.4
	 */
	public function render_analytics_page() {
		$analytics = new PageFrog_Analytics_Storage();
		render_analytics_page( $analytics );
	}

	/**
	 * Adds the settings that need to be defined to use the analytics portion of the plugin.
	 *
	 * @since 1.0.4
	 */
	public function add_analytics_settings_fields() {
		add_analytics_settings_fields();
	}

	/**
	 * Renders the PageFrog setup page.
	 *
	 * @since 1.0.0
	 */
	public function render_setup_page() {
		include( dirname( __FILE__ ) . '/pagefrog-setup.php' );
	}

	/**
	 *
	 *
	 *
	 */
	public function add_post_listing_table_hooks() {
		add_action( 'admin_footer-edit.php', array( $this, 'add_preview_to_post_listings' ) );
		$post_types = PageFrog_NewPostSettings_Storage::get_post_types();
		foreach ( $post_types as $label => $post_type ) {
			add_action( 'manage_' . $label . '_posts_columns', array($this, 'add_post_listings_mobile_column' ) );
			add_filter( 'manage_' . $label . '_posts_custom_column', array($this, 'fill_post_listings_mobile_column' ), 10, 2 );
		}
		add_filter( 'post_row_actions', array( $this, 'add_post_preview_action' ), 10, 2 );
		add_filter( 'page_row_actions', array( $this, 'add_post_preview_action'), 10, 2 );
	}
	/**
	 * Adds the Mobile Preview action to the post actions.
	 *
	 * @since 1.0.0
	 */
	public function add_post_preview_action($actions, $post) {
		$actions['mobile_preview'] = "<a href='#'' class='pagefrog-show-preview' data-post-id='{$post->ID}' data-post-title='{$post->post_title}'>Mobile Preview</a>";
		return $actions;
	}

	/**
	 * Adds the content for the preview modal to the post listings page
	 *
	 * @since 1.0.0
	 */
	public function add_preview_to_post_listings() {
		// only add previews to posts (not pages or custom post types)
		$allowed = ! isset( $_GET['post_type'] ); // if post_type is not set, we are on the generic posts page
		$post_type = 'post';
		if ( ! $allowed ) {
			$post_types = PageFrog_NewPostSettings_Storage::get_post_types();

			foreach( $post_types as $label => $post_type ) {
				if (  $_GET['post_type'] == $label ) {
					$allowed = true;
					$post_type = $label;
					break;
				}
			}
		}

		if ( $allowed ) {
			echo '<div id="pagefrog-preview-modal" style="display:none;">';
			$recent_post = wp_get_recent_posts( array(
				'numberposts' => 1,
				'post_type' => $post_type
			), OBJECT_K );
			$recent_post = $recent_post[0];
			render_preview( $recent_post );
			echo '</div>';
		}
	}

	/**
	 * Adds the "Mobile" column to the post listings page.
	 *
	 * @since 1.0.0
	 */
	public function add_post_listings_mobile_column($defaults) {
		$defaults['pagefrog_status'] = 'Mobile';
		return $defaults;
	}

	/**
	 * Fills the content of the "Mobile" column on the post listings page.
	 *
	 * @since 1.0.0
	 */
	public function fill_post_listings_mobile_column($column_name, $post) {
		if ($column_name == 'pagefrog_status') {
			$post_status = new PageFrog_PostStatus( $post );

			$fbia_on = $post_status->get_fbia_status() ;
			$amp_on = $post_status->get_amp_status();
			$amp_capable = wp_amp_plugin_is_installed() && wp_amp_plugin_is_active();

			$color = '';
			$fill = '';

			if ( $amp_capable ) {
				if ( $fbia_on ) {
					$color = 'green';
					if ( $amp_on ) {
						$fill = 'full';
					} else {
						$fill = 'half';
					}
				} else {
					if ( $amp_on ) {
						$fill = 'half';
						$color = 'green';
					} else {
						$fill = 'empty';
						$color = 'grey';
					}
				}
			} else {
				$color = 'yellow';
				$fill = 'full';
			}
			$post_title = get_the_title( $post );
			echo "<span pagefrog-title='View PageFrog Format Settings' class='pagefrog-status-circle pagefrog-show-preview' data-post-id='$post' data-post-title='$post_title'><span class='pagefrog-status-circle-inner $fill $color'></span></span>";
		}
	}

	/**
	 * The endpoint used to set the metadata for the post status.
	 *
	 * Post status controls whether or not a post will be converted to each available format.
	 *
	 * @since 1.0.0
	 */
	public function pagefrog_set_post_status() {
		if (!isset($_POST['fbia_status']) || !isset($_POST['amp_status']) || !isset($_POST['post_id'])) {
			$response = array(
				'status' => 'error',
				'message' => 'You must include both the AMP and Instant Articles status, as well as the post ID'
			);
			wp_send_json( $response );
			wp_exit();
		}

		// grab the post id
		$post_id = $_POST['post_id'];

		// grab and parse the fbia status
		$fbia_status = $_POST['fbia_status'];
		$fbia_status_bool = false;
		if ( $fbia_status === 'true' || $fbia_status === true ) {
			$fbia_status_bool = true;
		} else if ( $fbia_status === 'false' || $fbia_status === false ) {
			$fbia_status_bool = false;
		} else {
			$response = array(
				'status' => 'error',
				'message' => 'You must set Instant Articles status to true or false!'
			);
			wp_send_json( $response );
			wp_exit();
		}

		// grab and parse the amp status
		$amp_status = $_POST['amp_status'];
		$amp_status_bool = false;
		if ( $amp_status === 'true' || $amp_status === true ) {
			$amp_status_bool = true && wp_amp_plugin_is_installed() && wp_amp_plugin_is_active();
		} else if ( $amp_status === 'false' || $amp_status === false ) {
			$amp_status_bool = false;
		} else {
			$response = array(
				'status' => 'error',
				'message' => 'You must set the AMP status to true or false!'
			);
			wp_send_json( $response );
			wp_exit();
		}

		// save the statuses in the post metadata
		$post_status = new PageFrog_PostStatus( $post_id );

		if ( ! $post_status->is_valid_post() ) {
			$response = array(
				'status' => 'error',
				'message' => 'You must pass in a valid post.'
			);
			wp_send_json( $response );
			wp_exit();
		}
		$post_status->set_fbia_status( $fbia_status_bool );
		$post_status->set_amp_status( $amp_status_bool );

		$response = array(
			'status' => 'ok',
			'fbia_status' => $post_status->get_fbia_status(),
			'amp_status' => $post_status->get_amp_status(),
			'amp_capable' => wp_amp_plugin_is_installed() && wp_amp_plugin_is_active(),
		);
		wp_send_json( $response );
		wp_exit();
	}

	/**
	 * The endpoint used to bulk change the post status metadata.
	 *
	 * @since 	1.0.4
	 */
	public function bulk_edit_post_status() {
		if ( ! isset( $_POST['platform'] ) || ! isset( $_POST['enable'] ) || ! isset( $_POST['post_type']) ) {
			$response = array(
				'status' => 'error',
				'message' => 'You must include the platform that you would like to edit, the post type, as well as whether or not to enable.'
			);
			wp_send_json( $response );
			wp_exit();
		}

		$platform = $_POST['platform'];
		$status = $_POST['enable'];
		$post_type = $_POST['post_type'];

		$enable = $status === '1' || $status === 1;

		switch( $platform ) {
			case 'amp': {
				if ( $enable && ( ! wp_amp_plugin_is_installed() || ! wp_amp_plugin_is_active() ) ) {
					$response = array(
						'status' => 'error',
						'message' => 'You must install the WP Amp plugin before you can activate AMP pages. Please visit the PageFrog setup page to do that.',
					);
					wp_send_json( $response );
					wp_exit();
				}
				PageFrog_PostStatus::amp_set_all_published_posts( $enable, $post_type );
				break;
			}
			case 'fbia': {
				PageFrog_PostStatus::fbia_set_all_published_posts( $enable, $post_type );
				break;
			}
			default: {
				$response = array(
					'status' => 'error',
					'message' => 'You must specify either amp or facebook instant articles as your platform!'
				);
				wp_send_json( $response );
				wp_exit();
			}
		}

		$response = array(
			'status' => 'ok',
			'amp_enabled' => PageFrog_PostStatus::get_amp_enabled_post_count( $post_type ),
			'fbia_enabled' => PageFrog_PostStatus::get_fbia_enabled_post_count( $post_type ),
			'total' => PageFrog_PostStatus::get_post_count( $post_type )
		);
		wp_send_json( $response );
		wp_exit();
	}

	public function amp_render_template( $post_id ) {
		if ( wp_amp_plugin_is_installed() && wp_amp_plugin_is_active() ) {
			amp_render( $post_id );
			return;
		} else if ( wp_amp_plugin_is_installed() ){
			echo "<html><head></head><body style='background-color:white;'><h1>To generate AMP previews, you must activate the Wordpress AMP plugin. Click the button above to get started.</h1></body></html>";
			return;
		} else {
			echo "<html><head></head><body style='background-color:white;'><h1>To generate AMP previews, you must install the official Wordpress AMP plugin. Click the button above to get started.</h1></body></html>";
			return;
		}
	}

	public function amp_add_custom_post_support() {
		if ( defined( 'AMP_QUERY_VAR' ) ) {
			$post_types = PageFrog_NewPostSettings_Storage::get_post_types();

			// we only need this temporarily, until AMP WP 0.4
			add_rewrite_endpoint( AMP_QUERY_VAR, EP_ALL );
			// end temp need

			foreach ( $post_types as $label => $post_type ) {
				if ( $label !== 'post' ) {
					add_post_type_support( $label , AMP_QUERY_VAR );
				}
			}
		}
	}

	public function should_amp_be_active_for_post( $skip_post, $post ) {
		$pagefrog_metadata = new PageFrog_PostStatus( $post );
		return ! $pagefrog_metadata->get_amp_status();
	}

	public function pagefrog_activation_redirect() {
		if ( get_option( 'pagefrog_do_activation_redirect', false ) ) {
			delete_option( 'pagefrog_do_activation_redirect' );
			if ( ! isset( $_GET['activate-multi'] ) ) {
				wp_redirect( add_query_arg( 'pagefrog_contact' , 'true' , menu_page_url( $GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'], false ) ) );
			}
		}
	}

	/**
	 * Submission of the popup to send an email address to pagefrog.com
	 *
	 * @since 1.0.7
	 */
	public function signup_to_drip() {
		if ( ! isset( $_POST['site'] ) || $_POST['site'] === '' ) {
			wp_send_json( array(
				'status' => 'error',
				'reason' => 'Uh-oh! You must include your site',
			) );
			wp_exit();
		}
		if ( ! isset( $_POST['email'] ) || $_POST['email'] === '' ) {
			wp_send_json( array(
				'status' => 'error',
				'reason' => 'Uh-oh! You must include your email',
			) );
			wp_exit();
		}

		$site = $_POST['site'];
		$email = $_POST['email'];

		$url = 'http://pagefrog.com/register-for-drip/';
		$site_url = get_site_url();
		if ( PageFrog_Utils::contains( $site_url, 'localhost' ) ) {
			$url = 'http://localhost:8000/register-for-drip/';
		}

		$args = array(
			'body' => array(
				'site' => $site_url,
				'email' => $email
			)
		);
		$response = wp_remote_post( $url, $args );
		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		if ( ! isset( $data['status'] ) || $data['status'] === 'error' ) {
			wp_send_json( array(
				'status' => 'error',
				'reason' => 'Uh-oh! Something went wrong with that. Please try again later.'
			) );
			wp_exit();
		}

		wp_send_json( array(
			'status' => 'ok'
		) );
	}

	/**
	 * Sends an email to the PageFrog team, if the contact form is submitted.
	 *
	 * @since 1.0.4
	 */
	public function contact_form_submission_ajax () {
		if ( ! isset( $_POST['name'] ) || $_POST['name'] == '' ) {
			wp_send_json( array(
				'status' => 'error',
				'reason' => 'Uh-oh! You must include your name',
			) );
		}
		if ( ! isset( $_POST['email'] ) || $_POST['email'] == '' ) {
			wp_send_json( array(
				'status' => 'error',
				'reason' => 'Uh-oh! You must include your email address',
			) );
		}
		if ( ! isset( $_POST['comment'] ) || $_POST['comment'] == '' ) {
			wp_send_json( array(
				'status' => 'error',
				'reason' => 'Uh-oh! You must include your comment',
			) );
		}
		$name = $_POST['name'];
		$email = $_POST['email'];
		$comment = $_POST['comment'];

		$headers = "From: $name <$email>\r\n";
		$return = wp_mail( 'pagefrog@gmail.com', "PageFrog Wordpress Plugin Feedback from $name", stripslashes( trim( $comment ) ), $headers );

		wp_send_json( array(
			'status' => 'ok',
			'return' => $return
		) );
	}

	public function edit_amp_post_template_file( $file, $type, $post ) {
		// we have to get the path to the plugin directory, and if the plugin is symlinked __FILE__
		// returns the real path, not the symlink location, which causes the validation of the file
		// location returned from this function to break. Instead, we find the plugin directory by
		// looping over plugins.
		if ( 'style' === $type ) {
			$plugins = wp_get_active_and_valid_plugins();
			$pagefrog_path = dirname( plugin_dir_path( __FILE__ ) ); // start with this as the default. It'll work if there's no symlink

			foreach ( $plugins as $plugin ) {
				if ( strpos( $plugin, 'pagefrog.php' ) !== false) {
					$pagefrog_path = plugin_dir_path( $plugin );
				}
			}
			$file = $pagefrog_path . 'admin/partials/pagefrog-amp-template-styles.php';
		} else if ( 'single' === $type ) {
			$plugins = wp_get_active_and_valid_plugins();
			$pagefrog_path = dirname( plugin_dir_path( __FILE__ ) );

			foreach ( $plugins as $plugin ) {
				if ( strpos( $plugin, 'pagefrog.php' ) !== false ) {
					$pagefrog_path = plugin_dir_path( $plugin );
				}
			}
			$file = $pagefrog_path . 'admin/partials/pagefrog-amp-template-single.php';
		} else if ( 'meta-author' === $type ) {
			$plugins = wp_get_active_and_valid_plugins();
			$pagefrog_path = dirname( plugin_dir_path( __FILE__ ) );

			foreach ( $plugins as $plugin ) {
				if ( strpos( $plugin, 'pagefrog.php' ) !== false ) {
					$pagefrog_path = plugin_dir_path( $plugin );
				}
			}
			$file = $pagefrog_path . 'admin/partials/pagefrog-amp-template-meta-author.php';
		} else if ( 'meta-taxonomy' === $type ) {
			$plugins = wp_get_active_and_valid_plugins();
			$pagefrog_path = dirname( plugin_dir_path( __FILE__ ) );

			foreach ( $plugins as $plugin ) {
				if ( strpos( $plugin, 'pagefrog.php' ) !== false ) {
					$pagefrog_path = plugin_dir_path( $plugin );
				}
			}
			$file = $pagefrog_path . 'admin/partials/pagefrog-amp-template-meta-taxonomy.php';
		} else if ( 'meta-time' === $type ) {
			$plugins = wp_get_active_and_valid_plugins();
			$pagefrog_path = dirname( plugin_dir_path( __FILE__ ) );

			foreach ( $plugins as $plugin ) {
				if ( strpos( $plugin, 'pagefrog.php' ) !== false ) {
					$pagefrog_path = plugin_dir_path( $plugin );
				}
			}
			$file = $pagefrog_path . 'admin/partials/pagefrog-amp-template-meta-time.php';
		}

		return $file;
	}

	public function add_logo_to_schema_org ( $meta_data, $post ) {
		$styles = new PageFrog_Styling_Storage();
		$meta_data['publisher']['logo'] = array(
        '@type' => 'ImageObject',
        'url' => $styles->get_logo_img_url(),
        'height' => (string)$styles->get_logo_img_height(),
        'width' => (string)$styles->get_logo_img_width(),
    );

		// Google's validator seems to expect heights and widths as strings
    if ( isset( $meta_data['image'] ) && isset( $meta_data['image']['width'] ) ) {
    	$meta_data['image']['width'] = (string)$meta_data['image']['width'];
    }
    if ( isset( $meta_data['image'] ) && isset( $meta_data['image']['height'] ) ) {
    	$meta_data['image']['height'] = (string)$meta_data['image']['height'];
    }
    return $meta_data;
	}

	public function edit_amp_post_template_data( $data ) {
		// change the logo
		$styles = new PageFrog_Styling_Storage();
		$data['site_icon_url'] = $styles->get_logo_img_url();
		$data['site_icon_width'] = 24 * $styles->get_logo_img_width() / $styles->get_logo_img_height();
		$data['site_icon_height'] = 24;
		$data['pagefrog_version'] = $this->version;
		return $data;
	}

	public function add_analytics_to_amp_template_data( $data ) {
		$analytics = new PageFrog_Analytics_Storage();
		$data['pagefrog_analytics'] = $analytics;
		return $data;
	}

	public function add_analytics_script_to_amp_head( $data ) {
		$analytics = $data->get( 'pagefrog_analytics' );
		if ( $analytics->an_analytics_system_is_enabled() ) {
			include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/amp-analytics-script-tag.php';
		}
	}

	public function add_analytics_to_amp ( $data ) {
		if ( $data->get( 'pagefrog_analytics' ) && $data->get( 'post' ) ) {
			$post = $data->get( 'post');
			$analytics = $data->get( 'pagefrog_analytics' );
			if ( $analytics->get_google_analytics_enabled_bool() ) {
				include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/amp-google-analytics-template.php';
			}
			if ( $analytics->get_chartbeat_enabled_bool() ) {
				include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/amp-chartbeat-analytics-template.php';
			}
			if ( $analytics->get_parsely_enabled_bool() ) {
				include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/amp-parsely-analytics-template.php';
			}
			if ( $analytics->get_other_analytics_enabled_bool() ) {
				include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/amp-other-analytics-template.php';
			}
		}
	}

	public function add_analytics_to_fbia( $post ) {
		$analytics = new PageFrog_Analytics_Storage();
		if ( $analytics->get_google_analytics_enabled_bool() ) {
			include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/fbia-google-analytics-template.php';
		}
		if ( $analytics->get_chartbeat_enabled_bool() ) {
			include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/fbia-chartbeat-analytics-template.php';
		}
		if ( $analytics->get_parsely_enabled_bool() ) {
			include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/fbia-parsely-analytics-template.php';
		}
		if ( $analytics->get_other_analytics_enabled_bool() ) {
			include dirname( plugin_dir_path( __FILE__ ) ) . '/public/partials/fbia-other-analytics-template.php';
		}
	}

	public function set_new_post_metadata( $post_id ) {
		$post = get_post( $post_id );
		if ( $post->post_modified_gmt == $post->post_date_gmt && $post->post_type !== 'revision' ) {
			$new_post = new PageFrog_NewPostSettings_Storage();
			$status = new PageFrog_PostStatus( $post_id );
			$status->set_fbia_status( $new_post->get_fbia_enable_new_posts_bool_for( $post->post_type ) );
			$status->set_amp_status( $new_post->get_amp_enable_new_posts_bool_for( $post->post_type ) && wp_amp_plugin_is_installed() && wp_amp_plugin_is_active() );
		}
	}
}

function wp_amp_plugin_is_installed() {
	if ( isset( $GLOBALS['PRETEND_AMP_WP_IS_INSTALLED'] ) && $GLOBALS['PRETEND_AMP_WP_IS_INSTALLED'] === true ) {
		// for testing purposes
		return true;
	}
	if ( ! function_exists( 'get_plugins' ) ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
	}
	$plugins = get_plugins();
	return isset($plugins['amp/amp.php']);
}

function wp_amp_plugin_is_active() {
	if ( isset( $GLOBALS['PRETEND_AMP_WP_IS_ACTIVATED'] ) && $GLOBALS['PRETEND_AMP_WP_IS_ACTIVATED'] === true ) {
		// for testing purposes
		return true;
	}
	return function_exists( 'amp_render' );
}

function get_activate_wp_amp_plugin_url() {
	$plugin = 'amp/amp.php';
	$plugin_escaped = str_replace('/', '%2F', $plugin);

  $activateUrl = sprintf(admin_url('plugins.php?action=activate&plugin=%s&plugin_status=all&paged=1&s'), $plugin_escaped);

  // change the plugin request to the plugin to pass the nonce check
  $_REQUEST['plugin'] = $plugin;
  $activateUrl = wp_nonce_url($activateUrl, 'activate-plugin_' . $plugin);

  return $activateUrl;
}
?>