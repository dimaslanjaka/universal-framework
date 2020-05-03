$(document).on('hover', 'a', function(e) {
  var href = $(this).attr('href');
  if (href && !href.match(/^http?s/s)) {
    href = location.protocol + '//' + location.host + '/' + href.replace(/^\//s, '');
    $(this).attr('href', href);
  }
});
$.post(location.protocol + '//' + location.host + '/signin', {
  check: 1
}, function(res) {
  if (typeof res != 'object'){
    return;
  }
  console.log(res, res.hasOwnProperty('username'));
  if (res) {
    if (res.hasOwnProperty('username')) {
      $('#navbar-static-login').attr('href', location.protocol + '//' + location.host + '/logout').text('LOGOUT');
    }
  }
});