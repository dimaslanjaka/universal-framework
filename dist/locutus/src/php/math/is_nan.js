module.exports = function is_nan(val) {
    //  discuss at: https://locutus.io/php/is_nan/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //    input by: Robin
    //   example 1: is_nan(NaN)
    //   returns 1: true
    //   example 2: is_nan(0)
    //   returns 2: false
    var warningType = '';
    if (typeof val === 'number' && isNaN(val)) {
        return true;
    }
    // Some errors for maximum PHP compatibility
    if (typeof val === 'object') {
        warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
    }
    else if (typeof val === 'string' && !val.match(/^[+-]?\d/)) {
        // simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        warningType = 'string';
    }
    if (warningType) {
        throw new Error('Warning: is_nan() expects parameter 1 to be double, ' + warningType + ' given');
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfbmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvaXNfbmFuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsR0FBRztJQUNuQyw4Q0FBOEM7SUFDOUMsOERBQThEO0lBQzlELHFCQUFxQjtJQUNyQiwyQkFBMkI7SUFDM0Isb0JBQW9CO0lBQ3BCLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFFckIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFBO0lBRXBCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN6QyxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsNENBQTRDO0lBQzVDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzNCLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUM5RjtTQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1RCx5RUFBeUU7UUFDekUsV0FBVyxHQUFHLFFBQVEsQ0FBQTtLQUN2QjtJQUNELElBQUksV0FBVyxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsR0FBRyxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUE7S0FDakc7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9