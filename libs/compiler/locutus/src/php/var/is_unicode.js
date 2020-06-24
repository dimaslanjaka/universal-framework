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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfdW5pY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzX3VuaWNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxFQUFFO0lBQ3RDLGtEQUFrRDtJQUNsRCxvREFBb0Q7SUFDcEQsa0VBQWtFO0lBQ2xFLHNFQUFzRTtJQUN0RSxvQkFBb0I7SUFFcEIsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7UUFDMUIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELDBFQUEwRTtJQUMxRSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQTtJQUNyQyxJQUFJLFlBQVksR0FBRyxpQkFBaUIsQ0FBQTtJQUNwQyxJQUFJLHNCQUFzQixHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsR0FBRyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDMUUsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEdBQUcsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZFLElBQUksa0JBQWtCLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUM3RCxJQUFJLG1CQUFtQixHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFFL0QsT0FBTyxDQUFDLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNoRCx3Q0FBd0M7WUFDeEMsT0FBTyxLQUFLLENBQUE7U0FDYjtLQUNGO0lBQ0QsT0FBTyxDQUFDLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUNqRCx3Q0FBd0M7WUFDeEMsT0FBTyxLQUFLLENBQUE7U0FDYjtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==