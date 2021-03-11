const makeid = function (length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
$("#submit-ticket").on("submit", function (e) {
  e.preventDefault();
  $(this).attr("id", makeid(5));
  var formid = $(this).attr("id");

  var formdata = $(this).serialize();

  $.ajax({
    url: "/public/halaman/ticketrecord",
    data: formdata,
    method: "POST",
    success: function (res) {
      toastr.success("Ticket submitted successfully", "Ticket information");
      var form = document.getElementById(formid);
      var allElements = form.elements;
      for (var i = 0, l = allElements.length; i < l; ++i) {
        // allElements[i].readOnly = true;
        allElements[i].disabled = true;
      }
    },
    error: function (e) {
      toastr.error("Ticket submit failed", "Ticket information");
    },
  });
});

$("[data-location]").on("click", function (e) {
  e.preventDefault();
  location.href = $(this).data("location");
});

(function () {
  smartform();
});
