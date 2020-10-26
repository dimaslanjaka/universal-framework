module.exports = function strtr(str, trFrom, trTo) {
    //  discuss at: https://locutus.io/php/strtr/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: uestla
    //    input by: Alan C
    //    input by: Taras Bogach
    //    input by: jpfle
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $trans = {'hello' : 'hi', 'hi' : 'hello'}
    //   example 1: strtr('hi all, I said hello', $trans)
    //   returns 1: 'hello all, I said hi'
    //   example 2: strtr('äaabaåccasdeöoo', 'äåö','aao')
    //   returns 2: 'aaabaaccasdeooo'
    //   example 3: strtr('ääääääää', 'ä', 'a')
    //   returns 3: 'aaaaaaaa'
    //   example 4: strtr('http', 'pthxyz','xyzpth')
    //   returns 4: 'zyyx'
    //   example 5: strtr('zyyx', 'pthxyz','xyzpth')
    //   returns 5: 'http'
    //   example 6: strtr('aa', {'a':1,'aa':2})
    //   returns 6: '2'
    var krsort = require('../array/krsort');
    var iniSet = require('../info/ini_set');
    var fr = '';
    var i = 0;
    var j = 0;
    var lenStr = 0;
    var lenFrom = 0;
    var sortByReference = false;
    var fromTypeStr = '';
    var toTypeStr = '';
    var istr = '';
    var tmpFrom = [];
    var tmpTo = [];
    var ret = '';
    var match = false;
    // Received replace_pairs?
    // Convert to normal trFrom->trTo chars
    if (typeof trFrom === 'object') {
        // Not thread-safe; temporarily set to true
        // @todo: Don't rely on ini here, use internal krsort instead
        sortByReference = iniSet('locutus.sortByReference', false);
        trFrom = krsort(trFrom);
        iniSet('locutus.sortByReference', sortByReference);
        for (fr in trFrom) {
            if (trFrom.hasOwnProperty(fr)) {
                tmpFrom.push(fr);
                tmpTo.push(trFrom[fr]);
            }
        }
        trFrom = tmpFrom;
        trTo = tmpTo;
    }
    // Walk through subject and replace chars when needed
    lenStr = str.length;
    lenFrom = trFrom.length;
    fromTypeStr = typeof trFrom === 'string';
    toTypeStr = typeof trTo === 'string';
    for (i = 0; i < lenStr; i++) {
        match = false;
        if (fromTypeStr) {
            istr = str.charAt(i);
            for (j = 0; j < lenFrom; j++) {
                if (istr === trFrom.charAt(j)) {
                    match = true;
                    break;
                }
            }
        }
        else {
            for (j = 0; j < lenFrom; j++) {
                if (str.substr(i, trFrom[j].length) === trFrom[j]) {
                    match = true;
                    // Fast forward
                    i = (i + trFrom[j].length) - 1;
                    break;
                }
            }
        }
        if (match) {
            ret += toTypeStr ? trTo.charAt(j) : trTo[j];
        }
        else {
            ret += str.charAt(i);
        }
    }
    return ret;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJ0ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSTtJQUNoRCw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELHNCQUFzQjtJQUN0QixzQkFBc0I7SUFDdEIsNEJBQTRCO0lBQzVCLHFCQUFxQjtJQUNyQixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsNkRBQTZEO0lBQzdELHFEQUFxRDtJQUNyRCxzQ0FBc0M7SUFDdEMscURBQXFEO0lBQ3JELGlDQUFpQztJQUNqQywyQ0FBMkM7SUFDM0MsMEJBQTBCO0lBQzFCLGdEQUFnRDtJQUNoRCxzQkFBc0I7SUFDdEIsZ0RBQWdEO0lBQ2hELHNCQUFzQjtJQUN0QiwyQ0FBMkM7SUFDM0MsbUJBQW1CO0lBRW5CLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3ZDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBRXZDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUNkLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUNmLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQTtJQUMzQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFDcEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksT0FBTyxHQUFHLEVB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