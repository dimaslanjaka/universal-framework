$(document).ready(function() {
  $(document).on('submit', 'form', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      url: location.href,
      data: data,
      method: 'post',
      success: function(res) {
        $('#md5r').html(res.result);
      }
    });
  });

  $('[name="md5"]').on('keyup', function(e) {
    e.preventDefault();
    $(this).closest('form').trigger('submit');
  });
});