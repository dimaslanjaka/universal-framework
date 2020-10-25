module.exports = function array_uintersect_uassoc(arr1) {
    //  discuss at: https://locutus.io/php/array_uintersect_uassoc/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
    //   example 1: array_uintersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
    //   returns 1: {a: 'green', b: 'brown'}
    var retArr = {};
    var arglm1 = arguments.length - 1;
    var arglm2 = arglm1 - 1;
    var cb = arguments[arglm1];
    var cb0 = arguments[arglm2];
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
    cb0 = (typeof cb0 === 'string')
        ? $global[cb0]
        : (Object.prototype.toString.call(cb0) === '[object Array]')
            ? $global[cb0[0]][cb0[1]]
            : cb0;
    arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
        arrs: for (i = 1; i < arglm2; i++) { // eslint-disable-line no-labels
            arr = arguments[i];
            for (k in arr) {
                if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
                    if (i === arguments.length - 3) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdWludGVyc2VjdF91YXNzb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfdWludGVyc2VjdF91YXNzb2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLHVCQUF1QixDQUFFLElBQUk7SUFDckQsK0RBQStEO0lBQy9ELG9EQUFvRDtJQUNwRCwyRUFBMkU7SUFDM0UsNkVBQTZFO0lBQzdFLDJjQUEyYztJQUMzYyx3Q0FBd0M7SUFFeEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDakMsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUN2QixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzNCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRS9ELEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQztRQUMzQixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQztZQUN6RCxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsRUFBRSxDQUFBO0lBRVIsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO1lBQzFELENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxHQUFHLENBQUE7SUFFVCxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsZ0NBQWdDO1FBQzNELElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGdDQUFnQztZQUNuRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDYixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNsRCxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDOUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtxQkFDdEI7b0JBQ0Qsc0VBQXNFO29CQUN0RSwrQkFBK0I7b0JBQy9CLFNBQVMsSUFBSSxDQUFBLENBQUMsZ0NBQWdDO2lCQUMvQzthQUNGO1lBQ0QsK0VBQStFO1lBQy9FLFNBQVMsUUFBUSxDQUFBLENBQUMsZ0NBQWdDO1NBQ25EO0tBQ0Y7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9