module.exports = function array_splice(arr, offst, lgth, replacement) {
    //  discuss at: https://locutus.io/php/array_splice/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: Theriault (https://github.com/Theriault)
    //      note 1: Order does get shifted in associative array input with numeric indices,
    //      note 1: since PHP behavior doesn't preserve keys, but I understand order is
    //      note 1: not reliable anyways
    //      note 1: Note also that IE retains information about property position even
    //      note 1: after being supposedly deleted, so use of this function may produce
    //      note 1: unexpected results in IE if you later attempt to add back properties
    //      note 1: with the same keys that had been deleted
    //   example 1: var $input = {4: "red", 'abc': "green", 2: "blue", 'dud': "yellow"}
    //   example 1: array_splice($input, 2)
    //   returns 1: {4: "red", 'abc': "green"}
    //   example 2: var $input = ["red", "green", "blue", "yellow"]
    //   example 2: array_splice($input, 3, 0, "purple")
    //   returns 2: []
    //   example 3: var $input = ["red", "green", "blue", "yellow"]
    //   example 3: array_splice($input, -1, 1, ["black", "maroon"])
    //   returns 3: ["yellow"]
    //        test: skip-1
    var isInt = require('../var/is_int');
    var _checkToUpIndices = function (arr, ct, key) {
        // Deal with situation, e.g., if encounter index 4 and try
        // to set it to 0, but 0 exists later in loop (need to
        // increment all subsequent (skipping current key,
        // since we need its value below) until find unused)
        if (arr[ct] !== undefined) {
            var tmp = ct;
            ct += 1;
            if (ct === key) {
                ct += 1;
            }
            ct = _checkToUpIndices(arr, ct, key);
            arr[ct] = arr[tmp];
            delete arr[tmp];
        }
        return ct;
    };
    if (replacement && typeof replacement !== 'object') {
        replacement = [replacement];
    }
    if (lgth === undefined) {
        lgth = offst >= 0 ? arr.length - offst : -offst;
    }
    else if (lgth < 0) {
        lgth = (offst >= 0 ? arr.length - offst : -offst) + lgth;
    }
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        /* if (arr.length !== undefined) {
         // Deal with array-like objects as input
        delete arr.length;
        } */
        var lgt = 0;
        var ct = -1;
        var rmvd = [];
        var rmvdObj = {};
        var replCt = -1;
        var intCt = -1;
        var returnArr = true;
        var rmvdCt = 0;
        // var rmvdLngth = 0
        var key = '';
        // rmvdObj.length = 0;
        for (key in arr) {
            // Can do arr.__count__ in some browsers
            lgt += 1;
        }
        offst = (offst >= 0) ? offst : lgt + offst;
        for (key in arr) {
            ct += 1;
            if (ct < offst) {
                if (isInt(key)) {
                    intCt += 1;
                    if (parseInt(key, 10) === intCt) {
                        // Key is already numbered ok, so don't need to change key for value
                        continue;
                    }
                    // Deal with situation, e.g.,
                    _checkToUpIndices(arr, intCt, key);
                    // if encounter index 4 and try to set it to 0, but 0 exists later in loop
                    arr[intCt] = arr[key];
                    delete arr[key];
                }
                continue;
            }
            if (returnArr && isInt(key)) {
                rmvd.push(arr[key]);
                // PHP starts over here too
                rmvdObj[rmvdCt++] = arr[key];
            }
            else {
                rmvdObj[key] = arr[key];
                returnArr = false;
            }
            // rmvdLngth += 1
            // rmvdObj.length += 1;
            if (replacement && replacement[++replCt]) {
                arr[key] = replacement[replCt];
            }
            else {
                delete arr[key];
            }
        }
        // Make (back) into an array-like object
        // arr.length = lgt - rmvdLngth + (replacement ? replacement.length : 0);
        return returnArr ? rmvd : rmvdObj;
    }
    if (replacement) {
        replacement.unshift(offst, lgth);
        return Array.prototype.splice.apply(arr, replacement);
    }
    return arr.splice(offst, lgth);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc3BsaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3NwbGljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVc7SUFDbkUsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCx3REFBd0Q7SUFDeEQsdUZBQXVGO0lBQ3ZGLG1GQUFtRjtJQUNuRixvQ0FBb0M7SUFDcEMsa0ZBQWtGO0lBQ2xGLG1GQUFtRjtJQUNuRixvRkFBb0Y7SUFDcEYsd0RBQXdEO0lBQ3hELG1GQUFtRjtJQUNuRix1Q0FBdUM7SUFDdkMsMENBQTBDO0lBQzFDLCtEQUErRDtJQUMvRCxvREFBb0Q7SUFDcEQsa0JBQWtCO0lBQ2xCLCtEQUErRDtJQUMvRCxnRUFBZ0U7SUFDaEUsMEJBQTBCO0lBQzFCLHNCQUFzQjtJQUV0QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFcEMsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRztRQUM1QywwREFBMEQ7UUFDMUQsc0RBQXNEO1FBQ3RELGtEQUFrRDtRQUNsRCxvREFBb0Q7UUFDcEQsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtZQUNaLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDUCxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUU7Z0JBQ2QsRUFBRSxJQUFJLENBQUMsQ0FBQTthQUNSO1lBQ0QsRUFBRSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDcEMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdB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