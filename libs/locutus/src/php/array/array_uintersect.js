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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdWludGVyc2VjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfdWludGVyc2VjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZ0JBQWdCLENBQUUsSUFBSTtJQUM5Qyx3REFBd0Q7SUFDeEQsb0RBQW9EO0lBQ3BELG1DQUFtQztJQUNuQywyRUFBMkU7SUFDM0UsNkVBQTZFO0lBQzdFLDJQQUEyUDtJQUMzUCxrREFBa0Q7SUFFbEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDakMsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUN2QixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRVYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFL0QsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO1lBQ3pELENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFUixRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsZ0NBQWdDO1FBQzNELElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGdDQUFnQztZQUNuRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDYixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUM5QixJQUFJLENBQUMsS0FBSyxNQUFNLEVBQUU7d0JBQ2hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7cUJBQ3RCO29CQUNELHNFQUFzRTtvQkFDdEUsK0JBQStCO29CQUMvQixTQUFTLElBQUksQ0FBQSxDQUFDLGdDQUFnQztpQkFDL0M7YUFDRjtZQUNELCtFQUErRTtZQUMvRSxTQUFTLFFBQVEsQ0FBQSxDQUFDLGdDQUFnQztTQUNuRDtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==