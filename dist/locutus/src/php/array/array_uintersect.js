module.exports = function array_uintersect(arr1) {
    //  discuss at: https://locutus.io/php/array_uintersect/
    // original by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Demosthenes Koptsis
    //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
    //   example 1: array_uintersect($array1, $array2, function( f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
    //   returns 1: {a: 'green', b: 'brown', 0: 'red'}
    var retArr = {};
    var arglm1 = arguments.length - 1;
    var arglm2 = arglm1 - 1;
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
        arrs: for (i = 1; i < arglm1; i++) { // eslint-disable-line no-labels
            arr = arguments[i];
            for (k in arr) {
                if (cb(arr[k], arr1[k1]) === 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdWludGVyc2VjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV91aW50ZXJzZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBRSxJQUFJO0lBQzlDLHdEQUF3RDtJQUN4RCxvREFBb0Q7SUFDcEQsbUNBQW1DO0lBQ25DLDJFQUEyRTtJQUMzRSw2RUFBNkU7SUFDN0UsMlBBQTJQO0lBQzNQLGtEQUFrRDtJQUVsRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUNqQyxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMxQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUvRCxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQUM7UUFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssZ0JBQWdCLENBQUM7WUFDekQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUVSLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxnQ0FBZ0M7UUFDM0QsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsZ0NBQWdDO1lBQ25FLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNiLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxLQUFLLE1BQU0sRUFBRTt3QkFDaEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtxQkFDdEI7b0JBQ0Qsc0VBQXNFO29CQUN0RSwrQkFBK0I7b0JBQy9CLFNBQVMsSUFBSSxDQUFBLENBQUMsZ0NBQWdDO2lCQUMvQzthQUNGO1lBQ0QsK0VBQStFO1lBQy9FLFNBQVMsUUFBUSxDQUFBLENBQUMsZ0NBQWdDO1NBQ25EO0tBQ0Y7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9