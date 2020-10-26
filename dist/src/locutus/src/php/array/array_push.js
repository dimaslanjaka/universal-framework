module.exports = function array_push(inputArr) {
    //  discuss at: https://locutus.io/php/array_push/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Note also that IE retains information about property position even
    //      note 1: after being supposedly deleted, so if you delete properties and then
    //      note 1: add back properties with the same keys (including numeric) that had
    //      note 1: been deleted, the order will be as before; thus, this function is not
    //      note 1: really recommended with associative arrays (objects) in IE environments
    //   example 1: array_push(['kevin','van'], 'zonneveld')
    //   returns 1: 3
    var i = 0;
    var pr = '';
    var argv = arguments;
    var argc = argv.length;
    var allDigits = /^\d$/;
    var size = 0;
    var highestIdx = 0;
    var len = 0;
    if (inputArr.hasOwnProperty('length')) {
        for (i = 1; i < argc; i++) {
            inputArr[inputArr.length] = argv[i];
        }
        return inputArr.length;
    }
    // Associative (object)
    for (pr in inputArr) {
        if (inputArr.hasOwnProperty(pr)) {
            ++len;
            if (pr.search(allDigits) !== -1) {
                size = parseInt(pr, 10);
                highestIdx = size > highestIdx ? size : highestIdx;
            }
        }
    }
    for (i = 1; i < argc; i++) {
        inputArr[++highestIdx] = argv[i];
    }
    return len + i - 1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9wdXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsUUFBUTtJQUM1QyxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxrRkFBa0Y7SUFDbEYsb0ZBQW9GO0lBQ3BGLG1GQUFtRjtJQUNuRixxRkFBcUY7SUFDckYsdUZBQXVGO0lBQ3ZGLHdEQUF3RDtJQUN4RCxpQkFBaUI7SUFFakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ1gsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFBO0lBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDdEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFBO0lBQ3RCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNaLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQTtJQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFFWCxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDckMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDcEM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUE7S0FDdkI7SUFFRCx1QkFBdUI7SUFDdkIsS0FBSyxFQUFFLElBQUksUUFBUSxFQUFFO1FBQ25CLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMvQixFQUFFLEdBQUcsQ0FBQTtZQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQ3ZCLFVBQVUsR0FBRyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTthQUNuRDtTQUNGO0tBQ0Y7SUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QixRQUFRLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDakM7SUFFRCxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQSJ9