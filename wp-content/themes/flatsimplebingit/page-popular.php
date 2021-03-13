<?php 
/**
 * Template Name: Popular post by view
*/ 
get_header(); ?>
	<section class="col-md-12">
		<section id="ktz-infinitescroll-jetpack" class="new-content">
		<div class="ktz-titlepage"><h1><?php the_title(); ?></h1></div>
		<?php 
		$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
		global $paged;		
		query_posts(array(
			'post_type' => 'post',
			'meta_key' => 'post_views_count',
			'orderby' => 'meta_value_num',
			'order' => 'desc',
			'post_status' => 'publish',
			'paged' => $paged)); ?>
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
		</div>
	<?php if ( ot_get_option('ktz_sb_layout') == 'right' ) : 
		get_sidebar(); 
		else :
			$ktz_meta_values = get_post_custom($post->ID);
			if ($ktz_meta_values['ktz_meta_layout'][0] == 'right') { 
				get_sidebar(); 
			} else {
				echo '';
			}
		endif; ?>
		</section>
	</section>
<?php get_footer(); ?>
