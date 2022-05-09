<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
 
// Disable thumbnail options via customizer
$thumbnail = get_theme_mod( 'gmr_active-singlethumb', 0 );

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> <?php echo superfast_itemtype_schema( 'CreativeWork' ); ?>>

	<div class="gmr-box-content gmr-single">
	
	<?php
	if ( $thumbnail === 0 ) :
		if ( has_post_thumbnail() ) { ?>
			<figure class="wp-caption alignnone">
				<?php the_post_thumbnail(); ?>
				
				<?php if ( $caption = get_post( get_post_thumbnail_id() )->post_excerpt ) : ?>
					<figcaption class="wp-caption-text"><?php echo $caption; ?></figcaption>
				<?php endif; ?>
			</figure>	
		<?php 
		}
	endif; // endif; $thumbnail	
	?>
	
		<header class="entry-header">
			<?php the_title( '<h1 class="entry-title" ' . superfast_itemprop_schema( 'headline' ) . '>', '</h1>' ); ?>
			<?php gmr_posted_on(); ?>
		</header><!-- .entry-header -->

		<div class="entry-content entry-content-single" <?php echo superfast_itemprop_schema( 'text' ); ?>>
			<?php
				the_content();
			?>
		</div><!-- .entry-content -->
		
		<footer class="entry-footer">
			<?php gmr_entry_footer(); ?>
			<?php the_post_navigation(array(
					'prev_text'                  => __( '<span>Previous post</span> %title', 'superfast' ),
					'next_text'                  => __( '<span>Next post</span> %title', 'superfast' )
				 ) ); ?>
		</footer><!-- .entry-footer -->
		
	</div><!-- .gmr-box-content -->
	
	<?php do_action( 'idblog_core_author_box' ); ?>

</article><!-- #post-## -->