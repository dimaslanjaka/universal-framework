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

/* 
* If page/post does not exist then this function call
*/
if ( ! function_exists( 'ktz_post_notfound' ) ) :
function ktz_post_notfound() { ?>
	<article id="post-0" class="post no-results not-found">
		<header class="entry-header">
			<h3><?php _e( 'Nothing Found', 'ktz_theme_textdomain' ); ?></h3>
		</header>
			<div class="entry-content">
			<p><?php _e( 'Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post.', 'ktz_theme_textdomain' ); ?></p>
				<div class="widget_search">
					<?php get_search_form(); ?>
				</div>
			</div>
	</article>
	<?php }
add_action( 'ktz_post_notfound', 'ktz_post_notfound'); 	
endif;