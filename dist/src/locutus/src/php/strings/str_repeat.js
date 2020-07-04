module.exports = function str_repeat(input, multiplier) {
    //  discuss at: https://locutus.io/php/str_repeat/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // improved by: Ian Carter (https://euona.com/)
    //   example 1: str_repeat('-=', 10)
    //   returns 1: '-=-=-=-=-=-=-=-=-=-='
    var y = '';
    while (true) {
        if (multiplier & 1) {
            y += input;
        }
        multiplier >>= 1;
        if (multiplier) {
            input += input;
        }
        else {
            break;
        }
    }
    return y;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3JlcGVhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cl9yZXBlYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxLQUFLLEVBQUUsVUFBVTtJQUNyRCxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELHFFQUFxRTtJQUNyRSwrQ0FBK0M7SUFDL0Msb0NBQW9DO0lBQ3BDLHNDQUFzQztJQUV0QyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixPQUFPLElBQUksRUFBRTtRQUNYLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNsQixDQUFDLElBQUksS0FBSyxDQUFBO1NBQ1g7UUFDRCxVQUFVLEtBQUssQ0FBQyxDQUFBO1FBQ2hCLElBQUksVUFBVSxFQUFFO1lBQ2QsS0FBSyxJQUFJLEtBQUssQ0FBQTtTQUNmO2FBQU07WUFDTCxNQUFLO1NBQ047S0FDRjtJQUNELE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=