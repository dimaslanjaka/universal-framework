(function () {
  var manageProductTable = $("#manageProductTable").DataTable({
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
          className: "btn btn-app export add",
          action: function (e, dt, node, config) {
            location.href = "/product/add";
          },
        },
        {
          extend: "copyHtml5",
          text: '<i class="fa fa-clipboard"></i>Copy',
          title: "Copy table to clipboard",
          titleAttr: "Copy",
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
          text: '<i class="fa fa-print"></i>Print',
          title: "Print table",
          titleAttr: "Imprimir",
          className: "btn btn-app export imprimir",
          exportOptions: {
            columns: [0, 1],
          },
        },
        {
          extend: "colvis",
          text: '<i class="fa fa-eye"></i>Toggle',
          title: "Toggle visibility",
          titleAttr: "toggle",
          className: "btn btn-app export visibility",
        },
        {
          extend: "pageLength",
          titleAttr: "Registros a mostrar",
          className: "selectTable",
        },
      ],
    },
    ajax: {
      url: "/product/fetch-product",
      dataSrc: "",
    },
    order: [],
    columns: [
      {
        data: "product_image",
        title: "Photo",
        render: function (data, type, row) {
          return `<img id="ImgBase64${row.product_id}" src="${data}" class="img-thumbnail" width="50px" height="50px" onclick="fbox('${row.product_name}','${data}')" />`;
        },
      },
      { data: "code", title: "Code" },
      { data: "product_name", title: "Name" },
      { data: "product_alias", title: "Alias" },
      { data: "brand_name", title: "Brand" },
      { data: "categories_name", title: "Category" },
      { data: "quantity", title: "Quantity" },
      {
        data: "active",
        title: "Status",
        render: function (data, type, row, meta) {
          var activeStatus = "";
          if (row.status == 1) {
            activeStatus =
              data == "1"
                ? `<span class="badge badge-success">Active</span> <span class="badge badge-success">Enabled</span>`
                : `<span class="badge badge-danger">InActive</span> <span class="badge badge-success">Enabled</span>`;
          } else {
            activeStatus =
              data == "1"
                ? `<span class="badge badge-success"><del>Active</del></span> <span class="badge badge-danger">Disabled</span>`
                : `<span class="badge badge-danger">InActive</span> <span class="badge badge-danger">Disabled</span>`;
          }
          return activeStatus;
        },
      },
      {
        data: "product_id",
        render: function (data) {
          return `<div class="btn-group"><a href="/product/edit?id=${data}" class="btn btn-sm"><i class="fas fa-pen"></i></a><a class="btn btn-sm" id="delete-product-${data}" data-id="${data}" title="Disable" disabled><i class="fas fa-ban"></i></a></div>`;
        },
        title: "Actions",
      },
    ],
  });
})();

function fbox(caption, img) {
  $.fancybox.open(
    [
      {
        src: img,
        opts: {
          caption: caption,
          thumb: img,
        },
      } /*,
      {
        src: "2_b.jpg",
        opts: {
          caption: "Second caption",
          thumb: "2_s.jpg",
        },
      }, */,
    ],
    {
      loop: false,
    }
  );
}
