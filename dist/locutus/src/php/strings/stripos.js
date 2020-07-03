module.exports = function stripos(fHaystack, fNeedle, fOffset) {
    //  discuss at: https://locutus.io/php/stripos/
    // original by: Martijn Wieringa
    //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: stripos('ABC', 'a')
    //   returns 1: 0
    var haystack = (fHaystack + '').toLowerCase();
    var needle = (fNeedle + '').toLowerCase();
    var index = 0;
    if ((index = haystack.indexOf(needle, fOffset)) !== -1) {
        return index;
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBvcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmlwb3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDNUQsK0NBQStDO0lBQy9DLGdDQUFnQztJQUNoQyw4REFBOEQ7SUFDOUQsbUNBQW1DO0lBQ25DLGlCQUFpQjtJQUVqQixJQUFJLFFBQVEsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUM3QyxJQUFJLE1BQU0sR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7SUFFYixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDdEQsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=