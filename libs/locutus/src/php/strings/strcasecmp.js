module.exports = function strcasecmp(fString1, fString2) {
    //  discuss at: https://locutus.io/php/strcasecmp/
    // original by: Martijn Wieringa
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: strcasecmp('Hello', 'hello')
    //   returns 1: 0
    var string1 = (fString1 + '').toLowerCase();
    var string2 = (fString2 + '').toLowerCase();
    if (string1 > string2) {
        return 1;
    }
    else if (string1 === string2) {
        return 0;
    }
    return -1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyY2FzZWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJjYXNlY21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsUUFBUSxFQUFFLFFBQVE7SUFDdEQsa0RBQWtEO0lBQ2xELGdDQUFnQztJQUNoQyw4REFBOEQ7SUFDOUQsNENBQTRDO0lBQzVDLGlCQUFpQjtJQUVqQixJQUFJLE9BQU8sR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQyxJQUFJLE9BQU8sR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUUzQyxJQUFJLE9BQU8sR0FBRyxPQUFPLEVBQUU7UUFDckIsT0FBTyxDQUFDLENBQUE7S0FDVDtTQUFNLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtRQUM5QixPQUFPLENBQUMsQ0FBQTtLQUNUO0lBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUNYLENBQUMsQ0FBQSJ9