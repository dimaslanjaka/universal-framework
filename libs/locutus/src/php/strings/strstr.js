module.exports = function strstr(haystack, needle, bool) {
    //  discuss at: https://locutus.io/php/strstr/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //   example 1: strstr('Kevin van Zonneveld', 'van')
    //   returns 1: 'van Zonneveld'
    //   example 2: strstr('Kevin van Zonneveld', 'van', true)
    //   returns 2: 'Kevin '
    //   example 3: strstr('name@example.com', '@')
    //   returns 3: '@example.com'
    //   example 4: strstr('name@example.com', '@', true)
    //   returns 4: 'name'
    var pos = 0;
    haystack += '';
    pos = haystack.indexOf(needle);
    if (pos === -1) {
        return false;
    }
    else {
        if (bool) {
            return haystack.substr(0, pos);
        }
        else {
            return haystack.slice(pos);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Ryc3RyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cnN0ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSTtJQUN0RCw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELCtCQUErQjtJQUMvQiwwREFBMEQ7SUFDMUQsd0JBQXdCO0lBQ3hCLCtDQUErQztJQUMvQyw4QkFBOEI7SUFDOUIscURBQXFEO0lBQ3JELHNCQUFzQjtJQUV0QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFFWCxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ2QsR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDOUIsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDZCxPQUFPLEtBQUssQ0FBQTtLQUNiO1NBQU07UUFDTCxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7U0FDL0I7YUFBTTtZQUNMLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUMzQjtLQUNGO0FBQ0gsQ0FBQyxDQUFBIn0=