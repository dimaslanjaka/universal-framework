<?php
/**
 * KENTOOZ SINGLE POST TEMPLATE
**/
global $post;
?>
<article id="post-<?php the_ID(); ?>" <?php post_class('ktz-single'); ?>>
	<?php ktz_setPostViews(get_the_ID()); //get view for single post ?>
	<div class="ktz-single-box">
	<div class="entry-body">
		<?php
			if ( has_post_format('video') ) {	
				$ktz_social_lock_mt = get_post_custom_values('ktz_activated_locker', $post->ID); 
				$ktz_lock_video = $ktz_social_lock_mt[0];
				if ( ( $ktz_lock_video == 'yes' && ot_get_option('ktz_active_videolocker') == 'no' ) || ot_get_option('ktz_active_videolocker') == 'yes' ) :
					echo '<div class="ktz-all-videowrapper">';
					echo do_shortcode('[viral_lock_button show_facebook="yes" show_twitter="yes" show_gplus="yes" text_locker="You must like first for see video!!"]'.ktz_video_wrapper().'[/viral_lock_button]');
					echo '</div>';
				else :
					do_action( 'ktz_video_wrapper' ); // function in _video_ktz.php
				endif; 
			}		
		?>
		
		<h1 class="entry-title clearfix"><?php the_title(); ?></h1>
		
		<div class="metasingle-aftertitle">
			<div class="ktz-inner-metasingle">
				<?php do_action( 'ktz_author_by' ); // function in _loop_ktz.php ?>
				<?php do_action( 'ktz_posted_on' ); // function in _loop_ktz.php ?>
				<?php echo ktz_categories(); // function in _loop_ktz.php ?>
				<?php echo ktz_getPostViews( $post->ID ); // function in _loop_ktz.php  ?>
				<?php do_action( 'ktz_ajaxstar_SEO_single' ); // function in _rating_ktz.php ?>
				<?php edit_post_link( __( 'Edit', 'ktz_theme_textdomain' ), '<span class="entry-edit"><span class="glyphicon glyphicon-edit"></span> ', '</span>' ); ?>
			</div>
		</div>
		
		<div class="entry-content ktz-wrap-content-single clearfix ktz-post">
		<?php do_action( 'ktz_ban160_topsingle_right' ); // function in _banner_ktz.php ?>	
		
		<?php if ( ot_get_option('ktz_ban160_single_activated') == 'yes' ) : ?>	
		<div class="ktz-content-single">
		<?php endif; ?>
		
		<?php do_action( 'ktz_ban46860_singletit' ); // function in _banner_ktz.php ?>
		
		<?php the_content(); ?>
		
		<?php 
		if (has_post_format('gallery')) {
				do_action( 'ktz_get_gallery_post' ); // function in _slider_ktz.php 
		} 
		?>		
			
		<?php do_action( 'ktz_link_pages' ); // function in _navigation_ktz.php	?>
		
		<?php do_action( 'ktz_get_AGC_single' ); // function in _agc_ktz.php ?>
		
		<?php do_action( 'ktz_ban46860_singlefoot' ); // function in _banner_ktz.php ?>
		
		<?php 
		$posttags = get_the_tags();  
			if ($posttags) {  
				echo '<p class="ktz-tagcontent">Tags: ';
				foreach($posttags as $tag) {  
					echo '<a href="' . get_tag_link($tag->term_id) . '" title="Tag '. $tag->name .'">#';
					echo $tag->name;   
					echo '</a> ';
				}  
				echo '</p>';
			} 
		?>
		
		<?php do_action( 'ktz_share_single' ); // function in _social_ktz.php ?>		
		
		<?php if ( ot_get_option('ktz_ban160_single_activated') == 'yes' ) : ?>	
		</div>
		<?php endif; ?>
		
		<?php do_action( 'ktz_author_box' ); // function in _authorbox_ktz.php ?>
	
		<?php do_action( 'ktz_relpost' ); // function in _related_ktz.php ?>
		
		</div>
	</div>
	</div>
	
</article><!-- #post-<?php the_ID(); ?> -->
