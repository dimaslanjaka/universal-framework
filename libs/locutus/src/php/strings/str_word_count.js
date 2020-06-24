module.exports = function str_word_count(str, format, charlist) {
    //  discuss at: https://locutus.io/php/str_word_count/
    // original by: Ole Vrijenhoek
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //    input by: Bug?
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1)
    //   returns 1: ['Hello', 'fri', 'nd', "you're", 'looking', 'good', 'today']
    //   example 2: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 2)
    //   returns 2: {0: 'Hello', 6: 'fri', 10: 'nd', 14: "you're", 29: 'looking', 46: 'good', 51: 'today'}
    //   example 3: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1, '\u00e0\u00e1\u00e3\u00e73')
    //   returns 3: ['Hello', 'fri3nd', "you're", 'looking', 'good', 'today']
    //   example 4: str_word_count('hey', 2)
    //   returns 4: {0: 'hey'}
    var ctypeAlpha = require('../ctype/ctype_alpha');
    var len = str.length;
    var cl = charlist && charlist.length;
    var chr = '';
    var tmpStr = '';
    var i = 0;
    var c = '';
    var wArr = [];
    var wC = 0;
    var assoc = {};
    var aC = 0;
    var reg = '';
    var match = false;
    var _pregQuote = function (str) {
        return (str + '').replace(/([\\.+*?[^\]$(){}=!<>|:])/g, '\\$1');
    };
    var _getWholeChar = function (str, i) {
        // Use for rare cases of non-BMP characters
        var code = str.charCodeAt(i);
        if (code < 0xD800 || code > 0xDFFF) {
            return str.charAt(i);
        }
        if (code >= 0xD800 && code <= 0xDBFF) {
            // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single
            // characters)
            if (str.length <= (i + 1)) {
                throw new Error('High surrogate without following low surrogate');
            }
            var next = str.charCodeAt(i + 1);
            if (next < 0xDC00 || next > 0xDFFF) {
                throw new Error('High surrogate without following low surrogate');
            }
            return str.charAt(i) + str.charAt(i + 1);
        }
        // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
        if (i === 0) {
            throw new Error('Low surrogate without preceding high surrogate');
        }
        var prev = str.charCodeAt(i - 1);
        if (prev < 0xD800 || prev > 0xDBFF) {
            // (could change last hex to 0xDB7F to treat high private surrogates as single characters)
            throw new Error('Low surrogate without preceding high surrogate');
        }
        // We can pass over low surrogates now as the second component in a pair which we have already
        // processed
        return false;
    };
    if (cl) {
        reg = '^(' + _pregQuote(_getWholeChar(charlist, 0));
        for (i = 1; i < cl; i++) {
            if ((chr = _getWholeChar(charlist, i)) === false) {
                continue;
            }
            reg += '|' + _pregQuote(chr);
        }
        reg += ')$';
        reg = new RegExp(reg);
    }
    for (i = 0; i < len; i++) {
        if ((c = _getWholeChar(str, i)) === false) {
            continue;
        }
        // No hyphen at beginning or end unless allowed in charlist (or locale)
        // No apostrophe at beginning unless allowed in charlist (or locale)
        // @todo: Make this more readable
        match = ctypeAlpha(c) ||
            (reg && c.search(reg) !== -1) ||
            ((i !== 0 && i !== len - 1) && c === '-') ||
            (i !== 0 && c === "'");
        if (match) {
            if (tmpStr === '' && format === 2) {
                aC = i;
            }
            tmpStr = tmpStr + c;
        }
        if (i === len - 1 || !match && tmpStr !== '') {
            if (format !== 2) {
                wArr[wArr.length] = tmpStr;
            }
            else {
                assoc[aC] = tmpStr;
            }
            tmpStr = '';
            wC++;
        }
    }
    if (!format) {
        return wC;
    }
    else if (format === 1) {
        return wArr;
    }
    else if (format === 2) {
        return assoc;
    }
    throw new Error('You have supplied an incorrect format');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3dvcmRfY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RyX3dvcmRfY291bnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVE7SUFDN0Qsc0RBQXNEO0lBQ3RELDhCQUE4QjtJQUM5QixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvQkFBb0I7SUFDcEIsb0RBQW9EO0lBQ3BELGdHQUFnRztJQUNoRyw0RUFBNEU7SUFDNUUsZ0dBQWdHO0lBQ2hHLHNHQUFzRztJQUN0Ryw2SEFBNkg7SUFDN0gseUVBQXlFO0lBQ3pFLHdDQUF3QztJQUN4QywwQkFBMEI7SUFFMUIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDaEQsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUNwQixJQUFJLEVBQUUsR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQTtJQUNwQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFDYixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDVixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDVixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUE7SUFFakIsSUFBSSxVQUFVLEdBQUcsVUFBVSxHQUFHO1FBQzVCLE9BQU8sQ0FBQyxH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