module.exports = function bcdiv(leftOperand, rightOperand, scale) {
    //  discuss at: https://locutus.io/php/bcdiv/
    // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
    //   example 1: bcdiv('1', '2')
    //   returns 1: '0'
    //   example 2: bcdiv('1', '2', 2)
    //   returns 2: '0.50'
    //   example 3: bcdiv('-1', '5', 4)
    //   returns 3: '-0.2000'
    //   example 4: bcdiv('8728932001983192837219398127471', '1928372132132819737213', 2)
    //   returns 4: '4526580661.75'
    var _bc = require('../_helpers/_bc');
    var libbcmath = _bc();
    var first, second, result;
    if (typeof scale === 'undefined') {
        scale = libbcmath.scale;
    }
    scale = ((scale < 0) ? 0 : scale);
    // create objects
    first = libbcmath.bc_init_num();
    second = libbcmath.bc_init_num();
    result = libbcmath.bc_init_num();
    first = libbcmath.php_str2num(leftOperand.toString());
    second = libbcmath.php_str2num(rightOperand.toString());
    result = libbcmath.bc_divide(first, second, scale);
    if (result === -1) {
        // error
        throw new Error(11, '(BC) Division by zero');
    }
    if (result.n_scale > scale) {
        result.n_scale = scale;
    }
    return result.toString();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNkaXYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYmMvYmNkaXYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUs7SUFDL0QsNkNBQTZDO0lBQzdDLHNFQUFzRTtJQUN0RSwrQkFBK0I7SUFDL0IsbUJBQW1CO0lBQ25CLGtDQUFrQztJQUNsQyxzQkFBc0I7SUFDdEIsbUNBQW1DO0lBQ25DLHlCQUF5QjtJQUN6QixxRkFBcUY7SUFDckYsK0JBQStCO0lBRS9CLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3BDLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRXJCLElBQUksS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUE7SUFFekIsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDaEMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUE7S0FDeEI7SUFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVqQyxpQkFBaUI7SUFDakIsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMvQixNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ2hDLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFFaEMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDckQsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFFdkQsTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNsRCxJQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNqQixRQUFRO1FBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTtLQUM3QztJQUNELElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUU7UUFDMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7S0FDdkI7SUFFRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==