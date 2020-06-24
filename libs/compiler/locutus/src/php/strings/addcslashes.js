module.exports = function addcslashes(str, charlist) {
    //  discuss at: https://locutus.io/php/addcslashes/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: We show double backslashes in the return value example
    //      note 1: code below because a JavaScript string will not
    //      note 1: render them as backslashes otherwise
    //   example 1: addcslashes('foo[ ]', 'A..z'); // Escape all ASCII within capital A to lower z range, including square brackets
    //   returns 1: "\\f\\o\\o\\[ \\]"
    //   example 2: addcslashes("zoo['.']", 'z..A'); // Only escape z, period, and A here since not a lower-to-higher range
    //   returns 2: "\\zoo['\\.']"
    //   _example 3: addcslashes("@a\u0000\u0010\u00A9", "\0..\37!@\177..\377"); // Escape as octals those specified and less than 32 (0x20) or greater than 126 (0x7E), but not otherwise
    //   _returns 3: '\\@a\\000\\020\\302\\251'
    //   _example 4: addcslashes("\u0020\u007E", "\40..\175"); // Those between 32 (0x20 or 040) and 126 (0x7E or 0176) decimal value will be backslashed if specified (not octalized)
    //   _returns 4: '\\ ~'
    //   _example 5: addcslashes("\r\u0007\n", '\0..\37'); // Recognize C escape sequences if specified
    //   _returns 5: "\\r\\a\\n"
    //   _example 6: addcslashes("\r\u0007\n", '\0'); // Do not recognize C escape sequences if not specified
    //   _returns 6: "\r\u0007\n"
    var target = '';
    var chrs = [];
    var i = 0;
    var j = 0;
    var c = '';
    var next = '';
    var rangeBegin = '';
    var rangeEnd = '';
    var chr = '';
    var begin = 0;
    var end = 0;
    var octalLength = 0;
    var postOctalPos = 0;
    var cca = 0;
    var escHexGrp = [];
    var encoded = '';
    var percentHex = /%([\dA-Fa-f]+)/g;
    var _pad = function (n, c) {
        if ((n = n + '').length < c) {
            return new Array(++c - n.length).join('0') + n;
        }
        return n;
    };
    for (i = 0; i < charlist.length; i++) {
        c = charlist.charAt(i);
        next = charlist.charAt(i + 1);
        if (c === '\\' && next && (/\d/).test(next)) {
            // Octal
            rangeBegin = charlist.slice(i + 1).match(/^\d+/)[0];
            octalLength = rangeBegin.length;
            postOctalPos = i + octalLength + 1;
            if (charlist.charAt(postOctalPos) + charlist.charAt(postOctalPos + 1) === '..') {
                // Octal begins range
                begin = rangeBegin.charCodeAt(0);
                if ((/\\\d/).test(charlist.charAt(postOctalPos + 2) + charlist.charAt(postOctalPos + 3))) {
                    // Range ends with octal
                    rangeEnd = charlist.slice(postOctalPos + 3).match(/^\d+/)[0];
                    // Skip range end backslash
                    i += 1;
                }
                else if (charlist.charAt(postOctalPos + 2)) {
                    // Range ends with character
                    rangeEnd = charlist.charAt(postOctalPos + 2);
                }
                else {
                    throw new Error('Range with no end point');
                }
                end = rangeEnd.charCodeAt(0);
                if (end > begin) {
                    // Treat as a range
                    for (j = begin; j <= end; j++) {
                        chrs.push(String.fromCharCode(j));
                    }
                }
                else {
                    // Supposed to treat period, begin and end as individual characters only, not a range
                    chrs.push('.', rangeBegin, rangeEnd);
                }
                // Skip dots and range end (already skipped range end backslash if present)
                i += rangeEnd.length + 2;
            }
            else {
                // Octal is by itself
                chr = String.fromCharCode(parseInt(rangeBegin, 8));
                chrs.push(chr);
            }
            // Skip range begin
            i += octalLength;
        }
        else if (next + charlist.charAt(i + 2) === '..') {
            // Character begins range
            rangeBegin = c;
            begin = rangeBegin.charCodeAt(0);
            if ((/\\\d/).test(charlist.charAt(i + 3) + charlist.charAt(i + 4))) {
                // Range ends with octal
                rangeEnd = charlist.slice(i + 4).match(/^\d+/)[0];
                // Skip range end backslash
                i += 1;
            }
            else if (charlist.charAt(i + 3)) {
                // Range ends with character
                rangeEnd = charlist.charAt(i + 3);
            }
            else {
                throw new Error('Range with no end point');
            }
            end = rangeEnd.charCodeAt(0);
            if (end > begin) {
                // Treat as a range
                for (j = begin; j <= end; j++) {
                    chrs.push(String.fromCharCode(j));
                }
            }
            else {
                // Supposed to treat period, begin and end as individual characters only, not a range
                chrs.push('.', rangeBegin, rangeEnd);
            }
            // Skip dots and range end (already skipped range end backslash if present)
            i += rangeEnd.length + 2;
        }
        else {
            // Character is by itself
            chrs.push(c);
        }
    }
    for (i = 0; i < str.length; i++) {
        c = str.charAt(i);
        if (chrs.indexOf(c) !== -1) {
            target += '\\';
            cca = c.charCodeAt(0);
            if (cca < 32 || cca > 126) {
                // Needs special escaping
                switch (c) {
                    case '\n':
                        target += 'n';
                        break;
                    case '\t':
                        target += 't';
                        break;
                    case '\u000D':
                        target += 'r';
                        break;
                    case '\u0007':
                        target += 'a';
                        break;
                    case '\v':
                        target += 'v';
                        break;
                    case '\b':
                        target += 'b';
                        break;
                    case '\f':
                        target += 'f';
                        break;
                    default:
                        // target += _pad(cca.toString(8), 3);break; // Sufficient for UTF-16
                        encoded = encodeURIComponent(c);
                        // 3-length-padded UTF-8 octets
                        if ((escHexGrp = percentHex.exec(encoded)) !== null) {
                            // already added a slash above:
                            target += _pad(parseInt(escHexGrp[1], 16).toString(8), 3);
                        }
                        while ((escHexGrp = percentHex.exec(encoded)) !== null) {
                            target += '\\' + _pad(parseInt(escHexGrp[1], 16).toString(8), 3);
                        }
                        break;
                }
            }
            else {
                // Perform regular backslashed escaping
                target += c;
            }
        }
        else {
            // Just add the character unescaped
            target += c;
        }
    }
    return target;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY3NsYXNoZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvYWRkY3NsYXNoZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxHQUFHLEVBQUUsUUFBUTtJQUNsRCxtREFBbUQ7SUFDbkQsb0RBQW9EO0lBQ3BELHNFQUFzRTtJQUN0RSwrREFBK0Q7SUFDL0Qsb0RBQW9EO0lBQ3BELCtIQUErSDtJQUMvSCxrQ0FBa0M7SUFDbEMsdUhBQXVIO0lBQ3ZILDhCQUE4QjtJQUM5QixzTEFBc0w7SUFDdEwsMkNBQTJDO0lBQzNDLGtMQUFrTDtJQUNsTCx1QkFBdUI7SUFDdkIsbUdBQW1HO0lBQ25HLDRCQUE0QjtJQUM1Qix5R0FBeUc7SUFDekcsNkJBQTZCO0lBRTdCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQTtJQUNuQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7SUFDakIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0lBQ2IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO0lBQ25CLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQTtJQUNwQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDWCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDbEIsSUFBSSxPQUFPLEdBQUcs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