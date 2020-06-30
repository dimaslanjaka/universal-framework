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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbTEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvZXhwbTEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxDQUFDO0lBQ2hDLDZDQUE2QztJQUM3QyxvREFBb0Q7SUFDcEQscURBQXFEO0lBQ3JELHdEQUF3RDtJQUN4RCw0QkFBNEI7SUFDNUIsc0NBQXNDO0lBRXRDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckIsQ0FBQyxDQUFBIn0=