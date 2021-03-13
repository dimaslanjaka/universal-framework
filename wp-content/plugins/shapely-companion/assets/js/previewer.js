(function( $ ) {// jscs:ignore validateLineBreaks

	'use strict';

	$( document ).ready( function() {
		if ( 'undefined' === typeof wp || ! wp.customize || ! wp.customize.selectiveRefresh ) {
			return;
		}

		wp.customize.selectiveRefresh.bind( 'widget-updated', function( placement ) {
			var maxHeight, container, msnry, element;
			$( '.logo-carousel' ).flexslider( {
				minItems: 1,
				maxItems: 4,
				move: 1,
				itemWidth: 200,
				itemMargin: 0,
				animation: 'slide',
				slideshow: true,
				slideshowSpeed: 3000,
				directionNav: false,
				controlNav: false
			} );

			if ( 'function' === typeof $( '.parallax-window' ).parallax ) {
				$( '.parallax-window' ).parallax();
			}

			if ( $( '.masonry' ).length && 'undefined' !== typeof Masonry ) {
				container = document.querySelector( '.masonry' );
				msnry = new Masonry( container, {
					itemSelector: '.masonry-item'
				} );
				maxHeight = -1;
				msnry.on( 'layoutComplete', function() {
					var element = jQuery( msnry.element ),
						cols = element.find( '.masonry-item img' );
					jQuery.each( cols, function() {
						if ( parseInt( jQuery( this ).attr( 'height' ), 10 ) > maxHeight ) {
							maxHeight = parseInt( jQuery( this ).attr( 'height' ), 10 );
						}
					} );

				} );

				msnry.layout();
				element = jQuery( msnry.element );

				jQuery( element ).css( 'height', maxHeight + 'px' );
			}

			if ( 0 !== jQuery( '.testimonial-section' ).length ) {
				testimonialHeight();
				setTimeout( function() {
					testimonialHeight();
				}, 3000 );
			}

			$( '.slider-arrow-controls' ).flexslider( {
				controlNav: false
			} );

			/*
			 * Resetting testimonial parallax height
			 */
			function testimonialHeight() {
				var testimonialHeight = jQuery( '.testimonial-section .parallax-window .container' ).outerHeight() + 150;
				jQuery( '.testimonial-section .parallax-window' ).css( 'height', testimonialHeight );
				jQuery( window ).trigger( 'resize' ).trigger( 'scroll' );
			}
		} );
	} );

})( jQuery );
