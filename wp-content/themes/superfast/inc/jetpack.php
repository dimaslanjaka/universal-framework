<?php
/**
 * Jetpack Compatibility File.
 *
 * @link https://jetpack.com/
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! function_exists( 'gmr_jetpack_setup' ) ) :
	/**
	 * Jetpack setup function.
	 *
	 * @since 1.0.0
	 *
	 * See: https://jetpack.com/support/infinite-scroll/
	 * See: https://jetpack.com/support/responsive-videos/
	 */
	function gmr_jetpack_setup() {
		// Add theme support for Infinite Scroll.
		add_theme_support( 'infinite-scroll', array(
			'container' => 'main',
			'render'    => 'gmr_infinite_scroll_render',
			'footer'    => false,
			'wrapper'   => false
		) );

		// Add theme support for Responsive Videos.
		add_theme_support( 'jetpack-responsive-videos' );
	}
endif; // endif gmr_jetpack_setup
add_action( 'after_setup_theme', 'gmr_jetpack_setup' );

if ( ! function_exists( 'gmr_infinite_scroll_render' ) ) :
	/**
	 * Custom render function for Infinite Scroll.
	 *
	 * @since 1.0.0
	 */
	function gmr_infinite_scroll_render() {
		while ( have_posts() ) {
			the_post();
			get_template_part( 'template-parts/content', get_post_format() );
		}
	}
endif; // endif gmr_infinite_scroll_render

if ( !function_exists( 'gmr_custom_infinite_support' ) ) :
	/**
	 * Support infinite scroll only on post type "post" other post type return false
	 *
	 * @since  1.0.0
	 * 
	 * @return bool
	 */
	function gmr_custom_infinite_support() {
		$supported = current_theme_supports( 'infinite-scroll' ) &&  ( 'post' == get_post_type() );
		 
		return $supported;
	}
endif; // endif gmr_custom_infinite_support
add_filter( 'infinite_scroll_archive_supported', 'gmr_custom_infinite_support' );