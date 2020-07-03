module.exports = function boolval(mixedVar) {
    // original by: Will Rowe
    //   example 1: boolval(true)
    //   returns 1: true
    //   example 2: boolval(false)
    //   returns 2: false
    //   example 3: boolval(0)
    //   returns 3: false
    //   example 4: boolval(0.0)
    //   returns 4: false
    //   example 5: boolval('')
    //   returns 5: false
    //   example 6: boolval('0')
    //   returns 6: false
    //   example 7: boolval([])
    //   returns 7: false
    //   example 8: boolval('')
    //   returns 8: false
    //   example 9: boolval(null)
    //   returns 9: false
    //   example 10: boolval(undefined)
    //   returns 10: false
    //   example 11: boolval('true')
    //   returns 11: true
    if (mixedVar === false) {
        return false;
    }
    if (mixedVar === 0 || mixedVar === 0.0) {
        return false;
    }
    if (mixedVar === '' || mixedVar === '0') {
        return false;
    }
    if (Array.isArray(mixedVar) && mixedVar.length === 0) {
        return false;
    }
    if (mixedVar === null || mixedVar === undefined) {
        return false;
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbHZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvYm9vbHZhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFFLFFBQVE7SUFDekMseUJBQXlCO0lBQ3pCLDZCQUE2QjtJQUM3QixvQkFBb0I7SUFDcEIsOEJBQThCO0lBQzlCLHFCQUFxQjtJQUNyQiwwQkFBMEI7SUFDMUIscUJBQXFCO0lBQ3JCLDRCQUE0QjtJQUM1QixxQkFBcUI7SUFDckIsMkJBQTJCO0lBQzNCLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIscUJBQXFCO0lBQ3JCLDJCQUEyQjtJQUMzQixxQkFBcUI7SUFDckIsMkJBQTJCO0lBQzNCLHFCQUFxQjtJQUNyQiw2QkFBNkI7SUFDN0IscUJBQXFCO0lBQ3JCLG1DQUFtQztJQUNuQyxzQkFBc0I7SUFDdEIsZ0NBQWdDO0lBQ2hDLHFCQUFxQjtJQUVyQixJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7UUFDdEIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUksUUFBUSxLQUFLLENBQUMsSUFBSSxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ3RDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLFFBQVEsS0FBSyxFQUFFLElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtRQUN2QyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3BELE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUMvQyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==