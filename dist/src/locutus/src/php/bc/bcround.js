module.exports = function bcround(val, precision) {
    //  discuss at: https://locutus.io/php/bcround/
    // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
    //   example 1: bcround(1, 2)
    //   returns 1: '1.00'
    var _bc = require('../_helpers/_bc');
    var libbcmath = _bc();
    var temp, result, digit;
    var rightOperand;
    // create number
    temp = libbcmath.bc_init_num();
    temp = libbcmath.php_str2num(val.toString());
    // check if any rounding needs
    if (precision >= temp.n_scale) {
        // nothing to round, just add the zeros.
        while (temp.n_scale < precision) {
            temp.n_value[temp.n_len + temp.n_scale] = 0;
            temp.n_scale++;
        }
        return temp.toString();
    }
    // get the digit we are checking (1 after the precision)
    // loop through digits after the precision marker
    digit = temp.n_value[temp.n_len + precision];
    rightOperand = libbcmath.bc_init_num();
    rightOperand = libbcmath.bc_new_num(1, precision);
    if (digit >= 5) {
        // round away from zero by adding 1 (or -1) at the "precision"..
        // ie 1.44999 @ 3dp = (1.44999 + 0.001).toString().substr(0,5)
        rightOperand.n_value[rightOperand.n_len + rightOperand.n_scale - 1] = 1;
        if (temp.n_sign === libbcmath.MINUS) {
            // round down
            rightOperand.n_sign = libbcmath.MINUS;
        }
        result = libbcmath.bc_add(temp, rightOperand, precision);
    }
    else {
        // leave-as-is.. just truncate it.
        result = temp;
    }
    if (result.n_scale > precision) {
        result.n_scale = precision;
    }
    return result.toString();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNyb3VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9iYy9iY3JvdW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsR0FBRyxFQUFFLFNBQVM7SUFDL0MsK0NBQStDO0lBQy9DLHNFQUFzRTtJQUN0RSw2QkFBNkI7SUFDN0Isc0JBQXNCO0lBRXRCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3BDLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRXJCLElBQUksSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUE7SUFDdkIsSUFBSSxZQUFZLENBQUE7SUFFaEIsZ0JBQWdCO0lBQ2hCLElBQUksR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDOUIsSUFBSSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFFNUMsOEJBQThCO0lBQzlCLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDN0Isd0NBQXdDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtLQUN2QjtJQUVELHdEQUF3RDtJQUN4RCxpREFBaUQ7SUFDakQsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQTtJQUU1QyxZQUFZLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3RDLFlBQVksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUVqRCxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDZCxnRUFBZ0U7UUFDaEUsOERBQThEO1FBQzlELFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2RSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLEtBQUssRUFBRTtZQUNuQyxhQUFhO1lBQ2IsWUFBWSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFBO1NBQ3RDO1FBQ0QsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQTtLQUN6RDtTQUFNO1FBQ0wsa0NBQWtDO1FBQ2xDLE1BQU0sR0FBRyxJQUFJLENBQUE7S0FDZDtJQUVELElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEVBQUU7UUFDOUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUE7S0FDM0I7SUFFRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==