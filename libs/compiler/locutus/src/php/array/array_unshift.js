module.exports = function array_unshift(array) {
    //  discuss at: https://locutus.io/php/array_unshift/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Martijn Wieringa
    // improved by: jmweb
    //      note 1: Currently does not handle objects
    //   example 1: array_unshift(['van', 'Zonneveld'], 'Kevin')
    //   returns 1: 3
    var i = arguments.length;
    while (--i !== 0) {
        arguments[0].unshift(arguments[i]);
    }
    return arguments[0].length;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdW5zaGlmdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfdW5zaGlmdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsYUFBYSxDQUFFLEtBQUs7SUFDNUMscURBQXFEO0lBQ3JELG9EQUFvRDtJQUNwRCxnQ0FBZ0M7SUFDaEMscUJBQXFCO0lBQ3JCLGlEQUFpRDtJQUNqRCw0REFBNEQ7SUFDNUQsaUJBQWlCO0lBRWpCLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFFeEIsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNuQztJQUVELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtBQUM1QixDQUFDLENBQUEifQ==