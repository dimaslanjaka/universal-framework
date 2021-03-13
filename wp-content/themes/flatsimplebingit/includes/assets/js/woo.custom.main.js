/*
 * Copyright (c) 2015 kentooz
 * Kentooz Theme Custom Javascript
 */
 
var $ = jQuery.noConflict();

(function( $ ) {
	/* http://www.w3schools.com/js/js_strict.asp */
	"use strict";
	
$( document ).ready( function () {
// WOOCOMMERCE JS
// CART SLIDEUP
    $(document).on('click', '.login-block .ktz-cart-head', function(e){
          //e.preventDefault();
    });
	$(document).on('hover', '.login-block .ktz-cart-head', function(){
         $(this).next('.cart_wrapper').slideDown();
    }).on('mouseleave', '.login-block .ktz-cart-head', function(){
         $(this).next('.cart_wrapper').delay(500).slideUp();
    });
	$(document).on('mouseenter', '.cart_wrapper', function(){ $(this).stop(true,true).show() });
	$(document).on('mouseleave', '.cart_wrapper', function(){ $(this).delay(500).slideUp() });
// WISHLISH SLIDEUP
    $(document).on('click', '.login-block .ktz-wishlist-head', function(e){
          //e.preventDefault();
    });
	$(document).on('hover', '.login-block .ktz-wishlist-head', function(){
         $(this).next('.ktz-wishlist-wrapper').slideDown();
    }).on('mouseleave', '.login-block .ktz-wishlist-head', function(){
         $(this).next('.ktz-wishlist-wrapper').delay(500).slideUp();
    });
	$(document).on('mouseenter', '.ktz-wishlist-wrapper', function(){ $(this).stop(true,true).show() });
	$(document).on('mouseleave', '.ktz-wishlist-wrapper', function(){ $(this).delay(500).slideUp() });

// FLIP Thumbnail
	$( 'ul.products li.ktz-has-gallery a:first-child' ).hover( function() {
		$( this ).children( '.wp-post-image' ).removeClass( 'fadeIn' ).addClass( 'animated fadeOut' );
		$( this ).children( '.secondary-image' ).removeClass( 'fadeOut' ).addClass( 'animated fadeIn' );
	}, function() {
		$( this ).children( '.wp-post-image' ).removeClass( 'fadeOut' ).addClass( 'fadeIn' );
		$( this ).children( '.secondary-image' ).removeClass( 'fadeIn' ).addClass( 'fadeOut' );
	});
	
}); // End document Ready
})(jQuery);

// TAB magnifier In single WOOCOMMERCE
    var yith_magnifier_options = {
        enableSlider: true,
        sliderOptions: {
            responsive: true,
            circular: true,
            infinite: true,
            direction: 'left',
            debug: false,
            auto: false,
            align: 'left',
            prev	: {
                button	: "#slider-prev",
                key		: "left"
            },
            next	: {
                button	: "#slider-next",
                key		: "right"
            },
            scroll : {
                items     : 1,
                pauseOnHover: true
            },
            items   : {
                visible: 3
            }
        },
        showTitle: false,
        zoomWidth: '500',
        zoomHeight: '400',
        position: 'right',
        lensOpacity: 0.5,
        softFocus: false,
        adjustY: 0,
        disableRightClick: false,
        phoneBehavior: 'center',
        loadingLabel: 'loading'
    };