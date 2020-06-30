module.exports = function strlen(string) {
    //  discuss at: https://locutus.io/php/strlen/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Sakimori
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Kirk Strobeck
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //  revised by: Brett Zamir (https://brett-zamir.me)
    //      note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
    //      note 1: characters and to this function in PHP which does not count the number of bytes
    //      note 1: but counts the number of characters, something like this is really necessary.
    //   example 1: strlen('Kevin van Zonneveld')
    //   returns 1: 19
    //   example 2: ini_set('unicode.semantics', 'on')
    //   example 2: strlen('A\ud87e\udc04Z')
    //   returns 2: 3
    var str = string + '';
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('unicode.semantics') : undefined) || 'off';
    if (iniVal === 'off') {
        return str.length;
    }
    var i = 0;
    var lgth = 0;
    var getWholeChar = function (str, i) {
        var code = str.charCodeAt(i);
        var next = '';
        var prev = '';
        if (code >= 0xD800 && code <= 0xDBFF) {
            // High surrogate (could change last hex to 0xDB7F to
            // treat high private surrogates as single characters)
            if (str.length <= (i + 1)) {
                throw new Error('High surrogate without following low surrogate');
            }
            next = str.charCodeAt(i + 1);
            if (next < 0xDC00 || next > 0xDFFF) {
                throw new Error('High surrogate without following low surrogate');
            }
            return str.charAt(i) + str.charAt(i + 1);
        }
        else if (code >= 0xDC00 && code <= 0xDFFF) {
            // Low surrogate
            if (i === 0) {
                throw new Error('Low surrogate without preceding high surrogate');
            }
            prev = str.charCodeAt(i - 1);
            if (prev < 0xD800 || prev > 0xDBFF) {
                // (could change last hex to 0xDB7F to treat high private surrogates
                // as single characters)
                throw new Error('Low surrogate without preceding high surrogate');
            }
            // We can pass over low surrogates now as the second
            // component in a pair which we have already processed
            return false;
        }
        return str.charAt(i);
    };
    for (i = 0, lgth = 0; i < str.length; i++) {
        if ((getWholeChar(str, i)) === false) {
            continue;
        }
        // Adapt this line at the top of any loop, passing in the whole string and
        // the current iteration and returning a variable to represent the individual character;
        // purpose is to treat the first part of a surrogate pair as the whole character and then
        // ignore the second part
        lgth++;
    }
    return lgth;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmxlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLE1BQU07SUFDdEMsOENBQThDO0lBQzlDLG9EQUFvRDtJQUNwRCx3QkFBd0I7SUFDeEIsb0RBQW9EO0lBQ3BELDZCQUE2QjtJQUM3Qiw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELGlHQUFpRztJQUNqRywrRkFBK0Y7SUFDL0YsNkZBQTZGO0lBQzdGLDZDQUE2QztJQUM3QyxrQkFBa0I7SUFDbEIsa0RBQWtEO0lBQ2xELHdDQUF3QztJQUN4QyxpQkFBaUI7SUFFakIsSUFBSSxHQUFHLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUVyQixJQUFJLE1BQU0sR0FBRyxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxDQUFBO0lBQ3BILElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtRQUNwQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUE7S0FDbEI7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUE7SUFFWixJQUFJLFlBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDNUIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2IsSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDcEMscURBQXFEO1lBQ3JELHNEQUFzRDtZQUN0RCxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTthQUNsRTtZQUNELElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRTtnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO2FBQ2xFO1lBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ3pDO2FBQU0sSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDM0MsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7YUFDbEU7WUFDRCxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDNUIsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLElBQUksR0FBRyxNQUFNLEVBQUU7Z0JBQ2xDLG9FQUFvRTtnQkFDcEUsd0JBQXdCO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7YUFDbEU7WUFDRCxvREFBb0Q7WUFDcEQsc0RBQXNEO1lBQ3RELE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFDRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEIsQ0FBQyxDQUFBO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFDcEMsU0FBUTtTQUNUO1FBQ0QsMEVBQTBFO1FBQzFFLHdGQUF3RjtRQUN4Rix5RkFBeUY7UUFDekYseUJBQXlCO1FBQ3pCLElBQUksRUFBRSxDQUFBO0tBQ1A7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9