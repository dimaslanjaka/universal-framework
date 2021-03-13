<?php
/*
/*-----------------------------------------------*/
/* KENTOOZ WOOCOMMERCE
/* Website: kentooz.com
/* The Author: Gian Mokhammad Ramadhan 
/*-----------------------------------------------*/

// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

if (class_exists( 'woocommerce' )) {
	add_theme_support( 'woocommerce' );
	// Disable WooCommerce styles
	if ( version_compare( WOOCOMMERCE_VERSION, "2.1" ) >= 0 ) {
		add_filter( 'woocommerce_enqueue_styles', '__return_false' );
	} else {
		define( 'WOOCOMMERCE_USE_CSS', false );
	}

	// Setting shop page image use fancybox lightbox
	if(get_option( 'woocommerce_enable_lightbox' ) == 'yes'){
		update_option( 'woocommerce_enable_lightbox', 'yes');
	}
}

add_action( 'after_setup_theme', 'ktz_woo_theme_setup' );

function ktz_woo_theme_setup() {
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}

/*
 * Change number or products per row
 */
if (!function_exists('ktz_loop_columns')) {
function ktz_loop_columns() {
	$ktz_col_option = ot_get_option('ktz_woo_sb_col');
	$ktz_cols = ( $ktz_col_option != '' ? $ktz_col_option : '3' );
	return $ktz_cols; // 3 products per row
	}
}
add_filter('loop_shop_columns', 'ktz_loop_columns');

/*
 * Change default thumbnail woocommerce setting
 */
function ktz_woocommerce_image_dimensions() {
global $pagenow;
if ( ! isset( $_GET['activated'] ) || $pagenow != 'themes.php' ) {
		return;
	}
	$catalog = array(
		'width' => '400',	// px
		'height'	=> '400',	// px
		'crop'	=> 1 // true
	);
	$single = array(
		'width' => '600',	// px
		'height'	=> '600',	// px
		'crop'	=> 1 // true
	);
	$thumbnail = array(
		'width' => '120',	// px
		'height'	=> '120',	// px
		'crop'	=> 0 // false
	);
	// Image sizes
	update_option( 'shop_catalog_image_size', $catalog ); // Product category thumbs
	update_option( 'shop_single_image_size', $single ); // Single product image
	update_option( 'shop_thumbnail_image_size', $thumbnail ); // Image gallery thumbs
}
add_action( 'after_switch_theme', 'ktz_woocommerce_image_dimensions', 1 );

/*
 * Custom BreadCrumbs
 */
function ktz_woocommerce_breadcrumbs() {
return array(
	'delimiter'   => ' ',
	'wrap_before' => '<div class="breadcrumb-wrap"><ol class="breadcrumb btn-box">',
	'wrap_after' => '</ol></div>',
	'before' => '<li>',
	'after' => '</li>',
	'home'        => _x( 'Home', 'breadcrumb', 'woocommerce' )
	);
}
add_filter( 'woocommerce_breadcrumb_defaults', 'ktz_woocommerce_breadcrumbs' );

function woocommerce_remove_breadcrumb(){
remove_action( 
    'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);
}
add_action(
    'woocommerce_before_main_content', 'woocommerce_remove_breadcrumb'
);

function woocommerce_custom_breadcrumb(){
    woocommerce_breadcrumb();
}
add_action( 'ktz_custom_breadcrumb', 'woocommerce_custom_breadcrumb' );

/*
 * Change Pagination with kentooz pagination
 */
function woocommerce_pagination() {
	echo '<nav id="nav-index">';
	ktz_pagenavi(); 		
	echo '</nav>';
}
remove_action( 'woocommerce_pagination', 'woocommerce_catalog_ordering', 20 ); 
remove_action( 'woocommerce_pagination', 'woocommerce_pagination', 10 ); 
remove_action( 'woocommerce_pagination', 'woocommerceframework_pagination', 10 ); 
remove_action( 'woocommerce_pagination', 'woocommerce_pagination_wrap_open', 5 ); 
remove_action( 'woocommerce_pagination', 'woocommerce_pagination_wrap_close', 25 );
add_action( 'woocommerce_pagination', 'woocommerce_pagination', 10 );

/*
 * Header cart
 */
function ktz_head_cart() {
	global $woocommerce;
	if (class_exists( 'woocommerce' )) {
		echo '<div class="ktz-cart-wrap login-block">';
			echo '<span class="ktz-cart-head"><a href="' . wc_get_cart_url() . '"><span class="ktz-cart-button">&nbsp;</span><span class="glyphicon glyphicon-shopping-cart"></span> <span id="top_item_count">' . sprintf(_n('%d', '%d', $woocommerce->cart->cart_contents_count, 'ktz_theme_textdomain'), $woocommerce->cart->cart_contents_count) . '</span></a></span>';
		echo '<div class="cart_wrapper">';
		if ( sizeof( $woocommerce->cart->get_cart() ) > 0 ) :
		foreach ( $woocommerce->cart->get_cart() as $cart_item_key => $cart_item ) :
			$_product = $cart_item['data'];
			if ( ! apply_filters('woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) || ! $_product->exists() || $cart_item['quantity'] == 0 )
				continue;
			$product_price = get_option( 'woocommerce_tax_display_cart' ) == 'excl' ? wc_get_price_excluding_tax( $_product ) : wc_get_price_excluding_tax( $_product );
			$product_price = apply_filters( 'woocommerce_cart_item_price_html', wc_price( $product_price ), $cart_item, $cart_item_key );
			echo '<div class="ktz_cart_box clearfix">';
			echo $_product->get_image();
			echo '<div class="ktz_cart_boxcontent">';
			echo '<a href="' .  get_permalink( $cart_item['product_id'] ). '">';
			echo apply_filters('woocommerce_widget_cart_product_title', $_product->get_title(), $_product );
			echo '</a>';
			echo $woocommerce->cart->get_item_data( $cart_item );
			echo apply_filters( 'woocommerce_widget_cart_item_quantity', '<span class="quantity">' . sprintf( '%s &times; %s', $cart_item['quantity'], $product_price ) . '</span>', $cart_item, $cart_item_key );
			echo '</div>';
			echo '</div>';
		endforeach;
		else : 
		echo '<div class="empty">';
		echo __( 'No products in the cart.', 'ktz_theme_textdomain' );
		echo '</div>';
		endif;
	if ( sizeof( $woocommerce->cart->get_cart() ) > 0 ) :
		echo '<p class="total"><strong>';
		echo __( 'Subtotal', 'ktz_theme_textdomain' );
		echo ':</strong> ';
		echo $woocommerce->cart->get_cart_subtotal();
		echo '</p>';
		do_action( 'woocommerce_widget_shopping_cart_before_buttons' );
		echo '<div class="cart-buttons clearfix">';
		echo '<a href="' . wc_get_cart_url() . '" class="cart-button pull-left"><span class="glyphicon glyphicon-eye-open"></span> ';
		echo __( 'View Cart', 'ktz_theme_textdomain' );
		echo '</a>';
		echo '<a href="' . $woocommerce->cart->get_checkout_url() . '" class="cart-button pull-right"><span class="glyphicon glyphicon-credit-card"></span> ';
		echo __( 'Checkout', 'ktz_theme_textdomain' );
		echo '</a>';
		echo '</div>';
	endif;
		echo '</div>';
		echo '</div>';
	} 
}
add_action( 'ktz_head_cart', 'ktz_head_cart' );

/* 
 * Wishlist Dropdown
 */
if (!function_exists('ktz_get_wishlist')) {
function ktz_get_wishlist() {
	global $wpdb, $yith_wcwl, $woocommerce;
	$wishlist_output = "";
					
	if ( is_user_logged_in() ) {
	    $user_id = get_current_user_id();
	}
			
	$count = array();
		
	if( is_user_logged_in() ) {
	    $count = $wpdb->get_results( $wpdb->prepare( 'SELECT COUNT(*) as `cnt` FROM `' . YITH_WCWL_TABLE . '` WHERE `user_id` = %d', $user_id  ), ARRAY_A );
	    $count = $count[0]['cnt'];
	} elseif( yith_usecookies() ) {
	    $count[0]['cnt'] = count( yith_getcookie( 'yith_wcwl_products' ) );
	    $count = $count[0]['cnt'];
	} else {
		$count[0]['cnt'] = count( $_SESSION['yith_wcwl_products'] );
		$count = $count[0]['cnt'];
	}
			
	if (is_array($count)) {
		$count = 0;
	}
			
	$wishlist_output .= '<div class="ktz-cart-wrap login-block"><span class="ktz-wishlist-head"><a class="wishlist-link" href="'.$yith_wcwl->get_wishlist_url().'" title="'.__("View your wishlist", 'ktz_theme_textdomain' ).'"><span class="ktz-cart-button">&nbsp;</span><span class="glyphicon glyphicon-star-empty"></span> <span id="wishlist_item_count">'.$count.'</span></a></span>';
	$wishlist_output .= '<div class="ktz-wishlist-wrapper">';
	
	$current_page = 1;
	$limit_sql = '';
	$count_limit = 0;
	
	if( is_user_logged_in() )
	    { $wishlist = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM `" . YITH_WCWL_TABLE . "` WHERE `user_id` = %s" . $limit_sql, $user_id ), ARRAY_A ); }
	elseif( yith_usecookies() )
	    { $wishlist = yith_getcookie( 'yith_wcwl_products' ); }
	else
	    { $wishlist = isset( $_SESSION['yith_wcwl_products'] ) ? $_SESSION['yith_wcwl_products'] : array(); }
						  
	do_action( 'yith_wcwl_before_wishlist_title' );
		    
	$wishlist_title = get_option( 'yith_wcwl_wishlist_title' );
	if( !empty( $wishlist_title ) ) {		
		$wishlist_output .= '<div class="ktz-wishlist-titlehead">'.$wishlist_title.'</div>';
	}
			
	$wishlist_output .= do_action( 'yith_wcwl_before_wishlist' );
	          
	if ( count( $wishlist ) > 0 ) :
		foreach( $wishlist as $values ) :   
	                
			if ($count_limit < 4) {
	                
			if( !is_user_logged_in() ) {
				if( isset( $values['add-to-wishlist'] ) && is_numeric( $values['add-to-wishlist'] ) ) {
					$values['prod_id'] = $values['add-to-wishlist'];
					$values['ID'] = $values['add-to-wishlist'];
				} else {
					$values['prod_id'] = $values['product_id'];
					$values['ID'] = $values['product_id'];
				}
			}
		                                 
			$product_obj = wc_get_product( $values['prod_id'] );
		                
			if( $product_obj !== false && $product_obj->exists() ) : 
		                
			$wishlist_output .= '<div id="wishlist-'.$values['ID'].'" class="ktz_cart_box clearfix">';
		                
			$params = array( 'width' =>40, 'height' => 40, 'crop' => true );
			if ( has_post_thumbnail($product_obj->get_id()) ) {
			$image_link  		= wp_get_attachment_url( get_post_thumbnail_id($product_obj->get_id()) );                        	
			$image = bfi_thumb( $image_link, $params );
			if ($image) {
				$wishlist_output .= '<a href="'.esc_url( get_permalink( apply_filters( 'woocommerce_in_cart_product', $values['prod_id'] ) ) ).'"><img itemprop="image" src="'.$image.'" width="40" height="40" /></a>';                      
				}            			
			} 
		               		                
			$wishlist_output .= '<div class="ktz_cart_boxcontent">';
			$wishlist_output .= '<a href="'.esc_url( get_permalink( apply_filters( 'woocommerce_in_cart_product', $values['prod_id'] ) ) ).'">'. apply_filters( 'woocommerce_in_cartproduct_obj_title', $product_obj->get_title(), $product_obj ) .'</a>';
			if( get_option( 'woocommerce_display_cart_prices_excluding_tax' ) == 'yes' ) {
				$wishlist_output .= '<span class="quantity">'.apply_filters( 'woocommerce_cart_item_price_html', wc_price( wc_get_price_excluding_tax( $product_obj ) ), $values, '' ).'</span>';
			} else {
				$wishlist_output .= '<span class="quantity">'.apply_filters( 'woocommerce_cart_item_price_html', wc_price( $product_obj->get_price() ), $values, '' ).'</span>';
			}  
			$wishlist_output .= '</div>';     
			$wishlist_output .= '</div>';    
			endif;
			$count_limit++;
			}
	endforeach;
	else :
	   $wishlist_output .= '<div class="empty">'. __( 'Your wishlist is currently empty.', 'ktz_theme_textdomain' ) .'</div>';
	endif;
	
	$wishlist_output .= '<div class="cart-buttons">';
			
	$wishlist_output .= '<a href="'.$yith_wcwl->get_wishlist_url().'" class="cart-button"><i class="glyphicon glyphicon-star-empty"></i>  <span class="text">'.__('Go to your wishlist', 'ktz_theme_textdomain').'</span></a>';
			            	                
	$wishlist_output .= '</div>';		
	do_action( 'yith_wcwl_after_wishlist' );
	 				
	$wishlist_output .= '</div>';                                                                                                           
	$wishlist_output .= '</div>'; 
					
	return $wishlist_output;
	}
}

/*
 * Display wishlist via hook
 */
function ktz_display_wishlist() {
if ( class_exists( 'YITH_WCWL_UI' ) )  {
	echo ktz_get_wishlist();
	}	
}
add_action( 'ktz_display_wishlist', 'ktz_display_wishlist' );

/*
* Add ajax in header cart when add button click
*/
function ktz_header_add_to_cart_fragment( $fragments ) {
	global $woocommerce;	
	if (class_exists( 'woocommerce' )) {
	ob_start();
	?>
	<span id="top_item_count"><?php echo sprintf(_n('%d', '%d', $woocommerce->cart->cart_contents_count, 'ktz_theme_textdomain'), $woocommerce->cart->cart_contents_count);?></span>
	<?php
	$fragments['span#top_item_count'] = ob_get_clean();
	
	ob_start();
		echo '<div class="cart_wrapper">';
		if ( sizeof( $woocommerce->cart->get_cart() ) > 0 ) :
		foreach ( $woocommerce->cart->get_cart() as $cart_item_key => $cart_item ) :
			$_product = $cart_item['data'];
			if ( ! apply_filters('woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) || ! $_product->exists() || $cart_item['quantity'] == 0 )
				continue;
			$product_price = get_option( 'woocommerce_tax_display_cart' ) == 'excl' ? wc_get_price_excluding_tax( $_product ) : wc_get_price_excluding_tax( $_product );
			$product_price = apply_filters( 'woocommerce_cart_item_price_html', wc_price( $product_price ), $cart_item, $cart_item_key );
			echo '<div class="ktz_cart_box clearfix">';
			echo $_product->get_image();
			echo '<div class="ktz_cart_boxcontent">';
			echo '<a href="' .  get_permalink( $cart_item['product_id'] ). '">';
			echo apply_filters('woocommerce_widget_cart_product_title', $_product->get_title(), $_product );
			echo '</a>';
			echo $woocommerce->cart->get_item_data( $cart_item );
			echo apply_filters( 'woocommerce_widget_cart_item_quantity', '<span class="quantity">' . sprintf( '%s &times; %s', $cart_item['quantity'], $product_price ) . '</span>', $cart_item, $cart_item_key );
			echo '</div>';
			echo '</div>';
		endforeach;
		else : 
		echo '<div class="empty">';
		echo __( 'No products in the cart.', 'ktz_theme_textdomain' );
		echo '</div>';
		endif;
	if ( sizeof( $woocommerce->cart->get_cart() ) > 0 ) :
		echo '<p class="total"><strong>';
		echo __( 'Subtotal', 'ktz_theme_textdomain' );
		echo ':</strong> ';
		echo $woocommerce->cart->get_cart_subtotal();
		echo '</p>';
		do_action( 'woocommerce_widget_shopping_cart_before_buttons' );
		echo '<div class="cart-buttons clearfix">';
		echo '<a href="' . wc_get_cart_url() . '" class="cart-button pull-left"><span class="glyphicon glyphicon-eye-open"></span> ';
		echo __( 'View Cart', 'ktz_theme_textdomain' );
		echo '</a>';
		echo '<a href="' . $woocommerce->cart->get_checkout_url() . '" class="cart-button pull-right"><span class="glyphicon glyphicon-credit-card"></span> ';
		echo __( 'Checkout', 'ktz_theme_textdomain' );
		echo '</a>';
		echo '</div>';
	endif;
		echo '</div>';
		$fragments['div.cart_wrapper'] = ob_get_clean();
	return $fragments;
	}
}
add_filter( 'add_to_cart_fragments', 'ktz_header_add_to_cart_fragment' );

/*
* Add span in thumbnail in shop page
*/
function woocommerce_template_loop_product_thumbnail() {
    global $product;
	if (class_exists( 'woocommerce' )) { 

	echo '<span class="thumb">' . woocommerce_get_product_thumbnail();

    echo  '</span>';
	}
}

/*
 * Add notif out of stock
 * @return
 */
function ktz_out_of_stock() {
    global $post;
    $post_id = $post->ID;
    $stock_status = get_post_meta($post_id, '_stock_status',true);
    
    if ($stock_status == 'outofstock') {
    return true;
    } else {
    return false;
    }
}

/*
* Change badge with discount
*/
function ktz_badge_sale_amount( $message ) {
	global $post, $product;
	if (class_exists( 'woocommerce' )) {
		$saving_amount = 0;
		if ( $product->has_child() ) {
			// Loop through children if this is a variable product
			foreach ( $product->get_children() as $child_id ) {
				$regular_price = get_post_meta( $child_id, '_regular_price', true );
				$sale_price = get_post_meta( $child_id, '_sale_price', true );
				if( $regular_price != '' && $sale_price != '' && $regular_price > $sale_price ) {
					$new_saving_amount = (( $regular_price - $sale_price ) / $regular_price ) * 100;
					// Only display the largest saving amount
					if( $new_saving_amount > $saving_amount ) {
						$saving_amount = $new_saving_amount;
					}
				}
			}
			$button_text = __( 'Save up to', 'ktz_theme_textdomain' );
		} else {
			// Fetch prices for simple products
			$regular_price = get_post_meta( $post->ID, '_regular_price', true );
			$sale_price = get_post_meta( $post->ID, '_sale_price', true );
			if( $regular_price != '' && $sale_price != '' && $regular_price > $sale_price ) {
				$saving_amount = (( $regular_price - $sale_price ) / $regular_price ) * 100;
			}
			$button_text = __( '-', 'ktz_theme_textdomain' );
		}
		$meta_values = get_post_custom($post->ID);
		if(	isset($meta_values['ktz_woo_badge_text'] ) && $meta_values['ktz_woo_badge_text'][0] != '' ) {
			$ktz_badge_color = get_post_custom_values('ktz_woo_badge_color', $post->ID); 
			$badge_color = ($ktz_badge_color != '' ? $ktz_badge_color[0] : '#b01e00');
			$saving_price =  number_format($saving_amount, 0);
			echo '<span class="onsale" style="background:' . $badge_color . '">' . $meta_values['ktz_woo_badge_text'][0] . '</span>';
		} elseif( $saving_amount > 0 ) {
			$ktz_badge_color = get_post_custom_values('ktz_woo_badge_color', $post->ID); 
			$badge_color = ($ktz_badge_color != '' ? $ktz_badge_color[0] : '#b01e00');
			$saving_price =  number_format($saving_amount, 0);
			echo '<span class="onsale" style="background:' . $badge_color . '">' . $button_text . sprintf( __( ' %s', 'ktz_theme_textdomain' ), $saving_price ) . '' . __( '%', 'ktz_theme_textdomain' ) .'</span>';
		} elseif (ktz_out_of_stock()) {
			$ktz_badge_color = get_post_custom_values('ktz_woo_badge_color', $post->ID); 
			$badge_color = ($ktz_badge_color != '' ? $ktz_badge_color[0] : '#b01e00');
			echo '<span class="onsale" style="background:' . $badge_color . '">' . __( 'Out of Stock', 'ktz_theme_textdomain' ) . '</span>';		
		} elseif (!$product->get_price()) {
			$ktz_badge_color = get_post_custom_values('ktz_woo_badge_color', $post->ID); 
			$badge_color = ($ktz_badge_color != '' ? $ktz_badge_color[0] : '#2e8def');
			echo '<span class="onsale" style="background:' . $badge_color . '">' . __( 'Free', 'ktz_theme_textdomain' ) . '</span>';
		} else {	
			$postdate 		= get_the_time( 'Y-m-d' );			// Post date
			$postdatestamp 	= strtotime( $postdate );			// Timestamped post date
			$newness 		= 7; 	// Newness in days
			$ktz_badge_color = get_post_custom_values('ktz_woo_badge_color', $post->ID); 
			$badge_color = ($ktz_badge_color != '' ? $ktz_badge_color[0] : '#00a600');
			if ( ( time() - ( 60 * 60 * 24 * $newness ) ) < $postdatestamp ) { 
			// If the product was published within the newness time frame display the new badge
				echo '<span class="onsale" style="background:' . $badge_color . '">' . __( 'New', 'ktz_theme_textdomain' ) . '</span>';
			}
		}
	}
}
// Remove "Sale" icon from product archive page
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_sale_flash', 10 );
// Add action for Badge
add_action( 'ktz_badge_sale_amount', 'ktz_badge_sale_amount', 10, 1 );
add_action( 'ktz_badge_sale_amount', 'ktz_badge_sale_amount', 10, 1 );

/* 
 * Change position rating in after description in product single
 */
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 25 );

/* 
 * Add pif-has-gallery class to products that have a gallery
 */
function ktz_product_has_gallery( $classes ) {
	global $product;
	$post_type = get_post_type( get_the_ID() );
		if ( ! is_admin() ) {
			if ( $post_type == 'product' ) {
				$attachment_ids = $product->get_gallery_image_ids();

				if ( $attachment_ids ) {
					$classes[] = 'ktz-has-gallery';
				}
			}
		}
	return $classes;
}
add_filter( 'post_class', 'ktz_product_has_gallery' );

/*
 * Display the second thumbnails
 */
function ktz_woocommerce_template_loop_second_product_thumbnail() {
	global $product, $woocommerce;
	$attachment_ids = $product->get_gallery_image_ids();

	if ( $attachment_ids ) {
		$secondary_image_id = $attachment_ids['0'];
		echo wp_get_attachment_image( $secondary_image_id, 'shop_catalog', '', $attr = array( 'class' => 'secondary-image attachment-shop-catalog' ) );
	}
}
add_action( 'woocommerce_before_shop_loop_item_title', 'ktz_woocommerce_template_loop_second_product_thumbnail' , 11 );