<?php
function wp_automatic_license_notice() {
	 
	$purchase=get_option('wp_automatic_license','');
	
	if(trim($purchase) == '' ){
		if( ! stristr ($_SERVER['REQUEST_URI'] ,'gm_setting' ) ){
			echo '<div class="updated"><p><strong>WordPress Automatic</strong> is ready. Please <a href="'.admin_url('edit.php?post_type=wp_automatic&page=gm_setting').'">Click Here</a> to add your purchase code and activate the plugin.</p></div>';
		}
	}else{
		
		$licenseactive=get_option('wp_automatic_license_active','');
		
		 
		if(trim($licenseactive) == 'active' ){
			
			//reactivating
			
			//check last activate date
			$lastcheck=get_option('wp_automatic_license_active_date');
			$purchase = get_option('wp_automatic_license');
			$seconds_diff = time('now') - $lastcheck;
			$minutes_diff = $seconds_diff / 60 ;
			
			if($minutes_diff > 1440 ){
			
				//reset date
				update_option('wp_automatic_license_active_date', time('now'));

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
				
				$proxy = false;
				
				if($proxy == false){
					$url='http://deandev.com/license/index.php?itm=1904470&domain='.$_SERVER['HTTP_HOST'].'&purchase='.$purchase;
				}else{
					$url='http://deandev-proxy.appspot.com/license/index.php?itm=1904470&domain='.$_SERVER['HTTP_HOST'].'&purchase='.$purchase;
				}
				
				curl_setopt($ch, CURLOPT_HTTPGET, 1);
				curl_setopt($ch, CURLOPT_URL, trim($url));
				
				
				$exec=curl_exec($ch);
				
				$x=curl_error($ch);
				
				$resback=$exec;
				@$resarr=json_decode($resback);
				
				if(isset($resarr->message)){
					$wp_pinterest_active_message=$resarr->message;
					
				}else{
					if(isset($resarr->error)){
						$wp_pinterest_active_error=$resarr->error;
						
						if(isset($resarr->valid)){
							delete_option('wp_automatic_license_active');
						}
						
					}
				}
				
			}
			
		}else{
			
			if( ! stristr ($_SERVER['REQUEST_URI'] ,'gm_setting' ) ){
				echo '<div class="updated"><p><strong>WordPress Automatic</strong> is not active please <a href="'.admin_url('edit.php?post_type=wp_automatic&page=gm_setting').'">Click Here</a> to revise your purchase code and activate the plugin. </p></div>';
			}
			
		}
		
	}
	
}
add_action( 'admin_notices', 'wp_automatic_license_notice' );