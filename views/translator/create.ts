// noinspection JSAnnotator
/// <reference path="../../src/MVC/themes/assets/js/app.d.ts" />

$("textarea").autoHeight();
formsaver();
select2Country($("[select2-country]"));
$("form").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    url: location.href,
    data: data,
    success: function (res) {
      console.log(res);
    },
  });
});
