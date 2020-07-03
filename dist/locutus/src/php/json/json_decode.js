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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9kZWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvanNvbi9qc29uX2RlY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLE9BQU87SUFDNUMsNkRBQTZEO0lBQzdELGtFQUFrRTtJQUNsRSx5RUFBeUU7SUFDekUsK0JBQStCO0lBQy9CLGtDQUFrQztJQUNsQyxzRUFBc0U7SUFDdEUsa0RBQWtEO0lBQ2xELGdHQUFnRztJQUNoRyx5Q0FBeUM7SUFDekMsd0JBQXdCO0lBRXhCOzs7Ozs7TUFNRTtJQUVGLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDekMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtJQUMvQixRQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO0lBRWpDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDdkIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTtRQUNoRSxJQUFJO1lBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQzNCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksV0FBVyxDQUFDLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQTthQUMxRDtZQUVELDhCQUE4QjtZQUM5QixRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUE7WUFDaEMsT0FBTyxJQUFJLENBQUE7U0FDWjtLQUNGO0lBRUQsSUFBSSxLQUFLLEdBQUc7UUFDVixRQUFRO1FBQ1IsUUFBUTtRQUNSLGVBQWU7UUFDZixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixlQUFlO1FBQ2YsZUFBZTtRQUNmLGVBQWU7UUFDZixRQUFRO1FBQ1IsZUFBZTtLQUNoQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNWLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzNDLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFBO0lBRWxCLHlFQUF5RTtJQUN6RSwrRUFBK0U7SUFDL0UsZ0ZBQWdGO0lBQ2hGLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO0lBQ2hCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNqQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDO1lBQ2pDLE9BQU8sS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2lCQUNyQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZCxDQUFDLENBQUMsQ0FBQTtLQUNIO0lBRUQsNkVBQTZFO0lBQzdFLHlFQUF5RTtJQUN6RSw0RUFBNEU7SUFDNUUsK0RBQStEO0lBQy9ELDZFQUE2RTtJQUM3RSx5RUFBeUU7SUFDekUsK0VBQStFO0lBQy9FLDRFQUE0RTtJQUM1RSw4RUFBOEU7SUFDOUUsNkVBQTZFO0lBQzdFLDJFQUEyRTtJQUUzRSxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztTQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLENBQUM7U0FDNUQsT0FBTyxDQUFDLGlFQUFpRSxFQUFFLEdBQUcsQ0FBQztTQUMvRSxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUV2QyxJQUFJLENBQUMsRUFBRTtRQUNMLHlFQUF5RTtRQUN6RSw2RUFBNkU7UUFDN0UsNkVBQTZFO1FBQzdFLHdDQUF3QztRQUN4QyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQyw4QkFBOEI7UUFDekQsT0FBTyxDQUFDLENBQUE7S0FDVDtJQUVELDhCQUE4QjtJQUM5QixRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUE7SUFDaEMsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==