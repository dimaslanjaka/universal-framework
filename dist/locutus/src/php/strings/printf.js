module.exports = function printf() {
    //  discuss at: https://locutus.io/php/printf/
    // original by: Ash Searle (https://hexmen.com/blog/)
    // improved by: Michael White (https://getsprink.com)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: printf("%01.2f", 123.1)
    //   returns 1: 6
    var sprintf = require('../strings/sprintf');
    var echo = require('../strings/echo');
    var ret = sprintf.apply(this, arguments);
    echo(ret);
    return ret.length;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnRmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvcHJpbnRmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNO0lBQzlCLDhDQUE4QztJQUM5QyxxREFBcUQ7SUFDckQscURBQXFEO0lBQ3JELG9EQUFvRDtJQUNwRCx1Q0FBdUM7SUFDdkMsaUJBQWlCO0lBRWpCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQzNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3JDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQTtBQUNuQixDQUFDLENBQUEifQ==