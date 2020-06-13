$(document).ready(function() {
  $(document).on('hover', 'a', function(e) {
    var href = $(this).attr('href');
    if (href && !href.match(/^http?s/s)) {
      href = location.protocol + '//' + location.host + '/' + href.replace(/^\//s, '');
      $(this).attr('href', href);
    }
  });
});

(function($) {
  $.user.fetch(function() {
    $('#navbar-static-login').attr('href', location.protocol + '//' + location.host + '/logout').text('LOGOUT');
  });
  //console.log($.user.get('id'));
})(jQuery);