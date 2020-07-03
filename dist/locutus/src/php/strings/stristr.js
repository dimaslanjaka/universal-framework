module.exports = function stristr(haystack, needle, bool) {
    //  discuss at: https://locutus.io/php/stristr/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: stristr('Kevin van Zonneveld', 'Van')
    //   returns 1: 'van Zonneveld'
    //   example 2: stristr('Kevin van Zonneveld', 'VAN', true)
    //   returns 2: 'Kevin '
    var pos = 0;
    haystack += '';
    pos = haystack.toLowerCase()
        .indexOf((needle + '')
        .toLowerCase());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXN0ci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmlzdHIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUk7SUFDdkQsK0NBQStDO0lBQy9DLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQscURBQXFEO0lBQ3JELCtCQUErQjtJQUMvQiwyREFBMkQ7SUFDM0Qsd0JBQXdCO0lBRXhCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUVYLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDZCxHQUFHLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRTtTQUN6QixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ25CLFdBQVcsRUFBRSxDQUFDLENBQUE7SUFDbkIsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDZCxPQUFPLEtBQUssQ0FBQTtLQUNiO1NBQU07UUFDTCxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7U0FDL0I7YUFBTTtZQUNMLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUMzQjtLQUNGO0FBQ0gsQ0FBQyxDQUFBIn0=