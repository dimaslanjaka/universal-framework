<?php 
/**
 * Template Name: Squeeze
*/ 
get_header('squeeze'); ?>
	<section class="col-md-12">
		<div class="row">
		<?php while ( have_posts() ) : the_post(); 
		get_template_part( 'content', 'pagesqueeze' ); 
		endwhile; ?>
		</div>
	</section>
<?php get_footer('squeeze'); ?>
