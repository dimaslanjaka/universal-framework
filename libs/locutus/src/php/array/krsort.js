module.exports = function krsort(inputArr, sortFlags) {
    //  discuss at: https://locutus.io/php/krsort/
    // original by: GeekFG (https://geekfg.blogspot.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: pseudaria (https://github.com/pseudaria)
    //      note 1: The examples are correct, this is a new way
    //      note 1: This function deviates from PHP in returning a copy of the array instead
    //      note 1: of acting by reference and returning true; this was necessary because
    //      note 1: IE does not allow deleting and re-adding of properties without caching
    //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
    //      note 1: get the PHP behavior, but use this only if you are in an environment
    //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
    //      note 1: property deletion is supported. Note that we intend to implement the PHP
    //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    //      note 1: is by reference in PHP anyways
    //      note 1: Since JS objects' keys are always strings, and (the
    //      note 1: default) SORT_REGULAR flag distinguishes by key type,
    //      note 1: if the content is a numeric string, we treat the
    //      note 1: "original type" as numeric.
    //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    //   example 1: krsort($data)
    //   example 1: var $result = $data
    //   returns 1: {d: 'lemon', c: 'apple', b: 'banana', a: 'orange'}
    //   example 2: ini_set('locutus.sortByReference', true)
    //   example 2: var $data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
    //   example 2: krsort($data)
    //   example 2: var $result = $data
    //   returns 2: {3: 'Zonneveld', 2: 'van', 1: 'Kevin'}
    var i18nlgd = require('../i18n/i18n_loc_get_default');
    var strnatcmp = require('../strings/strnatcmp');
    var tmpArr = {};
    var keys = [];
    var sorter;
    var i;
    var k;
    var sortByReference = false;
    var populateArr = {};
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    $locutus.php.locales = $locutus.php.locales || {};
    switch (sortFlags) {
        case 'SORT_STRING':
            // compare items as strings
            sorter = function (a, b) {
                return strnatcmp(b, a);
            };
            break;
        case 'SORT_LOCALE_STRING':
            // compare items as strings, based on the current locale
            // (set with i18n_loc_set_default() as of PHP6)
            var loc = i18nlgd();
            sorter = $locutus.locales[loc].sorting;
            break;
        case 'SORT_NUMERIC':
            // compare items numerically
            sorter = function (a, b) {
                return (b - a);
            };
            break;
        case 'SORT_REGULAR':
        default:
            // compare items normally (don't change types)
            sorter = function (b, a) {
                var aFloat = parseFloat(a);
                var bFloat = parseFloat(b);
                var aNumeric = aFloat + '' === a;
                var bNumeric = bFloat + '' === b;
                if (aNumeric && bNumeric) {
                    return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
                }
                else if (aNumeric && !bNumeric) {
                    return 1;
                }
                else if (!aNumeric && bNumeric) {
                    return -1;
                }
                return a > b ? 1 : a < b ? -1 : 0;
            };
            break;
    }
    // Make a list of key names
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    keys.sort(sorter);
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
    sortByReference = iniVal === 'on';
    populateArr = sortByReference ? inputArr : populateArr;
    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        k = keys[i];
        tmpArr[k] = inputArr[k];
        if (sortByReference) {
            delete inputArr[k];
        }
    }
    for (i in tmpArr) {
        if (tmpArr.hasOwnProperty(i)) {
            populateArr[i] = tmpArr[i];
        }
    }
    return sortByReference || populateArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3Jzb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9rcnNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBRSxRQUFRLEVBQUUsU0FBUztJQUNuRCw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELDJEQUEyRDtJQUMzRCx3RkFBd0Y7SUFDeEYscUZBQXFGO0lBQ3JGLHNGQUFzRjtJQUN0RixpR0FBaUc7SUFDakcsb0ZBQW9GO0lBQ3BGLHlGQUF5RjtJQUN6Rix3RkFBd0Y7SUFDeEYsMkZBQTJGO0lBQzNGLDhDQUE4QztJQUM5QyxtRUFBbUU7SUFDbkUscUVBQXFFO0lBQ3JFLGdFQUFnRTtJQUNoRSwyQ0FBMkM7SUFDM0MsOEVBQThFO0lBQzlFLDZCQUE2QjtJQUM3QixtQ0FBbUM7SUFDbkMsa0VBQWtFO0lBQ2xFLHdEQUF3RDtJQUN4RCxrRUFBa0U7SUFDbEUsNkJBQTZCO0lBQzdCLG1DQUFtQztJQUNuQyxzREFBc0Q7SUFFdEQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFDckQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFFL0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQzNCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFD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