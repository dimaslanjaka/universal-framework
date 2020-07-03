module.exports = function array_walk(array, funcname, userdata) {
    //  discuss at: https://locutus.io/php/array_walk/
    // original by: Johnny Mast (https://www.phpvrouwen.nl)
    // bugfixed by: David
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Only works with user-defined functions, not built-in functions like void()
    //   example 1: array_walk ([3, 4], function () {}, 'userdata')
    //   returns 1: true
    //   example 2: array_walk ('mystring', function () {})
    //   returns 2: false
    //   example 3: array_walk ({"title":"my title"}, function () {})
    //   returns 3: true
    if (!array || typeof array !== 'object') {
        return false;
    }
    try {
        if (typeof funcname === 'function') {
            for (var key in array) {
                if (arguments.length > 2) {
                    funcname(array[key], key, userdata);
                }
                else {
                    funcname(array[key], key);
                }
            }
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfd2Fsay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV93YWxrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRO0lBQzdELGtEQUFrRDtJQUNsRCx1REFBdUQ7SUFDdkQscUJBQXFCO0lBQ3JCLG9EQUFvRDtJQUNwRCwwRkFBMEY7SUFDMUYsK0RBQStEO0lBQy9ELG9CQUFvQjtJQUNwQix1REFBdUQ7SUFDdkQscUJBQXFCO0lBQ3JCLGlFQUFpRTtJQUNqRSxvQkFBb0I7SUFFcEIsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDdkMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUk7UUFDRixJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUNsQyxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtnQkFDckIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUE7aUJBQ3BDO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7aUJBQzFCO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUE7U0FDYjtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==