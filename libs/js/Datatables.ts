/**
 * Datatables loader
 * @param callback
 */
function load_datatables(callback: Function) {
  LoadScript(
    [
      "/assets/mdb-dashboard/js/addons/datatables.min.js",
      "/assets/mdb-dashboard/js/addons/datatables-select.min.js",
      //"/node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js",
      "/node_modules/datatables.net-rowreorder/js/dataTables.rowReorder.min.js",
      "/node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
      "/node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
      "/node_modules/datatables.net-buttons/js/buttons.print.min.js",
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
      datatables_init().then(function () {
        var dtl = $(".dataTables_length");
        var toolbar = $("div.dt-toolbar");
        var button = $("button.dt-button").not(".btn");
        setTimeout(function () {
          if (button.length) {
            button.addClass("btn btn-info");
          }
          if (dtl.length) {
            dtl.addClass("bs-select");
          }
          if (toolbar.length) {
            toolbar.html(``);
          }
        }, 5000);
        if (typeof callback == "function") {
          callback();
        }
      });
    }
  );
}

var datatables_ignited = false;
/**
 * Datatables init
 * @todo disable error warning
 * @todo add refresh button
 */
function datatables_init() {
  return new Promise(function (resolve, reject) {
    if (datatables_ignited) {
      console.error("datatables already ignited");
    } else if (typeof jQuery.fn.dataTable != "undefined") {
      jQuery.fn.dataTable.ext.errMode = "none";
      jQuery.fn.dataTable.ext.buttons.refresh = {
        extend: "collection",
        text: '<i class="fas fa-sync"></i>',
        className: "btn btn-info",
        action: function (e, dt, node, config) {
          dt.clear().draw();
          dt.ajax.reload();
        },
      };
      console.info("datatables ignited successfully");
      datatables_ignited = true;
    }
    resolve();
  });
}

/**
 * Scroll up after click pagination dt
 * @param target
 */
function pagination_up(target: JQuery) {
  if (!(target instanceof jQuery)) {
    return console.error(
      getFuncName() + " target element not instance of jQuery"
    );
  }
  target.on("page.dt", function () {
    $("html, body").animate(
      {
        scrollTop: jQuery(".dataTables_wrapper").offset().top,
      },
      "slow"
    );

    $("thead tr th:first-child").focus().blur();
  });
}
