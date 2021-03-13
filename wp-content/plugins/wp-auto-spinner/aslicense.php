<?php 
function wp_auto_spinner_license_notice() {

	
	
	if(!function_exists('curl_init')){
		echo '<div class="error"><p>You do not have <a href="http://curl.haxx.se/">Curl library</a> installed. you must install it for "Wordpress Auto Spinner" plugin to function.  </p></div>';
		return;
	} 
	
	//v3.2.1
	return;
	
	
	$purchase=get_option('wp_auto_spinner_license','');

	if(trim($purchase) == '' ){
		if( ! stristr ($_SERVER['REQUEST_URI'] ,'spinner_settings' ) ){
			echo '<div class="updated"><p>Auto Spinner is ready please <a href="'.admin_url('admin.php?page=wp_auto_spinner_settings').'">click here</a> to add your purchase code and activate the plugin now </p></div>';
		}
	}else{
		
		$licenseactive=get_option('wp_auto_spinner_license_active','');
		
		if(trim($licenseactive) == 'active' ){
			
			//reactivating
			
			//check last activate date
			$lastcheck=get_option('wp_auto_spinner_license_active_date');
			$purchase = get_option('wp_auto_spinner_license');

			$seconds_diff = time('now') - $lastcheck;
			$minutes_diff = $seconds_diff / 60 ;
			
			
			
			if($minutes_diff > 1440 ){
				 
				//reset date
				update_option('wp_auto_spinner_license_active_date', time('now'));
				//reactivate
				//activating
				//curl ini
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_HEADER,0);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
				curl_setopt($ch, CURLOPT_TIMEOUT,20);
				curl_setopt($ch, CURLOPT_REFERER, 'http://www.bing.com/');
				curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8');
				curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Good leeway for redirections.
				//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
				curl_setopt($ch, CURLOPT_COOKIEJAR , "cookie.txt");
				
				//curl get
				$x='error';
				$url='http://deandev.com/license/index.php?itm=4092452&domain='.$_SERVER['HTTP_HOST'].'&purchase='.trim($purchase);
				
				if(WP_VALVE_PROXY) $url = 'http://labnol-proxy-server.appspot.com/'.str_replace('http://', '', $url);
				
				curl_setopt($ch, CURLOPT_HTTPGET, 1);
				curl_setopt($ch, CURLOPT_URL, trim($url));
				
			 
				$exec=curl_exec($ch);
				$x=curl_error($ch);
				 
				
				$resback=$exec;
				
				@$resarr=json_decode($resback);
				
				if(isset($resarr->message)){
					$wp_spinner_active_message=$resarr->message;
				
				}else{
					if(isset($resarr->error)){
						$wp_spinner_active_error=$resarr->error;
						
						if(isset($resarr->valid)){
							delete_option('wp_auto_spinner_license_active');
						}
					}	
				}
				
			}
			
		}else{
			
			if( ! stristr ($_SERVER['REQUEST_URI'] ,'wp_auto_spinner_settings' ) ){
				echo '<div class="updated"><p>Auto Spinner is not active please <a href="'.admin_url('admin.php?page=wp_auto_spinner_settings').'">click here</a> to revise your purchase code and activate the plugin now </p></div>';
			}
			
		}
		
	}
	
}
add_action( 'admin_notices', 'wp_auto_spinner_license_notice' );