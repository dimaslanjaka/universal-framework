formsaver();
// datatables instance
var table;
// global data for searching datatables
var table_search_data = "";
// disable alert
$.fn.dataTable.ext.errMode = "none";
table = $("#meta").DataTable({
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
  ajax: {
    url: location.href,
    headers: {
      Accept: "application/json",
    },
    method: "POST",
    data: {
      data: "",
      fetch: "",
    },
    dataSrc: function (res) {
      var data_records = [];

      if (!Array.isArray(res)) {
        data_records = [res];
      } else {
        data_records = res;
      }
      data_records.forEach(
        /**
         *
         * @param {Object} v
         * @param {Object} v.content
         * @param {string} v.content.title
         * @param {string} v.content.desc
         * @param {boolean} v.content.theme
         * @param {Number} i
         */
        function (v, i) {
          if (!v.hasOwnProperty("data")) {
            // delete data_records[i];
            console.log(data_records[i]);
            return;
          }
          v.index = i;
          for (const key in v.data) {
            if (v.data.hasOwnProperty(key)) {
              if (key == "published" || key == "modified") {
                typeInput = "datetime-local";
                v.data[key] = new Date(v.data[key]).toJSON().slice(0, 19);
              } else if (key == "desc" && typeof v.data[key] == "string") {
                v.data[key] = v.data[key].truncate(15);
              }
              v[key] = v.data[key];
            }
          }
          v.path = v.path.replace(/\\/g, "/");
          //console.log(v);
        }
      );
      //console.log(data_records);
      return data_records;
    },
  },
  columns: [
    {
      title: "Title",
      data: "title",
    },
    {
      title: "Desc",
      data: "desc",
    },
    {
      title: "Published",
      data: "published",
    },
    {
      title: "Modified",
      data: "modified",
    },
    {
      title: "Actions",
      data: "path",
      render: function (data, type, row, meta) {
        var form = `<form><input type='hidden' name='config' value='${data}'><button type='submit' class='btn btn-primary'><i class='fas fa-pen'></i></button></form>`;
        return form;
      },
    },
  ],
});
