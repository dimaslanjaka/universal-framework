<?php 
/**
 * KENTOOZ INDEX TEMPLATE
**/
get_header(); ?>

	<section class="col-md-12">
		<section id="ktz-infinitescroll-jetpack"  class="new-content">
		<?php if ( have_posts() ) : 
		while ( have_posts() ) : the_post();
			get_template_part( 'content', get_post_format() );
		endwhile; ?>
		<nav id="nav-index">
			<?php 
				do_action( 'ktz_navigation' ); // function in _navigation_ktz.php 
			?>
		</nav>
		<?php 
			else :
				do_action( 'ktz_post_notfound' ); // function in _content_ktz.php
			endif; 
		?>
		</section>
	</section>
<?php get_footer(); ?>
