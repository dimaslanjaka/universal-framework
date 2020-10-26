module.exports = function decbin(number) {
    //  discuss at: https://locutus.io/php/decbin/
    // original by: Enrique Gonzalez
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    //    input by: pilus
    //    input by: nord_ua
    //   example 1: decbin(12)
    //   returns 1: '1100'
    //   example 2: decbin(26)
    //   returns 2: '11010'
    //   example 3: decbin('26')
    //   returns 3: '11010'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10)
        .toString(2);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjYmluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvZGVjYmluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsTUFBTTtJQUN0Qyw4Q0FBOEM7SUFDOUMsZ0NBQWdDO0lBQ2hDLDhEQUE4RDtJQUM5RCxxR0FBcUc7SUFDckcscUJBQXFCO0lBQ3JCLHVCQUF1QjtJQUN2QiwwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLDBCQUEwQjtJQUMxQix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLHVCQUF1QjtJQUV2QixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDZCxNQUFNLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUE7S0FDakM7SUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ3hCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNoQixDQUFDLENBQUEifQ==