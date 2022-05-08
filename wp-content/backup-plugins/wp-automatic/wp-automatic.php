<?php
/*
 Plugin Name: Wordpress Automatic Plugin
 Plugin URI: http://codecanyon.net/item/wordpress-automatic-plugin/1904470?ref=ValvePress
 Description: Wordpress automatic posts high quality articles,amazon products,clickbank products,youtube videos , eBay items,flicker images and RSS feeds posts on auto-pilot.
 Version: 3.39.1
 Author: ValvePress
 Author URI: http://codecanyon.net/user/ValvePress/portfolio?ref=ValvePress
 */

/*  Copyright 2012-2017  Wordpress Automatic  (email : sweetheatmn@gmail.com) */

global $wpAutomaticTemp; //temp var used for displaying columns of campsigns 
global $wpAutomaticDemo;
$wpAutomaticDemo = false; 

if(stristr($_SERVER['HTTP_HOST'], 'valvepress.com')) $wpAutomaticDemo = true;


$licenseactive=get_option('wp_automatic_license_active','');
if(trim($licenseactive) != ''){
	
 
	//fire checks
	require_once  plugin_dir_path(__FILE__) . 'plugin-updates/plugin-update-checker.php';
	$wp_automatic_UpdateChecker = Puc_v4_Factory::buildUpdateChecker(
			'http://deandev.com/upgrades/meta/wp-automatic.json',
			__FILE__,
			'wp-automatic'
			);
	
	//append keys to the download url
	$wp_automatic_UpdateChecker->addResultFilter('wp_automatic_addResultFilter');
	function wp_automatic_addResultFilter($info){
		
		$wp_automatic_license = get_option('wp_automatic_license','');
		
		if(isset($info->download_url)){
			$info->download_url = $info->download_url . '&key='.$wp_automatic_license;
		}
		return $info;
	}
}

// amazon
require_once ( dirname(__FILE__) . '/inc/amazon_api_class.php');

/*  
 * Stylesheets & JS loading
 */
	require_once 'p_scripts.php';

/*
 * Creating a Custom Post Type
 */
	require_once 'post_type.php';

/*
 * Creating the admin menu
 */
	require_once 'p_menu.php';

/*
 * Settings
 */	
	require_once 'p_options.php';

/*
 * Log
 */	
	require_once 'p_log.php';
	

/*
 * Plugin functions
 */

	require_once 'p_functions.php';
	
	/*
	 * ajax handling
	 */
	require_once 'pajax.php';
	
/*
 * ads adding
 */
require_once 'p_ads.php';

/*
 * Meta Box
 */
require_once('p_meta.php');
require_once('metabox_time.php');

/*
 * Cron Schedule
 */
require_once 'automatic_schedule.php';

/*
 * clear feed cache 
 */

add_filter( 'wp_feed_cache_transient_lifetime', 'wp_automatic_feed_lifetime');

function wp_automatic_feed_lifetime( $a  ){
	 return 0 ; 
}

if(! function_exists('do_not_cache_feeds')){
	function do_not_cache_feeds(&$feed) {
		$feed->enable_cache(false);
	}
}
add_action( 'wp_feed_options', 'do_not_cache_feeds' );

/*
 * Filter the content to remove first image if active
 */
require_once 'p_content_filter.php';

/*
 * tables
 */
register_activation_hook( __FILE__, 'create_table_all' );
require_once 'p_tables.php';

//removes quick edit from custom post type list

/**
 * custom request for cron job
 */
function wp_automatic_parse_request($wp) {

	//secret word 
	$wp_automatic_secret = trim(get_option('wp_automatic_cron_secret'));
	if(trim($wp_automatic_secret) == '') $wp_automatic_secret = 'cron';
	
	// only process requests with "my-plugin=ajax-handler"
	if (array_key_exists('wp_automatic', $wp->query_vars)) {
			
		if($wp->query_vars['wp_automatic'] == $wp_automatic_secret){
 
			require_once(dirname(__FILE__) . '/cron.php');
			exit;

		}elseif ($wp->query_vars['wp_automatic'] == 'download'){
			require_once 'downloader.php';
			exit;
		}elseif ($wp->query_vars['wp_automatic'] == 'test'){
			require_once 'test.php';
			exit;
		}elseif($wp->query_vars['wp_automatic'] == 'show_ip'){
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_HEADER,0);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
			curl_setopt($ch, CURLOPT_TIMEOUT,20);
			curl_setopt($ch, CURLOPT_REFERER, 'http://www.bing.com/');
			curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8');
			curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Good leeway for redirections.
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
			curl_setopt($ch, CURLOPT_COOKIEJAR , "cookie.txt");
			
			//curl get
			$x='error';
			$url='http://www.whatismyip.com/';
			
			curl_setopt($ch, CURLOPT_HTTPGET, 0);
			curl_setopt($ch, CURLOPT_URL, trim($url));
			
			$exec=curl_exec($ch);
			$x=curl_error($ch);
				
			echo $exec.$x;
			exit;
		}
	}
}
add_action('parse_request', 'wp_automatic_parse_request');



function wp_automatic_query_vars($vars) {
	$vars[] = 'wp_automatic';
	return $vars;
}
add_filter('query_vars', 'wp_automatic_query_vars');

/*
 * support widget
 */

if( ! $wpAutomaticDemo)
require_once 'widget.php';


/*
 * rating notice
 */
require_once 'p_rating.php';
require_once 'p_license.php';

/*
 * update notice
 */
require_once 'updated.php';

/*
 * admin edit
 */
require_once 'wp-automatic-admin-edit.php';

/*
 *amazon product price update
 */
require_once 'wp-automatic-amazon-prices.php';

//sorting function
function wp_automatic_sort($a,$b){
	return strlen($b)-strlen($a);
}

//stripslashes with array support
function wp_automatic_stripslashes($toStrip){
	if(is_array($toStrip)){
		
		return array_map('wp_automatic_stripslashes',$toStrip);
		
	}else{
		return stripslashes($toStrip);
	}
}

?>