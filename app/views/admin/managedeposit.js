function detaildeposit(id) {
  $(".modal-title").html(`Detail deposit ` + id + ``);
  $.ajax({
    url: url.concat("admin/detaildeposit"),
    type: "post",
    dataType: "html",
    data: {
      id: id,
    },

    success: function (result) {
      $(".bodymodaldetail").html(result);
    },
  });
}

function editdeposit(id) {
  var status = $(".statusdeposit").val();

  console.log(status);
}
