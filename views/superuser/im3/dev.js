$(document).ready(function() {
  $(document).on('submit', 'form', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    //console.log(data);
    var action = $(this).attr('action');
    var method = $(this).attr('method');
    var form = $(this);
    var success = form.data('callback');
    var failed = form.data('fail-callback');
    var complete = form.data('complete-callback');
    $.ajax({
      url: action,
      method: method,
      data: data,
      headers: {
        'Accept': 'application/json'
      },
      success: function(res) {
        gexec('im3ApiSimulation');
        console.log(res);
      }
    });
  });
});

$('textarea').keyup(function(event) {
  var text = $(this).val();
  text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
  $("[result-header]").html(text);
});