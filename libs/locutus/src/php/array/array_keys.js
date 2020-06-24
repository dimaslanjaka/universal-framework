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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfa2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfa2V5cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUztJQUNqRSxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxpQkFBaUI7SUFDakIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxrQkFBa0I7SUFDbEIsb0RBQW9EO0lBQ3BELDRFQUE0RTtJQUM1RSwwQ0FBMEM7SUFFMUMsSUFBSSxNQUFNLEdBQUcsT0FBTyxXQUFXLEtBQUssV0FBVyxDQUFBO0lBQy9DLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUE7SUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRTtRQUNqQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxHQUFHLElBQUksQ0FBQTtZQUNkLElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLEVBQUU7b0JBQ3hDLE9BQU8sR0FBRyxLQUFLLENBQUE7aUJBQ2hCO3FCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFdBQVcsRUFBRTtvQkFDckMsT0FBTyxHQUFHLEtBQUssQ0FBQTtpQkFDaEI7YUFDRjtZQUVELElBQUksT0FBTyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFBO2FBQzVCO1NBQ0Y7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=