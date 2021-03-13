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
* Add related post in single page
* add_action( 'do_ktz_singlecontent', 'ktz_relpost' ); in init.php
*/
if ( !function_exists('ktz_relpost') ) {
function ktz_relpost() {
	if ( ot_get_option('ktz_active_related') == 'yes' ) :
	global $post;
	$orig_post = $post;
	$opsi_numberrelated = ot_get_option('ktz_numberpost_related');
	$numberpost = !empty($opsi_numberrelated) ? $opsi_numberrelated : '4';
	if (ot_get_option('ktz_taxonomy_relpost') == 'tags')
	{
		$tags = wp_get_post_tags($post->ID);
		if ($tags) {
			$tag_ids = array();
			foreach($tags as $individual_tag) $tag_ids[] = $individual_tag->term_id;
			$args=array(
				'tag__in' => $tag_ids,
				'post__not_in' => array($post->ID),
				'posts_per_page'=> $numberpost,
				'ignore_sticky_posts'=>1
			);
		}
	} else {
		$categories = get_the_category($post->ID);
		if ($categories) {
			$category_ids = array();
			foreach($categories as $individual_category) $category_ids[] = $individual_category->term_id;
			$args=array(
			'category__in' => $category_ids,
			'post__not_in' => array($post->ID),
			'posts_per_page'=> $numberpost,
			'ignore_sticky_posts'=>1
			);
		} 
	} 
	if (!isset($args)) $args = '';
	$ktz_query = new WP_Query($args);
	$i = 1;
	if( $ktz_query->have_posts() ) { 
		echo '<h2 class="related-title"><span>' . __( 'Related Post','ktz_theme_textdomain') . ' "' . get_the_title() . '"</span></h2>';
		echo '<div class="ktz-related-post row">';
		while ( $ktz_query->have_posts() ) : $ktz_query->the_post();
		global $post;
		$thumb = get_post_thumbnail_id();
		$img_url = wp_get_attachment_url( $thumb,'full' ); 
		$fisrtimg_url = get_first_image_src(); 
		$get_imgpost_upload = ktz_getpost_images_upload();
		if($i%2 == 0) :
		echo '<div class="col-md-6">';
		echo '<div class="entry-body media ktz-miniblog">';
			if ( $img_url|| $fisrtimg_url || $get_imgpost_upload )  { 
			echo '<div class="ktz-thumbwrap">';
			echo ktz_featured_img( 60, 60 ); // New kentooz image croping just call ktz_featured_img( width, height )
			echo '<span class="fontawesome ktzfo-caret-right"></span>';
			echo '</div>';
			}
			echo '<div class="media-body ktz-post">';
				ktz_posted_title_a();
			echo '<div>';
			echo ktz_get_excerpt(8);
			echo '</div>';
			echo '</div>';
		echo '</div>';
		echo '</div>';
		echo '<div class="clearfix"></div>';
		else :
		echo '<div class="col-md-6">';
		echo '<div class="entry-body media ktz-miniblog">';
		$thumb = get_post_thumbnail_id();
		$img_url = wp_get_attachment_url( $thumb,'full' ); 
		$fisrtimg_url = get_first_image_src(); 
			if ( $img_url|| $fisrtimg_url )  { 
			echo '<div class="ktz-thumbwrap">';
			echo ktz_featured_img( 60, 60 ); // New kentooz image croping just call ktz_featured_img( width, height )
			echo '<span class="fontawesome ktzfo-caret-right"></span>';
			echo '</div>';
			}
			echo '<div class="media-body ktz-post">';
				ktz_posted_title_a();
			echo '<div>';
			echo ktz_get_excerpt(8);
			echo '</div>';
			echo '</div>';
		echo '</div>';
		echo '</div>';
		endif;
		$i++;
		endwhile;
		echo '</div>';
	} else {
		echo '<div class="no-post">No related post!</div>';
	}
	$post = $orig_post; 
	wp_reset_query();
	endif;
	}
add_action( 'ktz_relpost', 'ktz_relpost' );
}