module.exports = function bcsub(leftOperand, rightOperand, scale) {
    //  discuss at: https://locutus.io/php/bcsub/
    // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
    //   example 1: bcsub('1', '2')
    //   returns 1: '-1'
    //   example 2: bcsub('-1', '5', 4)
    //   returns 2: '-6.0000'
    //   example 3: bcsub('8728932001983192837219398127471', '1928372132132819737213', 2)
    //   returns 3: '8728932000054820705086578390258.00'
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
    result = libbcmath.bc_sub(first, second, scale);
    if (result.n_scale > scale) {
        result.n_scale = scale;
    }
    return result.toString();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNzdWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYmMvYmNzdWIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUs7SUFDL0QsNkNBQTZDO0lBQzdDLHNFQUFzRTtJQUN0RSwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBQ3BCLG1DQUFtQztJQUNuQyx5QkFBeUI7SUFDekIscUZBQXFGO0lBQ3JGLG9EQUFvRDtJQUVwRCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNwQyxJQUFJLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVyQixJQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFBO0lBRXpCLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1FBQ2hDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFBO0tBQ3hCO0lBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFakMsaUJBQWlCO0lBQ2pCLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRWhDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRXZELE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFL0MsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRTtRQUMxQixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtLQUN2QjtJQUVELE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQzFCLENBQUMsQ0FBQSJ9