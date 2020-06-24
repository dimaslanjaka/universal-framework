module.exports = function min() {
    //  discuss at: https://locutus.io/php/min/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Jack
    //      note 1: Long code cause we're aiming for maximum PHP compatibility
    //   example 1: min(1, 3, 5, 6, 7)
    //   returns 1: 1
    //   example 2: min([2, 4, 5])
    //   returns 2: 2
    //   example 3: min(0, 'hello')
    //   returns 3: 0
    //   example 4: min('hello', 0)
    //   returns 4: 'hello'
    //   example 5: min(-1, 'hello')
    //   returns 5: -1
    //   example 6: min([2, 4, 8], [2, 5, 7])
    //   returns 6: [2, 4, 8]
    var ar;
    var retVal;
    var i = 0;
    var n = 0;
    var argv = arguments;
    var argc = argv.length;
    var _obj2Array = function (obj) {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            return obj;
        }
        var ar = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                ar.push(obj[i]);
            }
        }
        return ar;
    };
    var _compare = function (current, next) {
        var i = 0;
        var n = 0;
        var tmp = 0;
        var nl = 0;
        var cl = 0;
        if (current === next) {
            return 0;
        }
        else if (typeof current === 'object') {
            if (typeof next === 'object') {
                current = _obj2Array(current);
                next = _obj2Array(next);
                cl = current.length;
                nl = next.length;
                if (nl > cl) {
                    return 1;
                }
                else if (nl < cl) {
                    return -1;
                }
                for (i = 0, n = cl; i < n; ++i) {
                    tmp = _compare(current[i], next[i]);
                    if (tmp === 1) {
                        return 1;
                    }
                    else if (tmp === -1) {
                        return -1;
                    }
                }
                return 0;
            }
            return -1;
        }
        else if (typeof next === 'object') {
            return 1;
        }
        else if (isNaN(next) && !isNaN(current)) {
            if (current === 0) {
                return 0;
            }
            return (current < 0 ? 1 : -1);
        }
        else if (isNaN(current) && !isNaN(next)) {
            if (next === 0) {
                return 0;
            }
            return (next > 0 ? 1 : -1);
        }
        if (next === current) {
            return 0;
        }
        return (next > current ? 1 : -1);
    };
    if (argc === 0) {
        throw new Error('At least one value should be passed to min()');
    }
    else if (argc === 1) {
        if (typeof argv[0] === 'object') {
            ar = _obj2Array(argv[0]);
        }
        else {
            throw new Error('Wrong parameter count for min()');
        }
        if (ar.length === 0) {
            throw new Error('Array must contain at least one element for min()');
        }
    }
    else {
        ar = argv;
    }
    retVal = ar[0];
    for (i = 1, n = ar.length; i < n; ++i) {
        if (_compare(retVal, ar[i]) === -1) {
            retVal = ar[i];
        }
    }
    return retVal;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL21pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRztJQUMzQiwyQ0FBMkM7SUFDM0MsOERBQThEO0lBQzlELDhEQUE4RDtJQUM5RCxvQkFBb0I7SUFDcEIsMEVBQTBFO0lBQzFFLGtDQUFrQztJQUNsQyxpQkFBaUI7SUFDakIsOEJBQThCO0lBQzlCLGlCQUFpQjtJQUNqQiwrQkFBK0I7SUFDL0IsaUJBQWlCO0lBQ2pCLCtCQUErQjtJQUMvQix1QkFBdUI7SUFDdkIsZ0NBQWdDO0lBQ2hDLGtCQUFrQjtJQUNsQix5Q0FBeUM7SUFDekMseUJBQXlCO0lBRXpCLElBQUksRUFBRSxDQUFBO0lBQ04sSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUE7SUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUN0QixJQUFJLFVBQVUsR0FBRyxVQUFVLEdBQUc7UUFDNUIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7WUFDNUQsT0FBTyxHQUFHLENBQUE7U0FDWDtRQUNELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUNYLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2pCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNoQjtTQUNGO1FBQ0QsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFD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