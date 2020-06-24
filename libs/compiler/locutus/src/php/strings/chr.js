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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2Noci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFFLE1BQU07SUFDbkMsMkNBQTJDO0lBQzNDLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsK0JBQStCO0lBQy9CLDZDQUE2QztJQUM3QyxvQkFBb0I7SUFDcEIsb0JBQW9CO0lBRXBCLElBQUksTUFBTSxHQUFHLE1BQU0sRUFBRSxFQUFFLHFFQUFxRTtRQUMxRixpRUFBaUU7UUFDakUsd0VBQXdFO1FBQ3hFLGdGQUFnRjtRQUNoRixNQUFNLElBQUksT0FBTyxDQUFBO1FBQ2pCLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUE7S0FDL0U7SUFDRCxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBIn0=