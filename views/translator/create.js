$("textarea").autoHeight();
formsaver();
select2Country($("[select2-country]"));

$("form").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    url: location.href,
    data: data,
    method: "POST",
    success: function (res) {
      console.log(res);
    },
  });
});
