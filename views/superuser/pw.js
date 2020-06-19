var req = null;
$("textarea#str").keyup(function (e) {
  e.preventDefault();
  var value = $(this).val();

  if (req == null){
    req = $.post(location.href, {
      e: value
    }, function (res) {
      $('textarea[name="encphp"]').val(res.result);
      var en = userJSEncrypt('dimaslanjaka', value);
      $('textarea[name="encjs"]').val(en);
    }).always(function(res){
      req = null;
    });
  }
});
$("textarea#encstr").keyup(function (e) {
  e.preventDefault();
  var value = $(this).val();

  if (req == null){
    req = $.post(location.href, {
      d: value
    }, function (res) {
      $('textarea[name="decjs"]').val(res.result);
      var en = userJSDecrypt('dimaslanjaka', value);
      $('textarea[name="decphp"]').val(en);
    }).always(function(res){
      req = null;
    });
  }
});