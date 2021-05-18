/// <reference path="../../libs/js/globals.d.ts" />
/// <reference path="../../libs/js/jQueryPlugin-formsaver.d.ts" />

$("textarea").autoHeight();
formsaver();
select2Country($("[select2-country]"));
$("form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  console.log(data);
});
