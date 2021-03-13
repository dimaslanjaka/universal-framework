<?php
/**
 * KENTOOZ DEFAULD POST TEMPLATE
**/
?>
<article id="post-<?php the_ID(); ?>" <?php post_class('box-post ktz-archive'); ?>>
	<div class="entry-body media ktz-miniblog">
		<?php 	
		$thumb = get_post_thumbnail_id();
		$img_url = wp_get_attachment_url( $thumb,'full' ); 
		$fisrtimg_url = get_first_image_src(); 
		$get_imgpost_upload = ktz_getpost_images_upload();
		if ( $img_url || $fisrtimg_url || $get_imgpost_upload )  { 
			echo '<div class="ktz-thumbwrap">';
			echo ktz_featured_img( 60, 60 ); // New kentooz image croping just call ktz_featured_img( width, height )
			echo '<span class="fontawesome ktzfo-caret-right"></span>';
			echo '</div>';
		}
		?>
	
	<div class="media-body ktz-post">
	<h2 class="entry-title ktz-titlemini"><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title() ?></a></h2>
		<div style="display:none;">
				<?php do_action( 'ktz_author_by' ); // function in _loop_ktz.php ?>
				<?php do_action( 'ktz_posted_on' ); // function in _loop_ktz.php ?>
		</div>
		<div>
			<?php 
				do_action( 'ktz_content' ); // function in _loop_ktz.php
				do_action( 'ktz_link_pages' ); // function in _navigation_ktz.php
			?>
		</div>
	
	</div>
	</div>

</article><!-- #post-<?php the_ID(); ?> -->