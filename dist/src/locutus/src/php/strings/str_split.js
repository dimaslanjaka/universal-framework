module.exports = function str_split(string, splitLength) {
    //  discuss at: https://locutus.io/php/str_split/
    // original by: Martijn Wieringa
    // improved by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //  revised by: Theriault (https://github.com/Theriault)
    //  revised by: Rafał Kukawski (https://blog.kukawski.pl)
    //    input by: Bjorn Roesbeke (https://www.bjornroesbeke.be/)
    //   example 1: str_split('Hello Friend', 3)
    //   returns 1: ['Hel', 'lo ', 'Fri', 'end']
    if (splitLength === null) {
        splitLength = 1;
    }
    if (string === null || splitLength < 1) {
        return false;
    }
    string += '';
    var chunks = [];
    var pos = 0;
    var len = string.length;
    while (pos < len) {
        chunks.push(string.slice(pos, pos += splitLength));
    }
    return chunks;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3NwbGl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RyX3NwbGl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsTUFBTSxFQUFFLFdBQVc7SUFDdEQsaURBQWlEO0lBQ2pELGdDQUFnQztJQUNoQyxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELHdEQUF3RDtJQUN4RCx5REFBeUQ7SUFDekQsOERBQThEO0lBQzlELDRDQUE0QztJQUM1Qyw0Q0FBNEM7SUFFNUMsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO1FBQ3hCLFdBQVcsR0FBRyxDQUFDLENBQUE7S0FDaEI7SUFDRCxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRTtRQUN0QyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsTUFBTSxJQUFJLEVBQUUsQ0FBQTtJQUNaLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUNYLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFFdkIsT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUE7S0FDbkQ7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9