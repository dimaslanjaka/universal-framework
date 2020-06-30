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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG91YmxldmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvZG91YmxldmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsUUFBUTtJQUMzQyxpREFBaUQ7SUFDakQsb0RBQW9EO0lBQ3BELDRGQUE0RjtJQUM1RiwwRkFBMEY7SUFDMUYsOEJBQThCO0lBQzlCLHNCQUFzQjtJQUV0QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUV6QyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==