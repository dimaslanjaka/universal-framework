<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

/** Global Variables */
define('AMP_REQUIRED_PHP_VERSION', '5.3');
define('AMP_REQUIRED_WP_VERSION', '3.0');
define('AMP_REQUIRED_WP_VERSION_AS', '3.0000000000000000000000000');
define('AMP_REQUIRED_WP_NETWORK', false);
define('AMP_PATH', dirname(__FILE__));
define('AMP_FILE', AMP_PATH . DIRECTORY_SEPARATOR . 'amp-supremacy.php');
define('AMP_URL', plugin_dir_url(__FILE__));

define('SITE_FULL_PLUGIN_PATH', ABSPATH . 'wp-content/plugins/' );
define('AMP_LITE_PLUGIN_PATH', 'amp-supremacy-sitemap/index-amp.php' );

define('AMP_CUSTOM_SETTINGS_SWITCH', 'amps_use_custom_settings');
define('AMP_CUSTOM_SETTINGS', 'amps_custom_settings');
define('AMPS_SAMPLE_PAGE_URL', site_url().'?plugin_trigger=amps_sample');

define('AMPS_IMPORT_SETTING_PAGE_URL', site_url().'?plugin_trigger=amps_import_setting');
define('AMPS_LICENSING_URL', 'http://ampsupremacy.com');
define('AMPS_PARAPHRASE', '7e98b8a17c0aad30ba64d47b74e2a6c1');
define('AMPS_LITE_REGISTRATION_KEY', 'amps_lite-options');
define('AMPS_LITE_LICENSE_REQUEST_EMAIL', 'amps_lite_license_request_email');
define('AMPS_LITE_LICENSE_REQUESTED', 'amps_lite_license_requested');

define('SUPREMACY_BANNER_IMAGE', '<amp-img layout="responsive" height="300" width="800" src="https://scontent.fixc1-1.fna.fbcdn.net/v/t1.0-9/13900339_731771893627883_6287986080532992474_n.jpg?oh=e1ba68e28d5ad8161b996baf836cfe95&oe=590FC254"></amp-img>');

$amps_site_lang = get_bloginfo('language');
define('AMPS_SITE_LANGUAGE', $amps_site_lang);

/** Global Variables */
/** Define Global JS/CSS */
$global_js = array(
    'amp_uikit',
    'amp_uikit_notify',
    'amp_uikit_accordion',
    'amp_uikit_lightbox',
    'amp_main',
    'amp_ajaxq',
    'amp_spectrum',
    'amp_sticky',
    'media-upload',
    'thickbox'
);
$global_css = array(
    'amp_main',
    'amp_uikit',
    'amp_uikit_notify',
    'amp_uikit_progress',
    'amp_font-awesome',
    'amp_spectrum',
    'thickbox'
);

$global_content_specs = array(
    'youtube' => array(),
    'iframe' => array(),
    'form' => array(),
    'audio' => FALSE,
    'lightbox' => FALSE
);

/** Define Pages */
$amp_pages = array(
    // Main Tab
    array(
        "Type" => "MENU",
        "Page_Title" => "AMP Supremacy",
        "Menu_Title" => "AMP Supremacy",
        "Capability" => "manage_options",
        "Slug" => "amp-settings",
        "Parent_Slug" => "",
        "Icon" => "/assets/img/logo_menu.png",
        "JavaScript" => array(),
        "Css" => array()
    )
);

/** Include all dependencies */
$files = glob(AMP_PATH . '/inc/wp_*');
foreach ($files as $f) {
    require_once ( $f );
}
require_once AMP_PATH . '/models/wp_render.php';
/** Include all dependencies */
/** Register Init Hooks */
register_activation_hook(AMP_FILE, array('AMP_Init', 'activate'));
register_deactivation_hook(AMP_FILE, array('AMP_Init', 'deactivate'));
register_uninstall_hook(AMP_FILE, array('AMP_Init', 'uninstall'));

/** Register Init Hooks */
add_action('wp_head', array('AMP_Init', 'addMetaTag'), 1, 1);
add_action('wp_ajax_register_advanced_amp', array('AMP_Init', 'register_advanced_amp'));

add_action('wp_ajax_import_amps_settings', array('AMP_Post', 'import_amps_settings'));

add_action('amp_supremacy_load_analytics_widget_amps', 'AMP_Init::load_analytics_widget', 10, 2);
add_action('amp_supremacy_load_amp_pro_dummy_controls', 'AMP_Init::load_amp_pro_dummy_controls');
add_action('wp_ajax_disable_amps_for_this_post', array('AMP_Init', 'disable_amps_for_this_post'));
add_action('wp_ajax_amps_licensing', array('AMP_Licensing', 'process_licensing'));
add_action('wp_ajax_amps_licensing_request', array('AMP_Licensing', 'process_licensing_request'));

add_filter('manage_posts_columns', array('AMP_Init', 'add_amps_custom_columns'));
add_action('manage_posts_custom_column', array('AMP_Init', 'render_amps_custom_column_content'), 10, 2);
add_filter('manage_pages_columns', array('AMP_Init', 'add_amps_custom_columns'));
add_action('manage_pages_custom_column', array('AMP_Init', 'render_amps_custom_column_content'), 10, 2);

add_filter( 'wpseo_canonical', array('MAMP_Render', 'amps_filter_yoast_canonical'));

/** When plugin version is upgraded * */
add_action('upgrader_process_complete', array('AMP_Init', 'upgrade'));


add_filter('plugin_action_links_' . plugin_basename(AMP_FILE), array('AMP_Init', 'amp_settings_plugin_action_links'));
add_filter('ps_meta_data', array('MAMP_Render', 'amps_load_ps_meta_data'));

add_action('add_meta_boxes', array('AMP_Init', 'addPagePostCustomOptionsBox'));
add_action('save_post', array('AMP_Init', 'saveCustomBoxData'));

add_action('template_redirect', array('MAMP_Render','amps_plugin_trigger_check'));
add_action('wp_ajax_amps_get_entity_options', array('AMP_Post','amps_get_entity_options'));
add_action( 'admin_head', array('AMP_Init', 'amps_add_my_favicon'));

/** Start the plugin */
if (AMP_Init::verify_requirements()) {
    AMP_Init::init();
} else {
    add_action('admin_notices', function() {
        global $wp_version;
        require_once(AMP_PATH . '/pages/notices/requirements-error.php');
    });
    require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    deactivate_plugins(AMP_FILE);
}

if (!function_exists('plugin_get_version')) {

    function plugin_get_version() {
        if (!function_exists('get_plugins'))
            require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        $plugin_folder = get_plugins('/' . plugin_basename(dirname(__FILE__)));
        $plugin_file = 'amp-supremacy.php';
        return $plugin_folder[$plugin_file]['Version'];
    }

}

if (!function_exists('is_amp_supremacy_endpoint')) {

    function is_amp_supremacy_endpoint() {
        return MAMP_Render::extractAMP($_SERVER['REQUEST_URI']);
    }

}
