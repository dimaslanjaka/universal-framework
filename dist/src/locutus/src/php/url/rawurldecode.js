module.exports = function rawurldecode(str) {
    //       discuss at: https://locutus.io/php/rawurldecode/
    //      original by: Brett Zamir (https://brett-zamir.me)
    //         input by: travc
    //         input by: Brett Zamir (https://brett-zamir.me)
    //         input by: Ratheous
    //         input by: lovio
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //           note 1: Please be aware that this function expects to decode
    //           note 1: from UTF-8 encoded strings, as found on
    //           note 1: pages served as UTF-8
    //        example 1: rawurldecode('Kevin+van+Zonneveld%21')
    //        returns 1: 'Kevin+van+Zonneveld!'
    //        example 2: rawurldecode('https%3A%2F%2Fkvz.io%2F')
    //        returns 2: 'https://kvz.io/'
    //        example 3: rawurldecode('https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3D')
    //        returns 3: 'https://www.google.nl/search?q=Locutus&ie='
    return decodeURIComponent((str + '')
        .replace(/%(?![\da-f]{2})/gi, function () {
        // PHP tolerates poorly formed escape sequences
        return '%25';
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3dXJsZGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3VybC9yYXd1cmxkZWNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxHQUFHO0lBQ3pDLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsMEJBQTBCO0lBQzFCLHlEQUF5RDtJQUN6RCw2QkFBNkI7SUFDN0IsMEJBQTBCO0lBQzFCLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHlFQUF5RTtJQUN6RSw0REFBNEQ7SUFDNUQsMENBQTBDO0lBQzFDLDJEQUEyRDtJQUMzRCwyQ0FBMkM7SUFDM0MsNERBQTREO0lBQzVELHNDQUFzQztJQUN0QywrRkFBK0Y7SUFDL0YsaUVBQWlFO0lBRWpFLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ2pDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRTtRQUM1QiwrQ0FBK0M7UUFDL0MsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ1AsQ0FBQyxDQUFBIn0=