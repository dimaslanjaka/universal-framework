$('form#lgn').submit(function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.post(location.href, data, function (res) {
    if (res && typeof res == 'object' && res.hasOwnProperty('success') && res.success) {
      toastr.success('login successfully', 'login information');
      location.replace(location.protocol + '//' + location.host + '/dashboard');
    }
  });
});