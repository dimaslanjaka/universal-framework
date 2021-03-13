<?php
/*
/*-----------------------------------------------*/
/* KENTOOZ THEMES INIT
/* Website    : http://www.kentooz.com
/* The Author : Gian Mokhammad Ramadhan (http://www.gianmr.com)
/* Twitter    : http://www.twitter.com/g14nnakal 
/* Facebook   : http://www.facebook.com/gianmr
/*-----------------------------------------------*/

/*
* Add other script
*/
require_once get_template_directory() . '/includes/functions/BFI_Thumb.php';
// Change the upload subdirectory to wp-content/uploads/other_dir
@define( BFITHUMB_UPLOAD_DIR, 'ktz' ); 

//Automatic update
require get_template_directory() . '/includes/functions/theme-update-checker.php';
$kentooz_update_checker = new ThemeUpdateChecker (
	'flatsimplebingit',
	'http://www.kentooz.com/files/flatsimplebingit/barakutakflatsimplebingit.json'
);

//Importer
function load_radium_one_click_demo_install(){
	require get_template_directory() . '/includes/importer/init.php';
}
add_action( 'after_setup_theme', 'load_radium_one_click_demo_install', 2 );
 
class KENTOOZ {
	/* 
	* LOAD ALL function in kentooz framework
	* This loader function call in functions.php in root theme.
	*/
	public static function init() {
		self::ktz_definitions();
		self::ktz_functions();
		self::ktz_add_actions();
		self::ktz_locale();
	}

	/* 
	* Define URL
	*/
	public static function ktz_definitions() {
		/* 
		* Retrieves the absolute path to the directory of the current theme, without the trailing slash.
		* ktz or kentooz use directory /includes for all function
		*/	
		define( 'ktz_dir', get_template_directory() . '/' );
		define( 'ktz_inc', get_template_directory() . '/includes/' );
		/* 
		* Retrieve template directory URI for the current theme. Checks for SSL.
		* Note: Does not return a trailing slash following the directory address. 
		* This can use path for JS, stylesheet, or image
		* ktz or kentooz use directory /includes for all function
		*/	
		define( 'ktz_url', get_template_directory_uri() . '/' );
		define( 'ktz_styleinc', get_template_directory_uri() . '/includes/' );
	}
		
	/* 
	* Require once php file in kentooz framework
	*/
	public static function ktz_functions() {
		/**
		* Required: include OptionTree kentooz setting admin and meta boxes.
		*/
		require_once ktz_inc . 'admin/theme-options.php';
		require_once ktz_inc . 'admin/meta-boxes.php';
		/**
		* Required: include OptionTree kentooz google font.
		* Require Google API Key
		*/
		require_once ktz_inc . 'admin/googlefont/gfont-functions.php';
		require_once ktz_inc . 'admin/googlefont/ot-google-fonts.php';
		/**
		* Required: include OptionTree kentooz select functions.
		*/
		require_once ktz_inc . 'admin/select/googlefont.php';
		require_once ktz_inc . 'admin/select/optionselect.php';
		/**
		* Required: include widget function for kentooz framework
		*/
		require_once ktz_inc . 'widget/widget.php';
		/**
		* Required: include shortcode function for kentooz framework
		*/
		require_once ktz_inc . 'shortcodes/shortcode.php';
		/**
		* Required: include all function themes for kentooz framework
		*/
		require_once ktz_inc . 'functions/_agc_ktz.php';
		require_once ktz_inc . 'functions/_authorbox_ktz.php';
		require_once ktz_inc . 'functions/_banner_ktz.php';
		require_once ktz_inc . 'functions/_comment_ktz.php';
		require_once ktz_inc . 'functions/_content_ktz.php';
		require_once ktz_inc . 'functions/_core_ktz.php';
		require_once ktz_inc . 'functions/_css_ktz.php';
		require_once ktz_inc . 'functions/_footer_ktz.php';
		require_once ktz_inc . 'functions/_head_ktz.php';
		require_once ktz_inc . 'functions/_js_ktz.php';
		require_once ktz_inc . 'functions/_logo_ktz.php';
		require_once ktz_inc . 'functions/_loop_ktz.php';
		require_once ktz_inc . 'functions/_navigation_ktz.php';
		require_once ktz_inc . 'functions/_rating_ktz.php';
		require_once ktz_inc . 'functions/_related_ktz.php';
		require_once ktz_inc . 'functions/_social_ktz.php';
		require_once ktz_inc . 'functions/_sidebar_ktz.php';
		require_once ktz_inc . 'functions/_slider_ktz.php';
		require_once ktz_inc . 'functions/_thumbnail_ktz.php';
		require_once ktz_inc . 'functions/_video_ktz.php';
		require_once ktz_inc . 'functions/_woocommerce_ktz.php';
		/**
		* Custom functions that act independently of the theme templates
		*/
		require_once ktz_inc . 'external/tgmpa.php';
	}	
	
	/* 
	* add actions for kentooz hook
	*/
	public static function ktz_add_actions() {		
		/**
		* Optional: set 'ot_show_pages' filter to false.
		* This will hide the settings & documentation pages.
		*/
		add_filter( 'ot_show_options_ui', '__return_false' );
		add_filter( 'ot_show_docs', '__return_false' );
		add_filter( 'ot_show_pages', '__return_false' );	
		
		/**
		* Optional: set 'ot_show_new_layout' filter to false.
		* This will hide the "New Layout" section on the Theme Options page.
		*/
		add_filter( 'ot_show_new_layout', '__return_false' );

		/**
		* Required: set 'ot_theme_mode' filter to true.
		*/
		if (!class_exists('OT_Loader')) {
		add_filter('ot_theme_mode', '__return_true');
		/**
		* Required: include OptionTree.
		* http://wordpress.org/extend/plugins/option-tree/
		*/
		require_once ktz_inc . 'admin/ot-loader.php';
		}
	}
	public static function ktz_locale() {
		/** 
		* Get locale languange
		*/
		$locale = get_locale();
		load_theme_textdomain( 'ktz_theme_textdomain', ktz_dir . 'languages' );
		$locale_file = ktz_dir . "languages/$locale.php";
		if ( is_readable( $locale_file ) )
			require_once $locale_file;
	}
}

?>