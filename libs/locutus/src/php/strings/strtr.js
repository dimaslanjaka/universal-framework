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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RydHIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUk7SUFDaEQsNkNBQTZDO0lBQzdDLG9EQUFvRDtJQUNwRCxzQkFBc0I7SUFDdEIsc0JBQXNCO0lBQ3RCLDRCQUE0QjtJQUM1QixxQkFBcUI7SUFDckIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDZEQUE2RDtJQUM3RCxxREFBcUQ7SUFDckQsc0NBQXNDO0lBQ3RDLHFEQUFxRDtJQUNyRCxpQ0FBaUM7SUFDakMsMkNBQTJDO0lBQzNDLDBCQUEwQjtJQUMxQixnREFBZ0Q7SUFDaEQsc0JBQXNCO0lBQ3RCLGdEQUFnRDtJQUNoRCxzQkFBc0I7SUFDdEIsMkNBQTJDO0lBQzNDLG1CQUFtQjtJQUVuQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUN2QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUV2QyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDZCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUE7SUFDZixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDM0IsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFBO0lBQ3BCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFDYixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFD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