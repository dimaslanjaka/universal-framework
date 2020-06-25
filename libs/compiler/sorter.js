"use strict";
var sorter = /** @class */ (function () {
    function sorter() {
    }
    /**
     * Sort Ascending Recursive
     * @param {Object|Array<any>} object
     */
    sorter.ascending = function (object) {
        if (typeof object != "object" || object instanceof Array) {
            // Not to sort the array
            return object;
        }
        var keys = Object.keys(object);
        keys.sort();
        var newObject = {};
        for (var i = 0; i < keys.length; i++) {
            newObject[keys[i]] = this.ascending(object[keys[i]]);
        }
        return newObject;
    };
    sorter.sortObject = function (obj) {
        return Object.keys(obj)
            .sort()
            .reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
    };
    /**
     * reorder object/array
     * @param {Object} parsed
     */
    sorter.reorder = function (parsed) {
        var ordered = [];
        var is_array = Array.isArray(parsed);
        //console.log('is_array ? ' + is_array);
        if (is_array) {
            parsed.forEach(function (item, index) {
                if (typeof item == "object") {
                    parsed[index] = sorter.sortObject(item);
                }
            });
            ordered = parsed;
        }
        else if (typeof parsed == "object") {
            ordered = {};
            Object.keys(parsed)
                .sort()
                .forEach(function (key) {
                ordered[key] = parsed[key];
            });
        }
        //console.log(ordered);
        return this.ascending(ordered);
    };
    return sorter;
}());
module.exports = sorter;
