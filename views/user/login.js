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
  });
  //gexec('login');
});

recaptcha().set_key("6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie");
recaptcha().init();
// activate smartform whole documents
smartform();
