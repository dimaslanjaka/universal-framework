const vendor = "/node_modules";

class rjs {
  static init() {
    function downloadJSAtOnload() {
      var element = document.createElement("script");
      element.src = "/node_modules/requirejs/requirejs.js";
      document.body.appendChild(element);
    }
    if (window.addEventListener)
      window.addEventListener("load", downloadJSAtOnload, false);
    else if (window.attachEvent)
      window.attachEvent("onload", downloadJSAtOnload);
    else window.onload = downloadJSAtOnload;
  }
}

const require_config: RequireConfig = {
  paths: {
    app: "../require",
    jquery: [
      "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min",
      vendor + "/jquery/dist/jquery.min",
    ],
    "jquery-ui": "//code.jquery.com/ui/1.11.4/jquery-ui",

    //DataTables core
    "datatables.net": vendor + "/datatables.net/js/jquery.dataTables.min",

    //Dependencies
    "datatables.net-autofill":
      vendor + "/datatables.net-autofill/js/dataTables.autoFill.min",
    "datatables.net-editor":
      vendor + "/datatables.net-editor/js/dataTables.editor.min",
    "datatables.net-buttons":
      vendor + "/datatables.net-buttons/js/dataTables.buttons.min",
    "datatables.net-buttons-html5":
      vendor + "/datatables.net-buttons/js/buttons.html5.min",
    "datatables.net-buttons-flash":
      vendor + "/datatables.net-buttons/js/buttons.flash.min",
    "datatables.net-buttons-print":
      vendor + "/datatables.net-buttons/js/buttons.print.min",
    "datatables.net-colreorder":
      vendor + "/datatables.net-colreorder/js/dataTables.colReorder.min",
    "datatables.net-rowreorder":
      vendor + "/datatables.net-rowreorder/js/dataTables.rowReorder.min",
    "datatables.net-scroller":
      vendor + "/datatables.net-scroller/js/dataTables.scroller.min",
    "datatables.net-select":
      vendor + "/datatables.net-select/js/dataTables.select.min",
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

//rjs.init();
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
requirejs.config(require_config);
