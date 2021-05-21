class reCaptcha {
  /**
   * @property counter executions
   */
  gexec_count: number = 0;
  /**
   * @property site key recaptcha
   */
  key: string = "";

  /**
   * Javascript caller
   * @param url
   * @param callback
   */
  js(url: string, callback: () => void): void {
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
   * Set recaptcha site key
   * @param key
   * @returns
   */
  set_key(key: string): this {
    this.key = key;
    return this;
  }

  /**
   * Start recaptcha
   */
  start(): void {
    this.reCaptcha_buttons(true, function () {
      LoadScript({
        url: "https://www.google.com/recaptcha/api.js?render=" + this.key + "&render=explicit",
        callback: function () {
          grecaptcha.ready(function () {
            var msg =
              "first_start_" +
              location.href
                .replace(/[^a-zA-Z0-9 ]/g, "_")
                .replace(/\_{2,99}/g, "_")
                .replace(/\_$/g, "");
            this.exec(msg);
          });
        },
      });
    });
  }

  /**
   * Initialize Recaptcha by defining jquery
   */
  init() {
    if (typeof jQuery == "undefined" || typeof jQuery == "undefined") {
      LoadScript({ url: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js", callback: this.start });
    } else {
      this.start();
    }
  }

  private retry_count = 0;

  /**
   * load or refreshing google recaptcha
   */
  exec(action: any, retry: boolean, callback: (arg0: string) => void = null) {
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
        this.exec(action, true);
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
    this.gexec_count++;
    var execute = grecaptcha.execute(this.key, {
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
          this.reCaptcha_buttons(false, null);
          //console.info(token);
          this.insert(token);
          if (typeof callback == "function") {
            callback(token);
          }
        }
      );
    }
  }
  /**
   * Insert reCaptcha Token
   * @param {String} token
   */
  insert(token: string) {
    Cookies.set("token", token, 1, "d");
    if (typeof jQuery == "undefined") {
      console.log("jQuery Not Loaded");
      LoadScript({
        url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        callback: function () {
          this.distribute_token(token);
        },
      });
    } else {
      this.distribute_token(token);
    }
  }
  /**
   * Distribute reCaptcha Token
   * @param token
   */
  distribute_token(token: string): void {
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
  }
  /**
   * Get token recaptcha
   */
  get(): string | null {
    var gr = $('input[name="g-recaptcha-response"]');
    if (gr.length) {
      var vr = gr[0].getAttribute("value");
      return vr;
    }
    return null;
  }
  /**
   * Button Controller
   * @param {Boolean} reCaptcha_disable
   * @param {Function} callback
   */
  reCaptcha_buttons(reCaptcha_disable: boolean, callback: Function) {
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
  }
}

/**
 * Hidden reCaptcha v3 object initializer
 */
function recaptcha(): reCaptcha {
  const recap = new reCaptcha();
  recap.set_key(siteConfig.google.recaptcha.key);
  return recap;
}
