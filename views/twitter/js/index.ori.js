$('[id="submit"]').on('click', function (E) {
  E.preventDefault();
  var t = $(this);
  if (t.parents('form').length) {
    t.parents('form').submit();
  }
});
$('#chkprx, #chkprx-b').change(function () {
  var t = $(this),
    id = t.attr('id'),
    px;
  if (id == 'chprx') {
    px = $('#single-proxy')
  } else {
    px = $('#prx-b')
  }
  if (this.checked) {
    px.prop('disabled', false);
  } else {
    px.prop('disabled', true);
  }
});
$('#email-b').change(function (params) {
  var t = $(this),
    v = t.val();
  var lns = v.split(/\r*\n/).filter(function (el) {
    return el != null && el != '';
  });
  var lnl = lns.length;
  if (lnl > 30) {
    var txt = '';
    for (var index = 0; index < 30; index++) {
      txt += lns[index] + "\n";
    }
    t.val(txt);
    if (!$('span#alrt').hasClass('tx-danger')) {
      $('span#alrt').addClass('tx-danger').html('--MAX 30--');
    }
  }
});
$('form#bulk').submit(function (e) {
  e.preventDefault();
  var t = $(this), e = $('#email-b').val().split("\n"), p = $('#prx-b').val(), cp = 'Direct';
  var mp = p.match(/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/gm);
  var br = $('#bulk-r');
  br.html('');
  $('#bulk-l').html('Please Wait...<hr/>');
  $('#ModalResultBulk').modal('show');
  e.forEach(function (mail) {
    $('#bulk-l').html('Executing ' + mail + '...<hr/>');
    if (mp) {
      cp = mp[Math.floor(Math.random() * mp.length)];
    }
    if (mail != '' && mail && VE(mail)) {
      $.ajax({
        url: location.href,
        data: {
          email: mail.trim(),
          proxy: cp
        },
        complete: function (data) {
          if (data.hasOwnProperty('responseJSON')) {
            if (data.responseJSON[0].hasOwnProperty('success')) {
              br.append(mail + ' Using ' + cp + ' <span class="tx-success">Available</span><br/>');
            } else if (data.responseJSON[0].hasOwnProperty('error')) {
              br.append(mail + ' Using ' + cp + ' <span class="tx-danger">Unavailable</span><br/>');
            }
          }
        }
      })
    }
  })

});
function VE(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}