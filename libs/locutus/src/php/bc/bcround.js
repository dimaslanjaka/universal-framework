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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNyb3VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYmMvYmNyb3VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFFLEdBQUcsRUFBRSxTQUFTO0lBQy9DLCtDQUErQztJQUMvQyxzRUFBc0U7SUFDdEUsNkJBQTZCO0lBQzdCLHNCQUFzQjtJQUV0QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNwQyxJQUFJLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVyQixJQUFJLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFBO0lBQ3ZCLElBQUksWUFBWSxDQUFBO0lBRWhCLGdCQUFnQjtJQUNoQixJQUFJLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzlCLElBQUksR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRTVDLDhCQUE4QjtJQUM5QixJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQzdCLHdDQUF3QztRQUN4QyxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzNDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDdkI7SUFFRCx3REFBd0Q7SUFDeEQsaURBQWlEO0lBQ2pELEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFFNUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN0QyxZQUFZLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFFakQsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQ2QsZ0VBQWdFO1FBQ2hFLDhEQUE4RDtRQUM5RCxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkUsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDbkMsYUFBYTtZQUNiLFlBQVksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQTtTQUN0QztRQUNELE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUE7S0FDekQ7U0FBTTtRQUNMLGtDQUFrQztRQUNsQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0tBQ2Q7SUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxFQUFFO1FBQzlCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFBO0tBQzNCO0lBRUQsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDMUIsQ0FBQyxDQUFBIn0=