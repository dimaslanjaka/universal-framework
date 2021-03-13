var rgx = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/g;
var proxy_done = [];
var working_proxy = [];
var dead_proxy = [];
var get_proxy_button = $("#get-proxy");
var blogger = $("#blogger");
//blogger.removeClass('d-none').removeAttr('disabled');
var wrapper = $('textarea#proxies');

$(function () {
  $.ajax({
    url: '/AGC/proxy/index',
    method: 'POST',
    data: {
      default: true
    },
    headers: {
      'X-Proxy': true
    },
    success: function (res) {
      wrapper.val(res);
    }
  })
});

$("#blogger").on('click', function (e) {
  e.preventDefault();
  var pr = $("#proxies_result");
  var err = pr.find('i.w3-text-red');
  if (err.length) {
    for (var index = 0; index < err.length; index++) {
      var element = err[index],
        parent = element.closest('tr');
      parent.setAttribute('id', 'DeadProxy');
      parent.className = 'w3-hide';
    }
  }
  var form = document.createElement('form');
  form.id = 'blogger-form';
  form.setAttribute('action', '/AGC/blogger/create');
  form.setAttribute('method', 'POST');
  form.setAttribute('target', '_blank');
  var hr = document.createElement('hr');
  hr.className = 'hr-text';
  hr.setAttribute('data-content', 'TITLE');
  form.appendChild(hr);
  var title = 'Google passed proxies, updated at ' + new Date().toISOString().slice(0, 10);
  var inp = document.createElement('input');
  inp.className = 'form-control';
  inp.setAttribute('name', 'title');
  inp.value = title;
  form.appendChild(inp);
  var Clone = document.getElementById('proxy_result_wrapper').cloneNode(true);
  Clone.querySelector("#blogger").classList.toggle('w3-hide');
  Clone.querySelector("#descr").innerHTML = title;
  var deadProxies = Clone.querySelectorAll('[id="DeadProxy"]');
  for (var index = 0; index < deadProxies.length; index++) {
    var element = deadProxies[index];
    element.remove();
  }
  var textarea = document.createElement('textarea');
  textarea.className = 'form-control d-none';
  textarea.contentEditable = 'true';
  textarea.setAttribute('name', 'body');
  textarea.innerHTML = htmlFromDom(Clone);
  form.appendChild(textarea);
  document.getElementById('post-helper').appendChild(Clone);
  var prev = document.createElement('div');
  var hr = document.createElement('hr');
  hr.className = 'hr-text';
  hr.setAttribute('data-content', 'BODY PREVIEW');
  prev.appendChild(hr);
  prev.appendChild(Clone);
  form.appendChild(prev);
  var hr = document.createElement('hr');
  hr.className = 'hr-text';
  hr.setAttribute('data-content', 'LABEL');
  form.appendChild(hr);
  var label = document.createElement('input');
  label.className = 'form-control';
  label.value = 'Proxy';
  label.setAttribute('name', 'label');
  form.appendChild(label);
  //confirmation
  var p = document.createElement('p');
  p.className = 'text-left alert alert-warning';
  p.innerHTML = 'Before sending, we make sure you are logged in. If not, we recommend that you log in first. at <a href="/AGC/blogger" rel="bookmark" title="Login Here" target="_blank" class="w3-text-red">this page <i class="fas fa-external-link-square-alt"></i></a>';
  swal({
    title: 'Ensure logged in',
    content: p,
    buttons: {
      cancel: true,
      confirm: "Continue",
      roll: {
        text: "Login now",
        value: "login",
      },
    },
  }).then(function (Confirm) {
    if (Confirm == 'login') {
      window.open('/AGC/blogger', 'blogger').focus();
    } else if (Confirm === true) {
      check_blogger(function (BlogID) {
        var hr = document.createElement('hr');
        hr.className = 'hr-text';
        hr.setAttribute('data-content', 'Blog ID: ' + BlogID);
        form.appendChild(hr);
        swal({
          title: 'Create blogger post',
          content: form
        }).then(function (confirm) {
          if (confirm) {
            var form = $("#blogger-form");
            if (form.length) {
              return form.submit();
            }
          }
        });
      });
    }
  });
  return false;
});

get_proxy_button.click(function (e) {
  e.preventDefault();
  Loading('Fetching proxies');
  $.ajax({
    url: '/AGC/proxy/index',
    method: 'POST',
    headers: {
      'X-Proxy': true
    },
    data: {
      get: true
    },
    complete: function (res) {
      if (res.hasOwnProperty('responseText')) {
        res = res.responseText;
      }
      if (!res) {
        return toastr.error('Fething proxies failed', 'Failed', {
          onShown: function () {
            Loading(false);
          }
        });
      }
      Loading(false);
      toastr.success('Proxy list refreshed', 'Fetching proxies suceeded', {
        onShown: function () {
          setTimeout(function () {
            wrapper.val(parse_proxy(res).join("\r\n"));
          }, 500);
        }
      });
    }
  });
});

function htmlFromDom(ClonedNode) {
  var target = document.getElementById('post-helper');
  target.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.appendChild(ClonedNode);
  return wrap.innerHTML;
}

$('#proxies').on('change', function () {
  var data = parse_proxy($(this).val());
  $(this).val(data.join("\n"));
});

var proxy_index = 0;
var proxy_queue = [];
var proxy_start = false;
var isLast = 0;
$('#proxies-test').on('click', function () {
  proxy_start = true;

  var wrapper = $('textarea#proxies'),
    max = $("input#maxres"),
    maximum = max.val() ? max.val().toString().trim() : 0,
    result_ = $("#proxies_result tbody");
  if (result_.find('.checking').length) {
    toastr.error('Another proxy is in the checking process, please be patient waiting for it to finish', 'Duplicate checker');
    return;
  }
  wrapper.prop('readonly', true);
  get_proxy_button.prop('disabled', true);
  var p = wrapper.val().toString().trim();
  var px = parse_proxy(p);
  px = array_shuffle(px);
  var td = '';
  if (maximum > 100) {
    return toastr.error('Preventing excedeed process, were not allowed more than 100 proxies at once', 'Too many maximum results');
  }
  for (var index = 0; index < maximum; index++) {
    if (!px[index]) {
      continue;
    }
    var ep = px[index].toString().trim();
    var pseudo = pseudo_builder(ep);
    if (!inArray(ep, proxy_done) && !$('#' + pseudo).length) {
      proxy_done.push(ep);
      proxy_queue.push(ep);
      td += '<tr><td>' + ep + '</td><td id="' + pseudo + '"><div class="hovering ld-ext-right running checking"><span>Checking</span><div class="ld ld-ring ld-spin"></div></div></td></tr>';
      /** Limit loop */
      if (index >= px.length - 1 || index >= maximum - 1 || index >= 100) {
        isLast = index + 1;
        requester();
        wrapper.val(px.join("\r\n"));
        break;
      }
    }
  }
  if (!result_.find('.checking,.checked').length) {
    result_.html(td);
  } else {
    result_.append(td);
  }
});

function proxy_updater() {
  $.post('/AGC/proxy/index?updater', {
    update: true
  }, function (eo) {
    if ($("#freshProxy").is(':checked')) {
      wrapper.val(eo[0].join("\r\n"));
    }
    blogger.removeClass('d-none').removeAttr('disabled');
  });
}

setInterval(proxy_updater, 300000);

function pseudo_builder(string) {
  if (string) {
    return string.replace(/[\W\s]/gm, '');
  }
}
var requester_try = {
  'proxy': 'count'
};

function requester() {
  var proxy = proxy_queue[proxy_index];
  if (!proxy_start || !proxy) {
    return;
  }

  if (typeof requester_try[proxy] == 'undefined') {
    requester_try[proxy] = 1;
  }
  $.ajax({
    url: '/AGC/proxy/index',
    method: 'POST',
    data: {
      single: proxy
    },
    beforeSend: function () {
      toastr.info('Checking proxy ' + (proxy_index + 1) + '  of ' + isLast);
    },
    success: function (responseData) {
      if (typeof responseData[0] != 'undefined') {
        responseData = responseData[0];
      }
      var data = responseData;
      var td = $("td#" + pseudo_builder(proxy));
      var wrapper = $('textarea#proxies');
      var p = wrapper.val() ? wrapper.val().toString().replace(proxy, '').trim() : '';
      if (data) {
        if (typeof data.proxy != 'undefined') {
          if (td.length) {
            if (typeof data.google != 'undefined') {
              if (data.google == 200) {
                if (!inArray(proxy, working_proxy)) {
                  working_proxy.push(proxy);
                }
                data.google = '<i class="fas fa-check w3-text-green checked working-proxy"></i>';
              } else {
                if (!inArray(proxy, dead_proxy)) {
                  dead_proxy.push(proxy);
                }
                data.google = '<i class="fas fa-times w3-text-red checked dead-proxy"></i>';
              }
              td.html(data.google)
            }
          }
        }
      } else if (td.length) {
        td.html('<i class="fas fa-times w3-text-red checked dead-proxy"></i>');
      }

      wrapper.val(parse_proxy(p).join("\r\n"));
    },
    error: function () {
      requester_try[proxy]++;
      if (requester_try[proxy] > 5) {
        $("#" + pseudo_builder(proxy)).remove();
        toastr.error('Proxy: ' + proxy + ' error on checking, deleting.', 'Proxy Deleted')
        return;
      }
      toastr.warning('Proxy: ' + proxy + ' error on checking, retrying.', 'Proxy Retry');
      requester();
    },
    complete: function () {
      //delete proxy_queue[proxy_index];
      if (proxy_index < proxy_queue.length) {
        proxy_index++;
        requester();
      }

      if (isLast == proxy_index) {
        proxy_updater();
        wrapper.prop('readonly', false);
        get_proxy_button.prop('disabled', false);
        proxy_index = 0;
        proxy_queue = [];
        proxy_start = false;
      }
    }
  });
}