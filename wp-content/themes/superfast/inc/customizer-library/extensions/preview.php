<?php
/**
 * Customizer Utility Functions
 *
 * @package 	Customizer_Library
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 *
 * @since v.1.0.0
 */
function customizer_library_customize_preview_js() {

	$path = str_replace( wp_normalize_path( WP_CONTENT_DIR ), WP_CONTENT_URL, wp_normalize_path( dirname( dirname( __FILE__ ) ) ) );

	wp_enqueue_script( 'customizer_library_customizer', $path . '/js/customizer.js', array( 'customize-preview' ), '1.0.0', true );

}
add_action( 'customize_preview_init', 'customizer_library_customize_preview_js' );

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @since v.1.0.0
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function customizer_library_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';
}
add_action( 'customize_register', 'customizer_library_customize_register' );
