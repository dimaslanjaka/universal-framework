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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfcHVzaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLFFBQVE7SUFDNUMsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsa0ZBQWtGO0lBQ2xGLG9GQUFvRjtJQUNwRixtRkFBbUY7SUFDbkYscUZBQXFGO0lBQ3JGLHVGQUF1RjtJQUN2Rix3REFBd0Q7SUFDeEQsaUJBQWlCO0lBRWpCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNYLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQTtJQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3RCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQTtJQUN0QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUE7SUFDWixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUE7SUFDbEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBRVgsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3JDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFBO0tBQ3ZCO0lBRUQsdUJBQXVCO0lBQ3ZCLEtBQUssRUFBRSxJQUFJLFFBQVEsRUFBRTtRQUNuQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDL0IsRUFBRSxHQUFHLENBQUE7WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUN2QixVQUFVLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7YUFDbkQ7U0FDRjtLQUNGO0lBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekIsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2pDO0lBRUQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNwQixDQUFDLENBQUEifQ==