$(document).ready(function () {
  $.ajax({
    url: "clean",
    method: "POST",
    data: {
      latest: "true",
    },
    success: function (res) {
      if (typeof res == "object") {
        if (res.hasOwnProperty("result")) {
          $("#lfile").html(res.result[0]);
          $("#ltime").html(res.result[1]);
        }
      }
    },
  });
});

function genCacheKey() {
  $("#keyCache").val(uuidv4());
}
