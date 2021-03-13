if (typeof AJAX_ID != 'undefined') {
  $('#loadingio-wrapper').addClass('running');
  var loading_text = $('#loadingio-text');
  loading_text.html('Getting MP3 information...')
  $.getJSON(`/youtube/details/${AJAX_ID}?json`, function (res) {
    if (typeof AJAX_URL != 'undefined' && typeof AJAX_DATA != 'undefined') {
      if (typeof res[0].items[0].snippet.title != 'undefined') {
        AJAX_DATA.title = res[0].items[0].snippet.title;
        $.post(location.href, {
          'check': true
        }, function (fs) {
          if (typeof fs.uploaded != 'undefined') {
            location.reload(1);
            throw new Error('Reloading...');
          }
        });
      }
      loading_text.html('Converting MP3...');
      $.post(AJAX_URL, AJAX_DATA, function (r) {
        var udata;
        if (typeof r.success != 'undefined' && r.success) {
          if (typeof r.id != 'undefined' && typeof r.file != 'undefined') {
            udata = {
              'id': r.id,
              'file': r.file
            };
          }
        } else if (typeof r[0].success != 'undefined' && r[0].success) {
          if (typeof r[0].id != 'undefined' && typeof r[0].file != 'undefined') {
            udata = {
              'id': r[0].id,
              'file': r[0].file,
              'title': AJAX_DATA.title
            };
          }
        }
        if (typeof udata != 'undefined' && typeof data != 'boolean' && typeof udata != 'string') {
          loading_text.html('Uploading MP3...');
          $.post('/AGC/drive?upload', udata, function (u) {
            console.log(u, u[0]);
            if (typeof u[0] != 'undefined') {
              if (typeof u[0].error != 'undefined') {
                if (u[0].info.contents === null) {
                  uload('');
                  location.reload(1);
                  throw new Error('Reloading...');
                } else if (typeof u[0].info.contents.drive == 'undefined' && typeof u[0].info.contents.title != 'undefined') {
                  location.reload(1);
                  throw new Error('Reforcing...');
                }
              }
            } else if (typeof u.drive != 'undefined' && typeof u.url != 'undefined') {
              location.reload(1);
              throw new Error('Reloading...');
            }
          });
        }
      });
    }
  });
}

if (typeof AJAX_PROXY != 'undefined') {
  $.post('/AGC/proxy?set');
  uload('');
  location.reload(1);
}

function uload(msg) {
  window.onbeforeunload = function () {
    return typeof msg != 'undefined' && typeof msg != '' ? msg : 'You have unsaved changes!';
  }
}