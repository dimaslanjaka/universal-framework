/*
 * Copyright (c) 2016 Gian MR
 * Gian MR Theme Custom Javascript
 */
 
var $ = jQuery.noConflict();

(function( $ ) {
	/* http://www.w3schools.com/js/js_strict.asp */
	"use strict";
	
	$( document ).ready( function () {
		
		/* JS SEARCH EFFECT */
		$('.gmr-search input').hide();
		$('.gmr-search .search-trigger').click(function(e){
			e.preventDefault();
			$('.gmr-search input').slideToggle('fast').focus(); 
			$('.gmr-search .search-trigger').toggleClass('active');
		});
		
		/* Sidr Resposive Menu */
		$('#gmr-responsive-menu').sidr({
			name: 'menus',
			source: '.gmr-mainmenu',
			displace: false
		});
		$( window ).resize(function() {
			$.sidr('close', 'menus');
		});
		$('#sidr-id-close-menu-button').click(function(e){
			e.preventDefault();
			$.sidr('close', 'menus');
		});
		
	}); /* End document Ready */
		
	/* Accessibility Drop Down Menu */
	jQuery(function($) {
		$('.menu-item-has-children a').focus( function () {
			$(this).siblings('.sub-menu').addClass('focused');
		}).blur(function(){
			$(this).siblings('.sub-menu').removeClass('focused');
		});
		// Sub Menu
		$('.sub-menu a').focus( function () {
			$(this).parents('.sub-menu').addClass('focused');
		}).blur(function(){
			$(this).parents('.sub-menu').removeClass('focused');
		});
	}); /* End jQuery(function($) { */
	
	/* Sticky Menu */
	jQuery(function($) {
		$(window).scroll(function() {
			if ( $(this).scrollTop() > 85 ) {
				$('.top-header').addClass('sticky-menu');
			} else {
				$('.top-header').removeClass('sticky-menu');
			}
		});
	}); /* End jQuery(function($) { */
	
})(jQuery);

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var isWebkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    isOpera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    isIe     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( isWebkit || isOpera || isIe ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();
