module.exports = function array_walk_recursive(array, funcname, userdata) {
    // original by: Hugues Peccatte
    //      note 1: Only works with user-defined functions, not built-in functions like void()
    //   example 1: array_walk_recursive([3, 4], function () {}, 'userdata')
    //   returns 1: true
    //   example 2: array_walk_recursive([3, [4]], function () {}, 'userdata')
    //   returns 2: true
    //   example 3: array_walk_recursive([3, []], function () {}, 'userdata')
    //   returns 3: true
    if (!array || typeof array !== 'object') {
        return false;
    }
    if (typeof funcname !== 'function') {
        return false;
    }
    for (var key in array) {
        // apply "funcname" recursively only on arrays
        if (Object.prototype.toString.call(array[key]) === '[object Array]') {
            var funcArgs = [array[key], funcname];
            if (arguments.length > 2) {
                funcArgs.push(userdata);
            }
            if (array_walk_recursive.apply(null, funcArgs) === false) {
                return false;
            }
            continue;
        }
        try {
            if (arguments.length > 2) {
                funcname(array[key], key, userdata);
            }
            else {
                funcname(array[key], key);
            }
        }
        catch (e) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfd2Fsa19yZWN1cnNpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3dhbGtfcmVjdXJzaXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxvQkFBb0IsQ0FBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVE7SUFDdkUsK0JBQStCO0lBQy9CLDBGQUEwRjtJQUMxRix3RUFBd0U7SUFDeEUsb0JBQW9CO0lBQ3BCLDBFQUEwRTtJQUMxRSxvQkFBb0I7SUFDcEIseUVBQXlFO0lBQ3pFLG9CQUFvQjtJQUVwQixJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN2QyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDbEMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO1FBQ3JCLDhDQUE4QztRQUM5QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtZQUNuRSxJQUFJLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUNyQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQ3hCO1lBQ0QsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDeEQsT0FBTyxLQUFLLENBQUE7YUFDYjtZQUNELFNBQVE7U0FDVDtRQUNELElBQUk7WUFDRixJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUNwQztpQkFBTTtnQkFDTCxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQzFCO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFBO1NBQ2I7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=