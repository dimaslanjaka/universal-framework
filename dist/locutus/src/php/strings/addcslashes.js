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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY3NsYXNoZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9hZGRjc2xhc2hlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLEdBQUcsRUFBRSxRQUFRO0lBQ2xELG1EQUFtRDtJQUNuRCxvREFBb0Q7SUFDcEQsc0VBQXNFO0lBQ3RFLCtEQUErRDtJQUMvRCxvREFBb0Q7SUFDcEQsK0hBQStIO0lBQy9ILGtDQUFrQztJQUNsQyx1SEFBdUg7SUFDdkgsOEJBQThCO0lBQzlCLHNMQUFzTDtJQUN0TCwyQ0FBMkM7SUFDM0Msa0xBQWtMO0lBQ2xMLHVCQUF1QjtJQUN2QixtR0FBbUc7SUFDbkcsNEJBQTRCO0lBQzVCLHlHQUF5RztJQUN6Ryw2QkFBNkI7SUFFN0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFBO0lBQ25CLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUNqQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7SUFDYixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDWCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7SUFDbkIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFBO0lBQ3BCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUNYLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixJQUFJLE9BQU8s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