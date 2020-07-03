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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3dXJsZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3VybC9yYXd1cmxlbmNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxHQUFHO0lBQ3pDLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsMEJBQTBCO0lBQzFCLHlEQUF5RDtJQUN6RCxrQ0FBa0M7SUFDbEMsNkJBQTZCO0lBQzdCLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsMEJBQTBCO0lBQzFCLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsd0RBQXdEO0lBQ3hELGlFQUFpRTtJQUNqRSxzRUFBc0U7SUFDdEUsMENBQTBDO0lBQzFDLHlEQUF5RDtJQUN6RCxpREFBaUQ7SUFDakQsb0RBQW9EO0lBQ3BELDhDQUE4QztJQUM5QyxvRkFBb0Y7SUFDcEYsc0ZBQXNGO0lBRXRGLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUVoQixvRkFBb0Y7SUFDcEYscUNBQXFDO0lBQ3JDLGlGQUFpRjtJQUNqRixPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztTQUMzQixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQzFCLENBQUMsQ0FBQSJ9