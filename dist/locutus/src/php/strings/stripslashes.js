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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBzbGFzaGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RyaXBzbGFzaGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsR0FBRztJQUN6Qyx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHNEQUFzRDtJQUN0RCw2QkFBNkI7SUFDN0IsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUM1QixtRUFBbUU7SUFDbkUseURBQXlEO0lBQ3pELGlDQUFpQztJQUNqQyxzRUFBc0U7SUFDdEUseURBQXlEO0lBQ3pELGtEQUFrRDtJQUNsRCxtQ0FBbUM7SUFDbkMsb0RBQW9EO0lBQ3BELG9DQUFvQztJQUVwQyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNkLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxRQUFRLEVBQUUsRUFBRTtZQUNWLEtBQUssSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQTtZQUNiLEtBQUssR0FBRztnQkFDTixPQUFPLFFBQVEsQ0FBQTtZQUNqQixLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLENBQUE7WUFDWDtnQkFDRSxPQUFPLEVBQUUsQ0FBQTtTQUNaO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEifQ==