module.exports = function log1p(x) {
    //  discuss at: https://locutus.io/php/log1p/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Robert Eisele (https://www.xarg.org/)
    //      note 1: Precision 'n' can be adjusted as desired
    //   example 1: log1p(1e-15)
    //   returns 1: 9.999999999999995e-16
    var ret = 0;
    // degree of precision
    var n = 50;
    if (x <= -1) {
        // JavaScript style would be to return Number.NEGATIVE_INFINITY
        return '-INF';
    }
    if (x < 0 || x > 1) {
        return Math.log(1 + x);
    }
    for (var i = 1; i < n; i++) {
        ret += Math.pow(-x, i) / i;
    }
    return -ret;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nMXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9sb2cxcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLENBQUM7SUFDaEMsNkNBQTZDO0lBQzdDLG9EQUFvRDtJQUNwRCxxREFBcUQ7SUFDckQsd0RBQXdEO0lBQ3hELDRCQUE0QjtJQUM1QixxQ0FBcUM7SUFFckMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsc0JBQXNCO0lBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUVWLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQ1gsK0RBQStEO1FBQy9ELE9BQU8sTUFBTSxDQUFBO0tBQ2Q7SUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQixHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDM0I7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=