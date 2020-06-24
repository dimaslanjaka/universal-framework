module.exports = function array_intersect_ukey(arr1) {
    //  discuss at: https://locutus.io/php/array_intersect_ukey/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    //   example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
    //   returns 1: {blue: 1, green: 3}
    var retArr = {};
    var arglm1 = arguments.length - 1;
    var arglm2 = arglm1 - 1;
    var cb = arguments[arglm1];
    // var cb0 = arguments[arglm2]
    var k1 = '';
    var i = 1;
    var k = '';
    var arr = {};
    var $global = (typeof window !== 'undefined' ? window : global);
    cb = (typeof cb === 'string')
        ? $global[cb]
        : (Object.prototype.toString.call(cb) === '[object Array]')
            ? $global[cb[0]][cb[1]]
            : cb;
    // cb0 = (typeof cb0 === 'string')
    //   ? $global[cb0]
    //   : (Object.prototype.toString.call(cb0) === '[object Array]')
    //     ? $global[cb0[0]][cb0[1]]
    //     : cb0
    arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
        arrs: for (i = 1; i < arglm1; i++) { // eslint-disable-line no-labels
            arr = arguments[i];
            for (k in arr) {
                if (cb(k, k1) === 0) {
                    if (i === arglm2) {
                        retArr[k1] = arr1[k1];
                    }
                    // If the innermost loop always leads at least once to an equal value,
                    // continue the loop until done
                    continue arrs; // eslint-disable-line no-labels
                }
            }
            // If it reaches here, it wasn't found in at least one array, so try next value
            continue arr1keys; // eslint-disable-line no-labels
        }
    }
    return retArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfaW50ZXJzZWN0X3VrZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2ludGVyc2VjdF91a2V5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxvQkFBb0IsQ0FBRSxJQUFJO0lBQ2xELDREQUE0RDtJQUM1RCxvREFBb0Q7SUFDcEQsb0VBQW9FO0lBQ3BFLHFFQUFxRTtJQUNyRSxzSUFBc0k7SUFDdEksbUNBQW1DO0lBRW5DLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQ2pDLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDdkIsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzFCLDhCQUE4QjtJQUM5QixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUvRCxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQUM7UUFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssZ0JBQWdCLENBQUM7WUFDekQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUVSLGtDQUFrQztJQUNsQyxtQkFBbUI7SUFDbkIsaUVBQWlFO0lBQ2pFLGdDQUFnQztJQUNoQyxZQUFZO0lBRVosUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLGdDQUFnQztRQUMzRCxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxnQ0FBZ0M7WUFDbkUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNsQixLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO3FCQUN0QjtvQkFDRCxzRUFBc0U7b0JBQ3RFLCtCQUErQjtvQkFDL0IsU0FBUyxJQUFJLENBQUEsQ0FBQyxnQ0FBZ0M7aUJBQy9DO2FBQ0Y7WUFDRCwrRUFBK0U7WUFDL0UsU0FBUyxRQUFRLENBQUEsQ0FBQyxnQ0FBZ0M7U0FDbkQ7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=