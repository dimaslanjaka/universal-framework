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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHNwZWNpYWxjaGFyc19kZWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvaHRtbHNwZWNpYWxjaGFyc19kZWNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLHVCQUF1QixDQUFFLE1BQU0sRUFBRSxVQUFVO0lBQ25FLG9FQUFvRTtJQUNwRSxpQ0FBaUM7SUFDakMseURBQXlEO0lBQ3pELCtDQUErQztJQUMvQyxtRUFBbUU7SUFDbkUseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCxrQ0FBa0M7SUFDbEMsc0NBQXNDO0lBQ3RDLGlDQUFpQztJQUNqQyw2QkFBNkI7SUFDN0IsNkJBQTZCO0lBQzdCLHVEQUF1RDtJQUN2RCx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHdGQUF3RjtJQUN4Riw0Q0FBNEM7SUFDNUMsMERBQTBEO0lBQzFELDZCQUE2QjtJQUU3QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUE7SUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7SUFFcEIsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLEVBQUU7UUFDckMsVUFBVSxHQUFHLENBQUMsQ0FBQTtLQUNmO0lBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7U0FDdkIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7U0FDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN4QixJQUFJLElBQUksR0FBRztRQUNULGNBQWMsRUFBRSxDQUFDO1FBQ2pCLHVCQUF1QixFQUFFLENBQUM7UUFDMUIsdUJBQXVCLEVBQUUsQ0FBQztRQUMxQixZQUFZLEVBQUUsQ0FBQztRQUNmLFlBQVksRUFBRSxDQUFDO1FBQ2YsWUFBWSxFQUFFLENBQUM7S0FDaEIsQ0FBQTtJQUNELElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtRQUNwQixRQUFRLEdBQUcsSUFBSSxDQUFBO0tBQ2hCO0lBQ0QsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDbEMsd0RBQXdEO1FBQ3hELFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxzRUFBc0U7WUFDdEUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM3QixRQUFRLEdBQUcsSUFBSSxDQUFBO2FBQ2hCO2lCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUN4QztTQUNGO1FBQ0QsVUFBVSxHQUFHLE9BQU8sQ0FBQTtLQUNyQjtJQUNELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtRQUMzQyxrRUFBa0U7UUFDbEUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3hDLHlEQUF5RDtRQUN6RCxvREFBb0Q7S0FDckQ7SUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0tBQ3hDO0lBQ0QsOERBQThEO0lBQzlELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUV0QyxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9