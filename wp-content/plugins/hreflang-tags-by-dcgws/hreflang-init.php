<?php
/**
 *
 *  @package HREFLANG Tags Pro\Init
 *  @since 1.3.3
 *
 */

if ( ! function_exists( 'add_filter' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

if (file_exists(HREFLANG_PLUGIN_MAIN_PATH. 'includes/notices.php')) {
	include_once(HREFLANG_PLUGIN_MAIN_PATH. 'includes/notices.php');
}
else {
	die('Notices are missing');
}

if (file_exists(HREFLANG_PLUGIN_MAIN_PATH. 'includes/functions.php')) {
	include_once(HREFLANG_PLUGIN_MAIN_PATH. 'includes/functions.php');
}
else {
	die('Functions are missing');
}

if (file_exists(HREFLANG_PLUGIN_MAIN_PATH. 'includes/variables.php')) {
	include_once(HREFLANG_PLUGIN_MAIN_PATH. 'includes/variables.php');
}
else {
	die('Variables are missing');
}

if (file_exists(HREFLANG_PLUGIN_MAIN_PATH. 'includes/actions.php')) {
	include_once(HREFLANG_PLUGIN_MAIN_PATH. 'includes/actions.php');
}
else {
	die('Actions are missing');
}
global $hreflanguages;

register_activation_hook(__FILE__,'hreflang_admin_actions');
// init text domain

// add this link only if admin and option is enabled
if (get_option('hreflang-enable-admin-menu', 'false' ) == 'true' ){
	if (is_admin()) {
		add_action( 'wp_before_admin_bar_render', 'hreflang_admin_bar' );
	}
}
$plugin = plugin_basename( HREFLANG_PLUGIN_FILE );
add_filter( "plugin_action_links_$plugin", "hreflang_plugin_settings_link", 10, 4 );
$notices = HREFLangTags_Admin_Notices::get_instance();
$date_now = date("Y-m-d");
if ($date_now <= '2020-02-01' && $date_now >= '2020-01-15') {
	$text = __('Upgrade to one of our Lifetime Pro licenses and receive free upgrades and support forever. <strong><i>Save 50% on every lifetime plan we offer.</i> Do not miss out on this limited time offer.</strong> Includes our newly improved Bulk Editor. <a href="https://www.hreflangtags.com/lifetime-pricing/#utm_source=plugin-page&utm_medium=notice&utm_campaign=50-to-start-2020">Click Here</a> to download right now. Use the discount code 50TOSTART20!','hreflang-tags-by-dcgws');
	$notices->info( $text, 'start-2020-dismissed' );
}
