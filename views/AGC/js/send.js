$(document).ready(function () {
  if (typeof TITLE != 'undefined' && typeof BODY != 'undefined') {
    $("button#send_mail").one('click', function () {
      $.post("/AGC/mail", {
        title: TITLE,
        body: BODY//.replace('s+c+r+i+p+t', 'script')//.replace(/\<\!\-{1,2}original\-{1,2}\>/gmi, '')
      }, function (data) {
        $("div#button_mail").html(data);
      });
    });
  }
});