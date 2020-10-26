(function () {
  $(document).on("submit", "form", function (e) {
    e.preventDefault();
    var t = $(this);
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

  //recaptcha().set_key("6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie");
  //recaptcha().init();
  // activate smartform whole documents
  smartform();
})();
