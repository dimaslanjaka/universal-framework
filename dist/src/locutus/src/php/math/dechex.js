module.exports = function dechex(number) {
    //  discuss at: https://locutus.io/php/dechex/
    // original by: Philippe Baumann
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    //    input by: pilus
    //   example 1: dechex(10)
    //   returns 1: 'a'
    //   example 2: dechex(47)
    //   returns 2: '2f'
    //   example 3: dechex(-1415723993)
    //   returns 3: 'ab9dc427'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10)
        .toString(16);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvZGVjaGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsTUFBTTtJQUN0Qyw4Q0FBOEM7SUFDOUMsZ0NBQWdDO0lBQ2hDLDhEQUE4RDtJQUM5RCxxR0FBcUc7SUFDckcscUJBQXFCO0lBQ3JCLDBCQUEwQjtJQUMxQixtQkFBbUI7SUFDbkIsMEJBQTBCO0lBQzFCLG9CQUFvQjtJQUNwQixtQ0FBbUM7SUFDbkMsMEJBQTBCO0lBRTFCLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNkLE1BQU0sR0FBRyxVQUFVLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQTtLQUNqQztJQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7U0FDeEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ2pCLENBQUMsQ0FBQSJ9