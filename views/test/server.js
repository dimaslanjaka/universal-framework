(function () {
  $.ajax({
    url: location.href,
    method: "POST",
    complete: function (res) {
      $("pre#server").html(JSON.stringify(res));
    },
  });
})();
$.ajax({
  url: location.href,
  method: "POST",
  complete: function (res) {
    $("pre#server").html(JSON.stringify(res));
  },
});
