module.exports = function htmlspecialchars(string, quoteStyle, charset, doubleEncode) {
    //       discuss at: https://locutus.io/php/htmlspecialchars/
    //      original by: Mirek Slugen
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Nathan
    //      bugfixed by: Arno
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //       revised by: Kevin van Zonneveld (https://kvz.io)
    //         input by: Ratheous
    //         input by: Mailfaker (https://www.weedem.fr/)
    //         input by: felix
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //           note 1: charset argument not supported
    //        example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES')
    //        returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
    //        example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES'])
    //        returns 2: 'ab"c&#039;d'
    //        example 3: htmlspecialchars('my "&entity;" is still here', null, null, false)
    //        returns 3: 'my &quot;&entity;&quot; is still here'
    var optTemp = 0;
    var i = 0;
    var noquotes = false;
    if (typeof quoteStyle === 'undefined' || quoteStyle === null) {
        quoteStyle = 2;
    }
    string = string || '';
    string = string.toString();
    if (doubleEncode !== false) {
        // Put this first to avoid double-encoding
        string = string.replace(/&/g, '&amp;');
    }
    string = string
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quoteStyle === 0) {
        noquotes = true;
    }
    if (typeof quoteStyle !== 'number') {
        // Allow for a single string or an array of string flags
        quoteStyle = [].concat(quoteStyle);
        for (i = 0; i < quoteStyle.length; i++) {
            // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
            if (OPTS[quoteStyle[i]] === 0) {
                noquotes = true;
            }
            else if (OPTS[quoteStyle[i]]) {
                optTemp = optTemp | OPTS[quoteStyle[i]];
            }
        }
        quoteStyle = optTemp;
    }
    if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/'/g, '&#039;');
    }
    if (!noquotes) {
        string = string.replace(/"/g, '&quot;');
    }
    return string;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHNwZWNpYWxjaGFycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9odG1sc3BlY2lhbGNoYXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZO0lBQ25GLDZEQUE2RDtJQUM3RCxpQ0FBaUM7SUFDakMseURBQXlEO0lBQ3pELDJCQUEyQjtJQUMzQix5QkFBeUI7SUFDekIseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsNkJBQTZCO0lBQzdCLHVEQUF1RDtJQUN2RCwwQkFBMEI7SUFDMUIseURBQXlEO0lBQ3pELG1EQUFtRDtJQUNuRCw4RUFBOEU7SUFDOUUsb0VBQW9FO0lBQ3BFLGdGQUFnRjtJQUNoRixrQ0FBa0M7SUFDbEMsdUZBQXVGO0lBQ3ZGLDREQUE0RDtJQUU1RCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUE7SUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7SUFDcEIsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtRQUM1RCxVQUFVLEdBQUcsQ0FBQyxDQUFBO0tBQ2Y7SUFDRCxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQTtJQUNyQixNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBRTFCLElBQUksWUFBWSxLQUFLLEtBQUssRUFBRTtRQUMxQiwwQ0FBMEM7UUFDMUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0tBQ3ZDO0lBRUQsTUFBTSxHQUFHLE1BQU07U0FDWixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztTQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRXhCLElBQUksSUFBSSxHQUFHO1FBQ1QsY0FBYyxFQUFFLENBQUM7UUFDakIsdUJBQXVCLEVBQUUsQ0FBQztRQUMxQix1QkFBdUIsRUFBRSxDQUFDO1FBQzFCLFlBQVksRUFBRSxDQUFDO1FBQ2YsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUsQ0FBQztLQUNoQixDQUFBO0lBQ0QsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLFFBQVEsR0FBRyxJQUFJLENBQUE7S0FDaEI7SUFDRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNsQyx3REFBd0Q7UUFDeEQsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLDhEQUE4RDtZQUM5RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLFFBQVEsR0FBRyxJQUFJLENBQUE7YUFDaEI7aUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3hDO1NBQ0Y7UUFDRCxVQUFVLEdBQUcsT0FBTyxDQUFBO0tBQ3JCO0lBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1FBQzNDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUN4QztJQUNELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDeEM7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9