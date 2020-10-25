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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfaW50ZXJzZWN0X2tleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9pbnRlcnNlY3Rfa2V5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxtQkFBbUIsQ0FBRSxJQUFJO0lBQ2pELDJEQUEyRDtJQUMzRCxvREFBb0Q7SUFDcEQsc0VBQXNFO0lBQ3RFLGlFQUFpRTtJQUNqRSwyRUFBMkU7SUFDM0UsaUVBQWlFO0lBQ2pFLHFEQUFxRDtJQUNyRCxzQ0FBc0M7SUFFdEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtJQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNYLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUVWLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxnQ0FBZ0M7UUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDNUIsU0FBUTtTQUNUO1FBQ0QsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsZ0NBQWdDO1lBQ2pFLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMxQixTQUFRO2lCQUNUO2dCQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDWixJQUFJLENBQUMsS0FBSyxNQUFNLEVBQUU7d0JBQ2hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7cUJBQ3RCO29CQUNELHNFQUFzRTtvQkFDdEUsK0JBQStCO29CQUMvQixTQUFTLElBQUksQ0FBQSxDQUFDLGdDQUFnQztpQkFDL0M7YUFDRjtZQUNELCtFQUErRTtZQUMvRSxTQUFTLFFBQVEsQ0FBQSxDQUFDLGdDQUFnQztTQUNuRDtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==