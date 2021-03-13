<?php
/*
Plugin Name: WP AMP Ninja
Plugin URI:  http://wordpress.org/wp-amp-ninja/
Description: The plugin would help in adding support for Accelerated Mobile Pages (AMP) Project, and this is an open source program. 
Version:     2.0.3
Author:      WP AMP Ninja 
Author URI:  http://wpampninja.com/
Text Domain: wp-amp-ninja
License:     GPL2
*/
/*
 * if accessed directly - Exit
 */
if ( ! defined( 'ABSPATH' ) ) exit;

/*
 * Define all constants here to use static values in the plug-in files
 */
define( 'WPAMP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'WPAMP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'WPAMP_PLUGIN_BASENAME', plugin_basename(__FILE__) );
require_once( dirname( __FILE__ ) . '/admin/common.php' );

/*
 * Initialize the plug-in just after the global WP class object is set up
 */
add_action( 'init', 'wpamp_init' );
function wpamp_init() {
	add_action( 'wp', 'wpamp_initialize_plugin' );
	if ( is_admin() ) {
		require_once( dirname( __FILE__ ) . '/admin/settings.php' );
	}
}

/*
 * Render the templates and hooks
 */
function wpamp_initialize_plugin() {
	if( isset( $_GET[AMP_CONSTANT] ) ) {
		require_once( WPAMP_PLUGIN_PATH . '/includes/simple_html_dom.php' );
		require_once( WPAMP_PLUGIN_PATH . '/includes/wpamp-functions.php' );
		require_once( WPAMP_PLUGIN_PATH . '/includes/wpamp-render.php' );
	} else {
		require_once( WPAMP_PLUGIN_PATH . '/includes/wpamp-front.php' );
		return;
	}
}