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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybmF0Y21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cm5hdGNtcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLHNEQUFzRDtJQUN0RCxxQ0FBcUM7SUFDckMsMERBQTBEO0lBQzFELHlCQUF5QjtJQUN6QixtRUFBbUU7SUFDbkUsbUNBQW1DO0lBQ25DLDRDQUE0QztJQUM1QyxzQkFBc0I7SUFDdEIsd0NBQXdDO0lBQ3hDLHVCQUF1QjtJQUN2Qix5Q0FBeUM7SUFDekMsc0JBQXNCO0lBQ3RCLGlEQUFpRDtJQUNqRCxzQkFBc0I7SUFDdEIsK0NBQStDO0lBQy9DLHVCQUF1QjtJQUN2QixtREFBbUQ7SUFDbkQsc0JBQXNCO0lBQ3RCLDBDQUEwQztJQUMxQyx1QkFBdUI7SUFFdkIsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFFMUQsSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFBO0lBQzlCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQTtJQUN0QixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUE7SUFFakIsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyQixDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXJCLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUMxQixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtLQUMzQjtJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUMvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFFL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNuQyw4QkFBOEI7UUFDOUIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBRSxDQUFDLEVBQUUsQ0FBQTtRQUN4QyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLENBQUMsRUFBRSxDQUFBO1FBRXhDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNwQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzdCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFN0IsSUFBSSxRQUFRLElBQUksUUFBUSxFQUFFO1lBQ3hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUNaLElBQUksVUFBVSxHQUFHLEVBQUUsS0FBSyxHQUFHLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQTtZQUV6QyxHQUFHO2dCQUNELElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQTtpQkFDVjtxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNwQixPQUFPLENBQUMsQ0FBQTtpQkFDVDtxQkFBTSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ1QsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFBO3FCQUNWO29CQUVELElBQUksVUFBVSxFQUFFO3dCQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUE7cUJBQ1Y7aUJBQ0Y7cUJBQU0sSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFO3dCQUNULElBQUksR0FBRyxDQUFDLENBQUE7cUJBQ1Q7b0JBRUQsSUFBSSxVQUFVLEVBQUU7d0JBQ2QsT0FBTyxDQUFDLENBQUE7cUJBQ1Q7aUJBQ0Y7Z0JBRUQsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDbEIsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFFbEIsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ3pCLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQzFCLFFBQVEsUUFBUSxJQUFJLFFBQVEsRUFBQztZQUU5QixJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUE7YUFDWjtZQUVELFNBQVE7U0FDVDtRQUVELElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDZCxTQUFRO1NBQ1Q7YUFBTSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDbEIsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUNWO2FBQU0sSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxDQUFBO1NBQ1Q7UUFFRCxDQUFDLEVBQUUsQ0FBQTtRQUNILENBQUMsRUFBRSxDQUFBO0tBQ0o7SUFFRCxJQUFJLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUNoQyxJQUFJLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUVoQyxpQ0FBaUM7SUFDakMsc0NBQXNDO0lBQ3RDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUE7QUFDMUUsQ0FBQyxDQUFBIn0=