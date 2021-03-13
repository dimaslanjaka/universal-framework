<?php
/**
 * Google Fonts Ajax Callback
 *
 * Returns a json string with all Google Fonts from DB
 *
 * @return string
 *
 */
	function ot_ajax_get_google_font(){

			// get the google font array - located in ot-google-fonts.php
			$google_font_array = googlefont_select();
				
			// loop through the cached google font array if available and append to default fonts
			$font_array = array();
			if($google_font_array){
					foreach($google_font_array as $index => $value){
							$font_array[$value['value']];
					}
			}
			
			// put both arrays together
			$array = array_merge($font_array);
			
			die(json_encode($array));
			
	}
	// creating Ajax call for WordPress
	add_action( 'wp_ajax_nopriv_ot_ajax_get_google_font', 'ot_ajax_get_google_font' );
	add_action( 'wp_ajax_ot_ajax_get_google_font', 'ot_ajax_get_google_font' );
				
/**
 * Enqueue Styles and Scripts
 *
 * Enqueues scripts for the Google Font preview box.
 *
 * @param string $hook of the current themes page
 *
 * @uses wp_enqueue_style(), wp_enqueue_script()
 * Not use again
 * 
	function ot_action_enqueue_scripts($hook){
					
		if($hook == 'appearance_page_ot-theme-options'):

			// get plugin folder
			$path = 'includes/admin/'.basename( __DIR__);
											
			// enqueue the css file
			wp_enqueue_style( 'ot-google-font-css', trailingslashit( get_stylesheet_directory_uri() ).$path.'/css/style.css', array(), '', 'all');
			
			// enqueue the js file
			wp_enqueue_script( 'ot-google-font-js', trailingslashit( get_stylesheet_directory_uri() ).$path.'/js/scripts.js', array(), '', 'all');
			
		endif;
		
	}
*/
	/* add scripts for metaboxes to post-new.php & post.php
	 * Not use again
	if(is_admin()){
			add_action( 'admin_enqueue_scripts', 'ot_action_enqueue_scripts', 11 );
	}
	*/	
		
		
?>