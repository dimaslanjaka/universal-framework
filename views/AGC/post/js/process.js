check_a();

var rgx = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/g;
$('#proxy_list').on('change', function () {
  var p = $(this).val();
  var px = parse_proxy(p.toString().trim());
  $(this).val(px.join("\r\n"));
});

$('#complex').click(function (E) {
  E.preventDefault();
  complex(UNIQUE_ID());
});

var proxy_done = [];
var btnc = $("#complex");
$('[data-form]').on('click', function (e) {
  e.preventDefault();
  btnc.prop('disabled', true);
  Loading('Processing article');
  var that = $(this);
  check_a(function () {
    var form = $('form#' + that.data('form'));
    var proxy_el = $('#proxy_list');
    var p = proxy_el.val();
    var px = parse_proxy(p);
    if (Array.isArray(px) && px.length) {
      var random = array_rand(px);
      var N = random.index;
      var pnum = random.value;
      pnum = pnum.toString().trim();
      var fdata = form.serializeArray();
      fdata.push({
        name: 'proxy',
        value: pnum
      });

      $.ajax({
        url: '/AGC/post/translate',
        method: 'POST',
        data: fdata,
        beforeSend: function () {
          Loading('Processing article, using proxy: ' + pnum);
        },
        error: function () {
          gexec();
          Loading(0);
        },
        success: function (response) {
          var R = $(response),
            D = R.find('[id^=AGC]'),
            T = D.find('[data-agc="title"]');
            //return console.log(fdata);
          if (typeof D[0] != 'undefined' && typeof D[0].innerHTML != 'undefined' && D.length) {
            Loading(0);
            gexec();
            var inner = D[0].outerHTML;
            $('input[name="body"]').val(inner);
            $("#AGCR").html(inner);
            if (T.length) {
              $('#title_post').val(T[0].innerText);
            }
            btnc.prop('disabled', false);
            return complex(UNIQUE_ID());
          } else {
            Loading('Processing article, deleting proxy: ' + pnum, function () {
              $.post('/AGC/proxy?del=' + pnum);
            });

            var filter = array_unset(px, N);
            var dataproxy = {
              save: true,
              content: filter
            };
            proxy_el.val(filter.join("\n"));
            Loading('Processing article, merging proxy', function () {
              $.post('/AGC/proxy', dataproxy);
            });
            Loading('Retrying');
            gexec();
            return that.trigger('click');
          }
        }
      });
    } else {
      Loading('Proxy empty', function () {
        setTimeout(function () {
          Loading('', true);
        }, 3000);
      })
    }
  });
  return false;
});

function complex(uniqueid) {
  var form = document.createElement("form");
  var element1 = document.createElement("textarea");
  var element2 = document.createElement("input");
  var element3 = document.createElement("input");
  var element4 = document.createElement("input");

  form.method = "POST";
  form.action = "/AGC/post/prepare";
  form.id = uniqueid;

  element1.value = document.getElementById('AGCR').innerHTML;
  element1.innerHTML = element1.value;
  element1.name = "body";
  element1.className = 'd-none';
  form.appendChild(element1);

  element2.value = $('#title_post').val().toString().trim();
  element2.name = "title";
  element2.type = 'hidden';
  form.appendChild(element2);

  element3.name = 'sl';
  element3.type = 'hidden';
  element3.value = $('#srclang').val().toString().trim();
  form.appendChild(element3);

  element4.name = 'tl';
  element4.type = 'hidden';
  element4.value = $('#tolang').val().toString().trim();
  form.appendChild(element4);

  form.appendChild(document.getElementById('hash_post').cloneNode(true));

  //document.body.appendChild(form);
  swal({
    title: 'Article form submission',
    text: 'Are you sure to create this article ?',
    buttons: {
      cancel: {
        text: "Cancel",
        value: null,
        visible: true,
        className: "btn-danger",
        closeModal: true,
      },
      confirm: {
        text: "Get article",
        value: true,
        visible: true,
        className: "btn-success",
        closeModal: true
      }
    },
    content: form
  }).then(function (isConfirm) {
    if (isConfirm === true) {
      analys('article_submission', 'submission', 'form', uniqueid, function () {
        btnc.prop('disabled', true);
        return $('form#' + uniqueid).submit()
      });
    }
  });
}

function check_a(callback) {
  if (typeof HASH != 'undefined' && typeof NICHE != 'undefined') {
    $.ajax({
      type: 'POST',
      url: '/AGC/list?niche=' + NICHE + '&hash=' + HASH,
      processData: false,
      beforeSend: function () {
        loadingio('Checking post, please wait', null, null);
      },
      success: function (ePatch) {
        if (typeof ePatch[0] != 'undefined') {
          if (ePatch[0].sent !== false) {
            loadingio('This post was sent by other users', function () {
              isAdmin(function () {
                swal({
                  dangerMode: true,
                  text: 'Article was sent by other users',
                  icon: 'error',
                  buttons: {
                    cancel: "Close",
                    confirm: "Redirect to AGC List"
                  },
                  content: {
                    element: 'pre',
                    attributes: {
                      innerHTML: 'ERROR: ' + createJSON(ePatch),
                      className: 'text-left'
                    }
                  }
                }).then(function (Confirm) {
                  if (Confirm === true) {
                    location.replace('/AGC/list');
                  }
                });
              }, function () {
                location.replace('/AGC/list');
              });
            });
          } else {
            if (typeof callback == 'function') {
              callback();
            }
          }
        }
      },
      complete: function () {
        loadingio(false, null, 'disabled');
      }
    });
  }
}

function serializeArrayReverse(obj) {
  var str = [];
  for (var index = 0; index < obj.length; index++) {
    var p = obj[index];
    str.push(encodeURIComponent(p.name) + "=" + encodeURIComponent(p.value));
  }
  return str.join("&");
}