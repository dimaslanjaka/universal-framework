module.exports = function json_decode(strJson) {
    //       discuss at: https://phpjs.org/functions/json_decode/
    //      original by: Public Domain (https://www.json.org/json2.js)
    // reimplemented by: Kevin van Zonneveld (https://kevin.vanzonneveld.net)
    //      improved by: T.J. Leahy
    //      improved by: Michael White
    //           note 1: If node or the browser does not offer JSON.parse,
    //           note 1: this function falls backslash
    //           note 1: to its own implementation using eval, and hence should be considered unsafe
    //        example 1: json_decode('[ 1 ]')
    //        returns 1: [1]
    /*
      https://www.JSON.org/json2.js
      2008-11-19
      Public Domain.
      NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
      See https://www.JSON.org/js.html
    */
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    var json = $global.JSON;
    if (typeof json === 'object' && typeof json.parse === 'function') {
        try {
            return json.parse(strJson);
        }
        catch (err) {
            if (!(err instanceof SyntaxError)) {
                throw new Error('Unexpected error type in json_decode()');
            }
            // usable by json_last_error()
            $locutus.php.last_error_json = 4;
            return null;
        }
    }
    var chars = [
        '\u0000',
        '\u00ad',
        '\u0600-\u0604',
        '\u070f',
        '\u17b4',
        '\u17b5',
        '\u200c-\u200f',
        '\u2028-\u202f',
        '\u2060-\u206f',
        '\ufeff',
        '\ufff0-\uffff'
    ].join('');
    var cx = new RegExp('[' + chars + ']', 'g');
    var j;
    var text = strJson;
    // Parsing happens in four stages. In the first stage, we replace certain
    // Unicode characters with escape sequences. JavaScript handles many characters
    // incorrectly, either silently deleting them, or treating them as line endings.
    cx.lastIndex = 0;
    if (cx.test(text)) {
        text = text.replace(cx, function (a) {
            return '\\u' + ('0000' + a.charCodeAt(0)
                .toString(16))
                .slice(-4);
        });
    }
    // In the second stage, we run the text against regular expressions that look
    // for non-JSON patterns. We are especially concerned with '()' and 'new'
    // because they can cause invocation, and '=' because it can cause mutation.
    // But just to be safe, we want to reject all unexpected forms.
    // We split the second stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
    // replace all simple value tokens with ']' characters. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or ']' or
    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
    var m = (/^[\],:{}\s]*$/)
        .test(text.replace(/\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
    if (m) {
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.
        j = eval('(' + text + ')'); // eslint-disable-line no-eval
        return j;
    }
    // usable by json_last_error()
    $locutus.php.last_error_json = 4;
    return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9kZWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2pzb24vanNvbl9kZWNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxPQUFPO0lBQzVDLDZEQUE2RDtJQUM3RCxrRUFBa0U7SUFDbEUseUVBQXlFO0lBQ3pFLCtCQUErQjtJQUMvQixrQ0FBa0M7SUFDbEMsc0VBQXNFO0lBQ3RFLGtEQUFrRDtJQUNsRCxnR0FBZ0c7SUFDaEcseUNBQXlDO0lBQ3pDLHdCQUF3QjtJQUV4Qjs7Ozs7O01BTUU7SUFFRixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVqQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ3ZCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7UUFDaEUsSUFBSTtZQUNGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUMzQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLFdBQVcsQ0FBQyxFQUFFO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUE7YUFDMUQ7WUFFRCw4QkFBOEI7WUFDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFBO1lBQ2hDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7S0FDRjtJQUVELElBQUksS0FBSyxHQUFHO1FBQ1YsUUFBUTtRQUNSLFFBQVE7UUFDUixlQUFlO1FBQ2YsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsUUFBUTtRQUNSLGVBQWU7S0FDaEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDVixJQUFJLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUMzQyxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQTtJQUVsQix5RUFBeUU7SUFDekUsK0VBQStFO0lBQy9FLGdGQUFnRjtJQUNoRixFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQTtJQUNoQixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDakIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQztZQUNqQyxPQUFPLEtBQUssR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztpQkFDckMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNiLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2QsQ0FBQyxDQUFDLENBQUE7S0FDSDtJQUVELDZFQUE2RTtJQUM3RSx5RUFBeUU7SUFDekUsNEVBQTRFO0lBQzVFLCtEQUErRDtJQUMvRCw2RUFBNkU7SUFDN0UseUVBQXlFO0lBQ3pFLCtFQUErRTtJQUMvRSw0RUFBNEU7SUFDNUUsOEVBQThFO0lBQzlFLDZFQUE2RTtJQUM3RSwyRUFBMkU7SUFFM0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7U0FDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxDQUFDO1NBQzVELE9BQU8sQ0FBQyxpRUFBaUUsRUFBRSxHQUFHLENBQUM7U0FDL0UsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFFdkMsSUFBSSxDQUFDLEVBQUU7UUFDTCx5RUFBeUU7UUFDekUsNkVBQTZFO1FBQzdFLDZFQUE2RTtRQUM3RSx3Q0FBd0M7UUFDeEMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUMsOEJBQThCO1FBQ3pELE9BQU8sQ0FBQyxDQUFBO0tBQ1Q7SUFFRCw4QkFBOEI7SUFDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFBO0lBQ2hDLE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=