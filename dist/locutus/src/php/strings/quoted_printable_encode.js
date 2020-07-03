module.exports = function quoted_printable_encode(str) {
    //  discuss at: https://locutus.io/php/quoted_printable_encode/
    // original by: Theriault (https://github.com/Theriault)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Theriault (https://github.com/Theriault)
    //   example 1: quoted_printable_encode('a=b=c')
    //   returns 1: 'a=3Db=3Dc'
    //   example 2: quoted_printable_encode('abc   \r\n123   \r\n')
    //   returns 2: 'abc  =20\r\n123  =20\r\n'
    //   example 3: quoted_printable_encode('0123456789012345678901234567890123456789012345678901234567890123456789012345')
    //   returns 3: '012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n5'
    //        test: skip-2
    var hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var RFC2045Encode1IN = / \r\n|\r\n|[^!-<>-~ ]/gm;
    var RFC2045Encode1OUT = function (sMatch) {
        // Encode space before CRLF sequence to prevent spaces from being stripped
        // Keep hard line breaks intact; CRLF sequences
        if (sMatch.length > 1) {
            return sMatch.replace(' ', '=20');
        }
        // Encode matching character
        var chr = sMatch.charCodeAt(0);
        return '=' + hexChars[((chr >>> 4) & 15)] + hexChars[(chr & 15)];
    };
    // Split lines to 75 characters; the reason it's 75 and not 76 is because softline breaks are
    // preceeded by an equal sign; which would be the 76th character. However, if the last line/string
    // was exactly 76 characters, then a softline would not be needed. PHP currently softbreaks
    // anyway; so this function replicates PHP.
    var RFC2045Encode2IN = /.{1,72}(?!\r\n)[^=]{0,3}/g;
    var RFC2045Encode2OUT = function (sMatch) {
        if (sMatch.substr(sMatch.length - 2) === '\r\n') {
            return sMatch;
        }
        return sMatch + '=\r\n';
    };
    str = str
        .replace(RFC2045Encode1IN, RFC2045Encode1OUT)
        .replace(RFC2045Encode2IN, RFC2045Encode2OUT);
    // Strip last softline break
    return str.substr(0, str.length - 3);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGVkX3ByaW50YWJsZV9lbmNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9xdW90ZWRfcHJpbnRhYmxlX2VuY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsdUJBQXVCLENBQUUsR0FBRztJQUNwRCwrREFBK0Q7SUFDL0Qsd0RBQXdEO0lBQ3hELG9EQUFvRDtJQUNwRCx3REFBd0Q7SUFDeEQsZ0RBQWdEO0lBQ2hELDJCQUEyQjtJQUMzQiwrREFBK0Q7SUFDL0QsMENBQTBDO0lBQzFDLHVIQUF1SDtJQUN2SCxtR0FBbUc7SUFDbkcsc0JBQXNCO0lBRXRCLElBQUksUUFBUSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDL0YsSUFBSSxnQkFBZ0IsR0FBRyx5QkFBeUIsQ0FBQTtJQUNoRCxJQUFJLGlCQUFpQixHQUFHLFVBQVUsTUFBTTtRQUN0QywwRUFBMEU7UUFDMUUsK0NBQStDO1FBQy9DLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUNsQztRQUNELDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlCLE9BQU8sR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDbEUsQ0FBQyxDQUFBO0lBRUQsNkZBQTZGO0lBQzdGLGtHQUFrRztJQUNsRywyRkFBMkY7SUFDM0YsMkNBQTJDO0lBRTNDLElBQUksZ0JBQWdCLEdBQUcsMkJBQTJCLENBQUE7SUFDbEQsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLE1BQU07UUFDdEMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQy9DLE9BQU8sTUFBTSxDQUFBO1NBQ2Q7UUFDRCxPQUFPLE1BQU0sR0FBRyxPQUFPLENBQUE7SUFDekIsQ0FBQyxDQUFBO0lBRUQsR0FBRyxHQUFHLEdBQUc7U0FDTixPQUFPLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUM7U0FDNUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUE7SUFFL0MsNEJBQTRCO0lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUEifQ==