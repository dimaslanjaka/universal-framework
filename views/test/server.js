(function () {
  jAjax({
    url: location.href,
    method: "POST",
    complete: function (res) {
      $("pre#server").html(JSON.stringify(res.responseJSON, null, 4));
    },
  });
})();
