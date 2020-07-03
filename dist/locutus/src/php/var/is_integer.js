module.exports = function is_integer(mixedVar) {
    //  discuss at: https://locutus.io/php/is_integer/
    // original by: Paulo Freitas
    //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
    //   example 1: is_integer(186.31)
    //   returns 1: false
    //   example 2: is_integer(12)
    //   returns 2: true
    var _isInt = require('../var/is_int');
    return _isInt(mixedVar);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfaW50ZWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfaW50ZWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLFFBQVE7SUFDNUMsa0RBQWtEO0lBQ2xELDZCQUE2QjtJQUM3Qiw0RkFBNEY7SUFDNUYsMEZBQTBGO0lBQzFGLGtDQUFrQztJQUNsQyxxQkFBcUI7SUFDckIsOEJBQThCO0lBQzlCLG9CQUFvQjtJQUVwQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDckMsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFBIn0=