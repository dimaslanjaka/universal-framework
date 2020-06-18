var textAreas = document.getElementsByTagName('textarea');
Array.prototype.forEach.call(textAreas, function(elem) {
  elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
});

/**
 * Check current framework running at localhost
 */
function is_localhost() {
  var is_local = location.host.match(/^localhost|^127|\.io$/s);
  return is_local;
}

function is_development() {
  return document.getElementsByTagName('html');
}
console.log(is_development());

/**
 * Force HTTPS
 */
function forceSSL() {
  if (location.protocol !== 'https:' && !is_localhost()) {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
  }
}

/**
 * check native event for CustomEvent
 * @param {any} eventname
 */
function isNativeEvent(eventname) {
  return typeof document.body["on" + eventname] !== "undefined";
}

var events = {};
var original = window.addEventListener;

window.addEventListener = function(type, listener, useCapture) {
  events[type] = true;
  return original(type, listener, useCapture);
};

/**
 * Check if object has been added into event
 * @param {any} type
 */
function hasEventBeenAdded(type) {
  return (type in events);
}

/**
 * Call function by string with arguments
 * * You would call it like so:
 * * executeFunctionByName("My.Namespace.functionName", window, arguments);
 * * Note, you can pass in whatever context you want, so this would do the same as above:
 * * executeFunctionByName("Namespace.functionName", My, arguments);
 * @param {String} functionName
 * @param {Window} context
 */
function call_user_func(functionName, context /*, args */ ) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  //console.log($[func]);
  if (context[func]) {
    return context[func].apply(context, args);
  } else if (window[func]) {
    return window[func](arguments);
  } else if (func != '') {
    try {
      // @ts-ignore
      var tmpFunc = new Function(func(arguments));
      tmpFunc();
    } catch (error) {
      return console.error({
        error: `function ${func} is not registered`,
        message: error
      });
    }
  }
}

/**
 * Prevent iframe accessing your website
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
function prevent_iframe() {
  if (top.location.href != self.location.href) {
    top.location.href = self.location.href;
  }
}

//====== Disable hotkey
$(document).bind('keydown', function(e) {
  e = e || window.event;
  if (e.ctrlKey && (e.which == 83)) {
    e.preventDefault();
    toastr.info("CTRL+S disabled", "Hotkey");
    return false;
  } else if (e.keyCode == 82 && e.ctrlKey || e.keyCode == 116) {
    e.preventDefault();
    document.location.reload(true);
    return false;
  }
});

//====== Textarea placeholders
$('textarea').each(function(index, el) {
  if ($(this).val().toString().length) return;
  var placeholder = $(this).attr('placeholder');
  $(this).removeAttr('placeholder');
  var id = $(this).attr('id');
  if (!id || id.length == 0) {
    id = makeid(5);
    $(this).attr('id', id);
  }
  $(this).val(formatNewLines(placeholder));
  tafocus('#' + id, placeholder);
});

/**
 * textarea focus
 * @param {String} id
 * @param {String} placeholder
 */
function tafocus(id, placeholder) {
  var count_newlines = countNewLines(placeholder);
  // @ts-ignore
  $(id).on('focus', function(e) {
    // @ts-ignore
    var count_length = $(this).val().length;
    if (count_length === count_newlines || $(this).val() == placeholder) {
      $(this).val('');
    }
  });

  // @ts-ignore
  $(id).on('blur', function(e) {
    // @ts-ignore
    var count_length = $(this).val().length;
    if (!count_length) {
      $(this).val(formatNewLines(placeholder));
    }
  });
}

/**
 * format new lines
 * @param {String} placeholder
 */
function formatNewLines(placeholder) {
  for (let index = 0; index < 1000; index++) {
    if (!placeholder) break;
    placeholder = placeholder.replace('\\n', '\n');
    if (!placeholder.match(/\\n/g)) {
      break;
    }
  }
  return placeholder;
}

/**
 * Count newLines
 * @param {String} placeholder
 */
function countNewLines(placeholder) {
  if (!placeholder) return placeholder;
  var match = placeholder.match(/\\n/g) || '';
  return placeholder.length - match.length;
}

/**
 * json decode fails return false
 * @param {string} obj
 */
function isJSON(obj) {
  try {
    return JSON.parse(obj);
  } catch (error) {
    return false;
  }
}

/**
 * check string is json
 * @param {string} str
 * @return {boolean}
 */
function is_json(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * find duplicate array
 * @param {Array<any>} arr
 * @param {Function} callback
 */
function findDups(arr, callback) {
  var sorted_arr = arr.slice().sort();
  var results = [];
  for (var i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results[i] = sorted_arr[i];
    }
  }
  if (typeof callback == 'function') {
    return callback(results);
  } else {
    return results;
  }
}

//=========== Auto id
/**
 * Auto Generate ID
 * @param {Number} length
 */
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


//=========== RECAPTCHA
/**
 * load or refreshing google recaptcha
 */
function gexec(action, retry, callback) {
  recaptcha().exec(action, retry, callback);
}
/**
 * Get token recaptcha
 */
function geToken() {
  return recaptcha().get();
}

/**
 * Javascript caller
 * @param {String} url
 * @param {Function} callback
 */
function JavaScriptCaller(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) { //IE
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        if (typeof callback == 'function') {
          callback();
        }
      }
    };
  } else { //Others
    script.onload = function() {
      if (typeof callback == 'function') {
        callback();
      }
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

//======= CryptoJS

/**
 * @package https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js
 */
var salt = 'salt'; //salt
var iv = '1111111111111111'; //pass salt minimum length 12 chars
var iterations = '999'; //iterations

/**
 * Get key
 * @param {string} passphrase
 * @param {string} salt
 */
function getKey(passphrase, salt) {
  if (typeof CryptoJS == 'undefined') return;
  var key = CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA256,
    keySize: 64 / 8,
    iterations: iterations
  });
  return key;
}
/**
 * Encrypt function
 * @param {string} passphrase
 * @param {string} plainText
 */
function userJSEncrypt(passphrase, plainText) {
  if (typeof CryptoJS == 'undefined') return;
  var key = getKey(passphrase, salt);
  var encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv)
  });
  // @ts-ignore
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
/**
 * Decrypt function
 * @param {string} passphrase
 * @param {string} encryptedText
 */
function userJSDecrypt(passphrase, encryptedText) {
  if (typeof CryptoJS == 'undefined') return;
  var key = getKey(passphrase, salt);
  var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv)
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Imported class

/**
 * jQuery Extender
 */
(function($) {
  // @ts-ignore
  jQuery.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        // @ts-ignore
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
// @ts-ignore
if (typeof jQuery.fn.inputFilter != 'undefined') {
  // @ts-ignore
  $("input[type='number'], textarea[type='number'], [filter='number']").inputFilter(function(value) {
    if (typeof value == 'string') {
      return /^\d*$/.test(value);
    }
  });
} else {
  var INPT = document.querySelectorAll("input[type='number'], textarea[type='number'], [filter='number']");
  for (var index = 0; index < INPT.length; index++) {
    var element = INPT[index];
    setInputFilter(element, function(value) {
      return /^\d*$/.test(value); // Allow digits and '.' only, using a RegExp
    });
  }
}


/**
 * Function initialization
 */

$(document).one('click', '#logout', function(e) {
  e.preventDefault();
  jQuery.post(location.href, {
    logout: true
  }, function() {
    jQuery.get($(this).attr('href'));
    // @ts-ignore
    window.location.reload(1);
  });
});
var modal = $('#modalAjax');

function e_modal_error(data) {
  console.log(typeof data);
  modal.find('[id="title"]').removeClass('tx-success').addClass('tx-danger').html('Failure!');
  modal.find('[id="desc"]').html(JSON.stringify(data));
  modal.find('#icon').addClass('ion-ios-close-circle-outline tx-danger').removeClass('ion-ios-checkmark-circle-outline tx-success');
  modal.find('.btn').removeClass('btn-success').addClass('btn-danger');
  // @ts-ignore
  modal.modal('show');
}

function e_modal_success(data) {
  modal.find('[id="title"]').removeClass('tx-danger').addClass('tx-success').html('Successfull!');
  modal.find('[id="desc"]').html(data);
  modal.find('#icon').removeClass('ion-ios-close-circle-outline tx-danger').addClass('ion-ios-checkmark-circle-outline tx-success');
  modal.find('.btn').removeClass('btn-danger').addClass('btn-success');
  // @ts-ignore
  modal.modal('show');
}

$('form[id^="ajax"]').submit(function(e) {

  e.preventDefault(); // avoid to execute the actual submit of the form.

  var form = $(this);
  var url = form.attr('action');
  // @ts-ignore
  var method = form.attr('method');

  $.ajax({
    type: "POST",
    url: url,
    data: form.serialize(),
    success: function(data) {
      //console.log({ url: url, method: method, data: data });
      data = (data[0] || data);
      if (!data) {
        e_modal_error(data);
      }
      if (data.hasOwnProperty('success')) {
        e_modal_success(data.success);
      } else if (data.hasOwnProperty('error')) {
        e_modal_error(data.error);
      } else {
        e_modal_error(data);
      }
      if (data.hasOwnProperty('redirect')) {
        window.location.href = data.redirect;
        // @ts-ignore
      } else if (data.redirect || typeof redirect_to != 'undefined') {
        // @ts-ignore
        window.location.href = redirect_to;
      }
      if (data.hasOwnProperty('reset') && data.reset) {
        form.trigger('reset');
      }
      if (data.hasOwnProperty('refresh') && data.refresh) {
        // @ts-ignore
        window.location.reload(1);
      }
      if (typeof gexec != 'undefined') {
        gexec();
      }
    }
  });


});

/** Format Rupiah */
var inputrp = $('[id="format-rupiah"]');
if (inputrp.length) {
  // @ts-ignore
  inputrp.on('keyup keydown change', function(e) {
    var t = $(this);
    var v = t.val();
    var n = t.next('.form-text, #rupiah');
    if (framework().isNumber(v.toString())) {
      var V = framework().rp(v);
      t.css('border-color', 'green');
      framework().enable_button(t, V);
    } else {
      // @ts-ignore
      var V = 'Bukan nomor';
      t.css('border-color', 'red');
      framework().disable_button(t, V);
    }
    if (n.length) {
      n.text(V);
    } else {
      $('<p id="rupiah" class="form-text text-muted">' + V + '</p>').insertAfter(t);
    }
  });
}

/** datetime-local */
if (typeof dimas == 'object' && typeof framework().datetimelocal != 'undefined') {
  framework().datetimelocal(undefined);
}

/** metode rekening (debet) */
var select_method = $('select[id="method"]');
if (select_method.length) {
  select_method.change(function() {
    var t = $(this),
      v = t.val(),
      r = t.next('input#rekening');
    if (v == 'debit') {
      if (r.length === 0) {
        $('<input type="text" class="form-control mt-2" name="rekening" placeholder="No rekening" id="rekening" required>').insertAfter(t).hide().show('slow');
      }
    } else {
      // @ts-ignore
      r.hide('slow', function(params) {
        setTimeout(function() {
          r.remove();
        }, 1000);
      });
    }
  });
}


$(document).ready(function() {
  /** Tooltip */
  if (jQuery.fn.tooltip && $('[data-toggle="tooltip"]')) {
    // @ts-ignore
    $('body').tooltip({
      selector: '[data-toggle="tooltip"]'
    });
    //$('[data-toggle="tooltip"]').tooltip();

    // colored tooltip
    // @ts-ignore
    $('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });

    // @ts-ignore
    $('[data-toggle="tooltip-secondary"]').tooltip({
      template: '<div class="tooltip tooltip-secondary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });

    // @ts-ignore
    $('[data-toggle="tooltip-danger"]').tooltip({
      template: '<div class="tooltip tooltip-danger" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });
  }

  /** datatables */
  if (jQuery.fn.DataTable && $('#datatable1').length) {
    $('#datatable1').DataTable({
      responsive: true,
      language: {
        searchPlaceholder: 'Search...',
        // @ts-ignore
        sSearch: '',
        lengthMenu: '_MENU_ items/page',
      }
    });
  }

  /** Select2 */
  var ds = $('.dataTables_length select');
  if (ds.length || ds.data('select2') || jQuery.fn.select2) {
    ds.select2({
      minimumResultsForSearch: Infinity
    });
  }
});

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


/** Progress bar */
var elm = $('[countdown]');
if (elm.length > 0) {
  // @ts-ignore
  elm.each(function(e) {
    var t = $(this);
    framework().pctd(t);
  });
}

/** document body listener */
// @ts-ignore
$(document.body).on('click', '[data-redirect]', function(E) {
  var red = $(this).attr('data-redirect');
  if (red && red != '') {
    window.open(red, location.host).focus();
  }
});

/** Linkify */
// @ts-ignore
if (typeof mask_link != 'undefined') {
  /**
   * @type {JQuery<HTMLElement>} L
   */
  var L = ($('[data-linkify]').length ? $('[data-linkify]') : $(document.body));
  window.onload = function() {
    // @ts-ignore
    L.linkify({
      target: "_blank",
      attributes: null,
      className: 'linkified',
      // @ts-ignore
      format: function(value, type) {
        return value;
      },
      // @ts-ignore
      formatHref: function(href, type) {
        // @ts-ignore
        return '/youtube/s/' + btoa(CryptoJS.AES.encrypt(href, (typeof hash_pass != 'undefined' ? hash_pass : location.host)));
      },
    });
  }
}

//new tab links hide refferer
var nwtb = $('[data-newtab]');
if (nwtb.length) {
  // @ts-ignore
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
// @ts-ignore
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


//CryptoJS

/*var salt = 'salt';
  var iv = '1111111111111111';
  */
var iterations = '999';
/**
 * Crypto get key
 * @param {String} passphrase
 * @param {String} salt
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
 * @param {String} passphrase
 * @param {String} plainText
 * @param {String} salt
 * @param {String} iv
 */
function CryptoE(passphrase, plainText, salt, iv) {
  // @ts-ignore
  var key = CryptoK(passphrase, salt, iterations);
  var encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv)
  });
  // @ts-ignore
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
/**
 * Crypto decrypt
 * @param {String} passphrase
 * @param {String} encryptedText
 * @param {String} salt
 * @param {String} iv
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
/*
if (typeof NO_CSRF == 'undefined') {
  refreshCSRF();
  setInterval(function() {
    refreshCSRF();
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
                          framework().sc('csrf-lifetime', new Date().addHours(0.1), 0.1);
                          if (eCSRF.getResponseHeader('x-csrf')) {
                            framework().sc('csrf', eCSRF.getResponseHeader('x-csrf'), 0.1);
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
*/
/**
 * Create JSON
 * @param {any} jsObj
 * @param {boolean} tabs
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
      });
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
 * @param {String} func function name
 */
function __call(func) {
  this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}

/**
function target(a) {
    alert(a);
}

var o = {
    suffix: " World",
    target: function(s) { alert(s + this.suffix); }
};

__call("target", "Hello");

__call.call(o, "target", "Hello");
 */



/**
 * parse proxy from string
 * @param {string} str
 * @return {Array<any>} proxy list filtered
 */
function parse_proxy(str) {
  // @ts-ignore
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
        //console.log(proxyMatch);
        if (proxyMatch.includes(':') && !inArray(proxyMatch, px)) {
          px.push(proxyMatch);
        }
      }
      var regex = /Proxy\([\'\"]([a-zA-Z0-9\=]*)[\'\"]\)/gm,
        match, proxyMatch;
      while (match = regex.exec(str)) {
        proxyMatch = atob(match[1]);
        //console.log(proxyMatch);
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



/**
 * pick random from array
 * @param {Array<any>} arrays
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
 * @param {Array<any>} arrays
 */
function array_unique(arrays) {
  return arrays.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  });
}

/**
 *
 * @param {Array<any>} arrayName
 * @param {String|number} key
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
 * @param {Object} text text of content loader
 * @param {string} text.title loading title text
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
    // @ts-ignore
    options = {
      callback: options
    };
  }
  // @ts-ignore
  if (options === false || options === null || options == 'disable' || options == 'disabled') {
    // @ts-ignore
    options = {
      disable: true
    }
  }
  if (!options) {
    // @ts-ignore
    options = {
      position: 'center'
    }
  } else if (!options.hasOwnProperty('position')) {
    options.position = 'center';
  }
  if (typeof text == 'string') {
    text = {
      title: text,
      content: '',
      footer: ''
    }
  }

  switch (options.position) {
    case 'right':
      // @ts-ignore
      options.contentLoadingClass = '.loading-corner-right-text';
      // @ts-ignore
      options.bodyLoadingClass = 'loading-right';
      // @ts-ignore
      options.footerLoadingClass = '.loading-corner-right-footer';
      break;

    default:
      // @ts-ignore
      options.contentLoadingClass = '.modal-loading-text';
      // @ts-ignore
      options.bodyLoadingClass = 'loading';
      // @ts-ignore
      options.footerLoadingClass = '.modal-loading-footer';
      break;
  }
  LoadingOpt = options;

  // @ts-ignore
  $('body').addClass(options.bodyLoadingClass);
  if (options.disable || !text) {
    $('body').removeClass('loading loading-right');
  } else if (typeof text == 'string' || typeof text == 'number') {
    // @ts-ignore
    $(options.contentLoadingClass).html(text);
  } else if (typeof text == 'object') {
    if (text.hasOwnProperty('content')) {
      // @ts-ignore
      $(options.contentLoadingClass).html(text.content);
    } else if (text.hasOwnProperty('title')) {
      // @ts-ignore
      $(options.contentLoadingClass).html(text.title);
    }
    if (text.hasOwnProperty('footer')) {
      // @ts-ignore
      $(options.footerLoadingClass).html(text.footer).show();
    } else {
      // @ts-ignore
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
 * Check Blogger
 * @param {function} callback BlogID
 */
function check_blogger(callback) {
  loadingio('Blogger initialize');
  jQuery.post('/AGC/blogger/index', {
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
            // @ts-ignore
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
            // @ts-ignore
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
            // @ts-ignore
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
              // @ts-ignore
              swal({
                title: 'Choose your blog',
                content: selectBlog,
                closeOnClickOutside: false,
                closeOnEsc: false,
                // @ts-ignore
              }).then(function(c) {
                jQuery.post('/AGC/blogger/index', {
                  'bid-manual': $('select#blogger-chooser').val()
                  // @ts-ignore
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
  // @ts-ignore
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
 * @param {Array<any>} arr array sources
 * @param {Number} n maximum element to be in result
 * @param {Function} callback function to process result
 */

function getRandom(arr, n, callback) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    var msg = "getRandom: more elements taken than available";
    alert(msg);
    throw new RangeError(msg);
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
  "8364": "&euro;" // Last one must not have a comma after it, IE doesn't like trailing commas
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
  // overkill, but you said you wanted to make entities out of things, so... :-);
  return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0000-\u001f\u0080-\uFFFF]/g, function(match) {
    var high, low, charValue, rep

    // Get the character value, handling surrogate pairs
    if (match.length == 2) {
      // It's a surrogate pair, calculate the Unicode code point
      high = match.charCodeAt(0) - 0xD800;
      low = match.charCodeAt(1) - 0xDC00;
      charValue = (high * 0x400) + low + 0x10000;
    } else {
      // Not a surrogate pair, the value *is* the Unicode code point
      charValue = match.charCodeAt(0);
    }

    // See if we have a mapping for it
    rep = entityMap[charValue];
    if (!rep) {
      // No, use a numeric entity. Here we brazenly (and possibly mistakenly);
      rep = "&#" + charValue + ";";
    }

    // Return replacement
    return rep;
  });
}