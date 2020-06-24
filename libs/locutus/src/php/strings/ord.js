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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL29yZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFFLE1BQU07SUFDbkMsMkNBQTJDO0lBQzNDLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELHlCQUF5QjtJQUN6Qix3QkFBd0I7SUFDeEIsa0JBQWtCO0lBQ2xCLDJGQUEyRjtJQUMzRixxQkFBcUI7SUFFckIsSUFBSSxHQUFHLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNyQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTVCLElBQUksSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1FBQ3BDLDJEQUEyRDtRQUMzRCxnREFBZ0Q7UUFDaEQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ2IsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwQixpRUFBaUU7WUFDakUsMEJBQTBCO1lBQzFCLE9BQU8sSUFBSSxDQUFBO1lBQ1gsa0VBQWtFO1lBQ2xFLCtCQUErQjtTQUNoQztRQUNELElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0IsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQTtLQUMxRDtJQUNELElBQUksSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1FBQ3BDLGdCQUFnQjtRQUNoQixpRUFBaUU7UUFDakUsMEJBQTBCO1FBQzFCLE9BQU8sSUFBSSxDQUFBO1FBQ1gsa0VBQWtFO1FBQ2xFLCtCQUErQjtLQUNoQztJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=