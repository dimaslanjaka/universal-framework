$('[name="total"], [name="total-masuk"]').on('keyup keydown change', function (params) {
  if (!socket_check()){
    socket_start();
  }
  setTimeout(() => {
    var t = $(this), n = t.attr('name'), f = t.parents('form:first');
    var v1 = f.find('[name=total]').val(), v2 = f.find('[name=total-masuk]').val(), tp = $('[name="total-piutang"]');
    var sisa = v1 - v2;
    if (sisa < 0) {
      dimas.disable_button($(this), 'total pendapatan lebih kecil dari pendapatan masuk');
    } else {
      dimas.enable_button($(this), 'true');
      tp.val(sisa).trigger('change');
    }
  }, 500);
});

$('[name="client"]').on('change', function () {
  $('[name="client-piutang"]').val($(this).val()).trigger('change');
});

