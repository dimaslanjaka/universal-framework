module.exports = function array_merge() {
    //  discuss at: https://locutus.io/php/array_merge/
    // original by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Nate
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //    input by: josh
    //   example 1: var $arr1 = {"color": "red", 0: 2, 1: 4}
    //   example 1: var $arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
    //   example 1: array_merge($arr1, $arr2)
    //   returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
    //   example 2: var $arr1 = []
    //   example 2: var $arr2 = {1: "data"}
    //   example 2: array_merge($arr1, $arr2)
    //   returns 2: {0: "data"}
    var args = Array.prototype.slice.call(arguments);
    var argl = args.length;
    var arg;
    var retObj = {};
    var k = '';
    var argil = 0;
    var j = 0;
    var i = 0;
    var ct = 0;
    var toStr = Object.prototype.toString;
    var retArr = true;
    for (i = 0; i < argl; i++) {
        if (toStr.call(args[i]) !== '[object Array]') {
            retArr = false;
            break;
        }
    }
    if (retArr) {
        retArr = [];
        for (i = 0; i < argl; i++) {
            retArr = retArr.concat(args[i]);
        }
        return retArr;
    }
    for (i = 0, ct = 0; i < argl; i++) {
        arg = args[i];
        if (toStr.call(arg) === '[object Array]') {
            for (j = 0, argil = arg.length; j < argil; j++) {
                retObj[ct++] = arg[j];
            }
        }
        else {
            for (k in arg) {
                if (arg.hasOwnProperty(k)) {
                    if (parseInt(k, 10) + '' === k) {
                        retObj[ct++] = arg[k];
                    }
                    else {
                        retObj[k] = arg[k];
                    }
                }
            }
        }
    }
    return retObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfbWVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X21lcmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXO0lBQ25DLG1EQUFtRDtJQUNuRCxvREFBb0Q7SUFDcEQsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCxvQkFBb0I7SUFDcEIsd0RBQXdEO0lBQ3hELDBGQUEwRjtJQUMxRix5Q0FBeUM7SUFDekMsMEZBQTBGO0lBQzFGLDhCQUE4QjtJQUM5Qix1Q0FBdUM7SUFDdkMseUNBQXlDO0lBQ3pDLDJCQUEyQjtJQUUzQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUN0QixJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtJQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNWLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFBO0lBQ3JDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQTtJQUVqQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7WUFDNUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtZQUNkLE1BQUs7U0FDTjtLQUNGO0lBRUQsSUFBSSxNQUFNLEVBQUU7UUFDVixNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ1gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDaEM7UUFDRCxPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2IsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixFQUFFO1lBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDdEI7U0FDRjthQUFNO1lBQ0wsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDekIsSUFBSSxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUU7d0JBQzlCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDdEI7eUJBQU07d0JBQ0wsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDbkI7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9