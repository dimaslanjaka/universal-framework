module.exports = function time() {
    //  discuss at: https://locutus.io/php/time/
    // original by: GeekFG (https://geekfg.blogspot.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: metjay
    // improved by: HKM
    //   example 1: var $timeStamp = time()
    //   example 1: var $result = $timeStamp > 1000000000 && $timeStamp < 2000000000
    //   returns 1: true
    return Math.floor(new Date().getTime() / 1000);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS90aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJO0lBQzVCLDRDQUE0QztJQUM1QyxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsdUNBQXVDO0lBQ3ZDLGdGQUFnRjtJQUNoRixvQkFBb0I7SUFFcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDaEQsQ0FBQyxDQUFBIn0=