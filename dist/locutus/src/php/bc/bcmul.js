module.exports = function bcmul(leftOperand, rightOperand, scale) {
    //  discuss at: https://locutus.io/php/bcmul/
    // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
    //   example 1: bcmul('1', '2')
    //   returns 1: '2'
    //   example 2: bcmul('-3', '5')
    //   returns 2: '-15'
    //   example 3: bcmul('1234567890', '9876543210')
    //   returns 3: '12193263111263526900'
    //   example 4: bcmul('2.5', '1.5', 2)
    //   returns 4: '3.75'
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
    result = libbcmath.bc_multiply(first, second, scale);
    if (result.n_scale > scale) {
        result.n_scale = scale;
    }
    return result.toString();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNtdWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYmMvYmNtdWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUs7SUFDL0QsNkNBQTZDO0lBQzdDLHNFQUFzRTtJQUN0RSwrQkFBK0I7SUFDL0IsbUJBQW1CO0lBQ25CLGdDQUFnQztJQUNoQyxxQkFBcUI7SUFDckIsaURBQWlEO0lBQ2pELHNDQUFzQztJQUN0QyxzQ0FBc0M7SUFDdEMsc0JBQXNCO0lBRXRCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3BDLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRXJCLElBQUksS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUE7SUFFekIsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDaEMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUE7S0FDeEI7SUFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVqQyxpQkFBaUI7SUFDakIsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMvQixNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ2hDLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFFaEMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDckQsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFFdkQsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUVwRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0tBQ3ZCO0lBQ0QsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDMUIsQ0FBQyxDQUFBIn0=