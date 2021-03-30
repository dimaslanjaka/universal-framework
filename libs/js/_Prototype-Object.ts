/// <reference path="./Object.d.ts"/>
/// <reference path="../src/smartform/src/js/Object.d.ts"/>

Object.size = function (obj) {
  var size = 0,
    key: any;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

Object.child = function (str, callback) {
  var self: any = this;
  if (self.hasOwnProperty(str)) {
    if (typeof callback == "function") {
      return callback(self[str]);
    } else {
      return true;
    }
  } else {
    return undefined;
  }
};

Object.alt = function (str, alternative) {
  var self: any = this;
  if (self.hasOwnProperty(str)) {
    return self[str];
  } else {
    return alternative;
  }
};

Object.has = function (str: string | number) {
  return this.hasOwnProperty(str);
};

Object.each = function (callback) {
  for (var key in this) {
    //callback.call(scope, key, this[key]);
    callback.call(this[key]);
  }
};

Object.isEmpty = function () {
  return this.length === 0;
};
