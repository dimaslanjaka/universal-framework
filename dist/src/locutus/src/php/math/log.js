module.exports = function log(arg, base) {
    //  discuss at: https://locutus.io/php/log/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: log(8723321.4, 7)
    //   returns 1: 8.212871815082147
    return (typeof base === 'undefined')
        ? Math.log(arg)
        : Math.log(arg) / Math.log(base);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUUsR0FBRyxFQUFFLElBQUk7SUFDdEMsMkNBQTJDO0lBQzNDLDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsaUNBQWlDO0lBQ2pDLGlDQUFpQztJQUVqQyxPQUFPLENBQUMsT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBIn0=