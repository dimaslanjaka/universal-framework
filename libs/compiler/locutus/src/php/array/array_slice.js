module.exports = function array_slice(arr, offst, lgth, preserveKeys) {
    //  discuss at: https://locutus.io/php/array_slice/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      note 1: Relies on is_int because !isNaN accepts floats
    //   example 1: array_slice(["a", "b", "c", "d", "e"], 2, -1)
    //   returns 1: [ 'c', 'd' ]
    //   example 2: array_slice(["a", "b", "c", "d", "e"], 2, -1, true)
    //   returns 2: {2: 'c', 3: 'd'}
    var isInt = require('../var/is_int');
    /*
      if ('callee' in arr && 'length' in arr) {
        arr = Array.prototype.slice.call(arr);
      }
    */
    var key = '';
    if (Object.prototype.toString.call(arr) !== '[object Array]' || (preserveKeys && offst !== 0)) {
        // Assoc. array as input or if required as output
        var lgt = 0;
        var newAssoc = {};
        for (key in arr) {
            lgt += 1;
            newAssoc[key] = arr[key];
        }
        arr = newAssoc;
        offst = (offst < 0) ? lgt + offst : offst;
        lgth = lgth === undefined ? lgt : (lgth < 0) ? lgt + lgth - offst : lgth;
        var assoc = {};
        var start = false;
        var it = -1;
        var arrlgth = 0;
        var noPkIdx = 0;
        for (key in arr) {
            ++it;
            if (arrlgth >= lgth) {
                break;
            }
            if (it === offst) {
                start = true;
            }
            if (!start) {
                continue;
            }
            ++arrlgth;
            if (isInt(key) && !preserveKeys) {
                assoc[noPkIdx++] = arr[key];
            }
            else {
                assoc[key] = arr[key];
            }
        }
        // Make as array-like object (though length will not be dynamic)
        // assoc.length = arrlgth;
        return assoc;
    }
    if (lgth === undefined) {
        return arr.slice(offst);
    }
    else if (lgth >= 0) {
        return arr.slice(offst, offst + lgth);
    }
    else {
        return arr.slice(offst, lgth);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc2xpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3NsaWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLENBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWTtJQUNuRSxtREFBbUQ7SUFDbkQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELDZEQUE2RDtJQUM3RCw0QkFBNEI7SUFDNUIsbUVBQW1FO0lBQ25FLGdDQUFnQztJQUVoQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFcEM7Ozs7TUFJRTtJQUVGLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM3RixpREFBaUQ7UUFDakQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQ1gsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNmLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDUixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3pCO1FBQ0QsR0FBRyxHQUFHLFFBQVEsQ0FBQTtRQUVkLEtBQUssR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQ3pDLElBQUksR0FBRyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1FBRXhFLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUNkLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNYLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtRQUNmLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtRQUVmLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNmLEVBQUUsRUFBRSxDQUFBO1lBQ0osSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO2dCQUNuQixNQUFLO2FBQ047WUFDRCxJQUFJLEVBQUUsS0FBSyxLQUFLLEVBQUU7Z0JBQ2hCLEtBQUssR0FBRyxJQUFJLENBQUE7YUFDYjtZQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsU0FBUTthQUNUO1lBQUEsRUFBRSxPQUFPLENBQUE7WUFDVixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDL0IsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzVCO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDdEI7U0FDRjtRQUNELGdFQUFnRTtRQUNoRSwwQkFBMEI7UUFDMUIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDeEI7U0FBTSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7UUFDcEIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUE7S0FDdEM7U0FBTTtRQUNMLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7S0FDOUI7QUFDSCxDQUFDLENBQUEifQ==