module.exports = function sort(inputArr, sortFlags) {
    //  discuss at: https://locutus.io/php/sort/
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
    //   example 1: sort($arr)
    //   example 1: var $result = $arr
    //   returns 1: ['Kevin', 'Zonneveld', 'van']
    //   example 2: ini_set('locutus.sortByReference', true)
    //   example 2: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    //   example 2: sort($fruits)
    //   example 2: var $result = $fruits
    //   returns 2: {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
    //        test: skip-1
    var i18nlgd = require('../i18n/i18n_loc_get_default');
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
            // leave sorter undefined, so built-in comparison is used
            break;
        case 'SORT_LOCALE_STRING':
            // compare items as strings, based on the current locale
            // (set with i18n_loc_set_default() as of PHP6)
            var loc = $locutus.php.locales[i18nlgd()];
            if (loc && loc.sorting) {
                // if sorting exists on locale object, use it
                // otherwise let sorter be undefined
                // to fallback to built-in behavior
                sorter = loc.sorting;
            }
            break;
        case 'SORT_NUMERIC':
            // compare items numerically
            sorter = function (a, b) {
                return (a - b);
            };
            break;
        case 'SORT_REGULAR':
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9zb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsUUFBUSxFQUFFLFNBQVM7SUFDakQsNENBQTRDO0lBQzVDLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDhFQUE4RTtJQUM5RSw4RUFBOEU7SUFDOUUscUVBQXFFO0lBQ3JFLHdGQUF3RjtJQUN4RixxRkFBcUY7SUFDckYsc0ZBQXNGO0lBQ3RGLGlHQUFpRztJQUNqRyxvRkFBb0Y7SUFDcEYseUZBQXlGO0lBQ3pGLHdGQUF3RjtJQUN4RiwyRkFBMkY7SUFDM0YsOENBQThDO0lBQzlDLG1FQUFtRTtJQUNuRSxxRUFBcUU7SUFDckUsZ0VBQWdFO0lBQ2hFLDJDQUEyQztJQUMzQyx3REFBd0Q7SUFDeEQsMEJBQTBCO0lBQzFCLGtDQUFrQztJQUNsQyw2Q0FBNkM7SUFDN0Msd0RBQXdEO0lBQ3hELGdGQUFnRjtJQUNoRiw2QkFBNkI7SUFDN0IscUNBQXFDO0lBQ3JDLGtFQUFrRTtJQUNsRSxzQkFBc0I7SUFFdEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFFckQsSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQzNCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxD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