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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHNwZWNpYWxjaGFycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2h0bWxzcGVjaWFsY2hhcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGdCQUFnQixDQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVk7SUFDbkYsNkRBQTZEO0lBQzdELGlDQUFpQztJQUNqQyx5REFBeUQ7SUFDekQsMkJBQTJCO0lBQzNCLHlCQUF5QjtJQUN6Qix5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCw2QkFBNkI7SUFDN0IsdURBQXVEO0lBQ3ZELDBCQUEwQjtJQUMxQix5REFBeUQ7SUFDekQsbURBQW1EO0lBQ25ELDhFQUE4RTtJQUM5RSxvRUFBb0U7SUFDcEUsZ0ZBQWdGO0lBQ2hGLGtDQUFrQztJQUNsQyx1RkFBdUY7SUFDdkYsNERBQTREO0lBRTVELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQTtJQUNwQixJQUFJLE9BQU8sVUFBVSxLQUFLLFdBQVcsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQzVELFVBQVUsR0FBRyxDQUFDLENBQUE7S0FDZjtJQUNELE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFBO0lBQ3JCLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7SUFFMUIsSUFBSSxZQUFZLEtBQUssS0FBSyxFQUFFO1FBQzFCLDBDQUEwQztRQUMxQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7S0FDdkM7SUFFRCxNQUFNLEdBQUcsTUFBTTtTQUNaLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFeEIsSUFBSSxJQUFJLEdBQUc7UUFDVCxjQUFjLEVBQUUsQ0FBQztRQUNqQix1QkFBdUIsRUFBRSxDQUFDO1FBQzFCLHVCQUF1QixFQUFFLENBQUM7UUFDMUIsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUsQ0FBQztRQUNmLFlBQVksRUFBRSxDQUFDO0tBQ2hCLENBQUE7SUFDRCxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7UUFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQTtLQUNoQjtJQUNELElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQ2xDLHdEQUF3RDtRQUN4RCxVQUFVLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsOERBQThEO1lBQzlELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDN0IsUUFBUSxHQUFHLElBQUksQ0FBQTthQUNoQjtpQkFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDeEM7U0FDRjtRQUNELFVBQVUsR0FBRyxPQUFPLENBQUE7S0FDckI7SUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUU7UUFDM0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0tBQ3hDO0lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUN4QztJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=