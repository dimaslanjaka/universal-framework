module.exports = function acosh(arg) {
    //  discuss at: https://locutus.io/php/acosh/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: acosh(8723321.4)
    //   returns 1: 16.674657798418625
    return Math.log(arg + Math.sqrt(arg * arg - 1));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNvc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9hY29zaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLEdBQUc7SUFDbEMsNkNBQTZDO0lBQzdDLDhEQUE4RDtJQUM5RCxnQ0FBZ0M7SUFDaEMsa0NBQWtDO0lBRWxDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakQsQ0FBQyxDQUFBIn0=