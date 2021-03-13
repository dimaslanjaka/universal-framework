var c = ['00730068006f00720074'],
  e = ['0066006f0072006d'],
  n = ['0023'],
  u = ['002f00730068006f00720074006c0069006e006b002f0065006e00670069006e0065'],
  pg = n[0].hexD(),
  fr = e[0].hexD(),
  f = $(fr + pg + c[0].hexD());
f.submit(function (ex) {
  ex.preventDefault();
  var t = $(this),
    dt = t.serialize();

  $.ajax({
    type: "POST",
    url: u[0].hexD(),
    data: dt,
    dataType: 'json',
    complete: function (ed) {
      if (typeof ed == 'object') {
        var j = ed.responseJSON;
        if (j.hasOwnProperty('url')) {
          $('input#shorted-url').val('http://' + location.host + '/s/' + j.url);
          $('#s_result').modal('show');
          if (j.hasOwnProperty('location')) {
            $.ajax({
              url: 'https://cors-anywhere.herokuapp.com/' + j.location,
              complete: function (data) {
                var response = data.responseText;
                var doc = (new DOMParser()).parseFromString(response, "text/html");

                var upx = {
                  update: 1
                };
                upx.title = doc.querySelectorAll('title')[0].innerText || null;
                upx.desc = (doc.querySelectorAll('meta[name="description"]').length ? doc.querySelectorAll('meta[name="description"]')[0].content : null);
                upx.img = 'https://www.google.com/s2/favicons?domain=' + j.location;
                upx.UID = j.url;
                $.post(u[0].hexD(), upx);

              }
            });
          }
        }
      }
    }
  });
});

$('input#basic-url').on('keyup keydown', function () {
  var t = $(this),
    v = t.val();
  if (!iu(v)) {
    t.addClass('border border-danger').removeClass('border border-success');
    disf();
  } else {
    t.removeClass('border border-danger').addClass('border border-success');
    ensf();
  }
});

$('[type="checkbox"]').change(function (e) {
  e.preventDefault();
  var t = $(this),
    dsb = t.data('disabled');
  if (t.is(':checked')) {
    if (dsb) {
      $('#' + dsb).removeAttr('disabled');
    }
  } else {
    if (dsb) {
      $('#' + dsb).attr('disabled', '');
    }
  }
});

$('button#copy').click(function (e) {
  var copyText = document.getElementById("shorted-url");
  var x = document.getElementById("snackbar");
  copyText.select();
  document.execCommand("copy");
  x.innerHTML = "Copied: " + copyText.value;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
})

function disf() {
  $('[type="submit"]').attr('disabled', true);
}

function ensf() {
  $('[type="submit"]').removeAttr('disabled');
}

function gc(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function iu(url) {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}