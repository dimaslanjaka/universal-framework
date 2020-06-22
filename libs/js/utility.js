if (!(typeof module !== "undefined" && module.exports)) {
  /**
   * @todo Auto replace placeholder textarea newLines
   */
  var textAreas = document.getElementsByTagName("textarea");
  Array.prototype.forEach.call(textAreas, function (elem) {
    elem.placeholder = elem.placeholder.replace(/\\n/g, "\n");
  });

  /**
   * @todo Disable hotkey
   */
  $(document).bind("keydown", function (e) {
    e = e || window.event;
    if (e.ctrlKey && e.which == 83) {
      e.preventDefault();
      toastr.info("CTRL+S disabled", "Hotkey");
      return false;
    } else if ((e.keyCode == 82 && e.ctrlKey) || e.keyCode == 116) {
      e.preventDefault();
      document.location.reload(true);
      return false;
    }
  });
  /**
   * @todo Textarea placeholders
   */
  $("textarea").each(function (index, el) {
    if ($(this).val().toString().length) return;
    var placeholder = $(this).attr("placeholder");
    $(this).removeAttr("placeholder");
    var id = $(this).attr("id");
    if (!id || id.length == 0) {
      id = makeid(5);
      $(this).attr("id", id);
    }
    $(this).val(formatNewLines(placeholder));
    tafocus("#" + id, placeholder);
  });

  /**
   * @todo datatables select2 jquery tooltip
   */
  $(document).ready(function () {
    /** Tooltip */
    if (jQuery.fn.tooltip && $('[data-toggle="tooltip"]')) {
      // @ts-ignore
      $("body").tooltip({
        selector: '[data-toggle="tooltip"]',
      });
      //$('[data-toggle="tooltip"]').tooltip();

      // colored tooltip
      // @ts-ignore
      $('[data-toggle="tooltip-primary"]').tooltip({
        template:
          '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      });

      // @ts-ignore
      $('[data-toggle="tooltip-secondary"]').tooltip({
        template:
          '<div class="tooltip tooltip-secondary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      });

      // @ts-ignore
      $('[data-toggle="tooltip-danger"]').tooltip({
        template:
          '<div class="tooltip tooltip-danger" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      });
    }

    /** datatables */
    if (jQuery.fn.DataTable && $("#datatable1").length) {
      $("#datatable1").DataTable({
        responsive: true,
        language: {
          searchPlaceholder: "Search...",
          // @ts-ignore
          sSearch: "",
          lengthMenu: "_MENU_ items/page",
        },
      });
    }

    /** Select2 */
    var ds = $(".dataTables_length select");
    if (typeof jQuery.fn.select2 != "undefined") {
      if (ds.length || ds.data("select2")) {
        ds.select2({
          minimumResultsForSearch: Infinity,
        });
      }
    }
  });
}

/**
 * textarea focus
 * @param {String} id
 * @param {String} placeholder
 */
function tafocus(id, placeholder) {
  var count_newlines = countNewLines(placeholder);
  // @ts-ignore
  $(id).on("focus", function (e) {
    // @ts-ignore
    var count_length = $(this).val().length;
    if (count_length === count_newlines || $(this).val() == placeholder) {
      $(this).val("");
    }
  });

  // @ts-ignore
  $(id).on("blur", function (e) {
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
    placeholder = placeholder.replace("\\n", "\n");
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
  var match = placeholder.match(/\\n/g) || "";
  return placeholder.length - match.length;
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
  if (typeof callback == "function") {
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
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        if (typeof callback == "function") {
          callback();
        }
      }
    };
  } else {
    //Others
    script.onload = function () {
      if (typeof callback == "function") {
        callback();
      }
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * Function initialization
 */

$(document).one("click", "#logout", function (e) {
  e.preventDefault();
  jQuery.post(
    location.href,
    {
      logout: true,
    },
    function () {
      jQuery.get($(this).attr("href"));
      // @ts-ignore
      window.location.reload(1);
    }
  );
});

/** datetime-local */
if (
  typeof dimas == "object" &&
  typeof framework().datetimelocal != "undefined"
) {
  framework().datetimelocal(undefined);
}

/** Query URL */
var hash = window.location.hash.substr(1);

var result = hash.split("&").reduce(function (result, item) {
  var parts = item.split("=");
  result[parts[0]] = parts[1];
  return result;
}, {});

if (hash.length > 1) {
  console.log(result);
}

/** Progress bar */
var elm = $("[countdown]");
if (elm.length > 0) {
  // @ts-ignore
  elm.each(function (e) {
    var t = $(this);
    framework().pctd(t);
  });
}

/** document body listener */
// @ts-ignore
$(document.body).on("click", "[data-redirect]", function (E) {
  var red = $(this).attr("data-redirect");
  if (red && red != "") {
    window.open(red, location.host).focus();
  }
});

/** Linkify */
// @ts-ignore
if (typeof mask_link != "undefined") {
  /**
   * @type {JQuery<HTMLElement>} L
   */
  var L = $("[data-linkify]").length ? $("[data-linkify]") : $(document.body);
  window.onload = function () {
    // @ts-ignore
    L.linkify({
      target: "_blank",
      attributes: null,
      className: "linkified",
      // @ts-ignore
      format: function (value, type) {
        return value;
      },
      // @ts-ignore
      formatHref: function (href, type) {
        // @ts-ignore
        return (
          "/youtube/s/" +
          btoa(
            CryptoJS.AES.encrypt(
              href,
              typeof hash_pass != "undefined" ? hash_pass : location.host
            )
          )
        );
      },
    });
  };
}

//new tab links hide refferer
var nwtb = $("[data-newtab]");
if (nwtb.length) {
  // @ts-ignore
  nwtb.click(function (e) {
    window.open("http://href.li/?" + $(this).data("newtab"), "newtab").focus();
  });
}

//links new tab form submit
var aform = $("[form]");
if (aform.length > 1) {
  aform.click(function (e) {
    e.preventDefault();
    var id_form = $(this).attr("form");
    if (typeof id_form != "undefined") {
      var winame = document.getElementById(id_form).getAttribute("target"); //reduce caching
      console.log("Submiting Form ID#" + id_form);
      window.open("", winame ? winame : "FormDynamic").focus();
      document.getElementById($(this).attr("form")).submit();
    }
    //w = window.open('', 'bagas31-post');
    //$('form#' + $(this).attr('form')).submit();
    //w.focus();
  });
}

//open in new tab
function openInNewTab(url, name) {
  if (typeof url != "undefined" && typeof name != "undefined") {
    var win = window.open(url, name);
    win.focus();
  }
}

//open in new tab
$(document.body).on("click", '[id="newtab"]', function (e) {
  e.preventDefault();
  if ($(this).attr("href")) {
    openInNewTab(
      $(this).attr("href"),
      $(this).data("name") ? $(this).data("name") : "_blank"
    );
  }
});

//get currency symbol
// @ts-ignore
function get_currency_symbol(filter) {
  var amount = 0;
  var ident = navigator.language;
  var currency_type;
  switch (ident) {
    case "de-DE":
      currency_type = "EUR";
      break;
    case "id-ID":
      currency_type = "IDR";
      break;
    default:
      currency_type = "USD";
      break;
  }
  var format = amount.toLocaleString(ident, {
    style: "currency",
    currency: currency_type,
  });
  return format.toString().replace("0,00", "");
}

//CryptoJS

/*var salt = 'salt';
  var iv = '1111111111111111';
  */
var iterations = "999";
/**
 * Crypto get key
 * @param {String} passphrase
 * @param {String} salt
 */
function CryptoK(passphrase, salt) {
  var key = CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA256,
    keySize: 64 / 8,
    iterations: iterations,
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
    iv: CryptoJS.enc.Utf8.parse(iv),
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
    iv: CryptoJS.enc.Utf8.parse(iv),
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * Generate unique id
 */
function GeneratorID() {}
GeneratorID.prototype.rand = Math.floor(Math.random() * 26) + Date.now();
GeneratorID.prototype.genId = function () {
  return this.rand++;
};
GeneratorID.prototype.getId = function () {
  this.genId();
  return jQuery.fn.jquery + "." + this.rand;
};
var GID = new GeneratorID();
var IV = Date.now();
var GI = GID.getId();
var ST = (location.host.replace(".", "") + GI).toUpperCase();
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
  if (typeof text == "undefined" || typeof text == "boolean" || !text) {
    text = "Please wait";
  }
  text.toString().toUpperCase();
  if (document.getElementById("loadingio-wrapper")) {
    if (mode == "disabled" || mode == "disable") {
      document.getElementById("loadingio-wrapper").classList.remove("running");
    } else if (
      typeof mode == "undefined" ||
      (typeof mode != "undefined" && (mode == "enable" || mode == "enabled"))
    ) {
      document.getElementById("loadingio-text").innerHTML = text;
      document.getElementById("loadingio-wrapper").classList.toggle("running");
    }
  } else {
    var elemDiv = document.createElement("div");
    elemDiv.innerHTML =
      '<div id="loadingio-wrapper" class="ld-over-full running"><span class="ld"><span class="ld ld-ball ld-bounce"></span><span id="loadingio-text" class="text pt-3">' +
      text +
      '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></span></span></div>';
    document.body.appendChild(elemDiv);
  }

  if (typeof callback == "function") {
    callback(arguments);
  }
}

function LoadScript(url, callback) {
  loadingio("Loading Script " + url);
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.onreadystatechange = function () {
    if (typeof callback == "function") {
      loadingio("Readystate " + url);
      callback();
    }
    loadingio(false, false, "disable");
  };
  script.onload = function () {
    loadingio("Onload Script " + url);
    if (typeof callback == "function") {
      callback();
    }
    loadingio(false, false, "disable");
  };
  document.body.appendChild(script);
  loadingio(false, false, "disable");
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
  var matchs,
    px = [];
  loadingio("Parsing proxies", function () {
    /*
    while (match = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/g.exec(str)) {
      console.log('Match: "' + match[0] + '" first group: -> "' + match[1] + '" second group -> ' + match[2]);
      if (typeof match[0] != 'undefined' && typeof match[2] != 'undefined' && !inArray(match[0], px)) {
        px.push(match[0]);
      }
    }
    */
    if (typeof str == "string") {
      var regex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\:[0-9]{1,6}/gm,
        match,
        proxyMatch;
      while ((match = regex.exec(str))) {
        proxyMatch = match[0];
        //console.log(proxyMatch);
        if (proxyMatch.includes(":") && !inArray(proxyMatch, px)) {
          px.push(proxyMatch);
        }
      }
      var regex = /Proxy\([\'\"]([a-zA-Z0-9\=]*)[\'\"]\)/gm,
        match,
        proxyMatch;
      while ((match = regex.exec(str))) {
        proxyMatch = atob(match[1]);
        //console.log(proxyMatch);
        if (proxyMatch.includes(":") && !inArray(proxyMatch, px)) {
          px.push(proxyMatch);
        }
      }
    }
    loadingio(null, null, "disabled");
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
    value: arrays[index],
  };
}
/**
 * Array unique
 * @param {Array<any>} arrays
 */
function array_unique(arrays) {
  return arrays.filter(function (item, pos, self) {
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
  return "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * jQuery pseudo builder
 * @param {string} string
 */
function pseudo_builder(string) {
  if (string) {
    return string.replace(/[\W\s]/gm, "");
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
  Object.keys(object).forEach(function (key) {
    if (typeof callback == "function") {
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
  if (typeof callback == "function") {
    return callback(result);
  } else {
    return result;
  }
}
