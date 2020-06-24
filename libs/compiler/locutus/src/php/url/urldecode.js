module.exports = function urldecode(str) {
    //       discuss at: https://locutus.io/php/urldecode/
    //      original by: Philip Peterson
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //      improved by: Lars Fischer
    //      improved by: Orlando
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //         input by: AJ
    //         input by: travc
    //         input by: Brett Zamir (https://brett-zamir.me)
    //         input by: Ratheous
    //         input by: e-mike
    //         input by: lovio
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Rob
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //           note 1: info on what encoding functions to use from:
    //           note 1: https://xkr.us/articles/javascript/encode-compare/
    //           note 1: Please be aware that this function expects to decode
    //           note 1: from UTF-8 encoded strings, as found on
    //           note 1: pages served as UTF-8
    //        example 1: urldecode('Kevin+van+Zonneveld%21')
    //        returns 1: 'Kevin van Zonneveld!'
    //        example 2: urldecode('https%3A%2F%2Fkvz.io%2F')
    //        returns 2: 'https://kvz.io/'
    //        example 3: urldecode('https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a')
    //        returns 3: 'https://www.google.nl/search?q=Locutus&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    //        example 4: urldecode('%E5%A5%BD%3_4')
    //        returns 4: '\u597d%3_4'
    return decodeURIComponent((str + '')
        .replace(/%(?![\da-f]{2})/gi, function () {
        // PHP tolerates poorly formed escape sequences
        return '%25';
    })
        .replace(/\+/g, '%20'));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsZGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC91cmwvdXJsZGVjb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsR0FBRztJQUN0QyxzREFBc0Q7SUFDdEQsb0NBQW9DO0lBQ3BDLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELGlDQUFpQztJQUNqQyw0QkFBNEI7SUFDNUIseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx1QkFBdUI7SUFDdkIsMEJBQTBCO0lBQzFCLHlEQUF5RDtJQUN6RCw2QkFBNkI7SUFDN0IsMkJBQTJCO0lBQzNCLDBCQUEwQjtJQUMxQix5REFBeUQ7SUFDekQsd0JBQXdCO0lBQ3hCLHlEQUF5RDtJQUN6RCxpRUFBaUU7SUFDakUsdUVBQXVFO0lBQ3ZFLHlFQUF5RTtJQUN6RSw0REFBNEQ7SUFDNUQsMENBQTBDO0lBQzFDLHdEQUF3RDtJQUN4RCwyQ0FBMkM7SUFDM0MseURBQXlEO0lBQ3pELHNDQUFzQztJQUN0QyxvTEFBb0w7SUFDcEwscUlBQXFJO0lBQ3JJLCtDQUErQztJQUMvQyxpQ0FBaUM7SUFFakMsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDakMsT0FBTyxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLCtDQUErQztRQUMvQyxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUMsQ0FBQztTQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==