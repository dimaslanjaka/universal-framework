(function () {
  smartform();

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
          location.href = "/product";
        } else {
          toastr.error("Update Failed", "Failed");
        }
      },
    });
  });

  $(document).on(
    "keyup",
    "#inputProductName,#aliasInput",
    generateGenericNames
  );

  $("#imageUpload").change(function () {
    readURL(this);
  });

  setTimeout(generateGenericNames, 2500);
})();

/**
 * Generate generic names
 * @param {JQuery.Event} e
 */
function generateGenericNames(e) {
  $("#generic-name").text(
    `${$("#inputProductName").val()} (${$("#aliasInput").val()})`
  );
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#imagePreview").css(
        "background-image",
        "url(" + e.target.result + ")"
      );
      $("#imagePreview").hide();
      $("#imagePreview").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
