module.exports = function preg_quote(str, delimiter) {
    //  discuss at: https://locutus.io/php/preg_quote/
    // original by: booeyOH
    // improved by: Ates Goral (https://magnetiq.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: preg_quote("$40")
    //   returns 1: '\\$40'
    //   example 2: preg_quote("*RRRING* Hello?")
    //   returns 2: '\\*RRRING\\* Hello\\?'
    //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:")
    //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'
    return (str + '')
        .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZ19xdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9wY3JlL3ByZWdfcXVvdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxHQUFHLEVBQUUsU0FBUztJQUNsRCxrREFBa0Q7SUFDbEQsdUJBQXVCO0lBQ3ZCLGlEQUFpRDtJQUNqRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxpQ0FBaUM7SUFDakMsdUJBQXVCO0lBQ3ZCLDZDQUE2QztJQUM3Qyx1Q0FBdUM7SUFDdkMsa0RBQWtEO0lBQ2xELDRFQUE0RTtJQUU1RSxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNkLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxpQ0FBaUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDbkcsQ0FBQyxDQUFBIn0=