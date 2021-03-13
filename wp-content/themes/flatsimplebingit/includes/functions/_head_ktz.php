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
* Filter language_attributes and add opengraph facebook 
*/
function ktz_opengraph_doctype( $output ) {
	return $output . ' xmlns:og="//opengraphprotocol.org/schema/" xmlns:fb="//www.facebook.com/2008/fbml"';
}
add_filter( 'language_attributes', 'ktz_opengraph_doctype' );

/*
* Add head script options via wp_head hook
* add_action( 'wp_head', 'ktz_headscript' ); in init.php
*/
function ktz_headscript()  {
	echo ot_get_option("ktz_head") . "\n";  
}
add_action( 'wp_head', 'ktz_headscript' );

/*
* Add element on head on hook system and call it via WP_head hook
* add_action( 'wp_head', 'ktz_headelement' ); in init.php
*/
if ( !function_exists('ktz_headelement') ) {
function ktz_headelement() {
	global $post, $page, $paged, $wp_query;
		/* 
		* Description function 
		*/
		$haspost = count( $wp_query->posts ) > 0;
		if(is_home() || is_front_page()){ 
			$ktz_meta_desc = get_bloginfo('description');
		} elseif (is_single() || is_page()) {
			$ktz_meta_description = get_post_custom_values('ktz_meta_description', $post->ID); 
			$excerpt = substr(strip_tags(strip_shortcodes( $post->post_content )), 0, 125 );
			$excerpt = str_replace(array("\n", "\r", "\t"), '', $excerpt);
			if ($ktz_meta_description != '') :
				$ktz_meta_desc = $ktz_meta_description[0];
			else:
				$ktz_meta_desc = $excerpt;
			endif;
		} elseif(is_category()) {
			$cat = get_query_var('cat');
			$ktz_meta_desc = strip_tags(category_description($cat)); 
			if ( $paged >= 2 || $page >= 2 )
			$ktz_meta_desc = strip_tags(category_description($cat)) . ' ' . sprintf( __( 'in page %s', 'ktz_theme_textdomain' ), max( $paged, $page ) );
		} elseif(is_tag()) {
			ob_start();
			single_tag_title();
			$single_tag_title = ob_get_contents();
			ob_end_clean();
			$thisTag = get_term_by('name', $single_tag_title, 'post_tag'); 
			$ktz_meta_desc = $thisTag->description; 
			if ( $paged >= 2 || $page >= 2 )
			$ktz_meta_desc = $thisTag->description . ' ' . sprintf( __( 'in page %s', 'ktz_theme_textdomain' ), max( $paged, $page ) );
		} elseif(is_author()) {
			$curauth = $wp_query->get_queried_object();
			$ktz_meta_desc = $curauth->description;
			if ( $paged >= 2 || $page >= 2 )
			$ktz_meta_desc = $curauth->description . ' ' . sprintf( __( 'in page %s', 'ktz_theme_textdomain' ), max( $paged, $page ) );
		} elseif ( $wp_query->is_tax && $haspost ) {
			$taxonomy = get_query_var( 'taxonomy' );
			$term = get_query_var( 'term' );
			if ( !empty( $term ) ) : 
				$terms = get_term_by('slug', $term, $taxonomy);
				$ktz_meta_desc = $terms->description;
			endif;
        } else { 
			$ktz_meta_desc = get_bloginfo('description');
			}
		/* 
		* URL function 
		*/
		if( is_author() ) { 
			$curauth = $wp_query->get_queried_object();
			$ktz_meta_url = get_author_posts_url( $curauth->ID,$curauth->user_nicename );
		} elseif( is_category() && is_object($post) ) { 
			$categories = get_the_category();
			$category_id = $categories[0]->cat_ID;
			$ktz_meta_url = get_category_link( $category_id );
		} elseif( is_tag() ) { 
			$tag_id = $wp_query->query_vars['tag_id'];
			$ktz_meta_url = get_tag_link( $tag_id );
		} elseif( is_home() ) { 
			$ktz_meta_url = home_url(); 
		} elseif ( $wp_query->is_tax && $haspost ) {
			$taxonomy = get_query_var( 'taxonomy' );
			$term = get_query_var( 'term' );
			if ( !empty( $term ) )
				$ktz_meta_url = get_term_link( $term, $taxonomy );
        } elseif ( $wp_query->is_archive && function_exists( 'get_post_type_archive_link' ) && ( $post_type = get_query_var( 'post_type' ) ) ) {
            $ktz_meta_url = get_post_type_archive_link( $post_type );
	    } else { 
			$ktz_meta_url = get_permalink(); 
			}
		/* 
		* Title function 
		*/
		if(is_home()) { 
			$ktz_meta_title = get_bloginfo('name'); 
		} elseif (is_404()) {
			$ktz_meta_title = __('Post not found', 'ktz_theme_textdomain');	
		} elseif (is_category()) { 
			ob_start();
			single_cat_title();
			$single_cat_title = ob_get_contents();
			ob_end_clean();
			$ktz_meta_title = $single_cat_title; 
		} elseif(is_author()) { 
			$curauth = (get_query_var('author_name')) ? get_user_by('slug', get_query_var('author_name')) : get_userdata(get_query_var('author')); 
			$ktz_meta_title = $curauth->display_name; 
		} elseif ( $wp_query->is_tax && $haspost ) {
			$taxonomy = get_query_var( 'taxonomy' );
			$term = get_query_var( 'term' );
			if ( !empty( $term ) ) : 
				$terms = get_term_by('slug', $term, $taxonomy);
				$ktz_meta_title = $terms->name;
			endif;
        } else { 
			$ktz_meta_title = get_the_title(); 
		} 
		if (is_single() || is_page()) { 
			$ktz_meta_type = "article"; 
		} else { 
			$ktz_meta_type = "website";
		}
		/* 
		* Image URL function 
		*/
		if ( is_author() ) {
			$curauth = $wp_query->get_queried_object();
			$author_avatar = ktz_get_avatar_url(get_avatar( $curauth->ID, $size='256' ));
			$ktz_meta_image = $author_avatar;
		} elseif ( is_single() || is_category() || is_home() || is_front_page() || is_page() || is_attachment() || is_archive() ) {
			// Grab from first image, yeahhh
			if ( ! empty($post) && is_a($post, 'WP_Post') ) {
			$fisrtimg_url = get_first_image_src_forhead(); 
			if ( has_post_thumbnail() ) { 
				$thumb = get_post_thumbnail_id();
				$img_url = wp_get_attachment_url( $thumb,'full' ); 
				$ktz_meta_image = $img_url;
			} elseif ($fisrtimg_url) {
				$ktz_meta_image = $fisrtimg_url; 
			} else {
				$ktz_meta_image = ktz_url . 'includes/assets/img/no-image/facebook.jpeg';
			}
			} else {$ktz_meta_image = ktz_url . 'includes/assets/img/no-image/facebook.jpeg';}
		} else {
			$ktz_meta_image = ktz_url . 'includes/assets/img/no-image/facebook.jpeg';
		}
	$ktzseo = ot_get_option('ktz_seo');
	/*
	* Meta Kentooz SEO (Search engine optimized) 
	*/
	$ktz_metadata_arg = array();
	if($ktzseo == 'yes'){
		$ktz_metadata_arg[] = '';
		$ktz_metadata_arg[] = '<!-- BEGIN Metadata added by kentooz themes -->';
		$ktz_gplus_profile = ot_get_option('ktz_gplus_profile');
		if (!empty($ktz_gplus_profile)) {
			$ktz_metadata_arg[] = '<link rel="author" href="' . $ktz_gplus_profile . '" />';
			if ( is_home() || is_front_page()) {
			$ktz_metadata_arg[] = '<link rel="publisher" href="' . $ktz_gplus_profile . '" />';
			}
		}
		if ( is_home() || is_front_page()) {
		$ktz_google_verified = ot_get_option('ktz_google_verified');
			if (!empty($ktz_google_verified)) {
				$ktz_metadata_arg[] = '<meta name="google-site-verification" content="' . $ktz_google_verified . '" />';
			}
		$ktz_bing_verified = ot_get_option('ktz_bing_verified');
			if (!empty($ktz_bing_verified)) {
				$ktz_metadata_arg[] = '<meta name="msvalidate.01" content="' . $ktz_bing_verified . '" />';
			}
		$ktz_pinterest_verified = ot_get_option('ktz_pinterest_verified');
			if (!empty($ktz_pinterest_verified)) {
				$ktz_metadata_arg[] = '<meta name="p:domain_verify" content="' . $ktz_pinterest_verified . '" />';
			}
		$ktz_alexa_verified = ot_get_option('ktz_alexa_verified');
			if (!empty($ktz_alexa_verified)) {
				$ktz_metadata_arg[] = '<meta name="alexaVerifyID" content="ahsgs_kjagsmhgdsjgsdfh" />';
			}
		}
		$ktz_metadata_arg[] = '<meta name="googlebot" content="index,follow" />';   
		$ktz_metadata_arg[] = '<meta name="msnbot" content="index,follow" />';
		$ktz_is_tag = is_tag();
		$ktz_noindex_category = ot_get_option('ktz_noindex_category');
		$ktz_noindex_date = ot_get_option('ktz_noindex_date');
		$ktz_noindex_author = ot_get_option('ktz_noindex_author');
		$ktz_noindex_tag = ot_get_option('ktz_noindex_tag');
		$ktz_noindex_attachment = ot_get_option('ktz_noindex_attachment');
		if ( ( is_attachment() && $ktz_noindex_attachment == 'yes' ) || ( is_category() && $ktz_noindex_category == 'yes' ) 
		|| ( !is_category() && is_archive() && !$ktz_is_tag && ( ( $ktz_noindex_date == 'yes' && is_date() ) 
		|| ( $ktz_noindex_author == 'yes' && is_author() ) ) ) 
		|| ( $ktz_noindex_tag == 'yes' && $ktz_is_tag ) ) {
			$ktz_metadata_arg[] = '<meta name="robots" content="noindex,follow" />';
		} else {
			if ( is_single() || is_page() ) {
				$ktz_meta_noindex = get_post_custom_values('ktz_meta_noindex', $post->ID); 
				$ktz_meta_nofollow = get_post_custom_values('ktz_meta_nofollow', $post->ID); 
				$ktz_meta_noodp = get_post_custom_values('ktz_meta_noodp', $post->ID); 
				$ktz_meta_noydir = get_post_custom_values('ktz_meta_noydir', $post->ID); 
				if ( $ktz_meta_noindex || $ktz_meta_nofollow || $ktz_meta_noodp || $ktz_meta_noydir ) {
					$noindex = "index";
					$nofollow = "follow";
					$noodp = $noydir = '';
					if ( $ktz_meta_noindex[0] == 'yes' ) {
						$noindex = "no" . $noindex; 
						}
					if ( $ktz_meta_nofollow[0] == 'yes' ) {
						$nofollow = "no" . $nofollow; 
						}
					if ( $ktz_meta_noodp[0] == 'yes' ) { 
						$nofollow .= ',noodp';
						}
					if ( $ktz_meta_noydir[0] == 'yes' ) { 
						$nofollow .= ',noydir';
						}
					$ktz_metadata_arg[] = '<meta name="robots" content="' . $noindex . ',' . $nofollow . '" />' . "\n";
				}
			}
		}
		$ktz_metadata_arg[] = '<meta name="description" content="' . $ktz_meta_desc . '">';
		if ( is_home() || is_front_page()) {
        $ktz_site_keywords = ot_get_option('ktz_meta_keywords');
			if (empty($ktz_site_keywords)) {
				// Alternatively, use the blog categories
				// ktz_get_all_categories() location @ functions/function_core.php
				$ktz_site_keywords = ktz_get_all_categories();
			}
			if ( !empty($ktz_site_keywords) ) {
				// If $ktz_site_keywords is not empty, then use it in the keywords meta-tag of the front page
				$ktz_metadata_arg[] = '<meta name="keywords" content="' . $ktz_site_keywords . '" />';
			}
		} elseif ( is_single() || is_page() ) {
			$keywords = ktz_get_content_keywords($auto=true);
			if (!empty($keywords)) {
				$ktz_metadata_arg[] = '<meta name="keywords" content="' . ktz_strtolower($keywords) . '" />';
			}
		} elseif ( is_category() ) {
			$cur_cat_name = single_cat_title($prefix = '', $display = false );
			if ( !empty($cur_cat_name) ) {
				$ktz_metadata_arg[] = '<meta name="keywords" content="' . ktz_strtolower($cur_cat_name) . '" />';
			}
		} elseif ( $wp_query->is_tax && $haspost ) {
			$taxonomy = get_query_var( 'taxonomy' );
			$term = get_query_var( 'term' );
			if ( !empty( $term ) ) : 
				$terms = get_term_by('slug', $term, $taxonomy);
				$ktz_metadata_arg[] = '<meta name="keywords" content="' . $terms->name . '" />';
			endif;
		} elseif ( is_tag() ) {
			$cur_tag_name = single_tag_title($prefix = '', $display = false );
			if ( !empty($cur_tag_name) ) {
				$ktz_metadata_arg[] = '<meta name="keywords" content="' . ktz_strtolower($cur_tag_name) . '" />';
			}
		} elseif ( is_author() ) {
			$curauth = $wp_query->get_queried_object();
			$ktz_meta_keyword = $curauth->display_name;
			if ( $paged >= 2 || $page >= 2 )
			$ktz_meta_keyword = $curauth->display_name . ' ' . sprintf( __( 'in page %s', 'ktz_theme_textdomain' ), max( $paged, $page ) );	
			if ( !empty($ktz_meta_keyword) ) {
				$ktz_metadata_arg[] = '<meta name="keywords" content="' . ktz_strtolower($ktz_meta_keyword) . '" />';
			}			
		}
		$ktz_metadata_arg[] = '';
	}
	/*
	* Meta facebook opengraph 
	*/
	$ktz_metadata_arg[] = '<!-- BEGIN opengraph added by kentooz themes -->';
	$ktz_metadata_arg[] = '<meta property="og:url" content="' . $ktz_meta_url . '" />';
	$ktz_metadata_arg[] = '<meta property="og:type" content="' . $ktz_meta_type . '" />';
	$ktz_metadata_arg[] = '<meta property="og:site_name" content="'. get_bloginfo('name') . '" />';
	$ktz_metadata_arg[] = '<meta property="og:title" content="' . $ktz_meta_title . '" />';
	$ktz_metadata_arg[] = '<meta property="og:description" content="' . $ktz_meta_desc . '" />';
	$ktz_metadata_arg[] = '<meta property="og:image" content="' . $ktz_meta_image . '" />';
	$ktz_metadata_arg[] = '<meta property="fb:app_id" content="' . ot_get_option('ktz_facebook_app_id') . '" />'; 
	$ktz_metadata_arg[] = '';
	/*
	* Link rel head HTML functions 
	*/
	if(ot_get_option('ktz_favicon') != '') {
		$ktz_metadata_arg[] = '<link rel="shortcut icon" href="'. ot_get_option('ktz_favicon') .' " />';
		}
	$ktz_metadata_arg[] = '<link rel="profile" href="//gmpg.org/xfn/11" />';
	$ktz_metadata_arg[] = '<link rel="pingback" href="' . get_bloginfo('pingback_url') . '" />';
	if (ot_get_option('ktz_gplus_sn') != '') { 
		$ktz_metadata_arg[] = '<link rel="author" href="' . ot_get_option('ktz_gplus_sn') . '" />'; 
		} 
	echo implode("\n", $ktz_metadata_arg);
	}
add_action( 'wp_head', 'ktz_headelement', 9 );	
} 

/*
* Add SEO dynamic title
*/
function ktz_dynamic_title($title, $sep) {
	global $paged, $page;
	if ( is_feed() ) {
		return $title;
	}
	// Add the site name.
	$title .= get_bloginfo( 'name' );
	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title = "$title $sep $site_description";
	}
	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 ) {
		$title = "$title $sep " . sprintf( __( 'Page %s', 'ktz_theme_textdomain' ), max( $paged, $page ) );
	}
	return $title;
}
add_filter( 'wp_title', 'ktz_dynamic_title', 10, 2 );

/*
* Search hook in header
*/
if( !function_exists('ktz_topsearch')) {
	function ktz_topsearch() {
	$search_text = empty($_GET['s']) ? "Search" : get_search_query();
	echo '<div class="widget_search ktz-topsearch">';
	echo '<form role="search" method="get" id="searchform" class="searchform" action="' . esc_url( home_url( '' ) ) . '">';
	echo '<div>';
	echo '<input value="" name="s" id="s" type="text" placeholder="' . __( 'Search and enter','ktz_theme_textdomain' ) . '">';
	echo '<input id="searchsubmit" value="Search" type="submit">';
	echo '</div>';
	echo '</form>';
	echo '</div>';
	}
add_action( 'ktz_topsearch', 'ktz_topsearch' );
}