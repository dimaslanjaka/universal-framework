module.exports = function lcfirst(str) {
    //  discuss at: https://locutus.io/php/lcfirst/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: lcfirst('Kevin Van Zonneveld')
    //   returns 1: 'kevin Van Zonneveld'
    str += '';
    var f = str.charAt(0)
        .toLowerCase();
    return f + str.substr(1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGNmaXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2xjZmlyc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxHQUFHO0lBQ3BDLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsOENBQThDO0lBQzlDLHFDQUFxQztJQUVyQyxHQUFHLElBQUksRUFBRSxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbEIsV0FBVyxFQUFFLENBQUE7SUFDaEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==