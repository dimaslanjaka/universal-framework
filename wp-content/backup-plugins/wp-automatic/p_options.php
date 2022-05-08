<?php
function gm_setting() {
	
	//license ini
	$licenseactive=get_option('wp_automatic_license_active','');
	
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$state = base64_encode($actual_link);
	
	// Save FB token returned from FB login
	if(isset($_GET['token'])){
		update_option('wp_automatic_fb_token',$_GET['token']);
	}
	 
	
	//purchase check
	if(isset($_POST['wp_automatic_license']) && trim($licenseactive) == '' ){
		
		//save it
		update_option('wp_automatic_license' , $_POST['wp_automatic_license'] );
		
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
		@curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
		curl_setopt($ch, CURLOPT_COOKIEJAR , "cookie.txt");
		
		//curl get
		$x='error';
		
		//change domain ?
		$append='';
		
		if( isset($_POST['wp_automatic_options']) && in_array('OPT_CHANGE_DOMAIN', $_POST['wp_automatic_options']) ){
			$append='&changedomain=yes';
		}
		
		$proxy = false;
		
		if($proxy == false){
			$url='http://deandev.com/license/index.php?itm=1904470&domain='.$_SERVER['HTTP_HOST'].'&purchase='.trim($_POST['wp_automatic_license']).$append;
		}else{
			$url='http://deandev-proxy.appspot.com/license/index.php?itm=1904470&domain='.$_SERVER['HTTP_HOST'].'&purchase='.trim($_POST['wp_automatic_license']).$append;
		}
		
		curl_setopt($ch, CURLOPT_HTTPGET, 1);
		curl_setopt($ch, CURLOPT_URL, trim($url));
		$exec=curl_exec($ch);
		$x=curl_error($ch);
		$resback=$exec;
		
		if(trim($exec) == ''){
			
			$url='http://deandev-proxy.appspot.com/license/index.php?itm=1904470&domain='.$_SERVER['HTTP_HOST'].'&purchase='.trim($_POST['wp_automatic_license']).$append;
			
			curl_setopt($ch, CURLOPT_HTTPGET, 1);
			curl_setopt($ch, CURLOPT_URL, trim($url));
			
			$exec=curl_exec($ch);
			$resback=$exec;
			$x=curl_error($ch);
		}
		
		$resarr=json_decode($resback);
		
		if(isset($resarr->message)){
			$wp_automatic_active_message=$resarr->message;
			
			//activate the plugin
			update_option('wp_automatic_license_active', 'active');
			update_option('wp_automatic_license_active_date', time('now'));
			$licenseactive=get_option('wp_automatic_license_active','');
			
		}else{
			if(isset($resarr->error))
				$wp_automatic_active_error=$resarr->error;
		}
		
	}
	
	
	// save values if post requested
	$updated = '';
	if (isset ( $_POST ['wp_amazonpin_tw'] )) {
		
		
		//default check 
		if(! isset($_POST['wp_automatic_options'])){
			$_POST['wp_automatic_options']=array();			
		}
		
		foreach ( $_POST as $key => $val ) {
			
			if(stristr($key, 'content')){
				$key = str_replace('content', '', $key);
			}
			
			update_option ( $key, $val );
		}
		
		$updated = '<div class="updated below-h2" id="message"><p>Settings updated.  </p></div>';
	}
	
	//remove twitter token
	if(isset($_POST['wp_automatic_opt'])){
		
		if( in_array('wp_automatic_tw_reset', $_POST['wp_automatic_opt']) ){
			delete_option('wp_automatic_tw_token');
		}
		
		if( in_array('wp_automatic_fb_reset', $_POST['wp_automatic_opt']) ){
			delete_option('wp_automatic_fb_token');
		}
		
	}
	
	$dir = WP_PLUGIN_URL . '/' . str_replace ( basename ( __FILE__ ), "", plugin_basename ( __FILE__ ) );
	$dir = plugins_url( '/', __FILE__ );
	
	//   echo dirname(__FILE__);
	if (! function_exists ( 'cchecked' )) {
		function cchecked($name, $val) {
			$arr = get_option ( $name ,array('OPT_CRON') );
			
			if (in_array ( $val, $arr )) {
				return 'checked="checked"';
			}
		}
	}
	?>
 
<script type="text/javascript" src="<?php   echo $dir; ?>js/jquery.tools.js"></script>
<script type="text/javascript" src="<?php   echo $dir; ?>js/jquery.uniform.min.js"></script>
<script type="text/javascript" src="<?php   echo $dir; ?>js/main.js"></script>

<link href='<?php   echo $dir; ?>css/style.css' rel='stylesheet' type='text/css'>
<link href='<?php   echo $dir; ?>css/uniform.css' rel='stylesheet' type='text/css'>

<style>

.wp_automatic_box_icon{
	width:30px;
	padding-top: 12px;
    float: left;
}

.hndle{
	height:50px;
}

h2 span{

    display: block;
    padding-top: 16px;
    padding-left: 42px;

}

.postbox .hndle{
	cursor:default !important;
}

 
 
</style>

<div>
	<div class="wrap">
		<div style="margin-left: 8px" class="icon32" id="icon-options-general">
			<br>
		</div>
		<h2>General Settings</h2>
		<p style="margin-top:0">Set configuration for sources you posts from:</p>
			
			<?php   echo $updated?>
			
			<!--start container-->

		<div dir="ltr" id="dashboard-widgets-wrap">

			<form method="post" novalidate="novalidate">
				<div class="metabox-holder columns-2" id="dashboard-widgets">



					<!-- General post box -->
					<div class="postbox-container">
						<div style="min-height: 1px;" class="meta-box-sortables ui-sortable" id="normal-sortables">

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/amazon.png',__FILE__)?>" /> <span>Amazon settings</span>
								</h2>
								<div class="inside main" style="padding-bottom: 14px">
									<!--start container-->
									<div class="TTWForm">
										
										<input type = "hidden" value="200" name="wp_amazonpin_tw" />
										 
										<div id="field285-container" class="field f_100  ">
											<label for="field285"> Amazon Access Key ID * <a  target="blank" href="https://affiliate-program.amazon.com/gp/advertising/api/detail/main.html"><small>(Apply here)</small><a target="_blank" href="https://www.youtube.com/watch?v=UtQVQPpjDcM"><small> (Check the tutorial)</small></a></a>
											</label> <input value="<?php   echo get_option( 'wp_amazonpin_abk' ) ?>" name="wp_amazonpin_abk" id="field285" type="text">
										</div>
										<div id="field285-container" class="field f_100  ">
											<label for="field285"> Amazon Secret Access Key * </label> <input value="<?php   echo get_option( 'wp_amazonpin_apvtk' ) ?>" name="wp_amazonpin_apvtk" id="field285" type="text">
										</div>
										<div id="field285-container" class="field f_100  ">
											<label for="field285"> Amazon Associate ID * </label> <input value="<?php   echo get_option( 'wp_amazonpin_aaid' ) ?>" name="wp_amazonpin_aaid" id="field285" type="text">
										</div>

										<div  class="field f_100">
											<div class="option clearfix">
												<input name="wp_automatic_options[]" <?php   echo cchecked('wp_automatic_options', 'OPT_AMAZON_PRICE')  ?> value="OPT_AMAZON_PRICE" type="checkbox"> <span class="option-title"> Update Amazon product prices daily</span>
											</div>
										</div>

										<div id="form-submit" class="field f_100 clearfix submit" style>
											<input style="margin-left: 0" value="Save Changes" type="submit">
										</div>



									</div>
									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							<!-- post box -->

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/clickbank.png',__FILE__)?>"><span> Clickbank settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->
									<div id="field285-container" class="field f_100 ">
										<label for="field285"> Clickbank username ? </label> <input value="<?php   echo get_option( 'wp_wp_automatic_cbu' ) ?>" name="wp_wp_automatic_cbu" id="field285" type="text">
									</div>
									 

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>


							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/ez.jpg',__FILE__)?>"><span> Ezinearticles settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->
									<div id="field285-container" class="field f_100 ">
										<label for="field285"> Google custom search API key? </label> <input value="<?php   echo get_option( 'wp_automatic_search_key' ) ?>" name="wp_automatic_search_key" type="text">

										<div class="description">
						 			     		Visit <a href="http://valvepress.com/how-to-create-a-google-custom-search-api-key/">This tutorial</a> for how to create an api key.
						 			     		
						 			     		<br>*a key gives us 100 request/day 
						 			     		<br>*You can add multiple keys and separate them with Comma but every key should be from a different Google account. 
						 			     	</div>


									</div>

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/write.png',__FILE__)?>"><span> The Best Spinner settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div id="field285-container" class="field f_100 ">
										<label for="field285"> <b><a target="blank" href="http://sweetheatmn.jonathanleger.zaxaa.com/s/4152949213724"> The best spinner </a></b> user name <i>(optional)</i>
										</label> <input value="<?php   echo get_option( 'wp_automatic_tbs' ) ?>" name="wp_automatic_tbs" id="field285" type="text">
									</div>
									<div id="field485-container" class="field f_100 ">
										<label for="field485"> <b>The best spinner password</b>
										</label> <input name="wp_automatic_tbs_p" id="field485" type="text" value="<?php   echo get_option( 'wp_automatic_tbs_p' ) ?>">
									</div>
									
									
									
									 <div   class="field f_100">
										<label> Protected terms <i>(one/line)(optional)</i>
										</label>
										<textarea rows="5" cols="20" name="wp_automatic_tbs_protected" ><?php   echo stripslashes( get_option('wp_automatic_tbs_protected') )?></textarea>
										
										<br>
										
										<p>Note: you can always skip spinning parts of the content by wrapping it with the [nospin]part not to spin[/nospin] tags at the post template</p>
										
									</div>
									
									

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>
									
									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/flicker.png',__FILE__)?>"><span> Flicker settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div id="field285-container" class="field f_100 ">
										<label for="field285"> <b><a target="blank" href="http://www.flickr.com/services/api/misc.api_keys.html"> Flicker Api key </a></b> <i>(click the link to get your's)</i>
										</label> <input value="<?php   echo get_option( 'wp_automatic_flicker' ) ?>" name="wp_automatic_flicker" id="field285" type="text">
									</div>

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/ebay.png',__FILE__)?>"><span> eBay settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label> Campaign ID (optional)</label> <input value="<?php   echo get_option( 'wp_automatic_ebay_camp' ) ?>" name="wp_automatic_ebay_camp" type="text">
									</div>
									
									<div class="description">Visit <a target="_blank" href="https://partnernetwork.ebay.com/en/home">this link</a> to apply for partner network</div>

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/ig.png',__FILE__)?>"><span> Instagram settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label>Session ID</label> <input value="<?php   echo get_option( 'wp_automatic_ig_sess' ) ?>" name="wp_automatic_ig_sess" type="text">
									<div class="description">Check <a target="_blank" href="http://valvepress.com/how-to-get-instagram-session-cookie/">this tutorial</a> on how to get it.</div>
									</div>
									
									

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							

							<div class="postbox " >
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/yt.png',__FILE__)?>"><span> Youtube settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label>Youtube API Key</label> <input value="<?php   echo get_option( 'wp_automatic_yt_tocken' ) ?>" name="wp_automatic_yt_tocken" type="text">
										<div class="description">Check <a href="http://valvepress.com/how-to-get-a-youtube-api-key-to-post-from-youtube-to-wordpress/" target="_blank">this tutorial</a> on how to get your youtube api key </div>
									</div>
									

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							 
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/vimeo.png',__FILE__)?>"><span> Vimeo settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->
									
									<div class="field f_100 ">
										<label> Access Token</label> <input value="<?php   echo get_option( 'wp_automatic_vm_tocken' ) ?>" name="wp_automatic_vm_tocken" type="text">
										<div class="description">Check <a href="http://valvepress.com/how-to-generate-a-vimeo-access-token-to-post-from-vimeo-to-wordpress/" target="_blank">this tutorial</a> on how to get your vimeo access token </div>
									</div>

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/soundcloud.png',__FILE__)?>"><span> SoundCloud settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label> Client ID</label> <input value="<?php   echo get_option( 'wp_automatic_sc_client' ) ?>" name="wp_automatic_sc_client" type="text">
										<div class="description">Check <a href="http://valvepress.com/how-to-get-soundcloud-client_id-to-auto-post-from-soundcloud-to-wordpress/" target="_blank">this tutorial</a> on how to get it. </div>
									</div>
									

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/itunes.png',__FILE__)?>"><span> Itunes settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label>Affiliate ID (Token)</label> <input value="<?php   echo get_option( 'wp_automatic_iu_id' ) ?>" name="wp_automatic_iu_id" type="text">
										<div class="description">Apply <a href="http://www.apple.com/itunes/affiliates/" target="_blank">Here</a> for an ID </div>
									</div>
									

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/envato.png',__FILE__)?>"><span>Envato settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label>Envato Authorization token</label> <input value="<?php   echo get_option( 'wp_automatic_envato_token' ) ?>" name="wp_automatic_envato_token" type="text">
										<div class="description">Get your token <a href="https://build.envato.com/create-token/" target="_blank">Here</a> just choose the name and click "Create token" </div>
									</div>
									
									<div class="field f_100 ">
										<label>Envato User Name (Affiliate ID)</label> <input value="<?php   echo get_option( 'wp_automatic_envato_user' ) ?>" name="wp_automatic_envato_user" type="text">
										<div class="description">Your username for affiliate integration for example "ValvePress"</div>
									</div>

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/fb.png',__FILE__)?>"><span> Facebook settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->
									
									 
									<div class="field f_100 ">
										<label>c_user cookie value</label> <input value="<?php   echo get_option( 'wp_automatic_fb_cuser' ) ?>" name="wp_automatic_fb_cuser" type="text">
										<div class="description">Check this tutorial  <a href="http://valvepress.com/how-to-config-wp-automatic-for-fb/" target="_blank">Here</a> to know how to get these values </div>
									</div>
									 
									 <div class="field f_100 ">
										<label>xs cookie value</label> <input value="<?php   echo get_option( 'wp_automatic_fb_xs' ) ?>" name="wp_automatic_fb_xs" type="text">
										
									</div>
									
									
									
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/tw.png',__FILE__)?>"><span> Twitter settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label>Consumer Key (API Key)</label> <input value="<?php   echo get_option( 'wp_automatic_tw_consumer' ) ?>" name="wp_automatic_tw_consumer" type="text">
										<div class="description">Check <a href="http://valvepress.com/how-to-post-from-twitter-to-wordpress-using-wordpress-automatic/" target="_blank">this tutorial</a> on how to get your Key and secret </div>
									</div>
									
									
									<div class="field f_100 ">
										<label>Consumer Secret (API Secret)</label> <input value="<?php   echo get_option( 'wp_automatic_tw_secret' ) ?>" name="wp_automatic_tw_secret" type="text">
										
									</div>
									
									<div class="field f_100 ">
										<label>Clean any generated twitter tokens (Tick this if you want to regenerate)</label>
										<input type="checkbox" name= "wp_automatic_opt[]" value= "wp_automatic_tw_reset" />
										
										 
									</div>
									
									<?php 
									
									
									 
									?>
									

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									 <img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/walmart.png',__FILE__)?>"><span> Walmart Settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label>API key</label> <input value="<?php   echo get_option( 'wp_automatic_wm_api' ) ?>" name="wp_automatic_wm_api" type="text">
										<div class="description">Apply <a href="https://developer.walmartlabs.com/member" target="_blank">here</a></div>
									</div>
									
									
									<div class="field f_100 ">
										<label>Publisher ID (optional)</label> <input value="<?php   echo get_option( 'wp_automatic_wm_publisher' ) ?>" name="wp_automatic_wm_publisher" type="text">
										<div class="description">Apply <a href="https://affiliates.walmart.com/linksharesignupnew" target="_blank">here</a> for recieving affiliate commisions. and check <a target="_blank" href="http://valvepress.com/how-to-get-your-walmart-publisher-id/">this tutorial</a> on how to find your publisher ID</div>
										
									</div>
									 
									 
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>

						<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									 <img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/cj.png',__FILE__)?>"><span>Careerjet Settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label>Affiliate ID</label> <input value="<?php   echo get_option( 'wp_automatic_cj_id' ) ?>" name="wp_automatic_cj_id" type="text">
										<div class="description">Apply <a href="http://www.careerjet.com/partners/?ak=a551ffb1b11a967e629c447bc929c067" target="_blank">here</a>. ex: a551ffb1b11a967e629c447bc929c067</div>
									</div>
									
									 
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>


							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									 <img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/translator.microsoft.png',__FILE__)?>"><span> Microsoft Translator Settings</span>
								</h2>
								<div class="inside TTWForm main" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">
										<label>Microsoft Access Key</label> <input value="<?php   echo get_option( 'wp_automatic_mt_key' ) ?>" name="wp_automatic_mt_key" type="text">
										<div class="description">Check <a href="http://valvepress.com/how-to-get-microfost-translator-access-key-from-azure/" target="_blank">this tutorial</a> on how to get your ID and secret </div>
									</div>
									
									
									 
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							
							
							
						</div>
					</div>
					<!-- End post box  -->

					<!-- General post box -->
					<div class="postbox-container">
						<div style="min-height: 1px;" class="meta-box-sortables ui-sortable" id="normal-sortables">

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/search.png',__FILE__)?>"><span> Search and Replace</span>
								</h2>
								<div class="inside main TTWForm" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100 ">

										<p style="margin-bottom: 10px;">
											Search for words in the article and replace it (one set per line) <br>like <strong>word1|word2|word3</strong> . if the post contains <strong>word1</strong> it will be replaced by <strong>word2</strong> or <strong>word3</strong>
										</p>
										<textarea name="wp_automatic_replace"><?php   echo  stripslashes( get_option('wp_automatic_replace') )?></textarea>

									</div>
									
									<div  class="field f_100">
										<div class="option clearfix">
											<input name="wp_automatic_options[]" <?php   echo cchecked('wp_automatic_options', 'OPT_REPLACE_NO_REGEX')  ?> value="OPT_REPLACE_NO_REGEX" type="checkbox"> <span class="option-title">Replace literally.  </span>
											<br>
											
										</div>
										<div class="description"><small><i>By default, The plugin expects that you have inserted words above so for example if you added "fox" it will not replace it at the word "firefox" but will replace only if "fox" is a word. Tick this if you want to disable this behaviour and replace anywhere.</i></small></div>
									</div>
									
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>


									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/money.png',__FILE__)?>"`><span>Ads settings</span>
								</h2>
								<div class="inside main TTWForm" style="padding-bottom: 14px">
									<!--start container-->
									<div id="field11-container" class="field f_100">
										<label for="field11"> Top Ad Code <i>(optional)</i>
										</label>
										<textarea rows="5" cols="20" name="wp_automatic_ad1content" id="field11"><?php   echo stripslashes(  get_option('wp_automatic_ad1') )?></textarea>
									</div>
									<div id="field11-container" class="field f_100">
										<label for="field11"> Bottom Ad Code <i>(optional)</i>
										</label>
										<textarea rows="5" cols="20" name="wp_automatic_ad2content" id="field11"><?php   echo stripslashes( get_option('wp_automatic_ad2') )?></textarea>
									</div>

									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/proxy.png',__FILE__)?>"><span> Proxy settings</span>
								</h2>
								<div class="inside main TTWForm" style="padding-bottom: 14px">
									<!--start container-->


									<div id="field11-container" class="field f_100">
										<label for="field11"> Use this proxy list <i>(one/line)(optional)</i>
										</label>
										<textarea rows="5" cols="20" name="wp_automatic_proxy" id="field11"><?php   echo stripslashes( get_option('wp_automatic_proxy') )?></textarea>
										
										<div class="description">
						 			     	
						 			     	*Make sure your proxies are with port 80 (always open) or 8080 (sometimes open) which are open for connection with most servers or use any port that is open to connect on your server 
						 			     	<br> *Format:<strong>ip:port</strong> 
						 			     	<br> *Another Format : <strong>ip:port:username:password</strong>   for proxies with authentication
						 			     	<br> *one proxy per line
						 			     	<br> *Some proxy services require server ip for authentication <a target="_blank" href="http://localhost/wordpress/?wp_automatic=show_ip"><strong>Click here</strong></a> to know your server ip to use
						 			     	<br> *Check <a href="http://valvepress.com/use-private-proxies-pinterest-automatic/" target="_blank"><strong>this tutorial</strong></a> showing a tested service named <a href="https://instantproxies.com/billing/aff.php?aff=762">InstantProxies</a> you can use.
						 			     	<br> *Don't use public proxies used by thousands of pepole, it may get you into zillion troubles.
						 			     </div>
										
									</div>
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>

							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/settings.png',__FILE__)?>"><span> General settings</span>
								</h2>
								<div class="inside main TTWForm" style="padding-bottom: 14px">
									<!--start container-->

									<div class="field f_100">
										<label> Title to tags additional stop words  <i>(in lower case)(one/line)(optional)</i></label>
										<textarea rows="5" cols="20" name="wp_automatic_ttt_stop" ><?php   echo stripslashes( get_option('wp_automatic_ttt_stop') )?></textarea>
									</div>
									
									<div class="field f_100">
										<label>Additional Banned words (Skip posting the post if it contains any of these)(one/line)(optional)</i></label>
										<textarea rows="5" cols="20" name="wp_automatic_ccc_stop" ><?php   echo stripslashes( get_option('wp_automatic_ccc_stop') )?></textarea>
										<div class="description">list get added to banned words only if the option is active at the campaign page</div>
									</div>
									
									<div class="field f_100 ">
										<label> Woo-Commerce Amazon product buy now text (optional)</label> <input value="<?php   echo get_option( 'wp_automatic_woo_buy' ) ?>" name="wp_automatic_woo_buy" type="text">
									</div>
									
									<div class="field f_100 ">
										<label> Woo-Commerce eBay product buy now text (optional)</label> <input value="<?php   echo get_option( 'wp_automatic_woo_buy2' ) ?>" name="wp_automatic_woo_buy2" type="text">
									</div>
									
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							
							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/cron.png',__FILE__)?>"><span> Cron settings</span>
								</h2>
								<div class="inside main TTWForm" style="padding-bottom: 14px">
									<!--start container-->
									
									 
										<label> Cron Secret word [optional]</label> <input placeholder="cron" value="<?php   echo get_option( 'wp_automatic_cron_secret' ) ?>" name="wp_automatic_cron_secret" type="text">
										<div class="description">Your cron link will be <strong>example.com/?wp_automatic=YOUR_SECRET_WORD</strong>  and if you setup your cron job you will need to use the new cron link appears below after clicking save.</div>
										
									 <br><br>
									
									
					     <?php 
					     
					     $wp_automatic_secret = trim(get_option('wp_automatic_cron_secret'));
					     if(trim($wp_automatic_secret) == '') $wp_automatic_secret = 'cron';
					     
					     $cronurl= home_url('?wp_automatic='.$wp_automatic_secret )?>
					    Cron Command - ( <a target="blank" href="<?php   echo $cronurl ?>">Start now </a>)
									<div style="background-color: #FFFBCC; border: 1px solid #E6DB55; color: #555555; padding: 5px; width: 97%; margin-top: 10px">
						<?php
	
	  echo 'curl ' . $cronurl;
	?> 
						</div>
									<br>
									
									<p>if the above command didn't work use the one bleow</p>
									<div style="background-color: #FFFBCC; border: 1px solid #E6DB55; color: #555555; padding: 5px; width: 97%; margin-top: 10px">
						<?php
	//$cronpath = dirname ( __FILE__ ) . '/cron.php';
	  echo 'wget -O /dev/null ' . $cronurl;
	?>
						</div>

									<div  class="field f_100">
										<div class="option clearfix">
											<input name="wp_automatic_options[]" <?php   echo cchecked('wp_automatic_options', 'OPT_CRON')  ?> value="OPT_CRON" type="checkbox"> <span class="option-title"> Use <abbr title="Tick this option to use wordpress built-in cron ">Built in cron</abbr> instead </span>
										</div>
									</div>
									
									<div  class="field f_100">
										<div class="option clearfix">
											<input name="wp_automatic_options[]" <?php   echo cchecked('wp_automatic_options', 'OPT_PREVIEW_EDIT')  ?> value="OPT_PREVIEW_EDIT" type="checkbox"> <span class="option-title">Preview posts in edit screen not via front end</span>
										</div>
									</div>
									
									<div  class="field f_100">
										<div class="option clearfix">
											<input name="wp_automatic_options[]" <?php   echo cchecked('wp_automatic_options', 'OPT_ADMIN_ONLY')  ?> value="OPT_ADMIN_ONLY" type="checkbox"> <span class="option-title">Show menu to admins only</span>
										</div>
									</div>
									
									
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>
							

							
							<div class="postbox " id="dashboard_right_now">
								<h2 class="hndle">
									<img class="wp_automatic_box_icon" src="<?php   echo plugins_url('images/key.png',__FILE__)?>"><span> License</span>
								</h2>
								<div class="inside main TTWForm" style="padding-bottom: 14px">
									
									<!--start container-->
 
 									<?php 
 									if(trim($licenseactive) ==''){
 									
 									?>
 										
 										<div class="field f_100 ">
 										<label> Purchase code</label> <input placeholder="Ex: 4308eedb-1add-43a9-bbba-6f5d5aa6b8ee" value="<?php   echo get_option( 'wp_automatic_license' ) ?>" name="wp_automatic_license" type="text">
										<div class="description">Your plugin purchase code</div>
										</div>		
 									
 									<?php 
 										
 										}
 									
 									?>		
 									
									
									<?php if( isset($wp_automatic_active_error) && stristr($wp_automatic_active_error,	 'another')  ) {?>
								
										<div class="field f_100 ">
											<label> Change domain </label>
											<input name="wp_automatic_options[]" value="OPT_CHANGE_DOMAIN" type="checkbox"> 
											<div class="description"> Disable license at the other domain and use it with this domain </div>
										</div>
									
									<?php } ?>
 
 
 									<div class="field f_100 ">
 										<label> License status:</label>
 										<div class="description">
 										
 											<?php 
 											
	 											if(trim($licenseactive) !=''){
	 												echo 'Active';
	 											}else{
	 												echo '<span style="color:red">Inactive</span> ';
	 												if(isset($wp_automatic_active_error)) echo '<p><span style="color:red">'.$wp_automatic_active_error.'</span></p>';
	 											}
 												
 											?>


										</div>
 									</div>
 
									<div id="form-submit" class="field f_100 clearfix submit" style>
										<input style="margin-left: 0" value="Save Changes" type="submit">
									</div>

									<!--start container-->
									<div style="clear: both"></div>
								</div>
							</div>



						</div>
					</div>
					<!-- End post box  -->


				</div>
				<!-- dashboard widgets -->
			</form>
		</div>
		<!-- dashboard widgets wrap -->

		<!--start container-->
	</div>
</div>
<!-- Panels -->

<script type="text/javascript">

		var pluginDir='';

		jQuery('.postbox h3').click( function() {
		   jQuery(jQuery(this).parent().get(0)).toggleClass('');

		} );
</script>

  
<?php } ?>