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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvbWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHO0lBQzNCLDJDQUEyQztJQUMzQyw4REFBOEQ7SUFDOUQsOERBQThEO0lBQzlELG9CQUFvQjtJQUNwQiwwRUFBMEU7SUFDMUUsa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQiw4QkFBOEI7SUFDOUIsaUJBQWlCO0lBQ2pCLCtCQUErQjtJQUMvQixpQkFBaUI7SUFDakIsK0JBQStCO0lBQy9CLHVCQUF1QjtJQUN2QixnQ0FBZ0M7SUFDaEMsa0JBQWtCO0lBQ2xCLHlDQUF5QztJQUN6Qyx5QkFBeUI7SUFFekIsSUFBSSxFQUFFLENBQUE7SUFDTixJQUFJLE1BQU0sQ0FBQTtJQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQTtJQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3RCLElBQUksVUFBVSxHQUFHLFVBQVUsR0FBRztRQUM1QixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtZQUM1RCxPQUFPLEdBQUcsQ0FBQTtTQUNYO1FBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1gsS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7WUFDakIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ2hCO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNY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