module.exports = function htmlentities(string, quoteStyle, charset, doubleEncode) {
    //  discuss at: https://locutus.io/php/htmlentities/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //  revised by: Kevin van Zonneveld (https://kvz.io)
    //  revised by: Kevin van Zonneveld (https://kvz.io)
    // improved by: nobbler
    // improved by: Jack
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    // improved by: Dj (https://locutus.io/php/htmlentities:425#comment_134018)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //    input by: Ratheous
    //      note 1: function is compatible with PHP 5.2 and older
    //   example 1: htmlentities('Kevin & van Zonneveld')
    //   returns 1: 'Kevin &amp; van Zonneveld'
    //   example 2: htmlentities("foo'bar","ENT_QUOTES")
    //   returns 2: 'foo&#039;bar'
    var getHtmlTranslationTable = require('../strings/get_html_translation_table');
    var hashMap = getHtmlTranslationTable('HTML_ENTITIES', quoteStyle);
    string = string === null ? '' : string + '';
    if (!hashMap) {
        return false;
    }
    if (quoteStyle && quoteStyle === 'ENT_QUOTES') {
        hashMap["'"] = '&#039;';
    }
    doubleEncode = doubleEncode === null || !!doubleEncode;
    var regex = new RegExp('&(?:#\\d+|#x[\\da-f]+|[a-zA-Z][\\da-z]*);|[' +
        Object.keys(hashMap)
            .join('')
            // replace regexp special chars
            .replace(/([()[\]{}\-.*+?^$|/\\])/g, '\\$1') + ']', 'g');
    return string.replace(regex, function (ent) {
        if (ent.length > 1) {
            return doubleEncode ? hashMap['&'] + ent.substr(1) : ent;
        }
        return hashMap[ent];
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbGVudGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvaHRtbGVudGl0aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWTtJQUMvRSxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsdUJBQXVCO0lBQ3ZCLG9CQUFvQjtJQUNwQix5REFBeUQ7SUFDekQsMkVBQTJFO0lBQzNFLDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsd0JBQXdCO0lBQ3hCLDZEQUE2RDtJQUM3RCxxREFBcUQ7SUFDckQsMkNBQTJDO0lBQzNDLG9EQUFvRDtJQUNwRCw4QkFBOEI7SUFFOUIsSUFBSSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtJQUM5RSxJQUFJLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFFbEUsTUFBTSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUUzQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUksVUFBVSxJQUFJLFVBQVUsS0FBSyxZQUFZLEVBQUU7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtLQUN4QjtJQUVELFlBQVksR0FBRyxZQUFZLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUE7SUFFdEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsNkNBQTZDO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDVCwrQkFBK0I7YUFDOUIsT0FBTyxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFDbEQsR0FBRyxDQUFDLENBQUE7SUFFTixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsR0FBRztRQUN4QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO1NBQ3pEO1FBRUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUEifQ==