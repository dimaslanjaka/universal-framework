<?php
// PHP STARTS HERE
if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

$amps = get_option('amps');

$amp_sitemap_xml_exists = file_exists(ABSPATH.'amp-sitemap.xml');
$amp_menu_list = get_terms('nav_menu');

$checkBoxName = $amps['mobile_screen_entity']; 
$amps_get_entity = AMP_Post::amps_get_entity_options($checkBoxName, 'array');
$ampsObjects = array('on_home', 'on_posts', 'on_pages', 'on_categories', 'on_tags');

$ampsAllObjectsSet = array();
if(!empty($amps)){
    foreach($ampsObjects as $ampsObject){
        if(isset($amps[$ampsObject]) && $amps[$ampsObject] == 1){
            $ampsAllObjectsSet[] = TRUE;
        }
    }
}

$amp_sitemap_exists = file_exists(ABSPATH.'wp-content/plugins/amp-supremacy-sitemap');
$is_amp_lite_active = is_plugin_active('amp-supremacy-sitemap/index-amp.php');
$registration_status = AMP_Licensing::isAMPLiteRegistered();

$AMPLiteLicenseRequested = get_option(AMPS_LITE_LICENSE_REQUESTED);
$AMPLiteLicenseRequestEmail = get_option(AMPS_LITE_LICENSE_REQUEST_EMAIL);
?>
