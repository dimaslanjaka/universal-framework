var tslib_1 = require("tslib");
module.exports = function ascii_uppercase() {
    //   original by: Yury Shapkarin (https://shapkarin.me)
    //   example 1: ascii_uppercase()
    //   returns 1: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var length = 26;
    var i = 65;
    return tslib_1.__spreadArray([], Array(length)).reduce(function (accumulator) {
        return accumulator + String.fromCharCode(i++);
    }, '');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNjaWlfdXBwZXJjYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcHl0aG9uL3N0cmluZy9hc2NpaV91cHBlcmNhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxlQUFlO0lBQ3ZDLHVEQUF1RDtJQUN2RCxpQ0FBaUM7SUFDakMsNENBQTRDO0lBRTVDLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNqQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixPQUFPLDBCQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDckIsTUFBTSxDQUFDLFVBQVUsV0FBVztRQUMzQixPQUFPLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDL0MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=