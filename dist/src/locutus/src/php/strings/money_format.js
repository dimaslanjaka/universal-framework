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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZXlfZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvbW9uZXlfZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsTUFBTSxFQUFFLE1BQU07SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELGdFQUFnRTtJQUNoRSxtREFBbUQ7SUFDbkQsMkNBQTJDO0lBQzNDLCtCQUErQjtJQUMvQixtREFBbUQ7SUFDbkQsaUNBQWlDO0lBQ2pDLG9EQUFvRDtJQUNwRCxpQ0FBaUM7SUFDakMsb0RBQW9EO0lBQ3BELGtDQUFrQztJQUNsQyxxREFBcUQ7SUFDckQsa0NBQWtDO0lBQ2xDLHFEQUFxRDtJQUNyRCxpQ0FBaUM7SUFDakMsc0RBQXNEO0lBQ3RELGlDQUFpQztJQUNqQyxxREFBcUQ7SUFDckQsaUNBQWlDO0lBQ2pDLHNEQUFzRDtJQUN0RCxpQ0FBaUM7SUFDakMsc0RBQXNEO0lBQ3RELGdDQUFnQztJQUNoQyx1REFBdUQ7SUFDdkQsZ0NBQWdDO0lBQ2hDLHNEQUFzRDtJQUN0RCxnQ0FBZ0M7SUFDaEMsdURBQXVEO0lBQ3ZELGdDQUFnQztJQUNoQyx3Q0FBd0M7SUFDeEMsK0JBQStCO0lBRS9CLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBRS9DLHVEQUF1RDtJQUN2RCxzREFBc0Q7SUFDdEQsb0VBQW9FO0lBQ3BFLDJCQUEyQjtJQUUzQixtR0FBbUc7SUFDbkcsOEdBQThHO0lBRTlHLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzlCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCx1REFBdUQ7SUFDdkQsSUFBSSxLQUFLLEdBQUcsb0RBQW9ELENBQUE7SUFFaEUsMkNBQTJD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