<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

function shapely_allow_skype_protocol( $protocols ) {
	$protocols[] = 'skype';

	return $protocols;
}

add_filter( 'kses_allowed_protocols', 'shapely_allow_skype_protocol' );

/* Social Fields in Author Profile */
function shapely_author_social_links( $contactmethods ) {
	// Add Twitter
	$contactmethods['twitter'] = 'Twitter';
	//add Facebook
	$contactmethods['facebook'] = 'Facebook';
	//add Github
	$contactmethods['github'] = 'Github';
	//add Dribble
	$contactmethods['dribble'] = 'Dribble';
	//add Vimeo
	$contactmethods['vimeo'] = 'Vimeo';

	return $contactmethods;
}
add_filter( 'user_contactmethods', 'shapely_author_social_links', 10, 1 );

add_action( 'wp_ajax_shapely_get_attachment_image', 'shapely_get_attachment_image' );
add_action( 'wp_ajax_nopriv_shapely_get_attachment_image', 'shapely_get_attachment_image' );

function shapely_get_attachment_image() {
	$id  = intval( $_POST['attachment_id'] );
	$src = wp_get_attachment_image_src( $id, 'full', false );

	if ( ! empty( $src[0] ) ) {
		echo esc_url( $src[0] );
	}

	die();
}

add_action( 'wp_ajax_shapely_get_attachment_media', 'shapely_get_attachment_media' );
add_action( 'wp_ajax_nopriv_shapely_get_attachment_media', 'shapely_get_attachment_media' );

function shapely_get_attachment_media() {
	$id  = intval( $_POST['attachment_id'] );
	$src = wp_get_attachment_image_src( $id, 'full', false );

	if ( ! empty( $src[0] ) ) {
		echo esc_url( $src[0] );
		die();
	}

	$src = wp_get_attachment_url( $id );
	if ( ! empty( $src ) ) {
		echo esc_url( $src );
	}

	die();
}
