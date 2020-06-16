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
      if (!$(el).attr('data-backdrop')) {
        $(el).attr('data-backdrop', 'true');
      }
    });
  }, 2000);

  $("#button-collapse").sideNav();
  new WOW().init();
  var target = $(location).attr("hash");
  var offset = ($(this).attr('data-offset') ? $(this).attr('data-offset') : 0);
  if ($(target).length) {
    $('body,html').animate({
      scrollTop: $(target).offset().top - offset
    }, 700);
  }
});