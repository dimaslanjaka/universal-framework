module.exports = function html_entity_decode(string, quoteStyle) {
    //  discuss at: https://locutus.io/php/html_entity_decode/
    // original by: john (https://www.jd-tech.net)
    //    input by: ger
    //    input by: Ratheous
    //    input by: Nick Kolosov (https://sammy.ru)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: marc andreu
    //  revised by: Kevin van Zonneveld (https://kvz.io)
    //  revised by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Fox
    //   example 1: html_entity_decode('Kevin &amp; van Zonneveld')
    //   returns 1: 'Kevin & van Zonneveld'
    //   example 2: html_entity_decode('&amp;lt;')
    //   returns 2: '&lt;'
    var getHtmlTranslationTable = require('../strings/get_html_translation_table');
    var tmpStr = '';
    var entity = '';
    var symbol = '';
    tmpStr = string.toString();
    var hashMap = getHtmlTranslationTable('HTML_ENTITIES', quoteStyle);
    if (hashMap === false) {
        return false;
    }
    // @todo: &amp; problem
    // https://locutus.io/php/get_html_translation_table:416#comment_97660
    delete (hashMap['&']);
    hashMap['&'] = '&amp;';
    for (symbol in hashMap) {
        entity = hashMap[symbol];
        tmpStr = tmpStr.split(entity).join(symbol);
    }
    tmpStr = tmpStr.split('&#039;').join("'");
    return tmpStr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF9lbnRpdHlfZGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvaHRtbF9lbnRpdHlfZGVjb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxrQkFBa0IsQ0FBRSxNQUFNLEVBQUUsVUFBVTtJQUM5RCwwREFBMEQ7SUFDMUQsOENBQThDO0lBQzlDLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsK0NBQStDO0lBQy9DLG9EQUFvRDtJQUNwRCwyQkFBMkI7SUFDM0Isb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELG1CQUFtQjtJQUNuQiwrREFBK0Q7SUFDL0QsdUNBQXVDO0lBQ3ZDLDhDQUE4QztJQUM5QyxzQkFBc0I7SUFFdEIsSUFBSSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtJQUM5RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBRTFCLElBQUksT0FBTyxHQUFHLHVCQUF1QixDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUNsRSxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUU7UUFDckIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELHVCQUF1QjtJQUN2QixzRUFBc0U7SUFDdEUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUE7SUFFdEIsS0FBSyxNQUFNLElBQUksT0FBTyxFQUFFO1FBQ3RCLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQzNDO0lBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRXpDLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=