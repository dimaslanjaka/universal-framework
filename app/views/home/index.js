window.onload = function () {
  if (typeof endpoint_ovo == "string" && endpoint_ovo.length > 10) {
    if (!checkCookie("ovo_test")) {
      $.get(endpoint_ovo, function (data) {
        if (typeof data.ovo_test == "boolean") {
          if (!data.ovo_test) {
            $("#metode-ovo").remove();
            toastr.error("Ovo Not Working!", "Payment Method");
          } else {
            toastr.success("Ovo Working!", "Payment Method");
            setCookie("ovo_test", getCookie("ip"), 5);
          }
        }
      });
    }
  }
};
