
/**
 * AJAX runner base
 */
var AJAX = null;
/**
 * Ajax dump base
 */
var dumpAjax = false;
/**
 * Ajax indicator base
 */
var indicatorAjax = false;
const ajaxIDLoader = "ajxLoader_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
if (!$('#' + ajaxIDLoader).length) {
  $('body').append('<div id="' + ajaxIDLoader + '" style="position: fixed;z-index:9999;bottom:5px;left:5px;"><svg enable-background="new 0 0 40 40"height=40px id=loader-1 version=1.1 viewBox="0 0 40 40"width=40px x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><path d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
  s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
  c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"fill=#000 opacity=0.2 /><path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
  C22.32,8.481,24.301,9.057,26.013,10.047z"fill=#000><animateTransform attributeName=transform attributeType=xml dur=0.5s from="0 20 20"repeatCount=indefinite to="360 20 20"type=rotate /></path></svg></div>');
  $('#' + ajaxIDLoader).fadeOut('fast');
}

jQuery.ajaxPrefilter(function (options: JQueryAjaxSettings) {
  indicatorAjax = (typeof options.indicator == 'boolean' && options.indicator === true);
  dumpAjax = (typeof options.dump == 'boolean' && options.dump === true);
  /**
   * Proxying begin
   */
  if (options.crossDomain && jQuery.support.cors) {
    var allowed = true;
    if (options.url.match(/\.html$/g)) { allowed = false; }
    if (options.url.match(/^\//)) { allowed = false; }
    if (options.hasOwnProperty('proxy') && !options.proxy) { allowed = false; }

    if (allowed) {
      var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
      if (typeof options.proxy == 'string') {
        options.url = options.proxy.replace(/\/{1,99}$/s, '') + '/' + options.url;
      } else {
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
      }
    }
  }
});

/*
$(document).ajaxStart(function () {
});
*/

$(document).ajaxError(function (event, jqXHR, settings, errorThrown) {
  var content_type = jqXHR.getResponseHeader('Content-Type');
  if (typeof toastr != 'undefined') {
    if (/json|text\/plain/s.test(content_type)) { toastr.error('Request failed. (' + jqXHR.status + ' ' + jqXHR.statusText + ') ' + errorThrown, 'Request Info'); }
  }
});

$(document).ajaxSend(function (event, xhr, settings) {
  if (settings.hasOwnProperty('indicator') && settings.indicator) { $('#' + ajaxIDLoader).fadeIn('fast'); }
  if (dumpAjax) { toastr.info('Requesting...', "Request Info"); }
  if (!settings.hasOwnProperty('method')) {
    settings.method = 'POST';
  }
});

$(document).ajaxComplete(function (event: any, xhr, settings) {
  if (settings.hasOwnProperty('indicator') && settings.indicator) { $('#' + ajaxIDLoader).fadeOut('fast'); }
  if (dumpAjax) { toastr.success('Request complete', 'Request Info'); }
  AJAX = null;
  $('#' + ajaxIDLoader).fadeOut('slow');

  var content_type = xhr.getResponseHeader('Content-Type'), res;
  if (xhr.hasOwnProperty('responseJSON')) {
    res = xhr.responseJSON;
  } else {
    res = xhr.responseText;
    if (typeof res == 'string' && !empty(res) && /json|text\/plain/s.test(content_type)) {
      //begin decode json
      if (is_json(res)) {
        res = JSON.parse(res);
      }
    }
  }

  if (typeof res == 'object') {
    if (res.hasOwnProperty('redirect')) {
      this.location.replace(res.redirect);
      throw "Disabled";
    }
    if (res.hasOwnProperty('reload')) {
      location.href = location.href;
      throw "Disabled";
    }
  }
});

$(document).ajaxSuccess(function (event, request, settings) {
  var res;
  var content_type = request.getResponseHeader('Content-Type');
  if (request.hasOwnProperty('responseJSON')) {
    res = request.responseJSON;
  } else {
    res = request.responseText;
  }
  if (typeof res == 'string' && !empty(res) && /json|text\/plain/s.test(content_type)) {
    //begin decode json
    if (is_json(res)) {
      res = JSON.parse(res);
    }
  }
  if (typeof res == 'object' && !settings.hasOwnProperty('silent') && typeof toastr != 'undefined' && /json|javascript/s.test(content_type)) {
    var error = res.hasOwnProperty('error') && res.error ? true : false;
    var title = res.hasOwnProperty('title') ? res.title : 'Unknown Title';
    var msg = res.hasOwnProperty('message') ? res.message : 'Unknown Error';
    if (res.hasOwnProperty('error') && res.hasOwnProperty('message')) {
      if (error) {
        toastr.error(msg, title);
      } else {
        toastr.success(msg, title);
      }
    } else if (res.hasOwnProperty('message')) {
      toastr.info(msg, title);
    }
    if (res.hasOwnProperty('unauthorized')) {
      location.replace('/signin');
    }
  }
});

/*
jQuery.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  if (typeof options.data != 'undefined' && !jQuery.isEmptyObject(options.data)) {
    jqXHR.setRequestHeader('timeStamp', new Date().getTime().toString());
  }
});
*/

function processAjaxForm(res: string | object | JQueryXHR, success: string | Function) {
  if (typeof success == 'function') {
    success(res);
  } else if (typeof success == 'string') {
    call_user_func(success, window, res);
  } else {
    console.log(success + ' isnt success callback, instead of ' + typeof success);
  }
}

/**
 * Custom ajax
 * @param settings ajax settings object
 */
function ajx(settings: JQueryAjaxSettings, success: null | Function, failed: null | Function, complete: null | Function) {
  settings.headers = {
    'unique-id': getUID()
  }
  if (!settings.hasOwnProperty('indicator')) {
    settings.indicator = true;
  }
  if (!settings.hasOwnProperty('method')) {
    settings.method = 'POST';
  }

  return $.ajax(settings).done(function (res) {
    processAjaxForm(res, success);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    processAjaxForm(jqXHR, failed);
  }).always(function (jqXHR, textStatus, errorThrown) {
    processAjaxForm(jqXHR, complete);
  });
}

function AjaxForm() {
  $(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var t = $(this);
    var s = t.data('success'),
      er = t.data('error'),
      c = t.data('complete');
    ajx({
      url: t.attr('action'),
      method: t.attr('method'),
      data: t.serialize()
    }, s, er, c);
  });
}