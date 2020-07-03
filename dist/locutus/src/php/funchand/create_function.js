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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2Z1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2Z1bmNoYW5kL2NyZWF0ZV9mdW5jdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLElBQUksRUFBRSxJQUFJO0lBQ25ELDREQUE0RDtJQUM1RCw0REFBNEQ7SUFDNUQseURBQXlEO0lBQ3pELHVFQUF1RTtJQUN2RSw2QkFBNkI7SUFDN0Isc0JBQXNCO0lBRXRCLElBQUk7UUFDRixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7S0FDMUQ7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sS0FBSyxDQUFBO0tBQ2I7QUFDSCxDQUFDLENBQUEifQ==