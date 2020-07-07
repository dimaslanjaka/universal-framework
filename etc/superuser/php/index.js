$('#clean_log').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: location.href,
    method: 'DELETE',
    headers: {
      'Log': 'php'
    },
    complete: function(xhr, status) {
      if (status == 'success') {
        location.reload();
      }
    }
  });
});