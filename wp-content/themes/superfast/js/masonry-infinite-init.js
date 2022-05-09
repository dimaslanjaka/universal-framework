//Masonry init
jQuery(function($) {
	var $container = $('.masonry-container');
	$container.imagesLoaded( function() {
		$container.masonry({
			itemSelector: '.item'
	    });
	});
	// Count number of times infinte scroll is triggered
	infinite_count = 0;
    
	// Triggers re-layout on infinite scroll
	// post-load triggers when infinite scroll is called
	jQuery(document.body).on('post-load', function() {
		
		var $container = $('.masonry-container');

		// initialize container with masonry
		$container.masonry({
			itemSelector: '.item'
		});
	
		// increment count by 1
		infinite_count = infinite_count + 1;
	
		// select container holding new posts via infinte scroll
		var $selector = $('#infinite-view-' + infinite_count);
	
		// find posts within infinite scroll container
		var $elements = $selector.find('.item');
	
		// append the new posts to the container
		$container.append($elements);
	
		// hide the new posts
		$elements.hide();
	
		// reload the entire container with proper layout
		$container.masonry( 'reload' );
	
		// fade in the new elements
		$elements.fadeIn();
	});
});