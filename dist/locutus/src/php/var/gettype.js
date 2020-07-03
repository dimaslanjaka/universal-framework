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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0dHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvZ2V0dHlwZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFFLFFBQVE7SUFDekMsK0NBQStDO0lBQy9DLDZCQUE2QjtJQUM3QixvREFBb0Q7SUFDcEQsb0VBQW9FO0lBQ3BFLG9EQUFvRDtJQUNwRCxxQkFBcUI7SUFDckIsNEZBQTRGO0lBQzVGLDBGQUEwRjtJQUMxRiwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLGtDQUFrQztJQUNsQywyQkFBMkI7SUFDM0IsbURBQW1EO0lBQ25ELHdCQUF3QjtJQUN4Qiw4QkFBOEI7SUFDOUIsd0JBQXdCO0lBQ3hCLHlEQUF5RDtJQUN6RCx3QkFBd0I7SUFDeEIsdUVBQXVFO0lBQ3ZFLHdCQUF3QjtJQUN4QixpQ0FBaUM7SUFDakMsdUJBQXVCO0lBRXZCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBRXhDLElBQUksQ0FBQyxHQUFHLE9BQU8sUUFBUSxDQUFBO0lBQ3ZCLElBQUksSUFBSSxDQUFBO0lBQ1IsSUFBSSxZQUFZLEdBQUcsVUFBVSxFQUFFO1FBQzdCLElBQUksSUFBSSxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sYUFBYSxDQUFBO1NBQ3JCO1FBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsQ0FBQyxDQUFBO0lBRUQsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ2xCLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUNyQix1REFBdUQ7WUFDdkQsNENBQTRDO1lBQzVDLElBQUksT0FBTyxRQUFRLENBQUMsTUFBTSxLQUFLLFFBQVE7Z0JBQ3JDLENBQUMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7Z0JBQ3ZDLENBQUMsR0FBRyxPQUFPLENBQUE7YUFDWjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDckUsSUFBSSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQ3pDLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtvQkFDbkIsYUFBYTtvQkFDYixDQUFDLEdBQUcsTUFBTSxDQUFBO2lCQUNYO3FCQUFNLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDNUIsYUFBYTtvQkFDYixDQUFDLEdBQUcsUUFBUSxDQUFBO2lCQUNiO3FCQUFNLElBQUksSUFBSSxLQUFLLGtCQUFrQixFQUFFO29CQUN0Qyw2Q0FBNkM7b0JBQzdDLENBQUMsR0FBRyxVQUFVLENBQUE7aUJBQ2Y7YUFDRjtTQUNGO2FBQU07WUFDTCxDQUFDLEdBQUcsTUFBTSxDQUFBO1NBQ1g7S0FDRjtTQUFNLElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN6QixDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtLQUM3QztJQUVELE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=