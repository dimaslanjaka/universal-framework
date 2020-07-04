module.exports = function substr(input, start, len) {
    //  discuss at: https://locutus.io/php/substr/
    // original by: Martijn Wieringa
    // bugfixed by: T.Wild
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //  revised by: Theriault (https://github.com/Theriault)
    //  revised by: Rafał Kukawski
    //      note 1: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'
    //   example 1: substr('abcdef', 0, -1)
    //   returns 1: 'abcde'
    //   example 2: substr(2, 0, -6)
    //   returns 2: false
    //   example 3: ini_set('unicode.semantics', 'on')
    //   example 3: substr('a\uD801\uDC00', 0, -1)
    //   returns 3: 'a'
    //   example 4: ini_set('unicode.semantics', 'on')
    //   example 4: substr('a\uD801\uDC00', 0, 2)
    //   returns 4: 'a\uD801\uDC00'
    //   example 5: ini_set('unicode.semantics', 'on')
    //   example 5: substr('a\uD801\uDC00', -1, 1)
    //   returns 5: '\uD801\uDC00'
    //   example 6: ini_set('unicode.semantics', 'on')
    //   example 6: substr('a\uD801\uDC00z\uD801\uDC00', -3, 2)
    //   returns 6: '\uD801\uDC00z'
    //   example 7: ini_set('unicode.semantics', 'on')
    //   example 7: substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
    //   returns 7: '\uD801\uDC00z'
    //        test: skip-3 skip-4 skip-5 skip-6 skip-7
    var _php_cast_string = require('../_helpers/_phpCastString'); // eslint-disable-line camelcase
    input = _php_cast_string(input);
    var ini_get = require('../info/ini_get'); // eslint-disable-line camelcase
    var multibyte = ini_get('unicode.semantics') === 'on';
    if (multibyte) {
        input = input.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g) || [];
    }
    var inputLength = input.length;
    var end = inputLength;
    if (start < 0) {
        start += end;
    }
    if (typeof len !== 'undefined') {
        if (len < 0) {
            end = len + end;
        }
        else {
            end = len + start;
        }
    }
    if (start > inputLength || start < 0 || start > end) {
        return false;
    }
    if (multibyte) {
        return input.slice(start, end).join('');
    }
    return input.slice(start, end);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic3RyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3Vic3RyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHO0lBQ2pELDhDQUE4QztJQUM5QyxnQ0FBZ0M7SUFDaEMsc0JBQXNCO0lBQ3RCLDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELDhCQUE4QjtJQUM5QixnR0FBZ0c7SUFDaEcsdUNBQXVDO0lBQ3ZDLHVCQUF1QjtJQUN2QixnQ0FBZ0M7SUFDaEMscUJBQXFCO0lBQ3JCLGtEQUFrRDtJQUNsRCw4Q0FBOEM7SUFDOUMsbUJBQW1CO0lBQ25CLGtEQUFrRDtJQUNsRCw2Q0FBNkM7SUFDN0MsK0JBQStCO0lBQy9CLGtEQUFrRDtJQUNsRCw4Q0FBOEM7SUFDOUMsOEJBQThCO0lBQzlCLGtEQUFrRDtJQUNsRCwyREFBMkQ7SUFDM0QsK0JBQStCO0lBQy9CLGtEQUFrRDtJQUNsRCw0REFBNEQ7SUFDNUQsK0JBQStCO0lBQy9CLGtEQUFrRDtJQUVsRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBLENBQUMsZ0NBQWdDO0lBRTdGLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUUvQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQSxDQUFDLGdDQUFnQztJQUN6RSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsS0FBSyxJQUFJLENBQUE7SUFFckQsSUFBSSxTQUFTLEVBQUU7UUFDYixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtLQUNwRTtJQUVELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUE7SUFDOUIsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFBO0lBRXJCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtRQUNiLEtBQUssSUFBSSxHQUFHLENBQUE7S0FDYjtJQUVELElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO1FBQzlCLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNYLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO1NBQ2hCO2FBQU07WUFDTCxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQTtTQUNsQjtLQUNGO0lBRUQsSUFBSSxLQUFLLEdBQUcsV0FBVyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEdBQUcsRUFBRTtRQUNuRCxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxTQUFTLEVBQUU7UUFDYixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUN4QztJQUVELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBIn0=