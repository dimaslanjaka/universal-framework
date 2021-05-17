jQuery(document).ready(function () {
  if (typeof warehouses != "undefined") {
    console.log(warehouses);
    load_module(
      [
        "datatables.net",
        "datatables.net-bs4",
        "datatables.net-colreorder",
        "datatables.net-rowreorder",
        "datatables.net-scroller",
        "datatables.net-select",
        "datatables.net-buttons",
        "datatables.net-buttons-html5",
      ],
      function () {
        loadCSS([
          "https://adminlte.io/themes/v3/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css",
          "https://adminlte.io/themes/v3/plugins/datatables-responsive/css/responsive.bootstrap4.min.css",
        ]);
        datatables_init().then(loadDT);
      }
    );
  }
  jQuery(document).on("change", "[id^=status-]", function (e) {
    e.preventDefault();
    const t = jQuery(this);
    var value = t.val();
    var target = t.attr("id").replace("status-", "");
    jQuery.ajax({
      url: "",
      method: "POST",
      data: {
        change: "true",
        warehouses: {
          status: value,
          id: target,
        },
        success: function (res) {
          console.log(res);
        },
      },
    });
  });
});

function loadDT() {
  if (jQuery("#dtMaterial").length) {
    /**
     * @type {any[]}
     */
    var datas = warehouses;
    datas.forEach(function (warehouse) {
      for (const key in warehouse) {
        if (warehouse.hasOwnProperty(key)) {
          const status = warehouse[key];
          if (key == "status") {
            warehouse[key] = `<div class="form-group">
            <select class="form-control" id="status-${warehouse.id}">
              <option value="active" ${
                status == "active" ? "selected" : false
              }>Active</option>
              <option value="inactive" ${
                status == "inactive" ? "selected" : false
              }>Inactive</option>
            </select>
            </div>`;
          }
        }
      }
    });

    // Activate an inline edit on click of a table cell
    jQuery("#dtMaterial").on("click", "tbody td:not(:first-child)", function (
      e
    ) {
      //editor.inline(this);
      var t = $(this);
      t.attr("contenteditable", "true");
    });
    jQuery("#dtMaterial").DataTable({
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
      buttons: [
        {
          text: '<i class="fas fa-sync"></i>',
          className: "btn btn-info",
          attr: {
            title: "Refresh warehouses",
            id: "reload-warehouse",
            "data-toggle": "tooltip",
          },
          action: function (e, dt, node, config) {
            location.reload(1);
          },
        },
        {
          text: '<i class="fas fa-plus"></i>',
          className: "btn btn-info",
          attr: {
            title: "Add New Warehouse",
            id: "add-warehouse",
            "data-toggle": "tooltip",
          },
          action: function (e, dt, node, config) {
            location.href = "add";
          },
        },
      ],
      data: datas,
      order: [[1, "asc"]],
      columns: [
        datatables_colums_options({
          title: "Code",
          data: "code",
        }),
        { title: "Name", data: "name" },
        { title: "City", data: "city" },
        { title: "State", data: "state" },
        { title: "Address", data: "address" },
        { title: "Status", data: "status" },
      ],
    });
    datatables_optimize("dtMaterial", function () {
      //jQuery(".dataTables_filter, .mdb-select").addClass("form-control");
    });
  }
}
