<?php 
/**
 * KENTOOZ 404 ERROR TEMPLATE
**/
get_header(); ?>	
<section class="col-md-12">
	<div class="error-img">
	<hr class="single" />
	<h3 class="error-title"><span class="glyphicon glyphicon-ban-circle"></span> <?php _e( 'The page you are looking for doesn\'t seem to exist.', 'ktz_theme_textdomain' ); ?></h3>
	<hr class="double" />
	<h4 class="error-title"><?php _e( 'It looks like this was the result of either:', 'ktz_theme_textdomain' ); ?></h4>
	<hr class="double" />
	<?php $ktzrandom = new WP_Query(array( // Use query_post for add pagination in post page
			'orderby' => 'rand',
			'order' => 'desc',
			'posts_per_page' => 4,
			'ignore_sticky_posts' => 1
	)); ?>
	<section class="new-content">
		<?php if ( $ktzrandom->have_posts() ) : while ( $ktzrandom->have_posts() ) : $ktzrandom->the_post();
			get_template_part( 'content', get_post_format() );
		endwhile; ?>
	<?php else : echo 'No post'; endif; ?>
	</section>
	</div>
</section>
<?php get_footer(); ?>