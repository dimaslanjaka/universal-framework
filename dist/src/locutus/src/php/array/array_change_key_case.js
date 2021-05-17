module.exports = function array_change_key_case(array, cs) {
    //  discuss at: https://locutus.io/php/array_change_key_case/
    // original by: Ates Goral (https://magnetiq.com)
    // improved by: marrtins
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_change_key_case(42)
    //   returns 1: false
    //   example 2: array_change_key_case([ 3, 5 ])
    //   returns 2: [3, 5]
    //   example 3: array_change_key_case({ FuBaR: 42 })
    //   returns 3: {"fubar": 42}
    //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER')
    //   returns 4: {"fubar": 42}
    //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER')
    //   returns 5: {"FUBAR": 42}
    //   example 6: array_change_key_case({ FuBaR: 42 }, 2)
    //   returns 6: {"FUBAR": 42}
    var caseFnc;
    var key;
    var tmpArr = {};
    if (Object.prototype.toString.call(array) === '[object Array]') {
        return array;
    }
    if (array && typeof array === 'object') {
        caseFnc = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';
        for (key in array) {
            tmpArr[key[caseFnc]()] = array[key];
        }
        return tmpArr;
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfY2hhbmdlX2tleV9jYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2NoYW5nZV9rZXlfY2FzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMscUJBQXFCLENBQUUsS0FBSyxFQUFFLEVBQUU7SUFDeEQsNkRBQTZEO0lBQzdELGlEQUFpRDtJQUNqRCx3QkFBd0I7SUFDeEIsb0RBQW9EO0lBQ3BELHlDQUF5QztJQUN6QyxxQkFBcUI7SUFDckIsK0NBQStDO0lBQy9DLHNCQUFzQjtJQUN0QixvREFBb0Q7SUFDcEQsNkJBQTZCO0lBQzdCLGtFQUFrRTtJQUNsRSw2QkFBNkI7SUFDN0Isa0VBQWtFO0lBQ2xFLDZCQUE2QjtJQUM3Qix1REFBdUQ7SUFDdkQsNkJBQTZCO0lBRTdCLElBQUksT0FBTyxDQUFBO0lBQ1gsSUFBSSxHQUFHLENBQUE7SUFDUCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFZixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtRQUM5RCxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3RDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUE7UUFDdEUsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNwQztRQUNELE9BQU8sTUFBTSxDQUFBO0tBQ2Q7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9