<?php
class Stupidbot_Campaign_Controller{
    var $stupidbot;
    public function __construct() {
    $this->stupidbot = new Stupidbot;
    if(isset($_POST['stupidbot_campaign'])) $this->create($_POST['stupidbot_campaign']);
    if(isset($_POST['stupidbot_campaigns'])) $this->update($_POST['stupidbot_campaigns']);
    if(isset($_POST['stupidbot_delete_campaign'])) $this->delete($_POST['stupidbot_delete_campaign']);
    if(isset($_POST['stupidbot_run_campaign'])) $this->run($_POST['stupidbot_run_campaign']);
    }
    
    public function hourly() {
    $campaigns = Stupidbot_Campaign::events('hourly');
    foreach ($campaigns as $campaign) {
      $this->run($campaign->id);
    }
    }
    
    public function daily() {
    $campaigns = Stupidbot_Campaign::events('daily');
    foreach ($campaigns as $campaign) {
      $this->run($campaign->id);
    }
    }
    public function twicedaily() {
    $campaigns = Stupidbot_Campaign::events('twicedaily');
    foreach ($campaigns as $campaign) {
      $this->run($campaign->id);
    }
    }
    
    public function update($campaigns){
    foreach($campaigns as $campaign){
      Stupidbot_Campaign::update($campaign);
      $this->stupidbot->alert .= "Campaign {$campaign['id']} updated<br>";
    }
    }
    
    public function delete($id){
    Stupidbot_Campaign::delete($id);
    $this->stupidbot->alert .= "Campaign $id deleted<br>";
    }
    
    public function create($campaign){
    $id = Stupidbot_Campaign::create($campaign);
    $this->stupidbot->alert .= "Campaign $id created<br>";
    }
    
    public function run($id)
    {
        $campaign = (array)Stupidbot_Campaign::find($id);
        require_once(ABSPATH . "wp-includes". '/pluggable.php');
        require_once(ABSPATH . "wp-admin" . '/includes/image.php');
        require_once(ABSPATH . "wp-admin" . '/includes/file.php');
        require_once(ABSPATH . "wp-admin" . '/includes/media.php');
        
        if(!class_exists('h2o')){
            require_once(SPP_PATH . '/templates/h2o/h2o.php');
            foreach (glob(SPP_PATH."/includes/*.php") as $filename) {
                require($filename); 
            }
        }
        
        $settings = $this->stupidbot->get_settings();
        if($campaign['id']){
        	$keywords = explode("\n", $campaign['keywords']);
			//print_r($keywords);
            if(count($keywords > 0)){
                shuffle($keywords);
                $keywords = array_slice($keywords, 0, $campaign['count']);
            }
        	else
        	{
        		$alert = "got empty keyword, aborting";
        		return $alert;	
        	}
        	
        	$posted = "";
            foreach ($keywords as $keyword){
                	
                $stupidbot_settings = $this->stupidbot->get_settings();
                
                $title = ($stupidbot_settings['clean_title']) ? ucwords($keyword) : $keyword ;
                $this->stupidbot->alert .= ($this->post_exist($title)) ?  $title .' exist, not posting.<br>' : $title .' not exists, posting.<br>';
                
                if($this->post_exist($title)<1){
                    $catnow = $campaign['category_id'];
                    $my_post = array(
                      'post_title' => $title,
                      'post_content' => spp($keyword, $campaign['template'], $campaign['hack']),
                      'post_status' => 'publish',
                      'post_author' => 1,
                      'post_category' => array($catnow)
                    );
                    
                    $mypost_id =  wp_insert_post( $my_post );
                    
            		
                    $posted .= $title . ' posted! <a href="' . get_permalink( $mypost_id ) . '" target="_blank">View Post</a><br>';
                    
                }
                $campaign['counter']++;
                
            }
        	
            Stupidbot_Campaign::update($campaign);
            $this->stupidbot->alert .= "<br>" . $posted;
    	}
    	else
    	{
    		$this->stupidbot->alert .= "Error: Campaign not found.";
    	}
    }
    
    public function deactivate(){
    wp_clear_scheduled_hook('stupidbot_hourly');
    wp_clear_scheduled_hook('stupidbot_daily');
    wp_clear_scheduled_hook('stupidbot_twicedaily');
    }
    
    public function slug( $string ) {
      return strtolower( preg_replace( array( '/[^-a-zA-Z0-9\s]/', '/[\s]/' ), array( '', '-' ), $string ) );
    }
    
    public function post_exist($title) {
        global $wpdb;
        return $wpdb->get_var($wpdb->prepare("SELECT COUNT(ID) FROM " . $wpdb->posts . " WHERE post_title = '%s' AND post_type = 'post'", $title ));
    }
}