<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! function_exists( 'gmr_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time and author.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function gmr_posted_on() {
		$time_string = '<time class="entry-date published updated" ' . superfast_itemprop_schema( 'dateModified' ) . ' datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" ' . superfast_itemprop_schema( 'datePublished' ) . ' datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf( $time_string,
			esc_attr( get_the_date( 'c' ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( 'c' ) ),
			esc_html( get_the_modified_date() )
		);

		$posted_on = sprintf( esc_html_x( 'Posted on %s', 'post date', 'superfast' ), $time_string );

		$posted_by = sprintf(
			esc_html_x( 'By %s', 'post author', 'superfast' ),
			'<span class="entry-author vcard" ' . superfast_itemprop_schema( 'author' ) . ' ' . superfast_itemtype_schema( 'person' ) . '><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '" title="' . __( 'Permalink to: ','superfast' ) . esc_html( get_the_author() ) . '" ' . superfast_itemprop_schema( 'url' ) . '><span ' . superfast_itemprop_schema( 'name' ) . '>' . esc_html( get_the_author() ) . '</span></a></span>'
		);
		if ( is_single() ) :
			echo '<span class="byline"> ' . $posted_by . '</span><span class="posted-on">' . $posted_on . '</span>'; // WPCS: XSS OK.
		else :
			echo '<div class="gmr-metacontent"><span class="byline"> ' . $posted_by . '</span><span class="posted-on">' . $posted_on . '</span></div>'; // WPCS: XSS OK.
		endif;
	}
endif; // endif gmr_posted_on

if ( ! function_exists( 'gmr_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function gmr_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'superfast' ) );
			if ( $categories_list && gmr_categorized_blog() ) {
				printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'superfast' ) . '</span>', $categories_list ); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html__( ', ', 'superfast' ) );
			if ( $tags_list ) {
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'superfast' ) . '</span>', $tags_list ); // WPCS: XSS OK.
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			/* translators: %s: post title */
			comments_popup_link( sprintf( wp_kses( __( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'superfast' ), array( 'span' => array( 'class' => array() ) ) ), get_the_title() ) );
			echo '</span>';
		}

		edit_post_link(
			sprintf(
				/* translators: %s: Name of current post */
				esc_html__( 'Edit %s', 'superfast' ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
endif; // endif gmr_entry_footer

if ( ! function_exists( 'gmr_categorized_blog' ) ) :
	/**
	 * Returns true if a blog has more than 1 category.
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	function gmr_categorized_blog() {
		if ( false === ( $all_the_cool_cats = get_transient( 'superfast_categories' ) ) ) {
			// Create an array of all the categories that are attached to posts.
			$all_the_cool_cats = get_categories( array(
				'fields'     => 'ids',
				'hide_empty' => 1,
				// We only need to know if there is more than one category.
				'number'     => 2,
			) );

			// Count the number of categories that are attached to the posts.
			$all_the_cool_cats = count( $all_the_cool_cats );

			set_transient( 'superfast_categories', $all_the_cool_cats );
		}

		if ( $all_the_cool_cats > 1 ) {
			// This blog has more than 1 category so gmr_categorized_blog should return true.
			return true;
		} else {
			// This blog has only 1 category so gmr_categorized_blog should return false.
			return false;
		}
	}
endif; // endif gmr_categorized_blog

if ( ! function_exists( 'gmr_category_transient_flusher' ) ) :
	/**
	 * Flush out the transients used in gmr_categorized_blog.
	 *
	 * @since 1.0.0
	 */
	function gmr_category_transient_flusher() {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		// Like, beat it. Dig?
		delete_transient( 'superfast_categories' );
	}
endif; // endif gmr_category_transient_flusher
add_action( 'edit_category', 'gmr_category_transient_flusher' );
add_action( 'save_post',     'gmr_category_transient_flusher' );

if ( ! function_exists( 'gmr_custom_excerpt_length' ) ) :
	/**
	 * Filter the except length to 20 characters.
	 *
	 * @since 1.0.0
	 *
	 * @param int $length Excerpt length.
	 * @return int (Maybe) modified excerpt length.
	 */
	function gmr_custom_excerpt_length( $length ) {
		  $length = get_theme_mod('gmr_excerpt_number', '20');
		  // absint sanitize int non minus
		  return absint($length);
	}
endif; // endif gmr_custom_excerpt_length
add_filter( 'excerpt_length', 'gmr_custom_excerpt_length', 999 );

if ( ! function_exists( 'gmr_custom_readmore' ) ) :
	/**
	 * Filter the except length to 20 characters.
	 *
	 * @since 1.0.0
	 *
	 * @param string $more
	 * @return string read more.
	 */
	function gmr_custom_readmore( $more ) {
		$more = get_theme_mod('gmr_read_more');
		if ($more == '') {
			return '&nbsp;[&hellip;]';
		} else {
			return ' <a class="read-more" href="' . get_permalink( get_the_ID() ) . '" title="' .get_the_title( get_the_ID() ). '" ' . superfast_itemprop_schema( 'url' ) . '>' . esc_html( $more ) . '</a>';
		}
	}
endif; // endif gmr_custom_readmore
add_filter( 'excerpt_more', 'gmr_custom_readmore' );

if ( ! function_exists( 'gmr_get_pagination' ) ) :
	/**
	 * Retrieve paginated link for archive post pages.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	function gmr_get_pagination(){
		global $wp_rewrite;
		global $wp_query;
		return paginate_links( apply_filters('gmr_get_pagination_args', array(
			'base'      => str_replace('99999', '%#%', esc_url(get_pagenum_link(99999))),
			'format'    => $wp_rewrite->using_permalinks() ? 'page/%#%' : '?paged=%#%',
			'current'   => max(1, get_query_var('paged')),
			'total'     => $wp_query->max_num_pages,
			'prev_text' => '<span class="gmr-icon arrow_carrot-2left"></span>',
			'next_text' => '<span class="gmr-icon arrow_carrot-2right"></span>',
			'type'      => 'list'
		)));
	}
endif; // endif gmr_get_pagination

if ( !function_exists( 'gmr_nav_wrap' ) ) :
	/**
	 * This function add search button in menu.
	 *
	 * @since 1.0.0
	 *
	 * @param string $items 
	 * @param array $args
	 * @param bool $ajax default false
	 * @return string
	 */
	function gmr_nav_wrap( $items, $args, $ajax = false ) {
		
		// Option remove search button
		$setting = 'gmr_active-searchbutton';
		$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
		
		// Primary Navigation Area Only
		if ( ( isset( $ajax ) && $ajax ) || ( property_exists( $args, 'theme_location' ) && $args->theme_location === 'primary' && $mod === 0 ) ) {

			$css_class = 'menu-item menu-item-type-search-btn gmr-search';
			$items .= '<li class="' . esc_attr( $css_class ) . '">';
				$items .= '<form method="get" class="gmr-searchform searchform" action="' . esc_url( home_url( '/' ) ) . '">'; 
					$items .= '<input type="text" name="s" id="s" placeholder="' . __( 'Search', 'superfast' ) . '" />';
					$items .= '<div class="search-trigger">';
						$items .= '<a href="#" class="gmr-icon icon_close" ' . superfast_itemprop_schema( 'url' ) . '>';
						$items .= '</a>';
						$items .= '<a href="#" class="gmr-icon icon_search">';
						$items .= '</a>';
					$items .= '</div>';
				$items .= '</form>';
			$items .= '</li>';
		}
		return apply_filters('gmr_nav_wrap_filter', $items);
	}
endif; // endif gmr_nav_wrap
add_filter( 'wp_nav_menu_items', 'gmr_nav_wrap', 15, 2 );

if ( !function_exists( 'gmr_nav_mobile_close' ) ) :
	/**
	 * This function add close button in mobile menu.
	 *
	 * @since 1.0.0
	 *
	 * @param string $items 
	 * @param array $args
	 * @param bool $ajax default false
	 * @return string
	 */
	function gmr_nav_mobile_close( $items, $args, $ajax = false ) {
		
		// Primary Navigation Area Only
		if ( ( isset( $ajax ) && $ajax ) || ( property_exists( $args, 'theme_location' ) && $args->theme_location === 'primary' ) ) {
			$css_class = 'menu-item menu-item-type-close-btn gmr-close-btn';
			$items .= '<li class="' . esc_attr( $css_class ) . '">';
				$items .= '<a id="close-menu-button" ' . superfast_itemprop_schema( 'url' ) . ' href="#">'; 
				$items .= __( 'Close Menu', 'superfast' ); 
				$items .= '</a>';
			$items .= '</li>';
		}
		return apply_filters('gmr_nav_close_mobile_filter', $items);
	}
endif; // endif gmr_nav_mobile_close
add_filter( 'wp_nav_menu_items', 'gmr_nav_mobile_close', 20, 2 );

if ( !function_exists( 'superfast_add_menu_attribute' ) ) :
	/**
	 * Add attribute itemprop="url" to menu link
	 *
	 * @since 1.0.0
	 *
	 * @param string $atts
	 * @param string $item
	 * @param array $args
	 * @return string
	 */
	function superfast_add_menu_attribute( $atts, $item, $args ) {
	  $atts['itemprop'] = 'url';
	  return $atts;
	}
endif; // endif superfast_add_menu_attribute
add_filter( 'nav_menu_link_attributes', 'superfast_add_menu_attribute', 10, 3 );

if ( ! function_exists( 'gmr_the_custom_logo' ) ) :
	/**
	 * Print custom logo.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function gmr_the_custom_logo() {
		echo '<div class="gmr-logo">';
		// if get value from customizer gmr_logoimage
		$setting = 'gmr_logoimage';
		$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
		
		if ( $mod ) {
			// get url image from value gmr_logoimage
			$image = esc_url_raw ( $mod );
			echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="custom-logo-link" ' . superfast_itemprop_schema( 'url' ) . ' title="' . get_bloginfo( 'name' ) . '">';
					echo '<img src="' . $image . '" alt="' . get_bloginfo( 'name' ) . '" title="' . get_bloginfo( 'name' ) . '" ' . superfast_itemprop_schema( 'image' ) . ' />';
			echo '</a>';

		} else {
			// if get value from customizer blogname
			if ( get_theme_mod( 'blogname', get_bloginfo( 'name' ) ) ) {
				echo '<div class="site-title" ' . superfast_itemprop_schema( 'headline' ) . '>';
					echo '<a href="' . esc_url( home_url( '/' ) ) . '" ' . superfast_itemprop_schema( 'url' ) . ' title="' . get_theme_mod( 'blogname', get_bloginfo( 'name' ) ) . '">'; 
					echo get_theme_mod( 'blogname', get_bloginfo('name') );
					echo '</a>';
				echo '</div>';
				
			}
			// if get value from customizer blogdescription
			if ( get_theme_mod( 'blogdescription', get_bloginfo( 'description' ) ) ) {
				echo '<span class="site-description" ' . superfast_itemprop_schema( 'description' ) . '>'; 
					echo get_theme_mod( 'blogdescription', get_bloginfo( 'description' ) );
				echo '</span>';
				
			}
		}
		echo '</div>';
	}
endif; // endif gmr_the_custom_logo
add_action( 'gmr_the_custom_logo', 'gmr_the_custom_logo', 5 );

if ( ! function_exists( 'gmr_move_post_navigation' ) ) :
	/**
	 * Move post navigation in top after content.
	 *
	 * @since 1.0.0
	 *
	 * @return string $content
	 */
	function gmr_move_post_navigation( $content ) {
		if ( is_singular() && in_the_loop() ) {
			$pagination = wp_link_pages( array(
						'before' => '<div class="page-links"><span class="page-text">' . esc_html__( 'Pages:', 'superfast' ) . '</span>',
						'after'  => '</div>',
						'link_before' => '<span class="page-link-number">', 
						'link_after' => '</span>',
						'echo'        => 0,
					) );
			$content .= $pagination;
			return $content;
		}
		return $content;
	}
endif; // endif gmr_move_post_navigation
add_filter( 'the_content', 'gmr_move_post_navigation', 1 );

if ( ! function_exists( 'gmr_embed_oembed_html' ) ) :
/**
 * Add responsive oembed class.
 * @add_filter embed_oembed_html
 * @class ktz-videowrapper
 * @link https://developer.wordpress.org/reference/hooks/embed_oembed_html/
 */
function gmr_embed_oembed_html($html, $url, $attr, $post_id) {
	return '<div class="gmr-embed-responsive gmr-embed-responsive-16by9">' . $html . '</div>';
}
endif; // endif gmr_embed_oembed_html
add_filter('embed_oembed_html', 'gmr_embed_oembed_html', 99, 4);

if ( ! function_exists( 'superfast_prepend_attachment' ) ) :
	/**
	 * Callback for WordPress 'prepend_attachment' filter.
	 * 
	 * Change the attachment page image size to 'large'
	 * 
	 * @package WordPress
	 * @category Attachment
	 * @see wp-includes/post-template.php
	 * 
	 * @param string $attachment_content the attachment html
	 * @return string $attachment_content the attachment html
	 */
	function superfast_prepend_attachment( $attachment_content ){
			
			// set the attachment image size to 'large'
			$attachment_content = sprintf( '<p class="img-center">%s</p>', wp_get_attachment_link(0, 'full', false) );
			
			// return the attachment content
			return $attachment_content;
			
	}
endif; // endif superfast_prepend_attachment
add_filter( 'prepend_attachment', 'superfast_prepend_attachment' );