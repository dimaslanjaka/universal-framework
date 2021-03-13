
$('[data-controller]').click(function (e) {
  e.preventDefault();
  analys('click', 'links', 'click', $(this).attr('href'), gexec);
  var that = $(this);
  //#ModalContentPreview
  var target = CryptoD('agc', that.data('href'), that.data('salt'), that.data('iv'));
  var Token = geToken();
  $.ajax({
    url: target,
    method: 'POST',
    cache: false,
    headers: {
      'x-auth': $(this).data('csrf')
    },
    data: {
      'g-recaptcha-response': Token
    },
    beforeSend: function (params) {
      loadingio('Requesting, Please wait');
    },
    success: function (response) {
      result = $(response).find("#agc_result,#agc_result title");

      $("#ModalContentPreview .modal-title").html(result[1].innerText);
      $("#ModalContentPreview input[name='title']").val(result[1].innerText);
      $("#ModalContentPreview input[name='hash']").val(that.data('hash'));
      $("#ModalContentPreview input[name='sl']").val(that.data('src'));
      $("#ModalContentPreview input[name='niche']").val(that.data('niche'));
      $("#ModalContentPreview .modal-body").html(result[0].innerHTML);
      $("#ModalContentPreview textarea[name='body']").val(result[0].innerHTML);
      $("#ModalContentPreview input[name='target_translator']").val($(response).filter('input#target_translator')[0].value);
      $('#ModalContentPreview').modal('show');
    },
    complete: function () {
      loadingio(false, null, 'disabled');
    }
  });
  return false;
});

setTimeout(function () {
  if ($('#pagination-demo').length) {
    window.pagObj = $('#pagination-demo').twbsPagination({
      totalPages: $('.page').length,
      visiblePages: 0,
      initiateStartPageClick: true,
      href: false,
      hrefVariable: '{{number}}',
      loop: false,
      onPageClick: function (event, page) {
        $('.page-active').removeClass('page-active');
        $('#page' + page).addClass('page-active');
      }
    }).on('page', function (event, page) {
      //console.info(page + ' (from event listening)');
    });
  }
}, 3000);


