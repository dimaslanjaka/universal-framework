module.exports = function ksort(inputArr, sortFlags) {
    //  discuss at: https://locutus.io/php/ksort/
    // original by: GeekFG (https://geekfg.blogspot.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
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
    //   example 1: ksort($data)
    //   example 1: var $result = $data
    //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
    //   example 2: ini_set('locutus.sortByReference', true)
    //   example 2: var $data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
    //   example 2: ksort($data)
    //   example 2: var $result = $data
    //   returns 2: {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}
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
                return ((a + 0) - (b + 0));
            };
            break;
        default:
            // case 'SORT_REGULAR': // compare items normally (don't change types)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3NvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkva3NvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxRQUFRLEVBQUUsU0FBUztJQUNsRCw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0ZBQXdGO0lBQ3hGLHFGQUFxRjtJQUNyRixzRkFBc0Y7SUFDdEYsaUdBQWlHO0lBQ2pHLG9GQUFvRjtJQUNwRix5RkFBeUY7SUFDekYsd0ZBQXdGO0lBQ3hGLDJGQUEyRjtJQUMzRiw4Q0FBOEM7SUFDOUMsbUVBQW1FO0lBQ25FLHFFQUFxRTtJQUNyRSxnRUFBZ0U7SUFDaEUsMkNBQTJDO0lBQzNDLDhFQUE4RTtJQUM5RSw0QkFBNEI7SUFDNUIsbUNBQW1DO0lBQ25DLGtFQUFrRTtJQUNsRSx3REFBd0Q7SUFDeEQsa0VBQWtFO0lBQ2xFLDRCQUE0QjtJQUM1QixtQ0FBbUM7SUFDbkMsc0RBQXNEO0lBRXRELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0lBQ3JELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBRS9DLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQTtJQUMzQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFFcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO0lBRWpELFFBQVEsU0FBUyxFQUFFO1FBQ2pCLEtBQUssYUFBYTtZQUNoQiwyQkFBMkI7WUFDM0IsTUFBTSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN4QixDQUFDLENBQUE7WUFDRCxNQUFLO1FBQ1AsS0FBSyxvQkFBb0I7WUFDdkIsd0RBQXdEO1lBQ3hELCtDQUErQztZQUMvQyxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQTtZQUNuQixNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUE7WUFDdEMsTUFBSztRQUNQLEtBQUssY0FBYztZQUNqQiw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzVCLENBQUMsQ0FBQTtZQUNELE1BQUs7UUFDUDtZQUNFLHNFQUFzRTtZQUN0RSxNQUFNLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUMxQixJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFCLElBQUksUUFBUSxHQUFHLE1BQU0sR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO2dCQUNoQyxJQUFJLFFBQVEsR0FBRyxNQUFNLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtnQkFDaEMsSUFBSSxRQUFRLElBQUksUUFBUSxFQUFFO29CQUN4QixPQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDdEQ7cUJBQU0sSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2hDLE9BQU8sQ0FBQyxDQUFBO2lCQUNUO3FCQUFNLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO29CQUNoQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2lCQUNWO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ25DLENBQUMsQ0FBQTtZQUNELE1BQUs7S0FDUjtJQUVELDJCQUEyQjtJQUMzQixLQUFLLENBQUMsSUFBSSxRQUFRLEVBQUU7UUFDbEIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDYjtLQUNGO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUVqQixJQUFJLE1BQU0sR0FBRyxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFBO0lBQ3pILGVBQWUsR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFBO0lBQ2pDLFdBQVcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFBO0lBRXRELHNDQUFzQztJQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkIsSUFBSSxlQUFlLEVBQUU7WUFDbkIsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbkI7S0FDRjtJQUNELEtBQUssQ0FBQyxJQUFJLE1BQU0sRUFBRTtRQUNoQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUMzQjtLQUNGO0lBRUQsT0FBTyxlQUFlLElBQUksV0FBVyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQSJ9