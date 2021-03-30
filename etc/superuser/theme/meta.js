$("#meta").DataTable({
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
  //buttons: ["refresh"],
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
              var typeInput = "text";
              if (key == "published" || key == "modified") {
                typeInput = "datetime-local";
                v.data[key] = new Date(v.data[key]).toJSON().slice(0, 19);
              }
              v[
                key
              ] = `<form action="" method='post'><input type="hidden" name="path" value="${v.path}" /><input type="hidden" name="config" value="${v.path}" /><div class='md-form'><input type="${typeInput}" name='${key}' value='${v.data[key]}' /></div></form>`;
            }
          }
          //console.log(v);
        }
      );
      //console.log(data_records);
      return data_records;
    },
  },
  rowCallback: function (row, data) {
    $("td:eq(0)", row).append(data.html_hidden);
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
  ],
});
