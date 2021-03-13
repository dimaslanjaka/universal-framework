<?php
/**
 * Class: Campaign Processor process single or all campaigns. to be called by the cron.php file
 * @author sweetheatmn
 *
 */

class CampaignProcessor{
	
	// Public vars
	public $db;
	public $prefix;
	
	function __construct(){
		
		// Database initialization
		global $wpdb;
		$this->db = $wpdb;
		$this->wp_prefix = $wpdb->prefix;
		
	}
	
	/**
	 * Process all campaigns or single campaign
	 * @param string $cid specific campaign id
	 */
	function process_campaigns($cid = false) {
	
		// DB prefix
		$prefix = $this->db->prefix;
	
		// Single or all check
		if (trim ( $cid ) == '') {
				
			// All campaings
			$last = get_option ( 'gm_last_processed', 0 );
		 		
			// get all the campaigns from the db lower than the last processed
			$query = "SELECT * FROM {$this->wp_prefix}automatic_camps  where camp_id < $last ORDER BY camp_id DESC";
			$camps = $this->db->get_results ( $query );
				
			// check if results returned with id less than the last processed or not if not using regular method
			$query = "SELECT * FROM {$this->wp_prefix}automatic_camps WHERE  camp_id >= $last ORDER BY camp_id DESC";
			$camps2 = $this->db->get_results ( $query );
				
			// merging 2 arrays
			$camps = array_merge ( $camps, $camps2 );
			
		} else {
		 	  
			// Single campaign process
			$query = "SELECT * FROM {$this->wp_prefix}automatic_camps  where camp_id = $cid ORDER BY camp_id DESC";
			$camps = $this->db->get_results ( $query );
		 	
		}
			
		// check if need to process camaigns or skip
		if (count ( $camps ) == 0) {
			
			  echo '<br>No valid campaigns to process ';
			return;
			
		}else{
			
			if(trim($cid) == '')   echo '<br>DB contains '.count($camps).' campaigns<br>';
				
		}
	
		// now processing each fetched campaign
		$i = 0;
		foreach ( $camps as $campaign ) {
			
			// reading post status
			$status = get_post_status ( $campaign->camp_id );
			
			// if published process
			if ($status == 'publish') {
				
				if ($i != 0)   echo '<br>';
				
				// report campaign number
				  echo "<b>Processing Campaign</b> $campaign->camp_name {  $campaign->camp_id  }";
					
				// updating the last id processed
				update_option ( 'gm_last_processed', $campaign->camp_id );
				
				//check if deserve processing now or not
				if(trim($cid) == false){
					
					//read post every x minutes
					if( stristr($campaign->camp_general, 'a:') ) $campaign->camp_general=base64_encode($campaign->camp_general);
					$camp_general = unserialize (base64_decode( $campaign->camp_general) );
					@$camp_general=array_map('wp_automatic_stripslashes', $camp_general);
						
					if(! is_array($camp_general) || ! isset($camp_general['cg_update_every']) ){
						$camp_general = array('cg_update_every'=>60 ,'cg_update_unit'=> 1);
					}
	
					$post_every = $camp_general['cg_update_every'] * $camp_general['cg_update_unit'];
	
					  echo '<br>Campaign scheduled to process every '.$post_every . ' minutes ';
						
					//get last check time
					$last_update=get_post_meta($campaign->camp_id,'last_update',1);
					if(trim($last_update) == '') $last_update =1388692276 ;
					//  echo '<br>Last updated stamp '.$last_update;
						
					$difference = $this->get_time_difference($last_update, time());
						
					  echo '<br> last processing was <strong>'.$difference. '</strong> minutes ago ';
						
					if($difference > $post_every ){
						  echo '<br>Campaign passed the time and eligible to be processed';
						update_post_meta($campaign->camp_id,'last_update',time());
	
						//process
						$this->processCampaign( $campaign ,'Cron' );
						
						  echo '<br>Exit cron now and complete next cron.';
						exit;
						
						
					}else{
						  echo '<br>Campaign still not passed '.$post_every . ' minutes';
					}
						
						
				}else{
					
					// No cron just single campaign process
					$this->processCampaign($campaign);
						
				}
				$i ++;
				
			} elseif (! $status) {
				
				// deleting Camp record
				$query = "delete from {$this->wp_prefix}automatic_camps where camp_id= '$campaign->camp_id'";
				$this->db->query ( $query );
				// deleting matching records for keywords
				$query = "delete from {$this->wp_prefix}automatic_keywords where keyword_camp ='$campaign->camp_id'";
				$this->db->query ( $query );
				
			}else{
				  echo "<br>Campaign {$campaign->camp_id} is not published ..";
			}
		}
	}
	
	/**
	 * Function processCampaign: process a single campaign
	 * @param database record $camp
	 */
	function processCampaign($campaign,$userOrCron = 'User'){
		
		// Update last run
		update_post_meta($campaign->camp_id,'last_update',time());
		
	  
		// Campaign type check
		$camp_type = $campaign->camp_type;
		 
		if( $camp_type == 'Articles'){
		
			require_once 'core.ezinearticles.php';
			$WpAutomatic = new WpAutomaticArticles();
		
		}elseif( $camp_type == 'ArticlesBase'){
			
			require_once 'core.articlesbase.php';
			$WpAutomatic = new WpAutomaticArticlesBase();
		
		}elseif($camp_type == 'Feeds'){
			
			require_once 'core.feeds.php';
			$WpAutomatic = new WpAutomaticFeeds();
			
			
		}elseif($camp_type == 'Amazon'){
			
			require_once 'core.amazon.php';
			$WpAutomatic = new WpAutomaticAmazon();
		}elseif($camp_type == 'Clickbank'){
			
			require_once 'core.clickbank.php';
			$WpAutomatic = new WpAutomaticClickbank();
		}elseif($camp_type == 'Facebook'){
			
			require_once 'core.facebook.php';
			$WpAutomatic = new WpAutomaticFacebook();
		}elseif($camp_type == 'Youtube'){
			
			require_once 'core.youtube.php';
			$WpAutomatic = new WpAutomaticYoutube();
		}elseif($camp_type == 'SoundCloud'){
			
			require_once 'core.soundcloud.php';
			$WpAutomatic = new WpAutomaticSoundCloud();
		}elseif($camp_type == 'Pinterest'){
			
			require_once 'core.pinterest.php';
			$WpAutomatic = new WpAutomaticPinterest();
		
		}elseif($camp_type == 'Vimeo'){
			
			require_once 'core.vimeo.php';
			$WpAutomatic = new WpAutomaticVimeo();
		
		}elseif($camp_type == 'Twitter'){
			
			require_once 'core.twitter.php';
			$WpAutomatic = new WpAutomaticTwitter();
		
		}elseif($camp_type == 'Instagram'){
			
			require_once 'core.instagram.php';
			$WpAutomatic = new WpAutomaticInstagram();
			
		}elseif($camp_type == 'eBay'){
			
			require_once 'core.ebay.php';
			$WpAutomatic = new WpAutomaticeBay();
			
		}elseif($camp_type == 'Flicker'){
			
			require_once 'core.flicker.php';
			$WpAutomatic = new WpAutomaticFlicker(); 
			
		}elseif($camp_type == 'Craigslist'){
				
			require_once 'core.craigslist.php';
			$WpAutomatic = new WpAutomaticCraigslist();
			
		}elseif($camp_type == 'Itunes'){
		
			require_once 'core.itunes.php';
			$WpAutomatic = new WpAutomaticItunes();
		
		}elseif($camp_type == 'Envato'){
		
			require_once 'core.envato.php';
			$WpAutomatic = new WpAutomaticEnvato();
			
		}elseif($camp_type == 'DailyMotion'){
		
			require_once 'core.dailymotion.php';
			$WpAutomatic = new WpAutomaticDailyMotion();
			
		}elseif($camp_type == 'Reddit'){
		
			require_once 'core.reddit.php';
			$WpAutomatic = new WpAutomaticReddit();
			
		}elseif($camp_type == 'Walmart'){
		
			require_once 'core.walmart.php';
			$WpAutomatic = new WpAutomaticWalmart();
		
		}elseif($camp_type == 'Single'){
				
				require_once 'core.single.php';
				$WpAutomatic = new WpAutomaticSingle();
				
		}elseif($camp_type == 'Careerjet'){
			
			require_once 'core.careerjet.php';
			$WpAutomatic = new WpAutomaticCareerjet();
			
		}else{
			
			require_once 'core.php';
			$WpAutomatic = new wp_automatic();
			
		}
		
			
		// process
		$WpAutomatic->log ( '<strong>'.$userOrCron.'</strong> >> Processing Campaign:' . $campaign->camp_id, $campaign->camp_name .'{'.$campaign->camp_id .'}' );
		$WpAutomatic->process_campaign ( $campaign );
		
	}
	
	/*
	 * function get_time_difference: get the time difference in minutes.
	 * @start: time stamp
	 * @end: time stamp
	 */
		
	function get_time_difference( $start, $end )
	{
			
		$uts['start']      =     $start ;
		$uts['end']        =      $end ;
			
			
			
		if( $uts['start']!==-1 && $uts['end']!==-1 )
		{
			if( $uts['end'] >= $uts['start'] )
			{
				$diff    =    $uts['end'] - $uts['start'];
					
				return round($diff/60,0);
					
			}
				
		}
	}
}