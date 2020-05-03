var authUrl = location.protocol + '//' + location.host + location.pathname + 'auth?json'.replace(/\/{3,99}/, '');
var alogin = $('a#glogin');
alogin.prop('disabled', true);
$.ajax({
  url: authUrl,
  method: 'POST',
  success: function(res) {
    if (typeof res == 'string') {
      res = JSON.parse(res);
    }
    if (res.hasOwnProperty('auth')) {
      alogin.add('#navbar-static-login').attr({
        href: res.auth,
        target: '_blank'
      });
    }
    if (res.hasOwnProperty('user_image')) {
      $('img#profile-photo').attr({
        src: res.user_image
      });
    }
    if (res.hasOwnProperty('user_first_name')){
      $('h4#profile-name').text(`${res.user_first_name} ${res.user_last_name}`);
    }
  },
  error: function(xhr) {
    toastr.error('fetch login status failed', 'login info');
  }
});