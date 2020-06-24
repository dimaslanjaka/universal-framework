module.exports = function lcfirst(str) {
    //  discuss at: https://locutus.io/php/lcfirst/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: lcfirst('Kevin Van Zonneveld')
    //   returns 1: 'kevin Van Zonneveld'
    str += '';
    var f = str.charAt(0)
        .toLowerCase();
    return f + str.substr(1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGNmaXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9sY2ZpcnN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsR0FBRztJQUNwQywrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELDhDQUE4QztJQUM5QyxxQ0FBcUM7SUFFckMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2xCLFdBQVcsRUFBRSxDQUFBO0lBQ2hCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDMUIsQ0FBQyxDQUFBIn0=