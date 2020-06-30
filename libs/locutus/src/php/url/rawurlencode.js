module.exports = function rawurlencode(str) {
    //       discuss at: https://locutus.io/php/rawurlencode/
    //      original by: Brett Zamir (https://brett-zamir.me)
    //         input by: travc
    //         input by: Brett Zamir (https://brett-zamir.me)
    //         input by: Michael Grier
    //         input by: Ratheous
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Joris
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //           note 1: This reflects PHP 5.3/6.0+ behavior
    //           note 1: Please be aware that this function expects \
    //           note 1: to encode into UTF-8 encoded strings, as found on
    //           note 1: pages served as UTF-8
    //        example 1: rawurlencode('Kevin van Zonneveld!')
    //        returns 1: 'Kevin%20van%20Zonneveld%21'
    //        example 2: rawurlencode('https://kvz.io/')
    //        returns 2: 'https%3A%2F%2Fkvz.io%2F'
    //        example 3: rawurlencode('https://www.google.nl/search?q=Locutus&ie=utf-8')
    //        returns 3: 'https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'
    str = (str + '');
    // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
    // but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3dXJsZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC91cmwvcmF3dXJsZW5jb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsR0FBRztJQUN6Qyx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELDBCQUEwQjtJQUMxQix5REFBeUQ7SUFDekQsa0NBQWtDO0lBQ2xDLDZCQUE2QjtJQUM3Qix5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELDBCQUEwQjtJQUMxQix5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHdEQUF3RDtJQUN4RCxpRUFBaUU7SUFDakUsc0VBQXNFO0lBQ3RFLDBDQUEwQztJQUMxQyx5REFBeUQ7SUFDekQsaURBQWlEO0lBQ2pELG9EQUFvRDtJQUNwRCw4Q0FBOEM7SUFDOUMsb0ZBQW9GO0lBQ3BGLHNGQUFzRjtJQUV0RixHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFFaEIsb0ZBQW9GO0lBQ3BGLHFDQUFxQztJQUNyQyxpRkFBaUY7SUFDakYsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7U0FDM0IsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7U0FDcEIsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7U0FDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDckIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7U0FDckIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==