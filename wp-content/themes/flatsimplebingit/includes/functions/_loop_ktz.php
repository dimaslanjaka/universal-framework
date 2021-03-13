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

if ( !function_exists('ktz_posted_title_h') ) :
function ktz_posted_title_h($hfont,$classes) {
	global $post;
	$ktz_link_pf = get_post_custom_values( 'ktz_link_postformat', $post->ID );
	if ( $ktz_link_pf && has_post_format('link') ) {
	printf( __( '<%4$s class="%5$s"><a href="%1$s" title="External link to %2$s" rel="nofollow" target="_blank"><span class="glyphicon glyphicon-link"></span> %3$s</a></%4$s>', 'ktz_theme_textdomain' ),
		esc_url($ktz_link_pf[0]),
		esc_url($ktz_link_pf[0]),
		esc_attr(get_the_title()),
		$hfont,
		$classes
		);
	} else {
	printf( __( '<%4$s class="%5$s"><a href="%1$s" title="Permalink to %2$s" rel="bookmark">%3$s</a></%4$s>', 'ktz_theme_textdomain' ),
		esc_url(get_permalink()),
		esc_attr(get_the_title()),
		esc_attr(get_the_title()),
		$hfont,
		$classes
		);
	}
}
endif;

if ( !function_exists('ktz_posted_title_nonlink_h') ) :
function ktz_posted_title_nonlink_h($hfont,$classes) {
	global $post;
	$ktz_link_pf = get_post_custom_values( 'ktz_link_postformat', $post->ID );
	if ( $ktz_link_pf && has_post_format('link') ) {
	printf( __( '<%4$s class="%5$s"><span class="glyphicon glyphicon-link"></span> %3$s</%4$s>', 'ktz_theme_textdomain' ),
		esc_url($ktz_link_pf[0]),
		esc_url($ktz_link_pf[0]),
		esc_attr(get_the_title()),
		$hfont,
		$classes
		);
	} else {
	printf( __( '<%4$s class="%5$s">%3$s</%4$s>', 'ktz_theme_textdomain' ),
		esc_url(get_permalink()),
		esc_attr(get_the_title()),
		esc_attr(get_the_title()),
		$hfont,
		$classes
		);
	}
}
endif;

/*
* Add post title
* Use echo ktz_posted_title_a(); for ktz_posted_title_a()
*/
if ( !function_exists('ktz_posted_title_a') ) :
function ktz_posted_title_a() {
	global $post;
	// post format link
	$ktz_link_pf = get_post_custom_values( 'ktz_link_postformat', $post->ID );
	if ( $ktz_link_pf && has_post_format('link') ) {
	printf( __( '<a href="%1$s" title="External link to %2$s" rel="nofollow" target="_blank"><span class="glyphicon glyphicon-link"></span> %3$s</a>', 'ktz_theme_textdomain' ),
		esc_url($ktz_link_pf[0]),
		esc_url($ktz_link_pf[0]),
		esc_attr(get_the_title())
		);
	} else {
	// standard post format
	printf( __( '<a href="%1$s" title="Permalink to %2$s" rel="bookmark">%3$s</a>', 'ktz_theme_textdomain' ),
		esc_url(get_permalink()),
		esc_attr(get_the_title()),
		esc_attr(get_the_title())
		);
	}
}
endif;

/*
* For limit title if use limit title ~ post
* Use ktz_limittitle('', '...', true, '25');
*/
function ktz_limittitle($before = '', $after = '', $echo = true, $length = false) { 
	$title = get_the_title();
	if ( $length && is_numeric($length) ) {
		$title = substr( $title, 0, $length );
	}
	if ( strlen($title)> 0 ) {
		$title = apply_filters('ktz_limittitle', $before . $title . $after, $before, $after);
		if ( $echo )
			echo $title;
		else
			return $title;
	}
}

/**
* Add date on hook system ~ post
*/

if ( !function_exists('ktz_posted_on') ) :
function ktz_posted_on() {
	printf( __( '<span class="entry-date updated">On <a href="%1$s" title="%2$s" rel="bookmark"><time datetime="%3$s" pubdate>%4$s</time></a></span>', 'ktz_theme_textdomain' ),
		esc_url( get_permalink() ),
		esc_attr( get_the_time() ),
		esc_attr( get_the_date( 'c' ) ),
		esc_attr( get_the_date() )
	);
}
add_action( 'ktz_posted_on', 'ktz_posted_on' );
endif;
if ( !function_exists('ktz_posted_on_nonsnippet') ) :
function ktz_posted_on_nonsnippet() {
	printf( __( '<span class="entry-date">On <a href="%1$s" title="%2$s" rel="bookmark"><time datetime="%3$s" pubdate>%4$s</time></a></span>', 'ktz_theme_textdomain' ),
		esc_url( get_permalink() ),
		esc_attr( get_the_time() ),
		esc_attr( get_the_date( 'c' ) ),
		esc_attr( get_the_date() )
	);
}
endif;

/*
* Add author on hook system ~ post
*/
if ( !function_exists('ktz_author_by') ) :
function ktz_author_by() {
	printf( __( '<span class="entry-author vcard">By <a class="url fn" href="%1$s" title="%2$s" rel="author">%3$s</a></span>', 'ktz_theme_textdomain' ),
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_attr( sprintf( __( 'View all posts by %s', 'ktz_theme_textdomain' ), get_the_author() ) ),
		get_the_author()
	);
}
add_action( 'ktz_author_by', 'ktz_author_by' );
endif;

if ( !function_exists('ktz_author_by_nonsnippet') ) :
function ktz_author_by_nonsnippet() {
	printf( __( '<span class="entry-author">By <a href="%1$s" title="%2$s">%3$s</a></span>', 'ktz_theme_textdomain' ),
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_attr( sprintf( __( 'View all posts by %s', 'ktz_theme_textdomain' ), get_the_author() ) ),
		get_the_author()
	);
}
endif;

/*
* Add categories on hook system ~ post
*/
if ( !function_exists('ktz_categories') ) :
function ktz_categories() { 
	global $post;
		$categories_list = get_the_category_list( __( ', ','ktz_theme_textdomain' ) );
		if ( $categories_list ):
		printf( __( '<span class="ktz-categories">In %2$s</span>','ktz_theme_textdomain' ), 'entry-utility-prep entry-utility-prep-cat-links', $categories_list );
		endif; 
}
endif;

/*
* Add comment number on hook system ~ post
*/
if ( !function_exists('ktz_comment_num') ) :
function ktz_comment_num() {
	if ( comments_open() && ! post_password_required() ) :
	echo '<span class="entry-comment">';
	comments_popup_link( __( 'No comment', 'ktz_theme_textdomain' ), _x( '1 comment', 'comments number', 'ktz_theme_textdomain' ), _x( '% comments', 'comments number', 'ktz_theme_textdomain' ) );
	echo '</span>';
	endif;
}
endif;

/*
* Add number view on hook system
*/
function ktz_getPostViews($postID){
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
        return '<span class="entry-view">No view</span>';
    }
    return '<span class="entry-view">' . $count . ' views</span>';
}
add_action ('ktz_getPostViews','ktz_getPostViews', 10, 1);

/*******************************************
# Add tags on hook system ~ post
*******************************************/
if ( !function_exists('ktz_tagged') ) :
function ktz_tagged() { 
	$tags_list = get_the_tag_list( '', __( ' ', 'ktz_theme_textdomain' ) );
	if ( $tags_list ):
	printf( __('<div class="tags"><span>Tags:</span> %2$s</div>','ktz_theme_textdomain' ), 'entry-utility-prep entry-utility-prep-tag-links', $tags_list );
	endif;
}
endif;

/*******************************************
# Add auto read more @ kasep theme v.1.01
*******************************************/
function ktz_get_excerpt($limit){
	global $post;
	$title = get_the_title($post->ID);
	$permalink = get_permalink($post->ID);
	$excerpt = explode(' ', get_the_excerpt(), $limit);
	if (count($excerpt)>=$limit) {
		array_pop($excerpt);
		$excerpt = implode(" ",$excerpt);
	} else {
		$excerpt = implode(" ",$excerpt);
	}	
	$excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
	return $excerpt;
}

/*******************************************
# Add auto read more @ kasep theme v.1.01
*******************************************/
function ktz_get_excerpt_nobtn($limit){
	global $post;
	$permalink = get_permalink($post->ID);
	$excerpt = explode(' ', get_the_excerpt(), $limit);
	if (count($excerpt)>=$limit) {
		array_pop($excerpt);
		$excerpt = implode(" ",$excerpt);
	} else {
		$excerpt = implode(" ",$excerpt);
	}	
	$excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
	return $excerpt;
}

/*******************************************
# Add content on hook system ~ post 
# Call autoread @ kasep theme v.1.01
*******************************************/
if ( !function_exists('ktz_content') ) :
function ktz_content() {
		if ( ot_get_option('ktz_active_automore') == 'yes' && !(is_single()) ) // Set active/deactive via admin
			{ 
				$readmore_count = ot_get_option('ktz_automore_count');
				echo ktz_get_excerpt($readmore_count); 
			} // call function auto readmore
		else
			{ 
				the_content(); 
			}
}
add_action( 'ktz_content', 'ktz_content' );	
endif;