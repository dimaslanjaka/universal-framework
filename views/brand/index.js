(function () {
  var manageBrandTable = $("#manageBrandTable").DataTable({
    responsive: true,
    ajax: {
      url: "/brand/fetch",
      dataSrc: "",
    },
    order: [],
    columns: [
      { data: "brand_name", title: "Name" },
      { data: "brand_active", title: "Active" },
      { data: "brand_status", title: "Status" },
      {
        data: "brand_id",
        render: function (data) {
          return `<div class="btn-group"><a href="/brand/edit?id=${data}" class="btn btn-sm btn-info"><i class="fas fa-pen"></i></a><a class="btn btn-sm btn-danger" id="delete-brand-${data}" data-id="${data}"><i class="fas fa-trash"></i></a></div>`;
        },
        title: "Actions",
      },
    ],
  });

  $(document).on("click", "[id^=delete-brand-]", function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    alert(id);
  });
})();
