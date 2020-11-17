var manageProducerTable = $("#manageProducerTable").DataTable({
  paging: true,
  lengthChange: true,
  searching: true,
  ordering: true,
  info: true,
  autoWidth: true,
  lengthMenu: [
    [5, 10, 20, -1],
    [5, 10, 50, "More"],
  ],
  dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',
  buttons: {
    dom: {
      container: {
        tag: "div",
        className: "flexcontent",
      },
      buttonLiner: {
        tag: null,
      },
    },

    buttons: [
      {
        text: '<i class="fa fa-plus"></i>Add',
        title: "Add",
        titleAttr: "Add Category",
        className: "btn btn-app export notranslate add",
        action: function (e, dt, node, config) {
          location.href = "/producer/add";
        },
      },
      {
        extend: "copyHtml5",
        text: '<i class="fa fa-clipboard"></i>Copy',
        title: "Copy table to clipboard",
        titleAttr: "Copy",
        className: "btn btn-app export notranslate barras",
        exportOptions: {
          columns: [0, 1],
        },
      },
      {
        extend: "pdfHtml5",
        text: '<i class="fa fa-file-pdf"></i>PDF',
        title: "Export table to PDF",
        titleAttr: "PDF",
        className: "btn btn-app export notranslate pdf",
        exportOptions: {
          columns: [0, 1],
        },
        customize: function (doc) {
          doc.styles.title = {
            color: "#4c8aa0",
            fontSize: "30",
            alignment: "center",
          };
          (doc.styles["td:nth-child(2)"] = {
            width: "100px",
            "max-width": "100px",
          }),
            (doc.styles.tableHeader = {
              fillColor: "#4c8aa0",
              color: "white",
              alignment: "center",
            }),
            (doc.content[1].margin = [100, 0, 100, 0]);
        },
      },
      {
        extend: "excelHtml5",
        text: '<i class="fa fa-file-excel"></i>Excel',
        title: "Export table to excel",
        titleAttr: "Excel",
        className: "btn btn-app export notranslate excel",
        exportOptions: {
          columns: [0, 1],
        },
      },
      {
        extend: "csvHtml5",
        text: '<i class="fa fa-file-csv"></i>CSV',
        title: "Export table to CSV",
        titleAttr: "CSV",
        className: "btn btn-app export notranslate csv",
        exportOptions: {
          columns: [0, 1],
        },
      },
      {
        extend: "print",
        text: '<i class="fa fa-print"></i>Print',
        title: "Print table",
        titleAttr: "Imprimir",
        className: "btn btn-app export notranslate imprimir",
        exportOptions: {
          columns: [0, 1],
        },
      },
      {
        extend: "colvis",
        text: '<i class="fa fa-eye"></i>Toggle',
        title: "Toggle visibility",
        titleAttr: "toggle",
        className: "btn btn-app export notranslate visibility",
      },
      {
        extend: "pageLength",
        titleAttr: "Registros a mostrar",
        className: "selectTable notranslate",
      },
    ],
  },
  ajax: {
    url: "/producer/fetch",
    dataSrc: "",
  },
  order: [],
  columns: [
    { data: "name", title: "Name" },
    { data: "address", title: "Address" },
    { data: "telp", title: "Telephone" },
    {
      data: "id",
      render: function (data) {
        return `<div class="btn-group"><a href="/producer/edit?id=${data}" class="btn btn-sm"><i class="fas fa-pen"></i></a><a class="btn btn-sm" id="delete-producer-${data}" data-id="${data}" title="Disable" disabled><i class="fas fa-ban"></i></a></div>`;
      },
      title: "Actions",
    },
  ],
});
