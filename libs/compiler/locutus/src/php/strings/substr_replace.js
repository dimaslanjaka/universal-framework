module.exports = function substr_replace(str, replace, start, length) {
    //  discuss at: https://locutus.io/php/substr_replace/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0)
    //   returns 1: 'bob'
    //   example 2: var $var = 'ABCDEFGH:/MNRPQR/'
    //   example 2: substr_replace($var, 'bob', 0, $var.length)
    //   returns 2: 'bob'
    //   example 3: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0)
    //   returns 3: 'bobABCDEFGH:/MNRPQR/'
    //   example 4: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1)
    //   returns 4: 'ABCDEFGH:/bob/'
    //   example 5: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1)
    //   returns 5: 'ABCDEFGH:/bob/'
    //   example 6: substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
    //   returns 6: 'ABCDEFGH://'
    if (start < 0) {
        // start position in str
        start = start + str.length;
    }
    length = length !== undefined ? length : str.length;
    if (length < 0) {
        length = length + str.length - start;
    }
    return [
        str.slice(0, start),
        replace.substr(0, length),
        replace.slice(length),
        str.slice(start + length)
    ].join('');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic3RyX3JlcGxhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3Vic3RyX3JlcGxhY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNO0lBQ25FLHNEQUFzRDtJQUN0RCxvREFBb0Q7SUFDcEQsNkRBQTZEO0lBQzdELHFCQUFxQjtJQUNyQiw4Q0FBOEM7SUFDOUMsMkRBQTJEO0lBQzNELHFCQUFxQjtJQUNyQixnRUFBZ0U7SUFDaEUsc0NBQXNDO0lBQ3RDLGtFQUFrRTtJQUNsRSxnQ0FBZ0M7SUFDaEMsa0VBQWtFO0lBQ2xFLGdDQUFnQztJQUNoQywrREFBK0Q7SUFDL0QsNkJBQTZCO0lBRTdCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtRQUNiLHdCQUF3QjtRQUN4QixLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7S0FDM0I7SUFDRCxNQUFNLEdBQUcsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ25ELElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNkLE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7S0FDckM7SUFFRCxPQUFPO1FBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQztRQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDMUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDWixDQUFDLENBQUEifQ==