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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc3BsaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9zcGxpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXO0lBQ25FLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELHVGQUF1RjtJQUN2RixtRkFBbUY7SUFDbkYsb0NBQW9DO0lBQ3BDLGtGQUFrRjtJQUNsRixtRkFBbUY7SUFDbkYsb0ZBQW9GO0lBQ3BGLHdEQUF3RDtJQUN4RCxtRkFBbUY7SUFDbkYsdUNBQXVDO0lBQ3ZDLDBDQUEwQztJQUMxQywrREFBK0Q7SUFDL0Qsb0RBQW9EO0lBQ3BELGtCQUFrQjtJQUNsQiwrREFBK0Q7SUFDL0QsZ0VBQWdFO0lBQ2hFLDBCQUEwQjtJQUMxQixzQkFBc0I7SUFFdEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBRXBDLElBQUksaUJBQWlCLEdBQUcsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUc7UUFDNUMsMERBQTBEO1FBQzFELHNEQUFzRDtRQUN0RCxrREFBa0Q7UUFDbEQsb0RBQW9EO1FBQ3BELElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN6QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7WUFDWixFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ1AsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO2dCQUNkLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDUjtZQUNELEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ3BDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMs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