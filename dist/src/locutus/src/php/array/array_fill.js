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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZmlsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9maWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxRQUFRO0lBQzdELGtEQUFrRDtJQUNsRCxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELDBDQUEwQztJQUMxQyxpR0FBaUc7SUFFakcsSUFBSSxHQUFHLENBQUE7SUFDUCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzlCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtTQUN0QztLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==