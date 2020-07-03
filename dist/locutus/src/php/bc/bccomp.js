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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNjb21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2JjL2JjY29tcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSztJQUNoRSw4Q0FBOEM7SUFDOUMsc0VBQXNFO0lBQ3RFLG9DQUFvQztJQUNwQyxrQkFBa0I7SUFDbEIsbUZBQW1GO0lBQ25GLGtCQUFrQjtJQUNsQix3REFBd0Q7SUFDeEQsaUJBQWlCO0lBQ2pCLHVDQUF1QztJQUN2QyxpQkFBaUI7SUFFakIsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDbkMsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFLENBQUE7SUFFcEIsU0FBUztJQUNULElBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQTtJQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQTtLQUN4QjtJQUNELEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWpDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUVoQywyQkFBMkI7SUFDM0IsS0FBSyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzNELDJCQUEyQjtJQUMzQixNQUFNLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDN0QsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDbkQsQ0FBQyxDQUFBIn0=