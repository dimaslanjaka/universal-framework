export class sorter {
  /**
   * Sort Ascending Recursive
   * @param {Object|Array<any>} object
   */
  static ascending(object: object | Array<any> | any) {
    if (typeof object != "object" || object instanceof Array) {
      // Not to sort the array
      return object;
    }
    var keys = Object.keys(object);
    keys.sort();
    var newObject: any = {};
    for (var i = 0; i < keys.length; i++) {
      newObject[keys[i]] = this.ascending(object[keys[i]]);
    }
    return newObject;
  }
  static sortObject(obj: any) {
    return Object.keys(obj)
      .sort()
      .reduce(function (result: any, key: any) {
        result[key] = obj[key];
        return result;
      }, {});
  }
  /**
   * reorder object/array
   * @param {Object} parsed
   */
  static reorder(parsed: object | any) {
    var ordered: any = [];
    var is_array = Array.isArray(parsed);
    //console.log('is_array ? ' + is_array);
    if (is_array) {
      parsed.forEach(function (item: any, index: any) {
        if (typeof item == "object") {
          parsed[index] = sorter.sortObject(item);
        }
      });
      ordered = parsed;
    } else if (typeof parsed == "object") {
      ordered = {};
      Object.keys(parsed)
        .sort()
        .forEach(function (key) {
          ordered[key] = parsed[key];
        });
    }
    //console.log(ordered);
    return this.ascending(ordered);
  }
}
