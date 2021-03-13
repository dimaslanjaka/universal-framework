var awal = $('[name="awal"]'), bayar = $('[name="bayar"]'), akhir = $('[name="akhir"]');
bayar.on('keyup change', function() {
  var t = $(this), v = t.val();
  var sisa = awal.val()-v;
  akhir.val(sisa);
});