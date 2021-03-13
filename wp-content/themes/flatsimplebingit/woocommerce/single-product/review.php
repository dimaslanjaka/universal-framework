<?php
/**
 * Review Comments Template
 *
 * Closing li is left out on purpose!.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/review.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woothemes.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$rating   = intval( get_comment_meta( $comment->comment_ID, 'rating', true ) );
$verified = wc_review_is_from_verified_owner( $comment->comment_ID );

?>
<li itemprop="review" itemscope itemtype="http://schema.org/Review" <?php comment_class(); ?> id="li-comment-<?php comment_ID() ?>">
	<div id="comment-<?php comment_ID(); ?>" class="commentwrapper clearfix">
		<div class="author-card pull-left clearfix">
		<?php echo get_avatar( $comment, apply_filters( 'woocommerce_review_gravatar_size', '52' ), '' ); ?>
		</div>
            <div class="comment_data">
			<span class="fontawesome ktzfo-caret-left"></span>

				<p>
					<span itemprop="author" class="comment_author_link"><?php comment_author(); ?></span> 
					<?php

					if ( get_option('woocommerce_review_rating_verification_label') == 'yes' )
					if ( $verified )
					echo '<em class="verified">(' . __( 'verified owner', 'woocommerce' ) . ')</em> ';

					?>
					<span class="comment-date">
						<time itemprop="datePublished" datetime="<?php echo get_comment_date( 'c' ); ?>"><?php echo get_comment_date( wc_date_format() ); ?></time>
					</span>
					<?php if ( $rating && get_option( 'woocommerce_enable_review_rating' ) === 'yes' ) : ?>
						<span itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating" class="star-rating" title="<?php echo sprintf( __( 'Rated %d out of 5', 'woocommerce' ), $rating ) ?>">
							<span style="width:<?php echo ( $rating / 5 ) * 100; ?>%"><strong itemprop="ratingValue"><?php echo $rating; ?></strong> <?php _e( 'out of 5', 'woocommerce' ); ?></span>
						</span>
					<?php endif; ?>
				</p>
					
				<?php if ($GLOBALS['comment']->comment_approved == '0') : ?>
					<p><em><?php _e( 'Your comment is awaiting approval', 'woocommerce' ); ?></em></p>
				<?php else : ?>
					<?php do_action( 'woocommerce_review_before_comment_text', $comment ); ?>

					<div itemprop="description"<?php comment_text(); ?></div>

					<?php do_action( 'woocommerce_review_after_comment_text', $comment ); ?>
				<?php endif; ?>
					
				<div class="clear"></div>
			</div>
		<div class="clear"></div>
	</div>
