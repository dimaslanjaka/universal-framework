$(document).on("submit", "form", function (e) {
  e.preventDefault();
  var t = $(this);
  var s = t.data("success"),
    er = t.data("error"),
    c = t.data("complete");
  $.ajax({
    url: t.attr("action"),
    method: t.attr("method"),
    data: t.serialize(),
    success: function (res) {
      console.log(res);
    },
    proxy: false,
  });
  gexec("login");
});

var userdata = new user();
userdata.fetch(function (res) {
  if (typeof res == "object") {
    if (res.hasOwnProperty("username")) {
      toastr.success(`<a href='/user/dashboard'>Go to Dashboard</a>`, "You has logged in", { timeOut: 5000 });
      console.log(res);
    }
  }
});

// activate recaptcha
recaptcha().init();
// activate smartform whole documents
formsaver();
