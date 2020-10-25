module.exports = function str_replace(search, replace, subject, countObj) {
    //  discuss at: https://locutus.io/php/str_replace/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Gabriel Paderni
    // improved by: Philip Peterson
    // improved by: Simon Willison (https://simonwillison.net)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //  revised by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // bugfixed by: Anton Ongson
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Oleg Eremeev
    // bugfixed by: Glen Arason (https://CanadianDomainRegistry.ca)
    // bugfixed by: Glen Arason (https://CanadianDomainRegistry.ca)
    //    input by: Onno Marsman (https://twitter.com/onnomarsman)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //    input by: Oleg Eremeev
    //      note 1: The countObj parameter (optional) if used must be passed in as a
    //      note 1: object. The count will then be written by reference into it's `value` property
    //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld')
    //   returns 1: 'Kevin.van.Zonneveld'
    //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars')
    //   returns 2: 'hemmo, mars'
    //   example 3: str_replace(Array('S','F'),'x','ASDFASDF')
    //   returns 3: 'AxDxAxDx'
    //   example 4: var countObj = {}
    //   example 4: str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , countObj)
    //   example 4: var $result = countObj.value
    //   returns 4: 4
    var i = 0;
    var j = 0;
    var temp = '';
    var repl = '';
    var sl = 0;
    var fl = 0;
    var f = [].concat(search);
    var r = [].concat(replace);
    var s = subject;
    var ra = Object.prototype.toString.call(r) === '[object Array]';
    var sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    if (typeof (search) === 'object' && typeof (replace) === 'string') {
        temp = replace;
        replace = [];
        for (i = 0; i < search.length; i += 1) {
            replace[i] = temp;
        }
        temp = '';
        r = [].concat(replace);
        ra = Object.prototype.toString.call(r) === '[object Array]';
    }
    if (typeof countObj !== 'undefined') {
        countObj.value = 0;
    }
    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (typeof countObj !== 'undefined') {
                countObj.value += ((temp.split(f[j])).length - 1);
            }
        }
    }
    return sa ? s : s[0];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3JlcGxhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJfcmVwbGFjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVE7SUFDdkUsbURBQW1EO0lBQ25ELG9EQUFvRDtJQUNwRCwrQkFBK0I7SUFDL0IsK0JBQStCO0lBQy9CLDBEQUEwRDtJQUMxRCxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxxRUFBcUU7SUFDckUsNEJBQTRCO0lBQzVCLG9EQUFvRDtJQUNwRCw0QkFBNEI7SUFDNUIsK0RBQStEO0lBQy9ELCtEQUErRDtJQUMvRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELDRCQUE0QjtJQUM1QixnRkFBZ0Y7SUFDaEYsOEZBQThGO0lBQzlGLDREQUE0RDtJQUM1RCxxQ0FBcUM7SUFDckMsNEVBQTRFO0lBQzVFLDZCQUE2QjtJQUM3QiwwREFBMEQ7SUFDMUQsMEJBQTBCO0lBQzFCLGlDQUFpQztJQUNqQyx5RUFBeUU7SUFDekUsNENBQTRDO0lBQzVDLGlCQUFpQjtJQUVqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFDYixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFDYixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDVixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7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