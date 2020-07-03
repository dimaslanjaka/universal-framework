module.exports = function http_build_query(formdata, numericPrefix, argSeparator, encType) {
    //  discuss at: https://locutus.io/php/http_build_query/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Legaev Andrey
    // improved by: Michael White (https://getsprink.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //  revised by: stag019
    //    input by: Dreamer
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: MIO_KODUKI (https://mio-koduki.blogspot.com/)
    // improved by: Will Rowe
    //      note 1: If the value is null, key and value are skipped in the
    //      note 1: http_build_query of PHP while in locutus they are not.
    //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;')
    //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
    //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_')
    //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'
    //   example 3: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;', 'PHP_QUERY_RFC3986')
    //   returns 3: 'foo=bar&amp;php=hypertext%20processor&amp;baz=boom&amp;cow=milk'
    var encodeFunc;
    switch (encType) {
        case 'PHP_QUERY_RFC3986':
            encodeFunc = require('../url/rawurlencode');
            break;
        case 'PHP_QUERY_RFC1738':
        default:
            encodeFunc = require('../url/urlencode');
            break;
    }
    var value;
    var key;
    var tmp = [];
    var _httpBuildQueryHelper = function (key, val, argSeparator) {
        var k;
        var tmp = [];
        if (val === true) {
            val = '1';
        }
        else if (val === false) {
            val = '0';
        }
        if (val !== null) {
            if (typeof val === 'object') {
                for (k in val) {
                    if (val[k] !== null) {
                        tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator));
                    }
                }
                return tmp.join(argSeparator);
            }
            else if (typeof val !== 'function') {
                return encodeFunc(key) + '=' + encodeFunc(val);
            }
            else {
                throw new Error('There was an error processing for http_build_query().');
            }
        }
        else {
            return '';
        }
    };
    if (!argSeparator) {
        argSeparator = '&';
    }
    for (key in formdata) {
        value = formdata[key];
        if (numericPrefix && !isNaN(key)) {
            key = String(numericPrefix) + key;
        }
        var query = _httpBuildQueryHelper(key, value, argSeparator);
        if (query !== '') {
            tmp.push(query);
        }
    }
    return tmp.join(argSeparator);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9idWlsZF9xdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC91cmwvaHR0cF9idWlsZF9xdWVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZ0JBQWdCLENBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsT0FBTztJQUN4Rix3REFBd0Q7SUFDeEQsb0RBQW9EO0lBQ3BELDZCQUE2QjtJQUM3QixxREFBcUQ7SUFDckQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLG9EQUFvRDtJQUNwRCw2REFBNkQ7SUFDN0QseUJBQXlCO0lBQ3pCLHNFQUFzRTtJQUN0RSxzRUFBc0U7SUFDdEUsaUhBQWlIO0lBQ2pILCtFQUErRTtJQUMvRSxrSUFBa0k7SUFDbEksbUdBQW1HO0lBQ25HLHNJQUFzSTtJQUN0SSxpRkFBaUY7SUFFakYsSUFBSSxVQUFVLENBQUE7SUFFZCxRQUFRLE9BQU8sRUFBRTtRQUNmLEtBQUssbUJBQW1CO1lBQ3RCLFVBQVUsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQTtZQUMzQyxNQUFLO1FBRVAsS0FBSyxtQkFBbUIsQ0FBQztRQUN6QjtZQUNFLFVBQVUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtZQUN4QyxNQUFLO0tBQ1I7SUFFRCxJQUFJLEtBQUssQ0FBQTtJQUNULElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosSUFBSSxxQkFBcUIsR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsWUFBWTtRQUMxRCxJQUFJLENBQUMsQ0FBQTtRQUNMLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtRQUNaLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQixHQUFHLEdBQUcsR0FBRyxDQUFBO1NBQ1Y7YUFBTSxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQTtTQUNWO1FBQ0QsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2hCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUMzQixLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7b0JBQ2IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO3dCQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQTtxQkFDM0U7aUJBQ0Y7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO2FBQzlCO2lCQUFNLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQy9DO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQTthQUN6RTtTQUNGO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixZQUFZLEdBQUcsR0FBRyxDQUFBO0tBQ25CO0lBQ0QsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDckIsSUFBSSxhQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUE7U0FDbEM7UUFDRCxJQUFJLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFBO1FBQzNELElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2hCO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFBIn0=