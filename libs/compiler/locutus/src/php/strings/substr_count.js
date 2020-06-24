module.exports = function substr_count(haystack, needle, offset, length) {
    //  discuss at: https://locutus.io/php/substr_count/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Thomas
    //   example 1: substr_count('Kevin van Zonneveld', 'e')
    //   returns 1: 3
    //   example 2: substr_count('Kevin van Zonneveld', 'K', 1)
    //   returns 2: 0
    //   example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10)
    //   returns 3: false
    var cnt = 0;
    haystack += '';
    needle += '';
    if (isNaN(offset)) {
        offset = 0;
    }
    if (isNaN(length)) {
        length = 0;
    }
    if (needle.length === 0) {
        return false;
    }
    offset--;
    while ((offset = haystack.indexOf(needle, offset + 1)) !== -1) {
        if (length > 0 && (offset + needle.length) > length) {
            return false;
        }
        cnt++;
    }
    return cnt;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic3RyX2NvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N1YnN0cl9jb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07SUFDdEUsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELHNCQUFzQjtJQUN0Qix3REFBd0Q7SUFDeEQsaUJBQWlCO0lBQ2pCLDJEQUEyRDtJQUMzRCxpQkFBaUI7SUFDakIsK0RBQStEO0lBQy9ELHFCQUFxQjtJQUVyQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFFWCxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ2QsTUFBTSxJQUFJLEVBQUUsQ0FBQTtJQUNaLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pCLE1BQU0sR0FBRyxDQUFDLENBQUE7S0FDWDtJQUNELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pCLE1BQU0sR0FBRyxDQUFDLENBQUE7S0FDWDtJQUNELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELE1BQU0sRUFBRSxDQUFBO0lBRVIsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM3RCxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sRUFBRTtZQUNuRCxPQUFPLEtBQUssQ0FBQTtTQUNiO1FBQ0QsR0FBRyxFQUFFLENBQUE7S0FDTjtJQUVELE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQyxDQUFBIn0=