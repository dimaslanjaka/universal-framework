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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJleHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9jL21hdGgvZnJleHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxHQUFHO0lBQ2xDLDJDQUEyQztJQUMzQywrREFBK0Q7SUFDL0QsMEJBQTBCO0lBQzFCLHFEQUFxRDtJQUNyRCxnQ0FBZ0M7SUFDaEMsa0RBQWtEO0lBQ2xELDBEQUEwRDtJQUMxRCwwREFBMEQ7SUFDMUQsd0JBQXdCO0lBQ3hCLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLDJDQUEyQztJQUMzQywyQkFBMkI7SUFDM0IseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6Qix1Q0FBdUM7SUFDdkMsMENBQTBDO0lBQzFDLHVDQUF1QztJQUN2Qyw0QkFBNEI7SUFDNUIsZ0NBQWdDO0lBQ2hDLDhCQUE4QjtJQUM5Qix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLDBCQUEwQjtJQUMxQix3QkFBd0I7SUFFeEIsNENBQTRDO0lBQzVDLDJGQUEyRjtJQUMzRixtR0FBbUc7SUFFbkcseUNBQXlDO0lBQ3pDLDRGQUE0RjtJQUM1RixnSUFBZ0k7SUFDaEksc0ZBQXNGO0lBQ3RGLG1GQUFtRjtJQUNuRixpRkFBaUY7SUFDakYseUZBQXlGO0lBRXpGLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFakIsSUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFFdkIsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDckMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM1Qiw0REFBNEQ7UUFDNUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksQ0FBRSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUE7UUFDL0UsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRWxDLGdJQUFnSTtRQUNoSSxzRkFBc0Y7UUFDdEYsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ2QsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNOLEdBQUcsRUFBRSxDQUFBO1NBQ047UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDYixDQUFDLElBQUksR0FBRyxDQUFBO1lBQ1IsR0FBRyxFQUFFLENBQUE7U0FDTjtRQUVELElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNYLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUNQO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7S0FDaEI7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9