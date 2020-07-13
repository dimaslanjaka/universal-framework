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
    if (typeof haystack[i] == "object") {
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
  var j: number, x: any, i: number;
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
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

if (!Array.prototype.every) {
  Array.prototype.every = function (fun /*, thisp */) {
    "use strict";
    var t: { [x: string]: any; length: number },
      len: number,
      i: string | number,
      thisp: any;

    if (this == null) {
      throw new TypeError();
    }

    t = Object(this);
    len = t.length >>> 0;
    if (typeof fun !== "function") {
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

function array_filter(array: []) {
  return array.filter(function (el) {
    return el != null;
  });
}

/**
 * pick random from array
 * @param {Array<any>} arrays
 * @param {boolean} unique Unique the arrays
 */
function array_rand(arrays: any[], unique: any) {
  if (unique) {
    arrays = array_unique(arrays);
  }
  var index = Math.floor(Math.random() * arrays.length);
  return {
    index: index,
    value: arrays[index],
  };
}

/**
 * Array unique
 * @param {Array<any>} arrays
 */
function array_unique(arrays: any[]) {
  return arrays.filter(function (item: any, pos: any, self: string | any[]) {
    return self.indexOf(item) == pos;
  });
}

/**
 *
 * @param {Array<any>} arrayName
 * @param {String|number} key
 */
function array_unset(arrayName: { [x: string]: any }, key: any) {
  var x: string | number;
  var tmpArray = new Array();
  for (x in arrayName) {
    if (x != key) {
      tmpArray[x] = arrayName[x];
    }
  }
  return tmpArray;
}

/**
 * PHP shuffle array equivalent
 * @param array
 * @example
 * var arr = [2, 11, 37, 42];
 * shuffle(arr);
 * console.log(arr); //return random
 */
function shuffle(array: Array<any>) {
  var currentIndex = array.length,
    temporaryValue: any,
    randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
