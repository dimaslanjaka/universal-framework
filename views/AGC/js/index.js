// Run this function once!
function slider() {
	//  Get time (interval) from each carousel-item
	var duration = $('div.carousel-inner')
		.find(".carousel-item.active")
		.data("interval");
	var t;
		clearTimeout(t);
	$("#myCarousel").carousel('pause');
	// Control direction using 'next or 'prev'
	t = setTimeout("$('#myCarousel').carousel('next');", duration);

	// BS Alert to show time to next slide, not needed
	var sec = (duration/1000); // show seconds, not milliseconds
	$("#time").html('Next slide in ' + sec + ' seconds');
	$('#timed-alert').fadeIn(50).delay(2000).fadeOut(50);
	// End Alert

//	console.log('Next slide in ' + sec +' seconds');
}
slider();

// Run over and over...
$("#myCarousel").on("slid.bs.carousel", function() {
	// setTimeout MUST see milliseconds NOT seconds
	var duration = $(this)
		.find("div.carousel-item.active")
		.data("interval");
	var t;
		clearTimeout(t);
	$("#myCarousel").carousel('pause');
	// Control direction using 'next or 'prev'
	t = setTimeout("$('#myCarousel').carousel('next');", duration);

	$(".carousel-control-next").on("click", function() {
		clearTimeout(t);
		$('#timed-alert').hide();
	});

	$(".carousel-control-prev").on("click", function() {
		clearTimeout(t);
		$('#timed-alert').hide();
	});

	// BS Alert to show time to next slide, not needed
	var sec = (duration/1000); // show seconds, not milliseconds
	$("#time").html('Next slide in ' + sec + ' seconds');
	$('#timed-alert').fadeIn(50).delay(2000).fadeOut(50);
	// End Alert

	//	console.log('Next slide in ' + sec +' seconds');

});
