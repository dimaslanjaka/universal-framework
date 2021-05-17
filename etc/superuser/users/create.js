// register user
if ($("form#regist").length) {
  $("form#regist").submit(function (e) {
    e.preventDefault();
    $.post(
      location.protocol + "//" + location.host + "/signup",
      $(this).serialize(),
      function (res) {
        if (res) {
          if (typeof res == "object") {
            if (res.hasOwnProperty("success") && res.success) {
              toastr.success(
                "User created successfully".capitalize(),
                "user management".toUpperCase()
              );
            }
          }
        }
      }
    );
  });
}
