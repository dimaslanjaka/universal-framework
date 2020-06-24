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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGVkX3ByaW50YWJsZV9lbmNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvcXVvdGVkX3ByaW50YWJsZV9lbmNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLHVCQUF1QixDQUFFLEdBQUc7SUFDcEQsK0RBQStEO0lBQy9ELHdEQUF3RDtJQUN4RCxvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELGdEQUFnRDtJQUNoRCwyQkFBMkI7SUFDM0IsK0RBQStEO0lBQy9ELDBDQUEwQztJQUMxQyx1SEFBdUg7SUFDdkgsbUdBQW1HO0lBQ25HLHNCQUFzQjtJQUV0QixJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQy9GLElBQUksZ0JBQWdCLEdBQUcseUJBQXlCLENBQUE7SUFDaEQsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLE1BQU07UUFDdEMsMEVBQTBFO1FBQzFFLCtDQUErQztRQUMvQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDbEM7UUFDRCw0QkFBNEI7UUFDNUIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM5QixPQUFPLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2xFLENBQUMsQ0FBQTtJQUVELDZGQUE2RjtJQUM3RixrR0FBa0c7SUFDbEcsMkZBQTJGO0lBQzNGLDJDQUEyQztJQUUzQyxJQUFJLGdCQUFnQixHQUFHLDJCQUEyQixDQUFBO0lBQ2xELElBQUksaUJBQWlCLEdBQUcsVUFBVSxNQUFNO1FBQ3RDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtZQUMvQyxPQUFPLE1BQU0sQ0FBQTtTQUNkO1FBQ0QsT0FBTyxNQUFNLEdBQUcsT0FBTyxDQUFBO0lBQ3pCLENBQUMsQ0FBQTtJQUVELEdBQUcsR0FBRyxHQUFHO1NBQ04sT0FBTyxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDO1NBQzVDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBRS9DLDRCQUE0QjtJQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFBIn0=