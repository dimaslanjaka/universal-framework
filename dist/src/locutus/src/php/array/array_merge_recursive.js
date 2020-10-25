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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfbWVyZ2VfcmVjdXJzaXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X21lcmdlX3JlY3Vyc2l2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMscUJBQXFCLENBQUUsSUFBSSxFQUFFLElBQUk7SUFDekQsNkRBQTZEO0lBQzdELDRCQUE0QjtJQUM1QixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELGdFQUFnRTtJQUNoRSw4RUFBOEU7SUFDOUUsbURBQW1EO0lBQ25ELHVGQUF1RjtJQUN2RixzQkFBc0I7SUFFdEIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDaEQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLGdCQUFnQjtRQUNuRSxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLGdCQUFnQixFQUFFO1FBQ25FLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRTtZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ3JCO0tBQ0Y7U0FBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLFlBQVksTUFBTSxDQUFDLENBQUMsRUFBRTtRQUNuRixLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDaEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUNmLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7aUJBQzdDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ3RCO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN0QjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9