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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvaHlwb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxDQUFDLEVBQUUsQ0FBQztJQUNuQyw2Q0FBNkM7SUFDN0MsOERBQThEO0lBQzlELHFEQUFxRDtJQUNyRCwyQkFBMkI7SUFDM0IsaUJBQWlCO0lBQ2pCLDhCQUE4QjtJQUM5QixvQkFBb0I7SUFFcEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVmLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUE7QUFDekMsQ0FBQyxDQUFBIn0=