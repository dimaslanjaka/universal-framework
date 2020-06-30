module.exports = function array_multisort(arr) {
    //  discuss at: https://locutus.io/php/array_multisort/
    // original by: Theriault (https://github.com/Theriault)
    // improved by: Oleg Andreyev (https://github.com/oleg-andreyev)
    //   example 1: array_multisort([1, 2, 1, 2, 1, 2], [1, 2, 3, 4, 5, 6])
    //   returns 1: true
    //   example 2: var $characters = {A: 'Edward', B: 'Locke', C: 'Sabin', D: 'Terra', E: 'Edward'}
    //   example 2: var $jobs = {A: 'Warrior', B: 'Thief', C: 'Monk', D: 'Mage', E: 'Knight'}
    //   example 2: array_multisort($characters, 'SORT_DESC', 'SORT_STRING', $jobs, 'SORT_ASC', 'SORT_STRING')
    //   returns 2: true
    //   example 3: var $lastnames = [ 'Carter','Adams','Monroe','Tyler','Madison','Kennedy','Adams']
    //   example 3: var $firstnames = ['James', 'John' ,'James', 'John', 'James',  'John',   'John']
    //   example 3: var $president = [ 39, 6, 5, 10, 4, 35, 2 ]
    //   example 3: array_multisort($firstnames, 'SORT_DESC', 'SORT_STRING', $lastnames, 'SORT_ASC', 'SORT_STRING', $president, 'SORT_NUMERIC')
    //   returns 3: true
    //      note 1: flags: Translation table for sort arguments.
    //      note 1: Each argument turns on certain bits in the flag byte through addition.
    //      note 1: bits: HGFE DCBA
    //      note 1: args: Holds pointer to arguments for reassignment
    var g;
    var i;
    var j;
    var k;
    var l;
    var sal;
    var vkey;
    var elIndex;
    var lastSorts;
    var tmpArray;
    var zlast;
    var sortFlag = [0];
    var thingsToSort = [];
    var nLastSort = [];
    var lastSort = [];
    // possibly redundant
    var args = arguments;
    var flags = {
        'SORT_REGULAR': 16,
        'SORT_NUMERIC': 17,
        'SORT_STRING': 18,
        'SORT_ASC': 32,
        'SORT_DESC': 40
    };
    var sortDuplicator = function (a, b) {
        return nLastSort.shift();
    };
    var sortFunctions = [
        [
            function (a, b) {
                lastSort.push(a > b ? 1 : (a < b ? -1 : 0));
                return a > b ? 1 : (a < b ? -1 : 0);
            },
            function (a, b) {
                lastSort.push(b > a ? 1 : (b < a ? -1 : 0));
                return b > a ? 1 : (b < a ? -1 : 0);
            }
        ],
        [
            function (a, b) {
                lastSort.push(a - b);
                return a - b;
            },
            function (a, b) {
                lastSort.push(b - a);
                return b - a;
            }
        ],
        [
            function (a, b) {
                lastSort.push((a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0));
                return (a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0);
            },
            function (a, b) {
                lastSort.push((b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0));
                return (b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0);
            }
        ]
    ];
    var sortArrs = [
        []
    ];
    var sortKeys = [
        []
    ];
    // Store first argument into sortArrs and sortKeys if an Object.
    // First Argument should be either a Javascript Array or an Object,
    // otherwise function would return FALSE like in PHP
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        sortArrs[0] = arr;
    }
    else if (arr && typeof arr === 'object') {
        for (i in arr) {
            if (arr.hasOwnProperty(i)) {
                sortKeys[0].push(i);
                sortArrs[0].push(arr[i]);
            }
        }
    }
    else {
        return false;
    }
    // arrMainLength: Holds the length of the first array.
    // All other arrays must be of equal length, otherwise function would return FALSE like in PHP
    // sortComponents: Holds 2 indexes per every section of the array
    // that can be sorted. As this is the start, the whole array can be sorted.
    var arrMainLength = sortArrs[0].length;
    var sortComponents = [0, arrMainLength];
    // Loop through all other arguments, checking lengths and sort flags
    // of arrays and adding them to the above variables.
    var argl = arguments.length;
    for (j = 1; j < argl; j++) {
        if (Object.prototype.toString.call(arguments[j]) === '[object Array]') {
            sortArrs[j] = arguments[j];
            sortFlag[j] = 0;
            if (arguments[j].length !== arrMainLength) {
                return false;
            }
        }
        else if (arguments[j] && typeof arguments[j] === 'object') {
            sortKeys[j] = [];
            sortArrs[j] = [];
            sortFlag[j] = 0;
            for (i in arguments[j]) {
                if (arguments[j].hasOwnProperty(i)) {
                    sortKeys[j].push(i);
                    sortArrs[j].push(arguments[j][i]);
                }
            }
            if (sortArrs[j].length !== arrMainLength) {
                return false;
            }
        }
        else if (typeof arguments[j] === 'string') {
            var lFlag = sortFlag.pop();
            // Keep extra parentheses around latter flags check
            // to avoid minimization leading to CDATA closer
            if (typeof flags[arguments[j]] === 'undefined' ||
                ((((flags[arguments[j]]) >>> 4) & (lFlag >>> 4)) > 0)) {
                return false;
            }
            sortFlag.push(lFlag + flags[arguments[j]]);
        }
        else {
            return false;
        }
    }
    for (i = 0; i !== arrMainLength; i++) {
        thingsToSort.push(true);
    }
    // Sort all the arrays....
    for (i in sortArrs) {
        if (sortArrs.hasOwnProperty(i)) {
            lastSorts = [];
            tmpArray = [];
            elIndex = 0;
            nLastSort = [];
            lastSort = [];
            // If there are no sortComponents, then no more sorting is neeeded.
            // Copy the array back to the argument.
            if (sortComponents.length === 0) {
                if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
                    args[i] = sortArrs[i];
                }
                else {
                    for (k in arguments[i]) {
                        if (arguments[i].hasOwnProperty(k)) {
                            delete arguments[i][k];
                        }
                    }
                    sal = sortArrs[i].length;
                    for (j = 0, vkey = 0; j < sal; j++) {
                        vkey = sortKeys[i][j];
                        args[i][vkey] = sortArrs[i][j];
                    }
                }
                sortArrs.splice(i, 1);
                sortKeys.splice(i, 1);
                continue;
            }
            // Sort function for sorting. Either sorts asc or desc, regular/string or numeric.
            var sFunction = sortFunctions[(sortFlag[i] & 3)][((sortFlag[i] & 8) > 0) ? 1 : 0];
            // Sort current array.
            for (l = 0; l !== sortComponents.length; l += 2) {
                tmpArray = sortArrs[i].slice(sortComponents[l], sortComponents[l + 1] + 1);
                tmpArray.sort(sFunction);
                // Is there a better way to copy an array in Javascript?
                lastSorts[l] = [].concat(lastSort);
                elIndex = sortComponents[l];
                for (g in tmpArray) {
                    if (tmpArray.hasOwnProperty(g)) {
                        sortArrs[i][elIndex] = tmpArray[g];
                        elIndex++;
                    }
                }
            }
            // Duplicate the sorting of the current array on future arrays.
            sFunction = sortDuplicator;
            for (j in sortArrs) {
                if (sortArrs.hasOwnProperty(j)) {
                    if (sortArrs[j] === sortArrs[i]) {
                        continue;
                    }
                    for (l = 0; l !== sortComponents.length; l += 2) {
                        tmpArray = sortArrs[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
                        // alert(l + ':' + nLastSort);
                        nLastSort = [].concat(lastSorts[l]);
                        tmpArray.sort(sFunction);
                        elIndex = sortComponents[l];
                        for (g in tmpArray) {
                            if (tmpArray.hasOwnProperty(g)) {
                                sortArrs[j][elIndex] = tmpArray[g];
                                elIndex++;
                            }
                        }
                    }
                }
            }
            // Duplicate the sorting of the current array on array keys
            for (j in sortKeys) {
                if (sortKeys.hasOwnProperty(j)) {
                    for (l = 0; l !== sortComponents.length; l += 2) {
                        tmpArray = sortKeys[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
                        nLastSort = [].concat(lastSorts[l]);
                        tmpArray.sort(sFunction);
                        elIndex = sortComponents[l];
                        for (g in tmpArray) {
                            if (tmpArray.hasOwnProperty(g)) {
                                sortKeys[j][elIndex] = tmpArray[g];
                                elIndex++;
                            }
                        }
                    }
                }
            }
            // Generate the next sortComponents
            zlast = null;
            sortComponents = [];
            for (j in sortArrs[i]) {
                if (sortArrs[i].hasOwnProperty(j)) {
                    if (!thingsToSort[j]) {
                        if ((sortComponents.length & 1)) {
                            sortComponents.push(j - 1);
                        }
                        zlast = null;
                        continue;
                    }
                    if (!(sortComponents.length & 1)) {
                        if (zlast !== null) {
                            if (sortArrs[i][j] === zlast) {
                                sortComponents.push(j - 1);
                            }
                            else {
                                thingsToSort[j] = false;
                            }
                        }
                        zlast = sortArrs[i][j];
                    }
                    else {
                        if (sortArrs[i][j] !== zlast) {
                            sortComponents.push(j - 1);
                            zlast = sortArrs[i][j];
                        }
                    }
                }
            }
            if (sortComponents.length & 1) {
                sortComponents.push(j);
            }
            if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
                args[i] = sortArrs[i];
            }
            else {
                for (j in arguments[i]) {
                    if (arguments[i].hasOwnProperty(j)) {
                        delete arguments[i][j];
                    }
                }
                sal = sortArrs[i].length;
                for (j = 0, vkey = 0; j < sal; j++) {
                    vkey = sortKeys[i][j];
                    args[i][vkey] = sortArrs[i][j];
                }
            }
            sortArrs.splice(i, 1);
            sortKeys.splice(i, 1);
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfbXVsdGlzb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9tdWx0aXNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGVBQWUsQ0FBRSxHQUFHO0lBQzVDLHVEQUF1RDtJQUN2RCx3REFBd0Q7SUFDeEQsZ0VBQWdFO0lBQ2hFLHVFQUF1RTtJQUN2RSxvQkFBb0I7SUFDcEIsZ0dBQWdHO0lBQ2hHLHlGQUF5RjtJQUN6RiwwR0FBMEc7SUFDMUcsb0JBQW9CO0lBQ3BCLGlHQUFpRztJQUNqRyxnR0FBZ0c7SUFDaEcsMkRBQTJEO0lBQzNELDJJQUEySTtJQUMzSSxvQkFBb0I7SUFDcEIsNERBQTREO0lBQzVELHNGQUFzRjtJQUN0RiwrQkFBK0I7SUFDL0IsaUVBQWlFO0lBRWpFLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksSUFBSSxDQUFBO0lBQ1IsSUFBSSxPQUFPLENBQUE7SUFDWCxJQUFJLFNBQVMsQ0FBQTtJQUNiLElBQUksUUFBUSxDQUFBO0lBQ1osSUFBSSxLQUFLLENBQUE7SUFFVCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQTtJQUNyQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDbEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLHFCQUFxQjtJQUNyQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUE7SUFFcEIsSUFBSSxLQUFLLEdBQUc7UUFDVixjQUFjLEVBQUUsRUFBRTtRQUNsQixjQUFjLEVBQUUsRUFBRTtRQUNsQixhQUFh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