<?php
/**
 * The template for displaying all single elementor library.
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div class="site inner-wrap" id="site-container">
	
	<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'superfast' ); ?></a>

	<div id="primary" class="fullwidth">
		<main id="main" class="site-main entry-content-page" role="main">

			<?php 
				while ( have_posts() ) : the_post();
					the_content();
				endwhile; 
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

</div><!-- .site-container -->

<?php wp_footer(); ?>

</body>
</html>