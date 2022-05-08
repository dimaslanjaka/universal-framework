<?php

/*
## 0.1 Release Notes
* Migrating from papercut core engine
*/

global $stupidbot_db_version;
$stupidbot_db_version = '0.3';

include_once dirname( __FILE__ ).'/campaign.php';
include_once dirname( __FILE__ ).'/campaign_controller.php';
include_once dirname( __FILE__ ).'/campaign_helper.php';

class Stupidbot {
  public $alert = '';
  
  public function __set($key,$val) {
    $this->$key=$val;
  }
  public function __get($key) {
    return $this->$key;
  }
  
  public function __construct(){
      // add_action( 'admin_init', array( $this, 'enqueue_styles' ) );
    if(isset($_POST['stupidbot_settings'])) $this->update_settings($_POST['stupidbot_settings']);
    if(isset($_POST['wallpaper_create'])) $this->wallpaper_download();
    $this->create_category();
  }
  
  public function enqueue_styles() {
    wp_register_style('stupidbot_bootstrap', plugins_url('bootstrap/css/bootstrap-wpadmin.css',__FILE__ ));
    wp_enqueue_style('stupidbot_bootstrap');
    
    wp_register_style('stupidbot_bootstrap_fix', plugins_url('bootstrap/css/bootstrap-wpadmin-fixes.css',__FILE__ ));
    wp_enqueue_style('stupidbot_bootstrap_fix');
    
    wp_register_style('stupidbot_style', plugins_url('style.css',__FILE__ ));
    wp_enqueue_style('stupidbot_style');
    //wp_enqueue_script( 'stupidbot_bootstrap_js_jquery', 'http://code.jquery.com/jquery-1.7.2.min.js' );
    wp_enqueue_script( 'stupidbot_bootstrap_js', plugins_url('bootstrap/js/bootstrap.min.js', __FILE__) );
  }

	public function menu() {
		add_submenu_page( 'spp', 'StupidBot', 'StupidBot', 'manage_options', 'stupidbot', array( $this, 'settings' ), '', 3);
	}	
	
	public function get_settings(){
        $stupidbot_settings = get_option('stupidbot_settings');
        if(!isset($stupidbot_settings['wallpaper_width'])) $stupidbot_settings['wallpaper_width'] = 800;
        if(!isset($stupidbot_settings['wallpaper_height'])) $stupidbot_settings['wallpaper_height'] = 600;
        if(!isset($stupidbot_settings['wallpaper_count'])) $stupidbot_settings['wallpaper_count'] = 3;
        if(!isset($stupidbot_settings['wallpaper_api'])) $stupidbot_settings['wallpaper_api'] = '01B352A888B29AE34D58B17E7C1317F9317F2714';
        if(!isset($stupidbot_settings['clean_title'])) $stupidbot_settings['clean_title'] = 1;
        return $stupidbot_settings;
	}
	
	public function update_settings($stupidbot_settings){
        if(!isset($stupidbot_settings['clean_title'])) $stupidbot_settings['clean_title'] = 0;
        update_option('stupidbot_settings', $stupidbot_settings);
	}
	
	public function create_category(){
    require_once(ABSPATH . 'wp-admin/includes/taxonomy.php');
    if(isset($_POST['stupidbot_addcat']))
    {
    	$newcat = $_POST['stupidbot_newcat'];
    	if(wp_create_category($newcat))
    	{
    		$this->alert = 'New Category Created';
    	}
    }	
	}
	
	public function settings(){
        $templates = glob(SPP_PATH . "/templates/*.html");
        
        foreach($templates as $index => $template){
            $templates[$index] = str_replace(SPP_PATH . "/templates/", '', $template);
        }
        
        $stupidbot_settings = $this->get_settings();
        include('inc/settings.php');
	}
}

$stupidbot_campaign_controller = new Stupidbot_Campaign_Controller();
add_action( 'admin_menu', array( $stupidbot_campaign_controller->stupidbot, 'menu' ) );
register_activation_hook( __FILE__, array( 'Stupidbot_Campaign', 'activate' ) );
register_deactivation_hook( __FILE__, array( $stupidbot_campaign_controller, 'deactivate' ) );
add_action('stupidbot_hourly', array($stupidbot_campaign_controller, 'hourly'));
add_action('stupidbot_daily', array($stupidbot_campaign_controller, 'daily'));
add_action('stupidbot_twicedaily', array($stupidbot_campaign_controller, 'twicedaily'));

function stupidbot_update_db_check() {
    global $stupidbot_db_version;
    if (get_option('stupidbot_db_version') != $stupidbot_db_version) {
        Stupidbot_Campaign::create_table();
    }
}
add_action('plugins_loaded', 'stupidbot_update_db_check');


if ( !wp_next_scheduled( 'stupidbot_hourly' ) ) {
		wp_schedule_event( current_time( 'timestamp' ), 'hourly', 'stupidbot_hourly');
}
if ( !wp_next_scheduled( 'stupidbot_daily' ) ) {
		wp_schedule_event( current_time( 'timestamp' ), 'daily', 'stupidbot_daily');
}
if ( !wp_next_scheduled( 'stupidbot_twicedaily' ) ) {
		wp_schedule_event( current_time( 'timestamp' ), 'twicedaily', 'stupidbot_twicedaily');
}