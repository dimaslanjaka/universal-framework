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
* Gallery post type
*/
if ( !function_exists('ktz_get_gallery_post') ) :
function ktz_get_gallery_post() { 
	global $post;
	$meta_values = get_post_custom($post->ID);
	if(isset($meta_values['ktz_gallery_post_postformat'][0]) && has_post_format('gallery')){
		$title = get_the_title();
		$gallery = explode( ',', get_post_meta( get_the_ID(), 'ktz_gallery_post_postformat', true ) );
		echo '<div class="ktz-gallery"><ul>';
			foreach ($gallery as $slide ) {
				$attachment_url = get_attachment_link( $slide );
				$img_url = wp_get_attachment_url( $slide ); 
				$desc_img = get_the_title( $slide );
				$params = array( 'width' => 140, 'height' => 120, 'crop' => true );
				if (function_exists( 'jetpack_photon_url' )&& class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
					$image_ori = apply_filters( 'jetpack_photon_url', $img_url, 'resize=140,120' );
				else :
					$image_ori = bfi_thumb( $img_url, $params ); //resize & crop the image
				endif;
				echo '<li>';
				echo '<a href="' . $attachment_url . '" title="Image for ' . $desc_img . '"><img src="'.$image_ori.'" height="250" width="300" alt="' . $desc_img . '" title="' . $desc_img . '" /></a>';
				echo '</li>';
			}		
		echo '<ul></div>';
	}
}
add_action( 'ktz_get_gallery_post', 'ktz_get_gallery_post' );
endif;

/*
* Add footer slider in single
*/
if ( !function_exists('ktz_mustread_content') ) :
function ktz_mustread_content() {	
	global $post;
	if ( ot_get_option('ktz_popup_activated') == 'yes' ) :
		$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
		$args = array(
			'post_type' => 'post',
			'orderby' => 'rand',
			'order' => 'desc',
			'showposts' => 3,
			'post_status' => 'publish',
			'ignore_sticky_posts' => 1
		);
		$ktz_topfeatquery = new WP_Query($args); 
		if ($ktz_topfeatquery -> have_posts()) : 
		echo '<div id="ktz_slidebox">';
		echo '<strong class="mustread_title">' . __('Must read', 'ktz_theme_textdomain') . '</strong><a href="#" class="close">&times;</a>';
		echo '<ul class="mustread_list">';
		while ($ktz_topfeatquery -> have_posts()) : $ktz_topfeatquery -> the_post();
		echo '<li class="mustread_li clearfix">';
		echo '<div class="pull-left" style="margin-right:10px;">';
		echo ktz_featured_img(40, 40);
		echo '</div>';
		echo '<div class="title">';
		echo ktz_posted_title_a();
		echo '</div>';
		echo '</li>';
		endwhile; 
		echo '</ul>';
		echo '</div>';
		endif;
	wp_reset_query();
	endif;
	}
add_action( 'ktz_mustread_content', 'ktz_mustread_content' );
endif;