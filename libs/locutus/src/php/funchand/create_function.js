module.exports = function create_function(args, code) {
    //       discuss at: https://locutus.io/php/create_function/
    //      original by: Johnny Mast (https://www.phpvrouwen.nl)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //        example 1: var $f = create_function('a, b', 'return (a + b)')
    //        example 1: $f(1, 2)
    //        returns 1: 3
    try {
        return Function.apply(null, args.split(',').concat(code));
    }
    catch (e) {
        return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2Z1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9mdW5jaGFuZC9jcmVhdGVfZnVuY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGVBQWUsQ0FBRSxJQUFJLEVBQUUsSUFBSTtJQUNuRCw0REFBNEQ7SUFDNUQsNERBQTREO0lBQzVELHlEQUF5RDtJQUN6RCx1RUFBdUU7SUFDdkUsNkJBQTZCO0lBQzdCLHNCQUFzQjtJQUV0QixJQUFJO1FBQ0YsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQzFEO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQTtLQUNiO0FBQ0gsQ0FBQyxDQUFBIn0=