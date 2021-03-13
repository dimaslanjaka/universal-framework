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
* Add social network share post
*/
function ktz_socialshare() {
    global $post;
	$href = get_permalink();
	echo '<div class="social-share clearfix">
	<fb:like href="'.$href.'" layout="box_count" action="like" show_faces="false" share="false" style="top:-5px;"></fb:like>
	<g:plusone size="tall" annotation="bubble" callback="ktz_gplus" href="'.$href.'"></g:plusone>
	<a href="//twitter.com/share" class="twitter-share-button" data-url="'.$href.'" data-size="medium" data-count="vertical" data-lang="en">Tweet</a>
	</div>';
}

/*******************************************
# Add share article in single post ~ Post
*******************************************/
function add_title_to_next_post_link($link) {  
	global $post;  
	$post = get_post($post->ID);  
	$next_post = get_next_post();  
	if ( $next_post ) {
		$title = $next_post->post_title;  
	} else {
		$title = '';  
	}
	$link = str_replace("rel=", " title='".$title."' rel=", $link);  
	return $link;  
}  
add_filter('next_post_link','add_title_to_next_post_link');  
  
  
function add_title_to_previous_post_link($link) {  
	global $post;  
	$post = get_post($post->ID);  
	$previous_post = get_previous_post();  
	if ( $previous_post ) {
		$title = $previous_post->post_title;
	} else {
		$title = '';  
	}  
	$link = str_replace("rel=", " title='".$title."' rel=", $link);  
	return $link;  
}  
add_filter('previous_post_link','add_title_to_previous_post_link');  

/*******************************************
# Add share article in single post ~ Post
*******************************************/
if ( !function_exists('ktz_share_single') ) :
function ktz_share_single() { 
	global $wp_query, $post;
	$blogname = urlencode( get_bloginfo( 'name' ) . ' ' . get_bloginfo( 'description' ) );
	$post = $wp_query->post;
	$excerpt = urlencode(strip_tags(strip_shortcodes( get_the_excerpt() )));
	if ($excerpt == '') {$excerpt = urlencode(substr(strip_tags(strip_shortcodes( get_the_excerpt() )), 0, 250 ));}
	$excerpt = str_replace( '+','%20',$excerpt );
	$excerpt = str_replace( '%0D%0A','',$excerpt );
	$permalink = get_permalink( $post->ID );
	$title = str_replace( '+', '%20', urlencode( $post->post_title ));
	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb,'full' ); 
	if ( $img_url ) { 
		$img_featured = $img_url;
	} elseif ( get_first_image_src() ) {
		$img_featured = get_first_image_src(); 
	} else { 
		$img_featured = get_template_directory_uri() . '/includes/assets/img/no-image/image-blank.jpg';
	} 
	
	echo '<ul class="nav nav-pills ktz-pills">';
	echo previous_post_link( '<li class="ktz-prevnext">%link</li>', __( '&laquo;', 'ktz_theme_textdomain' ) );
	if (ot_get_option('ktz_active_shared') != 'no') : 
	echo '<li><a href="//www.facebook.com/sharer/sharer.php?u=' . $permalink . '&amp;t=' . $title . '" target="_blank" class="ktz-facebook" title="Share This On facebook"><span class="fontawesome ktzfo-facebook"></span> Facebook</a></li>';
	echo '<li><a href="//twitter.com/home?status=' . $title . '%20-%20' . $permalink . '" target="_blank" class="ktz-twitter" title="Share This On twitter"><span class="fontawesome ktzfo-twitter"></span> Twitter</a></li>';
	echo '<li><a href="//pinterest.com/pin/create/button/?url=' . $permalink . '&amp;media=' . $img_featured . '&amp;description=' . $excerpt . '" class="ktz-pinterest" target="_blank" title="Share This On pinterest"><span class="fontawesome ktzfo-pinterest"></span> Pin it</a></li>';
    echo '<li class="dropdown">';
		echo '<a href="#" class="dropdown-toggle ktz-dropdown js-activated" data-toggle="dropdown">';
        echo '...';
		echo '</a>';
        echo '<ul role="menu" class="dropdown-menu">';
			echo '<li><a href="//plus.google.com/share?url='. $permalink .'" class="ktz-gplus" target="_blank" title="Share This On google plus">Google Plus</a></li>';
			echo '<li><a href="//www.digg.com/submit?url='. $permalink .'" class="ktz-digg" target="_blank" title="Share This On Digg">Digg</a></li>';
			echo '<li><a href="//reddit.com/submit?url='. $permalink .'&title=' . $title . '" class="ktz-reddit" target="_blank" title="Share This On Reddit">Reddit</a></li>';
			echo '<li><a href="//www.linkedin.com/shareArticle?mini=true&url='. $permalink .'" class="ktz-linkedin" target="_blank" title="Share This On Linkedin">Linkedin</a></li>';
			echo '<li><a href="//www.stumbleupon.com/submit?url='. $permalink .'&title=' . $title . '" class="ktz-stumbleupon" target="_blank" title="Share This On Stumbleupon">Stumbleupon</a></li>';
			echo '<li><a href="//delicious.com/post?url=' . $permalink . '&amp;title=' . $title . '&amp;notes=' . $excerpt . '" target="_blank" class="ktz-delicious" title="Share This On delicious">Delicious</a></li>';	
			echo '<li><a href="mailto:?Subject=' . $title . '&Body=I%20saw%20this%20and%20thought%20of%20you!%20 ' . $permalink . '" class="ktz-email" target="_blank" title="Email friend">Email friend</a></li>';
		echo '</ul>';
	echo '</li>';
	endif;
	echo next_post_link( '<li class="ktz-prevnext">%link</li>', __( '&raquo;', 'ktz_theme_textdomain' ) );
	echo '</ul>';
}
add_action( 'ktz_share_single', 'ktz_share_single' ); 
endif;


/*
* Social network icon
*/
if ( !function_exists('ktz_social_icon') ) {
function ktz_social_icon() {
	if (ot_get_option('ktz_head_social_activated') != 'no') : 
	if ((ot_get_option('ktz_tweet_sn') != '') || (ot_get_option('ktz_fb_sn') != '') || (ot_get_option('ktz_gplus_sn') != '') || (ot_get_option('ktz_in_sn') != '') || (ot_get_option('ktz_dribble_sn') != '') || (ot_get_option('ktz_flickr_sn') != '') || (ot_get_option('ktz_deviant_sn') != '') || (ot_get_option('ktz_blogger_sn') != '') || (ot_get_option('ktz_vimeo_sn') != '') || (ot_get_option('ktz_youtube_sn') != '') || (ot_get_option('ktz_rss_sn') != '')) :
	echo '<div class="pull-right"><ul class="ktz-socialicon">';
			if (ot_get_option('ktz_tweet_sn') != '')
				echo '<li class="twitter"><a href="' . ot_get_option('ktz_tweet_sn') . '" title="Twitter" rel="nofollow"><span class="fontawesome ktzfo-twitter"></span></a></li>';
			if (ot_get_option('ktz_fb_sn') != '')
				echo '<li class="facebook"><a href="' . ot_get_option('ktz_fb_sn') . '" title="Facebook" rel="nofollow"><span class="fontawesome ktzfo-facebook"></span></a></li>';
			if (ot_get_option('ktz_gplus_sn') != '')
				echo '<li class="gplus"><a href="' . ot_get_option('ktz_gplus_sn') . '" title="GPlus" rel="nofollow"><span class="fontawesome ktzfo-google-plus"></span></a></li>';
			if (ot_get_option('ktz_in_sn') != '')
				echo '<li class="in"><a href="' . ot_get_option('ktz_in_sn') . '" title="LinkedIn" rel="nofollow"><span class="fontawesome ktzfo-linkedin"></span></a></li>';
			if (ot_get_option('ktz_dribble_sn') != '')
				echo '<li class="dribble"><a href="' . ot_get_option('ktz_dribble_sn') . '" title="Dribble" rel="nofollow"><span class="fontawesome ktzfo-dribbble"></span></a></li>';
			if (ot_get_option('ktz_flickr_sn') != '')
				echo '<li class="flickr"><a href="' . ot_get_option('ktz_flickr_sn') . '" title="Flickr" rel="nofollow"><span class="fontawesome ktzfo-flickr"></span></a></li>';
			if (ot_get_option('ktz_instagram_sn') != '')
				echo '<li class="instagram"><a href="' . ot_get_option('ktz_instagram_sn') . '" title="Instagram" rel="nofollow"><span class="fontawesome ktzfo-instagram"></span></a></li>';
			if (ot_get_option('ktz_tumblr_sn') != '')
				echo '<li class="tumblr"><a href="' . ot_get_option('ktz_tumblr_sn') . '" title="Tumblr" rel="nofollow"><span class="fontawesome ktzfo-tumblr"></span></a></li>';
			if (ot_get_option('ktz_youtube_sn') != '')
				echo '<li class="youtube"><a href="' . ot_get_option('ktz_youtube_sn') . '" title="YouTube" rel="nofollow"><span class="fontawesome ktzfo-youtube"></span></a></li>';
			if (ot_get_option('ktz_rss_sn') != 'no')
				echo '<li class="rss"><a href="' . get_bloginfo('rss2_url') . '" title="RSS" rel="nofollow"><span class="fontawesome ktzfo-rss"></span></a></li>';
	echo '</ul></div>';
	endif;
	endif;
	} 
add_action( 'ktz_social_icon', 'ktz_social_icon' );
}