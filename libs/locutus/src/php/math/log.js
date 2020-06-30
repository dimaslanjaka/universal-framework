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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL2xvZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ3RDLDJDQUEyQztJQUMzQyw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELGlDQUFpQztJQUNqQyxpQ0FBaUM7SUFFakMsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQztRQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3BDLENBQUMsQ0FBQSJ9