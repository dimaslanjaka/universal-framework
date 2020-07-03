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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RybGVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsTUFBTTtJQUN0Qyw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELHdCQUF3QjtJQUN4QixvREFBb0Q7SUFDcEQsNkJBQTZCO0lBQzdCLDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsaUdBQWlHO0lBQ2pHLCtGQUErRjtJQUMvRiw2RkFBNkY7SUFDN0YsNkNBQTZDO0lBQzdDLGtCQUFrQjtJQUNsQixrREFBa0Q7SUFDbEQsd0NBQXdDO0lBQ3hDLGlCQUFpQjtJQUVqQixJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBRXJCLElBQUksTUFBTSxHQUFHLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUE7SUFDcEgsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQTtLQUNsQjtJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUVaLElBQUksWUFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7UUFDYixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7UUFDYixJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUNwQyxxREFBcUQ7WUFDckQsc0RBQXNEO1lBQ3RELElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO2FBQ2xFO1lBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7YUFDbEU7WUFDRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDekM7YUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUMzQyxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTthQUNsRTtZQUNELElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRTtnQkFDbEMsb0VBQW9FO2dCQUNwRSx3QkFBd0I7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTthQUNsRTtZQUNELG9EQUFvRDtZQUNwRCxzREFBc0Q7WUFDdEQsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN0QixDQUFDLENBQUE7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUNwQyxTQUFRO1NBQ1Q7UUFDRCwwRUFBMEU7UUFDMUUsd0ZBQXdGO1FBQ3hGLHlGQUF5RjtRQUN6Rix5QkFBeUI7UUFDekIsSUFBSSxFQUFFLENBQUE7S0FDUDtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=