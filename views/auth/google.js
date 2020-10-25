$(document).ready(function () {
  $.ajax({
    url: "",
    method: "post",
    data: {
      info: "true",
    },
    success: function (data, status) {
      if (typeof data == "object") {
        if (data.hasOwnProperty("auth")) {
          $(".btn-google").attr({
            href: data.auth,
            newtab: "true",
          });
        }
        if (data.hasOwnProperty("credential")) {
          var user = data.credential;
          if (framework().count(user)) {
            console.log(user);
            var tb = new ctable();
            tb.create("id", "userdata", ["Key", "Value"]);
            for (const key in user) {
              if (user.hasOwnProperty(key)) {
                const element = user[key];
                tb.add("id", [key, element]);
              }
            }
            load_datatables(function () {});
          }
        }
      }
    },
  });
});
