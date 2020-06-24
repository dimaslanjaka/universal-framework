module.exports = function array_reverse(array, preserveKeys) {
    //  discuss at: https://locutus.io/php/array_reverse/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Karol Kowalski
    //   example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
    //   returns 1: { 2: ['green', 'red'], 1: '4.0', 0: 'php'}
    var isArray = Object.prototype.toString.call(array) === '[object Array]';
    var tmpArr = preserveKeys ? {} : [];
    var key;
    if (isArray && !preserveKeys) {
        return array.slice(0).reverse();
    }
    if (preserveKeys) {
        var keys = [];
        for (key in array) {
            keys.push(key);
        }
        var i = keys.length;
        while (i--) {
            key = keys[i];
            // @todo: don't rely on browsers keeping keys in insertion order
            // it's implementation specific
            // eg. the result will differ from expected in Google Chrome
            tmpArr[key] = array[key];
        }
    }
    else {
        for (key in array) {
            tmpArr.unshift(array[key]);
        }
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmV2ZXJzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfcmV2ZXJzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsYUFBYSxDQUFFLEtBQUssRUFBRSxZQUFZO0lBQzFELHFEQUFxRDtJQUNyRCxvREFBb0Q7SUFDcEQsOEJBQThCO0lBQzlCLHdFQUF3RTtJQUN4RSwwREFBMEQ7SUFFMUQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixDQUFBO0lBQ3hFLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDbkMsSUFBSSxHQUFHLENBQUE7SUFFUCxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRTtRQUM1QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDaEM7SUFFRCxJQUFJLFlBQVksRUFBRTtRQUNoQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7UUFDYixLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNmO1FBRUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUNuQixPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNiLGdFQUFnRTtZQUNoRSwrQkFBK0I7WUFDL0IsNERBQTREO1lBQzVELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDekI7S0FDRjtTQUFNO1FBQ0wsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDM0I7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=