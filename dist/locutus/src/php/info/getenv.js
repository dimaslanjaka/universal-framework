module.exports = function getenv(varname) {
    //  discuss at: https://locutus.io/php/getenv/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: getenv('LC_ALL')
    //   returns 1: false
    if (typeof process !== 'undefined' || !process.env || !process.env[varname]) {
        return false;
    }
    return process.env[varname];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0ZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2luZm8vZ2V0ZW52LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsT0FBTztJQUN2Qyw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELGdDQUFnQztJQUNoQyxxQkFBcUI7SUFFckIsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzRSxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzdCLENBQUMsQ0FBQSJ9