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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3dXJsZGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC91cmwvcmF3dXJsZGVjb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsR0FBRztJQUN6Qyx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELDBCQUEwQjtJQUMxQix5REFBeUQ7SUFDekQsNkJBQTZCO0lBQzdCLDBCQUEwQjtJQUMxQix5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx5RUFBeUU7SUFDekUsNERBQTREO0lBQzVELDBDQUEwQztJQUMxQywyREFBMkQ7SUFDM0QsMkNBQTJDO0lBQzNDLDREQUE0RDtJQUM1RCxzQ0FBc0M7SUFDdEMsK0ZBQStGO0lBQy9GLGlFQUFpRTtJQUVqRSxPQUFPLGtCQUFrQixDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNqQyxPQUFPLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsK0NBQStDO1FBQy9DLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNQLENBQUMsQ0FBQSJ9