<?php
@set_time_limit(0);


// identify synonyms
if($_POST['paction'] == 'identifysyn'){

	wp_auto_spinner_log_new ('Manual Spin', 'Admin clicked on rewrite button for post '. $_POST['post_id']);
	
	
	//spintax
	require_once('inc/class.spintax.php');
	
	//spin it now 
	require_once('inc/class.spin.php');
	$spin=new wp_auto_spin_spin($_POST['post_id'],$_POST['title'],$_POST['postCnt']);
	$return=$spin->spin_wrap();
	$return['status']='success';
	

	print_r(json_encode($return));

//REWRITE	
}elseif($_POST['paction'] == 'rewrite'){
	
	//spintax
	require_once('inc/class.spintax.php');
	
	
	//generate new spintax
	$content = stripslashes( $_POST['title'].'**9999**'.$_POST['postCnt']);
	$spintax=new wp_auto_spinner_Spintax;
	$spintaxed=$spintax->spin($content);
	$spintaxed_arr=explode('**9999**',$spintaxed);
	$spintaxed_ttl=$spintaxed_arr[0];
	$spintaxed_cnt=$spintaxed_arr[1];
	
	$post_id=$_POST['post_id'];
	$spintaxed2=$spintax->editor_form;
	$spintaxed2_arr=explode('**9999**',$spintaxed2);
	$spintaxed2_cnt=$spintaxed2_arr[1];
	update_post_meta($post_id, 'spintaxed_cnt2', $spintaxed2_cnt);
	
	//update post meta
	$post_id=$_POST['post_id'];
	update_post_meta($post_id, 'spintaxed_ttl', $spintaxed_ttl);
	update_post_meta($post_id, 'spintaxed_cnt', $spintaxed_cnt);
	
	$return['spintaxed_ttl']=$spintaxed_arr[0];
	$return['spintaxed_cnt2']=$spintaxed2_arr[1];
	$return['status']='success';
	
	
	
	print_r(json_encode($return));
}elseif ($_POST['paction']=='delete'){
	
	
	$id=$_POST['id'];
	$thesaurs=$_POST['thesaurs'];
	
	$deleted=get_option('wp_auto_spinner_deleted_'.$thesaurs ,array() );
	$deleted[]=$id;
	
	update_option('wp_auto_spinner_deleted_'.$thesaurs , $deleted );
	 
	 
}elseif ($_POST['paction']=='edit'){
	$id=$_POST['id'];
	$thesaurs=$_POST['thesaurs'];
	$value=$_POST['value'];
	
	$modified=get_option('wp_auto_spinner_modified_'.$thesaurs ,array() );
	$modified[$id]=$value;
	update_option('wp_auto_spinner_modified_'.$thesaurs , $modified );
	
	print_r(get_option('wp_auto_spinner_modified_'.$thesaurs ,array() ));
	
}elseif ($_POST['paction']=='custom_add' || $_POST['paction']=='custom_edit' ){
	$id=$_POST['id'];
	$thesaurs=$_POST['thesaurs'];
	$value=$_POST['value'];
	
	$custom=get_option('wp_auto_spinner_custom_'.$thesaurs ,array() );
	
	if(is_numeric($id)){
		$custom[$id]=$value;
	}else{
		$custom[]=$value;
	}
	
	
	update_option('wp_auto_spinner_custom_'.$thesaurs , $custom );
}elseif ($_POST['paction'] == 'custom_delete'){
	$id=$_POST['id'];
	$thesaurs=$_POST['thesaurs'];
	 
	
	$custom=get_option('wp_auto_spinner_custom_'.$thesaurs ,array() );
	unset($custom[$id]);
	update_option('wp_auto_spinner_custom_'.$thesaurs , $custom );
}