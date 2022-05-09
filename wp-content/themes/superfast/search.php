<?php
/**
 * The template for displaying search results pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header(); ?>

<?php 
	
// Blog layout options via customizer
$blog_layout = get_theme_mod( 'gmr_blog_layout', 'gmr-default' );

// Sidebar layout options via customizer
$sidebar_layout = get_theme_mod( 'gmr_blog_sidebar', 'sidebar' );

if ( $sidebar_layout == 'fullwidth' ) {
	$class_sidebar = ' col-md-12';
	
} elseif ( $sidebar_layout == 'fullwidth-small' ) {
	$class_sidebar = ' col-md-8 col-md-offset-2';
	
} else {
	$class_sidebar = ' col-md-8';
	
}
	
?>

<div id="primary" class="content-area<?php echo esc_attr($class_sidebar); ?> <?php echo esc_attr($blog_layout); ?>">

	<?php 
		echo '<h1 class="page-title" ' . superfast_itemprop_schema( 'headline' ) . '>';
			echo __('Search Results For: ', 'superfast') . " " . esc_attr( apply_filters('the_search_query', get_search_query(false)) );
		echo '</h1>';
	?>
	
	<main id="main" class="site-main" role="main">

	<?php
	if ( have_posts() ) :
		
		if ( $blog_layout == 'gmr-masonry' ) {
			echo '<div class="row masonry-container">';
		}
		
		/* Start the Loop */
		while ( have_posts() ) : the_post();

			/**
			 * Run the loop for the search to output the results.
			 * If you want to overload this in a child theme then include a file
			 * called content-__.php and that will be used instead.
			 */
			get_template_part( 'template-parts/content', get_post_format() );

		endwhile;
		
		if ( $blog_layout == 'gmr-masonry' ) {
			echo '</div>';
		}

		echo gmr_get_pagination();

	else :

		get_template_part( 'template-parts/content', 'none' );

	endif; ?>

	</main><!-- #main -->
	
</div><!-- #primary -->

<?php 
if ( $sidebar_layout == 'sidebar' ) {
	get_sidebar(); 
}

get_footer();