module.exports = function sizeof(mixedVar, mode) {
    //  discuss at: https://locutus.io/php/sizeof/
    // original by: Philip Peterson
    //   example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE')
    //   returns 1: 6
    //   example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
    //   returns 2: 6
    var count = require('../array/count');
    return count(mixedVar, mode);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L3NpemVvZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLFFBQVEsRUFBRSxJQUFJO0lBQzlDLDhDQUE4QztJQUM5QywrQkFBK0I7SUFDL0IseURBQXlEO0lBQ3pELGlCQUFpQjtJQUNqQixnRUFBZ0U7SUFDaEUsaUJBQWlCO0lBRWpCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRXJDLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQUEifQ==