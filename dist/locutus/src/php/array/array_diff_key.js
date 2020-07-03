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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZGlmZl9rZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfZGlmZl9rZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxJQUFJO0lBQzVDLHNEQUFzRDtJQUN0RCxpREFBaUQ7SUFDakQsb0RBQW9EO0lBQ3BELHlCQUF5QjtJQUN6QiwrRUFBK0U7SUFDL0UsZ0RBQWdEO0lBQ2hELHlGQUF5RjtJQUN6RixnREFBZ0Q7SUFFaEQsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtJQUMzQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsZ0NBQWdDO1FBQzNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pCLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDWiw0RUFBNEU7b0JBQzVFLFNBQVMsUUFBUSxDQUFBLENBQUMsZ0NBQWdDO2lCQUNuRDthQUNGO1lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUN0QjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==