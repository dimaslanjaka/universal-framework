async_process(location.href);

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
      'Refresh-Cache': 'true'
    },
    success: function(response) {
      $("html").html($("html", response).html());
      console.log(xhr.responseURL);
    }
  });
}