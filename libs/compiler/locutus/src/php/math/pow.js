module.exports = function pow(base, exp) {
    //  discuss at: https://locutus.io/php/pow/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
    //   example 1: pow(8723321.4, 7)
    //   returns 1: 3.8439091680779e+48
    return Number(Math.pow(base, exp).toPrecision(15));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL3Bvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFFLElBQUksRUFBRSxHQUFHO0lBQ3RDLDJDQUEyQztJQUMzQyw4REFBOEQ7SUFDOUQsMkRBQTJEO0lBQzNELGlDQUFpQztJQUNqQyxtQ0FBbUM7SUFFbkMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDcEQsQ0FBQyxDQUFBIn0=