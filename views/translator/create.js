// noinspection JSAnnotator
/// <reference path="../../src/MVC/themes/assets/js/app.d.ts" />
$("textarea").autoHeight();
formsaver();
select2Country($("[select2-country]"));
$("form").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
});
