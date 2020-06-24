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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZGlmZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfZGlmZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLElBQUk7SUFDeEMsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCwwQkFBMEI7SUFDMUIsb0RBQW9EO0lBQ3BELCtFQUErRTtJQUMvRSwyQkFBMkI7SUFFM0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtJQUMzQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsZ0NBQWdDO1FBQzNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pCLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDdkIsNEVBQTRFO29CQUM1RSxTQUFTLFFBQVEsQ0FBQSxDQUFDLGdDQUFnQztpQkFDbkQ7YUFDRjtZQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDdEI7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=