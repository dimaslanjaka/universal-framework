module.exports = function array_map(callback) {
    //  discuss at: https://locutus.io/php/array_map/
    // original by: Andrea Giammarchi (https://webreflection.blogspot.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //    input by: thekid
    //      note 1: If the callback is a string (or object, if an array is supplied),
    //      note 1: it can only work if the function name is in the global context
    //   example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] )
    //   returns 1: [ 1, 8, 27, 64, 125 ]
    var argc = arguments.length;
    var argv = arguments;
    var obj = null;
    var cb = callback;
    var j = argv[1].length;
    var i = 0;
    var k = 1;
    var m = 0;
    var tmp = [];
    var tmpArr = [];
    var $global = (typeof window !== 'undefined' ? window : global);
    while (i < j) {
        while (k < argc) {
            tmp[m++] = argv[k++][i];
        }
        m = 0;
        k = 1;
        if (callback) {
            if (typeof callback === 'string') {
                cb = $global[callback];
            }
            else if (typeof callback === 'object' && callback.length) {
                obj = typeof callback[0] === 'string' ? $global[callback[0]] : callback[0];
                if (typeof obj === 'undefined') {
                    throw new Error('Object not found: ' + callback[0]);
                }
                cb = typeof callback[1] === 'string' ? obj[callback[1]] : callback[1];
            }
            tmpArr[i++] = cb.apply(obj, tmp);
        }
        else {
            tmpArr[i++] = tmp;
        }
        tmp = [];
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfbWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9tYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxRQUFRO0lBQzNDLGlEQUFpRDtJQUNqRCxzRUFBc0U7SUFDdEUsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxzQkFBc0I7SUFDdEIsaUZBQWlGO0lBQ2pGLDhFQUE4RTtJQUM5RSw4RUFBOEU7SUFDOUUscUNBQXFDO0lBRXJDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFBO0lBQ3BCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQTtJQUNkLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQTtJQUNqQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUVmLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRS9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRTtZQUNmLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3hCO1FBRUQsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNMLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFTCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQ3ZCO2lCQUFNLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQzFELEdBQUcsR0FBRyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUMxRSxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtvQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDcEQ7Z0JBQ0QsRUFBRSxHQUFHLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDdEU7WUFDRCxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNqQzthQUFNO1lBQ0wsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBO1NBQ2xCO1FBRUQsR0FBRyxHQUFHLEVBQUUsQ0FBQTtLQUNUO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==