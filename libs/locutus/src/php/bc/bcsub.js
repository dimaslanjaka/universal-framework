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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNzdWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2JjL2Jjc3ViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLO0lBQy9ELDZDQUE2QztJQUM3QyxzRUFBc0U7SUFDdEUsK0JBQStCO0lBQy9CLG9CQUFvQjtJQUNwQixtQ0FBbUM7SUFDbkMseUJBQXlCO0lBQ3pCLHFGQUFxRjtJQUNyRixvREFBb0Q7SUFFcEQsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDcEMsSUFBSSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFckIsSUFBSSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQTtJQUV6QixJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQTtLQUN4QjtJQUNELEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWpDLGlCQUFpQjtJQUNqQixLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQy9CLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDaEMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUVoQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUNyRCxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUV2RCxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRS9DLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUU7UUFDMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7S0FDdkI7SUFFRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==