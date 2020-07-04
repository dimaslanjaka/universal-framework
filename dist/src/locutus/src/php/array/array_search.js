module.exports = function array_search(needle, haystack, argStrict) {
    //  discuss at: https://locutus.io/php/array_search/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Reynier de la Rosa (https://scriptinside.blogspot.com.es/)
    //        test: skip-all
    //   example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'})
    //   returns 1: 'surname'
    //   example 2: array_search('3', {a: 3, b: 5, c: 7})
    //   returns 2: 'a'
    var strict = !!argStrict;
    var key = '';
    if (typeof needle === 'object' && needle.exec) {
        // Duck-type for RegExp
        if (!strict) {
            // Let's consider case sensitive searches as strict
            var flags = 'i' + (needle.global ? 'g' : '') +
                (needle.multiline ? 'm' : '') +
                // sticky is FF only
                (needle.sticky ? 'y' : '');
            needle = new RegExp(needle.source, flags);
        }
        for (key in haystack) {
            if (haystack.hasOwnProperty(key)) {
                if (needle.test(haystack[key])) {
                    return key;
                }
            }
        }
        return false;
    }
    for (key in haystack) {
        if (haystack.hasOwnProperty(key)) {
            if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) { // eslint-disable-line eqeqeq
                return key;
            }
        }
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3NlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUztJQUNqRSxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsMEVBQTBFO0lBQzFFLHdCQUF3QjtJQUN4QixvR0FBb0c7SUFDcEcseUJBQXlCO0lBQ3pCLHFEQUFxRDtJQUNyRCxtQkFBbUI7SUFFbkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtJQUN4QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQzdDLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsbURBQW1EO1lBQ25ELElBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUMxQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUM1QixNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUMxQztRQUNELEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUNwQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDOUIsT0FBTyxHQUFHLENBQUE7aUJBQ1g7YUFDRjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUNwQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRSw2QkFBNkI7Z0JBQy9HLE9BQU8sR0FBRyxDQUFBO2FBQ1g7U0FDRjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==