module.exports = function array_diff(arr1) {
    //  discuss at: https://locutus.io/php/array_diff/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Sanjoy Roy
    //  revised by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld'])
    //   returns 1: {0:'Kevin'}
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
                if (arr[k] === arr1[k1]) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys; // eslint-disable-line no-labels
                }
            }
            retArr[k1] = arr1[k1];
        }
    }
    return retArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZGlmZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9kaWZmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsSUFBSTtJQUN4QyxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELDBCQUEwQjtJQUMxQixvREFBb0Q7SUFDcEQsK0VBQStFO0lBQy9FLDJCQUEyQjtJQUUzQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFBO0lBQzNCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxnQ0FBZ0M7UUFDM0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekIsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNsQixLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUN2Qiw0RUFBNEU7b0JBQzVFLFNBQVMsUUFBUSxDQUFBLENBQUMsZ0NBQWdDO2lCQUNuRDthQUNGO1lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUN0QjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==