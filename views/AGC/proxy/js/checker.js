var rgx = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/gm;
var proxy_done = [];
var working_proxy = [];
var dead_proxy = [];
var get_proxy_button = $("#get-proxy");
var blogger = $("#blogger");
//blogger.removeClass('d-none').removeAttr('disabled');
var wrapper = $('textarea#proxies');

wrapper.on('change', function () {
  var data = parse_proxy($(this).val());
  $(this).val(data.join("\n"));
});

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
      var data = parse_proxy(res);
      wrapper.val(data.join("\n"));
    }
  });
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


var proxy_index = 0;
var proxy_queue = [];
var proxy_start = false;
var isLast = 0;
$('#proxies-test').on('click', function () {
  proxy_start = true;

  var wrapper = $('textarea#proxies'),
    max = $("input#maxres"),
    ses = $('input#maxses'),
    maxses = ses.val() ? ses.val().toString().trim() : 0,
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
  if (maximum > 50) {
    wrapper.prop('readonly', false);
    get_proxy_button.prop('disabled', false);
    return toastr.error('Preventing excedeed process, were not allowed more than 50 sessions', 'Too many maximum sessions');
  }
  if (maxses > 5) {
    wrapper.prop('readonly', false);
    get_proxy_button.prop('disabled', false);
    return toastr.error('Preventing excedeed process, were not allowed more than 5 proxies at once session', 'Too many maximum executions');
  }
  for (var index = 0; index < maximum; index++) {
    getRandom(px, maxses, function (proxies) {
      var bulk_queue = [];
      for (var index = 0; index < proxies.length; index++) {
        if (!proxies[index]) {
          continue;
        }
        var ep = proxies[index].toString().trim();
        var pseudo = pseudo_builder(ep);
        if (!ep || ep == '') {
          wrapper.prop('readonly', false);
          get_proxy_button.prop('disabled', false);
          return toastr.error('proxy empty');
        }
        if (!inArray(ep, proxy_done) && !$('#' + pseudo).length) {
          proxy_done.push(ep);
          bulk_queue.push(ep);
          td += '<tr id="' + pseudo + '"><td>' + ep + '</td><td></td><td><div class="hovering ld-ext-right running checking"><span>Checking</span><div class="ld ld-ring ld-spin"></div></div></td><td> <input class="w3-check" type="checkbox" id="get" readonly> <label>GET</label> <input class="w3-check" type="checkbox" id="post" readonly> <label>POST</label> <input class="w3-check" type="checkbox" id="connect" readonly> <label>CONNECT</label> </td><td class="w3-center"></td></tr>';
        }
      }
      if (bulk_queue.length > 0) {
        proxy_queue.push(bulk_queue);
      }
    });
    var Last = index >= px.length - 1 || index >= maximum - 1 || index >= 50;
    /** Limit loop */
    if (Last) {
      isLast = index + 1;
      if (proxy_queue.length > 0) {
        CheckProxies();
      }
      //wrapper.val(px.join("\r\n"));
      break;
    }
  }
  if (!result_.find('.checking,.checked').length) {
    result_.html(td);
  } else {
    result_.append(td);
  }
});

function eRange(functionName, text) {
  if (!text) {
    text = 'more elements taken than available';
  }
  throw new RangeError(functionName + ": " + text);
}

var check_try = {
  'proxy': 'count'
};

/**
 *  Bulk proxy checker
 * @param {string} value separated commas
 */
function CheckProxies(value) {
  if (proxy_start) {
    if (!value && proxy_queue.length > 0) {
      var complete = function (json) {
        proxy_index++;
        if (proxy_queue.length - 1 >= proxy_index) {
          CheckProxies();
        } else {
          wrapper.prop('readonly', false);
          get_proxy_button.prop('disabled', false);
        }
      }
      var success = function (json) {
        if (typeof json[0] != 'undefined') {
          json = json[0];
        }
        foreach(json, function (key, value) {
          var elem = $("#" + pseudo_builder(key));
          if (elem.length) {
            console.log(value);
            elem.addClass('checked');

            if (value) {
              if (value.hasOwnProperty('ERROR')) {
                elem.find('td').slice(1, 5).html('ERROR');
                elem.addClass('w3-red');
                return;
              }
              if (value.hasOwnProperty('SUPPORT_POST')) {
                elem.find('input#post').prop('checked', value.SUPPORT_POST);
              }
              if (value.hasOwnProperty('SUPPORT_GET')) {
                elem.find('input#get').prop('checked', value.SUPPORT_GET);
              }
              if (value.hasOwnProperty('SUPPORT_CONNECT')) {
                elem.find('input#connect').prop('checked', value.SUPPORT_CONNECT);
              }
              if (value.hasOwnProperty('PROXY_TYPE')) {
                if (value.PROXY_TYPE) {
                  elem.find('td:eq(1)').html(value.PROXY_TYPE.toString().toUpperCase());
                }
              }
              if (value.hasOwnProperty('ANONYMITY')) {
                if (value.ANONYMITY) {
                  elem.find('td:eq(2)').html(value.ANONYMITY.toString().capitalize());
                }
              }
              if (value.hasOwnProperty('SUPPORT_GOOGLE')) {
                if (value.SUPPORT_GOOGLE) {
                  elem.find('td:eq(4)').html('<i class="far fa-check-circle w3-text-teal"></i>');
                } else {
                  elem.find('td:eq(4)').html('<i class="far fa-times-circle w3-text-red"></i>');
                }
              }
            }
            elem.find('[id="get"], [id="post"], [id="connect"]').prop('disabled', true);
          }
        });
      }
      req(proxy_queue[proxy_index], complete, success);
    } else {
      req(value);
    }
  }
}

/**
 * Perform check
 * @param {Array} value
 * @param {Function} complete complete callback
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
function req(value, complete, success, error) {
  $.ajax({
    url: '/AGC/proxy/checker',
    method: 'POST',
    data: {
      p: value.join(',')
    },
    complete: function (res) {
      if (typeof complete == 'function') {
        complete(res.responseJSON);
      }
    },
    success: function (res) {
      if (typeof success == 'function') {
        success(res);
      }
    },
    error: function (res) {
      if (typeof error == 'function') {
        error(res);
      }
    }
  });
}