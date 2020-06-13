$(document).ready(function() {
  setTimeout(() => {
    $('.mdb-select').not('.select-wrapper').materialSelect();
    $('input,textarea').each(function(i, el) {
      if (!empty($(el).val())) {
        var labels = $(el).closest('div').find('label');
        if (labels.length) {
          if (!labels.hasClass('active')) {
            labels.addClass('active');
          }
        }
      }
    });
    $('[data-toggle="modal"]').each(function(i, el) {
      if (!$(el).attr('data-backdrop')){
        $(el).attr('data-backdrop', 'true');
      }
    });
  }, 2000);
});