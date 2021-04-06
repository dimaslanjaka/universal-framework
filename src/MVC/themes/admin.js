if (typeof jQuery != "undefined") {
  //console.log("jquery loaded");
  var admt = $("form[id^='meta-admin-toolbox-']");

  if (admt.length) {
    admt.on("submit", function (e) {
      e.preventDefault();
      var t = $(this);
      $.ajax({
        url: location.href,
        method: "POST",
        headers: {
          "Save-Metadata": "true",
        },
        data: t.serialize(),
      });
    });
  }
  $("#meta-thumbnail").on("change", function (e) {
    document
      .getElementById("thumb-preview")
      .setAttribute("src", $(this).val().trim());
  });
} else {
  //console.error("jquery not loaded");
}
