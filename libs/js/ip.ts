class ip {
  private static status(value: Boolean) {
    if (value === true) {
      Cookies.set('status_ip'.rot13(), String(value), 5, 'm', location.pathname, null);
    }
    return Cookies.get('status_ip'.rot13());
  };

  /**
   * Checks ip
   * @returns promises
   */
  static async check() {
    await this.ipapi();
    if (!this.status(null)) {
      await this.l2io();
    }
    if (this.status(null)) {
      console.log(this.get(null));
    }
  }
  /**
   * Gets ip
   * @param callback function callback(ip) or null return ip
   * @returns {String} ip or callback
   */
  static get(callback: Function | null): string {
    if (!this.status(null)) {
      this.check();
    }
    console.log(this.status(null));
    var ips = storage().get('ip');
    if (typeof callback == 'function') { return callback(ips); }
    return ips;
  }
  static ipapi() {
    var self = this;
    return $.ajax({
      proxy: false,
      url: 'https://ipapi.co/json/',
      success: function (res: { "ip": "114.4.83.195", "city": "Jakarta", "region": "Jakarta", "region_code": "JK", "country": "ID", "country_code": "ID", "country_code_iso3": "IDN", "country_capital": "Jakarta", "country_tld": ".id", "country_name": "Indonesia", "continent_code": "AS", "in_eu": false, "postal": null, "latitude": -6.1741, "longitude": 106.8296, "timezone": "Asia/Jakarta", "utc_offset": "+0700", "country_calling_code": "+62", "currency": "IDR", "currency_name": "Rupiah", "languages": "id,en,nl,jv", "country_area": 1919440.0, "country_population": 242968342.0, "asn": "AS4761", "org": "INDOSAT Internet Network Provider" }) {
        if (typeof res == 'object') {
          storage().set('ip_info', res);
          if (res.hasOwnProperty('ip')) {
            storage().set('ip', res.ip);
            self.status(true);
          }
        }
      }
    });
  }

  static l2io() {
    var self = this;
    return $.ajax({
      proxy: false,
      url: 'https://l2.io/ip.json',
      success: function (res: { "ip": "114.4.83.195" }) {
        if (typeof res == 'object') {
          storage().set('ip_info', res);
          if (res.hasOwnProperty('ip')) {
            storage().set('ip', res.ip);
            self.status(true);
          }
        }
      }
    });
  }
}

