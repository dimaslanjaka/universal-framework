<?php
class Stupidbot_Campaign{
  public static function activate(){
    stupidbot_update_db_check();
//     if( self::count() < 1 ) self::seed();
  }
  
  public static function table_name(){
    global $wpdb;  
    $table_name = $wpdb->prefix.'stupidbot_campaigns';
    return $table_name;
  }
  
  public static function create_table(){
    global $wpdb;
    global $stupidbot_db_version;
    $table_name = self::table_name();      
    $sql = '
    CREATE TABLE '.$table_name.' (
      id int(11) NOT NULL auto_increment,
      keywords text NOT NULL,
      template varchar(255) default \'default.html\',
      hack varchar(255) default \'\',
      counter int(9) NOT NULL default 0,
      count int(9) NOT NULL default 0,
      category_id int(11) NOT NULL default 1,
      schedule varchar(255) NOT NULL default \'daily\',
      active int(11) NOT NULL default 0,
      PRIMARY KEY  (id)
    );';
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    update_option( "stupidbot_db_version", $stupidbot_db_version );
  }
  
  public static function seed(){
    $data = array();

    $data[]       = array(
    'keyword'     => 'iPhone',
    'width'       => '1024',
    'height'      => '800',
    'size'        => 'wallpaper',
    'count'       => '5',
    'counter'     => 0,
    'category_id' => '1',
    'schedule'    => 'twicedaily',
    'active'      => 0
    );
    
    $data[]       = array(
    'keyword'     => 'Flower',
    'width'       => '800',
    'height'      => '600',
    'size'        => 'wallpaper',
    'count'       => '5',
    'counter'     => 0,
    'category_id' => '1',
    'schedule'    => 'daily',
    'active'      => 0
    );
    
    foreach ($data as $campaign) {
      self::create($campaign);
    }
  }
  
  public static function all(){
    global $wpdb;  
    $campaigns = $wpdb->get_results( 
    	"
    	SELECT * 
    	FROM ".self::table_name()."
    	"
    );
    return $campaigns;
  }
  
  public static function active(){
    global $wpdb;  
    $campaigns = $wpdb->get_results( 
    	"
    	SELECT * 
    	FROM ".self::table_name()."
    	WHERE active = '1'"
    );
    return $campaigns;
  }
  
  public static function events($interval = 'daily'){
    global $wpdb;  
    $campaigns = $wpdb->get_results( 
    	"
    	SELECT * 
    	FROM ".self::table_name()."
    	WHERE active = '1' 
    	AND schedule = '".$interval."'"
    );
    return $campaigns;
  }
  
  public static function find($id){
    global $wpdb;  
    return $wpdb->get_row( 
    	"
    	SELECT * 
    	FROM ".self::table_name()." 
    	WHERE id = ".$id."
    	"
    );
  }
  
  public static function create($data){
    global $wpdb;  
    $wpdb->insert( self::table_name(), $data);
    return $wpdb->insert_id;
  }
  
  public static function update($data){
    $data['active'] = (isset($data['active'])) ? 1 : 0;
    global $wpdb;  
    return $wpdb->update( self::table_name(), $data, array('id' => $data['id']));
  }
  
  public static function delete($id){
    global $wpdb;
    $wpdb->query( 
    	$wpdb->prepare( 
    		"
         DELETE FROM ".self::table_name()."
    		 WHERE id = %d
    		",
    		$id 
      )
    );
  }
  
  public static function count(){
    global $wpdb;  
    $count = $wpdb->get_var( 
    	"
    	SELECT count(id) 
    	FROM ".self::table_name()."
    	"
    );
    return $count;
  }
}