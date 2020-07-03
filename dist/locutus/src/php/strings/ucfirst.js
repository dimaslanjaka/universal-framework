module.exports = function ucfirst(str) {
    //  discuss at: https://locutus.io/php/ucfirst/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: ucfirst('kevin van zonneveld')
    //   returns 1: 'Kevin van zonneveld'
    str += '';
    var f = str.charAt(0)
        .toUpperCase();
    return f + str.substr(1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWNmaXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3VjZmlyc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxHQUFHO0lBQ3BDLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCw4Q0FBOEM7SUFDOUMscUNBQXFDO0lBRXJDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNsQixXQUFXLEVBQUUsQ0FBQTtJQUNoQixPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzFCLENBQUMsQ0FBQSJ9