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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnNvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L3Jzb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsUUFBUSxFQUFFLFNBQVM7SUFDbEQsNkNBQTZDO0lBQzdDLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDhFQUE4RTtJQUM5RSw4RUFBOEU7SUFDOUUscUVBQXFFO0lBQ3JFLHdGQUF3RjtJQUN4RixxRkFBcUY7SUFDckYsc0ZBQXNGO0lBQ3RGLGlHQUFpRztJQUNqRyxvRkFBb0Y7SUFDcEYseUZBQXlGO0lBQ3pGLHdGQUF3RjtJQUN4RiwyRkFBMkY7SUFDM0YsOENBQThDO0lBQzlDLG1FQUFtRTtJQUNuRSxxRUFBcUU7SUFDckUsZ0VBQWdFO0lBQ2hFLDJDQUEyQztJQUMzQyx3REFBd0Q7SUFDeEQsMkJBQTJCO0lBQzNCLGtDQUFrQztJQUNsQyw2Q0FBNkM7SUFDN0Msd0RBQXdEO0lBQ3hELGdGQUFnRjtJQUNoRiw4QkFBOEI7SUFDOUIscUNBQXFDO0lBQ3JDLGtFQUFrRTtJQUNsRSxzQkFBc0I7SUFFdEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFDckQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFFL0MsSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQzNCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFP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