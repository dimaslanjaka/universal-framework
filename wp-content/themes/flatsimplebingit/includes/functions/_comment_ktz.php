<?php
/*
/*-----------------------------------------------*/
/* KENTOOZ THEMES FUNCTION
/* Website    : http://www.kentooz.com
/* The Author : Gian Mokhammad Ramadhan (http://www.gianmr.com)
/* Twitter    : http://www.twitter.com/g14nnakal 
/* Facebook   : http://www.facebook.com/gianmr
/*-----------------------------------------------*/

// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/* 
* change text to leave a reply on comment form
*/
function ktz_comment_text ($arg) {
	$arg['title_reply'] = __('Leave a reply', 'ktz_theme_textdomain') .' "' . get_the_title() . '"';
		return $arg;
	}
add_filter('comment_form_defaults','ktz_comment_text');
	
/*
* Override default new comment_form() with own
* better way to override comment form
*/
function ktz_com_fields($fields) {
	$commenter = wp_get_current_commenter();
	$req = get_option( 'require_name_email' );
	$aria_req = ( $req ? " aria-required='true'" : '' );
	$fields['author'] = '<div class="row"><div class="col-md-4"><div class="form-group has-feedback"><label class="control-label sr-only" for="author">Name</label><input type="text" name="author" class="form-control btn-box" id="form-control" placeholder="' . __( 'Name', 'ktz_theme_textdomain' ) .' ' . ( $req ? __( '*', 'ktz_theme_textdomain' ) : '' ) . '" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30" tabindex="1" ' . $aria_req . ' /><span class="glyphicon glyphicon-user form-control-feedback"></span></div></div>';
	$fields['email'] = '<div class="col-md-4"><div class="form-group has-feedback"><label class="control-label sr-only" for="email">Email</label><input type="text" name="email" class="form-control btn-box" id="form-control" placeholder="' . __( 'Email', 'ktz_theme_textdomain' ) .' ' . ( $req ? __( '*', 'ktz_theme_textdomain' ) : '' ) . '" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30" tabindex="2" ' . $aria_req . ' /><span class="glyphicon glyphicon-envelope form-control-feedback"></span></div></div>';
	$fields['url'] =  '<div class="col-md-4"><div class="form-group has-feedback"><label class="control-label sr-only" for="url">URL</label><input type="text" name="url" class="form-control btn-box" id="form-control" placeholder="' . __( 'Website', 'ktz_theme_textdomain' ) .' ' . ( $req ? __( '*', 'ktz_theme_textdomain' ) : '' ) . '" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" tabindex="3" ' . $aria_req . ' /><span class="glyphicon glyphicon-globe form-control-feedback"></span></div></div></div>';
	return $fields;
}
add_filter( 'comment_form_default_fields','ktz_com_fields' );

/* 
* Add comment list
* You can find comment navigation function in comments.php
* Call via callback wp_list_comments( array( 'callback' => 'ktz_comments' ) ); in comments.php
*/
if ( ! function_exists( 'ktz_comments' ) ) :
function ktz_comments($comment, $args, $depth) {
		$GLOBALS['comment'] = $comment; ?>
		<li <?php comment_class(); ?> id="li-comment-<?php comment_ID() ?>">
		<div class="commentwrapper clearfix <?php $author_id = get_the_author_meta('ID'); if($author_id == $comment->user_id) $author_flag = 'true';?>" id="comment-<?php comment_ID(); ?>">
            <div class="author-card pull-left clearfix">
				<?php echo get_avatar( $comment, $size='52', '', $alt='author' ); ?>
            </div>
            <div class="comment_data">
			<span class="fontawesome ktzfo-caret-left"></span>
				<?php if (isset($author_flag) && ($author_flag == 'true')) { ?><span class="author_comment"><?php _e( 'Author','ktz_theme_textdomain' ); ?></span><?php }?>
                <p><span class="comment_author_link"><?php comment_author_link(); ?></span><span class="comment-date"><?php printf( __( '%1$s','ktz_theme_textdomain' ), human_time_diff( get_comment_time('U'), current_time('timestamp') ) . __( ' ago','ktz_theme_textdomain' ),  get_comment_time() );?></span></p>
                <?php if ($comment->comment_approved == '0') : ?><p><em><?php _e( 'Your comment is awaiting moderation.','ktz_theme_textdomain'); ?></em></p><?php endif;
                comment_text(); ?>
            <span class="comment-reply"><?php comment_reply_link(array_merge( $args, array('depth' => $depth, 'max_depth' => $args['max_depth'], 'reply_text' => __( '<span class="fontawesome ktzfo-repeat"></span> Reply','ktz_theme_textdomain' )))); ?></span><?php edit_comment_link( __( 'Edit','ktz_theme_textdomain' ), '<span class="edit_comment"><span class="glyphicon glyphicon-edit"></span> ', '</span>' ); ?>
			</div><!-- .comment-data -->
		</div><!-- .commentwrapper -->
<?php }
endif;

/* 
* Default comment form wordpress
*/
if ( !function_exists('ktz_comments_default') ) {
function ktz_comments_default() {
	if ( ot_get_option('ktz_def_com_activated') == 'yes' ) :
		comments_template( '', true );
	endif;
	} 	
	add_action( 'ktz_comments_default', 'ktz_comments_default' );
}

/* 
* Default facebook comment form wordpress
*/
if ( !function_exists('ktz_comments_facebook') ) {
function ktz_comments_facebook() { 
	if ( ot_get_option('ktz_facebook_com_activated') == 'yes' ) : 
	echo '<div id="fb-root"></div>';
    echo '<div class="fb-comments" data-href="' . get_permalink() . '" data-width="100%"></div>';  
	endif;
	} 	
add_action( 'ktz_comments_facebook', 'ktz_comments_facebook' );
}