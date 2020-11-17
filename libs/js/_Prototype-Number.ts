declare interface Number {
  getMS(type: string): number;
  /**
   * Get X Hour from date
   * @return number ms from Date().getTime()
   * @example
   * get `1 hour from current Date()`
   * 1.addHour()
   * get `1 hour from spesific Date()`
   * 1.addHour(new Date('2020-06-04 01:10:53'))
   */
  addHour(source: Date | null): number;
  /**
   * add zero leading
   * @param add
   * @param target
   */
  AddZero(add: number, target: string): number;
}

Number.prototype.getMS = function (type) {
  var self = this;
  return this * 60 * 1000;
};

Number.prototype.addHour = function (source) {
  var self = this;
  var Hour = this * 60 * 1000; /* ms */
  if (!source) source = new Date();
  return new Date(source.getTime() + Hour).getTime();
};

Number.prototype.AddZero = function (b, c) {
  var l = String(b || 10).length - String(this).length + 1;
  return l > 0 ? new Array(l).join(c || "0") + this : this;
};
