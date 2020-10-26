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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3BhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cl9wYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPO0lBQ3JFLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQscURBQXFEO0lBQ3JELDhCQUE4QjtJQUM5QixvREFBb0Q7SUFDcEQsd0VBQXdFO0lBQ3hFLGdEQUFnRDtJQUNoRCx1RUFBdUU7SUFDdkUsZ0RBQWdEO0lBRWhELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksT0FBTyxDQUFBO0lBRVgsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRztRQUNwQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFFaEIsT0FBTyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxDQUFBO1NBQ2I7UUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFFaEMsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQyxDQUFBO0lBRUQsS0FBSyxJQUFJLEVBQUUsQ0FBQTtJQUNYLFNBQVMsR0FBRyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtJQUVyRCxJQUFJLE9BQU8sS0FBSyxjQUFjLElBQUksT0FBTyxLQUFLLGVBQWUsSUFBSSxPQUFPLEtBQUssY0FBYyxFQUFFO1FBQzNGLE9BQU8sR0FBRyxlQUFlLENBQUE7S0FDMUI7SUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzVDLElBQUksT0FBTyxLQUFLLGNBQWMsRUFBRTtZQUM5QixLQUFLLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUE7U0FDcEQ7YUFBTSxJQUFJLE9BQU8sS0FBSyxlQUFlLEVBQUU7WUFDdEMsS0FBSyxHQUFHLEtBQUssR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQ3BEO2FBQU0sSUFBSSxPQUFPLEtBQUssY0FBYyxFQUFFO1lBQ3JDLElBQUksR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDekQsS0FBSyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFBO1lBQzNCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQTtTQUNuQztLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==