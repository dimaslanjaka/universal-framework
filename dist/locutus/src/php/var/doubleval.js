module.exports = function doubleval(mixedVar) {
    //  discuss at: https://locutus.io/php/doubleval/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
    //   example 1: doubleval(186)
    //   returns 1: 186.00
    var floatval = require('../var/floatval');
    return floatval(mixedVar);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG91YmxldmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9kb3VibGV2YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxRQUFRO0lBQzNDLGlEQUFpRDtJQUNqRCxvREFBb0Q7SUFDcEQsNEZBQTRGO0lBQzVGLDBGQUEwRjtJQUMxRiw4QkFBOEI7SUFDOUIsc0JBQXNCO0lBRXRCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBRXpDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQSJ9