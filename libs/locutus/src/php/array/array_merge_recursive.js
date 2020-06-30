module.exports = function array_merge_recursive(arr1, arr2) {
    //  discuss at: https://locutus.io/php/array_merge_recursive/
    // original by: Subhasis Deb
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //   example 1: var $arr1 = {'color': {'favorite': 'red'}, 0: 5}
    //   example 1: var $arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
    //   example 1: array_merge_recursive($arr1, $arr2)
    //   returns 1: {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}
    //        test: skip-1
    var arrayMerge = require('../array/array_merge');
    var idx = '';
    if (arr1 && Object.prototype.toString.call(arr1) === '[object Array]' &&
        arr2 && Object.prototype.toString.call(arr2) === '[object Array]') {
        for (idx in arr2) {
            arr1.push(arr2[idx]);
        }
    }
    else if ((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))) {
        for (idx in arr2) {
            if (idx in arr1) {
                if (typeof arr1[idx] === 'object' && typeof arr2 === 'object') {
                    arr1[idx] = arrayMerge(arr1[idx], arr2[idx]);
                }
                else {
                    arr1[idx] = arr2[idx];
                }
            }
            else {
                arr1[idx] = arr2[idx];
            }
        }
    }
    return arr1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfbWVyZ2VfcmVjdXJzaXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9tZXJnZV9yZWN1cnNpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLHFCQUFxQixDQUFFLElBQUksRUFBRSxJQUFJO0lBQ3pELDZEQUE2RDtJQUM3RCw0QkFBNEI7SUFDNUIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxnRUFBZ0U7SUFDaEUsOEVBQThFO0lBQzlFLG1EQUFtRDtJQUNuRCx1RkFBdUY7SUFDdkYsc0JBQXNCO0lBRXRCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ2hELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxnQkFBZ0I7UUFDbkUsSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtRQUNuRSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUNyQjtLQUNGO1NBQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksWUFBWSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDbkYsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2hCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDZixJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2lCQUM3QztxQkFBTTtvQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUN0QjthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDdEI7U0FDRjtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==