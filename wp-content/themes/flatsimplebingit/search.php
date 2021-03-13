<?php 
/**
 * KENTOOZ SEARCH PAGE TEMPLATE
**/
if (isset($_REQUEST['s'])) {
$termstring = urldecode($_REQUEST['s']);
} else {
$termstring = '';}
get_header(); ?>
	<section class="col-md-12">
		<section id="ktz-infinitescroll-jetpack"  class="new-content">
		<div class="ktz-titlepage"><h1><?php printf( '<span class="ktz-blocktitle">' . __( 'Search Results for: %s', 'ktz_theme_textdomain' ), '' . get_search_query() . '</span>' ); ?></h1>		</div>
		<?php if ( have_posts() ) : 
		while ( have_posts() ) : the_post();
			if ( ot_get_option('ktz_content_layout') == 'layout_blog' ) :
			get_template_part( 'content', 'mini' );
			else :
			get_template_part( 'content', get_post_format() );
			endif;
		endwhile; ?>
		<nav id="nav-index">
			<?php do_action( 'ktz_navigation' ); // function in _navigation_ktz.php  ?>
		</nav>
		<?php else : $termstring = $s;
		ktz_get_AGC( $termstring ); 
		endif;
		?>
		</section>
	</section>
<?php get_footer(); ?>
