module.exports = function tanh(arg) {
    //  discuss at: https://locutus.io/php/tanh/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // imprived by: Robert Eisele (https://www.xarg.org/)
    //   example 1: tanh(5.4251848798444815)
    //   returns 1: 0.9999612058841574
    return 1 - 2 / (Math.exp(2 * arg) + 1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFuaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC90YW5oLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsR0FBRztJQUNqQyw0Q0FBNEM7SUFDNUMsOERBQThEO0lBQzlELHFEQUFxRDtJQUNyRCx3Q0FBd0M7SUFDeEMsa0NBQWtDO0lBRWxDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3hDLENBQUMsQ0FBQSJ9