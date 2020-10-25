module.exports = function floatval(mixedVar) {
    //  discuss at: https://locutus.io/php/floatval/
    // original by: Michael White (https://getsprink.com)
    //      note 1: The native parseFloat() method of JavaScript returns NaN
    //      note 1: when it encounters a string before an int or float value.
    //   example 1: floatval('150.03_page-section')
    //   returns 1: 150.03
    //   example 2: floatval('page: 3')
    //   example 2: floatval('-50 + 8')
    //   returns 2: 0
    //   returns 2: -50
    return (parseFloat(mixedVar) || 0);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXR2YWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2Zsb2F0dmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRLENBQUUsUUFBUTtJQUMxQyxnREFBZ0Q7SUFDaEQscURBQXFEO0lBQ3JELHdFQUF3RTtJQUN4RSx5RUFBeUU7SUFDekUsK0NBQStDO0lBQy9DLHNCQUFzQjtJQUN0QixtQ0FBbUM7SUFDbkMsbUNBQW1DO0lBQ25DLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFFbkIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEifQ==