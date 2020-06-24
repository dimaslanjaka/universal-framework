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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9maWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxHQUFHLEVBQUUsSUFBSTtJQUMvQyxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHdCQUF3QjtJQUN4QixvREFBb0Q7SUFDcEQsc0VBQXNFO0lBQ3RFLDREQUE0RDtJQUM1RCwyRUFBMkU7SUFDM0Usd0NBQXdDO0lBQ3hDLGdFQUFnRTtJQUNoRSw0REFBNEQ7SUFDNUQsc0NBQXNDO0lBQ3RDLHFHQUFxRztJQUNyRywrQkFBK0I7SUFFL0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxDQUFDLENBQUE7SUFFTCxJQUFJLEdBQUcsSUFBSSxJQUFJLFVBQVUsQ0FBQztRQUN4QixPQUFPLENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQTtJQUVELG1CQUFtQjtJQUNuQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtRQUM1RCxNQUFNLEdBQUcsRUFBRSxDQUFBO0tBQ1o7SUFFRCxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDYixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ25CO0tBQ0Y7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9