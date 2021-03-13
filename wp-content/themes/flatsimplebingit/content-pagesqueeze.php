<?php
/**
 * KENTOOZ PAGE LOOP TEMPLATE
**/
?>
<article id="post-<?php the_ID(); ?>" <?php post_class('ktz-pagesqueeze'); ?>>
		<h1 class="entry-title page-title clearfix" style="display:none;"><span><?php echo get_the_title('',true); ?></span></h1>
		<div style="display:none;">
				<?php do_action( 'ktz_author_by' ); // function in _loop_ktz.php ?>
				<?php do_action( 'ktz_posted_on' ); // function in _loop_ktz.php ?>
		</div>
		<div class="entry-body">
			<?php the_content(); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'ktz_theme_textdomain' ) . '</span>', 'after' => '</div>' ) ); ?>
		</div>
</article><!-- #post-<?php the_ID(); ?> -->
