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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmVwbGFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9yZXBsYWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUUsR0FBRztJQUMxQyxxREFBcUQ7SUFDckQsb0RBQW9EO0lBQ3BELHVIQUF1SDtJQUN2SCxrRkFBa0Y7SUFFbEYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtJQUUzQixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUE7S0FDbEY7SUFFRCxxRUFBcUU7SUFDckUsc0VBQXNFO0lBQ3RFLDJFQUEyRTtJQUMzRSxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDYixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25CO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekIsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDNUI7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=