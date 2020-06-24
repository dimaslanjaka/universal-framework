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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9zZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVM7SUFDakUsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDBFQUEwRTtJQUMxRSx3QkFBd0I7SUFDeEIsb0dBQW9HO0lBQ3BHLHlCQUF5QjtJQUN6QixxREFBcUQ7SUFDckQsbUJBQW1CO0lBRW5CLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUE7SUFDeEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtRQUM3Qyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLG1EQUFtRDtZQUNuRCxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDMUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDN0Isb0JBQW9CO2dCQUNwQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDNUIsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDMUM7UUFDRCxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDcEIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzlCLE9BQU8sR0FBRyxDQUFBO2lCQUNYO2FBQ0Y7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7UUFDcEIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUUsNkJBQTZCO2dCQUMvRyxPQUFPLEdBQUcsQ0FBQTthQUNYO1NBQ0Y7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=