module.exports = function strnatcmp(a, b) {
    //       discuss at: https://locutus.io/php/strnatcmp/
    //      original by: Martijn Wieringa
    //      improved by: Michael White (https://getsprink.com)
    //      improved by: Jack
    //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // reimplemented by: Rafał Kukawski
    //        example 1: strnatcmp('abc', 'abc')
    //        returns 1: 0
    //        example 2: strnatcmp('a', 'b')
    //        returns 2: -1
    //        example 3: strnatcmp('10', '1')
    //        returns 3: 1
    //        example 4: strnatcmp('0000abc', '0abc')
    //        returns 4: 0
    //        example 5: strnatcmp('1239', '12345')
    //        returns 5: -1
    //        example 6: strnatcmp('t01239', 't012345')
    //        returns 6: 1
    //        example 7: strnatcmp('0A', '5N')
    //        returns 7: -1
    var _phpCastString = require('../_helpers/_phpCastString');
    var leadingZeros = /^0+(?=\d)/;
    var whitespace = /^\s/;
    var digit = /^\d/;
    if (arguments.length !== 2) {
        return null;
    }
    a = _phpCastString(a);
    b = _phpCastString(b);
    if (!a.length || !b.length) {
        return a.length - b.length;
    }
    var i = 0;
    var j = 0;
    a = a.replace(leadingZeros, '');
    b = b.replace(leadingZeros, '');
    while (i < a.length && j < b.length) {
        // skip consecutive whitespace
        while (whitespace.test(a.charAt(i)))
            i++;
        while (whitespace.test(b.charAt(j)))
            j++;
        var ac = a.charAt(i);
        var bc = b.charAt(j);
        var aIsDigit = digit.test(ac);
        var bIsDigit = digit.test(bc);
        if (aIsDigit && bIsDigit) {
            var bias = 0;
            var fractional = ac === '0' || bc === '0';
            do {
                if (!aIsDigit) {
                    return -1;
                }
                else if (!bIsDigit) {
                    return 1;
                }
                else if (ac < bc) {
                    if (!bias) {
                        bias = -1;
                    }
                    if (fractional) {
                        return -1;
                    }
                }
                else if (ac > bc) {
                    if (!bias) {
                        bias = 1;
                    }
                    if (fractional) {
                        return 1;
                    }
                }
                ac = a.charAt(++i);
                bc = b.charAt(++j);
                aIsDigit = digit.test(ac);
                bIsDigit = digit.test(bc);
            } while (aIsDigit || bIsDigit);
            if (!fractional && bias) {
                return bias;
            }
            continue;
        }
        if (!ac || !bc) {
            continue;
        }
        else if (ac < bc) {
            return -1;
        }
        else if (ac > bc) {
            return 1;
        }
        i++;
        j++;
    }
    var iBeforeStrEnd = i < a.length;
    var jBeforeStrEnd = j < b.length;
    // Check which string ended first
    // return -1 if a, 1 if b, 0 otherwise
    return (iBeforeStrEnd > jBeforeStrEnd) - (iBeforeStrEnd < jBeforeStrEnd);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybmF0Y21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RybmF0Y21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdkMsc0RBQXNEO0lBQ3RELHFDQUFxQztJQUNyQywwREFBMEQ7SUFDMUQseUJBQXlCO0lBQ3pCLG1FQUFtRTtJQUNuRSxtQ0FBbUM7SUFDbkMsNENBQTRDO0lBQzVDLHNCQUFzQjtJQUN0Qix3Q0FBd0M7SUFDeEMsdUJBQXVCO0lBQ3ZCLHlDQUF5QztJQUN6QyxzQkFBc0I7SUFDdEIsaURBQWlEO0lBQ2pELHNCQUFzQjtJQUN0QiwrQ0FBK0M7SUFDL0MsdUJBQXVCO0lBQ3ZCLG1EQUFtRDtJQUNuRCxzQkFBc0I7SUFDdEIsMENBQTBDO0lBQzFDLHVCQUF1QjtJQUV2QixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtJQUUxRCxJQUFJLFlBQVksR0FBRyxXQUFXLENBQUE7SUFDOUIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFBO0lBQ3RCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUVqQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFckIsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO0tBQzNCO0lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRVQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQy9CLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUUvQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO1FBQ25DLDhCQUE4QjtRQUM5QixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLENBQUMsRUFBRSxDQUFBO1FBQ3hDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUUsQ0FBQyxFQUFFLENBQUE7UUFFeEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDN0IsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUU3QixJQUFJLFFBQVEsSUFBSSxRQUFRLEVBQUU7WUFDeEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ1osSUFBSSxVQUFVLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFBO1lBRXpDLEdBQUc7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDYixPQUFPLENBQUMsQ0FBQyxDQUFBO2lCQUNWO3FCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxDQUFBO2lCQUNUO3FCQUFNLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLElBQUksRUFBRTt3QkFDVCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7cUJBQ1Y7b0JBRUQsSUFBSSxVQUFVLEVBQUU7d0JBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQTtxQkFDVjtpQkFDRjtxQkFBTSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ1QsSUFBSSxHQUFHLENBQUMsQ0FBQTtxQkFDVDtvQkFFRCxJQUFJLFVBQVUsRUFBRTt3QkFDZCxPQUFPLENBQUMsQ0FBQTtxQkFDVDtpQkFDRjtnQkFFRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUNsQixFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUVsQixRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDekIsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7YUFDMUIsUUFBUSxRQUFRLElBQUksUUFBUSxFQUFDO1lBRTlCLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUN2QixPQUFPLElBQUksQ0FBQTthQUNaO1lBRUQsU0FBUTtTQUNUO1FBRUQsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNkLFNBQVE7U0FDVDthQUFNLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQ1Y7YUFBTSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDbEIsT0FBTyxDQUFDLENBQUE7U0FDVDtRQUVELENBQUMsRUFBRSxDQUFBO1FBQ0gsQ0FBQyxFQUFFLENBQUE7S0FDSjtJQUVELElBQUksYUFBYSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBQ2hDLElBQUksYUFBYSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBRWhDLGlDQUFpQztJQUNqQyxzQ0FBc0M7SUFDdEMsT0FBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQTtBQUMxRSxDQUFDLENBQUEifQ==