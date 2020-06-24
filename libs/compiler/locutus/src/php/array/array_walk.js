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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfd2Fsay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfd2Fsay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUTtJQUM3RCxrREFBa0Q7SUFDbEQsdURBQXVEO0lBQ3ZELHFCQUFxQjtJQUNyQixvREFBb0Q7SUFDcEQsMEZBQTBGO0lBQzFGLCtEQUErRDtJQUMvRCxvQkFBb0I7SUFDcEIsdURBQXVEO0lBQ3ZELHFCQUFxQjtJQUNyQixpRUFBaUU7SUFDakUsb0JBQW9CO0lBRXBCLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3ZDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJO1FBQ0YsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDbEMsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3JCLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO2lCQUNwQztxQkFBTTtvQkFDTCxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2lCQUMxQjthQUNGO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFBO1NBQ2I7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=