<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Widgets
 */
add_action( 'widgets_init', 'shapely_companion_widgets_init' );
function shapely_companion_widgets_init() {

	$widgets = array(
		'categories',
		'home-call-for-action',
		'home-clients',
		'home-features',
		'home-parallax',
		'home-contact',
		'home-portfolio',
		'home-testimonials',
		'recent-posts',
		'social',
		'video',
		'page-content',
		'page-title',
	);

	foreach ( $widgets as $widget ) {
		require_once plugin_dir_path( __FILE__ ) . '/widgets/class-shapely-' . $widget . '.php';
	}

	register_widget( 'Shapely_Recent_Posts' );
	register_widget( 'Shapely_Categories' );
	register_widget( 'Shapely_Home_Parallax' );
	register_widget( 'Shapely_Home_Features' );
	register_widget( 'Shapely_Home_Call_For_Action' );
	register_widget( 'Shapely_Home_Clients' );
	register_widget( 'Shapely_Video' );
	register_widget( 'Shapely_Home_Contact' );
	register_widget( 'Shapely_Social' );
	register_widget( 'Shapely_Page_Title' );
	register_widget( 'Shapely_Page_Content' );

	if ( class_exists( 'Jetpack' ) && Jetpack::is_module_active( 'custom-content-types' ) ) {
		if ( get_option( 'jetpack_portfolio' ) ) {
			register_widget( 'Shapely_Home_Portfolio' );
		}
		if ( get_option( 'jetpack_testimonial' ) ) {
			register_widget( 'Shapely_Home_Testimonials' );
		}
	}
}
