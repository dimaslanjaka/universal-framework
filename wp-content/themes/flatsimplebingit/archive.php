<?php 
/**
 * KENTOOZ ARCHIVE TEMPLATE
**/
get_header(); ?>

	<section class="col-md-12">
		<section id="ktz-infinitescroll-jetpack" class="new-content">
		<div class="ktz-titlepage"><h1><?php 
			if ( is_category() ) {
				printf( '<span class="ktz-blocktitle">' . __( 'Category: %s', 'ktz_theme_textdomain' ), single_cat_title( '', false ) . '</span>' );
			} elseif ( is_tag() ) {
				printf( '<span class="ktz-blocktitle">' . __( 'Tag: %s', 'ktz_theme_textdomain' ), single_tag_title( '', false ) . '</span>' );
			} elseif ( is_day() ) {
				printf( '<span class="ktz-blocktitle">' . __( 'Daily: %s', 'ktz_theme_textdomain' ), get_the_date() . '</span>' );
			} elseif ( is_month() ) {
				printf( '<span class="ktz-blocktitle">' . __( 'Monthly: %s', 'ktz_theme_textdomain' ), get_the_date( 'F Y' ) . '</span>' );
			} elseif ( is_year() ) {
				printf( '<span class="ktz-blocktitle">' . __( 'Yearly: %s', 'ktz_theme_textdomain' ), get_the_date( 'Y' ) . '</span>' );
			} else {
				_e( 'Archives', 'ktz_theme_textdomain' );
			} 
		?></h1>
		<?php echo category_description(); ?>
		</div>
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
