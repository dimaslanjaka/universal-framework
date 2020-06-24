module.exports = function array_reduce(aInput, callback) {
    //  discuss at: https://locutus.io/php/array_reduce/
    // original by: Alfonso Jimenez (https://www.alfonsojimenez.com)
    //      note 1: Takes a function as an argument, not a function's name
    //   example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;})
    //   returns 1: 15
    var lon = aInput.length;
    var res = 0;
    var i = 0;
    var tmp = [];
    for (i = 0; i < lon; i += 2) {
        tmp[0] = aInput[i];
        if (aInput[(i + 1)]) {
            tmp[1] = aInput[(i + 1)];
        }
        else {
            tmp[1] = 0;
        }
        res += callback.apply(null, tmp);
        tmp = [];
    }
    return res;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmVkdWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9yZWR1Y2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxNQUFNLEVBQUUsUUFBUTtJQUN0RCxvREFBb0Q7SUFDcEQsZ0VBQWdFO0lBQ2hFLHNFQUFzRTtJQUN0RSxnRkFBZ0Y7SUFDaEYsa0JBQWtCO0lBRWxCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMzQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbkIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3pCO2FBQU07WUFDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ1g7UUFDRCxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDaEMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtLQUNUO0lBRUQsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==