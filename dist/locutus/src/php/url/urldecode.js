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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsZGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3VybC91cmxkZWNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxHQUFHO0lBQ3RDLHNEQUFzRDtJQUN0RCxvQ0FBb0M7SUFDcEMseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsaUNBQWlDO0lBQ2pDLDRCQUE0QjtJQUM1Qix5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHVCQUF1QjtJQUN2QiwwQkFBMEI7SUFDMUIseURBQXlEO0lBQ3pELDZCQUE2QjtJQUM3QiwyQkFBMkI7SUFDM0IsMEJBQTBCO0lBQzFCLHlEQUF5RDtJQUN6RCx3QkFBd0I7SUFDeEIseURBQXlEO0lBQ3pELGlFQUFpRTtJQUNqRSx1RUFBdUU7SUFDdkUseUVBQXlFO0lBQ3pFLDREQUE0RDtJQUM1RCwwQ0FBMEM7SUFDMUMsd0RBQXdEO0lBQ3hELDJDQUEyQztJQUMzQyx5REFBeUQ7SUFDekQsc0NBQXNDO0lBQ3RDLG9MQUFvTDtJQUNwTCxxSUFBcUk7SUFDckksK0NBQStDO0lBQy9DLGlDQUFpQztJQUVqQyxPQUFPLGtCQUFrQixDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNqQyxPQUFPLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsK0NBQStDO1FBQy9DLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQyxDQUFDO1NBQ0QsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQSJ9