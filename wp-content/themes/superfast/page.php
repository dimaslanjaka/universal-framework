<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();
	
// Disable sidebar using metabox
$sidebar_display = get_post_meta( $post->ID, '_gmr_sidebar_key', true ); 

if (!$sidebar_display) :
	$class = ' col-md-8';
else :
	$class = ' col-md-12';
endif;
	
?>

<div id="primary" class="content-area<?php echo esc_attr($class); ?>">

	<main id="main" class="site-main" role="main">

		<?php
		while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content', 'page' );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // End of the loop.
		?>

	</main><!-- #main -->
	
</div><!-- #primary -->

<?php 
if (!$sidebar_display) :	
	get_sidebar(); 
endif;

get_footer();