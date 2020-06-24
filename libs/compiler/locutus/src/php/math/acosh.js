module.exports = function acosh(arg) {
    //  discuss at: https://locutus.io/php/acosh/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: acosh(8723321.4)
    //   returns 1: 16.674657798418625
    return Math.log(arg + Math.sqrt(arg * arg - 1));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNvc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvYWNvc2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxHQUFHO0lBQ2xDLDZDQUE2QztJQUM3Qyw4REFBOEQ7SUFDOUQsZ0NBQWdDO0lBQ2hDLGtDQUFrQztJQUVsQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pELENBQUMsQ0FBQSJ9