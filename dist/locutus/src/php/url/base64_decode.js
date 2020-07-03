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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0X2RlY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC91cmwvYmFzZTY0X2RlY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsYUFBYSxDQUFFLFdBQVc7SUFDbEQscURBQXFEO0lBQ3JELGdEQUFnRDtJQUNoRCx5QkFBeUI7SUFDekIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwwQkFBMEI7SUFDMUIsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxzQ0FBc0M7SUFDdEMsb0RBQW9EO0lBQ3BELHlCQUF5QjtJQUN6Qiw2REFBNkQ7SUFDN0QscUNBQXFDO0lBQ3JDLHFDQUFxQztJQUNyQyxtQkFBbUI7SUFDbkIscURBQXFEO0lBQ3JELDZCQUE2QjtJQUU3QixxQkFBcUI7SUFDckIsbURBQW1EO0lBQ25ELHlIQUF5SDtJQUN6SCxJQUFJLGdCQUFnQixHQUFHLFVBQVUsR0FBRztRQUNsQyw2RUFBNkU7UUFDN0UsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDckQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM5RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNkLENBQUMsQ0FBQTtJQUVELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQ2pDLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUN0QyxPQUFPLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENB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