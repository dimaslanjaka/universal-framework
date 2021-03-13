<?php 
/**
 * KENTOOZ PAGE TEMPLATE
*/ 
get_header(); ?>
	<section class="col-md-12">
		<section class="new-content">
		<?php while ( have_posts() ) : the_post(); 
		get_template_part( 'content', 'page' ); 
		endwhile; ?>
		</section>
	</section>
<?php get_footer(); ?>
