module.exports = function chop(str, charlist) {
    //  discuss at: https://locutus.io/php/chop/
    // original by: Paulo Freitas
    //   example 1: chop('    Kevin van Zonneveld    ')
    //   returns 1: '    Kevin van Zonneveld'
    var rtrim = require('../strings/rtrim');
    return rtrim(str, charlist);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2Nob3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBRSxHQUFHLEVBQUUsUUFBUTtJQUMzQyw0Q0FBNEM7SUFDNUMsNkJBQTZCO0lBQzdCLG1EQUFtRDtJQUNuRCx5Q0FBeUM7SUFFekMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDdkMsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzdCLENBQUMsQ0FBQSJ9