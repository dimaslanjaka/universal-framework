<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://pagefrog.com
 * @since      1.0.0
 *
 * @package    pagefrog
 * @subpackage pagefrog/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    pagefrog
 * @subpackage pagefrog/includes
 * @author     PageFrog Team <team@pagefrog.com>
 */
class PageFrog {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      PageFrog_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->plugin_name = 'pagefrog';
		$this->version = '1.0.9';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
        $this->define_filters();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - PageFrog_Loader. Orchestrates the hooks of the plugin.
	 * - PageFrog_i18n. Defines internationalization functionality.
	 * - PageFrog_Admin. Defines all hooks for the admin area.
	 * - PageFrog_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-pagefrog-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-pagefrog-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-pagefrog-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-pagefrog-public.php';

		/**
		 * The class responsible for parsing into Instant Articles format
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-pagefrog-instant-articles-parser.php';

		$this->loader = new PageFrog_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the PageFrog_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new PageFrog_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new PageFrog_Admin( $this->get_plugin_name(), $this->get_version() );

		// activation redirect
		$this->loader->add_action( 'admin_init', $plugin_admin, 'pagefrog_activation_redirect' );

		// scripts and styles
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
		$this->loader->add_action( 'admin_print_scripts-media-upload-popup', $plugin_admin, 'enqueue_scripts' );

		// preview handling
		$this->loader->add_action( 'add_meta_boxes', $plugin_admin, 'add_meta_boxes' );
		$this->loader->add_action( 'wp_ajax_pagefrog_get_preview', $plugin_admin, 'pagefrog_get_preview_callback' );
		$this->loader->add_action( 'wp_ajax_pagefrog_set_post_status', $plugin_admin, 'pagefrog_set_post_status' );

		// adding admin pages
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'add_settings_page' );

		// styling settings
		$this->loader->add_action( 'admin_init', $plugin_admin, 'add_styling_settings_fields' );

		// analytics settings
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'add_analytics_settings_fields' );

		// ads settings
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'add_ads_settings_fields' );

		// previews on the posts table
		$this->loader->add_action( 'admin_init', $plugin_admin, 'add_post_listing_table_hooks' );

		// amp rendering
		$this->loader->add_action( 'init', $plugin_admin, 'amp_add_custom_post_support' );
		$this->loader->add_filter( 'amp_skip_post', $plugin_admin, 'should_amp_be_active_for_post', 10, 2 );
		$this->loader->add_action( 'init', $plugin_admin, 'hook_up_previews' );
		$this->loader->add_action( 'wp', $plugin_admin, 'maybe_handle_preview' );
		$this->loader->add_filter( 'wp', $plugin_admin, 'maybe_disable_plugins' );

		// contact us form page
		$this->loader->add_action( 'wp_ajax_pagefrog_contact_form_submission', $plugin_admin, 'contact_form_submission_ajax');

		// new amp hooks for rendering
		$this->loader->add_filter( 'amp_post_template_file', $plugin_admin, 'edit_amp_post_template_file', 10, 3 );
		$this->loader->add_filter( 'amp_post_template_data', $plugin_admin, 'edit_amp_post_template_data' );
		$this->loader->add_filter( 'amp_post_template_data', $plugin_admin, 'add_analytics_to_amp_template_data' );
		$this->loader->add_action( 'amp_post_template_head', $plugin_admin, 'add_analytics_script_to_amp_head' );
		$this->loader->add_action( 'amp_post_template_body_begin', $plugin_admin, 'add_analytics_to_amp' );
		$this->loader->add_filter( 'amp_content_sanitizers', $plugin_admin, 'add_amp_ads_sanitizer', 10, 2 );
		$this->loader->add_filter( 'amp_content_sanitizers', $plugin_admin, 'add_amp_header_image_sanitizer', 10, 2 );
		$this->loader->add_filter( 'amp_post_template_metadata', $plugin_admin, 'add_logo_to_schema_org', 10, 2 );

		// hooks for fbia rendering
		$this->loader->add_action( 'pagefrog_post_instant_articles_content', $plugin_admin, 'add_analytics_to_fbia' );

		// contact us form page
		$this->loader->add_action( 'wp_ajax_pagefrog_contact_form_submission', $plugin_admin, 'contact_form_submission_ajax' );
		$this->loader->add_action( 'wp_ajax_pagefrog_signup_to_drip', $plugin_admin, 'signup_to_drip' );

		// the settings page
		$this->loader->add_action( 'wp_ajax_pagefrog_bulk_edit_post_status', $plugin_admin, 'bulk_edit_post_status' );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'add_settings_fields' );

		// adding meta data to new posts
		$this->loader->add_action( 'save_post', $plugin_admin, 'set_new_post_metadata', 10, 3 );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new PageFrog_Public( $this->get_plugin_name(), $this->get_version() );

        $this->loader->add_action( 'do_feed_' . $GLOBALS['PAGEFROG_FBIA_FEED_NAME'], $plugin_public, 'generate_instant_articles_feed' );
	}

	/**
	 * Register all of the filters related to the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_filters() {

	    $plugin_parser = new PageFrog_Parser_InstantArticles( $this->get_plugin_name(), $this->get_version() );

      $this->loader->add_filter('pagefrog_format_instant_articles_content', $plugin_parser, 'pagefrog_format_instant_articles_content');
      $this->loader->add_filter('pagefrog_format_instant_articles_content_preview', $plugin_parser, 'pagefrog_format_instant_articles_content_preview');
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    PageFrog_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}