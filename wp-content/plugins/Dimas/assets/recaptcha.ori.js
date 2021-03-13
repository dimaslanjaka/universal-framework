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
if (typeof G_SITE_KEY == 'undefined') {
  var G_SITE_KEY = '6LdSg5gUAAAAAKrfCL7OkHCFrS3m09xoWyvFKieF';
}
(function () {
  submitDisable(function () {
    JavaScriptCaller('https://www.google.com/recaptcha/api.js?render=' + G_SITE_KEY + '&render=explicit', function () {
      grecaptcha.ready(function () {
        if (typeof jQuery == 'undefined' || !window.jQuery || typeof jQuery == 'undefined') {
          JavaScriptCaller('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', gexec);
        } else {
          gexec();
        }
      });
    });
  });
})();

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

var gexec_count = 0;
/**
 * load or refreshing google recaptcha
 */
function gexec() {
  gexec_count++;
  console.log('google recaptcha executing ' + gexec_count);
  grecaptcha.execute(G_SITE_KEY, {
    action: 'homepage'
  }).then(function (token) {
    submitEnable();
    recaptcha_insert_token(token);
  });
}

function recaptcha_insert_token(token) {
  setCookie('token', token, 1);
  if (typeof jQuery == 'undefined') {
    console.log('jQuery Not Loaded');
    JavaScriptCaller('/assets/components/jquery/dist/jquery.min.js', function () {
      inserToken(token);
    });
  } else {
    inserToken(token);
  }
}

function inserToken(token) {
  var f = jQuery('form'),
    fg = f.find('[name="g-recaptcha-response"]');
  if (fg.length === 0) {
    jQuery('<input type="hidden" readonly value="' + token + '" name="g-recaptcha-response">').appendTo(f);
  } else {
    fg.val(token);
  }
  console.log('token inserted')
}

function geToken() {
  var gr = $('input[name="g-recaptcha-response"]');
  if (gr.length) {
    var vr = gr[0].getAttribute('value');
    return vr;
  }
  return null;
}
var reCaptcha_selectors = [".woocommerce-form-login button", ".woocommerce-form-register button", ".woocommerce-ResetPassword button", '[type="submit"]', '#wp-submit', '#submit'];
function submitEnable() {
  reCaptcha_buttons(false);
}

function submitDisable(cb) {
  reCaptcha_buttons(true, cb);
}

function reCaptcha_buttons(reCaptcha_disable, callback) {
  if (typeof jQuery != 'undefined') {
    jQuery.each(reCaptcha_selectors, function (i, btn) {
      var btns = jQuery(btn);
      btns.not('[data-recaptcha="no-action"]').prop('disabled', reCaptcha_disable);
    });
  } else {
    alert('jQuery not found');
    throw 'jQuery needed';
  }
  if (typeof callback == 'function'){
    callback();
  }
}