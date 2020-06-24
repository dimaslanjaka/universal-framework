module.exports = function is_object(mixedVar) {
    //  discuss at: https://locutus.io/php/is_object/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Legaev Andrey
    // improved by: Michael White (https://getsprink.com)
    //   example 1: is_object('23')
    //   returns 1: false
    //   example 2: is_object({foo: 'bar'})
    //   returns 2: true
    //   example 3: is_object(null)
    //   returns 3: false
    if (Object.prototype.toString.call(mixedVar) === '[object Array]') {
        return false;
    }
    return mixedVar !== null && typeof mixedVar === 'object';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfb2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfb2JqZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsUUFBUTtJQUMzQyxpREFBaUQ7SUFDakQsb0RBQW9EO0lBQ3BELDZCQUE2QjtJQUM3QixxREFBcUQ7SUFDckQsK0JBQStCO0lBQy9CLHFCQUFxQjtJQUNyQix1Q0FBdUM7SUFDdkMsb0JBQW9CO0lBQ3BCLCtCQUErQjtJQUMvQixxQkFBcUI7SUFFckIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7UUFDakUsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELE9BQU8sUUFBUSxLQUFLLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLENBQUE7QUFDMUQsQ0FBQyxDQUFBIn0=