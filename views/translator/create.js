$("textarea").autoHeight();
formsaver();
$("#slang,#tolang").select2({
  placeholder: "Select Article Language",
  templateResult: function (data) {
    return $(`<span>${data.text}</span>`);
  },
  data: getIsoLangs(),
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
