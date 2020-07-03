module.exports = function addslashes(str) {
    //  discuss at: https://locutus.io/php/addslashes/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Ates Goral (https://magnetiq.com)
    // improved by: marrtins
    // improved by: Nate
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Oskar Larsson Högfeldt (https://oskar-lh.name/)
    //    input by: Denny Wardhana
    //   example 1: addslashes("kevin's birthday")
    //   returns 1: "kevin\\'s birthday"
    return (str + '')
        .replace(/[\\"']/g, '\\$&')
        .replace(/\u0000/g, '\\0');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkc2xhc2hlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2FkZHNsYXNoZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxHQUFHO0lBQ3ZDLGtEQUFrRDtJQUNsRCxvREFBb0Q7SUFDcEQsaURBQWlEO0lBQ2pELHdCQUF3QjtJQUN4QixvQkFBb0I7SUFDcEIsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCwrREFBK0Q7SUFDL0QsOEJBQThCO0lBQzlCLDhDQUE4QztJQUM5QyxvQ0FBb0M7SUFFcEMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZCxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztTQUMxQixPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQzlCLENBQUMsQ0FBQSJ9