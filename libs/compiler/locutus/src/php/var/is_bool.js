module.exports = function is_bool(mixedVar) {
    //  discuss at: https://locutus.io/php/is_bool/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: CoursesWeb (https://www.coursesweb.net/)
    //   example 1: is_bool(false)
    //   returns 1: true
    //   example 2: is_bool(0)
    //   returns 2: false
    return (mixedVar === true || mixedVar === false); // Faster (in FF) than type checking
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfYm9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzX2Jvb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxRQUFRO0lBQ3pDLCtDQUErQztJQUMvQyw4REFBOEQ7SUFDOUQsd0RBQXdEO0lBQ3hELDhCQUE4QjtJQUM5QixvQkFBb0I7SUFDcEIsMEJBQTBCO0lBQzFCLHFCQUFxQjtJQUVyQixPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUEsQ0FBQyxvQ0FBb0M7QUFDdkYsQ0FBQyxDQUFBIn0=