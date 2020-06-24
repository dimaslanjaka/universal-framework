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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNtdWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2JjL2JjbXVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLO0lBQy9ELDZDQUE2QztJQUM3QyxzRUFBc0U7SUFDdEUsK0JBQStCO0lBQy9CLG1CQUFtQjtJQUNuQixnQ0FBZ0M7SUFDaEMscUJBQXFCO0lBQ3JCLGlEQUFpRDtJQUNqRCxzQ0FBc0M7SUFDdEMsc0NBQXNDO0lBQ3RDLHNCQUFzQjtJQUV0QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNwQyxJQUFJLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVyQixJQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFBO0lBRXpCLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1FBQ2hDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFBO0tBQ3hCO0lBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFakMsaUJBQWlCO0lBQ2pCLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRWhDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRXZELE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFcEQsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRTtRQUMxQixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtLQUN2QjtJQUNELE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQzFCLENBQUMsQ0FBQSJ9