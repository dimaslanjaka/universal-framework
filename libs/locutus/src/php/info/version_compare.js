module.exports = function version_compare(v1, v2, operator) {
    //       discuss at: https://locutus.io/php/version_compare/
    //      original by: Philippe Jausions (https://pear.php.net/user/jausions)
    //      original by: Aidan Lister (https://aidanlister.com/)
    // reimplemented by: Kankrelune (https://www.webfaktory.info/)
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //      improved by: Scott Baker
    //      improved by: Theriault (https://github.com/Theriault)
    //        example 1: version_compare('8.2.5rc', '8.2.5a')
    //        returns 1: 1
    //        example 2: version_compare('8.2.50', '8.2.52', '<')
    //        returns 2: true
    //        example 3: version_compare('5.3.0-dev', '5.3.0')
    //        returns 3: -1
    //        example 4: version_compare('4.1.0.52','4.01.0.51')
    //        returns 4: 1
    // Important: compare must be initialized at 0.
    var i;
    var x;
    var compare = 0;
    // vm maps textual PHP versions to negatives so they're less than 0.
    // PHP currently defines these as CASE-SENSITIVE. It is important to
    // leave these as negatives so that they can come before numerical versions
    // and as if no letters were there to begin with.
    // (1alpha is < 1 and < 1.1 but > 1dev1)
    // If a non-numerical value can't be mapped to this table, it receives
    // -7 as its value.
    var vm = {
        'dev': -6,
        'alpha': -5,
        'a': -5,
        'beta': -4,
        'b': -4,
        'RC': -3,
        'rc': -3,
        '#': -2,
        'p': 1,
        'pl': 1
    };
    // This function will be called to prepare each version argument.
    // It replaces every _, -, and + with a dot.
    // It surrounds any nonsequence of numbers/dots with dots.
    // It replaces sequences of dots with a single dot.
    //    version_compare('4..0', '4.0') === 0
    // Important: A string of 0 length needs to be converted into a value
    // even less than an unexisting value in vm (-7), hence [-8].
    // It's also important to not strip spaces because of this.
    //   version_compare('', ' ') === 1
    var _prepVersion = function (v) {
        v = ('' + v).replace(/[_\-+]/g, '.');
        v = v.replace(/([^.\d]+)/g, '.$1.').replace(/\.{2,}/g, '.');
        return (!v.length ? [-8] : v.split('.'));
    };
    // This converts a version component to a number.
    // Empty component becomes 0.
    // Non-numerical component becomes a negative number.
    // Numerical component becomes itself as an integer.
    var _numVersion = function (v) {
        return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));
    };
    v1 = _prepVersion(v1);
    v2 = _prepVersion(v2);
    x = Math.max(v1.length, v2.length);
    for (i = 0; i < x; i++) {
        if (v1[i] === v2[i]) {
            continue;
        }
        v1[i] = _numVersion(v1[i]);
        v2[i] = _numVersion(v2[i]);
        if (v1[i] < v2[i]) {
            compare = -1;
            break;
        }
        else if (v1[i] > v2[i]) {
            compare = 1;
            break;
        }
    }
    if (!operator) {
        return compare;
    }
    // Important: operator is CASE-SENSITIVE.
    // "No operator" seems to be treated as "<."
    // Any other values seem to make the function return null.
    switch (operator) {
        case '>':
        case 'gt':
            return (compare > 0);
        case '>=':
        case 'ge':
            return (compare >= 0);
        case '<=':
        case 'le':
            return (compare <= 0);
        case '===':
        case '=':
        case 'eq':
            return (compare === 0);
        case '<>':
        case '!==':
        case 'ne':
            return (compare !== 0);
        case '':
        case '<':
        case 'lt':
            return (compare < 0);
        default:
            return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbl9jb21wYXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9pbmZvL3ZlcnNpb25fY29tcGFyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUTtJQUN6RCw0REFBNEQ7SUFDNUQsMkVBQTJFO0lBQzNFLDREQUE0RDtJQUM1RCw4REFBOEQ7SUFDOUQseURBQXlEO0lBQ3pELGdDQUFnQztJQUNoQyw2REFBNkQ7SUFDN0QseURBQXlEO0lBQ3pELHNCQUFzQjtJQUN0Qiw2REFBNkQ7SUFDN0QseUJBQXlCO0lBQ3pCLDBEQUEwRDtJQUMxRCx1QkFBdUI7SUFDdkIsNERBQTREO0lBQzVELHNCQUFzQjtJQUV0QiwrQ0FBK0M7SUFDL0MsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUVmLG9FQUFvRTtJQUNwRSxvRUFBb0U7SUFDcEUsMkVBQTJFO0lBQzNFLGlEQUFpRDtJQUNqRCx3Q0FBd0M7SUFDeEMsc0VBQXNFO0lBQ3RFLG1CQUFtQjtJQUNuQixJQUFJLEVBQUUsR0FBRztRQUNQLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDVCxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNQLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDVixHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNSLElBQUksRUFBRSxDQUFDLENBQUM7UUFDUixHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1AsR0FBRyxFQUFFLENBQUM7UUFDTixJQUFJLEVBQUUsQ0FBQztLQUNSLENBQUE7SUFFRCxpRUFBaUU7SUFDakUsNENBQTRDO0lBQzVDLDBEQUEwRDtJQUMxRCxt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