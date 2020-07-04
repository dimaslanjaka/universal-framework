module.exports = function base64_encode(stringToEncode) {
    //  discuss at: https://locutus.io/php/base64_encode/
    // original by: Tyler Akins (https://rumkin.com)
    // improved by: Bayron Guevara
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    // bugfixed by: Pellentesque Malesuada
    // improved by: Indigo744
    //   example 1: base64_encode('Kevin van Zonneveld')
    //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    //   example 2: base64_encode('a')
    //   returns 2: 'YQ=='
    //   example 3: base64_encode('✓ à la mode')
    //   returns 3: '4pyTIMOgIGxhIG1vZGU='
    // encodeUTF8string()
    // Internal function to encode properly UTF8 string
    // Adapted from Solution #1 at https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    var encodeUTF8string = function (str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into the base64 encoding algorithm.
        return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        });
    };
    if (typeof window !== 'undefined') {
        if (typeof window.btoa !== 'undefined') {
            return window.btoa(encodeUTF8string(stringToEncode));
        }
    }
    else {
        return new Buffer(stringToEncode).toString('base64');
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
    var enc = '';
    var tmpArr = [];
    if (!stringToEncode) {
        return stringToEncode;
    }
    stringToEncode = encodeUTF8string(stringToEncode);
    do {
        // pack three octets into four hexets
        o1 = stringToEncode.charCodeAt(i++);
        o2 = stringToEncode.charCodeAt(i++);
        o3 = stringToEncode.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        // use hexets to index into b64, and append result to encoded string
        tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < stringToEncode.length);
    enc = tmpArr.join('');
    var r = stringToEncode.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0X2VuY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC91cmwvYmFzZTY0X2VuY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsYUFBYSxDQUFFLGNBQWM7SUFDckQscURBQXFEO0lBQ3JELGdEQUFnRDtJQUNoRCw4QkFBOEI7SUFDOUIseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQseURBQXlEO0lBQ3pELHNDQUFzQztJQUN0Qyx5QkFBeUI7SUFDekIsb0RBQW9EO0lBQ3BELDhDQUE4QztJQUM5QyxrQ0FBa0M7SUFDbEMsc0JBQXNCO0lBQ3RCLDRDQUE0QztJQUM1QyxzQ0FBc0M7SUFFdEMscUJBQXFCO0lBQ3JCLG1EQUFtRDtJQUNuRCx5SEFBeUg7SUFDekgsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLEdBQUc7UUFDbEMsZ0VBQWdFO1FBQ2hFLDZEQUE2RDtRQUM3RCxpREFBaUQ7UUFDakQsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQ3RELFNBQVMsWUFBWSxDQUFFLEtBQUssRUFBRSxFQUFFO1lBQzlCLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUE7SUFFRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUNqQyxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDdEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7U0FDckQ7S0FDRjtTQUFNO1FBQ0wsT0FBTyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDckQ7SUFFRCxJQUFJLEdBQUcsR0FBRyxtRUFBbUUsQ0FBQTtJQUM3RSxJQUFJLEVBQUUsQ0FBQTtJQUNOLElBQUksRUFBRSxDQUFBO0lBQ04sSUFBSSxFQUFFLENBQUE7SUFDTixJQUFJLEVBQUUsQ0FBQTtJQUNOLElBQUksRUFBRSxDQUFBO0lBQ04sSUFBSSxFQUFFLENBQUE7SUFDTixJQUFJLEVBQUUsQ0FBQTtJQUNOLElBQUksSUFBSSxDQUFBO0lBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ1YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBRWYsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixPQUFPLGNBQWMsQ0FBQTtLQUN0QjtJQUVELGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUVqRCxHQUFHO1FBQ0QscUNBQXFDO1FBQ3JDLEVBQUUsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNuQyxFQUFFLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRW5DLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBRTlCLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQTtRQUN0QixFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDdEIsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBRWhCLG9FQUFvRTtRQUNwRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0tBQ2pGLFFBQVEsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUM7SUFFbkMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFckIsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFFakMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQUEifQ==