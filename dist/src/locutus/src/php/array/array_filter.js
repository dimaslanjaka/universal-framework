module.exports = function array_filter(arr, func) {
    //  discuss at: https://locutus.io/php/array_filter/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: max4ever
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Takes a function as an argument, not a function's name
    //   example 1: var odd = function (num) {return (num & 1);}
    //   example 1: array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd)
    //   returns 1: {"a": 1, "c": 3, "e": 5}
    //   example 2: var even = function (num) {return (!(num & 1));}
    //   example 2: array_filter([6, 7, 8, 9, 10, 11, 12], even)
    //   returns 2: [ 6, , 8, , 10, , 12 ]
    //   example 3: array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined})
    //   returns 3: {"a":1, "c":-1}
    var retObj = {};
    var k;
    func = func || function (v) {
        return v;
    };
    // @todo: Issue #73
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        retObj = [];
    }
    for (k in arr) {
        if (func(arr[k])) {
            retObj[k] = arr[k];
        }
    }
    return retObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2ZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLEdBQUcsRUFBRSxJQUFJO0lBQy9DLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0JBQXdCO0lBQ3hCLG9EQUFvRDtJQUNwRCxzRUFBc0U7SUFDdEUsNERBQTREO0lBQzVELDJFQUEyRTtJQUMzRSx3Q0FBd0M7SUFDeEMsZ0VBQWdFO0lBQ2hFLDREQUE0RDtJQUM1RCxzQ0FBc0M7SUFDdEMscUdBQXFHO0lBQ3JHLCtCQUErQjtJQUUvQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLENBQUMsQ0FBQTtJQUVMLElBQUksR0FBRyxJQUFJLElBQUksVUFBVSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxDQUFBO0lBQ1YsQ0FBQyxDQUFBO0lBRUQsbUJBQW1CO0lBQ25CLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixFQUFFO1FBQzVELE1BQU0sR0FBRyxFQUFFLENBQUE7S0FDWjtJQUVELEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtRQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbkI7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=