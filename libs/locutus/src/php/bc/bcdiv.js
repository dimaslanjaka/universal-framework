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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNkaXYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2JjL2JjZGl2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLO0lBQy9ELDZDQUE2QztJQUM3QyxzRUFBc0U7SUFDdEUsK0JBQStCO0lBQy9CLG1CQUFtQjtJQUNuQixrQ0FBa0M7SUFDbEMsc0JBQXNCO0lBQ3RCLG1DQUFtQztJQUNuQyx5QkFBeUI7SUFDekIscUZBQXFGO0lBQ3JGLCtCQUErQjtJQUUvQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNwQyxJQUFJLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVyQixJQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFBO0lBRXpCLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1FBQ2hDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFBO0tBQ3hCO0lBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFakMsaUJBQWlCO0lBQ2pCLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRWhDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRXZELE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDbEQsSUFBSSxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDakIsUUFBUTtRQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLHVCQUF1QixDQUFDLENBQUE7S0FDN0M7SUFDRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0tBQ3ZCO0lBRUQsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDMUIsQ0FBQyxDQUFBIn0=