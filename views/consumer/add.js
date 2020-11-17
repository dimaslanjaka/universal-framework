$(document).on("submit", "form", function (e) {
  e.preventDefault();
  jAjax({
    url: location.href,
    data: $(this).serialize(),
    method: "POST",
    success: function (res) {
      console.log(res);
      if (res.success) {
        toastr.success("Update Successful", "Success");
        location.href = "/consumer";
      } else {
        toastr.error("Update Failed", "Failed");
      }
    },
  });
});
