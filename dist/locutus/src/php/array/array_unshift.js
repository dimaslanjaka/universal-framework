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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdW5zaGlmdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV91bnNoaWZ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUUsS0FBSztJQUM1QyxxREFBcUQ7SUFDckQsb0RBQW9EO0lBQ3BELGdDQUFnQztJQUNoQyxxQkFBcUI7SUFDckIsaURBQWlEO0lBQ2pELDREQUE0RDtJQUM1RCxpQkFBaUI7SUFFakIsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtJQUV4QixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNoQixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25DO0lBRUQsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQzVCLENBQUMsQ0FBQSJ9