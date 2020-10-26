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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3BocF9jYXN0X2Zsb2F0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL19oZWxwZXJzL19waHBfY2FzdF9mbG9hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLEtBQUs7SUFDOUMsOEJBQThCO0lBQzlCLHNDQUFzQztJQUN0QyxpQkFBaUI7SUFDakIscUNBQXFDO0lBQ3JDLGlCQUFpQjtJQUNqQixrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLGtDQUFrQztJQUNsQyxpQkFBaUI7SUFDakIscUNBQXFDO0lBQ3JDLG9CQUFvQjtJQUNwQixtQ0FBbUM7SUFDbkMsaUJBQWlCO0lBQ2pCLG9DQUFvQztJQUNwQyxpQkFBaUI7SUFDakIsc0NBQXNDO0lBQ3RDLGlCQUFpQjtJQUNqQixxQ0FBcUM7SUFDckMsaUJBQWlCO0lBQ2pCLDBDQUEwQztJQUMxQyxpQkFBaUI7SUFDakIseUNBQXlDO0lBQ3pDLG1CQUFtQjtJQUNuQix3Q0FBd0M7SUFDeEMsdUJBQXVCO0lBQ3ZCLDRDQUE0QztJQUM1QywwQkFBMEI7SUFDMUIsMENBQTBDO0lBQzFDLG9CQUFvQjtJQUVwQixJQUFJLElBQUksR0FBRyxPQUFPLEtBQUssQ0FBQTtJQUV2QixRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssUUFBUTtZQUNYLE9BQU8sS0FBSyxDQUFBO1FBQ2QsS0FBSyxRQUFRO1lBQ1gsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQy9CLEtBQUssU0FBUyxDQUFDO1FBQ2IsZUFBZTtRQUNqQjtZQUNFLG1EQUFtRDtZQUNuRCx5Q0FBeUM7WUFDekMsT0FBTyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUMzQztBQUNILENBQUMsQ0FBQSJ9