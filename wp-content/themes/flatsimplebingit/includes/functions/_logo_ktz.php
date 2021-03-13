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

/*
* Add logo
*/
if ( !function_exists('ktz_headlogo') ) :
function ktz_headlogo() {
	$get_logo_image = ot_get_option('ktz_logo');
	if (ot_get_option('ktz_logo_actived') == 'yes') {
		echo '<div class="ktz-logo">';
		echo '<a href="' . home_url() . '"><img src="' . $get_logo_image . '" alt="' . get_bloginfo('name') . '" title="' . get_bloginfo('name') . '" /></a>';
		if( (is_single() || is_page() || is_archive() || is_search()) and !(is_front_page()) ) :
		echo '<div class="singleblogtit-hide"><a href="'. home_url() . '" title="' . get_bloginfo('name') . '">' . get_bloginfo('name') . '</a></div>';
		echo '<div class="desc-hide">' . get_bloginfo('description') . '</div>';
		else : 
		echo '<h1 class="homeblogtit-hide"><a href="'. home_url() . '" title="' . get_bloginfo('name') . '">' . get_bloginfo('name') . '</a></h1>';
		echo '<div class="desc-hide">' . get_bloginfo('description') . '</div>';
		endif;
		echo '</div>';
		} else { 		
		echo '<div class="ktz-logo">';
		if( (is_single() || is_page() || is_archive()) and !(is_front_page()) ) :
		echo '<div class="singleblogtit"><a href="'. home_url() . '" title="' . get_bloginfo('name') . '">';
		echo get_bloginfo('name') . '</a></div>';
		echo '<div class="desc">' . get_bloginfo('description') . '</div>';
		else : 
		echo '<h1 class="homeblogtit"><a href="'. home_url() . '" title="' . get_bloginfo('name') . '">';
		echo get_bloginfo('name') . '</a></h1>';
		echo '<div class="desc">' . get_bloginfo('description') . '</div>';
		endif;
		echo '</div>';
		}	
	} 
add_action( 'ktz_headlogo', 'ktz_headlogo' );
endif;

/*
# Add logo squeeze page
*/
if ( !function_exists('ktz_headlogo_squeeze') ) :
function ktz_headlogo_squeeze() { 
	global $post;
	if (ot_get_option('ktz_logo_squeeze_activated') == 'yes') { 
	$get_logo_image = ot_get_option('ktz_logo_squeeze');
		echo '<div id="logo-squeeze-img"><div class="ktz-logo-squeeze">';
		echo '<a href="' . get_permalink() . '" id="logo-squeeze" title="' . get_the_title() . '"><img src="' . $get_logo_image . '" alt="' . get_the_title() . '" title="' . get_the_title() . '" /></a>';
		echo '<h1 class="homeblogtit-hide" style="display:none"><a href="'. home_url() . '" title="' . ot_get_option('ktz_logo_squeeze_name') . '">' . ot_get_option('ktz_logo_squeeze_name') . '</a></h1>';
		echo '<h2 class="desc-hide" style="display:none">' . ot_get_option('ktz_logo_squeeze_desc') . '</h2>';
		echo '</div></div>';
		} else { 		
		echo '<div class="logo-squeeze-text clearfix"><div class="ktz-logo-squeeze">';
		echo '<h1 class="homeblogtit"><a href="' . get_permalink() . '" id="logo-squeeze" title="' . get_the_title() . '">';
		if ( ot_get_option('ktz_icon_squeeze_name') != ''  ) { echo '<span class="' . ot_get_option('ktz_icon_squeeze_name') . '"></span> '; }
		echo get_the_title() . '</a></h1>';
		echo '</div></div>';
		}	
	} 
endif;