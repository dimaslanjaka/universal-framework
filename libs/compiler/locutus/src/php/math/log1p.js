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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nMXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvbG9nMXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxDQUFDO0lBQ2hDLDZDQUE2QztJQUM3QyxvREFBb0Q7SUFDcEQscURBQXFEO0lBQ3JELHdEQUF3RDtJQUN4RCw0QkFBNEI7SUFDNUIscUNBQXFDO0lBRXJDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUNYLHNCQUFzQjtJQUN0QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNYLCtEQUErRDtRQUMvRCxPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtLQUN2QjtJQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQzNCO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9