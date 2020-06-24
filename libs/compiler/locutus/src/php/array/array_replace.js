module.exports = function array_replace(arr) {
    //  discuss at: https://locutus.io/php/array_replace/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_replace(["orange", "banana", "apple", "raspberry"], {0 : "pineapple", 4 : "cherry"}, {0:"grape"})
    //   returns 1: {0: 'grape', 1: 'banana', 2: 'apple', 3: 'raspberry', 4: 'cherry'}
    var retObj = {};
    var i = 0;
    var p = '';
    var argl = arguments.length;
    if (argl < 2) {
        throw new Error('There should be at least 2 arguments passed to array_replace()');
    }
    // Although docs state that the arguments are passed in by reference,
    // it seems they are not altered, but rather the copy that is returned
    // (just guessing), so we make a copy here, instead of acting on arr itself
    for (p in arr) {
        retObj[p] = arr[p];
    }
    for (i = 1; i < argl; i++) {
        for (p in arguments[i]) {
            retObj[p] = arguments[i][p];
        }
    }
    return retObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmVwbGFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfcmVwbGFjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsYUFBYSxDQUFFLEdBQUc7SUFDMUMscURBQXFEO0lBQ3JELG9EQUFvRDtJQUNwRCx1SEFBdUg7SUFDdkgsa0ZBQWtGO0lBRWxGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFFM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFBO0tBQ2xGO0lBRUQscUVBQXFFO0lBQ3JFLHNFQUFzRTtJQUN0RSwyRUFBMkU7SUFDM0UsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNuQjtJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pCLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQzVCO0tBQ0Y7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9