module.exports = function print_r(array, returnVal) {
    //  discuss at: https://locutus.io/php/print_r/
    // original by: Michael White (https://getsprink.com)
    // improved by: Ben Bryan
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //   example 1: print_r(1, true)
    //   returns 1: '1'
    var echo = require('../strings/echo');
    var output = '';
    var padChar = ' ';
    var padVal = 4;
    var _repeatChar = function (len, padChar) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += padChar;
        }
        return str;
    };
    var _formatArray = function (obj, curDepth, padVal, padChar) {
        if (curDepth > 0) {
            curDepth++;
        }
        var basePad = _repeatChar(padVal * curDepth, padChar);
        var thickPad = _repeatChar(padVal * (curDepth + 1), padChar);
        var str = '';
        if (typeof obj === 'object' &&
            obj !== null &&
            obj.constructor) {
            str += 'Array\n' + basePad + '(\n';
            for (var key in obj) {
                if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
                    str += thickPad;
                    str += '[';
                    str += key;
                    str += '] => ';
                    str += _formatArray(obj[key], curDepth + 1, padVal, padChar);
                }
                else {
                    str += thickPad;
                    str += '[';
                    str += key;
                    str += '] => ';
                    str += obj[key];
                    str += '\n';
                }
            }
            str += basePad + ')\n';
        }
        else if (obj === null || obj === undefined) {
            str = '';
        }
        else {
            // for our "resource" class
            str = obj.toString();
        }
        return str;
    };
    output = _formatArray(array, 0, padVal, padChar);
    if (returnVal !== true) {
        echo(output);
        return true;
    }
    return output;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnRfci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL3ByaW50X3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxLQUFLLEVBQUUsU0FBUztJQUNqRCwrQ0FBK0M7SUFDL0MscURBQXFEO0lBQ3JELHlCQUF5QjtJQUN6QixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxnQ0FBZ0M7SUFDaEMsbUJBQW1CO0lBRW5CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBRXJDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFFZCxJQUFJLFdBQVcsR0FBRyxVQUFVLEdBQUcsRUFBRSxPQUFPO1FBQ3RDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtRQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsR0FBRyxJQUFJLE9BQU8sQ0FBQTtTQUNmO1FBQ0QsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDLENBQUE7SUFDRCxJQUFJLFlBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU87UUFDekQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLFFBQVEsRUFBRSxDQUFBO1NBQ1g7UUFFRCxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFHLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNyRCxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzVELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtRQUVaLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtZQUN6QixHQUFHLEtBQUssSUFBSTtZQUNaLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDakIsR0FBRyxJQUFJLFNBQVMsR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFBO1lBQ2xDLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO2dCQUNuQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtvQkFDakUsR0FBRyxJQUFJLFFBQVEsQ0FBQTtvQkFDZixHQUFHLElBQUksR0FBRyxDQUFBO29CQUNWLEdBQUcsSUFBSSxHQUFHLENBQUE7b0JBQ1YsR0FBRyxJQUFJLE9BQU8sQ0FBQTtvQkFDZCxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtpQkFDN0Q7cUJBQU07b0JBQ0wsR0FBRyxJQUFJLFFBQVEsQ0FBQTtvQkFDZixHQUFHLElBQUksR0FBRyxDQUFBO29CQUNWLEdBQUcsSUFBSSxHQUFHLENBQUE7b0JBQ1YsR0FBRyxJQUFJLE9BQU8sQ0FBQTtvQkFDZCxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNmLEdBQUcsSUFBSSxJQUFJLENBQUE7aUJBQ1o7YUFDRjtZQUNELEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFBO1NBQ3ZCO2FBQU0sSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDNUMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtTQUNUO2FBQU07WUFDTCwyQkFBMkI7WUFDM0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUNyQjtRQUVELE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQyxDQUFBO0lBRUQsTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUVoRCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ1osT0FBTyxJQUFJLENBQUE7S0FDWjtJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=