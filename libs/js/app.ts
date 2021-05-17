var ORIGIN = null as any;
if (isnode()) {
  const process = require("process");
  ORIGIN = process.cwd();
} else {
  ORIGIN = location.protocol + "//" + location.host + location.pathname;
}
var IP: string;

class dimas {
  /**
   * Disabling button
   * @param t element of button
   * @param V
   */
  disable_button(t: JQuery<any> | HTMLButtonElement, V: any = null) {
    var el: HTMLButtonElement;
    if (t instanceof jQuery) {
      el = t.get();
    } else if (t instanceof HTMLButtonElement) {
      el = t;
    }
    if (typeof el != "undefined") {
      el.setAttribute("disabled", "true");
    }
  }
  /**
   * Enabling button
   * @param t element of button
   * @param V
   */
  enable_button(t: JQuery<any> | HTMLButtonElement, V: any = null) {
    var el: HTMLButtonElement;
    if (t instanceof jQuery) {
      el = t.get();
    } else if (t instanceof HTMLButtonElement) {
      el = t;
    }
    if (typeof el != "undefined") {
      el.removeAttribute("disabled");
    }
  }
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
      var ua = md5(navigator.userAgent).rot13();

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
        var captcha = $(this).find('[name="captcha"]');
        if (!captcha.length) {
          $(this).append(
            '<input type="hidden" name="captcha" id="' + guid() + '" />'
          );
          captcha = $(this).find('[name="captcha"]');
        }
        if (captcha.length) {
          captcha.val(storage().get("captcha").rot13());
        }
        var form = captcha.parents("form");
        var button = form.find('[type="submit"]');
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
   * Rupiah currency auto format
   */
  rp(angka: number, prefix: string | any = null) {
    if (!prefix) {
      prefix = "Rp. ";
    }
    var number_string = angka.toString().replace(/[^,\d]/g, ""),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      var separator = sisa ? "." : "";

      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return !prefix ? rupiah : prefix + " " + rupiah;
  }

  /**
   * Check if variable is number / numeric
   * @param {String|Number} v
   */
  isNumber(v: string | number) {
    return (
      !isNaN(parseInt(v.toString()) - parseFloat(v.toString())) &&
      /^\d+$/.test(v.toString())
    );
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
      var myRequest = new Request(url);

      fetch(myRequest).then(function (response) {
        console.log(`${response.status} - ${url}`);
        if (response.status == 200) {
          callback(true, url);
        }
      });
    }
  }

  /**
   * strpad / startwith zero [0]
   * @param {number} val
   */
  strpad(val: number) {
    if (val >= 10) {
      return val;
    } else {
      return "0" + val;
    }
  }

  /**
   * Autofill datetime-local value
   */
  datetimelocal(v?: string | number) {
    var d = !v ? new Date() : new Date(v);
    $("input[type=datetime-local]").val(
      d.getFullYear() +
        "-" +
        this.strpad(d.getMonth() + 1) +
        "-" +
        this.strpad(d.getDate()) +
        "T" +
        this.strpad(d.getHours()) +
        ":" +
        this.strpad(d.getMinutes())
    );
  }

  /**
   * Get cookie
   * @param string name cookie
   */
  gc(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
    }

    return null;
  }

  /**
   * Odd or Even (Ganjil Genap);
   * @param type odd or even
   */
  oddoreven(n: string, type: string) {
    if (!type) {
      type = "odd";
    }
    var time = !n ? new Date().getDay() : Number(n);

    if (!/^-{0,1}\d+jQuery/.test(time.toString())) {
      alert("arguments is not number, please remove quote");
      return null;
    }

    var hasil = time % 2;

    var type = /^(odd|ganjil)$/.test(type) ? "1" : "0";
    //return hasil == (type == ('odd' || 'ganjil') ? 1 : 0);

    return hasil.toString() == type.toString();
  }

  /**
   * Set cookie
   * @param {String} name
   * @param {any} value
   * @param {number} hours
   */
  sc(name: string, value: any, hours: number) {
    var expires = "";
    if (hours) {
      var date = new Date();
      date.setTime(date.getTime() + hours * 3600 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  allcookies() {
    var pairs = document.cookie.split(";");
    var cookies: { [key: string]: any } = {};
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      var str: string = pair[0].trim();
      cookies[str] = unescape(pair.slice(1).join("="));
    }
    return cookies;
  }

  /**
   * Remove Cookie
   */
  rc(name: string): void {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  /**
   * Get Query name from current url
   */
  getquery(variable: any) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  recode(content: string, passcode: string) {
    var result = [];
    var str = "";
    var codesArr = JSON.parse(content);
    var passLen = passcode.length;
    for (var i = 0; i < codesArr.length; i++) {
      var passOffset = i % passLen;
      var calAscii = codesArr[i] - passcode.charCodeAt(passOffset);
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
   * @param {String} url
   * @param {Function} callback
   */
  js(url: string, callback: Function | any) {
    var pel = document.body || document.head;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    if (typeof callback == "function") script.onreadystatechange = callback;

    script.onload = callback;
    pel.appendChild(script);
  }

  /**
   * Countdown trigger
   * @param {JQuery} elm
   */
  pctdRUN(elm: JQuery) {
    var tl = parseInt(elm.attr("countdown")) > 0 ? elm.attr("countdown") : 5,
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
          var callback = elm.data("callback");
          if (callback) {
            var xn = window[callback];
            if (typeof xn == "function") {
              var x = eval(callback);
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
    var t = this;

    if (typeof progressBarTimer == "undefined") {
      this.js(
        "https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/js/jquery.progressBarTimer.js",
        function () {
          t.pctdRUN(elm);
        }
      );
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
    var parser = document.createElement("a"),
      searchObject: { [key: string]: any } = {},
      queries: string[],
      split: any[],
      i: number;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, "").split("&");
    for (i = 0; i < queries.length; i++) {
      split = queries[i].split("=");
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
      protohost: parser.protocol + "//" + parser.host,
    };
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
    var scripts = document.querySelectorAll("script[src]");
    var last = scripts[scripts.length - 1];
    var lastsrc = last.getAttribute("src");
    var parsed = framework().parseurl(lastsrc);
    args.forEach(function (src) {
      this.js(`${app.base}${src}${parsed.search}`, function () {
        console.log(`${src} engine inbound`);
      });
    });
  }

  static load(...args: any[]) {
    var scripts = document.querySelectorAll("script[src]");
    var last = scripts[scripts.length - 1];
    var lastsrc = last.getAttribute("src");
    var parsed = framework().parseurl(lastsrc);
    args.forEach(function (key, index) {
      console.log(key, app.base);
      let src: string = "";
      if (/^(ajx|ajaxjQuery|ajxjquery|ajquery)$/s.test(key)) {
        src = "ajaxJquery.js";
      } else if (/^(ajv|ajaxVanilla|ajaxv|avanilla)$/s.test(key)) {
        src = "ajaxVanilla.js";
      }

      if (src != "") {
        this.js(`${app.base}${src}${parsed.search}`, function () {
          console.log(`${src} engine inbound`);
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
