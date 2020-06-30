module.exports = function sinh(arg) {
    //  discuss at: https://locutus.io/php/sinh/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: sinh(-0.9834330348825909)
    //   returns 1: -1.1497971402636502
    return (Math.exp(arg) - Math.exp(-arg)) / 2;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9zaW5oLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsR0FBRztJQUNqQyw0Q0FBNEM7SUFDNUMsOERBQThEO0lBQzlELHlDQUF5QztJQUN6QyxtQ0FBbUM7SUFFbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzdDLENBQUMsQ0FBQSJ9