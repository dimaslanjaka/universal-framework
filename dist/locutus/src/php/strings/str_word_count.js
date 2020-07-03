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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3dvcmRfY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJfd29yZF9jb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUTtJQUM3RCxzREFBc0Q7SUFDdEQsOEJBQThCO0lBQzlCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9CQUFvQjtJQUNwQixvREFBb0Q7SUFDcEQsZ0dBQWdHO0lBQ2hHLDRFQUE0RTtJQUM1RSxnR0FBZ0c7SUFDaEcsc0dBQXNHO0lBQ3RHLDZIQUE2SDtJQUM3SCx5RUFBeUU7SUFDekUsd0NBQXdDO0lBQ3hDLDBCQUEwQjtJQUUxQixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUNoRCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ3BCLElBQUksRUFBRSxHQUFHLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQ3BDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNWLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNkLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNWLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUVqQixJQUFJLFVBQVUsR0FBRyxVQUFVLEdBQUc7UUFDNUIsT0FB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