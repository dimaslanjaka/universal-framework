module.exports = function array_sum(array) {
    //  discuss at: https://locutus.io/php/array_sum/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Nate
    // bugfixed by: Gilbert
    // improved by: David Pilia (https://www.beteck.it/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_sum([4, 9, 182.6])
    //   returns 1: 195.6
    //   example 2: var $total = []
    //   example 2: var $index = 0.1
    //   example 2: for (var $y = 0; $y < 12; $y++){ $total[$y] = $y + $index }
    //   example 2: array_sum($total)
    //   returns 2: 67.2
    var key;
    var sum = 0;
    // input sanitation
    if (typeof array !== 'object') {
        return null;
    }
    for (key in array) {
        if (!isNaN(parseFloat(array[key]))) {
            sum += parseFloat(array[key]);
        }
    }
    return sum;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc3VtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3N1bS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLEtBQUs7SUFDeEMsaURBQWlEO0lBQ2pELG9EQUFvRDtJQUNwRCxvQkFBb0I7SUFDcEIsdUJBQXVCO0lBQ3ZCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0NBQXdDO0lBQ3hDLHFCQUFxQjtJQUNyQiwrQkFBK0I7SUFDL0IsZ0NBQWdDO0lBQ2hDLDJFQUEyRTtJQUMzRSxpQ0FBaUM7SUFDakMsb0JBQW9CO0lBRXBCLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBRVgsbUJBQW1CO0lBQ25CLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsQyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQzlCO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUMsQ0FBQSJ9