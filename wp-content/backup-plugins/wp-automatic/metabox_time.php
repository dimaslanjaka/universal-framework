<?php
 
//adding metabox to gallery items
add_action( 'admin_menu', 'wp_automatic_create_meta_box3' );

function wp_automatic_create_meta_box3(){
	add_meta_box( 'wp_automatic_page-meta-boxes3', 'Update Frequency', 'wp_automatic_page_meta_boxes3', 'wp_automatic', 'side', 'high' );
}

function wp_automatic_page_meta_boxes3(){
	
	wp_automatic_page_meta_boxes_pin3();
}

//metabox content 
function wp_automatic_page_meta_boxes_pin3(){
	
	//reading meta values
	global $post;
	global  $wpdb;
	$prefix=$wpdb->prefix;
	$post_id=$post->ID;
	$query="select * from {$prefix}automatic_camps where camp_id='$post_id'";
	$res=$wpdb->get_results($query);
	if (count($res) > 0 ){
		$res=$res[0];
 
		if( stristr($res->camp_general, 'a:') ) $res->camp_general=base64_encode($res->camp_general);
		$camp_general=unserialize(base64_decode($res->camp_general));
		$camp_general=array_map('wp_automatic_stripslashes', $camp_general);
		if(! is_array($camp_general)) $camp_general=array();
	}else{
		$camp_general = array('cg_update_every'=>60 ,'cg_update_unit'=> 1);
	}	
 
	?>
	
	<div class="wp_attachment_details TTWForm" dir="ltr" style="width:100%">
	
 
		   
		   <div id="update_slide">  
		   <div id="field5zzzg-container" class="field f_100 ">
               <label for="field5zzzg">
                    Update every  
               </label>
               <input value="<?php   echo $camp_general['cg_update_every']   ?>" id="field5zzzg" max="1000" min="1" name="cg_update_every" required="required" class="ttw-range range"
               type="range">
           </div> 
           
           	<div id="field-camp_type-container" class="field f_100" style="margin-top:10px" >
				<label for="field-camp_type">
					Update Unit  
					
					
					
				</label>
				<select name="cg_update_unit" id="update_unit">
					<option  value="1"  <?php  wp_automatic_opt_selected('1',$camp_general['cg_update_unit']) ?> >Minutes</option> 
					<option  value="60"  <?php  wp_automatic_opt_selected('60',$camp_general['cg_update_unit']) ?> >Hours</option>					 
					<option  value="1440"  <?php  wp_automatic_opt_selected('1440',$camp_general['cg_update_unit']) ?> >Days</option>
				</select>
				
				<?php global $wpAutomaticDemo; 
					  		if($wpAutomaticDemo){
					  			echo '<span style="color:orange;">Note: Automatic posting does not work in demo mode. You will need to click the run now button manually.</span>';
					  		}
					?>
				
			</div>
			</div>
           
           <div style="clear:both"></div>	 
           
     </div>
	
	<?php  
	 
}