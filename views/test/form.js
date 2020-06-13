$(document).ready(function() {
  app.load('ajx');
  $(document).on('submit', 'form', function(event) {
    event.preventDefault();
    var t = $(this);
    $.ajax({
      indicator: true,
      url: t.attr('action') ? t.attr('action') : this.location.href,
      method: t.attr('method') ? t.attr('method') : 'POST',
      data: t.serialize(),
      success: function(res) {
        if (typeof res == 'object') {
          console.log(res);
        }
      }
    });
    return false;
  });
});