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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NjYW5mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3NzY2FuZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLEdBQUcsRUFBRSxNQUFNO0lBQzNDLDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQsNkNBQTZDO0lBQzdDLHlCQUF5QjtJQUN6Qiw4QkFBOEI7SUFDOUIsb0RBQW9EO0lBQ3BELHlDQUF5QztJQUN6Qyx1QkFBdUI7SUFDdkIsb0ZBQW9GO0lBQ3BGLHdCQUF3QjtJQUV4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7SUFDZixJQUFJLElBQUksR0FBRyxTQUFTLENBQUE7SUFDcEIsSUFBSSxLQUFLLENBQUE7SUFFVCxJQUFJLHdCQUF3QixHQUFHLFVBQVUsTUFBTTtRQUM3Qyw2REFBNkQ7UUFDN0QsaUNBQWlDO1FBQ2pDLGtGQUFrRjtRQUNsRix1QkFBdUI7UUFDdkIsZ0ZBQWdGO1FBQ2hGLDZCQUE2QjtRQUM3QixxQ0FBcUM7UUFDckMsNkVBQTZFO1FBQzdFLHNDQUFzQztRQUN0QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzNELHNFQUFzRTtRQUN0RSxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUE7WUFDekIsT0FBTyxJQUFJLEVBQUUsRUFBRTtnQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2xCO1NBQ0Y7UUFDRCxPQUFPLE9BQU8sRUFBRSxDQUFBO0lBQ2xCLENBQUMsQ0FBQTtJQUVELElBQUksT0FBTyxHQUFHO1FBQ1osSUFBSSxJQUFJLENBQUMs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