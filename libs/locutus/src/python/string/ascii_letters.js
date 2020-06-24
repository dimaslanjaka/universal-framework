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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNjaWlfbGV0dGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9weXRob24vc3RyaW5nL2FzY2lpX2xldHRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhO0lBQ3JDLHVEQUF1RDtJQUN2RCwrQkFBK0I7SUFDL0Isc0VBQXNFO0lBRXRFLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNqQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixPQUFPLHVCQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUNsQyxNQUFNLENBQUMsVUFBVSxXQUFXO1FBQzNCLE9BQU8sV0FBVyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMvQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ0wsS0FBSyxDQUFDLFlBQVksQ0FBQztTQUNuQixPQUFPLEVBQUU7U0FDVCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDYixDQUFDLENBQUEifQ==