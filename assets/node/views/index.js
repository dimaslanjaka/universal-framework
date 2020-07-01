/**
 * @type {{local:[],global:[]}}
 */
var packages = {
  local: [],
  global: [],
};
$(document).ready(function () {});

datatables_init();
function renderDatatables() {
  $("#local").DataTable({
    destroy: true,
    dom: "Bfrtip",
    processing: false,
    serverSide: true,
    stateSave: false,
    autoWidth: false,
    responsive: true,
    deferRender: true,
    paging: true,
    lengthMenu: [5, 10, 15, 20, 25, 30, 100, 200, 300, 400, 500, "All"],
    ajax: {
      url: "/fetch",
      method: "POST",
      data: { local: "true" },
      success: function (data, textStatus, jqXHR) {
        if (typeof data == "object" && data.hasOwnProperty("dependencies")) {
          if (data.hasOwnProperty("dependencies")) {
            for (const key in data.dependencies) {
              if (data.dependencies.hasOwnProperty(key)) {
                const info = data.dependencies[key];
                packages.local.push({ name: key, version: info.version });
              }
            }
          }
        }

        console.log(packages);
        return packages.local;
      },
    },
    columns: [
      { title: "package", data: "name" },
      { title: "installed", data: "version" },
    ],
  });
  $(".mdb-select").not(".select-wrapper").materialSelect();
  $(".dt-button").addClass("btn btn-primary btn-sm");
}
