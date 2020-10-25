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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3VybC91cmxlbmNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxHQUFHO0lBQ3RDLHNEQUFzRDtJQUN0RCxvQ0FBb0M7SUFDcEMseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsaUNBQWlDO0lBQ2pDLGdFQUFnRTtJQUNoRSx1QkFBdUI7SUFDdkIsMEJBQTBCO0lBQzFCLHlEQUF5RDtJQUN6RCw2QkFBNkI7SUFDN0IseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCwwQkFBMEI7SUFDMUIseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx3REFBd0Q7SUFDeEQsdURBQXVEO0lBQ3ZELDhFQUE4RTtJQUM5RSwwQ0FBMEM7SUFDMUMsc0RBQXNEO0lBQ3RELDZDQUE2QztJQUM3QyxpREFBaUQ7SUFDakQsOENBQThDO0lBQzlDLGlGQUFpRjtJQUNqRixzRkFBc0Y7SUFFdEYsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBRWhCLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDO1NBQzNCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFBIn0=