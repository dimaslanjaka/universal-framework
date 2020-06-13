/// <reference path="./Array.d.ts"/>

function arrayCompare(a1: Array<any>, a2: Array<any>) {
  if (a1.length != a2.length) return false;
  var length = a2.length;
  for (var i = 0; i < length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}

/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
function inArray(needle: any, haystack: Array<any>) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (typeof haystack[i] == 'object') {
      if (arrayCompare(haystack[i], needle)) return true;
    } else {
      if (haystack[i] == needle) return true;
    }
  }
  return false;
}
/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
function in_array(needle: any, haystack: Array<any>) {
  return inArray(needle, haystack);
}
/**
 * get all keys
 * @param haystack string etc
 */
function array_keys(haystack: any) {
  return Object.keys(haystack);
}

/**
 * Shuffles array in place.
 * @param a items An array containing the items.
 */
function array_shuffle(a: Array<any>) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
};

if (!Array.prototype.every) {
  Array.prototype.every = function (fun /*, thisp */) {
    'use strict';
    var t, len, i, thisp;

    if (this == null) {
      throw new TypeError();
    }

    t = Object(this);
    len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    thisp = arguments[1];
    for (i = 0; i < len; i++) {
      if (i in t && !fun.call(thisp, t[i], i, t)) {
        return false;
      }
    }

    return true;
  };
}

function array_filter(array: []){
  return array.filter(function (el) {
    return el != null;
  });
}