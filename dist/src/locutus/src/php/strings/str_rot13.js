module.exports = function str_rot13(str) {
    //  discuss at: https://locutus.io/php/str_rot13/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // improved by: Ates Goral (https://magnetiq.com)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: str_rot13('Kevin van Zonneveld')
    //   returns 1: 'Xriva ina Mbaariryq'
    //   example 2: str_rot13('Xriva ina Mbaariryq')
    //   returns 2: 'Kevin van Zonneveld'
    //   example 3: str_rot13(33)
    //   returns 3: '33'
    return (str + '')
        .replace(/[a-z]/gi, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3JvdDEzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RyX3JvdDEzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsR0FBRztJQUN0QyxpREFBaUQ7SUFDakQscUVBQXFFO0lBQ3JFLGlEQUFpRDtJQUNqRCx5REFBeUQ7SUFDekQsOERBQThEO0lBQzlELGdEQUFnRDtJQUNoRCxxQ0FBcUM7SUFDckMsZ0RBQWdEO0lBQ2hELHFDQUFxQztJQUNyQyw2QkFBNkI7SUFDN0Isb0JBQW9CO0lBRXBCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ2QsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7UUFDN0IsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNsRixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSJ9