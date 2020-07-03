module.exports = function chr(codePt) {
    //  discuss at: https://locutus.io/php/chr/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: chr(75) === 'K'
    //   example 1: chr(65536) === '\uD800\uDC00'
    //   returns 1: true
    //   returns 1: true
    if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high
        //   enough for the UTF-16 encoding (JavaScript internal use), to
        //   require representation with two surrogates (reserved non-characters
        //   used for building other characters; the first is "high" and the next "low")
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    }
    return String.fromCharCode(codePt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvY2hyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUUsTUFBTTtJQUNuQywyQ0FBMkM7SUFDM0Msb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwrQkFBK0I7SUFDL0IsNkNBQTZDO0lBQzdDLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFFcEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxFQUFFLEVBQUUscUVBQXFFO1FBQzFGLGlFQUFpRTtRQUNqRSx3RUFBd0U7UUFDeEUsZ0ZBQWdGO1FBQ2hGLE1BQU0sSUFBSSxPQUFPLENBQUE7UUFDakIsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtLQUMvRTtJQUNELE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEifQ==