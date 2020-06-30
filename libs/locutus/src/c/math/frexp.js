module.exports = function frexp(arg) {
    //  discuss at: https://locutus.io/c/frexp/
    // original by: Oskar Larsson Högfeldt (https://oskar-lh.name/)
    //      note 1: Instead of
    //      note 1: double frexp( double arg, int* exp );
    //      note 1: this is built as
    //      note 1: [double, int] frexp( double arg );
    //      note 1: due to the lack of pointers in JavaScript.
    //      note 1: See code comments for further information.
    //   example 1: frexp(1)
    //   returns 1: [0.5, 1]
    //   example 2: frexp(1.5)
    //   returns 2: [0.75, 1]
    //   example 3: frexp(3 * Math.pow(2, 500))
    //   returns 3: [0.75, 502]
    //   example 4: frexp(-4)
    //   returns 4: [-0.5, 3]
    //   example 5: frexp(Number.MAX_VALUE)
    //   returns 5: [0.9999999999999999, 1024]
    //   example 6: frexp(Number.MIN_VALUE)
    //   returns 6: [0.5, -1073]
    //   example 7: frexp(-Infinity)
    //   returns 7: [-Infinity, 0]
    //   example 8: frexp(-0)
    //   returns 8: [-0, 0]
    //   example 9: frexp(NaN)
    //   returns 9: [NaN, 0]
    // Potential issue with this implementation:
    // the precisions of Math.pow and the ** operator are undefined in the ECMAScript standard,
    // however, sane implementations should give the same results for Math.pow(2, <integer>) operations
    // Like frexp of C and std::frexp of C++,
    // but returns an array instead of using a pointer argument for passing the exponent result.
    // Object.is(n, frexp(n)[0] * 2 ** frexp(n)[1]) for all number values of n except when Math.isFinite(n) && Math.abs(n) > 2**1023
    // Object.is(n, (2 * frexp(n)[0]) * 2 ** (frexp(n)[1] - 1)) for all number values of n
    // Object.is(n, frexp(n)[0]) for these values of n: 0, -0, NaN, Infinity, -Infinity
    // Math.abs(frexp(n)[0]) is >= 0.5 and < 1.0 for any other number-type value of n
    // See https://en.cppreference.com/w/c/numeric/math/frexp for a more detailed description
    arg = Number(arg);
    var result = [arg, 0];
    if (arg !== 0 && Number.isFinite(arg)) {
        var absArg = Math.abs(arg);
        // Math.log2 was introduced in ES2015, use it when available
        var log2 = Math.log2 || function log2(n) { return Math.log(n) * Math.LOG2E; };
        var exp = Math.max(-1023, Math.floor(log2(absArg)) + 1);
        var x = absArg * Math.pow(2, -exp);
        // These while loops compensate for rounding errors that sometimes occur because of ECMAScript's Math.log2's undefined precision
        // and also works around the issue of Math.pow(2, -exp) === Infinity when exp <= -1024
        while (x < 0.5) {
            x *= 2;
            exp--;
        }
        while (x >= 1) {
            x *= 0.5;
            exp++;
        }
        if (arg < 0) {
            x = -x;
        }
        result[0] = x;
        result[1] = exp;
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJleHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvYy9tYXRoL2ZyZXhwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsR0FBRztJQUNsQywyQ0FBMkM7SUFDM0MsK0RBQStEO0lBQy9ELDBCQUEwQjtJQUMxQixxREFBcUQ7SUFDckQsZ0NBQWdDO0lBQ2hDLGtEQUFrRDtJQUNsRCwwREFBMEQ7SUFDMUQsMERBQTBEO0lBQzFELHdCQUF3QjtJQUN4Qix3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLHlCQUF5QjtJQUN6QiwyQ0FBMkM7SUFDM0MsMkJBQTJCO0lBQzNCLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsdUNBQXVDO0lBQ3ZDLDBDQUEwQztJQUMxQyx1Q0FBdUM7SUFDdkMsNEJBQTRCO0lBQzVCLGdDQUFnQztJQUNoQyw4QkFBOEI7SUFDOUIseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QiwwQkFBMEI7SUFDMUIsd0JBQXdCO0lBRXhCLDRDQUE0QztJQUM1QywyRkFBMkY7SUFDM0YsbUdBQW1HO0lBRW5HLHlDQUF5QztJQUN6Qyw0RkFBNEY7SUFDNUYsZ0lBQWdJO0lBQ2hJLHNGQUFzRjtJQUN0RixtRkFBbUY7SUFDbkYsaUZBQWlGO0lBQ2pGLHlGQUF5RjtJQUV6RixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRWpCLElBQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRXZCLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDNUIsNERBQTREO1FBQzVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLENBQUUsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQy9FLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUVsQyxnSUFBZ0k7UUFDaEksc0ZBQXNGO1FBQ3RGLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUNkLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDTixHQUFHLEVBQUUsQ0FBQTtTQUNOO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2IsQ0FBQyxJQUFJLEdBQUcsQ0FBQTtZQUNSLEdBQUcsRUFBRSxDQUFBO1NBQ047UUFFRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDUDtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDYixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0tBQ2hCO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==