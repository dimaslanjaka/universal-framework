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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9lbmNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2pzb24vanNvbl9lbmNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxRQUFRO0lBQzdDLDZEQUE2RDtJQUM3RCxrRUFBa0U7SUFDbEUseUVBQXlFO0lBQ3pFLGtDQUFrQztJQUNsQywwQkFBMEI7SUFDMUIseURBQXlEO0lBQ3pELHlDQUF5QztJQUN6Qyw4QkFBOEI7SUFFOUI7Ozs7OztNQU1FO0lBRUYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFFakMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUN2QixJQUFJLE1BQU0sQ0FBQTtJQUNWLElBQUk7UUFDRixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO1lBQ3BFLG1FQUFtRTtZQUNuRSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNqQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3hCLE1BQU0sSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUE7YUFDckM7WUFDRCxPQUFPLE1BQU0sQ0FBQTtTQUNkO1FBRUQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFBO1FB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