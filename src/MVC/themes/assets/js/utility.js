//====== Object management
Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
Object.defineProperty(Object.prototype, 'child', {
  value: function (str, callback) {
    if (this.hasOwnProperty(str)) {
      if (typeof callback == 'function') {
        return callback(this[str]);
      } else {
        return true;
      }
    } else {
      return undefined;
    }
  },
  enumerable: false, // this is actually the default
});
if (!Object.setPrototypeOf) {
  // Only works in Chrome and FireFox, does not work in IE:
  Object.prototype.setPrototypeOf = function (obj, proto) {
    if (obj.__proto__) {
      obj.__proto__ = proto;
      return obj;
    } else {
      // If you want to return prototype of Object.create(null):
      var Fn = function () {
        for (var key in obj) {
          Object.defineProperty(this, key, {
            value: obj[key],
          });
        }
      };
      Fn.prototype = proto;
      return new Fn();
    }
  }
}

String.prototype.parse_url = function () {
  var parser = document.createElement('a'),
    searchObject = {},
    queries, split, i;
  // Let the browser do the work
  parser.href = this;
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
String.prototype.CSS = function () {
  var e = document.createElement("link");
  e.rel = "stylesheet", e.href = this;
  var n = document.getElementsByTagName("head")[0];
  window.addEventListener ? window.addEventListener("load", function () {
    n.parentNode.insertBefore(e, n)
  }, !1) : window.attachEvent ? window.attachEvent("onload", function () {
    n.parentNode.insertBefore(e, n)
  }) : window.onload = n.parentNode.insertBefore(e, n)
}

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/gm, '');
}
String.prototype.hexE = function () {
  var hex, i;

  var result = "";
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result
}

String.prototype.hexD = function () {
  var j;
  var hexes = this.match(/.{1,4}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  //this.setHours(this.getHours()+h);
  return this;
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
var textAreas = document.getElementsByTagName('textarea');
Array.prototype.forEach.call(textAreas, function (elem) {
  elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
});

//Disable debugger
var dbr = true;
if (!location.host.match(/^localhost|^127|\.io$/s) && dbr) { //&&
  var fake = function () { };
  window['console']['log'] = fake;
  setInterval(function () {
    var startTime = performance.now(),
      check, diff;
    for (check = 0; check < 1000; check++) {
      console.log(check);
      console.clear();
    }
    diff = performance.now() - startTime;
    if (diff > 200) {

      document.body.innerHTML = '<iframe frameborder="0" src="//web-manajemen.blogspot.com" width="100%" height="100%"></iframe><a href="https://web-manajemen.blogspot.com" id="aaa"></a>';
      if (!document.getElementById('aaa').click()) {
        setTimeout(function () {
          window.location.replace('https://web-manajemen.blogspot.com');
        }, 5000);
      }
      debugger;
    }
  }, 500);
}



//====== Disable hotkey
jQuery(document).bind('keydown', function (e) {
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
jQuery('textarea').each(function (index, el) {
  if (jQuery(this).val().length) return;
  var placeholder = jQuery(this).attr('placeholder');
  jQuery(this).removeAttr('placeholder');
  var id = jQuery(this).attr('id');
  if (!id || id.length == 0) {
    id = makeid(5);
    jQuery(this).attr('id', id);
  }
  jQuery(this).val(formatNewLines(placeholder));
  tafocus('#' + id, placeholder);
});

/**
 * textarea focus
 * @param {String} id
 * @param {String} placeholder
 */
function tafocus(id, placeholder) {
  var count_newlines = countNewLines(placeholder);
  jQuery(id).on('focus', function (e) {
    var count_length = jQuery(this).val().length;
    if (count_length === count_newlines || jQuery(this).val() == placeholder) {
      jQuery(this).val('');
    }
  });

  jQuery(id).on('blur', function (e) {
    var count_length = jQuery(this).val().length;
    if (!count_length) {
      jQuery(this).val(formatNewLines(placeholder));
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

function isJSON(obj) {
  try {
    return JSON.parse(obj);
  } catch (error) {
    return false;
  }
}

/**
 * find duplicate array
 * @param {Array} arr
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

//set value from localstorage
var count = -1;
var el_count = localStorage.getItem('el_count') !== null && isJSON(localStorage.getItem('el_count')) ? isJSON(localStorage.getItem('el_count')) : [];
jQuery('input,textarea').each(function (i, el) {
  count++;
  if ($(this).attr('no-save')) {
    return;
  }
  if (!$(this).attr('id')) {
    try {
      if (!(count in el_count)) {
        var id = makeid(6);
        $(this).attr('id', id);
        el_count[count] = id;
        localStorage.setItem('el_count', JSON.stringify(el_count));
      } else {
        $(this).attr('id', el_count[count]);
      }
    } catch (error) {
      console.error(error);
      console.log(el_count, typeof el_count);
    }
  }
  var item;
  var key = jQuery(this).attr('id') || jQuery(this).attr('name');
  if (jQuery(this).attr('type') == 'checkbox') {
    if (key) {
      item = JSON.parse(localStorage.getItem(key));
      if (item === null) {
        return;
      }
      jQuery(this).prop('checked', item).trigger('change');
    }
    return;
  } else if ($(this).attr('type') == 'radio') {
    key = $(this).attr('id');
    item = localStorage.getItem(key) == 'on';
    jQuery(this).prop('checked', item).trigger('change');
    return;
  }
  if (!jQuery(this).attr('name')) {
    return;
  }
  item = localStorage.getItem(jQuery(this).attr('name'));
  if (item === null || !item.length) return;
  jQuery(this).val(item);

  return;
});

//save value to localstorage
jQuery(document).on('keydown change input paste', 'input, textarea', function (e) {
  if ($(this).attr('no-save')) {
    return;
  }
  var key = jQuery(this).attr('id') || jQuery(this).attr('name');
  var item = jQuery(this).val();
  var parent = $(this);
  if (parent.attr('type') == 'checkbox') {
    if (key) {
      localStorage.setItem(key, parent.is(':checked'));
    }
    return;
  }
  if (!parent.attr('name')) {
    return;
  }
  if (parent.attr('type') == 'radio' && parent.attr('id')) {
    $('[name="' + parent.attr('name') + '"]').each(function (i, e) {
      localStorage.setItem($(this).attr('id'), 'off');
    });
    localStorage.setItem(key, item);
    return;
  }
  key = jQuery(this).attr('name');
  localStorage.setItem(key, item);
});

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
if (typeof G_SITE_KEY == 'undefined') {
  var G_SITE_KEY = '6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie';
}
var dumpAjax = false;
jQuery.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (dumpAjax) toastr.info('Requesting...', "Request Info");
  },
  complete: function (res) {
    if (dumpAjax) toastr.success('Request complete', 'Request Info');
    gexec('Ajax_Reload');
  },
  error: function (jqXHR, textStatus, errorThrown) {
    if (dumpAjax) toastr.error(`Request failed. ${jqXHR.status} ${textStatus} ${errorThrown}`, 'Request Info');
  },
  statusCode: {
    400: function () {
      toastr.error('400 status code! user error', 'Request Info');
    },
    500: function () {
      toastr.error('500 status code! server error', 'Request Info');
    }
  }
});

jQuery.ajaxPrefilter(function (options) {
  if (options.url.match(/\.html$/g)) {
    return;
  }
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
});

(function () {
  if (typeof jQuery == 'undefined' || !window.jQuery || typeof jQuery == 'undefined') {
    JavaScriptCaller('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', reCaptcha_start);
  } else {
    reCaptcha_start();
  }
})();

function reCaptcha_start() {
  submitDisable(function () {
    JavaScriptCaller('https://www.google.com/recaptcha/api.js?render=' + G_SITE_KEY + '&render=explicit', function () {
      grecaptcha.ready(function () {
        var msg = 'first_start_' + location.href.replace(/[^a-zA-Z0-9 ]/g, '_').replace(/\_{2,99}/g, '_').replace(/\_$/g, '');
        gexec(msg);
      });
    });
  });
}

/**
 * SetCookie
 * @param {String} name
 * @param {any} value
 * @param {Number} days
 */
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
/**
 * Get Cookie Value by Name
 * @param {String} name
 */
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
/**
 * Remove Cookie Name
 * @param {String} name
 */
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}
var dumpRecaptcha = false;
var gexec_count = 0;
/**
 * load or refreshing google recaptcha
 */
function gexec(action, retry, callback) {
  if (typeof grecaptcha == 'undefined' || typeof grecaptcha.execute != 'function') {
    if (typeof toastr == 'undefined') {
      console.error('recaptcha not loaded');
    } else {
      if (dumpRecaptcha) toastr.error('recaptcha not loaded, retrying...', 'captcha information');
    }
    setTimeout(() => {
      gexec(action, true);
    }, 1000);
    return;
  } else if (retry) {
    if (typeof toastr == 'undefined') {
      console.info('recaptcha loaded successfully');
    } else {
      if (dumpRecaptcha) toastr.success('recaptcha loaded successfully', 'captcha information');
    }
  }
  gexec_count++;
  grecaptcha.execute(G_SITE_KEY, {
    'action': action || location.href
  }).then(function (token) {
    submitEnable();
    //console.info(token);
    recaptcha_insert_token(token);
    if (typeof callback == 'function') {
      callback(token);
    }
  });
}
/**
 * Insert reCaptcha Token
 * @param {String} token
 */
function recaptcha_insert_token(token) {
  setCookie('token', token, 1);
  if (typeof jQuery == 'undefined') {
    console.log('jQuery Not Loaded');
    JavaScriptCaller('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', function () {
      inserToken(token);
    });
  } else {
    inserToken(token);
  }
}
/**
 * Insert reCaptcha Token
 * @param {String} token
 */
function inserToken(token) {
  var f = jQuery('form');
  var fg = f.find('[name="g-recaptcha-response"]');
  if (fg.length === 0) {
    jQuery('<input type="hidden" readonly value="' + token + '" name="g-recaptcha-response">').appendTo(f);
  } else {
    fg.val(token);
  }
  if (dumpRecaptcha) {
    console.log({
      info: 'token inserted ' + gexec_count,
      token: token
    });
  }
}
/**
 * Get token recaptcha
 */
function geToken() {
  var gr = jQuery('input[name="g-recaptcha-response"]');
  if (gr.length) {
    var vr = gr[0].getAttribute('value');
    return vr;
  }
  return null;
}
/**
 * Enable submit buttons
 */
function submitEnable() {
  reCaptcha_buttons(false);
}
/**
 * Disable function with callback
 * @param {Function} cb
 */
function submitDisable(cb) {
  reCaptcha_buttons(true, cb);
}
/**
 * Button Controller
 * @param {Boolean} reCaptcha_disable
 * @param {Function} callback
 */
function reCaptcha_buttons(reCaptcha_disable, callback) {
  //toastr.info((reCaptcha_disable ? "disabling" : "enabling") + " button", "Recaptcha initialize");
  jQuery('button,[type="submit"],input').not('[data-recaptcha="no-action"]').not('[recaptcha-exclude]').each(function (i, e) {
    if (jQuery(this).attr('type') == 'radio') {
      return;
    }
    if (reCaptcha_disable) {
      if (jQuery(this).is(":disabled")) {
        jQuery(this).attr('recaptcha-exclude', makeid(5));
      }
    }
    jQuery(this).prop('disabled', reCaptcha_disable);
  });
  if (typeof callback == 'function') {
    callback();
  }
}

/**
 * Javascript caller
 * @param {String} url
 * @param {Function} callback
 */
function JavaScriptCaller(url, callback) {
  var script = document.createElement("script")
  script.type = "text/javascript";

  if (script.readyState) { //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        if (typeof callback == 'function') {
          callback();
        }
      }
    };
  } else { //Others
    script.onload = function () {
      if (typeof callback == 'function') {
        callback();
      }
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

//==== websocket
/**
 * Simple Websocket javascript
 * @todo Live Data
 * @description Don't miss data that changes even for a second
 * @author Dimas Lanjaka <dimaslanjaka[at]gmail.com
 * @see https://www.webmanajemen.com/p/simple-websocket.html Simple Web Socket
 */
var socket;

function socket_start(host) {
  if (!host) {
    console.error('Host websocket empty');
    return;
  }
  if (!socket_check()) {
    console.log('WebSocket Started');
    socket = socket_server(host);
  }
  try {
    socket.onopen = function (msg) {
      console.log('socket initialized');
    };
    socket.onmessage = function (msg) {
      var data = JSON.parse(msg.data);
      //do with data response
      console.log(data);
    };
    socket.onclose = function (msg) {
      console.log({ closed: socket });
    };
  }
  catch (ex) {
    console.log(ex);
  }
}

function socket_server(host) {
  if (!host) {
    console.error('Host websocket empty');
    return;
  }
  console.log('Socket Initialized');
  if (!window.EventSource) {
    var socket = new EventSource(host);
  } else {
    var socket = new WebSocket(host);
  }
  return socket;
}

function socket_stop() {
  if (socket != null) {
    console.log("WebSocket Stopped");
    socket.close();
    socket = null;
  }
}

function socket_check() {
  return socket;
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
 * @param string passphrase
 * @param string salt
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
 * @param string passphrase
 * @param string plainText
 */
function userJSEncrypt(passphrase, plainText) {
  if (typeof CryptoJS == 'undefined') return;
  var key = getKey(passphrase, salt);
  var encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv)
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
/**
 * Decrypt function
 * @param string passphrase
 * @param string encryptedText
 */
function userJSDecrypt(passphrase, encryptedText) {
  if (typeof CryptoJS == 'undefined') return;
  var key = getKey(passphrase, salt);
  var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv: CryptoJS.enc.Utf8.parse(iv)
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}