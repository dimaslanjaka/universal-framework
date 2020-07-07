// increase limit
$(document).on("change", 'form[id^="max"]', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    url: location.href,
    data: data,
    method: "post",
    success: function (res) {
      if (res.hasOwnProperty("error")) {
        if (!res.error) {
          toastr.success("Limitation increased successfully", "Limit info");
        }
      }
    },
  });
});

// change user role
if ($('select[id^="role"]').length) {
  $('select[id^="role"]').change(function () {
    var id = $(this).data("id");
    var value = $(this).val();
    console.log(id, value);
    if (id && value) {
      $.post(
        location.protocol + "//" + location.host + "/user",
        {
          change: "role",
          id: id,
          value: value,
        },
        function (res) {
          if (res.hasOwnProperty("success") && res.success) {
            toastr.success(
              "Role changed successfully".capitalize(),
              "user management".toUpperCase()
            );
          }
        }
      );
    }
  });
}

// change user password
if ($('a[href="#change"]').length) {
  $('a[href="#change"]').click(function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your password",
          type: "text",
        },
      },
    }).then((value) => {
      if (value) {
        $.post(
          location.protocol + "//" + location.host + "/user",
          {
            change: "password",
            id: id,
            value: value,
          },
          function (res) {
            if (res.hasOwnProperty("success") && res.success) {
              toastr.success(
                "Password changed successfully",
                "user management"
              );
            }
          }
        );
      }
    });
  });
}

// delete user
if ($('a[href="#delete"]').length) {
  $('a[href="#delete"]').click(function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    swal({
      title: "Are you sure?".capitalize(),
      text: "Once deleted, you will not be able to recover this user!".capitalize(),
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.post(
          location.protocol + "//" + location.host + "/user",
          {
            id: id,
            delete: true,
          },
          function (res) {
            swal("Poof! User has been deleted!".capitalize(), {
              icon: "success",
            });
          }
        );
      } else {
        swal("User file is safe!");
      }
    });
  });
}

// datatables
if ($("#dtMaterial").length) {
  $(document).ready(function () {
    $("#dtMaterial").DataTable({
      destroy: true,
      dom: "Bfrtip",
      processing: false,
      serverSide: false,
      stateSave: false,
      autoWidth: false,
      responsive: true,
      deferRender: true,
      paging: true,
      lengthMenu: [5, 10, 15, 20, 25, 30, 100, 200, 300, 400, 500, "All"],
      buttons: ["refresh"],
    });
    $("#dtMaterial_wrapper")
      .add("#pkgList_wrapper")
      .find("label")
      .each(function () {
        $(this).parent().append($(this).children());
      });
    $("#dtMaterial_wrapper .dataTables_filter")
      .add("#pkgList_wrapper .dataTables_filter")
      .find("input")
      .each(function () {
        const $this = $(this);
        $this.attr("placeholder", "Search");
        $this.removeClass("form-control-sm");
      });
    $("#dtMaterial_wrapper .dataTables_length")
      .add("#pkgList_wrapper .dataTables_length")
      .addClass("d-flex flex-row");
    $("#dtMaterial_wrapper .dataTables_filter")
      .add("#pkgList_wrapper .dataTables_filter")
      .addClass("md-form");
    $("#dtMaterial_wrapper select")
      .add("#pkgList_wrapper select")
      .removeClass(
        "custom-select custom-select-sm form-control form-control-sm"
      );
    $("#dtMaterial_wrapper select")
      .add("#pkgList_wrapper select")
      .addClass("mdb-select");
    $("#dtMaterial_wrapper .mdb-select")
      .add("#pkgList_wrapper .mdb-select")
      .materialSelect();
    $("#dtMaterial_wrapper .dataTables_filter")
      .add("#pkgList_wrapper .dataTables_filter")
      .find("label")
      .remove();
  });
}
