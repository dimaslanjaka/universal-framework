module.exports = function base64_decode(encodedData) {
    //  discuss at: https://locutus.io/php/base64_decode/
    // original by: Tyler Akins (https://rumkin.com)
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Pellentesque Malesuada
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Indigo744
    //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==')
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: base64_decode('YQ==')
    //   returns 2: 'a'
    //   example 3: base64_decode('4pyTIMOgIGxhIG1vZGU=')
    //   returns 3: '✓ à la mode'
    // decodeUTF8string()
    // Internal function to decode properly UTF8 string
    // Adapted from Solution #1 at https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    var decodeUTF8string = function (str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(str.split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };
    if (typeof window !== 'undefined') {
        if (typeof window.atob !== 'undefined') {
            return decodeUTF8string(window.atob(encodedData));
        }
    }
    else {
        return new Buffer(encodedData, 'base64').toString('utf-8');
    }
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1;
    var o2;
    var o3;
    var h1;
    var h2;
    var h3;
    var h4;
    var bits;
    var i = 0;
    var ac = 0;
    var dec = '';
    var tmpArr = [];
    if (!encodedData) {
        return encodedData;
    }
    encodedData += '';
    do {
        // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(encodedData.charAt(i++));
        h2 = b64.indexOf(encodedData.charAt(i++));
        h3 = b64.indexOf(encodedData.charAt(i++));
        h4 = b64.indexOf(encodedData.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 === 64) {
            tmpArr[ac++] = String.fromCharCode(o1);
        }
        else if (h4 === 64) {
            tmpArr[ac++] = String.fromCharCode(o1, o2);
        }
        else {
            tmpArr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < encodedData.length);
    dec = tmpArr.join('');
    return decodeUTF8string(dec.replace(/\0+$/, ''));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0X2RlY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdXJsL2Jhc2U2NF9kZWNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGFBQWEsQ0FBRSxXQUFXO0lBQ2xELHFEQUFxRDtJQUNyRCxnREFBZ0Q7SUFDaEQseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsMEJBQTBCO0lBQzFCLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsc0NBQXNDO0lBQ3RDLG9EQUFvRDtJQUNwRCx5QkFBeUI7SUFDekIsNkRBQTZEO0lBQzdELHFDQUFxQztJQUNyQyxxQ0FBcUM7SUFDckMsbUJBQW1CO0lBQ25CLHFEQUFxRDtJQUNyRCw2QkFBNkI7SUFFN0IscUJBQXFCO0lBQ3JCLG1EQUFtRDtJQUNuRCx5SEFBeUg7SUFDekgsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLEdBQUc7UUFDbEMsNkVBQTZFO1FBQzdFLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ3JELE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDZCxDQUFDLENBQUE7SUFFRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUNqQyxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDdEMsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdB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