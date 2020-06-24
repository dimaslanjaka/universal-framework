module.exports = function is_scalar(mixedVar) {
    //  discuss at: https://locutus.io/php/is_scalar/
    // original by: Paulo Freitas
    //   example 1: is_scalar(186.31)
    //   returns 1: true
    //   example 2: is_scalar({0: 'Kevin van Zonneveld'})
    //   returns 2: false
    return (/boolean|number|string/).test(typeof mixedVar);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfc2NhbGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfc2NhbGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsUUFBUTtJQUMzQyxpREFBaUQ7SUFDakQsNkJBQTZCO0lBQzdCLGlDQUFpQztJQUNqQyxvQkFBb0I7SUFDcEIscURBQXFEO0lBQ3JELHFCQUFxQjtJQUVyQixPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQTtBQUN4RCxDQUFDLENBQUEifQ==