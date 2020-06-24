module.exports = function stripslashes(str) {
    //       discuss at: https://locutus.io/php/stripslashes/
    //      original by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Ates Goral (https://magnetiq.com)
    //      improved by: marrtins
    //      improved by: rezna
    //         fixed by: Mick@el
    //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //         input by: Rick Waldron
    //         input by: Brant Messenger (https://www.brantmessenger.com/)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //        example 1: stripslashes('Kevin\'s code')
    //        returns 1: "Kevin's code"
    //        example 2: stripslashes('Kevin\\\'s code')
    //        returns 2: "Kevin\'s code"
    return (str + '')
        .replace(/\\(.?)/g, function (s, n1) {
        switch (n1) {
            case '\\':
                return '\\';
            case '0':
                return '\u0000';
            case '':
                return '';
            default:
                return n1;
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBzbGFzaGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmlwc2xhc2hlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLEdBQUc7SUFDekMseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCxzREFBc0Q7SUFDdEQsNkJBQTZCO0lBQzdCLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsbUVBQW1FO0lBQ25FLHlEQUF5RDtJQUN6RCxpQ0FBaUM7SUFDakMsc0VBQXNFO0lBQ3RFLHlEQUF5RDtJQUN6RCxrREFBa0Q7SUFDbEQsbUNBQW1DO0lBQ25DLG9EQUFvRDtJQUNwRCxvQ0FBb0M7SUFFcEMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZCxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsUUFBUSxFQUFFLEVBQUU7WUFDVixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxJQUFJLENBQUE7WUFDYixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxRQUFRLENBQUE7WUFDakIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRSxDQUFBO1lBQ1g7Z0JBQ0UsT0FBTyxFQUFFLENBQUE7U0FDWjtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIn0=