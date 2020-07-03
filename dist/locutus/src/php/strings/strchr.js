module.exports = function strchr(haystack, needle, bool) {
    //  discuss at: https://locutus.io/php/strchr/
    // original by: Philip Peterson
    //   example 1: strchr('Kevin van Zonneveld', 'van')
    //   returns 1: 'van Zonneveld'
    //   example 2: strchr('Kevin van Zonneveld', 'van', true)
    //   returns 2: 'Kevin '
    var strstr = require('../strings/strstr');
    return strstr(haystack, needle, bool);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyY2hyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RyY2hyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJO0lBQ3RELDhDQUE4QztJQUM5QywrQkFBK0I7SUFDL0Isb0RBQW9EO0lBQ3BELCtCQUErQjtJQUMvQiwwREFBMEQ7SUFDMUQsd0JBQXdCO0lBRXhCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQ3pDLE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDdkMsQ0FBQyxDQUFBIn0=