module.exports = function is_real(mixedVar) {
    //  discuss at: https://locutus.io/php/is_real/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
    //   example 1: is_real(186.31)
    //   returns 1: true
    var _isFloat = require('../var/is_float');
    return _isFloat(mixedVar);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfcmVhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzX3JlYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxRQUFRO0lBQ3pDLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsNEZBQTRGO0lBQzVGLDBGQUEwRjtJQUMxRiwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBRXBCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3pDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQSJ9