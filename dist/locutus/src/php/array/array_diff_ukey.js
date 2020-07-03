module.exports = function array_diff_ukey(arr1) {
    //  discuss at: https://locutus.io/php/array_diff_ukey/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    //   example 1: array_diff_ukey($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
    //   returns 1: {red: 2, purple: 4}
    var retArr = {};
    var arglm1 = arguments.length - 1;
    // var arglm2 = arglm1 - 1
    var cb = arguments[arglm1];
    var k1 = '';
    var i = 1;
    var arr = {};
    var k = '';
    var $global = (typeof window !== 'undefined' ? window : global);
    cb = (typeof cb === 'string')
        ? $global[cb]
        : (Object.prototype.toString.call(cb) === '[object Array]')
            ? $global[cb[0]][cb[1]]
            : cb;
    arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
        for (i = 1; i < arglm1; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (cb(k, k1) === 0) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys; // eslint-disable-line no-labels
                }
            }
            retArr[k1] = arr1[k1];
        }
    }
    return retArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZGlmZl91a2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2RpZmZfdWtleS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLElBQUk7SUFDN0MsdURBQXVEO0lBQ3ZELG9EQUFvRDtJQUNwRCxvRUFBb0U7SUFDcEUscUVBQXFFO0lBQ3JFLGdJQUFnSTtJQUNoSSxtQ0FBbUM7SUFFbkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDakMsMEJBQTBCO0lBQzFCLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMxQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUvRCxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQUM7UUFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssZ0JBQWdCLENBQUM7WUFDekQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUVSLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxnQ0FBZ0M7UUFDM0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNsQixLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsNEVBQTRFO29CQUM1RSxTQUFTLFFBQVEsQ0FBQSxDQUFDLGdDQUFnQztpQkFDbkQ7YUFDRjtZQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDdEI7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=