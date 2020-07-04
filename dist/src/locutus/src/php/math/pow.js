module.exports = function pow(base, exp) {
    //  discuss at: https://locutus.io/php/pow/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
    //   example 1: pow(8723321.4, 7)
    //   returns 1: 3.8439091680779e+48
    return Number(Math.pow(base, exp).toPrecision(15));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvcG93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUUsSUFBSSxFQUFFLEdBQUc7SUFDdEMsMkNBQTJDO0lBQzNDLDhEQUE4RDtJQUM5RCwyREFBMkQ7SUFDM0QsaUNBQWlDO0lBQ2pDLG1DQUFtQztJQUVuQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNwRCxDQUFDLENBQUEifQ==