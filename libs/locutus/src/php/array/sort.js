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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvc29ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFFLFFBQVEsRUFBRSxTQUFTO0lBQ2pELDRDQUE0QztJQUM1QyxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw4RUFBOEU7SUFDOUUsOEVBQThFO0lBQzlFLHFFQUFxRTtJQUNyRSx3RkFBd0Y7SUFDeEYscUZBQXFGO0lBQ3JGLHNGQUFzRjtJQUN0RixpR0FBaUc7SUFDakcsb0ZBQW9GO0lBQ3BGLHlGQUF5RjtJQUN6Rix3RkFBd0Y7SUFDeEYsMkZBQTJGO0lBQzNGLDhDQUE4QztJQUM5QyxtRUFBbUU7SUFDbkUscUVBQXFFO0lBQ3JFLGdFQUFnRTtJQUNoRSwyQ0FBMkM7SUFDM0Msd0RBQXdEO0lBQ3hELDBCQUEwQjtJQUMxQixrQ0FBa0M7SUFDbEMsNkNBQTZDO0lBQzdDLHdEQUF3RDtJQUN4RCxnRkFBZ0Y7SUFDaEYsNkJBQTZCO0lBQzdCLHFDQUFxQztJQUNyQyxrRUFBa0U7SUFDbEUsc0JBQXNCO0lBRXRCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0lBRXJELElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQTtJQUMzQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFFcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6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