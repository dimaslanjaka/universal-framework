var table;
$(document).ready(function () {
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
});

function loadDT() {
  table = $("#list").DataTable({
    destroy: true,
    //dom: "Bfrtip",
    processing: false,
    serverSide: true,
    stateSave: false,
    autoWidth: false,
    responsive: true,
    deferRender: true,
    paging: true,
    lengthMenu: [10, 20, 30, 40, 50, 100, 200, 300, 400, 500, "All"],
    ajax: {
      url: "list-posts-json",
      method: "GET",
      data: {
        uid: guid(),
      },
      dataSrc: function (res) {
        console.log(res);

        return res.data;
      },
    },
    columnDefs: [
      {
        targets: 0,
        title: "Title",
        data: "title",
        render: function (data, type, row, meta) {
          //console.log(row);

          return `${data} <a href="${row.url}" target="viewArticle" onclick="openInNewTab(this)"><i class="fas fa-external-link"></i></a>`;
        },
      },
      {
        targets: 1,
        title: "Labels",
        data: "labels",
        /**
         * Render Labels
         * @param {Array} data
         * @param type
         * @param row
         * @param meta
         * @returns {string}
         */
        render: function (data, type, row, meta) {
          return `<div data-label="${JSON.stringify(data)}">${data.join(
            ", "
          )}</div>`;
        },
      },
    ],
  });
  table.on("init.dt", function () {
    $(this).removeClass("table-loader").show();
  });
}
