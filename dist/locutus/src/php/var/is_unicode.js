module.exports = function is_unicode(vr) {
    //  discuss at: https://locutus.io/php/is_unicode/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Almost all strings in JavaScript should be Unicode
    //   example 1: is_unicode('We the peoples of the United Nations...!')
    //   returns 1: true
    if (typeof vr !== 'string') {
        return false;
    }
    // If surrogates occur outside of high-low pairs, then this is not Unicode
    var arr = [];
    var highSurrogate = '[\uD800-\uDBFF]';
    var lowSurrogate = '[\uDC00-\uDFFF]';
    var highSurrogateBeforeAny = new RegExp(highSurrogate + '([\\s\\S])', 'g');
    var lowSurrogateAfterAny = new RegExp('([\\s\\S])' + lowSurrogate, 'g');
    var singleLowSurrogate = new RegExp('^' + lowSurrogate + '$');
    var singleHighSurrogate = new RegExp('^' + highSurrogate + '$');
    while ((arr = highSurrogateBeforeAny.exec(vr)) !== null) {
        if (!arr[1] || !arr[1].match(singleLowSurrogate)) {
            // If high not followed by low surrogate
            return false;
        }
    }
    while ((arr = lowSurrogateAfterAny.exec(vr)) !== null) {
        if (!arr[1] || !arr[1].match(singleHighSurrogate)) {
            // If low not preceded by high surrogate
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfdW5pY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfdW5pY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLEVBQUU7SUFDdEMsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCxrRUFBa0U7SUFDbEUsc0VBQXNFO0lBQ3RFLG9CQUFvQjtJQUVwQixJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsRUFBRTtRQUMxQixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsMEVBQTBFO0lBQzFFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksYUFBYSxHQUFHLGlCQUFpQixDQUFBO0lBQ3JDLElBQUksWUFBWSxHQUFHLGlCQUFpQixDQUFBO0lBQ3BDLElBQUksc0JBQXNCLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxHQUFHLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUMxRSxJQUFJLG9CQUFvQixHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksR0FBRyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdkUsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQzdELElBQUksbUJBQW1CLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUUvRCxPQUFPLENBQUMsR0FBRyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ2hELHdDQUF3QztZQUN4QyxPQUFPLEtBQUssQ0FBQTtTQUNiO0tBQ0Y7SUFDRCxPQUFPLENBQUMsR0FBRyxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ2pELHdDQUF3QztZQUN4QyxPQUFPLEtBQUssQ0FBQTtTQUNiO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9