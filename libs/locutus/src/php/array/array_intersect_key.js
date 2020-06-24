module.exports = function array_intersect_key(arr1) {
    //  discuss at: https://locutus.io/php/array_intersect_key/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: These only output associative arrays (would need to be
    //      note 1: all numeric and counting from zero to be numeric)
    //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    //   example 1: var $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
    //   example 1: array_intersect_key($array1, $array2)
    //   returns 1: {0: 'red', a: 'green'}
    var retArr = {};
    var argl = arguments.length;
    var arglm1 = argl - 1;
    var k1 = '';
    var arr = {};
    var i = 0;
    var k = '';
    arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
        if (!arr1.hasOwnProperty(k1)) {
            continue;
        }
        arrs: for (i = 1; i < argl; i++) { // eslint-disable-line no-labels
            arr = arguments[i];
            for (k in arr) {
                if (!arr.hasOwnProperty(k)) {
                    continue;
                }
                if (k === k1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfaW50ZXJzZWN0X2tleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfaW50ZXJzZWN0X2tleS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsbUJBQW1CLENBQUUsSUFBSTtJQUNqRCwyREFBMkQ7SUFDM0Qsb0RBQW9EO0lBQ3BELHNFQUFzRTtJQUN0RSxpRUFBaUU7SUFDakUsMkVBQTJFO0lBQzNFLGlFQUFpRTtJQUNqRSxxREFBcUQ7SUFDckQsc0NBQXNDO0lBRXRDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsZ0NBQWdDO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzVCLFNBQVE7U0FDVDtRQUNELElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGdDQUFnQztZQUNqRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDYixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDMUIsU0FBUTtpQkFDVDtnQkFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ1osSUFBSSxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO3FCQUN0QjtvQkFDRCxzRUFBc0U7b0JBQ3RFLCtCQUErQjtvQkFDL0IsU0FBUyxJQUFJLENBQUEsQ0FBQyxnQ0FBZ0M7aUJBQy9DO2FBQ0Y7WUFDRCwrRUFBK0U7WUFDL0UsU0FBUyxRQUFRLENBQUEsQ0FBQyxnQ0FBZ0M7U0FDbkQ7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=