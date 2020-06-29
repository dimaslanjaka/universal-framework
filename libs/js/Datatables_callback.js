/**
 * Datatables init
 * @todo disable error warning
 * @todo add refresh button
 */
async function datatables_init() {
  if (typeof jQuery.fn.dataTable != "undefined") {
    $.fn.dataTable.ext.errMode = "none";
    $.fn.dataTable.ext.buttons.refresh = {
      extend: "collection",
      text: '<i class="fas fa-sync"></i>',
      className: "btn btn-info",
      action: function (e, dt, node, config) {
        dt.clear().draw();
        dt.ajax.reload();
      },
    };
    setTimeout(function () {
      $("button.dt-button").not(".btn").addClass("btn btn-info");
    }, 5000);
  }
}

/**
 * Scroll up after click pagination dt
 * @param {JQuery} target
 */
function pagination_up(target) {
  if (!(target instanceof jQuery)) {
    return console.error(
      getFuncName() + " target element not instance of jQuery"
    );
  }
  target.on("page.dt", function () {
    $("html, body").animate(
      {
        scrollTop: $(".dataTables_wrapper").offset().top,
      },
      "slow"
    );

    $("thead tr th:first-child").focus().blur();
  });
}
