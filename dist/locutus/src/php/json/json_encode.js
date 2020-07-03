module.exports = function json_encode(mixedVal) {
    //       discuss at: https://phpjs.org/functions/json_encode/
    //      original by: Public Domain (https://www.json.org/json2.js)
    // reimplemented by: Kevin van Zonneveld (https://kevin.vanzonneveld.net)
    //      improved by: Michael White
    //         input by: felix
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //        example 1: json_encode('Kevin')
    //        returns 1: '"Kevin"'
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
    var retVal;
    try {
        if (typeof json === 'object' && typeof json.stringify === 'function') {
            // Errors will not be caught here if our own equivalent to resource
            retVal = json.stringify(mixedVal);
            if (retVal === undefined) {
                throw new SyntaxError('json_encode');
            }
            return retVal;
        }
        var value = mixedVal;
        var quote = function (string) {
            var escapeChars = [
                '\u0000-\u001f',
                '\u007f-\u009f',
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
            var escapable = new RegExp('[\\"' + escapeChars + ']', 'g');
            var meta = {
                // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0)
                    .toString(16))
                    .slice(-4);
            }) + '"' : '"' + string + '"';
        };
        var _str = function (key, holder) {
            var gap = '';
            var indent = '    ';
            // The loop counter.
            var i = 0;
            // The member key.
            var k = '';
            // The member value.
            var v = '';
            var length = 0;
            var mind = gap;
            var partial = [];
            var value = holder[key];
            // If the value has a toJSON method, call it to obtain a replacement value.
            if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }
            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return quote(value);
                case 'number':
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                    // If the value is a boolean or null, convert it to a string.
                    return String(value);
                case 'object':
                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                        return 'null';
                    }
                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent;
                    partial = [];
                    // Is the value an array?
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = _str(i, value) || 'null';
                        }
                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                        // gap = mind // not used
                        return v;
                    }
                    // Iterate through all of the keys in the object.
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = _str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                    // gap = mind // Not used
                    return v;
                case 'undefined':
                case 'function':
                default:
                    throw new SyntaxError('json_encode');
            }
        };
        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return _str('', {
            '': value
        });
    }
    catch (err) {
        // @todo: ensure error handling above throws a SyntaxError in all cases where it could
        // (i.e., when the JSON global is not available and there is an error)
        if (!(err instanceof SyntaxError)) {
            throw new Error('Unexpected error type in json_encode()');
        }
        // usable by json_last_error()
        $locutus.php.last_error_json = 4;
        return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9lbmNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvanNvbi9qc29uX2VuY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLFFBQVE7SUFDN0MsNkRBQTZEO0lBQzdELGtFQUFrRTtJQUNsRSx5RUFBeUU7SUFDekUsa0NBQWtDO0lBQ2xDLDBCQUEwQjtJQUMxQix5REFBeUQ7SUFDekQseUNBQXlDO0lBQ3pDLDhCQUE4QjtJQUU5Qjs7Ozs7O01BTUU7SUFFRixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVqQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ3ZCLElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSTtRQUNGLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDcEUsbUVBQW1FO1lBQ25FLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ2pDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsTUFBTSxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQTthQUNyQztZQUNELE9BQU8sTUFBTSxDQUFBO1NBQ2Q7UUFFRCxJQUFJLEtBQUssR0FBRyxRQUFRLENB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