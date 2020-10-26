module.exports = function _php_cast_int(value) {
    // original by: Rafał Kukawski
    //   example 1: _php_cast_int(false)
    //   returns 1: 0
    //   example 2: _php_cast_int(true)
    //   returns 2: 1
    //   example 3: _php_cast_int(0)
    //   returns 3: 0
    //   example 4: _php_cast_int(1)
    //   returns 4: 1
    //   example 5: _php_cast_int(3.14)
    //   returns 5: 3
    //   example 6: _php_cast_int('')
    //   returns 6: 0
    //   example 7: _php_cast_int('0')
    //   returns 7: 0
    //   example 8: _php_cast_int('abc')
    //   returns 8: 0
    //   example 9: _php_cast_int(null)
    //   returns 9: 0
    //  example 10: _php_cast_int(undefined)
    //  returns 10: 0
    //  example 11: _php_cast_int('123abc')
    //  returns 11: 123
    //  example 12: _php_cast_int('123e4')
    //  returns 12: 123
    //  example 13: _php_cast_int(0x200000001)
    //  returns 13: 8589934593
    var type = typeof value;
    switch (type) {
        case 'number':
            if (isNaN(value) || !isFinite(value)) {
                // from PHP 7, NaN and Infinity are casted to 0
                return 0;
            }
            return value < 0 ? Math.ceil(value) : Math.floor(value);
        case 'string':
            return parseInt(value, 10) || 0;
        case 'boolean':
        // fall through
        default:
            // Behaviour for types other than float, string, boolean
            // is undefined and can change any time.
            // To not invent complex logic
            // that mimics PHP 7.0 behaviour
            // casting value->bool->number is used
            return +!!value;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3BocF9jYXN0X2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9faGVscGVycy9fcGhwX2Nhc3RfaW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUUsS0FBSztJQUM1Qyw4QkFBOEI7SUFDOUIsb0NBQW9DO0lBQ3BDLGlCQUFpQjtJQUNqQixtQ0FBbUM7SUFDbkMsaUJBQWlCO0lBQ2pCLGdDQUFnQztJQUNoQyxpQkFBaUI7SUFDakIsZ0NBQWdDO0lBQ2hDLGlCQUFpQjtJQUNqQixtQ0FBbUM7SUFDbkMsaUJBQWlCO0lBQ2pCLGlDQUFpQztJQUNqQyxpQkFBaUI7SUFDakIsa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQixvQ0FBb0M7SUFDcEMsaUJBQWlCO0lBQ2pCLG1DQUFtQztJQUNuQyxpQkFBaUI7SUFDakIsd0NBQXdDO0lBQ3hDLGlCQUFpQjtJQUNqQix1Q0FBdUM7SUFDdkMsbUJBQW1CO0lBQ25CLHNDQUFzQztJQUN0QyxtQkFBbUI7SUFDbkIsMENBQTBDO0lBQzFDLDBCQUEwQjtJQUUxQixJQUFJLElBQUksR0FBRyxPQUFPLEtBQUssQ0FBQTtJQUV2QixRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssUUFBUTtZQUNYLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwQywrQ0FBK0M7Z0JBQy9DLE9BQU8sQ0FBQyxDQUFBO2FBQ1Q7WUFFRCxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDekQsS0FBSyxRQUFRO1lBQ1gsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQyxLQUFLLFNBQVMsQ0FBQztRQUNiLGVBQWU7UUFDakI7WUFDRSx3REFBd0Q7WUFDeEQsd0NBQXdDO1lBQ3hDLDhCQUE4QjtZQUM5QixnQ0FBZ0M7WUFDaEMsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0tBQ2xCO0FBQ0gsQ0FBQyxDQUFBIn0=