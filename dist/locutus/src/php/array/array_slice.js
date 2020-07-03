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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc2xpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfc2xpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZO0lBQ25FLG1EQUFtRDtJQUNuRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsNkRBQTZEO0lBQzdELDRCQUE0QjtJQUM1QixtRUFBbUU7SUFDbkUsZ0NBQWdDO0lBRWhDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUVwQzs7OztNQUlFO0lBRUYsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLElBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzdGLGlEQUFpRDtRQUNqRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDWCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDakIsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ2YsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUNSLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDekI7UUFDRCxHQUFHLEdBQUcsUUFBUSxDQUFBO1FBRWQsS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDekMsSUFBSSxHQUFHLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFFeEUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBQ2QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2pCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ1gsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1FBRWYsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ2YsRUFBRSxFQUFFLENBQUE7WUFDSixJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ25CLE1BQUs7YUFDTjtZQUNELElBQUksRUFBRSxLQUFLLEtBQUssRUFBRTtnQkFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQTthQUNiO1lBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixTQUFRO2FBQ1Q7WUFBQSxFQUFFLE9BQU8sQ0FBQTtZQUNWLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUMvQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDNUI7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN0QjtTQUNGO1FBQ0QsZ0VBQWdFO1FBQ2hFLDBCQUEwQjtRQUMxQixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUN4QjtTQUFNLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtRQUNwQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQTtLQUN0QztTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUM5QjtBQUNILENBQUMsQ0FBQSJ9