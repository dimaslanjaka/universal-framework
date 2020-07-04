module.exports = function is_long(mixedVar) {
    //  discuss at: https://locutus.io/php/is_long/
    // original by: Paulo Freitas
    //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
    //   example 1: is_long(186.31)
    //   returns 1: true
    var _isFloat = require('../var/is_float');
    return _isFloat(mixedVar);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfbG9uZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfbG9uZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFFLFFBQVE7SUFDekMsK0NBQStDO0lBQy9DLDZCQUE2QjtJQUM3Qiw0RkFBNEY7SUFDNUYsMEZBQTBGO0lBQzFGLCtCQUErQjtJQUMvQixvQkFBb0I7SUFFcEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDekMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDM0IsQ0FBQyxDQUFBIn0=