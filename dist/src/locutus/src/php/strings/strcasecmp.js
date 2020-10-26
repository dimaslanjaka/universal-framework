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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyY2FzZWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmNhc2VjbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxRQUFRLEVBQUUsUUFBUTtJQUN0RCxrREFBa0Q7SUFDbEQsZ0NBQWdDO0lBQ2hDLDhEQUE4RDtJQUM5RCw0Q0FBNEM7SUFDNUMsaUJBQWlCO0lBRWpCLElBQUksT0FBTyxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzNDLElBQUksT0FBTyxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRTNDLElBQUksT0FBTyxHQUFHLE9BQU8sRUFBRTtRQUNyQixPQUFPLENBQUMsQ0FBQTtLQUNUO1NBQU0sSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxDQUFBO0tBQ1Q7SUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ1gsQ0FBQyxDQUFBIn0=