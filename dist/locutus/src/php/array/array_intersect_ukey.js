module.exports = function array_intersect_ukey(arr1) {
    //  discuss at: https://locutus.io/php/array_intersect_ukey/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    //   example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
    //   returns 1: {blue: 1, green: 3}
    var retArr = {};
    var arglm1 = arguments.length - 1;
    var arglm2 = arglm1 - 1;
    var cb = arguments[arglm1];
    // var cb0 = arguments[arglm2]
    var k1 = '';
    var i = 1;
    var k = '';
    var arr = {};
    var $global = (typeof window !== 'undefined' ? window : global);
    cb = (typeof cb === 'string')
        ? $global[cb]
        : (Object.prototype.toString.call(cb) === '[object Array]')
            ? $global[cb[0]][cb[1]]
            : cb;
    // cb0 = (typeof cb0 === 'string')
    //   ? $global[cb0]
    //   : (Object.prototype.toString.call(cb0) === '[object Array]')
    //     ? $global[cb0[0]][cb0[1]]
    //     : cb0
    arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
        arrs: for (i = 1; i < arglm1; i++) { // eslint-disable-line no-labels
            arr = arguments[i];
            for (k in arr) {
                if (cb(k, k1) === 0) {
                    if (i === arglm2) {
                        retArr[k1] = arr1[k1];
                    }
                    // If the innermost loop always leads at least once to an equal value,
                    // continue the loop until done
                    continue arrs; // eslint-disable-line no-labels
                }
            }
            // If it reaches here, it wasn't found in at least one array, so try next value
            continue arr1keys; // eslint-disable-line no-labels
        }
    }
    return retArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfaW50ZXJzZWN0X3VrZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfaW50ZXJzZWN0X3VrZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLG9CQUFvQixDQUFFLElBQUk7SUFDbEQsNERBQTREO0lBQzVELG9EQUFvRDtJQUNwRCxvRUFBb0U7SUFDcEUscUVBQXFFO0lBQ3JFLHNJQUFzSTtJQUN0SSxtQ0FBbUM7SUFFbkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDakMsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUN2QixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsOEJBQThCO0lBQzlCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRS9ELEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQztRQUMzQixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQztZQUN6RCxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsRUFBRSxDQUFBO0lBRVIsa0NBQWtDO0lBQ2xDLG1CQUFtQjtJQUNuQixpRUFBaUU7SUFDakUsZ0NBQWdDO0lBQ2hDLFlBQVk7SUFFWixRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsZ0NBQWdDO1FBQzNELElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLGdDQUFnQztZQUNuRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDYixJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNuQixJQUFJLENBQUMsS0FBSyxNQUFNLEVBQUU7d0JBQ2hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7cUJBQ3RCO29CQUNELHNFQUFzRTtvQkFDdEUsK0JBQStCO29CQUMvQixTQUFTLElBQUksQ0FBQSxDQUFDLGdDQUFnQztpQkFDL0M7YUFDRjtZQUNELCtFQUErRTtZQUMvRSxTQUFTLFFBQVEsQ0FBQSxDQUFDLGdDQUFnQztTQUNuRDtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==