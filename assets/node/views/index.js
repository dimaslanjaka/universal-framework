/**
 * @type {{local:[],global:[]}}
 */
var packages = null;
$(document).ready(function () {
  $.ajax({
    url: "/fetch",
    success: function (data, textStatus, jqXHR) {
      var result = {
        local: [],
        global: [],
      };
      if (
        typeof data == "object" &&
        data.hasOwnProperty("local") &&
        data.hasOwnProperty("global")
      ) {
        if (data.local.hasOwnProperty("dependencies")) {
          for (const key in data.local.dependencies) {
            if (data.local.dependencies.hasOwnProperty(key)) {
              const info = data.local.dependencies[key];
              result.local.push({ name: key, version: info.version });
            }
          }
        }
        if (data.global.hasOwnProperty("dependencies")) {
          for (const key in data.global.dependencies) {
            if (data.global.dependencies.hasOwnProperty(key)) {
              const info = data.global.dependencies[key];
              result.global.push({ name: key, version: info.version });
            }
          }
        }
      }
      packages = result;
      console.log(packages.local);
      renderDatatables();
    },
  });
});

function renderDatatables() {
  $("#local").DataTable({
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
    data: packages.local,
    columns: [
      { title: "package", data: "name" },
      { title: "installed", data: "version" },
    ],
  });
  $(".mdb-select").not(".select-wrapper").materialSelect();
  $(".dt-button").addClass("btn btn-primary btn-sm");
}
