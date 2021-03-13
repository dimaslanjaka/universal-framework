<?php
/*
 * Add amp page reference to all the post/pages
 */
function wpamp_link_rel() {  
	global $post, $wp;
	$page_for_posts = get_option( 'page_for_posts' );
	$frontpage_id = get_option( 'page_on_front' );
	$queried_object = get_queried_object();
	
	if( ( ($page_for_posts == 0 || $page_for_posts == "") && ($frontpage_id == 0 || $frontpage_id == "") ) && is_home() ) {
		//	Home page is the blog page
		$the_permalink = home_url();
	} else if( ($page_for_posts == 0 || $page_for_posts == "") && ($frontpage_id != 0 && $frontpage_id != "") ) {
		//	There is no blog page available in the site
		$the_permalink = get_the_permalink( $post->ID );
	} else if( $queried_object->ID == $page_for_posts ) {
		//	Current page is blog page
		$the_permalink = home_url( add_query_arg( array(), $wp->request ) );
	} else if( is_archive() ) {
		//	if its archive page
		$the_permalink = home_url( add_query_arg( array(), $wp->request ) );
	} else {
		$the_permalink = get_the_permalink( $post->ID );
	}
	
	$the_permalink = rtrim( $the_permalink, '/' ) . '/';
	$perma = strpos( $the_permalink, "?" );
	if ( $perma === false ) {
		$sConnector = "?";
	} else {
		$sConnector = "&";
	}
	echo '<link rel="amphtml" href="' . $the_permalink . $sConnector . AMP_CONSTANT . '" />';
}
add_action( 'wp_head', 'wpamp_link_rel' );
?>