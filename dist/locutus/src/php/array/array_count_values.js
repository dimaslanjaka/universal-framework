module.exports = function array_count_values(array) {
    //  discuss at: https://locutus.io/php/array_count_values/
    // original by: Ates Goral (https://magnetiq.com)
    // improved by: Michael White (https://getsprink.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: sankai
    //    input by: Shingo
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ])
    //   returns 1: {3:2, 5:1, "foo":2, "bar":1}
    //   example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" })
    //   returns 2: {3:2, 5:1, "foo":2, "bar":1}
    //   example 3: array_count_values([ true, 4.2, 42, "fubar" ])
    //   returns 3: {42:1, "fubar":1}
    var tmpArr = {};
    var key = '';
    var t = '';
    var _getType = function (obj) {
        // Objects are php associative arrays.
        var t = typeof obj;
        t = t.toLowerCase();
        if (t === 'object') {
            t = 'array';
        }
        return t;
    };
    var _countValue = function (tmpArr, value) {
        if (typeof value === 'number') {
            if (Math.floor(value) !== value) {
                return;
            }
        }
        else if (typeof value !== 'string') {
            return;
        }
        if (value in tmpArr && tmpArr.hasOwnProperty(value)) {
            ++tmpArr[value];
        }
        else {
            tmpArr[value] = 1;
        }
    };
    t = _getType(array);
    if (t === 'array') {
        for (key in array) {
            if (array.hasOwnProperty(key)) {
                _countValue.call(this, tmpArr, array[key]);
            }
        }
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfY291bnRfdmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2NvdW50X3ZhbHVlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsa0JBQWtCLENBQUUsS0FBSztJQUNqRCwwREFBMEQ7SUFDMUQsaURBQWlEO0lBQ2pELHFEQUFxRDtJQUNyRCxvREFBb0Q7SUFDcEQsc0JBQXNCO0lBQ3RCLHNCQUFzQjtJQUN0QixvREFBb0Q7SUFDcEQsb0VBQW9FO0lBQ3BFLDRDQUE0QztJQUM1Qyw0RkFBNEY7SUFDNUYsNENBQTRDO0lBQzVDLDhEQUE4RDtJQUM5RCxpQ0FBaUM7SUFFakMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRVYsSUFBSSxRQUFRLEdBQUcsVUFBVSxHQUFHO1FBQzFCLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQTtRQUNsQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUNsQixDQUFDLEdBQUcsT0FBTyxDQUFBO1NBQ1o7UUFDRCxPQUFPLENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQTtJQUVELElBQUksV0FBVyxHQUFHLFVBQVUsTUFBTSxFQUFFLEtBQUs7UUFDdkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDL0IsT0FBTTthQUNQO1NBQ0Y7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNwQyxPQUFNO1NBQ1A7UUFFRCxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuRCxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNoQjthQUFNO1lBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNsQjtJQUNILENBQUMsQ0FBQTtJQUVELENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkIsSUFBSSxDQUFDLEtBQUssT0FBTyxFQUFFO1FBQ2pCLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNqQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUMzQztTQUNGO0tBQ0Y7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9