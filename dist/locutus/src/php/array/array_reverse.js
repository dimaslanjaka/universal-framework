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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmV2ZXJzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9yZXZlcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUUsS0FBSyxFQUFFLFlBQVk7SUFDMUQscURBQXFEO0lBQ3JELG9EQUFvRDtJQUNwRCw4QkFBOEI7SUFDOUIsd0VBQXdFO0lBQ3hFLDBEQUEwRDtJQUUxRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssZ0JBQWdCLENBQUE7SUFDeEUsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNuQyxJQUFJLEdBQUcsQ0FBQTtJQUVQLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQzVCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUNoQztJQUVELElBQUksWUFBWSxFQUFFO1FBQ2hCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2Y7UUFFRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ25CLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2IsZ0VBQWdFO1lBQ2hFLCtCQUErQjtZQUMvQiw0REFBNEQ7WUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUN6QjtLQUNGO1NBQU07UUFDTCxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUMzQjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==