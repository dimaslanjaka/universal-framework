var STORAGE = {
  /**
   * get localstorage by key
   * @param {String} key
   */
  get: function(key) {
    if (!this.has(key)) {
      return false;
    }
    var data = localStorage[key];
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  },
  /**
   * Set localstorage key value
   * @param {String} key
   * @param {String|Array|Object} value
   */
  set: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      localStorage.setItem(key, value);
    }
  },
  /**
   * Check localstorage key exists
   * @param {String} key
   */
  has: function(key) {
    return !!localStorage[key] && !!localStorage[key].length;
  },
  /**
   * Extend or set localstorage key
   * @param {String} key
   * @param {String} value
   */
  extend: function(key, value) {
    if (this.has(key)) {
      var _value = this.get(key);
      jQuery.extend(_value, JSON.parse(JSON.stringify(value)));
      this.set(key, _value);
    } else {
      this.set(key, value);
    }
  },
  /**
   * Remove localstorage key
   * @param {String} key
   */
  remove: function(key) {
    localStorage.removeItem(key);
  }
};

/**
 * localStorage helper
 */
function storage() {
  return STORAGE;
}