<?php
function wp_auto_spinner_rating_notice() {

	$uri=$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

	if(stristr($uri, '?')){
		$uri.='&wp_auto_spinner_rating=cancel';
	}else{
		$uri.='?wp_auto_spinner_rating=cancel';
	}

	if(! stristr($uri,'http')){
		$uri='http://'.$uri;
	}

	if  ( isset($_GET['wp_auto_spinner_rating']) ) {
		update_option('wp_deandev_auto_spinner_rating','cancel');

	}

	$wp_auto_spinner_rating=get_option('wp_deandev_auto_spinner_rating','');

	if(trim($wp_auto_spinner_rating) == ''){
		//get count of successful pins
		global $wpdb;
		$query="SELECT count(*) as count FROM wp_auto_spinner_log where action='New Post >> Do Spin'";
		$rows=$wpdb->get_results($query);
		$row=$rows[0];
		$count=$row->count;


		if($count > 5 ){
				
			?>
			
			
		    <div class="updated">
		        <p><?php echo 'Do you mind helping (<a href="http://deandev.com/me">DeanDev</a>) by rating  "Wordpress auto spinner plugin" ? your good rating will <strong>help us improve</strong> the plugin <a style="text-decoration: underline;" href="http://codecanyon.net/downloads">Rate Now »</a> <a  style="float:right"  href="'.$uri.'">(x) </a> '; ?></p>
		    </div>
		    <?php
		
		}//count ok
	}//rating yes
	 
}
add_action( 'admin_notices', 'wp_auto_spinner_rating_notice' );