module.exports = function array_change_key_case(array, cs) {
    //  discuss at: https://locutus.io/php/array_change_key_case/
    // original by: Ates Goral (https://magnetiq.com)
    // improved by: marrtins
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_change_key_case(42)
    //   returns 1: false
    //   example 2: array_change_key_case([ 3, 5 ])
    //   returns 2: [3, 5]
    //   example 3: array_change_key_case({ FuBaR: 42 })
    //   returns 3: {"fubar": 42}
    //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER')
    //   returns 4: {"fubar": 42}
    //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER')
    //   returns 5: {"FUBAR": 42}
    //   example 6: array_change_key_case({ FuBaR: 42 }, 2)
    //   returns 6: {"FUBAR": 42}
    var caseFnc;
    var key;
    var tmpArr = {};
    if (Object.prototype.toString.call(array) === '[object Array]') {
        return array;
    }
    if (array && typeof array === 'object') {
        caseFnc = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';
        for (key in array) {
            tmpArr[key[caseFnc]()] = array[key];
        }
        return tmpArr;
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfY2hhbmdlX2tleV9jYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9jaGFuZ2Vfa2V5X2Nhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLHFCQUFxQixDQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3hELDZEQUE2RDtJQUM3RCxpREFBaUQ7SUFDakQsd0JBQXdCO0lBQ3hCLG9EQUFvRDtJQUNwRCx5Q0FBeUM7SUFDekMscUJBQXFCO0lBQ3JCLCtDQUErQztJQUMvQyxzQkFBc0I7SUFDdEIsb0RBQW9EO0lBQ3BELDZCQUE2QjtJQUM3QixrRUFBa0U7SUFDbEUsNkJBQTZCO0lBQzdCLGtFQUFrRTtJQUNsRSw2QkFBNkI7SUFDN0IsdURBQXVEO0lBQ3ZELDZCQUE2QjtJQUU3QixJQUFJLE9BQU8sQ0FBQTtJQUNYLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBRWYsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7UUFDOUQsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN0QyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBO1FBQ3RFLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDcEM7UUFDRCxPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==