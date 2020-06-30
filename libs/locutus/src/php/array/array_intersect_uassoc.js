module.exports = function array_intersect_uassoc(arr1) {
    //  discuss at: https://locutus.io/php/array_intersect_uassoc/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
    //   example 1: array_intersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
    //   returns 1: {b: 'brown'}
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
                if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfaW50ZXJzZWN0X3Vhc3NvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfaW50ZXJzZWN0X3Vhc3NvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsc0JBQXNCLENBQUUsSUFBSTtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELDJFQUEyRTtJQUMzRSw2RUFBNkU7SUFDN0UsaVFBQWlRO0lBQ2pRLDRCQUE0QjtJQUU1QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUNqQyxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMxQiw4QkFBOEI7SUFDOUIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFL0QsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO1lBQ3pELENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFUixrQ0FBa0M7SUFDbEMsbUJBQW1CO0lBQ25CLGlFQUFpRTtJQUNqRSxnQ0FBZ0M7SUFDaEMsWUFBWTtJQUVaLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxnQ0FBZ0M7UUFDM0QsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsZ0NBQWdDO1lBQ25FLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO3FCQUN0QjtvQkFDRCxzRUFBc0U7b0JBQ3RFLCtCQUErQjtvQkFDL0IsU0FBUyxJQUFJLENBQUEsQ0FBQyxnQ0FBZ0M7aUJBQy9DO2FBQ0Y7WUFDRCwrRUFBK0U7WUFDL0UsU0FBUyxRQUFRLENBQUEsQ0FBQyxnQ0FBZ0M7U0FDbkQ7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=