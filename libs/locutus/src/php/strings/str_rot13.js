module.exports = function str_rot13(str) {
    //  discuss at: https://locutus.io/php/str_rot13/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // improved by: Ates Goral (https://magnetiq.com)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: str_rot13('Kevin van Zonneveld')
    //   returns 1: 'Xriva ina Mbaariryq'
    //   example 2: str_rot13('Xriva ina Mbaariryq')
    //   returns 2: 'Kevin van Zonneveld'
    //   example 3: str_rot13(33)
    //   returns 3: '33'
    return (str + '')
        .replace(/[a-z]/gi, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3JvdDEzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cl9yb3QxMy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLEdBQUc7SUFDdEMsaURBQWlEO0lBQ2pELHFFQUFxRTtJQUNyRSxpREFBaUQ7SUFDakQseURBQXlEO0lBQ3pELDhEQUE4RDtJQUM5RCxnREFBZ0Q7SUFDaEQscUNBQXFDO0lBQ3JDLGdEQUFnRDtJQUNoRCxxQ0FBcUM7SUFDckMsNkJBQTZCO0lBQzdCLG9CQUFvQjtJQUVwQixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNkLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO1FBQzdCLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDbEYsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEifQ==