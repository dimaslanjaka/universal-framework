module.exports = function is_bool(mixedVar) {
    //  discuss at: https://locutus.io/php/is_bool/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: CoursesWeb (https://www.coursesweb.net/)
    //   example 1: is_bool(false)
    //   returns 1: true
    //   example 2: is_bool(0)
    //   returns 2: false
    return (mixedVar === true || mixedVar === false); // Faster (in FF) than type checking
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfYm9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfYm9vbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFFLFFBQVE7SUFDekMsK0NBQStDO0lBQy9DLDhEQUE4RDtJQUM5RCx3REFBd0Q7SUFDeEQsOEJBQThCO0lBQzlCLG9CQUFvQjtJQUNwQiwwQkFBMEI7SUFDMUIscUJBQXFCO0lBRXJCLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQSxDQUFDLG9DQUFvQztBQUN2RixDQUFDLENBQUEifQ==