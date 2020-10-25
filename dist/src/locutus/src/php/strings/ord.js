module.exports = function ord(string) {
    //  discuss at: https://locutus.io/php/ord/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //    input by: incidence
    //   example 1: ord('K')
    //   returns 1: 75
    //   example 2: ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
    //   returns 2: 65536
    var str = string + '';
    var code = str.charCodeAt(0);
    if (code >= 0xD800 && code <= 0xDBFF) {
        // High surrogate (could change last hex to 0xDB7F to treat
        // high private surrogates as single characters)
        var hi = code;
        if (str.length === 1) {
            // This is just a high surrogate with no following low surrogate,
            // so we return its value;
            return code;
            // we could also throw an error as it is not a complete character,
            // but someone may want to know
        }
        var low = str.charCodeAt(1);
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (code >= 0xDC00 && code <= 0xDFFF) {
        // Low surrogate
        // This is just a low surrogate with no preceding high surrogate,
        // so we return its value;
        return code;
        // we could also throw an error as it is not a complete character,
        // but someone may want to know
    }
    return code;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvb3JkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUUsTUFBTTtJQUNuQywyQ0FBMkM7SUFDM0Msb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQseUJBQXlCO0lBQ3pCLHdCQUF3QjtJQUN4QixrQkFBa0I7SUFDbEIsMkZBQTJGO0lBQzNGLHFCQUFxQjtJQUVyQixJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFNUIsSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDcEMsMkRBQTJEO1FBQzNELGdEQUFnRDtRQUNoRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDYixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLGlFQUFpRTtZQUNqRSwwQkFBMEI7WUFDMUIsT0FBTyxJQUFJLENBQUE7WUFDWCxrRUFBa0U7WUFDbEUsK0JBQStCO1NBQ2hDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzQixPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFBO0tBQzFEO0lBQ0QsSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDcEMsZ0JBQWdCO1FBQ2hCLGlFQUFpRTtRQUNqRSwwQkFBMEI7UUFDMUIsT0FBTyxJQUFJLENBQUE7UUFDWCxrRUFBa0U7UUFDbEUsK0JBQStCO0tBQ2hDO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==