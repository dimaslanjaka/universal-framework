var timerx;
$("#blog-set").on("change focusout", function (e) {
  var url = $(this).val();
  clearTimeout(timerx);
  if (
    framework().isURLReachable("https://cors-anywhere.herokuapp.com/" + url)
  ) {
    timerx = setTimeout(() => {
      $.ajax({
        url: location.href,
        method: "post",
        data: {
          "set-blog": url,
        },
      });
    }, 500);
  } else {
    toastr.error("URL INVALID", "INFO");
  }
});

formsaver();
