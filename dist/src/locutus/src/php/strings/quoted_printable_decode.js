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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGVkX3ByaW50YWJsZV9kZWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9xdW90ZWRfcHJpbnRhYmxlX2RlY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsdUJBQXVCLENBQUUsR0FBRztJQUNwRCxvRUFBb0U7SUFDcEUsbUNBQW1DO0lBQ25DLHlEQUF5RDtJQUN6RCw2REFBNkQ7SUFDN0QsNkRBQTZEO0lBQzdELHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsNEJBQTRCO0lBQzVCLHdFQUF3RTtJQUN4RSwyQ0FBMkM7SUFDM0MscUlBQXFJO0lBQ3JJLHVHQUF1RztJQUN2RywyR0FBMkc7SUFDM0csZ0ZBQWdGO0lBRWhGLHFEQUFxRDtJQUNyRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUE7SUFFOUIsNEZBQTRGO0lBQzVGLElBQUksZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUE7SUFDMUMseUNBQXlDO0lBRXpDLElBQUksaUJBQWlCLEdBQUcsVUFBVSxNQUFNLEVBQUUsSUFBSTtRQUM1QyxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2hELENBQUMsQ0FBQTtJQUVELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO1NBQ25DLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2pELENBQUMsQ0FBQSJ9