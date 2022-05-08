<?php

add_action( 'wp_ajax_wp_auto_spinner_log_clear', 'wp_auto_spinner_log_clear_callback' );

function wp_auto_spinner_log_clear_callback() {
	
	global $wpdb;
	$query="delete from wp_auto_spinner_log";
	$wpdb->query($query);
 
 die();
}

add_action( 'wp_ajax_wp_auto_spinner_queue_clear', 'wp_auto_spinner_queue_clear_callback' );

function wp_auto_spinner_queue_clear_callback() {
	
	global $wpdb;
	$query="delete from {$wpdb->prefix}postmeta where meta_key='wp_auto_spinner_scheduled' ";
	$wpdb->query($query);
 
 die();
}
