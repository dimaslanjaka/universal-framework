$("form").on("submit", function (e) {
    e.preventDefault();
});

$("textarea,input,select").each(function (i, el) {
    new formSaver2(el, false);
});
