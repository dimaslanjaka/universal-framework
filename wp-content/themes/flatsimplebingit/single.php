<?php 
/**
 * KENTOOZ SINGLE PAGE TEMPLATE
**/
get_header(); ?>
	<section class="col-md-12">
		<section class="new-content">
		<?php while ( have_posts() ) : the_post(); ?>
			<?php get_template_part( 'content', 'single' ); ?>
			<?php endwhile; // end of the loop. ?>
		</section>
		
		<?php if ( ot_get_option('ktz_def_com_activated') == 'yes' || ot_get_option('ktz_facebook_com_activated') == 'yes' || ot_get_option('ktz_active_autbox') == 'yes' ) : ?>
		<div class="tab-comment-wrap" id="comments">
		
		<ul class="nav nav-tabs" id="kentooz-comment">
		
			<?php if ( ot_get_option('ktz_def_com_activated') == 'yes' ) : ?>
			<li><a href="#comtemplate" data-toggle="tab" title="Default comment"><span class="fontawesome ktzfo-comment-alt"></span> <?php _e( 'Comments', 'ktz_theme_textdomain' ); ?></a></li>
			<?php endif; ?>		
		
			<?php if ( ot_get_option('ktz_facebook_com_activated') == 'yes' ) : ?>
			<li><a href="#comfacebook" data-toggle="tab" title="Facebook comment"><span class="fontawesome ktzfo-facebook"></span> <?php _e( 'FB Comments', 'ktz_theme_textdomain' ); ?></a></li>
			<?php endif; ?>
			
		</ul>
		
		<div class="tab-content">
		
			<?php if ( ot_get_option('ktz_def_com_activated') == 'yes' ) : ?>
			<div class="tab-pane" id="comtemplate">
				<div class="wrapcomment">
				<?php do_action( 'ktz_comments_default'); // function in _comment_ktz.php ?>
				</div>			
			</div>
			<?php endif; ?>		
		
			<?php if ( ot_get_option('ktz_facebook_com_activated') == 'yes' ) : ?>
			<div class="tab-pane" id="comfacebook">
				<div class="wrapcomment">
				<?php do_action( 'ktz_comments_facebook'); // function in _comment_ktz.php ?>
				</div>
			</div>
			<?php endif; ?>
			
		</div>
		
		</div>
		<?php endif; ?>
	</section>
<?php get_footer(); ?>