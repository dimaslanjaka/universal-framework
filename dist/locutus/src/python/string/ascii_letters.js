var tslib_1 = require("tslib");
module.exports = function ascii_letters() {
    //   original by: Yury Shapkarin (https://shapkarin.me)
    //   example 1: ascii_letters()
    //   returns 1: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var length = 26;
    var i = 65;
    return tslib_1.__spreadArrays(Array(length + 6 + length)).reduce(function (accumulator) {
        return accumulator + String.fromCharCode(i++);
    }, '')
        .match(/[a-zA-Z]+/g)
        .reverse()
        .join('');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNjaWlfbGV0dGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3B5dGhvbi9zdHJpbmcvYXNjaWlfbGV0dGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGFBQWE7SUFDckMsdURBQXVEO0lBQ3ZELCtCQUErQjtJQUMvQixzRUFBc0U7SUFFdEUsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUVWLE9BQU8sdUJBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQ2xDLE1BQU0sQ0FBQyxVQUFVLFdBQVc7UUFDM0IsT0FBTyxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQy9DLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDTCxLQUFLLENBQUMsWUFBWSxDQUFDO1NBQ25CLE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9