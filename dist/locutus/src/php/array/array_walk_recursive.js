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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfd2Fsa19yZWN1cnNpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfd2Fsa19yZWN1cnNpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLG9CQUFvQixDQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUTtJQUN2RSwrQkFBK0I7SUFDL0IsMEZBQTBGO0lBQzFGLHdFQUF3RTtJQUN4RSxvQkFBb0I7SUFDcEIsMEVBQTBFO0lBQzFFLG9CQUFvQjtJQUNwQix5RUFBeUU7SUFDekUsb0JBQW9CO0lBRXBCLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3ZDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUNsQyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDckIsOENBQThDO1FBQzlDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixFQUFFO1lBQ25FLElBQUksUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ3JDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7YUFDeEI7WUFDRCxJQUFJLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUN4RCxPQUFPLEtBQUssQ0FBQTthQUNiO1lBQ0QsU0FBUTtTQUNUO1FBQ0QsSUFBSTtZQUNGLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO2FBQ3BDO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDMUI7U0FDRjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUE7U0FDYjtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==