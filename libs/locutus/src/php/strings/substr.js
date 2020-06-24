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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic3RyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N1YnN0ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRztJQUNqRCw4Q0FBOEM7SUFDOUMsZ0NBQWdDO0lBQ2hDLHNCQUFzQjtJQUN0Qiw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELHdEQUF3RDtJQUN4RCw4QkFBOEI7SUFDOUIsZ0dBQWdHO0lBQ2hHLHVDQUF1QztJQUN2Qyx1QkFBdUI7SUFDdkIsZ0NBQWdDO0lBQ2hDLHFCQUFxQjtJQUNyQixrREFBa0Q7SUFDbEQsOENBQThDO0lBQzlDLG1CQUFtQjtJQUNuQixrREFBa0Q7SUFDbEQsNkNBQTZDO0lBQzdDLCtCQUErQjtJQUMvQixrREFBa0Q7SUFDbEQsOENBQThDO0lBQzlDLDhCQUE4QjtJQUM5QixrREFBa0Q7SUFDbEQsMkRBQTJEO0lBQzNELCtCQUErQjtJQUMvQixrREFBa0Q7SUFDbEQsNERBQTREO0lBQzVELCtCQUErQjtJQUMvQixrREFBa0Q7SUFFbEQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQSxDQUFDLGdDQUFnQztJQUU3RixLQUFLLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFL0IsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUEsQ0FBQyxnQ0FBZ0M7SUFDekUsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEtBQUssSUFBSSxDQUFBO0lBRXJELElBQUksU0FBUyxFQUFFO1FBQ2IsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsSUFBSSxFQUFFLENBQUE7S0FDcEU7SUFFRCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQzlCLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQTtJQUVyQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDYixLQUFLLElBQUksR0FBRyxDQUFBO0tBQ2I7SUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtRQUM5QixJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtTQUNoQjthQUFNO1lBQ0wsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUE7U0FDbEI7S0FDRjtJQUVELElBQUksS0FBSyxHQUFHLFdBQVcsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxHQUFHLEVBQUU7UUFDbkQsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUksU0FBUyxFQUFFO1FBQ2IsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7S0FDeEM7SUFFRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQSJ9