module.exports = function call_user_func(cb, parameters) {
    //  discuss at: https://locutus.io/php/call_user_func/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Diplom@t (https://difane.com/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Depends on call_user_func_array which in turn depends on the `cb` that is passed,
    //      note 1: this function can use `eval`.
    //      note 1: The `eval` input is however checked to only allow valid function names,
    //      note 1: So it should not be unsafer than uses without eval (seeing as you can)
    //      note 1: already pass any function to be executed here.
    //   example 1: call_user_func('isNaN', 'a')
    //   returns 1: true
    var callUserFuncArray = require('../funchand/call_user_func_array');
    parameters = Array.prototype.slice.call(arguments, 1);
    return callUserFuncArray(cb, parameters);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbF91c2VyX2Z1bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZnVuY2hhbmQvY2FsbF91c2VyX2Z1bmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxFQUFFLEVBQUUsVUFBVTtJQUN0RCxzREFBc0Q7SUFDdEQsb0RBQW9EO0lBQ3BELDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQsaUdBQWlHO0lBQ2pHLDZDQUE2QztJQUM3Qyx1RkFBdUY7SUFDdkYsc0ZBQXNGO0lBQ3RGLDhEQUE4RDtJQUM5RCw0Q0FBNEM7SUFDNUMsb0JBQW9CO0lBRXBCLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUE7SUFDbkUsVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDckQsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDMUMsQ0FBQyxDQUFBIn0=