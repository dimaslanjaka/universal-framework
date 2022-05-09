<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
 
// Blog layout options via customizer
$blog_layout = get_theme_mod( 'gmr_blog_layout', 'gmr-smallthumb' );

// Disable thumbnail options via customizer
$thumbnail = get_theme_mod( 'gmr_active-blogthumb', 0 );

// Disable page navigation posts in archive options via customizer
$pagenav = get_theme_mod( 'gmr_active-pagenavposts', 0 );

// Blog Content options via customizer
$blog_content = get_theme_mod( 'gmr_blog_content', 'excerpt' );

// Sidebar layout options via customizer
$sidebar_layout = get_theme_mod( 'gmr_blog_sidebar', 'sidebar' );


if ( $blog_layout == 'gmr-masonry' ){
	
	// layout masonry base sidebar options
	if ( $sidebar_layout == 'fullwidth' ) {
		$classes = array(
			'col-md-4',
			'item'
		);
	} else {
		$classes = array(
			'col-md-6',
			'item'
		);
	}
	
} elseif ( $blog_layout == 'gmr-smallthumb' ){
	
	$classes = array(
		'gmr-smallthumb',
		'clearfix'
	);
	
} else {
	
	$classes = array(
		'clearfix'
	);
	
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($classes); ?> <?php echo superfast_itemtype_schema( 'CreativeWork' ); ?>>
	
	<div class="gmr-box-content">
	
			<?php
				// Add thumnail
				if ( $thumbnail === 0 ) :
					if ( has_post_thumbnail() ) :
						echo '<div class="content-thumbnail">';
							echo '<a href="' . get_permalink() . '" itemprop="url" title="' . the_title_attribute( array( 'before' => __( 'Permalink to: ','superfast' ), 'after' => '', 'echo' => false ) ) . '" rel="bookmark">';
								if ( $blog_layout == 'gmr-masonry' ) :
									the_post_thumbnail( array(298, 180, true), array( 'itemprop'=>'image' ) );
									
								elseif ( $blog_layout == 'gmr-smallthumb' ) :
									the_post_thumbnail( 'medium', array( 'itemprop'=>'image' ) );
									
								else : 
									the_post_thumbnail( 'large', array( 'itemprop'=>'image' ) );
									
								endif; // endif; $blog_layout
							echo '</a>';
						echo '</div>';
					else :
						if ( $blog_layout == 'gmr-masonry' ) :
							// do_action( 'funct', $size, $link, $classes = '', $echo = true );
							do_action( 'idblog_core_get_images', 'large', true, 'content-thumbnail' );
							
						elseif ( $blog_layout == 'gmr-smallthumb' ) :
							do_action( 'idblog_core_get_images', 'medium', true, 'content-thumbnail' );
							
						else : 
							do_action( 'idblog_core_get_images', 'large', true, 'content-thumbnail' );
							
						endif; // endif; $blog_layout

					endif; // endif; has_post_thumbnail()
				endif; // endif; $thumbnail
			?>
	
		<div class="item-article">
			<header class="entry-header">
				<h2 class="entry-title" <?php echo superfast_itemprop_schema( 'headline' ); ?>>
					<a href="<?php the_permalink(); ?>" <?php echo superfast_itemprop_schema( 'url' ); ?> title="<?php the_title_attribute( array( 'before' => __( 'Permalink to: ','superfast' ), 'after' => '' ) ); ?>" rel="bookmark"><?php the_title(); ?></a>
				</h2>
				
				<?php

				if ( 'post' === get_post_type() ) : ?>
					<div class="entry-meta">
						<?php gmr_posted_on(); ?>
					</div><!-- .entry-meta -->
				<?php
				endif; // endif; get_post_type() ?>
			</header><!-- .entry-header -->

			<div class="entry-content" <?php echo superfast_itemprop_schema( 'text' ); ?>>
				<?php
				
					if ( $blog_content == 'fullcontent' ) :
						the_content();
					
					else :
						the_excerpt();
					
					endif;
					if ( $pagenav === 0 ) :
						wp_link_pages( array(
							'before' => '<div class="page-links"><span class="page-text">' . esc_html__( 'Pages:', 'superfast' ) . '</span>',
							'after'  => '</div>',
							'link_before' => '<span class="page-link-number">', 
							'link_after' => '</span>'
						) );
					endif;
				?>
			</div><!-- .entry-content -->
		</div><!-- .item-article -->
		
	<?php if ( is_sticky() ) { ?>
		<kbd class="kbd-sticky"><?php esc_html_e( 'Sticky', 'superfast' ); ?></kbd>
	<?php } ?>
		
	</div><!-- .gmr-box-content -->

</article><!-- #post-## -->