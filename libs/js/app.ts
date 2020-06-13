function typedKeys<T>(o: T): (keyof T)[] {
  // type cast should be safe because that's what really Object.keys() does
  return Object.keys(o) as (keyof T)[];
}

var dimas = {
  /**
   * get current url without querystrings
   */
  url: location.protocol + '//' + location.host + location.pathname,
  /**
   * framework captcha
   */
  captcha: {
    check: null as NodeJS.Timeout,
    /**
     * Get current captcha id
     */
    id: function (): string {
      dimas.captcha.get(null);
      return storage().get('captcha');
    },
    /**
     * Get current captcha from backend
     * And process it by jsonpCallback
     */
    get: function (header_name: null | string): void {
      if (!dimas.captcha.check) {
        dimas.captcha.check = setTimeout(() => {
          dimas.captcha.get(header_name);
        }, 60000);
      }
      var ua = md5(navigator.userAgent).rot13();
      var IP = ip.get(null);
      $.ajax({
        url: dimas.url + '?login=' + guid(),
        method: 'POST',
        headers: {
          'Accept': 'application/javascript',
          [header_name || md5(IP).rot13()]: ua
        },
        dataType: 'jsonp',
        jsonpCallback: "framework().captcha.jspCallback"
      });
    },

    callback: function (arg?: any) { },

    /**
     * Captcha JSONP callback
     */
    jspCallback: function (res: { captcha: string }
    ) {
      if (res.hasOwnProperty('captcha')) {
        storage().set('captcha', res.captcha.rot13());
        dimas.captcha.callback(storage().get('captcha'));
      }
    }
  },
  /**
   * Rupiah currency auto format
   */
  rp: function (angka: number, prefix: string | any) {
    if (!prefix) {
      prefix = "Rp. ";
    }
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {

      var separator = sisa ? '.' : '';

      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return (!prefix ? rupiah : prefix + ' ' + rupiah);
  },
  /**
   * Check if variable is number / numeric
   * @param {String|Number} v
   */
  isNumber: function (v: string | number) {
    return !isNaN(parseInt(v.toString()) - parseFloat(v.toString())) && /^\d+$/.test(v.toString());
  },
  /**
   * strpad / startwith zero [0]
   * @param {number} val
   */
  strpad: function (val: number) {
    if (val >= 10) {
      return val;
    } else {
      return '0' + val;
    }
  },
  /**
   * Autofill datetime-local value
   */
  datetimelocal: function (v: string | number) {
    var d = (!v ? new Date() : new Date(v));
    $('input[type=datetime-local]').val(d.getFullYear() + "-" + this.strpad(d.getMonth() + 1) + "-" + this.strpad(d.getDate()) + "T" + this.strpad(d.getHours()) + ":" + this.strpad(d.getMinutes()));
  },
  /**
   * Get cookie
   * @param string name cookie
   */
  gc: function (name: string) {
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
  },

  /**
   * Odd or Even (Ganjil Genap);
   * @param type odd or even
   */
  oddoreven: function (n: string, type: string) {
    if (!type) {
      type = 'odd';
    }
    var time = (!n ? new Date().getDay() : Number(n));

    if (!/^-{0,1}\d+jQuery/.test(time.toString())) {
      alert('arguments is not number, please remove quote');
      return null;
    }

    var hasil = time % 2;

    var type = /^(odd|ganjil)$/.test(type) ? '1' : '0';
    //return hasil == (type == ('odd' || 'ganjil') ? 1 : 0);

    return hasil.toString() == type.toString();
  },

  /**
   * Set cookie
   * @param {String} name
   * @param {any} value
   * @param {number} hours
   */
  sc: function (name: string, value: any, hours: number) {
    var expires = "";
    if (hours) {
      var date = new Date();
      date.setTime(date.getTime() + (hours * 3600 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },

  allcookies: function () {
    var pairs = document.cookie.split(";");
    var cookies: { [key: string]: any } = {};
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      var str: string = pair[0].trim();
      cookies[str] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  },

  /**
   * Remove Cookie
   */
  rc: function (name: string): void {
    document.cookie = name + '=; Max-Age=-99999999;';
  },

  /**
   * Get Query name from current url
   */
  getquery: function (variable: any) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (false);
  },
  recode: function (content: string, passcode: string) {
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
  },
  /**
   * Get js file from url
   * @param {String} url
   * @param {Function} callback
   */
  js: function (url: string, callback: Function | any) {
    var pel = document.body || document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (typeof callback == 'function') script.onreadystatechange = callback;

    script.onload = callback;
    pel.appendChild(script);
  },
  /**
   * Countdown trigger
   * @param {JQuery} elm
   */
  pctdRUN: function (elm: JQuery) {

    var tl = (parseInt(elm.attr('countdown')) > 0 ? elm.attr('countdown') : 5),
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
        onFinish: function () {
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
  },
  /**
   * Progress Countdown
   * @param {JQuery} elm
   */
  pctd: function (elm: JQuery) {
    var t = this;

    if (typeof progressBarTimer == 'undefined') {
      this.js('https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/js/jquery.progressBarTimer.js', function () {
        t.pctdRUN(elm);
      });
    } else {

      window.onload = function (params: any) {
        dimas.pctdRUN(elm);
      }
    }
  },

  /**
   * Parseurl just like as parse_url at php
   */
  parseurl: function (url: string) {
    var parser = document.createElement('a'),
      searchObject: { [key: string]: any } = {},
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
};

/**
 * Framework object initializer
 */
function framework() {
  return dimas;
}

class app {
  static base = '/src/MVC/themes/assets/js/';
  static setbase(path: string) {
    this.base = path;
  }
  static direct(...args: string[]) {
    var scripts = document.querySelectorAll("script[src]");
    var last = scripts[scripts.length - 1];
    var lastsrc = last.getAttribute('src');
    var parsed = dimas.parseurl(lastsrc);
    args.forEach(function (src) {
      dimas.js(`${app.base}${src}${parsed.search}`, function () {
        console.log(`${src} engine inbound`);
      });
    });
  }
  static load(...args: any[]) {
    var scripts = document.querySelectorAll("script[src]");
    var last = scripts[scripts.length - 1];
    var lastsrc = last.getAttribute('src');
    var parsed = dimas.parseurl(lastsrc);
    args.forEach(function (key, index) {
      console.log(key, app.base);
      let src: string = '';
      if (/^(ajx|ajaxjQuery|ajxjquery|ajquery)$/s.test(key)) { src = 'ajaxJquery.js'; }
      else if (/^(ajv|ajaxVanilla|ajaxv|avanilla)$/s.test(key)) { src = 'ajaxVanilla.js'; }

      if (src != '') {
        dimas.js(`${app.base}${src}${parsed.search}`, function () {
          console.log(`${src} engine inbound`);
        });
      }
    });
  }
}

//app.direct('Array.js', 'Object.js', 'saver.js', 'user.js');
