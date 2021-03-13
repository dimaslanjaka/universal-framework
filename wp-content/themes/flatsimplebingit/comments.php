<?php
	if (!empty($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
		die (__('Please do not load this page directly. Thanks!','ktz_theme_textdomain'));
	if ( post_password_required() ) { ?>
		<p class="nocomments"><?php _e( 'This post is password protected. Enter the password to view comments.','ktz_theme_textdomain'); ?></p>
	<?php
		return;
	}
?>
<?php if ( have_comments() ) : ?>

	<ol class="commentlist">
		<?php wp_list_comments( array( 'callback' => 'ktz_comments' ) ); ?>
	</ol>
	<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : 
		 ktz_comment_nav();
		endif; ?>
	<?php else : 
	if ('open' == $post->comment_status) :
	else : ?>
		<p class="nocomments"><?php _e( 'Comments are closed.', 'ktz_theme_textdomain' ); ?></p>
	<?php endif; ?>
	<?php endif; ?>
	<?php if ('open' == $post->comment_status) : ?>
	<?php $new_default = array(
		'comment_notes_before' => '',
		'comment_notes_after' => '',
		'id_submit' => 'comment-submit',
		'comment_field' => ''
		);
		$new_default['comment_field'] = '<div class="textarea-form"><textarea name="comment" cols="100%" rows="5" class="form-control btn-box" tabindex="4"></textarea></div>' . wp_nonce_field( 'woocommerce-comment_rating', '_wpnonce', true, false );
	comment_form($new_default); ?>
<?php endif; ?>

