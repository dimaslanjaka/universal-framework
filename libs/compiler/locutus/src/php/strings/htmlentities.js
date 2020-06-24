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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbGVudGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2h0bWxlbnRpdGllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVk7SUFDL0Usb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHVCQUF1QjtJQUN2QixvQkFBb0I7SUFDcEIseURBQXlEO0lBQ3pELDJFQUEyRTtJQUMzRSw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELHdCQUF3QjtJQUN4Qiw2REFBNkQ7SUFDN0QscURBQXFEO0lBQ3JELDJDQUEyQztJQUMzQyxvREFBb0Q7SUFDcEQsOEJBQThCO0lBRTlCLElBQUksdUJBQXVCLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUE7SUFDOUUsSUFBSSxPQUFPLEdBQUcsdUJBQXVCLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBRWxFLE1BQU0sR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFM0MsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLFVBQVUsSUFBSSxVQUFVLEtBQUssWUFBWSxFQUFFO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUE7S0FDeEI7SUFFRCxZQUFZLEdBQUcsWUFBWSxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFBO0lBRXRELElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLDZDQUE2QztRQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ1QsK0JBQStCO2FBQzlCLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLEVBQ2xELEdBQUcsQ0FBQyxDQUFBO0lBRU4sT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFVLEdBQUc7UUFDeEMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtTQUN6RDtRQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBIn0=