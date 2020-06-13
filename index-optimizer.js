function async_process(source_cache) {
  var xhr = new XMLHttpRequest();
  $.ajax({
    url: source_cache,
    method: 'POST',
    silent: true,
    indicator: false,
    xhr: function() {
      return xhr;
    },
    headers: {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Cache-control': 'no-cache'
    },
    success: function(response) {
      $("html").html($("html", response).html());
      console.log(xhr.responseURL);
    }
  });
}