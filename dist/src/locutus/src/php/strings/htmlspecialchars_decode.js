module.exports = function htmlspecialchars_decode(string, quoteStyle) {
    //       discuss at: https://locutus.io/php/htmlspecialchars_decode/
    //      original by: Mirek Slugen
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Mateusz "loonquawl" Zalega
    //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //         input by: ReverseSyntax
    //         input by: Slawomir Kaniecki
    //         input by: Scott Cariss
    //         input by: Francois
    //         input by: Ratheous
    //         input by: Mailfaker (https://www.weedem.fr/)
    //       revised by: Kevin van Zonneveld (https://kvz.io)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //        example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES')
    //        returns 1: '<p>this -> &quot;</p>'
    //        example 2: htmlspecialchars_decode("&amp;quot;")
    //        returns 2: '&quot;'
    var optTemp = 0;
    var i = 0;
    var noquotes = false;
    if (typeof quoteStyle === 'undefined') {
        quoteStyle = 2;
    }
    string = string.toString()
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
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
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
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
        // PHP doesn't currently escape if more than one 0, but it should:
        string = string.replace(/&#0*39;/g, "'");
        // This would also be useful here, but not a part of PHP:
        // string = string.replace(/&apos;|&#x0*27;/g, "'");
    }
    if (!noquotes) {
        string = string.replace(/&quot;/g, '"');
    }
    // Put this in last place to avoid escape being double-decoded
    string = string.replace(/&amp;/g, '&');
    return string;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHNwZWNpYWxjaGFyc19kZWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9odG1sc3BlY2lhbGNoYXJzX2RlY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsdUJBQXVCLENBQUUsTUFBTSxFQUFFLFVBQVU7SUFDbkUsb0VBQW9FO0lBQ3BFLGlDQUFpQztJQUNqQyx5REFBeUQ7SUFDekQsK0NBQStDO0lBQy9DLG1FQUFtRTtJQUNuRSx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELGtDQUFrQztJQUNsQyxzQ0FBc0M7SUFDdEMsaUNBQWlDO0lBQ2pDLDZCQUE2QjtJQUM3Qiw2QkFBNkI7SUFDN0IsdURBQXVEO0lBQ3ZELHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsd0ZBQXdGO0lBQ3hGLDRDQUE0QztJQUM1QywwREFBMEQ7SUFDMUQsNkJBQTZCO0lBRTdCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQTtJQUVwQixJQUFJLE9BQU8sVUFBVSxLQUFLLFdBQVcsRUFBRTtRQUNyQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO0tBQ2Y7SUFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRTtTQUN2QixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztTQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3hCLElBQUksSUFBSSxHQUFHO1FBQ1QsY0FBYyxFQUFFLENBQUM7UUFDakIsdUJBQXVCLEVBQUUsQ0FBQztRQUMxQix1QkFBdUIsRUFBRSxDQUFDO1FBQzFCLFlBQVksRUFBRSxDQUFDO1FBQ2YsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUsQ0FBQztLQUNoQixDQUFBO0lBQ0QsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLFFBQVEsR0FBRyxJQUFJLENBQUE7S0FDaEI7SUFDRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNsQyx3REFBd0Q7UUFDeEQsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLHNFQUFzRTtZQUN0RSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLFFBQVEsR0FBRyxJQUFJLENBQUE7YUFDaEI7aUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3hDO1NBQ0Y7UUFDRCxVQUFVLEdBQUcsT0FBTyxDQUFBO0tBQ3JCO0lBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1FBQzNDLGtFQUFrRTtRQUNsRSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDeEMseURBQXlEO1FBQ3pELG9EQUFvRDtLQUNyRDtJQUNELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDeEM7SUFDRCw4REFBOEQ7SUFDOUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRXRDLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=