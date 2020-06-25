if (!isnode()) {
  if (typeof jQuery.fn.dataTable != "undefined") {
    $.fn.dataTable.ext.errMode = "none";
    $.fn.dataTable.ext.buttons.refresh = {
      extend: "collection",
      text: '<i class="fas fa-sync"></i>',
      className: "btn btn-info",
      action: function (e, dt, node, config) {
        dt.clear().draw();
        dt.ajax.reload();
      },
    };
    setTimeout(function () {
      $("button.dt-button").not(".btn").addClass("btn btn-info");
    }, 5000);
  }
}

/**
 * Datatables loader
 * @param callback
 */
async function load_datatables(callback: Function) {
  LoadScript(
    [
      "/assets/mdb-dashboard/js/addons/datatables.min.js",
      "/node_modules/datatables.net-rowreorder/js/dataTables.rowReorder.min.js",
      "/node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js",
      "/assets/mdb-dashboard/js/addons/datatables-select.min.js",
      "/node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
      "/node_modules/datatables.net-buttons/js/buttons.print.min.js",
      "/node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
    ],
    function () {
      loadCSS(
        [
          "/src/MVC/themes/assets/partial/datatables.min.css",
          "/assets/mdb-dashboard/css/addons/datatables-select.min.css",
          "/assets/mdb-dashboard/css/addons/datatables.min.css",
          "https://cdn.datatables.net/responsive/2.2.5/css/responsive.dataTables.min.css",
          "https://cdn.datatables.net/rowreorder/1.2.7/css/rowReorder.dataTables.min.css",
        ],
        null
      );
      if (typeof callback == "function") {
        callback();
      }
    }
  );
}
