$("#success").on("click", function (e) {
  e.preventDefault();
  jAjax({
    url: location.href,
    method: "post",
    data: {
      test: "success",
    },
    complete: function (res) {
      $("#result").html(JSON.stringify(res, null, 2));
    },
  });
});

$("#failed").on("click", function (e) {
  e.preventDefault();
  jAjax({
    url: location.href,
    method: "post",
    data: {
      test: "failed",
    },
    complete: function (res) {
      $("#result").html(JSON.stringify(res, null, 2));
    },
  });
});
