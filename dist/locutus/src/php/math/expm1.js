module.exports = function expm1(x) {
    //  discuss at: https://locutus.io/php/expm1/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Robert Eisele (https://www.xarg.org/)
    //      note 1: Precision 'n' can be adjusted as desired
    //   example 1: expm1(1e-15)
    //   returns 1: 1.0000000000000007e-15
    return (x < 1e-5 && x > -1e-5)
        ? x + 0.5 * x * x
        : Math.exp(x) - 1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbTEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9leHBtMS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLENBQUM7SUFDaEMsNkNBQTZDO0lBQzdDLG9EQUFvRDtJQUNwRCxxREFBcUQ7SUFDckQsd0RBQXdEO0lBQ3hELDRCQUE0QjtJQUM1QixzQ0FBc0M7SUFFdEMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNyQixDQUFDLENBQUEifQ==