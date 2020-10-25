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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmVkdWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3JlZHVjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLE1BQU0sRUFBRSxRQUFRO0lBQ3RELG9EQUFvRDtJQUNwRCxnRUFBZ0U7SUFDaEUsc0VBQXNFO0lBQ3RFLGdGQUFnRjtJQUNoRixrQkFBa0I7SUFFbEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtJQUN2QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNuQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDekI7YUFBTTtZQUNMLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDWDtRQUNELEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNoQyxHQUFHLEdBQUcsRUFBRSxDQUFBO0tBQ1Q7SUFFRCxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUMsQ0FBQSJ9