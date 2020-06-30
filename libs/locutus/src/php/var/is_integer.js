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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfaW50ZWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzX2ludGVnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxRQUFRO0lBQzVDLGtEQUFrRDtJQUNsRCw2QkFBNkI7SUFDN0IsNEZBQTRGO0lBQzVGLDBGQUEwRjtJQUMxRixrQ0FBa0M7SUFDbEMscUJBQXFCO0lBQ3JCLDhCQUE4QjtJQUM5QixvQkFBb0I7SUFFcEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3JDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3pCLENBQUMsQ0FBQSJ9