const requirejs_vendor = "/node_modules";
const require_config: RequireConfig = {
  paths: {
    app: "../require",
    jquery: [
      "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min",
      requirejs_vendor + "/jquery/dist/jquery.min",
    ],
    "jquery-ui": "//code.jquery.com/ui/1.11.4/jquery-ui",

    //DataTables core
    "datatables.net":
      requirejs_vendor + "/datatables.net/js/jquery.dataTables.min",

    //Dependencies
    "datatables.net-autofill":
      requirejs_vendor + "/datatables.net-autofill/js/dataTables.autoFill.min",
    "datatables.net-editor":
      requirejs_vendor + "/datatables.net-editor/js/dataTables.editor.min",
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
      exports: "$",
    },
  },
};

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

if (!isnode()) {
  function downloadRequireJS() {
    var element = document.createElement("script");
    element.src = "/node_modules/requirejs/requirejs.js";
    document.body.appendChild(element);
  }
  if (window.addEventListener)
    window.addEventListener("load", downloadRequireJS, false);
  else if (window.attachEvent) window.attachEvent("onload", downloadRequireJS);
  else window.onload = downloadRequireJS;
  requirejs.config(require_config);
}
