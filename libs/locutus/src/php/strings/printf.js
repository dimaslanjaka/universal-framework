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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnRmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3ByaW50Zi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTTtJQUM5Qiw4Q0FBOEM7SUFDOUMscURBQXFEO0lBQ3JELHFEQUFxRDtJQUNyRCxvREFBb0Q7SUFDcEQsdUNBQXVDO0lBQ3ZDLGlCQUFpQjtJQUVqQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUMzQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNyQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUE7QUFDbkIsQ0FBQyxDQUFBIn0=