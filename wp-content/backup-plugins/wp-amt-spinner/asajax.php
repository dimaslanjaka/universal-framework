<?php

//AJAX SEND TO SPIN QUEUE
add_action( 'wp_ajax_wp_auto_spinner_spin', 'wp_automatic_spin_callback' );
add_action( 'wp_ajax_wp_auto_spinner_unspin', 'wp_automatic_unspin_callback' );

function wp_automatic_spin_callback() {
	
	
	$itms=$_POST['itms'];
	
 
	
	$itms_arr = explode(',', $itms);
	$itms_arr= array_filter($itms_arr);

	foreach($itms_arr as $post_id ){
		update_post_meta($post_id, 'wp_auto_spinner_scheduled', 'yes');
		update_post_meta($post_id, 'wp_auto_spinner_checked', 'yes');

		
		delete_post_meta($post_id, 'spinned_cnt');
	}

	die();
}

function wp_automatic_unspin_callback(){
	
	//options
	$autospin=get_option('wp_auto_spin',array());
	
	$itms=$_POST['itms'];
	
	$itms_arr = explode(',', $itms);
	$itms_arr= array_filter($itms_arr);
	
	foreach($itms_arr as $post_id ){
		echo $post_id;
		
		//delete the schedule
		delete_post_meta($post_id, 'wp_auto_spinner_scheduled');
		
		//set checked flag so the plugin don't spin it 
		update_post_meta($post_id, 'wp_auto_spinner_checked', 'yes');
		
		//set content to original content and set title to original title
		$original_cnt = get_post_meta($post_id,'original_cnt',1);
		if(trim($original_cnt) != ''){
			//found original content let's set it

			$original_title=get_post_meta($post_id,'original_ttl',1);
			
			$my_post = array();
			$my_post['ID'] = $post_id;
			$my_post['post_content'] = $original_cnt ;
			$my_post['post_title']=$original_title;
			
			 
			//check if we should updat the slug .
			if(in_array('OPT_AUTO_SPIN_SLUG',$autospin)){
				$my_post['post_name']='';
			}
			
			
			wp_auto_spinner_log_new('New Post >> Un-Spin','Post with id {'.$post_id.'} Restored .' );
			
			// Update the post into the database
			remove_filter('content_save_pre', 'wp_filter_post_kses');
			wp_update_post( $my_post );
			add_filter('content_save_pre', 'wp_filter_post_kses');
			
			//clean fields
			delete_post_meta($post_id,'original_ttl');
			delete_post_meta($post_id,'original_cnt');
			delete_post_meta($post_id,'spinned_ttl');
			delete_post_meta($post_id,'spinned_cnt');
			delete_post_meta($post_id,'spintaxed_cnt');
			delete_post_meta($post_id,'spintaxed_cnt2');
			delete_post_meta($post_id,'spintaxed_ttl');
			
			
				
		}

		
	}
	
	die();
	
}