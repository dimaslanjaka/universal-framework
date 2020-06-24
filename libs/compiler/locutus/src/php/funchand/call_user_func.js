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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbF91c2VyX2Z1bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2Z1bmNoYW5kL2NhbGxfdXNlcl9mdW5jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxjQUFjLENBQUUsRUFBRSxFQUFFLFVBQVU7SUFDdEQsc0RBQXNEO0lBQ3RELG9EQUFvRDtJQUNwRCw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELGlHQUFpRztJQUNqRyw2Q0FBNkM7SUFDN0MsdUZBQXVGO0lBQ3ZGLHNGQUFzRjtJQUN0Riw4REFBOEQ7SUFDOUQsNENBQTRDO0lBQzVDLG9CQUFvQjtJQUVwQixJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO0lBQ25FLFVBQVUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3JELE9BQU8saUJBQWlCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzFDLENBQUMsQ0FBQSJ9