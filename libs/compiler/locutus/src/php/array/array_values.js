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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV92YWx1ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxLQUFLO0lBQzNDLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDhFQUE4RTtJQUM5RSw0Q0FBNEM7SUFFNUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO1FBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ25DO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==