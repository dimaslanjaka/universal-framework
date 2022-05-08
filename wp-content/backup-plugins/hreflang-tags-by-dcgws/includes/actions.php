<?php
/**
 *
 *  @package HREFLANG Tags Pro\Includes\Actions
 *  @since 1.3.3
 *
 */

if ( ! function_exists( 'add_filter' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

add_action('init', 'hreflang_textdomain');
add_action('admin_init', 'hreflang_register_settings');
add_action('admin_menu', 'hreflang_admin_actions');
add_action('wp_head','add_hreflang_to_head');
add_action( 'save_post', 'hreflang_save_meta_data' );
add_action('add_meta_boxes', 'add_hreflang_meta_box');
add_action('create_term', 'hreflang_save_term_meta_data');
add_action('edit_term', 'hreflang_save_term_meta_data');
add_action( 'admin_enqueue_scripts', 'hreflang_enqueue' );
add_action( 'plugins_loaded', 'hreflang_taxonomy_forms');
add_action( 'admin_init' , 'hreflang_version_fix');
add_action( 'wp_ajax_hreflang_delete_all_data', 'hreflang_delete_all_data' );
add_action( 'wp_ajax_nopriv_hreflang_delete_all_data', 'hreflang_delete_all_data' );
