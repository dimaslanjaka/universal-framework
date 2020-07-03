module.exports = function strpos(haystack, needle, offset) {
    //  discuss at: https://locutus.io/php/strpos/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Daniel Esteban
    //   example 1: strpos('Kevin van Zonneveld', 'e', 5)
    //   returns 1: 14
    var i = (haystack + '')
        .indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycG9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RycG9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNO0lBQ3hELDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCw4QkFBOEI7SUFDOUIscURBQXFEO0lBQ3JELGtCQUFrQjtJQUVsQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDcEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM3QixDQUFDLENBQUEifQ==