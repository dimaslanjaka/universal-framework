module.exports = function rsort(inputArr, sortFlags) {
    //  discuss at: https://locutus.io/php/rsort/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //  revised by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    //      note 1: integrated into all of these functions by adapting the code at
    //      note 1: https://sourcefrog.net/projects/natsort/natcompare.js
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
    //   example 1: var $arr = ['Kevin', 'van', 'Zonneveld']
    //   example 1: rsort($arr)
    //   example 1: var $result = $arr
    //   returns 1: ['van', 'Zonneveld', 'Kevin']
    //   example 2: ini_set('locutus.sortByReference', true)
    //   example 2: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    //   example 2: rsort($fruits)
    //   example 2: var $result = $fruits
    //   returns 2: {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
    //        test: skip-1
    var i18nlgd = require('../i18n/i18n_loc_get_default');
    var strnatcmp = require('../strings/strnatcmp');
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
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
    sortByReference = iniVal === 'on';
    populateArr = sortByReference ? inputArr : populateArr;
    var valArr = [];
    for (k in inputArr) {
        // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            if (sortByReference) {
                delete inputArr[k];
            }
        }
    }
    valArr.sort(sorter);
    for (i = 0; i < valArr.length; i++) {
        // Repopulate the old array
        populateArr[i] = valArr[i];
    }
    return sortByReference || populateArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnNvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvcnNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxRQUFRLEVBQUUsU0FBUztJQUNsRCw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsOEVBQThFO0lBQzlFLDhFQUE4RTtJQUM5RSxxRUFBcUU7SUFDckUsd0ZBQXdGO0lBQ3hGLHFGQUFxRjtJQUNyRixzRkFBc0Y7SUFDdEYsaUdBQWlHO0lBQ2pHLG9GQUFvRjtJQUNwRix5RkFBeUY7SUFDekYsd0ZBQXdGO0lBQ3hGLDJGQUEyRjtJQUMzRiw4Q0FBOEM7SUFDOUMsbUVBQW1FO0lBQ25FLHFFQUFxRTtJQUNyRSxnRUFBZ0U7SUFDaEUsMkNBQTJDO0lBQzNDLHdEQUF3RDtJQUN4RCwyQkFBMkI7SUFDM0Isa0NBQWtDO0lBQ2xDLDZDQUE2QztJQUM3Qyx3REFBd0Q7SUFDeEQsZ0ZBQWdGO0lBQ2hGLDhCQUE4QjtJQUM5QixxQ0FBcUM7SUFDckMsa0VBQWtFO0lBQ2xFLHNCQUFzQjtJQUV0QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQTtJQUNyRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUUvQyxJQUFJLE1BQU0sQ0FBQTtJQUNWLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDM0IsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFBO0lBRXBCLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFB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