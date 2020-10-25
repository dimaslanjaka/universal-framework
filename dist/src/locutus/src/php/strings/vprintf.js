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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnByaW50Zi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3ZwcmludGYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxNQUFNLEVBQUUsSUFBSTtJQUM3QyxvREFBb0Q7SUFDcEQsMERBQTBEO0lBQzFELDBEQUEwRDtJQUMxRCx5REFBeUQ7SUFDekQsNkNBQTZDO0lBQzdDLHNCQUFzQjtJQUV0QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUMzQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNyQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQTtBQUNuQixDQUFDLENBQUEifQ==