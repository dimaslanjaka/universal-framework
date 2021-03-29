var timerx;
$("#blog-set").on("change", function (e) {
  var url = $(this).val();
  clearTimeout(timerx);
  timerx = setTimeout(() => {
    $.ajax({
      url: location.href,
      method: "post",
      data: {
        "set-blog": url,
      },
    });
  }, 500);
});

smartform();
