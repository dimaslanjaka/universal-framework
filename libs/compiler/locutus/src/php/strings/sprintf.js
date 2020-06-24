module.exports = function sprintf() {
    //  discuss at: https://locutus.io/php/sprintf/
    // original by: Ash Searle (https://hexmen.com/blog/)
    // improved by: Michael White (https://getsprink.com)
    // improved by: Jack
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Dj
    // improved by: Allidylls
    //    input by: Paulo Freitas
    //    input by: Brett Zamir (https://brett-zamir.me)
    // improved by: Rafał Kukawski (https://kukawski.pl)
    //   example 1: sprintf("%01.2f", 123.1)
    //   returns 1: '123.10'
    //   example 2: sprintf("[%10s]", 'monkey')
    //   returns 2: '[    monkey]'
    //   example 3: sprintf("[%'#10s]", 'monkey')
    //   returns 3: '[####monkey]'
    //   example 4: sprintf("%d", 123456789012345)
    //   returns 4: '123456789012345'
    //   example 5: sprintf('%-03s', 'E')
    //   returns 5: 'E00'
    //   example 6: sprintf('%+010d', 9)
    //   returns 6: '+000000009'
    //   example 7: sprintf('%+0\'@10d', 9)
    //   returns 7: '@@@@@@@@+9'
    //   example 8: sprintf('%.f', 3.14)
    //   returns 8: '3.140000'
    //   example 9: sprintf('%% %2$d', 1, 2)
    //   returns 9: '% 2'
    var regex = /%%|%(?:(\d+)\$)?((?:[-+#0 ]|'[\s\S])*)(\d+)?(?:\.(\d*))?([\s\S])/g;
    var args = arguments;
    var i = 0;
    var format = args[i++];
    var _pad = function (str, len, chr, leftJustify) {
        if (!chr) {
            chr = ' ';
        }
        var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    };
    var justify = function (value, prefix, leftJustify, minWidth, padChar) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            // when padding with zeros
            // on the left side
            // keep sign (+ or -) in front
            if (!leftJustify && padChar === '0') {
                value = [
                    value.slice(0, prefix.length),
                    _pad('', diff, '0', true),
                    value.slice(prefix.length)
                ].join('');
            }
            else {
                value = _pad(value, minWidth, padChar, leftJustify);
            }
        }
        return value;
    };
    var _formatBaseX = function (value, base, leftJustify, minWidth, precision, padChar) {
        // Note: casts negative numbers to positive ones
        var number = value >>> 0;
        value = _pad(number.toString(base), precision || 0, '0', false);
        return justify(value, '', leftJustify, minWidth, padChar);
    };
    // _formatString()
    var _formatString = function (value, leftJustify, minWidth, precision, customPadChar) {
        if (precision !== null && precision !== undefined) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, customPadChar);
    };
    // doFormat()
    var doFormat = function (substring, argIndex, modifiers, minWidth, precision, specifier) {
        var number, prefix, method, textTransform, value;
        if (substring === '%%') {
            return '%';
        }
        // parse modifiers
        var padChar = ' '; // pad with spaces by default
        var leftJustify = false;
        var positiveNumberPrefix = '';
        var j, l;
        for (j = 0, l = modifiers.length; j < l; j++) {
            switch (modifiers.charAt(j)) {
                case ' ':
                case '0':
                    padChar = modifiers.charAt(j);
                    break;
                case '+':
                    positiveNumberPrefix = '+';
                    break;
                case '-':
                    leftJustify = true;
                    break;
                case "'":
                    if (j + 1 < l) {
                        padChar = modifiers.charAt(j + 1);
                        j++;
                    }
                    break;
            }
        }
        if (!minWidth) {
            minWidth = 0;
        }
        else {
            minWidth = +minWidth;
        }
        if (!isFinite(minWidth)) {
            throw new Error('Width must be finite');
        }
        if (!precision) {
            precision = (specifier === 'd') ? 0 : 'fFeE'.indexOf(specifier) > -1 ? 6 : undefined;
        }
        else {
            precision = +precision;
        }
        if (argIndex && +argIndex === 0) {
            throw new Error('Argument number must be greater than zero');
        }
        if (argIndex && +argIndex >= args.length) {
            throw new Error('Too few arguments');
        }
        value = argIndex ? args[+argIndex] : args[i++];
        switch (specifier) {
            case '%':
                return '%';
            case 's':
                return _formatString(value + '', leftJustify, minWidth, precision, padChar);
            case 'c':
                return _formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, padChar);
            case 'b':
                return _formatBaseX(value, 2, leftJustify, minWidth, precision, padChar);
            case 'o':
                return _formatBaseX(value, 8, leftJustify, minWidth, precision, padChar);
            case 'x':
                return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar);
            case 'X':
                return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar)
                    .toUpperCase();
            case 'u':
                return _formatBaseX(value, 10, leftJustify, minWidth, precision, padChar);
            case 'i':
            case 'd':
                number = +value || 0;
                // Plain Math.round doesn't just truncate
                number = Math.round(number - number % 1);
                prefix = number < 0 ? '-' : positiveNumberPrefix;
                value = prefix + _pad(String(Math.abs(number)), precision, '0', false);
                if (leftJustify && padChar === '0') {
                    // can't right-pad 0s on integers
                    padChar = ' ';
                }
                return justify(value, prefix, leftJustify, minWidth, padChar);
            case 'e':
            case 'E':
            case 'f': // @todo: Should handle locales (as per setlocale)
            case 'F':
            case 'g':
            case 'G':
                number = +value;
                prefix = number < 0 ? '-' : positiveNumberPrefix;
                method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(specifier.toLowerCase())];
                textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(specifier) % 2];
                value = prefix + Math.abs(number)[method](precision);
                return justify(value, prefix, leftJustify, minWidth, padChar)[textTransform]();
            default:
                // unknown specifier, consume that char and return empty
                return '';
        }
    };
    try {
        return format.replace(regex, doFormat);
    }
    catch (err) {
        return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW50Zi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zcHJpbnRmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPO0lBQy9CLCtDQUErQztJQUMvQyxxREFBcUQ7SUFDckQscURBQXFEO0lBQ3JELG9CQUFvQjtJQUNwQixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLDZCQUE2QjtJQUM3QixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHdDQUF3QztJQUN4Qyx3QkFBd0I7SUFDeEIsMkNBQTJDO0lBQzNDLDhCQUE4QjtJQUM5Qiw2Q0FBNkM7SUFDN0MsOEJBQThCO0lBQzlCLDhDQUE4QztJQUM5QyxpQ0FBaUM7SUFDakMscUNBQXFDO0lBQ3JDLHFCQUFxQjtJQUNyQixvQ0FBb0M7SUFDcEMsNEJBQTRCO0lBQzVCLHVDQUF1QztJQUN2Qyw0QkFBNEI7SUFDNUIsb0NBQW9DO0lBQ3BDLDBCQUEwQjtJQUMxQix3Q0FBd0M7SUFDeEMscUJBQXFCO0lBRXJCLElBQUksS0FBSyxHQUFHLG1FQUFtRSxDQUFBO0lBQy9FLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQTtJQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUV0QixJQUFJLElBQUksR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVc7UUFDN0MsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLEdBQUcsR0FBRyxHQUFHLENBQUE7U0FDVjtRQUNELElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFB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