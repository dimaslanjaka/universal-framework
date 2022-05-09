<?php
/*
Template Name: Builder
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header(); ?>

	<div id="primary" class="fullwidth">
		<main id="main" class="site-main entry-content-page" role="main">

			<?php 
				while ( have_posts() ) : the_post();
					the_content();
				endwhile; 
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>