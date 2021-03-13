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

if ( !function_exists('ktz_video_wrapper') ) :
function ktz_video_wrapper() {
global $post;			
		$ktz_self_video_youtube_mt = get_post_custom_values('ktz_youtube_id', $post->ID); 
		// plugin https://wordpress.org/plugins/automatic-youtube-video-posts/
		$ktz_self_video_youtube_plugin_mt = get_post_custom_values('_tern_wp_youtube_video', $post->ID); 
		$ktz_other_video_mt = get_post_custom_values('ktz_other_video', $post->ID); 
		$ktz_self_video_vimeo_mt = get_post_custom_values('ktz_vimeo_id', $post->ID); 
		$ktz_self_video_dailymotion_mt = get_post_custom_values('ktz_dailymotion_url', $post->ID); 
		$ktz_self_video_vimeo = $ktz_self_video_vimeo_mt[0];
		$ktz_self_video_dailymotion = $ktz_self_video_dailymotion_mt[0];
		$ktz_other_video = $ktz_other_video_mt[0];
		$ktz_self_video_youtube = $ktz_self_video_youtube_mt[0];
		$ktz_self_video_youtube_plugin = $ktz_self_video_youtube_plugin_mt[0];
		if ( isset($ktz_other_video_mt) && $ktz_other_video != '' ) :
			echo '<div class="ktz-videowrapper">';
			echo $ktz_other_video;
			echo '</div>';
		elseif ( isset($ktz_self_video_youtube_plugin_mt) && $ktz_self_video_youtube_plugin != '' ) :
			echo '<div class="ktz-videowrapper">';
			echo '<iframe src="//www.youtube.com/embed/'.$ktz_self_video_youtube_plugin.'" frameborder="0" allowfullscreen></iframe>';
			echo '</div>';	
		elseif ( isset($ktz_self_video_youtube_mt) && $ktz_self_video_youtube != '' ) :
			echo '<div class="ktz-videowrapper">';
			echo '<iframe src="//www.youtube.com/embed/'.$ktz_self_video_youtube.'" frameborder="0" allowfullscreen></iframe>';
			echo '</div>';
		elseif ( isset($ktz_self_video_vimeo_mt) && $ktz_self_video_vimeo != '' ) :
			echo '<div class="ktz-videowrapper">';
			echo '<iframe src="//player.vimeo.com/video/'.$ktz_self_video_vimeo.'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			echo '</div>';
		elseif ( isset($ktz_self_video_dailymotion_mt) && $ktz_self_video_dailymotion != '' ) :
			echo '<div class="ktz-videowrapper">';
			echo '<iframe frameborder="0" src="//www.dailymotion.com/embed/video/'.$ktz_self_video_dailymotion.'" allowfullscreen></iframe>';
			echo '</div>';
		else :
			$ktz_self_video_mp4_mt = get_post_custom_values('ktz_self_video_mp4', $post->ID); 
			$ktz_self_video_webm_mt = get_post_custom_values('ktz_self_video_webm', $post->ID); 
			$ktz_self_video_ogg_mt = get_post_custom_values('ktz_self_video_ogg', $post->ID); 
			$ktz_self_video_rtmp_mt = get_post_custom_values('ktz_self_video_rtmp', $post->ID); 
			$ktz_self_video_mp4 = $ktz_self_video_mp4_mt[0];
			$ktz_self_video_webm = $ktz_self_video_webm_mt[0];
			$ktz_self_video_ogg = $ktz_self_video_ogg_mt[0];
			$ktz_self_video_rtmp = $ktz_self_video_rtmp_mt[0];
			if ( 
			( isset($ktz_self_video_mp4_mt) && $ktz_self_video_mp4 != '' ) ||
			( isset($ktz_self_video_webm_mt) && $ktz_self_video_webm != '' ) ||
			( isset($ktz_self_video_ogg_mt) && $ktz_self_video_ogg != '' ) ||
			( isset($ktz_self_video_rtmp_mt) && $ktz_self_video_rtmp != '' ) 
			) : 
				echo '<div class="ktz-videowrapper">';
				echo '<video id="ktz_video_box" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="" height=""';
			if ( isset($ktz_self_video_mp4_mt) && $ktz_self_video_mp4 != '' ) :
				echo ' poster="';
				echo ktz_featured_just_img_link('728', '500');
				echo '"';
			elseif ( isset($ktz_self_video_webm_mt) && $ktz_self_video_webm != '' ) :
				echo ' poster="';
				echo ktz_featured_just_img_link('728', '500');
				echo '"';
			elseif ( isset($ktz_self_video_ogg_mt) && $ktz_self_video_ogg != '' ) :
				echo ' poster="';
				echo ktz_featured_just_img_link('728', '500');
				echo '"';
			elseif ( isset($ktz_self_video_rtmp_mt) && $ktz_self_video_rtmp != '' ) :
				echo ' poster="';
				echo ktz_featured_just_img_link('728', '500');
				echo '"';
			else :
				echo '';
			endif;
				echo ' data-setup=\'{';
			if ( isset($ktz_self_video_rtmp_mt) && $ktz_self_video_rtmp != '' ) :
				echo '"techOrder": ["html5", "flash"]';
			endif;
				echo '}\'>';
			if ( isset($ktz_self_video_mp4_mt) && $ktz_self_video_mp4 != '' ) :
				echo '<source src="' . $ktz_self_video_mp4 . '" type=\'video/mp4\' />';
			elseif ( isset($ktz_self_video_webm_mt) && $ktz_self_video_webm != '' ) :
				echo '<source src="' . $ktz_self_video_webm . '" type=\'video/webm\' />';
			elseif ( isset($ktz_self_video_ogg_mt) && $ktz_self_video_ogg != '' ) :
				echo '<source src="' . $ktz_self_video_ogg . '" type=\'video/ogg\' />';
			elseif ( isset($ktz_self_video_rtmp_mt) && $ktz_self_video_rtmp != '' ) :
				echo '<source src="' . $ktz_self_video_rtmp . '" type=\'rtmp/mp4\' />';
			else :
				echo '';
			endif;
				echo '</video>';
				echo '</div>';
			endif;
		endif;
}
add_action('ktz_video_wrapper','ktz_video_wrapper');
endif;

/**
 * Add responsive oembed class.
 * @add_filter embed_oembed_html
 * @class ktz-videowrapper
 * @link https://developer.wordpress.org/reference/hooks/embed_oembed_html/
 */
add_filter('embed_oembed_html', 'ktz_new_embed_oembed_html', 99, 4);
function ktz_new_embed_oembed_html($html, $url, $attr, $post_id) {
    return '<div class="ktz-videowrapper">' . $html . '</div>';
}