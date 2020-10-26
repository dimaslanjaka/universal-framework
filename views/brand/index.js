(function () {
  var manageBrandTable = $("#manageBrandTable").DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: true,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 50, "Mostrar Todo"],
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
          extend: "copyHtml5",
          text: '<i class="fa fa-clipboard"></i>Copiar',
          title: "Copy table to clipboard",
          titleAttr: "Copiar",
          className: "btn btn-app export barras",
          exportOptions: {
            columns: [0, 1],
          },
        },

        {
          extend: "pdfHtml5",
          text: '<i class="fa fa-file-pdf"></i>PDF',
          title: "Export table to PDF",
          titleAttr: "PDF",
          className: "btn btn-app export pdf",
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
          className: "btn btn-app export excel",
          exportOptions: {
            columns: [0, 1],
          },
        },
        {
          extend: "csvHtml5",
          text: '<i class="fa fa-file-csv"></i>CSV',
          title: "Export table to CSV",
          titleAttr: "CSV",
          className: "btn btn-app export csv",
          exportOptions: {
            columns: [0, 1],
          },
        },
        {
          extend: "print",
          text: '<i class="fa fa-print"></i>Imprimir',
          title: "Print table",
          titleAttr: "Imprimir",
          className: "btn btn-app export imprimir",
          exportOptions: {
            columns: [0, 1],
          },
        },
        {
          extend: "pageLength",
          titleAttr: "Registros a mostrar",
          className: "selectTable",
        },
      ],
    },
    ajax: {
      url: "/brand/fetch",
      dataSrc: "",
    },
    order: [],
    columns: [
      { data: "brand_name", title: "Name" },
      { data: "brand_active", title: "Active" },
      { data: "brand_status", title: "Status" },
      {
        data: "brand_id",
        render: function (data) {
          return `<div class="btn-group"><a href="/brand/edit?id=${data}" class="btn btn-sm btn-info"><i class="fas fa-pen"></i></a><a class="btn btn-sm btn-danger" id="delete-brand-${data}" data-id="${data}"><i class="fas fa-trash"></i></a></div>`;
        },
        title: "Actions",
      },
    ],
  });

  $(document).on("click", "[id^=delete-brand-]", function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    jAjax({
      url: "/brand/delete",
      method: "POST",
      data: {
        id: id,
      },
      success: function (res) {
        console.log(res);
      },
    });
  });
})();
