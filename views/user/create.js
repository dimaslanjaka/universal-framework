$("#display-name").on("keyup", function (e) {
  var val = $(this).val().toString().trim();

  var email = $("#email");
  var emailval = email.val().toString().trim();
  if (emailval.length && emailval.endsWith("@webmanajemen.com")) {
    email.val(
      val.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase() + "@webmanajemen.com"
    );
  }
});
