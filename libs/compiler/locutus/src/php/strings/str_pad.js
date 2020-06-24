module.exports = function str_pad(input, padLength, padString, padType) {
    //  discuss at: https://locutus.io/php/str_pad/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Michael White (https://getsprink.com)
    //    input by: Marco van Oort
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT')
    //   returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
    //   example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH')
    //   returns 2: '------Kevin van Zonneveld-----'
    var half = '';
    var padToGo;
    var _strPadRepeater = function (s, len) {
        var collect = '';
        while (collect.length < len) {
            collect += s;
        }
        collect = collect.substr(0, len);
        return collect;
    };
    input += '';
    padString = padString !== undefined ? padString : ' ';
    if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
        padType = 'STR_PAD_RIGHT';
    }
    if ((padToGo = padLength - input.length) > 0) {
        if (padType === 'STR_PAD_LEFT') {
            input = _strPadRepeater(padString, padToGo) + input;
        }
        else if (padType === 'STR_PAD_RIGHT') {
            input = input + _strPadRepeater(padString, padToGo);
        }
        else if (padType === 'STR_PAD_BOTH') {
            half = _strPadRepeater(padString, Math.ceil(padToGo / 2));
            input = half + input + half;
            input = input.substr(0, padLength);
        }
    }
    return input;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3BhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJfcGFkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTztJQUNyRSwrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELHFEQUFxRDtJQUNyRCw4QkFBOEI7SUFDOUIsb0RBQW9EO0lBQ3BELHdFQUF3RTtJQUN4RSxnREFBZ0Q7SUFDaEQsdUVBQXVFO0lBQ3ZFLGdEQUFnRDtJQUVoRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFDYixJQUFJLE9BQU8sQ0FBQTtJQUVYLElBQUksZUFBZSxHQUFHLFVBQVUsQ0FBQyxFQUFFLEdBQUc7UUFDcEMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBRWhCLE9BQU8sT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUMsQ0FBQTtTQUNiO1FBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBRWhDLE9BQU8sT0FBTyxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtJQUVELEtBQUssSUFBSSxFQUFFLENBQUE7SUFDWCxTQUFTLEdBQUcsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7SUFFckQsSUFBSSxPQUFPLEtBQUssY0FBYyxJQUFJLE9BQU8sS0FBSyxlQUFlLElBQUksT0FBTyxLQUFLLGNBQWMsRUFBRTtRQUMzRixPQUFPLEdBQUcsZUFBZSxDQUFBO0tBQzFCO0lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM1QyxJQUFJLE9BQU8sS0FBSyxjQUFjLEVBQUU7WUFDOUIsS0FBSyxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFBO1NBQ3BEO2FBQU0sSUFBSSxPQUFPLEtBQUssZUFBZSxFQUFFO1lBQ3RDLEtBQUssR0FBRyxLQUFLLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNwRDthQUFNLElBQUksT0FBTyxLQUFLLGNBQWMsRUFBRTtZQUNyQyxJQUFJLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3pELEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQTtZQUMzQixLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7U0FDbkM7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=