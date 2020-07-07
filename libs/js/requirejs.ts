const requirejs_vendor = "/node_modules";
const require_config: RequireConfig = {
  paths: {
    app: "../require",
    jquery: requirejs_vendor + "/jquery/dist/jquery.min",
    "jquery-ui": "//code.jquery.com/ui/1.11.4/jquery-ui",
    "jquery-migrate": "//code.jquery.com/jquery-migrate-git.min",

    //DataTables
    "datatables.net":
      requirejs_vendor + "/datatables.net/js/jquery.dataTables.min",
    "datatables.net-bs4":
      requirejs_vendor + "/datatables.net-bs4/js/datatables.bootstrap4.min",
    "datatables.net-autofill":
      requirejs_vendor + "/datatables.net-autofill/js/dataTables.autoFill.min",
    "datatables.net-buttons":
      requirejs_vendor + "/datatables.net-buttons/js/dataTables.buttons.min",
    "datatables.net-buttons-html5":
      requirejs_vendor + "/datatables.net-buttons/js/buttons.html5.min",
    "datatables.net-buttons-flash":
      requirejs_vendor + "/datatables.net-buttons/js/buttons.flash.min",
    "datatables.net-buttons-print":
      requirejs_vendor + "/datatables.net-buttons/js/buttons.print.min",
    "datatables.net-colreorder":
      requirejs_vendor +
      "/datatables.net-colreorder/js/dataTables.colReorder.min",
    "datatables.net-rowreorder":
      requirejs_vendor +
      "/datatables.net-rowreorder/js/dataTables.rowReorder.min",
    "datatables.net-scroller":
      requirejs_vendor + "/datatables.net-scroller/js/dataTables.scroller.min",
    "datatables.net-select":
      requirejs_vendor + "/datatables.net-select/js/dataTables.select.min",
    "datatables.net-responsive":
      requirejs_vendor +
      "/datatables.net-responsive/js/dataTables.responsive.min",
    "datatables.net-editor":
      "https://editor.datatables.net/extensions/Editor/js/dataTables.editor.min",

    //select2
    select2: requirejs_vendor + "/select2/dist/js/select2.full.min",
  },
  shim: {
    /**
     * jQuery Compatibility
     */
    jquery: {
      exports: "$",
    },
    "datatables.net": {
      deps: ["jquery"],
    },
  },
  css: {
    select2: requirejs_vendor + "/select2/dist/css/select2.min",
  },
};
interface RequireConfig {
  css: object;
}
const dtpackage = function () {
  return [
    "datatables.net",
    "datatables.net-colreorder",
    "datatables.net-rowreorder",
    "datatables.net-scroller",
    "datatables.net-select",
    "datatables.net-buttons",
    "datatables.net-buttons-html5",
  ];
};

var requirejs_ignited = false;
if (!isnode()) {
  function downloadRequireJS(win?, event?) {
    return new Promise(function (resolve) {
      console.log(`Loading RequireJS using`, event);
      if (!requirejs_ignited) {
        var element = document.createElement("script");
        element.src = "/node_modules/requirejs/require.js";
        element.onload = element.onreadystatechange = function () {
          if (typeof requirejs != "undefined") {
            console.log("requirejs ignited and loaded successfuly");
            requirejs.config(require_config);
          }
          resolve(true);
        };
        document.body.appendChild(element);
      }
    });
  }
}

/**
 * Load requirejs
 */
function load_requirejs() {
  if (!requirejs_ignited) {
    console.info("RequireJS not loaded, loading them now");
    return downloadRequireJS();
  } else {
    console.info("RequireJS already ignited");
  }
}

/**
 * Load Modules From node_modules folder
 * @param name
 * @param callback
 */
function load_module(name: string | string[], callback: Function) {
  if (typeof name == "string") {
    name = [name];
  }
  var scripts_List = [];
  var style_List = [];

  for (const key in require_config.paths) {
    if (require_config.paths.hasOwnProperty(key)) {
      const element = require_config.paths[key];
      if (name.includes(key)) {
        scripts_List.push(element + ".js");
        if (require_config.css.hasOwnProperty(key)) {
          style_List.push(require_config.css[key] + ".css");
        }
      }
    }
  }
  //console.log(scripts_List);
  if (!style_List.length) {
    LoadScript(scripts_List, callback);
  } else {
    LoadScript(scripts_List, function () {
      loadCSS(style_List, callback);
    });
  }
}

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
    } else {
      if (typeof jQuery.fn.dataTable != "undefined") {
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
      } else {
        console.error("Datatables not loaded");
      }
    }
    resolve();
  });
}

var optimized_ids = [];
/**
 * Optimize Material Datatables
 * @param id id table
 * @param callback additional function to optimizer
 */
function datatables_optimize(id: string, callback?: Function) {
  if (optimized_ids.includes(id)) {
    console.error(`Datatables #${id} already optimized`);
    return;
  }
  optimized_ids.push(id);
  $("#" + id + "_wrapper")
    .add("#pkgList_wrapper")
    .find("label")
    .each(function () {
      $(this).parent().append($(this).children());
    });
  $("#" + id + "_wrapper .dataTables_filter")
    .find("input")
    .each(function () {
      const $this = $(this);
      $this.attr("placeholder", "Search");
      $this.removeClass("form-control-sm");
    });
  $("#" + id + "_wrapper .dataTables_length")
    .add("#pkgList_wrapper .dataTables_length")
    .addClass("d-flex flex-row");
  $("#" + id + "_wrapper .dataTables_filter")
    .add("#pkgList_wrapper .dataTables_filter")
    .addClass("md-form");
  $("#" + id + "_wrapper select")
    .add("#pkgList_wrapper select")
    .removeClass("custom-select custom-select-sm form-control form-control-sm");
  $("#" + id + "_wrapper select")
    .add("#pkgList_wrapper select")
    .addClass("mdb-select");
  if (typeof $.fn.materialSelect == "function") {
    $("#" + id + "_wrapper .mdb-select")
      .add("#pkgList_wrapper .mdb-select")
      .materialSelect();
  }
  $("#" + id + "_wrapper .dataTables_filter")
    .add("#pkgList_wrapper .dataTables_filter")
    .find("label")
    .remove();
  if (typeof callback == "function") {
    callback();
  }
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

/**
 * Optimize Datatables Columns Options
 * @param data
 * @param exclude
 */
function datatables_colums_options(
  data?: DataTables.ColumnSettings,
  exclude?: string[]
) {
  if (
    !data.hasOwnProperty("defaultContent") &&
    exclude &&
    !exclude.includes("defaultContent")
  ) {
    data.defaultContent = "<i>Not set</i>";
  }
  if (
    !data.hasOwnProperty("render") &&
    exclude &&
    !exclude.includes("render")
  ) {
    data.render = function (data, type, row, meta) {
      if (["string", "number"].includes(typeof data) || Array.isArray(data)) {
        if (!data.length) {
          return data.defaultContent;
        }
      }
      if (!data) {
        return data.defaultContent;
      } else {
        return data;
      }
    };
  }
}
