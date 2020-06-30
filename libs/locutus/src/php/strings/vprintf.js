module.exports = function vprintf(format, args) {
    //       discuss at: https://locutus.io/php/vprintf/
    //      original by: Ash Searle (https://hexmen.com/blog/)
    //      improved by: Michael White (https://getsprink.com)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //        example 1: vprintf("%01.2f", 123.1)
    //        returns 1: 6
    var sprintf = require('../strings/sprintf');
    var echo = require('../strings/echo');
    var ret = sprintf.apply(this, [format].concat(args));
    echo(ret);
    return ret.length;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnByaW50Zi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy92cHJpbnRmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsTUFBTSxFQUFFLElBQUk7SUFDN0Msb0RBQW9EO0lBQ3BELDBEQUEwRDtJQUMxRCwwREFBMEQ7SUFDMUQseURBQXlEO0lBQ3pELDZDQUE2QztJQUM3QyxzQkFBc0I7SUFFdEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDM0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDckMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFVCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUE7QUFDbkIsQ0FBQyxDQUFBIn0=