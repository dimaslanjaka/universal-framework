module.exports = function _php_cast_float(value) {
    // original by: Rafał Kukawski
    //   example 1: _php_cast_float(false)
    //   returns 1: 0
    //   example 2: _php_cast_float(true)
    //   returns 2: 1
    //   example 3: _php_cast_float(0)
    //   returns 3: 0
    //   example 4: _php_cast_float(1)
    //   returns 4: 1
    //   example 5: _php_cast_float(3.14)
    //   returns 5: 3.14
    //   example 6: _php_cast_float('')
    //   returns 6: 0
    //   example 7: _php_cast_float('0')
    //   returns 7: 0
    //   example 8: _php_cast_float('abc')
    //   returns 8: 0
    //   example 9: _php_cast_float(null)
    //   returns 9: 0
    //  example 10: _php_cast_float(undefined)
    //  returns 10: 0
    //  example 11: _php_cast_float('123abc')
    //  returns 11: 123
    //  example 12: _php_cast_float('123e4')
    //  returns 12: 1230000
    //  example 13: _php_cast_float(0x200000001)
    //  returns 13: 8589934593
    //  example 14: _php_cast_float('3.14abc')
    //  returns 14: 3.14
    var type = typeof value;
    switch (type) {
        case 'number':
            return value;
        case 'string':
            return parseFloat(value) || 0;
        case 'boolean':
        // fall through
        default:
            // PHP docs state, that for types other than string
            // conversion is {input type}->int->float
            return require('./_php_cast_int')(value);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3BocF9jYXN0X2Zsb2F0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9faGVscGVycy9fcGhwX2Nhc3RfZmxvYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGVBQWUsQ0FBRSxLQUFLO0lBQzlDLDhCQUE4QjtJQUM5QixzQ0FBc0M7SUFDdEMsaUJBQWlCO0lBQ2pCLHFDQUFxQztJQUNyQyxpQkFBaUI7SUFDakIsa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQixrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLHFDQUFxQztJQUNyQyxvQkFBb0I7SUFDcEIsbUNBQW1DO0lBQ25DLGlCQUFpQjtJQUNqQixvQ0FBb0M7SUFDcEMsaUJBQWlCO0lBQ2pCLHNDQUFzQztJQUN0QyxpQkFBaUI7SUFDakIscUNBQXFDO0lBQ3JDLGlCQUFpQjtJQUNqQiwwQ0FBMEM7SUFDMUMsaUJBQWlCO0lBQ2pCLHlDQUF5QztJQUN6QyxtQkFBbUI7SUFDbkIsd0NBQXdDO0lBQ3hDLHVCQUF1QjtJQUN2Qiw0Q0FBNEM7SUFDNUMsMEJBQTBCO0lBQzFCLDBDQUEwQztJQUMxQyxvQkFBb0I7SUFFcEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxLQUFLLENBQUE7SUFFdkIsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLFFBQVE7WUFDWCxPQUFPLEtBQUssQ0FBQTtRQUNkLEtBQUssUUFBUTtZQUNYLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQixLQUFLLFNBQVMsQ0FBQztRQUNiLGVBQWU7UUFDakI7WUFDRSxtREFBbUQ7WUFDbkQseUNBQXlDO1lBQ3pDLE9BQU8sT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDM0M7QUFDSCxDQUFDLENBQUEifQ==