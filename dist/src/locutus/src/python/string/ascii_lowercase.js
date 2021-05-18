var tslib_1 = require("tslib");
module.exports = function ascii_lowercase() {
    //   original by: Yury Shapkarin (https://shapkarin.me)
    //   example 1: ascii_lowercase()
    //   returns 1: 'abcdefghijklmnopqrstuvwxyz'
    var length = 26;
    var i = 65 + length + 6;
    return tslib_1.__spreadArrays(Array(length)).reduce(function (accumulator) {
        return accumulator + String.fromCharCode(i++);
    }, '');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNjaWlfbG93ZXJjYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcHl0aG9uL3N0cmluZy9hc2NpaV9sb3dlcmNhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxlQUFlO0lBQ3ZDLHVEQUF1RDtJQUN2RCxpQ0FBaUM7SUFDakMsNENBQTRDO0lBRTVDLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNqQixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUV2QixPQUFPLHVCQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDckIsTUFBTSxDQUFDLFVBQVUsV0FBVztRQUMzQixPQUFPLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDL0MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=