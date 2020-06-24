module.exports = function bccomp(leftOperand, rightOperand, scale) {
    //  discuss at: https://locutus.io/php/bccomp/
    // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
    //   example 1: bccomp('-1', '5', 4)
    //   returns 1: -1
    //   example 2: bccomp('1928372132132819737213', '8728932001983192837219398127471')
    //   returns 2: -1
    //   example 3: bccomp('1.00000000000000000001', '1', 2)
    //   returns 3: 0
    //   example 4: bccomp('97321', '2321')
    //   returns 4: 1
    var bc = require('../_helpers/_bc');
    var libbcmath = bc();
    // bc_num
    var first, second;
    if (typeof scale === 'undefined') {
        scale = libbcmath.scale;
    }
    scale = ((scale < 0) ? 0 : scale);
    first = libbcmath.bc_init_num();
    second = libbcmath.bc_init_num();
    // note bc_ not php_str2num
    first = libbcmath.bc_str2num(leftOperand.toString(), scale);
    // note bc_ not php_str2num
    second = libbcmath.bc_str2num(rightOperand.toString(), scale);
    return libbcmath.bc_compare(first, second, scale);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNjb21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9iYy9iY2NvbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUs7SUFDaEUsOENBQThDO0lBQzlDLHNFQUFzRTtJQUN0RSxvQ0FBb0M7SUFDcEMsa0JBQWtCO0lBQ2xCLG1GQUFtRjtJQUNuRixrQkFBa0I7SUFDbEIsd0RBQXdEO0lBQ3hELGlCQUFpQjtJQUNqQix1Q0FBdUM7SUFDdkMsaUJBQWlCO0lBRWpCLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ25DLElBQUksU0FBUyxHQUFHLEVBQUUsRUFBRSxDQUFBO0lBRXBCLFNBQVM7SUFDVCxJQUFJLEtBQUssRUFBRSxNQUFNLENBQUE7SUFDakIsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDaEMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUE7S0FDeEI7SUFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVqQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQy9CLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFFaEMsMkJBQTJCO0lBQzNCLEtBQUssR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUMzRCwyQkFBMkI7SUFDM0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzdELE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ25ELENBQUMsQ0FBQSJ9