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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2Vfc3RyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvcGFyc2Vfc3RyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsR0FBRyxFQUFFLEtBQUs7SUFDN0Msc0RBQXNEO0lBQ3RELCtCQUErQjtJQUMvQiwwREFBMEQ7SUFDMUQseUJBQXlCO0lBQ3pCLHlEQUF5RDtJQUN6RCxtRUFBbUU7SUFDbkUseURBQXlEO0lBQ3pELDRCQUE0QjtJQUM1Qix5REFBeUQ7SUFDekQsa0VBQWtFO0lBQ2xFLDRCQUE0QjtJQUM1Qiw0QkFBNEI7SUFDNUIsc0RBQXNEO0lBQ3RELDBEQUEwRDtJQUMxRCw4QkFBOEI7SUFDOUIsbUNBQW1DO0lBQ25DLHVGQUF1RjtJQUN2Rix3RUFBd0U7SUFDeEUsa0VBQWtFO0lBQ2xFLDhDQUE4QztJQUM5QyxrQ0FBa0M7SUFDbEMsNERBQTREO0lBQzVELHVDQUF1QztJQUN2QyxvREFBb0Q7SUFDcEQsa0NBQWtDO0lBQ2xDLGtGQUFrRjtJQUNsRix1Q0FBdUM7SUFDdkMsb0VBQW9FO0lBQ3BFLHVDQUF1QztJQUN2Qyw4REFBOEQ7SUFDOUQsdUNBQXVDO0lBQ3ZDLDhEQUE4RDtJQUM5RCxrQ0FBa0M7SUFDbEMsbURBQW1EO0lBQ25ELHVDQUF1QztJQUN2Qyw4Q0FBOEM7SUFDOUMsa0NBQWtDO0lBQ2xDLGlEQUFpRDtJQUNqRCx1Q0FBdUM7SUFDdkMsb0NBQW9DO0lBRXBDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZFLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxN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