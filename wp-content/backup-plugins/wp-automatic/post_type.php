<?php 
add_action( 'init', 'register_cpt_wp_automatic' );

function register_cpt_wp_automatic() {


	
	$labels = array(
			'name' => 'Campaigns',
			'all_items' => 'All Campaigns',
			'singular_name' => 'wp_automatic',
			'add_new' => 'New campaign' ,
			'add_new_item' => 'Add New Campaign',
			'edit_item' => 'Edit Campaign',
			'new_item' => 'New Campaign',
			'view_item' => 'View Campaign',
			'search_items' => 'Search Campaigns',
			'not_found' => 'No Campaigns found',
			'not_found_in_trash' => 'No Campaigns found in Trash',
			'parent_item_colon' => 'Parent Campaign:',
			'menu_name' => 'WP Automatic',
	);

	$icon=  WP_PLUGIN_URL .'/wp-automatic/images/ta.png';

	$args = array(
			'labels' => $labels,
			'hierarchical' => false,
			'description' => 'Campains of Wordpress Automatic',
			'supports' => array( 'title' ),
			'taxonomies' => array( 'options' ),
			'public' => false,
			'show_ui' => true,
			'show_in_menu' => true,
			'show_in_nav_menus' => true,
		
			'menu_position' => 66666665666666666  ,
			'publicly_queryable' => false,
			'exclude_from_search' => true,
			'has_archive' => false,
			'query_var' => true,
			'can_export' => true,
			'rewrite' => true,
			'capability_type' => 'post',
			'menu_icon'=>$icon
			
	);
	
	//admin only
	$admin_caps = array('capabilities' => array(
					'edit_post'          => 'manage_options',
					'read_post'          => 'manage_options',
					'delete_post'        => 'manage_options',
					'edit_posts'         => 'manage_options',
					'edit_others_posts'  => 'manage_options',
					'delete_posts'       => 'manage_options',
					'publish_posts'      => 'manage_options',
					'read_private_posts' => 'manage_options'
	  ));
	
	
	$opt = get_option ( 'wp_automatic_options', array ('OPT_ADMIN_ONLY') );
	if (in_array ( 'OPT_ADMIN_ONLY', $opt )) {
		
		$args = array_merge($args,$admin_caps);
		
	} else {
	
	}
	
	
	
	register_post_type( 'wp_automatic', $args );
	
	
}

/* ------------------------------------------------------------------------*
 * CHANGING THE WAY DISPLAYED of the campaigns
* ------------------------------------------------------------------------*/

add_filter("manage_edit-wp_automatic_columns", "wp_automatic_edit_columns");
add_action("manage_posts_custom_column",  "wp_automatic_columns_display");

function wp_automatic_edit_columns($portfolio_columns){
	$portfolio_columns = array(
			"cb" => "<input type=\"checkbox\" />",
			"title" => "Campaign Title",
			"wp_automatic_type"=> "Type",
			"wp_automatic_keywords" => "Keywords/Source",
			"wp_automatic_Category" => "Category",
			"wp_automatic_status"=>"New Post Status",
			"wp_automatic_posted"=> "Posts / max",


	);
	return $portfolio_columns;
}

function wp_automatic_columns_display($wp_automatic_columns){
	
 	
	global $wpdb;
	global $post;
	global $wpAutomaticTemp;
	
	$prefix=$wpdb->prefix;
	$id=$post_id=$post->ID;
	
	//check if already exists
	if(isset($wpAutomaticTemp->camp_id) && $wpAutomaticTemp->camp_id == $post_id){
		
		$ret=$wpAutomaticTemp;
		
	}else{
		//getting the record of the database
		$query="select * from {$prefix}automatic_camps where camp_id ='$id'";
		$res=$wpdb->get_results($query);
		if(! isset($res[0])) return;
		$ret=$res[0];
		$wpAutomaticTemp = $ret;
	}
	
	
	
	switch ($wp_automatic_columns)
	{

		case "wp_automatic_keywords":
			//getting the keyword
			 
			if(trim($ret->camp_type) == 'Feeds'){
				
				if(strlen($ret->feeds) > 100){
					  echo substr($ret->feeds, 0,100).'...';
				}else{
					  echo $ret->feeds;
				}
				
				
				
			}elseif( trim($ret->camp_type) == 'Facebook' ){
				$camp_general = unserialize (base64_decode( $ret->camp_general) );
				  echo $camp_general['cg_fb_page'] ;
			}elseif( trim($ret->camp_type) == 'Craigslist' ){
				$camp_general = unserialize (base64_decode( $ret->camp_general) );
				  echo $camp_general['cg_cl_page'] ;
			
			}elseif( trim($ret->camp_type) == 'Reddit' ){
				$camp_general = unserialize (base64_decode( $ret->camp_general) );
				  echo $camp_general['cg_rd_page'] ;
			
			}elseif( $ret->camp_type == 'Single'){
				$camp_general = unserialize (base64_decode( $ret->camp_general) );
				echo $camp_general['cg_sn_source'] ;
				
			}else{
				
				if(strlen($ret->camp_keywords) > 100){
					echo 	substr($ret->camp_keywords, 0,100).'...';
				}else{
					echo $ret->camp_keywords;
				}
			}
			  
			break;

			case "wp_automatic_type":
			
				
				  echo $ret->camp_type;
				break;
					
		
		case "wp_automatic_Category":

			@$camp_post_category = $ret->camp_post_category ;
			if(isset($ret->camp_post_category))   echo get_cat_name ($camp_post_category);
			break;

		case "wp_automatic_status":
			//getting posted count
			if(isset($ret->camp_keywords))   echo $ret->camp_post_status ;
			break;

		case "wp_automatic_posted":
			//getting posted count

			//getting posted count
			//  echo $ret->posted;
			@$key='Posted:'.$ret->camp_id;
			//getting count from wplb_log
			$query="select count(id) as count from {$prefix}automatic_log where action='$key'";
			$res= $wpdb->get_results($query);
			@$res=$res[0];
			if(isset($res->count))   echo $res->count;
			  echo ' / ';
			if(isset($ret->camp_post_every))   echo $ret->camp_post_every;
			break;


	}



}

/* ------------------------------------------------------------------------*
 * Custom Post Updated Message
* ------------------------------------------------------------------------*/
//add filter to ensure the text Book, or book, is displayed when user updates a book
add_filter('post_updated_messages', 'codex_book_updated_messages');
function show_links($id){
	$count=get_post_meta($id, 'links_added',1);
	if( $count != ''){
		return ' Additional Info:'.$count.' links added to be posted on the last time a file was uploaded.';
	}else{
		return '';
	}
}

function codex_book_updated_messages( $messages ) {
	global $post, $post_ID;

	$messages['wp_automatic'] = array(
			0 => '', // Unused. Messages start at index 1.
			1 => sprintf( 'Campaign <b>updated</b> successfully.'  ),
			2 => 'Custom field updated.',
			3 => 'Custom field deleted.',
			4 => 'Campaign updated.',

			/* translators: %s: date and time of the revision */
			5 => isset($_GET['revision']) ? sprintf( 'Campaign restored to revision from %s', wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
			6 => sprintf('Campaign  published %s ', show_links($post_ID) ),
			7 => 'Campaign saved.',
			8 => sprintf( 'Campaign submitted. %s',  show_links($post_ID)),
			9 => sprintf( 'Camapaign scheduled for: <strong>%1$s</strong>. %2$s',
					// translators: Publish box date format, see http://php.net/date
					date_i18n( 'M j, Y @ G:i' , strtotime( $post->post_date ) ),  show_links($post_ID) ),
			10 => sprintf( 'Campaign draft updated. %s',  show_links($post_ID)),

	);

	return $messages;
}


?>