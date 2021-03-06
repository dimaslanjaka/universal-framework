/// <reference path="_Prototype-String.ts"/>
/// <reference path="_Prototype-Object.ts"/>

interface ipapi_response {
  ip: "114.4.83.195";
  city: "Jakarta";
  region: "Jakarta";
  region_code: "JK";
  country: "ID";
  country_code: "ID";
  country_code_iso3: "IDN";
  country_capital: "Jakarta";
  country_tld: ".id";
  country_name: "Indonesia";
  continent_code: "AS";
  in_eu: false;
  postal: null;
  latitude: -6.1741;
  longitude: 106.8296;
  timezone: "Asia/Jakarta";
  utc_offset: "+0700";
  country_calling_code: "+62";
  currency: "IDR";
  currency_name: "Rupiah";
  languages: "id,en,nl,jv";
  country_area: 1919440.0;
  country_population: 242968342.0;
  asn: "AS4761";
  org: "INDOSAT Internet Network Provider";
}
const cookie_ip = "ip".rot13();
const cookie_indicator = "status_ip".rot13();
/**
 * IP Address class
 * @class get, check, validate ip address
 */
class ip {
  static storage = new STORAGE();

  /**
   * Reflection class constructor
   * @see https://stackoverflow.com/questions/43431550/async-await-class-constructor
   * @param callback
   * @example
   * var myObj = new myClass();
   * myObj.init(function() {
   *    // inside here you can use myObj
   * });
   */
  init(callback: Function) {
    // do something async and call the callback:
    callback.bind(this)();
  }

  private static status() {
    //if (value != null) if (!value.isEmpty()) ip.save(value);
    return Cookies.has(cookie_indicator);
  }

  /**
   * Checks ip
   * @returns promises
   */
  private static async check() {
    if (!this.status()) await this.cloudflare();
    //if (!this.status()) await this.ipapi();
    if (!this.status()) await this.l2io();

    /*if (this.status()) {
      console.log(this.get(null));
    } */
  }

  /**
   * Gets ip
   * @param callback function callback(ip) or null return ip
   * @returns {String} ip or callback
   */
  static get(callback: Function = null): string {
    this.check();
    //console.log(this.status(null));
    var ips = this.storage.get(cookie_ip);
    //ips = Cookies.get(cookie_ip);
    if (typeof callback == "function") {
      return callback(ips);
    }
    return ips;
  }

  static ipapi() {
    return $.ajax({
      proxy: false,
      url: "//ipapi.co/json/",
      success: function (res: ipapi_response) {
        if (typeof res == "object") {
          this.storage.set("ip_info", res);
          if (res.hasOwnProperty("ip")) {
            ip.save(res.ip);
          }
        }
      },
    });
  }

  static l2io() {
    return $.ajax({
      proxy: false,
      url: "//l2.io/ip.json",
      success: function (res: { ip: "114.4.83.195" }) {
        if (typeof res == "object") {
          this.storage.set("ip_info", res);
          if (res.hasOwnProperty("ip")) {
            ip.save(res.ip);
          }
        }
      },
    });
  }

  static cloudflare() {
    return $.ajax({
      proxy: false,
      url: "//www.cloudflare.com/cdn-cgi/trace",
      success: function (str) {
        const regex = /ip\=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
        let m: RegExpExecArray = regex.exec(str);
        if (m != null) {
          if (m.length > 0) {
            ip.save(m[1]);
          }
        }
      },
    });
  }

  private static save(ip: string) {
    Cookies.set(cookie_ip, ip, "1h", null, location.pathname);
    Cookies.set(cookie_indicator, String(ip), 5, "m", location.pathname, null);
    if (typeof localStorage != "undefined") {
      this.storage.set(cookie_ip, ip);
    }
  }
}

/**
 * Get unique id of machine
 */
function get_unique_id() {
  if (typeof localStorage != "undefined") {
    if (localStorage.getItem("ip") != null) {
      return localStorage.getItem("ip");
    }
  }
  if (typeof Cookies != "undefined") {
    if (Cookies.has("ip")) {
      return Cookies.get("ip");
    }
  }

  if (isnode()) {
    var mac = JSON.stringify(require("os").networkInterfaces(), null, 2)
      .match(/"mac": ".*?"/g)
      .toString()
      .match(/\w\w:\w\w:\w\w:\w\w:\w\w:\w\w/g);
    if (mac.length > 0) {
      return mac[1];
    }
  }

  if (typeof location != "undefined") {
    if (location.hostname) {
      return location.hostname;
    }
  }
}
