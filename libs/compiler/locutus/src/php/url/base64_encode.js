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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0X2VuY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdXJsL2Jhc2U2NF9lbmNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGFBQWEsQ0FBRSxjQUFjO0lBQ3JELHFEQUFxRDtJQUNyRCxnREFBZ0Q7SUFDaEQsOEJBQThCO0lBQzlCLHlCQUF5QjtJQUN6QixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHlEQUF5RDtJQUN6RCxzQ0FBc0M7SUFDdEMseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCw4Q0FBOEM7SUFDOUMsa0NBQWtDO0lBQ2xDLHNCQUFzQjtJQUN0Qiw0Q0FBNEM7SUFDNUMsc0NBQXNDO0lBRXRDLHFCQUFxQjtJQUNyQixtREFBbUQ7SUFDbkQseUhBQXlIO0lBQ3pILElBQUksZ0JBQWdCLEdBQUcsVUFBVSxHQUFHO1FBQ2xDLGdFQUFnRTtRQUNoRSw2REFBNkQ7UUFDN0QsaURBQWlEO1FBQ2pELE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUN0RCxTQUFTLFlBQVksQ0FBRSxLQUFLLEVBQUUsRUFBRTtZQUM5QixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0lBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQ3RDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO1NBQ3JEO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ3JEO0lBRUQsSUFBSSxHQUFHLEdBQUcsbUVBQW1FLENBQUE7SUFDN0UsSUFBSSxFQUFFLENBQUE7SUFDTixJQUFJLEVBQUUsQ0FBQTtJQUNOLElBQUksRUFBRSxDQUFBO0lBQ04sSUFBSSxFQUFFLENBQUE7SUFDTixJQUFJLEVBQUUsQ0FBQTtJQUNOLElBQUksRUFBRSxDQUFBO0lBQ04sSUFBSSxFQUFFLENBQUE7SUFDTixJQUFJLElBQUksQ0FBQTtJQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNWLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUVmLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsT0FBTyxjQUFjLENBQUE7S0FDdEI7SUFFRCxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUE7SUFFakQsR0FBRztRQUNELHFDQUFxQztRQUNyQyxFQUFFLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLEVBQUUsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUVuQyxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUU5QixFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDdEIsRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUNyQixFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUVoQixvRUFBb0U7UUFDcEUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUNqRixRQUFRLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFDO0lBRW5DLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRXJCLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBRWpDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBIn0=