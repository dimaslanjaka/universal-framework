module.exports = function cosh(arg) {
    //  discuss at: https://locutus.io/php/cosh/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: cosh(-0.18127180117607017)
    //   returns 1: 1.0164747716114113
    return (Math.exp(arg) + Math.exp(-arg)) / 2;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9jb3NoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsR0FBRztJQUNqQyw0Q0FBNEM7SUFDNUMsOERBQThEO0lBQzlELDBDQUEwQztJQUMxQyxrQ0FBa0M7SUFFbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzdDLENBQUMsQ0FBQSJ9