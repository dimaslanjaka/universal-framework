module.exports = function array_replace_recursive(arr) {
    //  discuss at: https://locutus.io/php/array_replace_recursive/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_replace_recursive({'citrus' : ['orange'], 'berries' : ['blackberry', 'raspberry']}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']})
    //   returns 1: {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}
    var i = 0;
    var p = '';
    var argl = arguments.length;
    var retObj;
    if (argl < 2) {
        throw new Error('There should be at least 2 arguments passed to array_replace_recursive()');
    }
    // Although docs state that the arguments are passed in by reference,
    // it seems they are not altered, but rather the copy that is returned
    // So we make a copy here, instead of acting on arr itself
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        retObj = [];
        for (p in arr) {
            retObj.push(arr[p]);
        }
    }
    else {
        retObj = {};
        for (p in arr) {
            retObj[p] = arr[p];
        }
    }
    for (i = 1; i < argl; i++) {
        for (p in arguments[i]) {
            if (retObj[p] && typeof retObj[p] === 'object') {
                retObj[p] = array_replace_recursive(retObj[p], arguments[i][p]);
            }
            else {
                retObj[p] = arguments[i][p];
            }
        }
    }
    return retObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmVwbGFjZV9yZWN1cnNpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfcmVwbGFjZV9yZWN1cnNpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLHVCQUF1QixDQUFFLEdBQUc7SUFDcEQsK0RBQStEO0lBQy9ELG9EQUFvRDtJQUNwRCxnS0FBZ0s7SUFDaEssOEVBQThFO0lBRTlFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxNQUFNLENBQUE7SUFFVixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUE7S0FDNUY7SUFFRCxxRUFBcUU7SUFDckUsc0VBQXNFO0lBQ3RFLDBEQUEwRDtJQUMxRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtRQUM1RCxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ1gsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNwQjtLQUNGO1NBQU07UUFDTCxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ1gsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNuQjtLQUNGO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekIsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDOUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNoRTtpQkFBTTtnQkFDTCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQzVCO1NBQ0Y7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=