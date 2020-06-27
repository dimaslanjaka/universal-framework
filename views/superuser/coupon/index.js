// @ts-nocheck
/**
 * @type {DataTables.Api} table
 */
var table;
$(document).ready(function () {
  framework().captcha.get("sname");

  $("input#coupon").val(Math.random().toString(36).substr(2, 9));

  $(document).on("submit", "form", function (e) {
    e.preventDefault();
    var t = $(this);
    var success = t.data("success");
    ajx(
      {
        url: t.attr("action"),
        method: t.attr("method"),
        data: t.serialize(),
        success: function (res) {
          console.log(res);
        },
      },
      success,
      null,
      null
    );
  });

  smartform();

  $.fn.dataTable.ext.errMode = "none";
  table = $("#listCoupons").DataTable({
    destroy: true,
    processing: true,
    serverSide: true,
    fixedColumns: true,
    stateSave: false,
    autoWidth: false,
    responsive: true,
    deferRender: true,
    paging: true,
    hideEmptyCols: true,
    ajax: {
      url: "?list=" + guid(),
      type: "post",
      data: {
        term: getUID(),
        data: "",
        list: "true",
      },
      headers: {
        Accept: "application/json",
      },
      dataSrc:
        /**
         *
         * @param {Object} res
         * @param {Array} res.data
         */
        function (res) {
          ids = res.data;
          var data = res.data;
          if (!data) return {};
          //console.log(data, res.data);

          res.data.forEach(
            /**
             * @param {object} value
             * @param {number} value.limit
             * @param {string} value.code
             * @param {number} value.success
             */

            function (value, index) {
              if (value.hasOwnProperty("limit")) {
                var g = guid();
                value.limit = `<form data-success="dtreload" method="post" action="/coupon/manage/edit?guid=${g}" class="form-inline">
                <input type="hidden" name="coupon" value="${value.code}" />
                <div class="md-form m-0 p-0"><input class="form-control p-0 m-0" type="number" id="limit-${
                  value.code
                }" name="limit" value="${value.limit}" />
                <small id="help-${value.code}" class="form-text text-muted">
                <i class="text-success">${
                  value.success
                } Success</i> - <i class="text-primary">${
                  value.limit - value.success
                } Remaining</i>
                </small></div>
                <button type="submit" class="btn purple text-white ml-2"><i class="fad fa-save"></i></button>
                </form>`;
              }
            }
          );

          return res.data;
        },
      beforeSend: function () {
        if (table) {
          table.settings()[0].jqXHR.abort();
        }
      },
    },
    dataSrc: "data",
    dataFilter: function (data) {
      var json = jQuery.parseJSON(data);
      console.log({
        dataFilter: json,
      });
      json.recordsTotal = json.recordsTotal;
      json.recordsFiltered = json.recordsFiltered;
      json.data = json.data;

      return JSON.stringify(json); // return JSON string
    },
    //pageLength: 5,
    lengthMenu: [5, 10, 15, 20, 25, 30, 100, 200, 300, 400, 500, "All"],

    createdRow: function (row, data, index) {
      //$(row).attr('data-id', ids[index].id);
      //$(row).find('td:eq(0)').attr('name', 'Information');
      //$(row).find('td:eq(1)').attr('name', 'Description');
      //console.log(row, data, index);
    },
    columnDefs: [
      {
        targets: 1,

        createdCell: function (td, cellData, rowData, row, col) {
          //$(td).attr('name', $(td).text());
          //console.log($(td).attr('name'));
          //console.log($(td).closest('tr').html());
          //console.log((td, cellData, rowData, row, col));
        },
      },
    ],
    initComplete: function () {
      var api = this.api();
      /*api.$('td').click(function() {
        //api.search(this.innerHTML).draw();
        //console.log($(this).closest('tr').data('id'));
      });*/
    },
    columns: [
      {
        title: "Coupon",
        data: "code",
      },
      {
        title: "Limit",
        data: "limit",
      },
    ],

    drawCallback: function (settings) {
      var api = this.api();

      // Output the data for the visible rows to the browser's console
      /*console.log(api.rows({
        page: 'current'
      }).data());*/
    },
  });
  /*$('#listCoupons').on('preXhr.dt', function(e, settings, data) {
    console.log({
      'preXhr.dt': data
    });
    return false;
  });*/
  /**
   * Scroll up after click pagination dt
   */
  $("#listCoupons").on("page.dt", function () {
    $("html, body").animate(
      {
        scrollTop: $(".dataTables_wrapper").offset().top,
      },
      "slow"
    );

    $("thead tr th:first-child").focus().blur();
  });
  /*$('#listCoupons').on('preInit.dt', function(e, settings) {
    //var api = new $.fn.DataTable.Api(settings);
    //api.page.len(20);
  });*/
  $(".dataTables_length").addClass("bs-select");

  setTimeout(() => {
    $("#ReportLog").DataTable({
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
        url: "/coupon/manage/index?report",
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        data: {
          captcha: localStorage.getItem("captcha").toString(),
          data: "",
          report: "true",
        },
        dataSrc: function (res) {
          var data_unprocess = [];
          var data_processed = [];

          if (!Array.isArray(res)) {
            data_unprocess = [res];
          } else {
            data_unprocess = res;
          }
          console.log(data_unprocess);
          return data_unprocess;
        },
        //dataSrc: 'data'
      },
      //data: dt_datas[dt_id_index],
      columns: [
        {
          title: "MSISDN",
          data: "msisdn",
          name: "msisdn",
        },
        {
          title: "Coupon",
          data: "coupon",
          name: "coupon",
        },
        {
          title: "Date",
          data: "date",
          name: "date",
        },
      ],
    });
  }, 600);
});

function dtreload() {
  if (table) table.ajax.reload();
}
