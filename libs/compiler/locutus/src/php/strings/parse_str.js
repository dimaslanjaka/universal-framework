module.exports = function parse_str(str, array) {
    //       discuss at: https://locutus.io/php/parse_str/
    //      original by: Cagri Ekin
    //      improved by: Michael White (https://getsprink.com)
    //      improved by: Jack
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: stag019
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: MIO_KODUKI (https://mio-koduki.blogspot.com/)
    // reimplemented by: stag019
    //         input by: Dreamer
    //         input by: Zaide (https://zaidesthings.com/)
    //         input by: David Pesta (https://davidpesta.com/)
    //         input by: jeicquest
    //      bugfixed by: Rafał Kukawski
    //           note 1: When no argument is specified, will put variables in global scope.
    //           note 1: When a particular argument has been passed, and the
    //           note 1: returned value is different parse_str of PHP.
    //           note 1: For example, a=b=c&d====c
    //        example 1: var $arr = {}
    //        example 1: parse_str('first=foo&second=bar', $arr)
    //        example 1: var $result = $arr
    //        returns 1: { first: 'foo', second: 'bar' }
    //        example 2: var $arr = {}
    //        example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', $arr)
    //        example 2: var $result = $arr
    //        returns 2: { str_a: "Jack and Jill didn't see the well." }
    //        example 3: var $abc = {3:'a'}
    //        example 3: parse_str('a[b]["c"]=def&a[q]=t+5', $abc)
    //        example 3: var $result = $abc
    //        returns 3: {"3":"a","a":{"b":{"c":"def"},"q":"t 5"}}
    //        example 4: var $arr = {}
    //        example 4: parse_str('a[][]=value', $arr)
    //        example 4: var $result = $arr
    //        returns 4: {"a":{"0":{"0":"value"}}}
    //        example 5: var $arr = {}
    //        example 5: parse_str('a=1&a[]=2', $arr)
    //        example 5: var $result = $arr
    //        returns 5: {"a":{"0":"2"}}
    var strArr = String(str).replace(/^&/, '').replace(/&$/, '').split('&');
    var sal = strArr.length;
    var i;
    var j;
    var ct;
    var p;
    var lastObj;
    var obj;
    var chr;
    var tmp;
    var key;
    var value;
    var postLeftBracketPos;
    var keys;
    var keysLen;
    var _fixStr = function (str) {
        return decodeURIComponent(str.replace(/\+/g, '%20'));
    };
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    if (!array) {
        array = $global;
    }
    for (i = 0; i < sal; i++) {
        tmp = strArr[i].split('=');
        key = _fixStr(tmp[0]);
        value = (tmp.length < 2) ? '' : _fixStr(tmp[1]);
        while (key.charAt(0) === ' ') {
            key = key.slice(1);
        }
        if (key.indexOf('\x00') > -1) {
            key = key.slice(0, key.indexOf('\x00'));
        }
        if (key && key.charAt(0) !== '[') {
            keys = [];
            postLeftBracketPos = 0;
            for (j = 0; j < key.length; j++) {
                if (key.charAt(j) === '[' && !postLeftBracketPos) {
                    postLeftBracketPos = j + 1;
                }
                else if (key.charAt(j) === ']') {
                    if (postLeftBracketPos) {
                        if (!keys.length) {
                            keys.push(key.slice(0, postLeftBracketPos - 1));
                        }
                        keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
                        postLeftBracketPos = 0;
                        if (key.charAt(j + 1) !== '[') {
                            break;
                        }
                    }
                }
            }
            if (!keys.length) {
                keys = [key];
            }
            for (j = 0; j < keys[0].length; j++) {
                chr = keys[0].charAt(j);
                if (chr === ' ' || chr === '.' || chr === '[') {
                    keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
                }
                if (chr === '[') {
                    break;
                }
            }
            obj = array;
            for (j = 0, keysLen = keys.length; j < keysLen; j++) {
                key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
                lastObj = obj;
                if ((key === '' || key === ' ') && j !== 0) {
                    // Insert new dimension
                    ct = -1;
                    for (p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            if (+p > ct && p.match(/^\d+$/g)) {
                                ct = +p;
                            }
                        }
                    }
                    key = ct + 1;
                }
                // if primitive value, replace with object
                if (Object(obj[key]) !== obj[key]) {
                    obj[key] = {};
                }
                obj = obj[key];
            }
            lastObj[key] = value;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2Vfc3RyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3BhcnNlX3N0ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLEdBQUcsRUFBRSxLQUFLO0lBQzdDLHNEQUFzRDtJQUN0RCwrQkFBK0I7SUFDL0IsMERBQTBEO0lBQzFELHlCQUF5QjtJQUN6Qix5REFBeUQ7SUFDekQsbUVBQW1FO0lBQ25FLHlEQUF5RDtJQUN6RCw0QkFBNEI7SUFDNUIseURBQXlEO0lBQ3pELGtFQUFrRTtJQUNsRSw0QkFBNEI7SUFDNUIsNEJBQTRCO0lBQzVCLHNEQUFzRDtJQUN0RCwwREFBMEQ7SUFDMUQsOEJBQThCO0lBQzlCLG1DQUFtQztJQUNuQyx1RkFBdUY7SUFDdkYsd0VBQXdFO0lBQ3hFLGtFQUFrRTtJQUNsRSw4Q0FBOEM7SUFDOUMsa0NBQWtDO0lBQ2xDLDREQUE0RDtJQUM1RCx1Q0FBdUM7SUFDdkMsb0RBQW9EO0lBQ3BELGtDQUFrQztJQUNsQyxrRkFBa0Y7SUFDbEYsdUNBQXVDO0lBQ3ZDLG9FQUFvRTtJQUNwRSx1Q0FBdUM7SUFDdkMsOERBQThEO0lBQzlELHVDQUF1QztJQUN2Qyw4REFBOEQ7SUFDOUQsa0NBQWtDO0lBQ2xDLG1EQUFtRDtJQUNuRCx1Q0FBdUM7SUFDdkMsOENBQThDO0lBQzlDLGtDQUFrQztJQUNsQyxpREFBaUQ7SUFDakQsdUNBQXVDO0lBQ3ZDLG9DQUFvQztJQUVwQyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2RSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFB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