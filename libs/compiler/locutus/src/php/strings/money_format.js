module.exports = function money_format(format, number) {
    //  discuss at: https://locutus.io/php/money_format/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: daniel airton wermann (https://wermann.com.br)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      note 1: This depends on setlocale having the appropriate
    //      note 1: locale (these examples use 'en_US')
    //   example 1: money_format('%i', 1234.56)
    //   returns 1: ' USD 1,234.56'
    //   example 2: money_format('%14#8.2n', 1234.5678)
    //   returns 2: ' $     1,234.57'
    //   example 3: money_format('%14#8.2n', -1234.5678)
    //   returns 3: '-$     1,234.57'
    //   example 4: money_format('%(14#8.2n', 1234.5678)
    //   returns 4: ' $     1,234.57 '
    //   example 5: money_format('%(14#8.2n', -1234.5678)
    //   returns 5: '($     1,234.57)'
    //   example 6: money_format('%=014#8.2n', 1234.5678)
    //   returns 6: ' $000001,234.57'
    //   example 7: money_format('%=014#8.2n', -1234.5678)
    //   returns 7: '-$000001,234.57'
    //   example 8: money_format('%=*14#8.2n', 1234.5678)
    //   returns 8: ' $*****1,234.57'
    //   example 9: money_format('%=*14#8.2n', -1234.5678)
    //   returns 9: '-$*****1,234.57'
    //  example 10: money_format('%=*^14#8.2n', 1234.5678)
    //  returns 10: '  $****1234.57'
    //  example 11: money_format('%=*^14#8.2n', -1234.5678)
    //  returns 11: ' -$****1234.57'
    //  example 12: money_format('%=*!14#8.2n', 1234.5678)
    //  returns 12: ' *****1,234.57'
    //  example 13: money_format('%=*!14#8.2n', -1234.5678)
    //  returns 13: '-*****1,234.57'
    //  example 14: money_format('%i', 3590)
    //  returns 14: ' USD 3,590.00'
    var setlocale = require('../strings/setlocale');
    // Per PHP behavior, there seems to be no extra padding
    // for sign when there is a positive number, though my
    // understanding of the description is that there should be padding;
    // need to revisit examples
    // Helpful info at https://ftp.gnu.org/pub/pub/old-gnu/Manuals/glibc-2.2.3/html_chapter/libc_7.html
    // and https://publib.boulder.ibm.com/infocenter/zos/v1r10/index.jsp?topic=/com.ibm.zos.r10.bpxbd00/strfmp.htm
    if (typeof number !== 'number') {
        return null;
    }
    // 1: flags, 3: width, 5: left, 7: right, 8: conversion
    var regex = /%((=.|[+^(!-])*?)(\d*?)(#(\d+))?(\.(\d+))?([in%])/g;
    // Ensure the locale data we need is set up
    setlocale('LC_ALL', 0);
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    var monetary = $locutus.php.locales[$locutus.php.localeCategories.LC_MONETARY].LC_MONETARY;
    var doReplace = function (n0, flags, n2, width, n4, left, n6, right, conversion) {
        var value = '';
        var repl = '';
        if (conversion === '%') {
            // Percent does not seem to be allowed with intervening content
            return '%';
        }
        var fill = flags && (/=./).test(flags) ? flags.match(/=(.)/)[1] : ' '; // flag: =f (numeric fill)
        // flag: ! (suppress currency symbol)
        var showCurrSymbol = !flags || flags.indexOf('!') === -1;
        // field width: w (minimum field width)
        width = parseInt(width, 10) || 0;
        var neg = number < 0;
        // Convert to string
        number = number + '';
        // We don't want negative symbol represented here yet
        number = neg ? number.slice(1) : number;
        var decpos = number.indexOf('.');
        // Get integer portion
        var integer = decpos !== -1 ? number.slice(0, decpos) : number;
        // Get decimal portion
        var fraction = decpos !== -1 ? number.slice(decpos + 1) : '';
        var _strSplice = function (integerStr, idx, thouSep) {
            var integerArr = integerStr.split('');
            integerArr.splice(idx, 0, thouSep);
            return integerArr.join('');
        };
        var intLen = integer.length;
        left = parseInt(left, 10);
        var filler = intLen < left;
        if (filler) {
            var fillnum = left - intLen;
            integer = new Array(fillnum + 1).join(fill) + integer;
        }
        if (flags.indexOf('^') === -1) {
            // flag: ^ (disable grouping characters (of locale))
            // use grouping characters
            // ','
            var thouSep = monetary.mon_thousands_sep;
            // [3] (every 3 digits in U.S.A. locale)
            var monGrouping = monetary.mon_grouping;
            if (monGrouping[0] < integer.length) {
                for (var i = 0, idx = integer.length; i < monGrouping.length; i++) {
                    // e.g., 3
                    idx -= monGrouping[i];
                    if (idx <= 0) {
                        break;
                    }
                    if (filler && idx < fillnum) {
                        thouSep = fill;
                    }
                    integer = _strSplice(integer, idx, thouSep);
                }
            }
            if (monGrouping[i - 1] > 0) {
                // Repeating last grouping (may only be one) until highest portion of integer reached
                while (idx > monGrouping[i - 1]) {
                    idx -= monGrouping[i - 1];
                    if (filler && idx < fillnum) {
                        thouSep = fill;
                    }
                    integer = _strSplice(integer, idx, thouSep);
                }
            }
        }
        // left, right
        if (right === '0') {
            // No decimal or fractional digits
            value = integer;
        }
        else {
            // '.'
            var decPt = monetary.mon_decimal_point;
            if (right === '' || right === undefined) {
                right = conversion === 'i' ? monetary.int_frac_digits : monetary.frac_digits;
            }
            right = parseInt(right, 10);
            if (right === 0) {
                // Only remove fractional portion if explicitly set to zero digits
                fraction = '';
                decPt = '';
            }
            else if (right < fraction.length) {
                fraction = Math.round(parseFloat(fraction.slice(0, right) + '.' + fraction.substr(right, 1)));
                if (right > fraction.length) {
                    fraction = new Array(right - fraction.length + 1).join('0') + fraction; // prepend with 0's
                }
            }
            else if (right > fraction.length) {
                fraction += new Array(right - fraction.length + 1).join('0'); // pad with 0's
            }
            value = integer + decPt + fraction;
        }
        var symbol = '';
        if (showCurrSymbol) {
            // 'i' vs. 'n' ('USD' vs. '$')
            symbol = conversion === 'i' ? monetary.int_curr_symbol : monetary.currency_symbol;
        }
        var signPosn = neg ? monetary.n_sign_posn : monetary.p_sign_posn;
        // 0: no space between curr. symbol and value
        // 1: space sep. them unless symb. and sign are adjacent then space sep. them from value
        // 2: space sep. sign and value unless symb. and sign are adjacent then space separates
        var sepBySpace = neg ? monetary.n_sep_by_space : monetary.p_sep_by_space;
        // p_cs_precedes, n_cs_precedes
        // positive currency symbol follows value = 0; precedes value = 1
        var csPrecedes = neg ? monetary.n_cs_precedes : monetary.p_cs_precedes;
        // Assemble symbol/value/sign and possible space as appropriate
        if (flags.indexOf('(') !== -1) {
            // flag: parenth. for negative
            // @todo: unclear on whether and how sepBySpace, signPosn, or csPrecedes have
            // an impact here (as they do below), but assuming for now behaves as signPosn 0 as
            // far as localized sepBySpace and signPosn behavior
            repl = (csPrecedes ? symbol + (sepBySpace === 1 ? ' ' : '') : '') + value + (!csPrecedes ? (sepBySpace === 1 ? ' ' : '') + symbol : '');
            if (neg) {
                repl = '(' + repl + ')';
            }
            else {
                repl = ' ' + repl + ' ';
            }
        }
        else {
            // '+' is default
            // ''
            var posSign = monetary.positive_sign;
            // '-'
            var negSign = monetary.negative_sign;
            var sign = neg ? (negSign) : (posSign);
            var otherSign = neg ? (posSign) : (negSign);
            var signPadding = '';
            if (signPosn) {
                // has a sign
                signPadding = new Array(otherSign.length - sign.length + 1).join(' ');
            }
            var valueAndCS = '';
            switch (signPosn) {
                // 0: parentheses surround value and curr. symbol;
                // 1: sign precedes them;
                // 2: sign follows them;
                // 3: sign immed. precedes curr. symbol; (but may be space between)
                // 4: sign immed. succeeds curr. symbol; (but may be space between)
                case 0:
                    valueAndCS = csPrecedes
                        ? symbol + (sepBySpace === 1 ? ' ' : '') + value
                        : value + (sepBySpace === 1 ? ' ' : '') + symbol;
                    repl = '(' + valueAndCS + ')';
                    break;
                case 1:
                    valueAndCS = csPrecedes
                        ? symbol + (sepBySpace === 1 ? ' ' : '') + value
                        : value + (sepBySpace === 1 ? ' ' : '') + symbol;
                    repl = signPadding + sign + (sepBySpace === 2 ? ' ' : '') + valueAndCS;
                    break;
                case 2:
                    valueAndCS = csPrecedes
                        ? symbol + (sepBySpace === 1 ? ' ' : '') + value
                        : value + (sepBySpace === 1 ? ' ' : '') + symbol;
                    repl = valueAndCS + (sepBySpace === 2 ? ' ' : '') + sign + signPadding;
                    break;
                case 3:
                    repl = csPrecedes
                        ? signPadding + sign + (sepBySpace === 2 ? ' ' : '') + symbol +
                            (sepBySpace === 1 ? ' ' : '') + value
                        : value + (sepBySpace === 1 ? ' ' : '') + sign + signPadding +
                            (sepBySpace === 2 ? ' ' : '') + symbol;
                    break;
                case 4:
                    repl = csPrecedes
                        ? symbol + (sepBySpace === 2 ? ' ' : '') + signPadding + sign +
                            (sepBySpace === 1 ? ' ' : '') + value
                        : value + (sepBySpace === 1 ? ' ' : '') + symbol +
                            (sepBySpace === 2 ? ' ' : '') + sign + signPadding;
                    break;
            }
        }
        var padding = width - repl.length;
        if (padding > 0) {
            padding = new Array(padding + 1).join(' ');
            // @todo: How does p_sep_by_space affect the count if there is a space?
            // Included in count presumably?
            if (flags.indexOf('-') !== -1) {
                // left-justified (pad to right)
                repl += padding;
            }
            else {
                // right-justified (pad to left)
                repl = padding + repl;
            }
        }
        return repl;
    };
    return format.replace(regex, doReplace);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZXlfZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL21vbmV5X2Zvcm1hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLE1BQU0sRUFBRSxNQUFNO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxnRUFBZ0U7SUFDaEUsbURBQW1EO0lBQ25ELDJDQUEyQztJQUMzQywrQkFBK0I7SUFDL0IsbURBQW1EO0lBQ25ELGlDQUFpQztJQUNqQyxvREFBb0Q7SUFDcEQsaUNBQWlDO0lBQ2pDLG9EQUFvRDtJQUNwRCxrQ0FBa0M7SUFDbEMscURBQXFEO0lBQ3JELGtDQUFrQztJQUNsQyxxREFBcUQ7SUFDckQsaUNBQWlDO0lBQ2pDLHNEQUFzRDtJQUN0RCxpQ0FBaUM7SUFDakMscURBQXFEO0lBQ3JELGlDQUFpQztJQUNqQyxzREFBc0Q7SUFDdEQsaUNBQWlDO0lBQ2pDLHNEQUFzRDtJQUN0RCxnQ0FBZ0M7SUFDaEMsdURBQXVEO0lBQ3ZELGdDQUFnQztJQUNoQyxzREFBc0Q7SUFDdEQsZ0NBQWdDO0lBQ2hDLHVEQUF1RDtJQUN2RCxnQ0FBZ0M7SUFDaEMsd0NBQXdDO0lBQ3hDLCtCQUErQjtJQUUvQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUUvQyx1REFBdUQ7SUFDdkQsc0RBQXNEO0lBQ3RELG9FQUFvRTtJQUNwRSwyQkFBMkI7SUFFM0IsbUdBQW1HO0lBQ25HLDhHQUE4RztJQUU5RyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsdURBQXVEO0lBQ3ZELElBQUksS0FBSyxHQUFHLG9EQUFvRCxDQUFBO0lBRWhFLDJDQUEyQztJQUMzQyxT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QUcsVUFBVSxDQUFBO29CQUN0RSxNQUFLO2dCQUNQLEtBQUssQ0FBQztvQkFDSixVQUFVLEdBQUcsVUFBVTt3QkFDckIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSzt3QkFDaEQsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFBO29CQUNsRCxJQUFJLEdBQUcsVUFBVSxHQUFHLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFBO29CQUN0RSxNQUFLO2dCQUNQLEtBQUssQ0FBQztvQkFDSixJQUFJLEdBQUcsVUFBVTt3QkFDZixDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTTs0QkFDM0QsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUs7d0JBQ3ZDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxXQUFXOzRCQUMxRCxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFBO29CQUMxQyxNQUFLO2dCQUNQLEtBQUssQ0FBQztvQkFDSixJQUFJLEdBQUcsVUFBVTt3QkFDZixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEdBQUcsSUFBSTs0QkFDM0QsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUs7d0JBQ3ZDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU07NEJBQzlDLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFBO29CQUN0RCxNQUFLO2FBQ1I7U0FDRjtRQUVELElBQUksT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ2pDLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNmLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzFDLHVFQUF1RTtZQUN2RSxnQ0FBZ0M7WUFDaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM3QixnQ0FBZ0M7Z0JBQ2hDLElBQUksSUFBSSxPQUFPLENBQUE7YUFDaEI7aUJBQU07Z0JBQ0wsZ0NBQWdDO2dCQUNoQyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQTthQUN0QjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDLENBQUE7SUFFRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQSJ9