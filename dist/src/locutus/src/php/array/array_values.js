module.exports = function array_values(input) {
    //  discuss at: https://locutus.io/php/array_values/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} )
    //   returns 1: [ 'Kevin', 'van Zonneveld' ]
    var tmpArr = [];
    var key = '';
    for (key in input) {
        tmpArr[tmpArr.length] = input[key];
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3ZhbHVlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLEtBQUs7SUFDM0Msb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsOEVBQThFO0lBQzlFLDRDQUE0QztJQUU1QyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDbkM7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9