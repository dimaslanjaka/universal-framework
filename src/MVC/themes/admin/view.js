requirejs.config({
  appDir: ".",
  baseUrl: "js",
  paths: {
    /* Load jquery from google cdn. On fail, load local file. */
    'jquery': ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min'],
    /* Load bootstrap from cdn. On fail, load local file. */
    'bootstrap': ['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.0/js/bootstrap.min', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min'],
    'jquery-ui': ['https://code.jquery.com/ui/1.12.1/jquery-ui'],
    'toastr': ['https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min']
  },
  shim: {
    'jquery-ui': ['jquery']
  }
});
require(['jquery', 'jquery-ui', 'toastr'], function($, $_, toastr) {
  loadCss('//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
  loadCss('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css');
  $(function() {
    var autocompleteTags = JSON.parse(localStorage.getItem('autocomplete'));
    $("[autocomplete='true']").autocomplete({
      source: autocompleteTags,
      select: function(event, ui) {
        var label = ui.item.label;
        var value = ui.item.value;
        $("[autocomplete-result]").fadeOut('slow');
        var show = $("[autocomplete-result='" + value + "']");
        //console.log(show.length, "[autocomplete-result='" + value.replace(/(\/|\\){2,10}/gm, '/') + "']");
        if (show.length) {
          show.fadeIn('true');
        }
      }
    });
    $('form').on('submit', function(e) {
      e.preventDefault();
      var data = $(this).serialize();
      var url = $(this).attr('action');
      var method = $(this).attr('method') ? $(this).attr('method') : 'post';
      $.ajax({
        url: url,
        data: data,
        method: method,
        success: function(res) {
          if (typeof res == 'object'){
            if (res.hasOwnProperty('success')){
              toastr.success('configuration saved successfully', 'Save Configuration');
            }
          }
        }
      })
    })
  });
  return {};
});

function loadCss(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}