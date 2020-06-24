module.exports = function array_fill(startIndex, num, mixedVal) {
    //  discuss at: https://locutus.io/php/array_fill/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Waldo Malqui Silva (https://waldo.malqui.info)
    //   example 1: array_fill(5, 6, 'banana')
    //   returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }
    var key;
    var tmpArr = {};
    if (!isNaN(startIndex) && !isNaN(num)) {
        for (key = 0; key < num; key++) {
            tmpArr[(key + startIndex)] = mixedVal;
        }
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZmlsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfZmlsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUTtJQUM3RCxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCwwQ0FBMEM7SUFDMUMsaUdBQWlHO0lBRWpHLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBRWYsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNyQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM5QixNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7U0FDdEM7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=