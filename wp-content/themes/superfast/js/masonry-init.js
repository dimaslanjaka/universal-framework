//Masonry init
jQuery(function($) {
	var $container = $('.masonry-container');
	$container.imagesLoaded( function() {
		$container.masonry({
			itemSelector: '.item',
	        isAnimated: true,
			animationOptions: {
				duration: 500,
				easing: 'linear',
			}
	    });
	});
});