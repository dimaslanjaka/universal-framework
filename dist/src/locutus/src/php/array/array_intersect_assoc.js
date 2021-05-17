module.exports = function array_intersect_assoc(arr1) {
    //  discuss at: https://locutus.io/php/array_intersect_assoc/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: These only output associative arrays (would need to be
    //      note 1: all numeric and counting from zero to be numeric)
    //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    //   example 1: var $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
    //   example 1: array_intersect_assoc($array1, $array2)
    //   returns 1: {a: 'green'}
    var retArr = {};
    var argl = arguments.length;
    var arglm1 = argl - 1;
    var k1 = '';
    var arr = {};
    var i = 0;
    var k = '';
    arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
        arrs: for (i = 1; i < argl; i++) { // eslint-disable-line no-labels
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1] && k === k1) {
                    if (i === arglm1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfaW50ZXJzZWN0X2Fzc29jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2ludGVyc2VjdF9hc3NvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMscUJBQXFCLENBQUUsSUFBSTtJQUNuRCw2REFBNkQ7SUFDN0Qsb0RBQW9EO0lBQ3BELHNFQUFzRTtJQUN0RSxpRUFBaUU7SUFDakUsMkVBQTJFO0lBQzNFLGlFQUFpRTtJQUNqRSx1REFBdUQ7SUFDdkQsNEJBQTRCO0lBRTVCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsZ0NBQWdDO1FBQzNELElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGdDQUFnQztZQUNqRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDYixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO3FCQUN0QjtvQkFDRCxzRUFBc0U7b0JBQ3RFLCtCQUErQjtvQkFDL0IsU0FBUyxJQUFJLENBQUEsQ0FBQyxnQ0FBZ0M7aUJBQy9DO2FBQ0Y7WUFDRCwrRUFBK0U7WUFDL0UsU0FBUyxRQUFRLENBQUEsQ0FBQyxnQ0FBZ0M7U0FDbkQ7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=