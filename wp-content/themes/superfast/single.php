<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();
	
// Disable sidebar using metabox
$sidebar_display = get_post_meta( $post->ID, '_gmr_sidebar_key', true ); 

// Sidebar layout options via customizer
$sidebar_layout = get_theme_mod( 'gmr_single_sidebar', 'sidebar' );

if ( $sidebar_layout == 'fullwidth' ) :
	$class = ' col-md-12';
	
elseif ( $sidebar_layout == 'fullwidth-small' ) :
	$class = ' col-md-8 col-md-offset-2';
	
elseif ( $sidebar_display ) :
	$class = ' col-md-12';
	
else :
	$class = ' col-md-8';
	
endif;
	
?>

<div id="primary" class="content-area<?php echo esc_attr($class); ?>">
	
	<main id="main" class="site-main" role="main">

	<?php
	while ( have_posts() ) : the_post();

		get_template_part( 'template-parts/content', 'single' );

		// If comments are open or we have at least one comment, load up the comment template.
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;

	endwhile; // End of the loop.
	?>

	</main><!-- #main -->
	
</div><!-- #primary -->

<?php 
if ( $sidebar_display || $sidebar_layout == 'fullwidth' || $sidebar_layout == 'fullwidth-small' ) :	
else :
	get_sidebar(); 
endif;

get_footer();