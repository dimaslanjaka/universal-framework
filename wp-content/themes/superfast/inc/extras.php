<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! function_exists( 'gmr_body_classes' ) ) :
	/**
	 * Adds custom classes to the array of body classes.
	 *
	 * @since 1.0.0
	 *
	 * @param array $classes Classes for the body element.
	 * @return array
	 */
	function gmr_body_classes( $classes ) {
		
		$classes[] = 'gmr-theme';
		
		$sticky_menu = get_theme_mod('gmr_sticky_menu' ,'sticky');
		
		$layout = get_theme_mod('gmr_layout' ,'box-layout');

		if ( $sticky_menu == 'sticky' ) {
			$classes[] = 'gmr-sticky';
		} else {
			$classes[] = 'gmr-no-sticky';
		}
		
		if ( $layout == 'box-layout' ) {
			$classes[] = 'gmr-box-layout';
		} else {
			$classes[] = 'gmr-fullwidth-layout';
		}
		
		// Adds a class of group-blog to blogs with more than 1 published author.
		if ( is_multi_author() ) {
			$classes[] = 'group-blog';
		}

		// Adds a class of hfeed to non-singular pages.
		if ( ! is_singular() ) {
			$classes[] = 'hfeed';
		}

		return $classes;
	}
endif; // endif gmr_body_classes
add_filter( 'body_class', 'gmr_body_classes' );

if ( ! function_exists( 'gmr_pingback_header' ) ) :
	/**
	 * Add a pingback url auto-discovery header for singularly identifiable articles.
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function gmr_pingback_header() {
		if ( is_singular() && pings_open() ) {
			echo '<link rel="pingback" href="', bloginfo( 'pingback_url' ), '">';
		}
	}
endif;
add_action( 'wp_head', 'gmr_pingback_header' );

if ( ! function_exists( 'gmr_add_img_title' ) ) :
	/**
	 * Add a image title tag.
	 * @since 1.0.0
	 *
	 * @return array
	 */
	function gmr_add_img_title( $attr, $attachment = null ) {
		$attr['title'] = trim( strip_tags( $attachment->post_title ) );
		return $attr;
	}
endif;
add_filter( 'wp_get_attachment_image_attributes','gmr_add_img_title', 10, 2 );

if ( ! function_exists( 'gmr_add_title_alt_gravatar' ) ) :
	/**
	 * Add a gravatar title and alt tag.
	 * @since 1.0.0
	 *
	 * @return string
	 */
	function gmr_add_title_alt_gravatar( $text ) {
		$text = str_replace('alt=\'\'', 'alt=\'' . __( 'Gravatar Image', 'superfast' ) . '\' title=\'' . __( 'Gravatar', 'superfast' ) . '\'',$text);
		return $text;
	}
endif;
add_filter('get_avatar','gmr_add_title_alt_gravatar');

if ( ! function_exists( 'gmr_thumbnail_upscale' ) ) :
	/** 
	 * Thumbnail upscale
	 *
	 * @since 1.0.0
	 *
	 * @Source http://wordpress.stackexchange.com/questions/50649/how-to-scale-up-featured-post-thumbnail 
	 * @param array $default, $orig_w, $orig_h, $new_w, $new_h, $crop for image sizes
	 * @return array
	 */ 
	function gmr_thumbnail_upscale( $default, $orig_w, $orig_h, $new_w, $new_h, $crop ) {
		if ( !$crop ) return null; // let the wordpress default function handle this
	 
		$aspect_ratio = $orig_w / $orig_h;
		$size_ratio = max($new_w / $orig_w, $new_h / $orig_h);
	 
		$crop_w = round($new_w / $size_ratio);
		$crop_h = round($new_h / $size_ratio);
	 
		$s_x = floor( ($orig_w - $crop_w) / 2 );
		$s_y = floor( ($orig_h - $crop_h) / 2 );
	 
		return array( 0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h );
	}
endif; // endif gmr_thumbnail_upscale
add_filter( 'image_resize_dimensions', 'gmr_thumbnail_upscale', 10, 6 );

if ( ! function_exists( 'superfast_itemtype_schema' ) ) :
	/** 
	 * Figure out which schema tags to apply to the <article> element
	 * The function determines the itemtype: superfast_itemtype_schema( 'CreativeWork' )
	 * @since 1.0.0
	 * @return void
	 */
	function superfast_itemtype_schema( $type = 'CreativeWork' ) {
		$schema = 'http://schema.org/';
		
		// Get the itemtype
		$itemtype = apply_filters( 'superfast_article_itemtype', $type );
		
		// Print the results
		$scope = 'itemscope="itemscope" itemtype="' . $schema . $itemtype . '"';
		return $scope;
	}
endif;

if ( ! function_exists( 'superfast_itemprop_schema' ) ) :
	/** 
	 * Figure out which schema tags itemprop=""
	 * The function determines the itemprop: superfast_itemprop_schema( 'headline' )
	 * @since 1.0.0
	 * @return void
	 */
	function superfast_itemprop_schema( $type = 'headline' ) {
		// Get the itemprop
		$itemprop = apply_filters( 'superfast_itemprop_filter', $type );
		
		// Print the results
		$scope = 'itemprop="' . $itemprop . '"';
		return $scope;
	}
endif;