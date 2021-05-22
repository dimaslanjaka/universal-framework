$("textarea").autoHeight();
formsaver();
$("#slang").select2({
  placeholder: "Select Article Language",
});

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
