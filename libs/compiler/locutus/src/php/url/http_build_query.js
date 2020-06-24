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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9idWlsZF9xdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdXJsL2h0dHBfYnVpbGRfcXVlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGdCQUFnQixDQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE9BQU87SUFDeEYsd0RBQXdEO0lBQ3hELG9EQUFvRDtJQUNwRCw2QkFBNkI7SUFDN0IscURBQXFEO0lBQ3JELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixvREFBb0Q7SUFDcEQsNkRBQTZEO0lBQzdELHlCQUF5QjtJQUN6QixzRUFBc0U7SUFDdEUsc0VBQXNFO0lBQ3RFLGlIQUFpSDtJQUNqSCwrRUFBK0U7SUFDL0Usa0lBQWtJO0lBQ2xJLG1HQUFtRztJQUNuRyxzSUFBc0k7SUFDdEksaUZBQWlGO0lBRWpGLElBQUksVUFBVSxDQUFBO0lBRWQsUUFBUSxPQUFPLEVBQUU7UUFDZixLQUFLLG1CQUFtQjtZQUN0QixVQUFVLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUE7WUFDM0MsTUFBSztRQUVQLEtBQUssbUJBQW1CLENBQUM7UUFDekI7WUFDRSxVQUFVLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7WUFDeEMsTUFBSztLQUNSO0lBRUQsSUFBSSxLQUFLLENBQUE7SUFDVCxJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLElBQUkscUJBQXFCLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLFlBQVk7UUFDMUQsSUFBSSxDQUFDLENBQUE7UUFDTCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDaEIsR0FBRyxHQUFHLEdBQUcsQ0FBQTtTQUNWO2FBQU0sSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO1lBQ3hCLEdBQUcsR0FBRyxHQUFHLENBQUE7U0FDVjtRQUNELElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO29CQUNiLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTt3QkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUE7cUJBQzNFO2lCQUNGO2dCQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTthQUM5QjtpQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRTtnQkFDcEMsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUMvQztpQkFBTTtnQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUE7YUFDekU7U0FDRjthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUE7U0FDVjtJQUNILENBQUMsQ0FBQTtJQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsWUFBWSxHQUFHLEdBQUcsQ0FBQTtLQUNuQjtJQUNELEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUNwQixLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JCLElBQUksYUFBYSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLEdBQUcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFBO1NBQ2xDO1FBQ0QsSUFBSSxLQUFLLEdBQUcscUJBQXFCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUMzRCxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNoQjtLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQSJ9