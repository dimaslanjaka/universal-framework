
$('#pkgList').DataTable({
  destroy: true,
  dom: "Bfrtip",
  processing: false,
  serverSide: false,
  stateSave: false,
  autoWidth: false,
  responsive: true,
  deferRender: true,
  paging: true,
  lengthMenu: [5, 10, 15, 20, 25, 30, 100, 200, 300, 400, 500, 'All'],
  buttons: ['refresh'],
  ajax: {
    url: location.href,
    headers: {
      Accept: 'application/json'
    },
    method: 'POST',
    data: {
      'data': '',
      'list': ''
    },
    dataSrc: function(res) {
      var data_records = [];

      if (!Array.isArray(res)) {
        data_records = [res];
      } else {
        data_records = res;
      }
      data_records.forEach(function(v, i) {
        for (const key in v) {
          if (v.hasOwnProperty(key)) {
            if (key == 'status') {
              const state = v[key] == 'active' ? 'checked' : '';
              v.control = `<form action=""><input type="hidden" value="${v.code}" name="status-pkg"/><input type="hidden" value="${v.code}" name="id"/><div class="switch"> <label> Off <input type="checkbox" ${state} name="status"> <span class="lever"></span> On </label> </div></form>`;
            }
          }
        }
      });
      return data_records;
    },
  },
  columns: [{
    data: "code",
    name: "code"
  }, {
    data: "name",
    name: "name"
  }, {
    data: "price",
    name: "price"
  }, {
    data: "status",
    name: "status"
  }, {
    data: "control",
    name: "control"
  }]
});

$('#pkgList').find('label').each(function () {
  $(this).parent().append($(this).children());
});
$('#pkgList .dataTables_filter').find('input').each(function () {
  const $this = $(this);
  $this.attr("placeholder", "Search");
  $this.removeClass('form-control-sm');
});
$('#pkgList .dataTables_length').addClass('d-flex flex-row');
$('#pkgList .dataTables_filter').addClass('md-form');
$('#pkgList select').removeClass(
'custom-select custom-select-sm form-control form-control-sm');
$('#pkgList select').addClass('mdb-select');
$('#pkgList .dataTables_filter').find('label').remove();

$(document).on('change', '[name="status"]', function(e){
  var t = $(this);
  t.parents('form').submit();
});
AjaxForm();