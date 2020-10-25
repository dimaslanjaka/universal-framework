module.exports = function array_intersect(arr1) {
    //  discuss at: https://locutus.io/php/array_intersect/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: These only output associative arrays (would need to be
    //      note 1: all numeric and counting from zero to be numeric)
    //   example 1: var $array1 = {'a' : 'green', 0:'red', 1: 'blue'}
    //   example 1: var $array2 = {'b' : 'green', 0:'yellow', 1:'red'}
    //   example 1: var $array3 = ['green', 'red']
    //   example 1: var $result = array_intersect($array1, $array2, $array3)
    //   returns 1: {0: 'red', a: 'green'}
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
                if (arr[k] === arr1[k1]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfaW50ZXJzZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2ludGVyc2VjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLElBQUk7SUFDN0MsdURBQXVEO0lBQ3ZELG9EQUFvRDtJQUNwRCxzRUFBc0U7SUFDdEUsaUVBQWlFO0lBQ2pFLGlFQUFpRTtJQUNqRSxrRUFBa0U7SUFDbEUsOENBQThDO0lBQzlDLHdFQUF3RTtJQUN4RSxzQ0FBc0M7SUFFdEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtJQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNYLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUVWLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxnQ0FBZ0M7UUFDM0QsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsZ0NBQWdDO1lBQ2pFLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO3FCQUN0QjtvQkFDRCxzRUFBc0U7b0JBQ3RFLCtCQUErQjtvQkFDL0IsU0FBUyxJQUFJLENBQUEsQ0FBQSxnQ0FBZ0M7aUJBQzlDO2FBQ0Y7WUFDRCwrRUFBK0U7WUFDL0UsU0FBUyxRQUFRLENBQUEsQ0FBQSxnQ0FBZ0M7U0FDbEQ7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=