var piutang_pending = $('[id="transaksi-piutang-pending"]');
if (piutang_pending.length) {
  piutang_pending.on('change click', function () {
    var t = $(this),
      option = $('option:selected', this),
      total = option.attr('total'),
      client = option.attr('client'),
      int = t.parents('form').find('input[name="total-piutang"], input[name="sisa-piutang"]'),
      inv = t.parents('form').find('input[name="invoice-piutang"]'),
      inc = t.parents('form').find('select[name="client-piutang"]');

    if (total) {
      socket_stop();
      int.val(total).trigger('change');
      inv.val(t.val()).trigger('change');
      inc.val(client).trigger('change');
    } else {
      int.add(inv).add(inc).val('').trigger('change');
      socket_start();
    }
  });
}