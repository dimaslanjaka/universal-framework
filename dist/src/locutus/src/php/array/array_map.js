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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfbWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLFFBQVE7SUFDM0MsaURBQWlEO0lBQ2pELHNFQUFzRTtJQUN0RSxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHNCQUFzQjtJQUN0QixpRkFBaUY7SUFDakYsOEVBQThFO0lBQzlFLDhFQUE4RTtJQUM5RSxxQ0FBcUM7SUFFckMsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtJQUMzQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUE7SUFDcEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFBO0lBQ2QsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFBO0lBQ2pCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7SUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBRWYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFO1lBQ2YsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDeEI7UUFFRCxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUVMLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7YUFDdkI7aUJBQU0sSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDMUQsR0FBRyxHQUFHLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFFLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNwRDtnQkFDRCxFQUFFLEdBQUcsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUN0RTtZQUNELE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1NBQ2pDO2FBQU07WUFDTCxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUE7U0FDbEI7UUFFRCxHQUFHLEdBQUcsRUFBRSxDQUFBO0tBQ1Q7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9