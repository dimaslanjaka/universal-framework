module.exports = function is_double(mixedVar) {
    //  discuss at: https://locutus.io/php/is_double/
    // original by: Paulo Freitas
    //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
    //   example 1: is_double(186.31)
    //   returns 1: true
    var _isFloat = require('../var/is_float');
    return _isFloat(mixedVar);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfZG91YmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfZG91YmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsUUFBUTtJQUMzQyxpREFBaUQ7SUFDakQsNkJBQTZCO0lBQzdCLDRGQUE0RjtJQUM1RiwwRkFBMEY7SUFDMUYsaUNBQWlDO0lBQ2pDLG9CQUFvQjtJQUVwQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUN6QyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==