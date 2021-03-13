$('[name="userid"],[name="blogid"]').change(function(e) {
  e.preventDefault();
  var form = $(this).closest('form');
  return $.post(location.href, form.serialize());
});
var currentRequest;
$("#submission").submit(function(e) {
  e.preventDefault();
  var ini = $(this);
  var datapost = ini.serializeArray();
  var sl, tl;
  datapost.forEach(function(d, i) {
    if (d.name == 'sl') {
      if (d.value != '') {
        sl = true;
      }
    }
    if (d.name == 'tl') {
      if (d.value != '') {
        tl = true;
      }
    }
  });
  if (sl && tl) {
    datapost.push({
      name: 'translate',
      value: 'true'
    });
  }
  if (currentRequest) currentRequest.abort();
  currentRequest = $.post(ini.attr('action'), datapost);
  currentRequest.done(function(data) {
    if (typeof data == 'string') {
      if (data.toString().trim() == '' || !$(data).find('#A-G-C')) {
        data = '<div id="error" class="alert alert-danger">Empty result, try again</div>';
      }
      if ($(data).find('#error').length) {
        data = '<div id="error" class="alert alert-danger">' + $(data).find('#error').html() + '</div>';
      }
      console.log(data)
      //$('#' + ini.attr('target')).html(data);
    }
  });
  currentRequest.fail(function(fault) {
    console.error(typeof fault);
  });
});

$(document).on('click', '[id="addi"]', function(e) {
  e.preventDefault();
  var old = $(this).closest('.input-group');
  var ifield = old.clone();
  ifield.find('input').val('');
  old.find('button').attr({
    'class': 'btn btn-danger',
    'id': 'removei'
  });
  old.find('i').attr('class', 'fas fa-minus');

  $(this).closest('#input-fields').append(ifield);
});

$(document).on('click', '[id="removei"]', function(e) {
  e.preventDefault();
  $(this).closest('.input-group').remove();
});

$("#proxy").on('change', function(e) {
  e.preventDefault();
  var p = parse_proxy($(this).val());
  $(this).val(p.join("\n"));
  $.post('/session/set', {
    'key': 'proxies',
    'val': p.join("\n")
  })
});