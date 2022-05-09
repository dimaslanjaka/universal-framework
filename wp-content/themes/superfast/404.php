<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();
	
// Sidebar layout options via customizer
$sidebar_layout = get_theme_mod( 'gmr_blog_sidebar', 'sidebar' );

if ( $sidebar_layout == 'fullwidth' ) {
	$class_sidebar = ' col-md-12';
	
} else {
	$class_sidebar = ' col-md-8';
	
}
	
?>

<div id="primary" class="content-area<?php echo esc_attr($class_sidebar); ?>">

	<main id="main" class="site-main" role="main">
	
		<section class="gmr-box-content error-404 not-found">

			<header class="entry-header">
				<h1 class="page-title screen-reader-text"><?php esc_html_e( 'Error 404', 'superfast' ); ?></h1>
				<h2 class="page-title" <?php superfast_itemprop_schema( 'headline' ); ?>><?php esc_html_e( 'Nothing Found', 'superfast' ); ?></h2>
			</header><!-- .entry-header -->

			<div class="page-content" <?php superfast_itemprop_schema( 'text' ); ?>>
				<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'superfast' ); ?></p>

				<?php get_search_form(); ?>

			</div><!-- .page-content -->
			
		</section><!-- .error-404 -->

	</main><!-- #main -->
	
</div><!-- #primary -->

<?php 
if ( $sidebar_layout == 'sidebar' ) {
	get_sidebar(); 
}

get_footer();