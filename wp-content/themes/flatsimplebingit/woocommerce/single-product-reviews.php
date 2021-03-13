<?php
/**
 * Display single product reviews (comments)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product-reviews.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.2.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product;

if ( ! comments_open() ) {
	return;
}

?>
<div id="reviews" class="woocommerce-Reviews">
	<div id="comments">
		<h2 class="woocommerce-Reviews-title"><?php
			if ( get_option( 'woocommerce_enable_review_rating' ) === 'yes' && ( $count = $product->get_review_count() ) ) {
				/* translators: 1: reviews count 2: product name */
				printf( esc_html( _n( '%1$s review for %2$s', '%1$s reviews for %2$s', $count, 'woocommerce' ) ), esc_html( $count ), '<span>' . get_the_title() . '</span>' );
			} else {
				_e( 'Reviews', 'woocommerce' );
			}
		?></h2>

		<?php if ( have_comments() ) : ?>

			<ol class="commentlist">
				<?php wp_list_comments( apply_filters( 'woocommerce_product_review_list_args', array( 'callback' => 'woocommerce_comments' ) ) ); ?>
			</ol>

			<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
				echo '<nav class="woocommerce-pagination">';
				paginate_comments_links( apply_filters( 'woocommerce_comment_pagination_args', array(
					'prev_text' => '&larr;',
					'next_text' => '&rarr;',
					'type'      => 'list',
				) ) );
				echo '</nav>';
			endif; ?>

		<?php else : ?>

			<p class="woocommerce-noreviews"><?php _e( 'There are no reviews yet.', 'woocommerce' ); ?></p>

		<?php endif; ?>
	</div>

	<?php if ( get_option( 'woocommerce_review_rating_verification_required' ) === 'no' || wc_customer_bought_product( '', get_current_user_id(), $product->get_id() ) ) : ?>

		<div id="review_form_wrapper">
			<div id="review_form">
				<?php
					$commenter = wp_get_current_commenter();

					$comment_form = array(
						'title_reply' => '<span class="ktz-blocktitle">' . have_comments() ? __( 'Add a review', 'woocommerce' ) : sprintf( __( 'Be the first to review &ldquo;%s&rdquo;', 'woocommerce' ), get_the_title() ) . '</span>',
						'comment_notes_before' => '',
						'comment_notes_after' => '',
						'fields' => array(
							'author' => '<div class="row"><div class="col-md-6"><div class="form-group has-feedback"><label class="control-label sr-only" for="author">Name</label><input type="text" name="author" class="form-control btn-box" id="form-control" placeholder="' . __( 'Name', 'ktz_theme_textdomain' ) .' ' . ( $req ? __( '*', 'ktz_theme_textdomain' ) : '' ) . '" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30" tabindex="1" aria-required="true" /><span class="glyphicon glyphicon-user form-control-feedback"></span></div></div>',
							'email'  => '<div class="col-md-6"><div class="form-group has-feedback"><label class="control-label sr-only" for="email">Email</label><input type="text" name="email" class="form-control btn-box" id="form-control" placeholder="' . __( 'Email', 'ktz_theme_textdomain' ) .' ' . ( $req ? __( '*', 'ktz_theme_textdomain' ) : '' ) . '" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30" tabindex="2" aria-required="true" /><span class="glyphicon glyphicon-envelope form-control-feedback"></span></div></div></div>',
						),
						'label_submit' => __( 'Submit Review', 'woocommerce' ),
						'logged_in_as' => '',
						'id_submit' => 'comment-submit',
						'comment_field' => ''
					);

					if ( get_option( 'woocommerce_enable_review_rating' ) === 'yes' ) {
						$comment_form['comment_field'] = '<p class="comment-form-rating"><label for="rating">' . __( 'Your Rating:', 'woocommerce' ) .'</label><select name="rating" id="rating">
							<option value="">' . __( 'Rate&hellip;', 'woocommerce' ) . '</option>
							<option value="5">' . __( 'Perfect', 'woocommerce' ) . '</option>
							<option value="4">' . __( 'Good', 'woocommerce' ) . '</option>
							<option value="3">' . __( 'Average', 'woocommerce' ) . '</option>
							<option value="2">' . __( 'Not that bad', 'woocommerce' ) . '</option>
							<option value="1">' . __( 'Very Poor', 'woocommerce' ) . '</option>
						</select></p>';
					}

					$comment_form['comment_field'] .= '<div class="textarea-form"><textarea name="comment" cols="100%" rows="5" class="form-control btn-box" tabindex="4"></textarea></div>' . wp_nonce_field( 'woocommerce-comment_rating', '_wpnonce', true, false );

					comment_form( apply_filters( 'woocommerce_product_review_comment_form_args', $comment_form ) );

				?>
			</div>
		</div>

	<?php else : ?>

		<p class="woocommerce-verification-required"><?php _e( 'Only logged in customers who have purchased this product may leave a review.', 'woocommerce' ); ?></p>

	<?php endif; ?>

	<div class="clear"></div>
</div>
