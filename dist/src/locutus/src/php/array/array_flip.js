module.exports = function array_flip(trans) {
    //  discuss at: https://locutus.io/php/array_flip/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Pier Paolo Ramon (https://www.mastersoup.com/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_flip( {a: 1, b: 1, c: 2} )
    //   returns 1: {1: 'b', 2: 'c'}
    var key;
    var tmpArr = {};
    for (key in trans) {
        if (!trans.hasOwnProperty(key)) {
            continue;
        }
        tmpArr[trans[key]] = key;
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZmxpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9mbGlwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsS0FBSztJQUN6QyxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsZ0RBQWdEO0lBQ2hELGdDQUFnQztJQUVoQyxJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUVmLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QixTQUFRO1NBQ1Q7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0tBQ3pCO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==