module.exports = function gettype(mixedVar) {
    //  discuss at: https://locutus.io/php/gettype/
    // original by: Paulo Freitas
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Douglas Crockford (https://javascript.crockford.com)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //    input by: KELAN
    //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
    //   example 1: gettype(1)
    //   returns 1: 'integer'
    //   example 2: gettype(undefined)
    //   returns 2: 'undefined'
    //   example 3: gettype({0: 'Kevin van Zonneveld'})
    //   returns 3: 'object'
    //   example 4: gettype('foo')
    //   returns 4: 'string'
    //   example 5: gettype({0: function () {return false;}})
    //   returns 5: 'object'
    //   example 6: gettype({0: 'test', length: 1, splice: function () {}})
    //   returns 6: 'object'
    //   example 7: gettype(['test'])
    //   returns 7: 'array'
    var isFloat = require('../var/is_float');
    var s = typeof mixedVar;
    var name;
    var _getFuncName = function (fn) {
        var name = (/\W*function\s+([\w$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (s === 'object') {
        if (mixedVar !== null) {
            // From: https://javascript.crockford.com/remedial.html
            // @todo: Break up this lengthy if statement
            if (typeof mixedVar.length === 'number' &&
                !(mixedVar.propertyIsEnumerable('length')) &&
                typeof mixedVar.splice === 'function') {
                s = 'array';
            }
            else if (mixedVar.constructor && _getFuncName(mixedVar.constructor)) {
                name = _getFuncName(mixedVar.constructor);
                if (name === 'Date') {
                    // not in PHP
                    s = 'date';
                }
                else if (name === 'RegExp') {
                    // not in PHP
                    s = 'regexp';
                }
                else if (name === 'LOCUTUS_Resource') {
                    // Check against our own resource constructor
                    s = 'resource';
                }
            }
        }
        else {
            s = 'null';
        }
    }
    else if (s === 'number') {
        s = isFloat(mixedVar) ? 'double' : 'integer';
    }
    return s;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0dHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2dldHR5cGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxRQUFRO0lBQ3pDLCtDQUErQztJQUMvQyw2QkFBNkI7SUFDN0Isb0RBQW9EO0lBQ3BELG9FQUFvRTtJQUNwRSxvREFBb0Q7SUFDcEQscUJBQXFCO0lBQ3JCLDRGQUE0RjtJQUM1RiwwRkFBMEY7SUFDMUYsMEJBQTBCO0lBQzFCLHlCQUF5QjtJQUN6QixrQ0FBa0M7SUFDbEMsMkJBQTJCO0lBQzNCLG1EQUFtRDtJQUNuRCx3QkFBd0I7SUFDeEIsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4Qix5REFBeUQ7SUFDekQsd0JBQXdCO0lBQ3hCLHVFQUF1RTtJQUN2RSx3QkFBd0I7SUFDeEIsaUNBQWlDO0lBQ2pDLHVCQUF1QjtJQUV2QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUV4QyxJQUFJLENBQUMsR0FBRyxPQUFPLFFBQVEsQ0FBQTtJQUN2QixJQUFJLElBQUksQ0FBQTtJQUNSLElBQUksWUFBWSxHQUFHLFVBQVUsRUFBRTtRQUM3QixJQUFJLElBQUksR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLGFBQWEsQ0FBQTtTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtJQUVELElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUNsQixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDckIsdURBQXVEO1lBQ3ZELDRDQUE0QztZQUM1QyxJQUFJLE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxRQUFRO2dCQUNyQyxDQUFDLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO2dCQUN2QyxDQUFDLEdBQUcsT0FBTyxDQUFBO2FBQ1o7aUJBQU0sSUFBSSxRQUFRLENBQUMsV0FBVyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3JFLElBQUksR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUN6QyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7b0JBQ25CLGFBQWE7b0JBQ2IsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtpQkFDWDtxQkFBTSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzVCLGFBQWE7b0JBQ2IsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtpQkFDYjtxQkFBTSxJQUFJLElBQUksS0FBSyxrQkFBa0IsRUFBRTtvQkFDdEMsNkNBQTZDO29CQUM3QyxDQUFDLEdBQUcsVUFBVSxDQUFBO2lCQUNmO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtTQUNYO0tBQ0Y7U0FBTSxJQUFJLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDekIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7S0FDN0M7SUFFRCxPQUFPLENBQUMsQ0FBQTtBQUNWLENBQUMsQ0FBQSJ9