/**
 * jQuery Extender
 */
(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
}(jQuery));

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

//Filter number only
if (typeof $.fn.inputFilter != 'undefined') {
  $("input[type='number'], textarea[type='number'], [filter='number']").inputFilter(function(value) {
    if (typeof value == 'string') {
      return /^\d*$/.test(value);
    }
  });
} else {
  var INPT =  document.querySelectorAll("input[type='number'], textarea[type='number'], [filter='number']");
  for (var index = 0; index < INPT.length; index++) {
    var element = INPT[index];
    setInputFilter(element, function(value) {
      return /^\d*$/.test(value); // Allow digits and '.' only, using a RegExp
    });
  }
}

window.dimas = new Object();

/**
 * Rupiah currency auto format
 */
dimas.rp = function(angka, prefix) {
  if (!prefix) {
    prefix = "Rp. ";
  }
  var number_string = angka.toString().replace(/[^,\d]/g, ''),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return (!prefix ? rupiah : prefix + ' ' + rupiah);
}

/**
 * Check if string is number
 */
dimas.isNumber = function(v) {
  return !isNaN(v - parseFloat(v)) && /^\d+jQuery/.test(v);
}

/**
 * Disabling buttons whole documents
 */
dimas.disable_button = function(ini, text) {
  if (!ini) {
    var b = jQuery('[type="submit"]');
  } else {
    var b = ini.parents('form').find('[type="submit"]');
  }

  b.prop('disabled', true);

  if (text) {
    var bc = b.next('p#form-error');
    if (bc.length == 0) {
      jQuery('<p id="form-error" class="form-text text-danger">' + text + '</p>').insertAfter(b).hide().show('slow');
    }
  }
}

/**
 * Enabling buttons whole documents
 */
dimas.enable_button = function(ini, text) {
  if (!ini) {
    var b = jQuery('[type="submit"]');
  } else {
    var b = ini.parents('form').find('[type="submit"]');
  }

  b.prop('disabled', false);

  if (text) {
    var bc = b.next('p#form-error');
    if (bc.length > 0) {
      bc.hide('slow', function() {
        setTimeout(function() {
          bc.remove()
        }, 1000);
      });
    }
  }
}

/**
 * strpad / startwith zero [0]
 */
dimas.strpad = function(val) {
  if (val >= 10) {
    return val;
  } else {
    return '0' + val;
  }
}

/**
 * Autofill datetime-local value
 */
dimas.datetimelocal = function(v) {
  var d = (!v ? new Date() : new Date(v));
  jQuery('input[type=datetime-local]').val(d.getFullYear() + "-" + this.strpad(d.getMonth() + 1) + "-" + this.strpad(d.getDate()) + "T" + this.strpad(d.getHours()) + ":" + this.strpad(d.getMinutes()));
}

dimas.redirect = function(h) {
  location.replace(h);
}

dimas.recode = function(content, passcode) {
  var result = [];
  var str = '';
  var codesArr = JSON.parse(content);
  var passLen = passcode.length;
  for (var i = 0; i < codesArr.length; i++) {
    var passOffset = i % passLen;
    var calAscii = (codesArr[i] - passcode.charCodeAt(passOffset));
    result.push(calAscii);
  }
  for (var i = 0; i < result.length; i++) {
    var ch = String.fromCharCode(result[i]);
    str += ch;
  }
  return str;
}

/**
 * Get js file from url
 * callback == function
 */
dimas.js = function(url, callback) {
  var pel = document.body || document.head;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onreadystatechange = callback;
  script.onload = callback;
  pel.appendChild(script);
}

/**
 * Countdown trigger
 */
dimas.pctdRUN = function(elm) {
  var tl = (elm.attr('countdown') > 0 ? elm.attr('countdown') : 5),
    bs = (elm.data('base') ? elm.data('base') : 'bg-info'),
    bw = (elm.data('warning') ? elm.data('warning') : 'bg-danger'),
    bc = (elm.data('success') ? elm.data('success') : 'bg-success'),
    countdown = elm.progressBarTimer({

      warningThreshold: 5,
      timeLimit: tl,

      // base style
      baseStyle: bs,

      // warning style
      warningStyle: bw,

      // complete style
      completeStyle: bc,

      // should the timer be smooth or stepping
      smooth: true,

      // striped progress bar
      striped: true,

      // animated stripes
      animated: true,

      // height of progress bar
      // 0 = default height
      height: 0,
      onFinish: function() {
        var callback = elm.data("callback");
        if (callback) {
          var xn = window[callback];
          if (typeof xn == 'function') {
            var x = eval(callback);
            x();
          } else {
            console.log(callback + ' isn\'t function ');
          }
        }
      },
      label: {
        show: true,
        type: 'percent' // or 'seconds' => 23/60
      },
      autoStart: true
    });
  return countdown;
}

/**
 * Progress countdown
 */
dimas.pctd = function(elm) {
  var t = this;
  if (typeof progressBarTimer == 'undefined') {
    this.js('https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/js/jquery.progressBarTimer.js', function() {
      t.pctdRUN(elm);
    });
  } else {
    window.onload = function(params) {
      dimas.pctdRUN(elm);
    }
  }
}

/**
 * Parseurl just like as parse_url at php
 */
dimas.parseurl = function(url) {
  var parser = document.createElement('a'),
    searchObject = {},
    queries, split, i;
  // Let the browser do the work
  parser.href = url;
  // Convert query string to object
  queries = parser.search.replace(/^\?/, '').split('&');
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash,
    protohost: parser.protocol + '//' + parser.host
  };
}

/**
 * Odd or Even (Ganjil Genap)
 */
dimas.oddoreven = function(n, type) {
  if (!type) {
    type = 'odd';
  }
  var time = (!n ? new Date().getDay() : Number(n));

  if (!/^-{0,1}\d+jQuery/.test(time)) {
    alert('arguments is not number, please remove quote');
    return;
  }
  hasil = time % 2;
  return hasil == (type == ('odd' || 'ganjil') ? 1 : 0);
}

/**
 * Set cookie
 */
dimas.sc = function(name, value, hours) {
  var expires = "";
  if (hours) {
    var date = new Date();
    date.setTime(date.getTime() + (hours * 3600 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

dimas.allcookies = function() {
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}

/**
 * Get cookie
 * @param string name cookie
 */
dimas.gc = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }

  return null;
}

/**
 * Remove Cookie
 */
dimas.rc = function(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

/**
 * Get Query name from current url
 */
dimas.getquery = function(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

/**
 * Function initialization
 */

jQuery(document).one('click', '#logout', function(e) {
  e.preventDefault();
  jQuery.post(location.href, {
    logout: true
  }, function() {
    jQuery.get(jQuery(this).attr('href'));
    window.location.reload(1);
  });
});
var modal = jQuery('#modalAjax');

function e_modal_error(data) {
  console.log(typeof data)
  modal.find('[id="title"]').removeClass('tx-success').addClass('tx-danger').html('Failure!');
  modal.find('[id="desc"]').html(JSON.stringify(data));
  modal.find('#icon').addClass('ion-ios-close-circle-outline tx-danger').removeClass('ion-ios-checkmark-circle-outline tx-success');
  modal.find('.btn').removeClass('btn-success').addClass('btn-danger');
  modal.modal('show');
}

function e_modal_success(data) {
  modal.find('[id="title"]').removeClass('tx-danger').addClass('tx-success').html('Successfull!');
  modal.find('[id="desc"]').html(data);
  modal.find('#icon').removeClass('ion-ios-close-circle-outline tx-danger').addClass('ion-ios-checkmark-circle-outline tx-success');
  modal.find('.btn').removeClass('btn-danger').addClass('btn-success');
  modal.modal('show');
}

jQuery('form[id="ajax"]').submit(function(e) {

  e.preventDefault(); // avoid to execute the actual submit of the form.

  var form = jQuery(this);
  var url = form.attr('action');
  var method = form.attr('method');

  jQuery.ajax({
    type: "POST",
    url: url,
    data: form.serialize(),
    success: function(data) {
      //console.log({ url: url, method: method, data: data });
      data = (data[0] || data);
      if (!data) {
        e_modal_error(data)
      }
      if (data.hasOwnProperty('success')) {
        e_modal_success(data.success)
      } else if (data.hasOwnProperty('error')) {
        e_modal_error(data.error)
      } else {
        e_modal_error(data);
      }
      if (data.hasOwnProperty('redirect')) {
        window.location.href = data.redirect;
      } else if (data.redirect || typeof redirect_to != 'undefined') {
        window.location.href = redirect_to;
      }
      if (data.hasOwnProperty('reset') && data.reset) {
        form.trigger('reset');
      }
      if (data.hasOwnProperty('refresh') && data.refresh) {
        window.location.reload(1);
      }
      if (typeof gexec != 'undefined') {
        gexec();
      }
    }
  });


});

/** Format Rupiah */
var inputrp = jQuery('[id="format-rupiah"]');
if (inputrp.length) {
  inputrp.on('keyup keydown change', function(e) {
    var t = jQuery(this);
    var v = t.val();
    var n = t.next('.form-text, #rupiah');
    if (dimas.isNumber(v)) {
      var V = dimas.rp(v);
      t.css('border-color', 'green');
      dimas.enable_button(t, V);
    } else {
      var V = 'Bukan nomor';
      t.css('border-color', 'red');
      dimas.disable_button(t, V);
    }
    if (n.length) {
      n.text(V);
    } else {
      jQuery('<p id="rupiah" class="form-text text-muted">' + V + '</p>').insertAfter(t);
    }
  });
}

/** datetime-local */
if (typeof dimas == 'object' && typeof dimas.datetimelocal != 'undefined') {
  dimas.datetimelocal();
}

/** metode rekening (debet) */
var select_method = jQuery('select[id="method"]');
if (select_method.length) {
  select_method.change(function() {
    var t = jQuery(this),
      v = t.val(),
      r = t.next('input#rekening');
    if (v == 'debit') {
      if (r.length === 0) {
        jQuery('<input type="text" class="form-control mt-2" name="rekening" placeholder="No rekening" id="rekening" required>').insertAfter(t).hide().show('slow');
      }
    } else {
      r.hide('slow', function(params) {
        setTimeout(function() {
          r.remove()
        }, 1000);
      });
    }
  });
}

/** Tooltip */
jQuery('body').tooltip({
  selector: '[data-toggle="tooltip"]'
});
//jQuery('[data-toggle="tooltip"]').tooltip();

// colored tooltip
jQuery('[data-toggle="tooltip-primary"]').tooltip({
  template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
});

jQuery('[data-toggle="tooltip-secondary"]').tooltip({
  template: '<div class="tooltip tooltip-secondary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
});

jQuery('[data-toggle="tooltip-danger"]').tooltip({
  template: '<div class="tooltip tooltip-danger" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
});

/** datatables */
if (jQuery.fn.DataTable && jQuery('#datatable1').length) {
  jQuery('#datatable1').DataTable({
    responsive: true,
    language: {
      searchPlaceholder: 'Search...',
      sSearch: '',
      lengthMenu: '_MENU_ items/page',
    }
  });
}

/** Select2 */
var ds = jQuery('.dataTables_length select');
if (ds.length || ds.data('select2') || jQuery.fn.select2) {
  ds.select2({
    minimumResultsForSearch: Infinity
  });
}

/** Query URL */
var hash = window.location.hash.substr(1);

var result = hash.split('&').reduce(function(result, item) {
  var parts = item.split('=');
  result[parts[0]] = parts[1];
  return result;
}, {});

if (hash.length > 1) {
  console.log(result);
}

jQuery('a[data-param]').click(function(e) {
  e.preventDefault();
  var t = jQuery(this),
    h = t.attr('href'),
    p = t.attr('data-param');

});

/** Progress bar */
var elm = jQuery('[countdown]');

if (elm.length > 0) {
  elm.each(function(e) {
    var t = jQuery(this);
    dimas.pctd(t);
  });
}

/** document body listener */
jQuery(document.body).on('click', '[data-redirect]', function(E) {
  var red = jQuery(this).attr('data-redirect');
  if (red && red != '') {
    window.open(red, location.host).focus();
  }
});

/** Linkify */
if (typeof mask_link != 'undefined') {
  var L = (jQuery('[data-linkify]').length ? jQuery('[data-linkify]') : jQuery(document.body))
  window.onload = function() {
    L.linkify({
      target: "_blank",
      attributes: null,
      className: 'linkified',
      format: function(value, type) {
        return value;
      },
      formatHref: function(href, type) {
        return '/youtube/s/' + btoa(CryptoJS.AES.encrypt(href, (typeof hash_pass != 'undefined' ? hash_pass : location.host)));
      },
    });
  }
}

//new tab links hide refferer
var nwtb = $('[data-newtab]');
if (nwtb.length) {
  nwtb.click(function(e) {
    window.open('http://href.li/?' + $(this).data('newtab'), 'newtab').focus();
  });
}

//links new tab form submit
var aform = $('[form]');
if (aform.length > 1) {
  aform.click(function(e) {
    e.preventDefault();
    var id_form = $(this).attr('form');
    if (typeof id_form != 'undefined') {
      var winame = document.getElementById(id_form).getAttribute('target'); //reduce caching
      console.log('Submiting Form ID#' + id_form);
      window.open('', winame ? winame : 'FormDynamic').focus();
      document.getElementById($(this).attr('form')).submit();
    }
    //w = window.open('', 'bagas31-post');
    //$('form#' + $(this).attr('form')).submit();
    //w.focus();
  });
}

//open in new tab
function openInNewTab(url, name) {
  if (typeof url != 'undefined' && typeof name != 'undefined') {
    var win = window.open(url, name);
    win.focus();
  }
}

//open in new tab
$(document.body).on('click', '[id="newtab"]', function(e) {
  e.preventDefault();
  if ($(this).attr('href')) {
    openInNewTab($(this).attr('href'), ($(this).data('name') ? $(this).data('name') : '_blank'));
  }
});

//get currency symbol
function get_currency_symbol(filter) {
  var amount = 0;
  var ident = navigator.language;
  var currency_type;
  switch (ident) {
    case 'de-DE':
      currency_type = 'EUR'
      break;
    case 'id-ID':
      currency_type = 'IDR'
      break;
    default:
      currency_type = 'USD'
      break;
  }
  var format = amount.toLocaleString(ident, {
    style: 'currency',
    currency: currency_type
  });
  return format.toString().replace('0,00', '');
}

//Analystics
function analys(event_action, event_label, event_category, event_value, event_callback) {
  var conf = {
    'event_label': event_label,
    'event_category': event_category,
    'value': event_value,
    'event_callback': (typeof event_callback == 'function' ? event_callback : false)
  }
  return gtag('event', event_action, conf);
}
/**
 * Generate UUID v4
 */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//CryptoJS

/*var salt = 'salt';
  var iv = '1111111111111111';
  */
var iterations = '999';
/**
 * Crypto get key
 * @param string passphrase
 * @param string salt
 */
function CryptoK(passphrase, salt) {
  var key = CryptoJS.PBKDF2(passphrase, salt, {
    'hasher': CryptoJS.algo.SHA256,
    'keySize': 64 / 8,
    'iterations': iterations
  });
  return key;
}
/**
 * Crypto encrypt
 * @param string passphrase
 * @param string plainText
 * @param string salt
 * @param string iv
 */
function CryptoE(passphrase, plainText, salt, iv) {
  var key = CryptoK(passphrase, salt, iterations);
  var encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv)
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
/**
 * Crypto decrypt
 * @param string passphrase
 * @param string encryptedText
 * @param string salt
 * @param string iv
 */
function CryptoD(passphrase, encryptedText, salt, iv) {
  var key = CryptoK(passphrase, salt);
  var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv)
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * Generate unique id
 */
function GeneratorID() {};
GeneratorID.prototype.rand = Math.floor(Math.random() * 26) + Date.now();
GeneratorID.prototype.genId = function() {
  return this.rand++;
};
GeneratorID.prototype.getId = function() {
  this.genId();
  return jQuery.fn.jquery + '.' + this.rand;
};
var GID = new GeneratorID();
var IV = Date.now();
var GI = GID.getId();
var ST = (location.host.replace('.', '') + GI).toUpperCase();
if (typeof NO_CSRF == 'undefined') {
  refreshCSRF();
  setInterval(function() {
    refreshCSRF()
  }, 60000);
}

function refreshCSRF() {
  $.ajax({
    type: "POST",
    url: '/session/get?check=1',
    xhrFields: {
      withCredentials: true
    },
    headers: {
      'Authorization': 'Basic ' + btoa('a:b'),
      'X-Identity': navigator.userAgent,
    },
    success: function(x) {
      if (typeof x[0] != 'undefined') {
        if (typeof x[0].expired != 'undefined') {
          if (x[0].expired !== false) {
            $.ajax({
              type: "POST",
              url: '/session/get?delete=1',
              xhrFields: {
                withCredentials: true
              },
              headers: {
                'Authorization': 'Basic ' + btoa('a:b'),
                'X-Identity': navigator.userAgent,
              },
              beforeSend: function() {
                //loadingio('Refreshing CSRF Security');
              },
              success: function(x) {
                $.ajax({
                  type: "POST",
                  url: '/session/set',
                  headers: {
                    'X-Set': GI,
                    'X-Salt': ST,
                    'X-Iv': IV,
                    'X-Requested-With': CryptoE(GI, navigator.userAgent, ST, IV),
                    'X-Cookie-Enabled': navigator.cookieEnabled,
                    'X-Browser-Online': navigator.onLine
                  },
                  beforeSend: function() {
                    loadingio('Refreshing CSRF Security');
                  },
                  success: function(eCSRF) {
                    if (typeof eCSRF.getResponseHeader == 'function') {
                      //console.log(e.getAllResponseHeaders());
                      //console.log(navigator);
                      if (eCSRF.getResponseHeader('x-requested-with')) {
                        if (eCSRF.getResponseHeader('x-requested-with') == navigator.userAgent) {
                          dimas.sc('csrf-lifetime', new Date().addHours(0.1), 0.1);
                          if (eCSRF.getResponseHeader('x-csrf')) {
                            dimas.sc('csrf', eCSRF.getResponseHeader('x-csrf'), 0.1);
                          }
                          location.reload(1);
                        }
                      }
                    }
                  },
                  complete: function() {
                    //loadingio(false, null, 'disabled');
                  }
                });
              },
              complete: function() {
                loadingio(false, null, 'disabled');
              }
            });
          } else {
            var els = document.querySelectorAll('form,input,textarea,a');
            for (var i = 0; i < els.length; i++) {
              els[i].setAttribute("data-csrf", x[0].csrf);
            }
          }
        }
      }
    }
  });
}
/**
 * Create JSON
 * @param mixed jsObj
 * @param boolean tabs
 */
function createJSON(jsObj, tabs) {
  if (tabs) {
    return JSON.stringify(jsObj, null, "\t"); // stringify with tabs inserted at each level
  } else {
    return JSON.stringify(jsObj, null, 4); // stringify with 4 spaces at each level}
  }
}

function loadingio(text, callback, mode) {
  if (typeof text == 'undefined' || typeof text == 'boolean' || !text) {
    text = 'Please wait';
  }
  text.toString().toUpperCase();
  if (document.getElementById('loadingio-wrapper')) {
    if (mode == 'disabled' || mode == 'disable') {
      document.getElementById('loadingio-wrapper').classList.remove('running');
    } else if (typeof mode == 'undefined' || (typeof mode != 'undefined' && (mode == 'enable' || mode == 'enabled'))) {
      document.getElementById('loadingio-text').innerHTML = text;
      document.getElementById('loadingio-wrapper').classList.toggle('running');
    }
  } else {
    var elemDiv = document.createElement('div');
    elemDiv.innerHTML = '<div id="loadingio-wrapper" class="ld-over-full running"><span class="ld"><span class="ld ld-ball ld-bounce"></span><span id="loadingio-text" class="text pt-3">' + text + '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></span></span></div>';
    document.body.appendChild(elemDiv);
  }

  if (typeof callback == 'function') {
    callback(arguments);
  }
}

function LoadScript(url, callback) {
  loadingio('Loading Script ' + url);
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onreadystatechange = function() {
    if (typeof callback == 'function') {
      loadingio('Readystate ' + url);
      callback();
    }
    loadingio(false, false, 'disable');
  };
  script.onload = function() {
    loadingio('Onload Script ' + url);
    if (typeof callback == 'function') {
      callback();
    }
    loadingio(false, false, 'disable');
  };
  document.body.appendChild(script);
  loadingio(false, false, 'disable');
}

function isAdmin(successcb, errorcb) {
  $.ajax({
    url: '/AGC/user/info',
    method: 'POST',
    beforeSend: function() {
      loadingio('Checking User');
    },
    success: function(rs) {
      if (typeof rs[0] != 'undefined') {
        rs = rs[0];
      }
      if (rs.admin === false) {
        if (typeof errorcb == 'function') {
          errorcb(arguments);
        }
      } else {
        if (typeof successcb == 'function') {
          successcb(arguments);
        }
      }
    },
    error: function(re) {
      console.log({
        error: re
      })
    },
    complete: function() {
      loadingio(false, false, 'disable');
    }
  });
}
/**
 * Load CSS asynchronous
 * @param {String} CSSFiles
 */
function loadCSS(CSSFiles) {
  if (Array.isArray(CSSFiles)) {
    for (var x = 0; x < CSSFiles.length; x++) {
      createLink(CSSFiles[x]);
    }
  } else if (typeof CSSFiles == 'string') {
    createLink(CSSFiles);
  }
}

function createLink(CSSFile, type, rel) {
  if (!rel) {
    rel = "stylesheet";
  }
  if (!type) {
    type = "text/css";
  }

  var fileref = document.createElement("link");
  fileref.setAttribute("rel", rel);
  fileref.setAttribute("type", type);
  fileref.setAttribute("href", CSSFile);
  document.getElementsByTagName("head")[0].appendChild(fileref);
}
/**
 * call_user_func
 * @param string func function name
 */
function __call(func) {
  this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}

/**
function target(a) {
    alert(a)
}

var o = {
    suffix: " World",
    target: function(s) { alert(s + this.suffix); }
};

__call("target", "Hello");

__call.call(o, "target", "Hello");
 */

if (typeof toastr == 'object') {
  toastr.options.closeMethod = 'fadeOut';
  toastr.options.closeDuration = 300;
  toastr.options.closeEasing = 'swing';
  toastr.options.showEasing = 'swing';
  toastr.options.hideEasing = 'linear';
  toastr.options.showMethod = 'slideDown';
  toastr.options.hideMethod = 'slideUp';
  toastr.options.closeMethod = 'slideUp';
  toastr.options.preventDuplicates = true;
  toastr.options.closeButton = true;
  toastr.options.closeHtml = '<button><i class="fas fa-times"></i></button>';
  toastr.options.timeOut = 3000; // How long the toast will display without user interaction
  toastr.options.extendedTimeOut = 6000; // How long the toast will display after a user hovers over it
  toastr.options.progressBar = true;
}

/**
 * parse proxy from string
 * @param string str
 * @return array proxy list filtered
 */
function parse_proxy(str) {
  var matchs, px = [];
  loadingio('Parsing proxies', function() {

    /*
    while (match = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/g.exec(str)) {
      console.log('Match: "' + match[0] + '" first group: -> "' + match[1] + '" second group -> ' + match[2]);
      if (typeof match[0] != 'undefined' && typeof match[2] != 'undefined' && !inArray(match[0], px)) {
        px.push(match[0]);
      }
    }
    */
    if (typeof str == 'string') {
      var regex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\:[0-9]{1,6}/gm,
        match, proxyMatch;
      while (match = regex.exec(str)) {
        proxyMatch = match[0];
        //console.log(proxyMatch)
        if (proxyMatch.includes(':') && !inArray(proxyMatch, px)) {
          px.push(proxyMatch);
        }
      }
      var regex = /Proxy\([\'\"]([a-zA-Z0-9\=]*)[\'\"]\)/gm,
        match, proxyMatch;
      while (match = regex.exec(str)) {
        proxyMatch = atob(match[1]);
        //console.log(proxyMatch)
        if (proxyMatch.includes(':') && !inArray(proxyMatch, px)) {
          px.push(proxyMatch);
        }
      }
    }
    loadingio(null, null, 'disabled');
    return px;
  });

  return array_shuffle(array_unique(px));
}

function arrayCompare(a1, a2) {
  if (a1.length != a2.length) return false;
  var length = a2.length;
  for (var i = 0; i < length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}

/**
 * in_array PHP equivalent
 * @param mixed needle
 * @param array haystack
 */
function inArray(needle, haystack) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (typeof haystack[i] == 'object') {
      if (arrayCompare(haystack[i], needle)) return true;
    } else {
      if (haystack[i] == needle) return true;
    }
  }
  return false;
}

function in_array(needle, haystack) {
  return inArray(needle, haystack);
}

function array_keys(haystack) {
  return Object.keys(haystack);
}
/**
 * pick random from array
 * @param {array} arrays
 * @param {boolean} unique Unique the arrays
 */
function array_rand(arrays, unique) {
  if (unique) {
    arrays = array_unique(arrays);
  }
  var index = Math.floor(Math.random() * arrays.length);
  return {
    index: index,
    value: arrays[index]
  };
}
/**
 * Array unique
 * @param {array} arrays
 */
function array_unique(arrays) {
  return arrays.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  });
}

/**
 *
 * @param array arrayName
 * @param stringnumber key
 */
function array_unset(arrayName, key) {
  var x;
  var tmpArray = new Array();
  for (x in arrayName) {
    if (x != key) {
      tmpArray[x] = arrayName[x];
    }
  }
  return tmpArray;
}

var LoadingOpt;
/**
 * Another loader initializer
 * @param {any} text text of content loader
 * @param {string} text.content loading content text
 * @param {string} text.footer loading content footer
 * @param {object} options options loader
 * @param {function} options.callback callback function
 * @param {string} options.position center | right
 * @param {boolean} options.disable true or false
 * * center or right
 */
function Loading(text, options) {
  if (typeof options == 'function') {
    options = {
      callback: options
    };
  }
  if (options === false || options === null || options == 'disable' || options == 'disabled') {
    options = {
      disable: true
    }
  }
  if (!options) {
    options = {
      position: 'center'
    }
  } else if (!options.hasOwnProperty('position')) {
    options.position = 'center';
  }
  if (typeof text == 'string') {
    text = {
      title: text
    }
  }

  switch (options.position) {
    case 'right':
      options.contentLoadingClass = '.loading-corner-right-text';
      options.bodyLoadingClass = 'loading-right';
      options.footerLoadingClass = '.loading-corner-right-footer';
      break;

    default:
      options.contentLoadingClass = '.modal-loading-text';
      options.bodyLoadingClass = 'loading';
      options.footerLoadingClass = '.modal-loading-footer';
      break;
  }
  LoadingOpt = options;

  $('body').addClass(options.bodyLoadingClass);
  if (options.disable || !text) {
    $('body').removeClass('loading loading-right');
  } else if (typeof text == 'string' || typeof text == 'number') {
    $(options.contentLoadingClass).html(text);
  } else if (typeof text == 'object') {
    if (text.hasOwnProperty('content')) {
      $(options.contentLoadingClass).html(text.content);
    } else if (text.hasOwnProperty('title')) {
      $(options.contentLoadingClass).html(text.title);
    }
    if (text.hasOwnProperty('footer')) {
      $(options.footerLoadingClass).html(text.footer).show();
    } else {
      $(options.footerLoadingClass).hide();
    }
  }
  if (options) {
    if (options.hasOwnProperty('callback')) {
      if (typeof options.callback == 'function') {
        return options.callback();
      }
    }
  }
}
/**
 * Add class if not exists
 * @param {Element} element element from DOM
 * @param {string} className class name
 */
function toogleClass(element, className) {
  return element.classList.toggle(className);
}

function UNIQUE_ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function array_shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
/**
 * Check Blogger
 * @param {function} callback BlogID
 */
function check_blogger(callback) {
  loadingio('Blogger initialize');
  $.post('/AGC/blogger/index', {
    'test': true
  }, function(r) {
    if (r) {
      if (typeof r[0] != 'undefined') {
        r = r[0];
      }
      if (typeof r.message != 'undefined' && typeof r.type != 'undefined') {
        loadingio(null, null, 'disable');
        switch (r.type) {
          case 'blogger_access':
            swal({
              title: 'Blogger access is required',
              content: {
                element: 'a',
                attributes: {
                  target: '_blank',
                  href: r.message,
                  innerHTML: 'Authenticate with blogger is required, click here to give blogger access'
                }
              }
            });
            break;
          case 'blogger_id':
            swal({
              title: 'Blogger user ID is required',
              content: {
                element: 'a',
                attributes: {
                  target: '_blank',
                  href: r.message,
                  innerHTML: 'Blogger user ID required, you must add into your account manually here'
                }
              }
            });
            break;
          case 'blog_id':
            swal({
              title: 'Blog ID is required',
              content: {
                element: 'a',
                attributes: {
                  target: '_blank',
                  href: r.message,
                  innerHTML: 'Blog ID required, you must add into your account manually here'
                }
              }
            });
            break;
          case 'choose_blog':
            var selectBlog = document.createElement('select');
            selectBlog.className = 'form-control';
            selectBlog.id = 'blogger-chooser';
            //console.log(r);
            if (typeof r.message != 'undefined' && r.message) {
              for (var index = 0; index < r.message.length; index++) {
                var element = r.message[index];
                var option = document.createElement("option");
                option.value = element.id;
                option.text = element.name;
                selectBlog.appendChild(option);
              }
              swal({
                title: 'Choose your blog',
                content: selectBlog,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }).then(function(c) {
                $.post('/AGC/blogger/index', {
                  'bid-manual': $('select#blogger-chooser').val()
                }, function(r) {
                  if (typeof callback == 'function') {
                    callback($('select#blogger-chooser').val());
                  }
                });
              });
            }
            break;
        }
        console.log(r);

      }
    }
  });
}
/**
 * jQuery pseudo builder
 * @param {string} string
 */
function pseudo_builder(string) {
  if (string) {
    return string.replace(/[\W\s]/gm, '');
  }
}

/**
 * Loop key value of object
 * @param {Object} object
 * @param {Function} callback
 */
function foreach(object, callback) {
  var key, value;
  Object.keys(object).forEach(function(key) {
    if (typeof callback == 'function') {
      callback(key, object[key]);
    }
  });
  /*
    for ([key, value] of Object.entries(object)) {
      if (typeof callback == 'function'){
        callback(key, value);
      } else {
        console.log(key, value);
      }
    }
  */
}

/**
 * Get multiple random element from array
 * @param {Array} arr array sources
 * @param {Number} n maximum element to be in result
 * @param {Function} callback function to process result
 */

function getRandom(arr, n, callback) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    //throw new RangeError("getRandom: more elements taken than available");
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  if (typeof callback == 'function') {
    return callback(result);
  } else {
    return result;
  }
}

// A map of the entities we want to handle.
// The numbers on the left are the Unicode code point values; their
// matching named entity strings are on the right.
var entityMap = {
  "160": "&nbsp;",
  "161": "&iexcl;",
  "162": "&#cent;",
  "163": "&#pound;",
  "164": "&#curren;",
  "165": "&#yen;",
  "166": "&#brvbar;",
  "167": "&#sect;",
  "168": "&#uml;",
  "169": "&copy;",
  // ...and lots and lots more, see http://www.w3.org/TR/REC-html40/sgml/entities.html
  "8364": "&euro;"    // Last one must not have a comma after it, IE doesn't like trailing commas
};

// The function to do the work.
// Accepts a string, returns a string with replacements made.
/**
 * Encode HTML string to HTML entities
 * @param {String} str
 */
function prepEntities(str) {
  // The regular expression below uses an alternation to look for a surrogate pair _or_
  // a single character that we might want to make an entity out of. The first part of the
  // alternation (the [\uD800-\uDBFF][\uDC00-\uDFFF] before the |), you want to leave
  // alone, it searches for the surrogates. The second part of the alternation you can
  // adjust as you see fit, depending on how conservative you want to be. The example
  // below uses [\u0000-\u001f\u0080-\uFFFF], meaning that it will match and convert any
  // character with a value from 0 to 31 ("control characters") or above 127 -- e.g., if
  // it's not "printable ASCII" (in the old parlance), convert it. That's probably
  // overkill, but you said you wanted to make entities out of things, so... :-)
  return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0000-\u001f\u0080-\uFFFF]/g, function(match) {
      var high, low, charValue, rep

      // Get the character value, handling surrogate pairs
      if (match.length == 2) {
          // It's a surrogate pair, calculate the Unicode code point
          high = match.charCodeAt(0) - 0xD800;
          low  = match.charCodeAt(1) - 0xDC00;
          charValue = (high * 0x400) + low + 0x10000;
      }
      else {
          // Not a surrogate pair, the value *is* the Unicode code point
          charValue = match.charCodeAt(0);
      }

      // See if we have a mapping for it
      rep = entityMap[charValue];
      if (!rep) {
          // No, use a numeric entity. Here we brazenly (and possibly mistakenly)
          rep = "&#" + charValue + ";";
      }

      // Return replacement
      return rep;
  });
}