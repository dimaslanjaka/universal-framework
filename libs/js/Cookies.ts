/**
 * Cookie Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @see http://localhost/src/Cookies/helper.php
 */
class Cookies {
  /**
   * Get cookie value by cookie name
   * @param c_name
   * @returns null if cookie not exists
   */
  static get(c_name: string): string | Object | null {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length;
        }
        var cookie = unescape(document.cookie.substring(c_start, c_end));
        cookie = base64_decode(cookie);
        if (is_json(cookie)) {
          return JSON.parse(cookie);
        }
        return cookie;
      }
    }
    return null;
  }

  /**
   * Create cookie expiring in days
   * @param name cookie name
   * @param value cookie value
   * @param days days to expire
   * @param expire_type d = days, m = minutes, s = seconds, default seconds
   */
  static set(
    name: string,
    value: any,
    expire: number,
    expire_type: string,
    path: string | any,
    callback: any | Function
  ) {
    var expires;
    if (expire) {
      var date = new Date();
      if (/^d$|day/s.test(expire_type)) {
        date.setTime(date.getTime() + expire * 24 * 60 * 60 * 1000);
      } else if (/^m$|minute/s.test(expire_type)) {
        date.setTime(date.getTime() + expire * 60 * 1000);
      } else if (/^s$|second/s.test(expire_type)) {
        date.setTime(date.getTime() + expire * 1000);
      } else {
        date.setTime(date.getTime() + expire * 1000);
      }
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    var cookie_path = "/";
    if (typeof path == "string") {
      if (path.length > 0) {
        cookie_path = path;
      }
    }
    value = JSON.stringify(value);
    value = base64_encode(JSON.stringify(value));
    var formatted = name + "=" + value + expires + "; path=" + cookie_path;
    console.info(`cookie formated: ` + formatted);
    document.cookie = formatted;
    if (typeof callback == "function") {
      return callback(arguments);
    }
    return this.get(name);
  }

  /**
   * Call function if cookie name not set
   * @param name
   * @param value
   * @param expire Expires number (minutes)
   * @param callback Function callback to be executed one time
   */
  static one(name: string, value: any, expire: number, callback: Function) {
    if (this.get(name) == null) {
      this.set(name, value, expire, "m", "/", callback);
    }
  }

  /**
   * decompress cookie
   * @param str
   */
  static decompress(str: string) {
    /*return pako.inflateRaw(str, {
      to: 'string'
    });*/
  }

  /**
   * compress cookie
   * @param str
   */
  static compress(str: string) {
    /*return pako.deflateRaw(str, {
      to: 'string'
    });*/
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports.Cookies = Cookies;
}
