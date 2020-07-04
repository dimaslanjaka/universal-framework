module.exports = function atanh(arg) {
    //  discuss at: https://locutus.io/php/atanh/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: atanh(0.3)
    //   returns 1: 0.3095196042031118
    return 0.5 * Math.log((1 + arg) / (1 - arg));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRhbmguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9hdGFuaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLEdBQUc7SUFDbEMsNkNBQTZDO0lBQzdDLDhEQUE4RDtJQUM5RCwwQkFBMEI7SUFDMUIsa0NBQWtDO0lBRWxDLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM5QyxDQUFDLENBQUEifQ==