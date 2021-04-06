var timerx;
$("#blog-set").on("change focusout", function (e) {
  var url = $(this).val().trim();
  clearTimeout(timerx);
  if (framework().isURL(url) || url.endsWith("blogspot.com")) {
    timerx = setTimeout(() => {
      $.ajax({
        url: location.href,
        method: "post",
        data: {
          "set-blog": url,
        },
        proxy: false,
      });
    }, 500);
  }
});

formsaver();
