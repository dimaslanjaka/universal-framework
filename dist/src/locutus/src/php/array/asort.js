module.exports = function asort(inputArr, sortFlags) {
    //  discuss at: https://locutus.io/php/asort/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Theriault (https://github.com/Theriault)
    //    input by: paulo kuong
    // bugfixed by: Adam Wallner (https://web2.bitbaro.hu/)
    //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    //      note 1: integrated into all of these functions by adapting the code at
    //      note 1: https://sourcefrog.net/projects/natsort/natcompare.js
    //      note 1: The examples are correct, this is a new way
    //      note 1: Credits to: https://javascript.internet.com/math-related/bubble-sort.html
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
    //   example 1: asort($data)
    //   example 1: var $result = $data
    //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    //   example 2: ini_set('locutus.sortByReference', true)
    //   example 2: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    //   example 2: asort($data)
    //   example 2: var $result = $data
    //   returns 2: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    var strnatcmp = require('../strings/strnatcmp');
    var i18nlgd = require('../i18n/i18n_loc_get_default');
    var valArr = [];
    var valArrLen = 0;
    var k;
    var i;
    var sorter;
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
                return strnatcmp(a, b);
            };
            break;
        case 'SORT_LOCALE_STRING':
            // compare items as strings, based on the current locale
            // (set with i18n_loc_set_default() as of PHP6)
            var loc = i18nlgd();
            sorter = $locutus.php.locales[loc].sorting;
            break;
        case 'SORT_NUMERIC':
            // compare items numerically
            sorter = function (a, b) {
                return (a - b);
            };
            break;
        case 'SORT_REGULAR':
            // compare items normally (don't change types)
            break;
        default:
            sorter = function (a, b) {
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
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
    sortByReference = iniVal === 'on';
    populateArr = sortByReference ? inputArr : populateArr;
    // Get key and value arrays
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            valArr.push([k, inputArr[k]]);
            if (sortByReference) {
                delete inputArr[k];
            }
        }
    }
    valArr.sort(function (a, b) {
        return sorter(a[1], b[1]);
    });
    // Repopulate the old array
    for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
        populateArr[valArr[i][0]] = valArr[i][1];
    }
    return sortByReference || populateArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxRQUFRLEVBQUUsU0FBUztJQUNsRCw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELDJCQUEyQjtJQUMzQix1REFBdUQ7SUFDdkQsOEVBQThFO0lBQzlFLDhFQUE4RTtJQUM5RSxxRUFBcUU7SUFDckUsMkRBQTJEO0lBQzNELHlGQUF5RjtJQUN6Rix3RkFBd0Y7SUFDeEYscUZBQXFGO0lBQ3JGLHNGQUFzRjtJQUN0RixpR0FBaUc7SUFDakcsb0ZBQW9GO0lBQ3BGLHlGQUF5RjtJQUN6Rix3RkFBd0Y7SUFDeEYsMkZBQTJGO0lBQzNGLDhDQUE4QztJQUM5QyxtRUFBbUU7SUFDbkUscUVBQXFFO0lBQ3JFLGdFQUFnRTtJQUNoRSwyQ0FBMkM7SUFDM0MsOEVBQThFO0lBQzlFLDRCQUE0QjtJQUM1QixtQ0FBbUM7SUFDbkMsa0VBQWtFO0lBQ2xFLHdEQUF3RDtJQUN4RCw4RUFBOEU7SUFDOUUsNEJBQTRCO0lBQzVCLG1DQUFtQztJQUNuQyxrRUFBa0U7SUFFbEUsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDL0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFFckQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFBO0lBQ2pCLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLE1BQU0sQ0FBQTtJQUNWLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQTtJQUMzQixJQUFJLFdB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