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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBvcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJpcG9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPO0lBQzVELCtDQUErQztJQUMvQyxnQ0FBZ0M7SUFDaEMsOERBQThEO0lBQzlELG1DQUFtQztJQUNuQyxpQkFBaUI7SUFFakIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDN0MsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDekMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0lBRWIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3RELE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9