module.exports = function tanh(arg) {
    //  discuss at: https://locutus.io/php/tanh/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // imprived by: Robert Eisele (https://www.xarg.org/)
    //   example 1: tanh(5.4251848798444815)
    //   returns 1: 0.9999612058841574
    return 1 - 2 / (Math.exp(2 * arg) + 1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFuaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL3RhbmguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBRSxHQUFHO0lBQ2pDLDRDQUE0QztJQUM1Qyw4REFBOEQ7SUFDOUQscURBQXFEO0lBQ3JELHdDQUF3QztJQUN4QyxrQ0FBa0M7SUFFbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDeEMsQ0FBQyxDQUFBIn0=