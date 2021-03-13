/*
 * Copyright (c) 2015 kentooz
 * Kentooz Theme Custom Javascript
 */
 
var $ = jQuery.noConflict();

(function( $ ) {
	/* http://www.w3schools.com/js/js_strict.asp */
	"use strict";
	
$( document ).ready( function () {
// JS TOOLTIPS
	$('ul.ktz-socialicon a, ul.sharethis a, .ktz-gallery a').tooltip({placement: 'top'});
	$('ul.icon-author a').tooltip({placement: 'bottom'});
	$('a[rel=tooltip]').tooltip();

// JS TABS - Select first tab in shortcode
	$('#ktztab a:first, #kentooz-comment a:first').tab('show'); 
	
// Back to top	
	var $scrolltotop = $("#ktz-backtotop");
	$scrolltotop.css('display', 'none');
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$scrolltotop.slideDown('fast');
			} else {
				$scrolltotop.slideUp('fast');
			}
		});
		$scrolltotop.click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 'fast');
			return false;
		});
	});
// JS SELECT NAV FOR SMALL SCREEN
	$('#topmenu').slicknav({
		prependTo:'.ktz-mobilemenu'
	});
// SUPERFIST
	$('ul#topmenu').superfish({
		delay:       1000,
		animation:     {opacity:'show'},
		animationOut:  {opacity:'hide'},  
		speed:       'fast',
		cssArrows:     true
	});
// FB Script
	(function(w, d, s) {
	function go(){
		var js, fjs = d.getElementsByTagName(s)[0], load = function(url, id) {
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); 
			js.src = url; 
			js.id = id;
			js.async = true;
			fjs.parentNode.insertBefore(js, fjs);
		};
		load('//connect.facebook.net/en_US/all.js#xfbml=1', 'fbjssdk');
		load('//apis.google.com/js/plusone.js', 'gplus1js');
		load('//platform.twitter.com/widgets.js', 'tweetjs');
	}
	if (w.addEventListener) { w.addEventListener("load", go, false); }
	else if (w.attachEvent) { w.attachEvent("onload",go); }
	}(window, document, 'script'));
}); // End document Ready
})(jQuery);
