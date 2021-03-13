<?php
error_reporting(0);
define( 'AMP_CONSTANT', 'wpamp' );
define( 'WPAMP_BG_COLOR', '#FF9800' );
define( 'WPAMP_TEXT_COLOR', '#666' );
define( 'WPAMP_MAX_WIDTH', '800' );
define( 'WPAMP_MIN_WIDTH', '200' );
define( 'WPAMP_SCHEMA_LIST', 'BlogPosting' );
define( 'WPAMP_CATEGORY_TITLE', 'Categories' );

/*
 * Get post image url
 */
register_nav_menus( array(
	'wpamp_menu' => 'WP AMP Ninja Menu',
) );

/*
 * Notification
 */
add_action( 'wp_ajax_hide_wpamp_notification', 'hide_wpamp_notification' );
function hide_wpamp_notification() {
	set_transient( 'wpamp_notification', '1', (60 * 60 * 24 * 30) );
	wp_die();
}
?>