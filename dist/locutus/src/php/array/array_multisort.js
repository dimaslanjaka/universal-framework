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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfbXVsdGlzb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X211bHRpc29ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLEdBQUc7SUFDNUMsdURBQXVEO0lBQ3ZELHdEQUF3RDtJQUN4RCxnRUFBZ0U7SUFDaEUsdUVBQXVFO0lBQ3ZFLG9CQUFvQjtJQUNwQixnR0FBZ0c7SUFDaEcseUZBQXlGO0lBQ3pGLDBHQUEwRztJQUMxRyxvQkFBb0I7SUFDcEIsaUdBQWlHO0lBQ2pHLGdHQUFnRztJQUNoRywyREFBMkQ7SUFDM0QsMklBQTJJO0lBQzNJLG9CQUFvQjtJQUNwQiw0REFBNEQ7SUFDNUQsc0ZBQXNGO0lBQ3RGLCtCQUErQjtJQUMvQixpRUFBaUU7SUFFakUsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxJQUFJLENBQUE7SUFDUixJQUFJLE9BQU8sQ0FBQTtJQUNYLElBQUksU0FBUyxDQUFBO0lBQ2IsSUFBSSxRQUFRLENBQUE7SUFDWixJQUFJLEtBQUssQ0FBQTtJQUVULElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7SUFDakIscUJBQXFCO0lBQ3JCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQTtJQUVwQixJQUFJLEtBQUssR0FBRztRQUNWLGNBQWMsRUFBRSxFQUFFO1FBQ2xCLGNBQWMsRUFBRSxFQUFFO1FB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