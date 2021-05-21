/// <reference path="_Prototype-String.ts" />

let ORIGIN: any;
if (isnode()) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const process = require("process");
  ORIGIN = process.cwd();
} else {
  ORIGIN = location.protocol + "//" + location.host + location.pathname;
}
let IP: string;

class dimas {
  /**
   * get current url without querystrings
   */
  static url = ORIGIN;
  static ip: any = null;

  static setIp(ip: any) {
    this.ip = ip;
    IP = ip;
  }

  static getIp() {
    return this.ip;
  }

  /**
   * framework captcha
   */
  static captcha = {
    /**
     * DO NOT ASSIGN THIS
     */
    check: null as NodeJS.Timer,
    /**
     * Get current captcha id
     */
    id(header_name: string | null): string {
      if (!this.captcha.check) {
        this.captcha.get(header_name);
      }
      return storage().get("captcha");
    },
    /**
     * Get current captcha from backend
     * And process it by jsonpCallback
     */
    get(header_name: null | string): void {
      if (!this.captcha.check) {
        this.captcha.check = setTimeout(() => {
          this.captcha.get(header_name);
        }, 60000);
      }
      const ua = md5(navigator.userAgent).rot13();

      $.ajax({
        url: this.url + "?login=" + guid(),
        method: "POST",
        headers: {
          Accept: "application/javascript",
          [header_name]: ua,
          [IP.rot13()]: ua,
        },
        dataType: "jsonp",
        jsonpCallback: "framework().captcha.jspCallback",
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callback(arg?: any) {},

    /**
     * Captcha JSONP callback
     */
    jspCallback(res: { captcha: string }) {
      if (res.hasOwnProperty("captcha")) {
        storage().set("captcha", res.captcha.rot13());
        this.captcha.callback(storage().get("captcha"));
        this.captcha.listen();
      }
    },
    listener_started: null as any | string,
    /**
     * Form Captcha listener
     */
    listen() {
      if (this.captcha.listener_started) {
        return null;
      }
      this.captcha.listener_started = new Date().toISOString();
      return $(document).on("focus", "form[captcha]", function (e) {
        let captcha = $(this).find('[name="captcha"]');
        if (!captcha.length) {
          $(this).append('<input type="hidden" name="captcha" id="' + guid() + '" />');
          captcha = $(this).find('[name="captcha"]');
        }
        if (captcha.length) {
          captcha.val(storage().get("captcha").rot13());
        }
        const form = captcha.parents("form");
        const button = form.find('[type="submit"]');
        form.one("submit", function (e) {
          e.preventDefault();
          console.log("submit with captcha");
          button.prop("disabled", true);
          this.captcha.callback = function () {
            button.prop("disabled", false);
          };
          this.captcha.get(null);
          form.off("submit");
        });
        //captcha.parents('form').find('[type="submit"]').one('click', function());
      });
    },
  };

  /**
   * Count Array/Object/String length
   * @param {any[]|string|object} data
   */
  count(data: any[] | string | object) {
    if (Array.isArray(data) || typeof data == "string") {
      return data.length;
    } else if (typeof data == "object") {
      return Object.keys(data).length;
    } else if (typeof data == "number") {
      return data;
    }
  }

  /**
   * Make async function
   * @param callback
   */
  async(callback: any) {
    return new Promise(function (resolve, reject) {
      if (typeof callback == "function") {
        callback();
      }
      resolve(true);
    });
  }

  /**
   * Check if variable is number / numeric
   * @param {String|Number} v
   */
  isNumber(v: string | number) {
    return !isNaN(parseInt(v.toString()) - parseFloat(v.toString())) && /^\d+$/.test(v.toString());
  }

  /**
   * Check if valid url
   * @param url url address
   */
  isURL(url: string) {
    if (url.startsWith("/")) {
      console.log("url type is local");
      return true;
    }
    let result: URL;
    try {
      result = new URL(url);
    } catch (_) {
      return false;
    }

    return result.protocol === "http:" || result.protocol === "https:";
  }

  /**
   * Check url is valid and reachable
   * @param url url address
   * @param callback callback function
   */
  isURLReachable(url: string, callback: (arg0: boolean, arg1: string) => any) {
    if (this.isURL(url)) {
      const myRequest = new Request(url);

      fetch(myRequest).then(function (response) {
        console.log(`${response.status} - ${url}`);
        if (response.status == 200) {
          callback(true, url);
        }
      });
    }
  }

  /**
   * Get Query name from current url
   */
  getquery(variable: any) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  recode(content: string, passcode: string) {
    let i;
    const result = [];
    let str = "";
    const codesArr = JSON.parse(content);
    const passLen = passcode.length;

    for (i = 0; i < codesArr.length; i++) {
      const passOffset = i % passLen;
      const calAscii = codesArr[i] - passcode.charCodeAt(passOffset);
      result.push(calAscii);
    }

    for (i = 0; i < result.length; i++) {
      const ch = String.fromCharCode(result[i]);
      str += ch;
    }
    return str;
  }

  /**
   * Countdown trigger
   * @param {JQuery} elm
   */
  pctdRUN(elm: JQuery) {
    const tl = parseInt(elm.attr("countdown")) > 0 ? elm.attr("countdown") : 5,
      bs = elm.data("base") ? elm.data("base") : "bg-info",
      bw = elm.data("warning") ? elm.data("warning") : "bg-danger",
      bc = elm.data("success") ? elm.data("success") : "bg-success",
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
        onFinish() {
          const callback = elm.data("callback");
          if (callback) {
            const xn = window[callback];
            if (typeof xn == "function") {
              const x = eval(callback);
              x();
            } else {
              console.log(callback + " isn't function ");
            }
          }
        },
        label: {
          show: true,
          type: "percent", // or 'seconds' => 23/60
        },
        autoStart: true,
      });
    return countdown;
  }

  /**
   * Progress Countdown
   * @param {JQuery} elm
   */
  pctd(elm: JQuery) {
    if (typeof progressBarTimer == "undefined") {
      LoadScript({
        url: "https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/js/jquery.progressBarTimer.js",
        callback: function () {
          this.pctdRUN(elm);
        },
      });
    } else {
      window.onload = function (params: any) {
        this.pctdRUN(elm);
      };
    }
  }

  /**
   * Parseurl just like as parse_url at php
   */
  parseurl(url: string) {
    return url.parse_url();
  }
}

/**
 * Framework object initializer
 */
function framework() {
  return new dimas();
}

class app {
  static base = "/src/MVC/themes/assets/js/";

  static setbase(path: string) {
    this.base = path;
  }

  static direct(...args: string[]) {
    const scripts = document.querySelectorAll("script[src]");
    const last = scripts[scripts.length - 1];
    const lastsrc = last.getAttribute("src");
    const parsed = framework().parseurl(lastsrc);
    args.forEach(function (src) {
      LoadScript({
        url: `${app.base}${src}${parsed.search}`,
        callback: function () {
          console.log(`${src} engine inbound`);
        },
      });
    });
  }

  static load(...args: any[]) {
    const scripts = document.querySelectorAll("script[src]");
    const last = scripts[scripts.length - 1];
    const lastsrc = last.getAttribute("src");
    const parsed = framework().parseurl(lastsrc);
    args.forEach(function (key, index) {
      console.log(key, app.base);
      let src = "";
      if (/^(ajx|ajaxjQuery|ajxjquery|ajquery)$/s.test(key)) {
        src = "ajaxJquery.js";
      } else if (/^(ajv|ajaxVanilla|ajaxv|avanilla)$/s.test(key)) {
        src = "ajaxVanilla.js";
      }

      if (src != "") {
        LoadScript({
          url: `${app.base}${src}${parsed.search}`,
          callback: function () {
            console.log(`${src} engine inbound`);
          },
        });
      }
    });
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports.app = app;
  module.exports.dimas = dimas;
}

//app.direct('Array.js', 'Object.js', 'saver.js', 'user.js');
