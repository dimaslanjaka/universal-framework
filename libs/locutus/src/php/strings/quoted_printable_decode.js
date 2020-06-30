module.exports = function quoted_printable_decode(str) {
    //       discuss at: https://locutus.io/php/quoted_printable_decode/
    //      original by: Ole Vrijenhoek
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Theriault (https://github.com/Theriault)
    // reimplemented by: Theriault (https://github.com/Theriault)
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //        example 1: quoted_printable_decode('a=3Db=3Dc')
    //        returns 1: 'a=b=c'
    //        example 2: quoted_printable_decode('abc  =20\r\n123  =20\r\n')
    //        returns 2: 'abc   \r\n123   \r\n'
    //        example 3: quoted_printable_decode('012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n56789')
    //        returns 3: '01234567890123456789012345678901234567890123456789012345678901234567890123456789'
    //        example 4: quoted_printable_decode("Lorem ipsum dolor sit amet=23, consectetur adipisicing elit")
    //        returns 4: 'Lorem ipsum dolor sit amet#, consectetur adipisicing elit'
    // Decodes all equal signs followed by two hex digits
    var RFC2045Decode1 = /=\r\n/gm;
    // the RFC states against decoding lower case encodings, but following apparent PHP behavior
    var RFC2045Decode2IN = /=([0-9A-F]{2})/gim;
    // RFC2045Decode2IN = /=([0-9A-F]{2})/gm,
    var RFC2045Decode2OUT = function (sMatch, sHex) {
        return String.fromCharCode(parseInt(sHex, 16));
    };
    return str.replace(RFC2045Decode1, '')
        .replace(RFC2045Decode2IN, RFC2045Decode2OUT);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGVkX3ByaW50YWJsZV9kZWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvcXVvdGVkX3ByaW50YWJsZV9kZWNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLHVCQUF1QixDQUFFLEdBQUc7SUFDcEQsb0VBQW9FO0lBQ3BFLG1DQUFtQztJQUNuQyx5REFBeUQ7SUFDekQsNkRBQTZEO0lBQzdELDZEQUE2RDtJQUM3RCx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELDRCQUE0QjtJQUM1Qix3RUFBd0U7SUFDeEUsMkNBQTJDO0lBQzNDLHFJQUFxSTtJQUNySSx1R0FBdUc7SUFDdkcsMkdBQTJHO0lBQzNHLGdGQUFnRjtJQUVoRixxREFBcUQ7SUFDckQsSUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFBO0lBRTlCLDRGQUE0RjtJQUM1RixJQUFJLGdCQUFnQixHQUFHLG1CQUFtQixDQUFBO0lBQzFDLHlDQUF5QztJQUV6QyxJQUFJLGlCQUFpQixHQUFHLFVBQVUsTUFBTSxFQUFFLElBQUk7UUFDNUMsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNoRCxDQUFDLENBQUE7SUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztTQUNuQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCxDQUFDLENBQUEifQ==