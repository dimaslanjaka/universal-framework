// @ts-nocheck
if (typeof jQuery.fn.dataTable != 'undefined') {
  $.fn.dataTable.ext.errMode = 'none';
  $.fn.dataTable.ext.buttons.refresh = {
    extend: 'collection',
    text: '<i class="fas fa-sync"></i>',
    className: 'btn btn-info',
    action: function (e, dt, node, config) {
      dt.clear().draw();
      dt.ajax.reload();
    } 
  };
  setTimeout(function () {
    $('button.dt-button').not('.btn').addClass('btn btn-info');
  }, 5000);
}