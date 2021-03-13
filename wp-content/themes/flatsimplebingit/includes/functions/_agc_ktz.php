<?php
/*
/*-----------------------------------------------*/
/* KENTOOZ THEMES FUNCTION
/* Website    : http://www.kentooz.com
/* The Author : Gian Mokhammad Ramadhan (http://www.gianmr.com)
/* Twitter    : http://www.twitter.com/g14nnakal 
/* Facebook   : http://www.facebook.com/gianmr
/*-----------------------------------------------*/

// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * Check whether the search result contain forbidden word
 * @return $result
 **/
function CleanFileNameBan($result){
	$option = ot_get_option('ktz_bad_keyword');
	# if option empty define KTZPLG_BADWORDS (default option in ktzagcplugin.php)
	
	// Define default options
	$KTZPLG_BADWORDS = 'http:,cache:,site:,utm_source,sex,porn,gamble,xxx,nude,squirt,gay,abortion,attack,bomb,casino,cocaine,die,death,erection,gambling,heroin,marijuana,masturbation,pedophile,penis,poker,pussy,terrorist,
		anal,anus,anal,anus,group sex,guro,hand job,handjob,hard core,hardcore,motherfucker,nipples,orgasm,phone sex,rape,raping,xxx,zoophilia,memek,bugil,telanjang,porno,porns,pecun,pelacur,wts';

	$option = ( empty( $option ) ) ? $KTZPLG_BADWORDS : $option;
	
	$badwords = explode(',', $option);
    
	foreach($badwords as $bad){
        $result = str_ireplace($bad .' ', '', $result);
        $result = str_ireplace(' '. $bad .' ', '', $result);
        $result = str_ireplace(' '. $bad, '', $result);
        $result = str_ireplace($bad, '.', $result);
        $result = str_ireplace($bad, ',', $result);
        $result = str_ireplace($bad, '-', $result);
    }

	return $result;
}

function ktz_clean_character($result) { 
	/*
	 * Replace +, _ with ' ' blank
	 * http://codex.wordpress.org/Function_Reference/remove_accents
	 */
	$result = strip_tags(htmlspecialchars_decode($result));
	$result = html_entity_decode($result, ENT_QUOTES);
	$result = str_replace('+', ' ', $result);
	$result = str_replace('_', ' ', $result);
	$result = preg_replace( '/[^a-zA-Z0-9\s]/', '', $result );
	$result = preg_replace('/\s[\s]+/','-',$result);
	$result = preg_replace('/[\s\W]+/','-',$result);
	/*
	 * Converts all accent characters to ASCII characters. 
	 * http://codex.wordpress.org/Function_Reference/remove_accents
	 */
	$result = remove_accents($result);
	/*
	 * Function sanitize from
	 * http://codex.wordpress.org/Function_Reference/sanitize_title
	 */
	$result = sanitize_title($result);
	
	/*
	 * Replace - with ' ' blank
	 * http://codex.wordpress.org/Function_Reference/remove_accents
	 */
	$result = str_replace('-', ' ', $result);
	/*
	 * Convert the first character of each word to uppercase: 
	 * http://www.w3schools.com/php/func_string_ucwords.asp
	 */
	$result = ucwords($result);
	return $result;
}

function ktz_get_AGC_single() {
	# Activated agc via theme options
	if (ot_get_option('ktz_agc_activated') == 'yes') {
		
		/*
		 * Require for the function wp_generate_attachment_metadata() to work
		 */
		include_once( ABSPATH . WPINC . '/feed.php' );
		
		$termstring = urlencode(get_the_title());
		
		/*
		 * This is BING XML where the picture come from. :D
		 */
		$xmlbing = array('http://www.bing.com/search?q='.$termstring.'&go=&form=QBLH&filt=all&format=rss');
		if ($xmlbing) {
			echo '<h4 class="ktz-agc-title"><span class="ktz-blocktitle">' . __( 'Related Search','ktz_theme_textdomain') . '</span></h4>';
			
			foreach ($xmlbing as $xmlbing) {
				$rss = fetch_feed($xmlbing);
				
				if ( ! is_wp_error( $rss ) ) : // Checks that the object is created correctly
				
					// Figure out how many total items there are, but limit it to 5. 
					$maxitems = $rss->get_item_quantity( 10 ); 
				
					// Build an array of all the items, starting with element 0 (first element).
					$bing_result = $rss->get_items( 0, $maxitems );

				endif;
		
				if ( ! is_wp_error( $rss ) ) :
				
					if ( $maxitems != 0 ) {
						
						echo '<ul class="ktz-agc-single">';
					
						foreach ($bing_result as $bing_results) {
							/*
							 * Clean and unique title
							 */
							$title_format = ktz_clean_character($bing_results->get_title());
							
							/*
							 * Image result, this auto save in your server
							 */
							$save_and_getcontent = ktz_clean_character($bing_results->get_description());
						
							/*
							 * For auto post, you can set draft or publish.
							 */
							echo '<li>';
								echo '<a href="' . get_search_link( CleanFileNameBan ( $title_format ) ) . '" title="'.ucwords($title_format).'">'.ucwords($title_format).'</a>';	
							echo '</li>';	
						}
						
						echo '</ul>';
						
					}
					
				endif;
				
			}
		} else {
			echo 'No internet connection!'; 
		} // if not internet connection

	}
}
add_action( 'ktz_get_AGC_single', 'ktz_get_AGC_single' );

function ktz_get_AGC( $keyword ) {
	# Activated agc via theme options
	if (ot_get_option('ktz_agc_activated') == 'yes') {
		
		/*
		 * Require for the function wp_generate_attachment_metadata() to work
		 */
		include_once( ABSPATH . WPINC . '/feed.php' );
		
		//Set query if any passed
		$keywords = isset( $keyword ) ? urlencode( $keyword ) : '';

		/*
		 * This is BING XML where the picture come from. :D
		 */
		$xmlbing = array('http://www.bing.com/search?q='.$keywords.'&go=&form=QBLH&filt=all&format=rss');
		if ($xmlbing) {
			
			foreach ($xmlbing as $xmlbing) {
				$rss = fetch_feed($xmlbing);
				
				if ( ! is_wp_error( $rss ) ) : // Checks that the object is created correctly
				
					// Figure out how many total items there are, but limit it to 5. 
					$maxitems = $rss->get_item_quantity( 10 ); 
				
					// Build an array of all the items, starting with element 0 (first element).
					$bing_result = $rss->get_items( 0, $maxitems );

				endif;
		
				if ( ! is_wp_error( $rss ) ) :
				
					if ( $maxitems != 0 ) {
						
						echo '<div class="box-post ktz-agc-search">';
					
						foreach ($bing_result as $bing_results) {
							/*
							 * Clean and unique title
							 */
							$title_format = ktz_clean_character( $bing_results->get_title() );
							
							/*
							 * Image result, this auto save in your server
							 */
							$save_and_getcontent = ktz_clean_character( $bing_results->get_description() );
							
							$link = urldecode( $bing_results->get_permalink() );
						
							/*
							 * For auto post, you can set draft or publish.
							 */
							echo '<h2>';
								echo '<a href="' . get_search_link( CleanFileNameBan ( $title_format ) ) . '" title="'.ucwords($title_format).'">'.ucwords($title_format).'</a>';	
							echo '</h2>';
							echo '<p>' . CleanFileNameBan( $save_and_getcontent ) . '</p>';
							echo '<p>Source/sumber : '.$link.'</p>';
							
						}
						
						echo '</div>';
						
					}
					
				endif;
				
			}
		} else {
			ktz_post_notfound();
		} // if not internet connection

	} else {
		ktz_post_notfound(); // function in _content_ktz.php
	}
}
add_action( 'ktz_get_AGC', 'ktz_get_AGC', 10, 1 );