module.exports = function urlencode(str) {
    //       discuss at: https://locutus.io/php/urlencode/
    //      original by: Philip Peterson
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //      improved by: Lars Fischer
    //      improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
    //         input by: AJ
    //         input by: travc
    //         input by: Brett Zamir (https://brett-zamir.me)
    //         input by: Ratheous
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Joris
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //           note 1: This reflects PHP 5.3/6.0+ behavior
    //           note 1: Please be aware that this function
    //           note 1: expects to encode into UTF-8 encoded strings, as found on
    //           note 1: pages served as UTF-8
    //        example 1: urlencode('Kevin van Zonneveld!')
    //        returns 1: 'Kevin+van+Zonneveld%21'
    //        example 2: urlencode('https://kvz.io/')
    //        returns 2: 'https%3A%2F%2Fkvz.io%2F'
    //        example 3: urlencode('https://www.google.nl/search?q=Locutus&ie=utf-8')
    //        returns 3: 'https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'
    str = (str + '');
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/~/g, '%7E')
        .replace(/%20/g, '+');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC91cmwvdXJsZW5jb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsR0FBRztJQUN0QyxzREFBc0Q7SUFDdEQsb0NBQW9DO0lBQ3BDLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELGlDQUFpQztJQUNqQyxnRUFBZ0U7SUFDaEUsdUJBQXVCO0lBQ3ZCLDBCQUEwQjtJQUMxQix5REFBeUQ7SUFDekQsNkJBQTZCO0lBQzdCLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsMEJBQTBCO0lBQzFCLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsd0RBQXdEO0lBQ3hELHVEQUF1RDtJQUN2RCw4RUFBOEU7SUFDOUUsMENBQTBDO0lBQzFDLHNEQUFzRDtJQUN0RCw2Q0FBNkM7SUFDN0MsaURBQWlEO0lBQ2pELDhDQUE4QztJQUM5QyxpRkFBaUY7SUFDakYsc0ZBQXNGO0lBRXRGLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUVoQixPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztTQUMzQixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3pCLENBQUMsQ0FBQSJ9