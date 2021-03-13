jQuery(window).on ('load', function () {
  setTimeout (function() {
//    var google_auto_placed = jQuery ('.google-auto-placed ins ins iframe');
    var google_auto_placed = jQuery ('.google-auto-placed ins ins ins, .google-auto-placed ins ins iframe');
    google_auto_placed.before ('<section class=\"ai-debug-bar ai-debug-adsense ai-adsense-auto-ads\">' + ai_front.automatically_placed + '</section>');
  }, 50);
});
