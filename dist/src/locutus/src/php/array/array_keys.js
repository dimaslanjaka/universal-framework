module.exports = function array_keys(input, searchValue, argStrict) {
    //  discuss at: https://locutus.io/php/array_keys/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //    input by: P
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // improved by: jd
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} )
    //   returns 1: [ 'firstname', 'surname' ]
    var search = typeof searchValue !== 'undefined';
    var tmpArr = [];
    var strict = !!argStrict;
    var include = true;
    var key = '';
    for (key in input) {
        if (input.hasOwnProperty(key)) {
            include = true;
            if (search) {
                if (strict && input[key] !== searchValue) {
                    include = false;
                }
                else if (input[key] !== searchValue) {
                    include = false;
                }
            }
            if (include) {
                tmpArr[tmpArr.length] = key;
            }
        }
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfa2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9rZXlzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxTQUFTO0lBQ2pFLGtEQUFrRDtJQUNsRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELGlCQUFpQjtJQUNqQixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELGtCQUFrQjtJQUNsQixvREFBb0Q7SUFDcEQsNEVBQTRFO0lBQzVFLDBDQUEwQztJQUUxQyxJQUFJLE1BQU0sR0FBRyxPQUFPLFdBQVcsS0FBSyxXQUFXLENBQUE7SUFDL0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtJQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUE7SUFDbEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO1FBQ2pCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QixPQUFPLEdBQUcsSUFBSSxDQUFBO1lBQ2QsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFdBQVcsRUFBRTtvQkFDeEMsT0FBTyxHQUFHLEtBQUssQ0FBQTtpQkFDaEI7cUJBQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxFQUFFO29CQUNyQyxPQUFPLEdBQUcsS0FBSyxDQUFBO2lCQUNoQjthQUNGO1lBRUQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUE7YUFDNUI7U0FDRjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==