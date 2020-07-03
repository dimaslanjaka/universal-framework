module.exports = function hypot(x, y) {
    //  discuss at: https://locutus.io/php/hypot/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // imprived by: Robert Eisele (https://www.xarg.org/)
    //   example 1: hypot(3, 4)
    //   returns 1: 5
    //   example 2: hypot([], 'a')
    //   returns 2: null
    x = Math.abs(x);
    y = Math.abs(y);
    var t = Math.min(x, y);
    x = Math.max(x, y);
    t = t / x;
    return x * Math.sqrt(1 + t * t) || null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9oeXBvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLENBQUMsRUFBRSxDQUFDO0lBQ25DLDZDQUE2QztJQUM3Qyw4REFBOEQ7SUFDOUQscURBQXFEO0lBQ3JELDJCQUEyQjtJQUMzQixpQkFBaUI7SUFDakIsOEJBQThCO0lBQzlCLG9CQUFvQjtJQUVwQixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRWYsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDdEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRVQsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQTtBQUN6QyxDQUFDLENBQUEifQ==