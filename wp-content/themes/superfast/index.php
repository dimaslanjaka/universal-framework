<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();
	
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

	<main id="main" class="site-main" role="main">

	<?php
	if ( have_posts() ) :

		if ( is_home() && ! is_front_page() ) : ?>
			<header>
				<h1 class="page-title screen-reader-text" <?php echo superfast_itemprop_schema( 'headline' ); ?>><?php single_post_title(); ?></h1>
			</header>
		<?php
		endif;
		
		if ( is_front_page() && is_home() ) : ?>
			<header>
				<h1 class="page-title screen-reader-text"><?php bloginfo( 'name' ); ?></h1>
			</header>
		<?php
		endif;
		
		if ( $blog_layout == 'gmr-masonry' ) {
			echo '<div class="row masonry-container">';
		}
		
		/* Start the Loop */
		while ( have_posts() ) : the_post();
			
			/*
			 * Include the Post-Format-specific template for the content.
			 * If you want to override this in a child theme, then include a file
			 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
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