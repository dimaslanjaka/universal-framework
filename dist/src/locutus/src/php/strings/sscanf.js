module.exports = function sscanf(str, format) {
    //  discuss at: https://locutus.io/php/sscanf/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: sscanf('SN/2350001', 'SN/%d')
    //   returns 1: [2350001]
    //   example 2: var myVar = {}
    //   example 2: sscanf('SN/2350001', 'SN/%d', myVar)
    //   example 2: var $result = myVar.value
    //   returns 2: 2350001
    //   example 3: sscanf("10--20", "%2$d--%1$d") // Must escape '$' in PHP, but not JS
    //   returns 3: [20, 10]
    var retArr = [];
    var _NWS = /\S/;
    var args = arguments;
    var digit;
    var _setExtraConversionSpecs = function (offset) {
        // Since a mismatched character sets us off track from future
        // legitimate finds, we just scan
        // to the end for any other conversion specifications (besides a percent literal),
        // setting them to null
        // sscanf seems to disallow all conversion specification components (of sprintf)
        // except for type specifiers
        // Do not allow % in last char. class
        // var matches = format.match(/%[+-]?([ 0]|'.)?-?\d*(\.\d+)?[bcdeufFosxX]/g);
        // Do not allow % in last char. class:
        var matches = format.slice(offset).match(/%[cdeEufgosxX]/g);
        // b, F,G give errors in PHP, but 'g', though also disallowed, doesn't
        if (matches) {
            var lgth = matches.length;
            while (lgth--) {
                retArr.push(null);
            }
        }
        return _finish();
    };
    var _finish = function () {
        if (args.length === 2) {
            return retArr;
        }
        for (var i = 0; i < retArr.length; ++i) {
            args[i + 2].value = retArr[i];
        }
        return i;
    };
    var _addNext = function (j, regex, cb) {
        if (assign) {
            var remaining = str.slice(j);
            var check = width ? remaining.substr(0, width) : remaining;
            var match = regex.exec(check);
            // @todo: Make this more readable
            var key = digit !== undefined
                ? digit
                : retArr.length;
            var testNull = retArr[key] = match
                ? (cb
                    ? cb.apply(null, match)
                    : match[0])
                : null;
            if (testNull === null) {
                throw new Error('No match in string');
            }
            return j + match[0].length;
        }
        return j;
    };
    if (arguments.length < 2) {
        throw new Error('Not enough arguments passed to sscanf');
    }
    // PROCESS
    for (var i = 0, j = 0; i < format.length; i++) {
        var width = 0;
        var assign = true;
        if (format.charAt(i) === '%') {
            if (format.charAt(i + 1) === '%') {
                if (str.charAt(j) === '%') {
                    // a matched percent literal
                    // skip beyond duplicated percent
                    ++i;
                    ++j;
                    continue;
                }
                // Format indicated a percent literal, but not actually present
                return _setExtraConversionSpecs(i + 2);
            }
            // CHARACTER FOLLOWING PERCENT IS NOT A PERCENT
            // We need 'g' set to get lastIndex
            var prePattern = new RegExp('^(?:(\\d+)\\$)?(\\*)?(\\d*)([hlL]?)', 'g');
            var preConvs = prePattern.exec(format.slice(i + 1));
            var tmpDigit = digit;
            if (tmpDigit && preConvs[1] === undefined) {
                var msg = 'All groups in sscanf() must be expressed as numeric if ';
                msg += 'any have already been used';
                throw new Error(msg);
            }
            digit = preConvs[1] ? parseInt(preConvs[1], 10) - 1 : undefined;
            assign = !preConvs[2];
            width = parseInt(preConvs[3], 10);
            var sizeCode = preConvs[4];
            i += prePattern.lastIndex;
            // @todo: Does PHP do anything with these? Seems not to matter
            if (sizeCode) {
                // This would need to be processed later
                switch (sizeCode) {
                    case 'h':
                    case 'l':
                    case 'L':
                        // Treats subsequent as short int (for d,i,n) or unsigned short int (for o,u,x)
                        // Treats subsequent as long int (for d,i,n), or unsigned long int (for o,u,x);
                        //    or as double (for e,f,g) instead of float or wchar_t instead of char
                        // Treats subsequent as long double (for e,f,g)
                        break;
                    default:
                        throw new Error('Unexpected size specifier in sscanf()!');
                }
            }
            // PROCESS CHARACTER
            try {
                // For detailed explanations, see https://web.archive.org/web/20031128125047/https://www.uwm.edu/cgi-bin/IMT/wwwman?topic=scanf%283%29&msection=
                // Also https://www.mathworks.com/access/helpdesk/help/techdoc/ref/sscanf.html
                // p, S, C arguments in C function not available
                // DOCUMENTED UNDER SSCANF
                switch (format.charAt(i + 1)) {
                    case 'F':
                        // Not supported in PHP sscanf; the argument is treated as a float, and
                        //  presented as a floating-point number (non-locale aware)
                        // sscanf doesn't support locales, so no need for two (see %f)
                        break;
                    case 'g':
                        // Not supported in PHP sscanf; shorter of %e and %f
                        // Irrelevant to input conversion
                        break;
                    case 'G':
                        // Not supported in PHP sscanf; shorter of %E and %f
                        // Irrelevant to input conversion
                        break;
                    case 'b':
                        // Not supported in PHP sscanf; the argument is treated as an integer,
                        // and presented as a binary number
                        // Not supported - couldn't distinguish from other integers
                        break;
                    case 'i':
                        // Integer with base detection (Equivalent of 'd', but base 0 instead of 10)
                        var pattern = /([+-])?(?:(?:0x([\da-fA-F]+))|(?:0([0-7]+))|(\d+))/;
                        j = _addNext(j, pattern, function (num, sign, hex, oct, dec) {
                            return hex ? parseInt(num, 16) : oct ? parseInt(num, 8) : parseInt(num, 10);
                        });
                        break;
                    case 'n':
                        // Number of characters processed so far
                        retArr[digit !== undefined ? digit : retArr.length - 1] = j;
                        break;
                    // DOCUMENTED UNDER SPRINTF
                    case 'c':
                        // Get character; suppresses skipping over whitespace!
                        // (but shouldn't be whitespace in format anyways, so no difference here)
                        // Non-greedy match
                        j = _addNext(j, new RegExp('.{1,' + (width || 1) + '}'));
                        break;
                    case 'D':
                    case 'd':
                        // sscanf documented decimal number; equivalent of 'd';
                        // Optionally signed decimal integer
                        j = _addNext(j, /([+-])?(?:0*)(\d+)/, function (num, sign, dec) {
                            // Ignores initial zeroes, unlike %i and parseInt()
                            var decInt = parseInt((sign || '') + dec, 10);
                            if (decInt < 0) {
                                // PHP also won't allow less than -2147483648
                                // integer overflow with negative
                                return decInt < -2147483648 ? -2147483648 : decInt;
                            }
                            else {
                                // PHP also won't allow greater than -2147483647
                                return decInt < 2147483647 ? decInt : 2147483647;
                            }
                        });
                        break;
                    case 'f':
                    case 'E':
                    case 'e':
                        // Although sscanf doesn't support locales,
                        // this is used instead of '%F'; seems to be same as %e
                        // These don't discriminate here as both allow exponential float of either case
                        j = _addNext(j, /([+-])?(?:0*)(\d*\.?\d*(?:[eE]?\d+)?)/, function (num, sign, dec) {
                            if (dec === '.') {
                                return null;
                            }
                            // Ignores initial zeroes, unlike %i and parseFloat()
                            return parseFloat((sign || '') + dec);
                        });
                        break;
                    case 'u':
                        // unsigned decimal integer
                        // We won't deal with integer overflows due to signs
                        j = _addNext(j, /([+-])?(?:0*)(\d+)/, function (num, sign, dec) {
                            // Ignores initial zeroes, unlike %i and parseInt()
                            var decInt = parseInt(dec, 10);
                            if (sign === '-') {
                                // PHP also won't allow greater than 4294967295
                                // integer overflow with negative
                                return 4294967296 - decInt;
                            }
                            else {
                                return decInt < 4294967295 ? decInt : 4294967295;
                            }
                        });
                        break;
                    case 'o':
                        // Octal integer // @todo: add overflows as above?
                        j = _addNext(j, /([+-])?(?:0([0-7]+))/, function (num, sign, oct) {
                            return parseInt(num, 8);
                        });
                        break;
                    case 's':
                        // Greedy match
                        j = _addNext(j, /\S+/);
                        break;
                    case 'X':
                    case 'x':
                        // Same as 'x'?
                        // @todo: add overflows as above?
                        // Initial 0x not necessary here
                        j = _addNext(j, /([+-])?(?:(?:0x)?([\da-fA-F]+))/, function (num, sign, hex) {
                            return parseInt(num, 16);
                        });
                        break;
                    case '':
                        // If no character left in expression
                        throw new Error('Missing character after percent mark in sscanf() format argument');
                    default:
                        throw new Error('Unrecognized character after percent mark in sscanf() format argument');
                }
            }
            catch (e) {
                if (e === 'No match in string') {
                    // Allow us to exit
                    return _setExtraConversionSpecs(i + 2);
                }
                // Calculate skipping beyond initial percent too
            }
            ++i;
        }
        else if (format.charAt(i) !== str.charAt(j)) {
            // @todo: Double-check i whitespace ignored in string and/or formats
            _NWS.lastIndex = 0;
            if ((_NWS)
                .test(str.charAt(j)) || str.charAt(j) === '') {
                // Whitespace doesn't need to be an exact match)
                return _setExtraConversionSpecs(i + 1);
            }
            else {
                // Adjust strings when encounter non-matching whitespace,
                // so they align in future checks above
                // Ok to replace with j++;?
                str = str.slice(0, j) + str.slice(j + 1);
                i--;
            }
        }
        else {
            j++;
        }
    }
    // POST-PROCESSING
    return _finish();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NjYW5mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3NjYW5mLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsR0FBRyxFQUFFLE1BQU07SUFDM0MsOENBQThDO0lBQzlDLG9EQUFvRDtJQUNwRCw2Q0FBNkM7SUFDN0MseUJBQXlCO0lBQ3pCLDhCQUE4QjtJQUM5QixvREFBb0Q7SUFDcEQseUNBQXlDO0lBQ3pDLHVCQUF1QjtJQUN2QixvRkFBb0Y7SUFDcEYsd0JBQXdCO0lBRXhCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQTtJQUNwQixJQUFJLEtBQUssQ0FBQTtJQUVULElBQUksd0JBQXdCLEdBQUcsVUFBVSxNQUFNO1FBQzdDLDZEQUE2RDtRQUM3RCxpQ0FBaUM7UUFDakMsa0ZBQWtGO1FBQ2xGLHVCQUF1QjtRQUN2QixnRkFBZ0Y7UUFDaEYsNkJBQTZCO1FBQzdCLHFDQUFxQztRQUNyQyw2RUFBNkU7UUFDN0Usc0NBQXNDO1FBQ3RDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDM0Qsc0VBQXNFO1FBQ3RFLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQTtZQUN6QixPQUFPLElBQUksRUFBRSxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDbEI7U0FDRjtRQUNELE9BQU8sT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQyxDQUFBO0lBRUQsSUFBSSxPQUFPLEdBQUc7UUFDWixJQUFJLElB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