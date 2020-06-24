module.exports = function array_diff_key(arr1) {
    //  discuss at: https://locutus.io/php/array_diff_key/
    // original by: Ates Goral (https://magnetiq.com)
    //  revised by: Brett Zamir (https://brett-zamir.me)
    //    input by: Everlasto
    //   example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5})
    //   returns 1: {"green":2, "blue":3, "white":4}
    //   example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5})
    //   returns 2: {"green":2, "blue":3, "white":4}
    var argl = arguments.length;
    var retArr = {};
    var k1 = '';
    var i = 1;
    var k = '';
    var arr = {};
    arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
        for (i = 1; i < argl; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (k === k1) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys; // eslint-disable-line no-labels
                }
            }
            retArr[k1] = arr1[k1];
        }
    }
    return retArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZGlmZl9rZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2RpZmZfa2V5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxjQUFjLENBQUUsSUFBSTtJQUM1QyxzREFBc0Q7SUFDdEQsaURBQWlEO0lBQ2pELG9EQUFvRDtJQUNwRCx5QkFBeUI7SUFDekIsK0VBQStFO0lBQy9FLGdEQUFnRDtJQUNoRCx5RkFBeUY7SUFDekYsZ0RBQWdEO0lBRWhELElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLGdDQUFnQztRQUMzRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDYixJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ1osNEVBQTRFO29CQUM1RSxTQUFTLFFBQVEsQ0FBQSxDQUFDLGdDQUFnQztpQkFDbkQ7YUFDRjtZQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDdEI7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=