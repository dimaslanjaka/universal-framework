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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNjaWlfbG93ZXJjYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3B5dGhvbi9zdHJpbmcvYXNjaWlfbG93ZXJjYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZTtJQUN2Qyx1REFBdUQ7SUFDdkQsaUNBQWlDO0lBQ2pDLDRDQUE0QztJQUU1QyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDakIsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFFdkIsT0FBTyx1QkFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLFdBQVc7UUFDM0IsT0FBTyxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQy9DLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNWLENBQUMsQ0FBQSJ9