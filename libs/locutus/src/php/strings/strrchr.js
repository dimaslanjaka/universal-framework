module.exports = function strrchr(haystack, needle) {
    //  discuss at: https://locutus.io/php/strrchr/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: Jason Wong (https://carrot.org/)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: strrchr("Line 1\nLine 2\nLine 3", 10).substr(1)
    //   returns 1: 'Line 3'
    var pos = 0;
    if (typeof needle !== 'string') {
        needle = String.fromCharCode(parseInt(needle, 10));
    }
    needle = needle.charAt(0);
    pos = haystack.lastIndexOf(needle);
    if (pos === -1) {
        return false;
    }
    return haystack.substr(pos);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycmNoci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJyY2hyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsUUFBUSxFQUFFLE1BQU07SUFDakQsK0NBQStDO0lBQy9DLG9EQUFvRDtJQUNwRCxnREFBZ0Q7SUFDaEQsb0RBQW9EO0lBQ3BELCtEQUErRDtJQUMvRCx3QkFBd0I7SUFFeEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBRVgsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQ25EO0lBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDekIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDZCxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzdCLENBQUMsQ0FBQSJ9