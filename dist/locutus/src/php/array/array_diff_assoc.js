module.exports = function array_diff_assoc(arr1) {
    //  discuss at: https://locutus.io/php/array_diff_assoc/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: 0m3r
    //  revised by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'})
    //   returns 1: {1: 'van', 2: 'Zonneveld'}
    var retArr = {};
    var argl = arguments.length;
    var k1 = '';
    var i = 1;
    var k = '';
    var arr = {};
    arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
        for (i = 1; i < argl; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1] && k === k1) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys; // eslint-disable-line no-labels
                }
            }
            retArr[k1] = arr1[k1];
        }
    }
    return retArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZGlmZl9hc3NvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9kaWZmX2Fzc29jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBRSxJQUFJO0lBQzlDLHdEQUF3RDtJQUN4RCxvREFBb0Q7SUFDcEQsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCxnSEFBZ0g7SUFDaEgsMENBQTBDO0lBRTFDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLGdDQUFnQztRQUMzRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDYixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDbkMsNEVBQTRFO29CQUM1RSxTQUFTLFFBQVEsQ0FBQSxDQUFDLGdDQUFnQztpQkFDbkQ7YUFDRjtZQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDdEI7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=