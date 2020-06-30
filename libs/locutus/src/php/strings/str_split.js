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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3NwbGl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cl9zcGxpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLE1BQU0sRUFBRSxXQUFXO0lBQ3RELGlEQUFpRDtJQUNqRCxnQ0FBZ0M7SUFDaEMsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCx3REFBd0Q7SUFDeEQseURBQXlEO0lBQ3pELDhEQUE4RDtJQUM5RCw0Q0FBNEM7SUFDNUMsNENBQTRDO0lBRTVDLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtRQUN4QixXQUFXLEdBQUcsQ0FBQyxDQUFBO0tBQ2hCO0lBQ0QsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUU7UUFDdEMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELE1BQU0sSUFBSSxFQUFFLENBQUE7SUFDWixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDWCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBRXZCLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFBO0tBQ25EO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==