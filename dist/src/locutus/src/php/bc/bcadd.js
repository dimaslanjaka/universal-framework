module.exports = function bcadd(leftOperand, rightOperand, scale) {
    //  discuss at: https://locutus.io/php/bcadd/
    // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
    //   example 1: bcadd('1', '2')
    //   returns 1: '3'
    //   example 2: bcadd('-1', '5', 4)
    //   returns 2: '4.0000'
    //   example 3: bcadd('1928372132132819737213', '8728932001983192837219398127471', 2)
    //   returns 3: '8728932003911564969352217864684.00'
    var bc = require('../_helpers/_bc');
    var libbcmath = bc();
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
    result = libbcmath.bc_add(first, second, scale);
    if (result.n_scale > scale) {
        result.n_scale = scale;
    }
    return result.toString();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNhZGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYmMvYmNhZGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUs7SUFDL0QsNkNBQTZDO0lBQzdDLHNFQUFzRTtJQUN0RSwrQkFBK0I7SUFDL0IsbUJBQW1CO0lBQ25CLG1DQUFtQztJQUNuQyx3QkFBd0I7SUFDeEIscUZBQXFGO0lBQ3JGLG9EQUFvRDtJQUVwRCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNuQyxJQUFJLFNBQVMsR0FBRyxFQUFFLEVBQUUsQ0FBQTtJQUVwQixJQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFBO0lBRXpCLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1FBQ2hDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFBO0tBQ3hCO0lBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFakMsaUJBQWlCO0lBQ2pCLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRWhDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRXZELE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFL0MsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRTtRQUMxQixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtLQUN2QjtJQUVELE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQzFCLENBQUMsQ0FBQSJ9