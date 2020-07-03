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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnRfci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvcHJpbnRfci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFFLEtBQUssRUFBRSxTQUFTO0lBQ2pELCtDQUErQztJQUMvQyxxREFBcUQ7SUFDckQseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELGdDQUFnQztJQUNoQyxtQkFBbUI7SUFFbkIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFFckMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQ2pCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUVkLElBQUksV0FBVyxHQUFHLFVBQVUsR0FBRyxFQUFFLE9BQU87UUFDdEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixHQUFHLElBQUksT0FBTyxDQUFBO1NBQ2Y7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUMsQ0FBQTtJQUNELElBQUksWUFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTztRQUN6RCxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDaEIsUUFBUSxFQUFFLENBQUE7U0FDWDtRQUVELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3JELElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDNUQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBRVosSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1lBQ3pCLEdBQUcsS0FBSyxJQUFJO1lBQ1osR0FBRyxDQUFDLFdBQVcsRUFBRTtZQUNqQixHQUFHLElBQUksU0FBUyxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFDbEMsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7Z0JBQ25CLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixFQUFFO29CQUNqRSxHQUFHLElBQUksUUFBUSxDQUFBO29CQUNmLEdBQUcsSUFBSSxHQUFHLENBQUE7b0JBQ1YsR0FBRyxJQUFJLEdBQUcsQ0FBQTtvQkFDVixHQUFHLElBQUksT0FBTyxDQUFBO29CQUNkLEdBQUcsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2lCQUM3RDtxQkFBTTtvQkFDTCxHQUFHLElBQUksUUFBUSxDQUFBO29CQUNmLEdBQUcsSUFBSSxHQUFHLENBQUE7b0JBQ1YsR0FBRyxJQUFJLEdBQUcsQ0FBQTtvQkFDVixHQUFHLElBQUksT0FBTyxDQUFBO29CQUNkLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ2YsR0FBRyxJQUFJLElBQUksQ0FBQTtpQkFDWjthQUNGO1lBQ0QsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUE7U0FDdkI7YUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUM1QyxHQUFHLEdBQUcsRUFBRSxDQUFBO1NBQ1Q7YUFBTTtZQUNMLDJCQUEyQjtZQUMzQixHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQ3JCO1FBRUQsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDLENBQUE7SUFFRCxNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRWhELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDWixPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==