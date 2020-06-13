$('form').on('submit', function(e) {
  e.preventDefault();
  $.post($(this).attr('action'), $(this).serialize(), function(res) {
    var obj = res;
    $('[name="txt"]').val(obj.join("\n"));
  });
});