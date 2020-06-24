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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfaW50ZXJzZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9pbnRlcnNlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGVBQWUsQ0FBRSxJQUFJO0lBQzdDLHVEQUF1RDtJQUN2RCxvREFBb0Q7SUFDcEQsc0VBQXNFO0lBQ3RFLGlFQUFpRTtJQUNqRSxpRUFBaUU7SUFDakUsa0VBQWtFO0lBQ2xFLDhDQUE4QztJQUM5Qyx3RUFBd0U7SUFDeEUsc0NBQXNDO0lBRXRDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsZ0NBQWdDO1FBQzNELElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGdDQUFnQztZQUNqRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDYixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxLQUFLLE1BQU0sRUFBRTt3QkFDaEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtxQkFDdEI7b0JBQ0Qsc0VBQXNFO29CQUN0RSwrQkFBK0I7b0JBQy9CLFNBQVMsSUFBSSxDQUFBLENBQUEsZ0NBQWdDO2lCQUM5QzthQUNGO1lBQ0QsK0VBQStFO1lBQy9FLFNBQVMsUUFBUSxDQUFBLENBQUEsZ0NBQWdDO1NBQ2xEO0tBQ0Y7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9