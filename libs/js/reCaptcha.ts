const reCaptcha = {
  /**
   * @type {Number} counter executions
   */
  gexec_count: 0,
  key: "6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie",

  /**
   * Set recaptcha site key
   * @param {String} key
   */
  set_key: function (key: string) {
    reCaptcha.key = key;
  },

  /**
   * Start recaptcha
   */
  start: function () {
    reCaptcha.reCaptcha_buttons(true, function () {
      LoadScript({
        url: "https://www.google.com/recaptcha/api.js?render=" + reCaptcha.key + "&render=explicit",
        callback: function () {
          grecaptcha.ready(function () {
            var msg =
              "first_start_" +
              location.href
                .replace(/[^a-zA-Z0-9 ]/g, "_")
                .replace(/\_{2,99}/g, "_")
                .replace(/\_$/g, "");
            reCaptcha.exec(msg);
          });
        },
      });
    });
  },

  /**
   * Initialize Recaptcha by defining jquery
   */
  init: function () {
    if (typeof jQuery == "undefined" || typeof jQuery == "undefined") {
      LoadScript({
        url: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        callback: reCaptcha.start,
      });
    } else {
      reCaptcha.start();
    }
  },
  retry_count: 0,
  /**
   * load or refreshing google recaptcha
   */
  exec: function (action: any, retry: boolean = false, callback: (arg0: string) => void = null) {
    //console.log('gtag is ' + typeof gtag);
    if (typeof gtag == "function") {
      gtag("event", "recaptcha", {
        action: action,
      });
    }
    if (typeof grecaptcha == "undefined" || typeof grecaptcha.execute != "function") {
      if (typeof toastr == "undefined") {
        console.error("recaptcha not loaded");
      } else {
        toastr.error("recaptcha not loaded, retrying...", "captcha information");
      }
      for (let index = 0; index < 3; index++) {
        reCaptcha.exec(action, true);
        if (index == 3 - 1) {
          toastr.error("recaptcha has reached limit", "captcha information");
        }
      }
      return;
    } else if (retry) {
      if (typeof toastr == "undefined") {
        console.info("recaptcha loaded successfully");
      } else {
        toastr.success("recaptcha loaded successfully", "captcha information");
      }
    }
    reCaptcha.gexec_count++;
    var execute = grecaptcha.execute(reCaptcha.key, {
      action: action || "location.href",
    });
    if (!execute) {
      if (typeof toastr != "undefined") {
        toastr.error("failed getting token");
      }
      return;
    }
    if (execute) {
      execute.then(
        /**
         * Process token string from recaptcha
         * and distribute it into all form elements
         * @param {String} token
         */
        function (token: string) {
          reCaptcha.reCaptcha_buttons(false, null);
          //console.info(token);
          reCaptcha.insert(token);
          if (typeof callback == "function") {
            callback(token);
          }
        }
      );
    }
  },
  /**
   * Insert reCaptcha Token
   * @param {String} token
   */
  insert: function (token: string) {
    //framework().sc("token", token, 1);
    if (typeof jQuery == "undefined") {
      console.log("jQuery Not Loaded");
      LoadScript({
        url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        callback: function () {
          reCaptcha.distribute_token(token);
        },
      });
    } else {
      reCaptcha.distribute_token(token);
    }
  },
  /**
   * Distribute reCaptcha Token
   * @param {String} token
   */
  distribute_token: function (token: string) {
    var form = $("form");
    form.each(function (i, el) {
      var fg = $(this).find('[name="g-recaptcha-response"]');
      console.log(fg.length);
      if (!fg.length) {
        $('<input type="hidden" readonly value="' + token + '" name="g-recaptcha-response">').appendTo($(this));
      } else {
        fg.val(token);
      }
    });
  },
  /**
   * Get token recaptcha
   */
  get: function () {
    var gr = $('input[name="g-recaptcha-response"]');
    if (gr.length) {
      var vr = gr[0].getAttribute("value");
      return vr;
    }
    return null;
  },
  /**
   * Button Controller
   * @param {Boolean} reCaptcha_disable
   * @param {Function} callback
   */
  reCaptcha_buttons: function (reCaptcha_disable: boolean, callback: Function) {
    //toastr.info((reCaptcha_disable ? "disabling" : "enabling") + " button", "Recaptcha initialize");
    $('button,[type="submit"],input')
      .not('[data-recaptcha="no-action"]')
      .not("[recaptcha-exclude]")
      .each(function (i, e) {
        if ($(this).attr("type") == "radio") {
          return;
        }
        if (reCaptcha_disable) {
          if ($(this).is(":disabled")) {
            $(this).attr("recaptcha-exclude", makeid(5));
          }
        }
        $(this).prop("disabled", reCaptcha_disable);
      });
    if (typeof callback == "function") {
      callback();
    }
  },
};

/**
 * Hidden reCaptcha v3 object initializer
 */
function recaptcha() {
  return reCaptcha;
}
