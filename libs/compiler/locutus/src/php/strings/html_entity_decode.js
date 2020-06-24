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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF9lbnRpdHlfZGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2h0bWxfZW50aXR5X2RlY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsa0JBQWtCLENBQUUsTUFBTSxFQUFFLFVBQVU7SUFDOUQsMERBQTBEO0lBQzFELDhDQUE4QztJQUM5QyxtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsMkJBQTJCO0lBQzNCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxtQkFBbUI7SUFDbkIsK0RBQStEO0lBQy9ELHVDQUF1QztJQUN2Qyw4Q0FBOEM7SUFDOUMsc0JBQXNCO0lBRXRCLElBQUksdUJBQXVCLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUE7SUFDOUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUUxQixJQUFJLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDbEUsSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1FBQ3JCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCx1QkFBdUI7SUFDdkIsc0VBQXNFO0lBQ3RFLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFBO0lBRXRCLEtBQUssTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUN0QixNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3hCLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUMzQztJQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUV6QyxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9