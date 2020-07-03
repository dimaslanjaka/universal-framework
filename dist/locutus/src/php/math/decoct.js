module.exports = function decoct(number) {
    //  discuss at: https://locutus.io/php/decoct/
    // original by: Enrique Gonzalez
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    //    input by: pilus
    //   example 1: decoct(15)
    //   returns 1: '17'
    //   example 2: decoct(264)
    //   returns 2: '410'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10)
        .toString(8);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvZGVjb2N0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsTUFBTTtJQUN0Qyw4Q0FBOEM7SUFDOUMsZ0NBQWdDO0lBQ2hDLDhEQUE4RDtJQUM5RCxxR0FBcUc7SUFDckcscUJBQXFCO0lBQ3JCLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsMkJBQTJCO0lBQzNCLHFCQUFxQjtJQUVyQixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDZCxNQUFNLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUE7S0FDakM7SUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ3hCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNoQixDQUFDLENBQUEifQ==