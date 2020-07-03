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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW50Zi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3NwcmludGYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU87SUFDL0IsK0NBQStDO0lBQy9DLHFEQUFxRDtJQUNyRCxxREFBcUQ7SUFDckQsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsNkJBQTZCO0lBQzdCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0NBQXdDO0lBQ3hDLHdCQUF3QjtJQUN4QiwyQ0FBMkM7SUFDM0MsOEJBQThCO0lBQzlCLDZDQUE2QztJQUM3Qyw4QkFBOEI7SUFDOUIsOENBQThDO0lBQzlDLGlDQUFpQztJQUNqQyxxQ0FBcUM7SUFDckMscUJBQXFCO0lBQ3JCLG9DQUFvQztJQUNwQyw0QkFBNEI7SUFDNUIsdUNBQXVDO0lBQ3ZDLDRCQUE0QjtJQUM1QixvQ0FBb0M7SUFDcEMsMEJBQTBCO0lBQzFCLHdDQUF3QztJQUN4QyxxQkFBcUI7SUFFckIsSUFBSSxLQUFLLEdBQUcsbUVBQW1FLENBQUE7SUFDL0UsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFBO0lBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRXRCLElBQUksSUFBSSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVztRQUM3QyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsR0FBRyxHQUFHLEdBQUcsQ0FBQTtTQUNWO1FBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FB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