function pad(str, minLength, padChar, leftJustify) {
    var diff = minLength - str.length;
    var padStr = padChar.repeat(Math.max(0, diff));
    return leftJustify ? str + padStr : padStr + str;
}
module.exports = function sprintf(format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // original by: Rafał Kukawski
    //   example 1: sprintf('%+10.*d', 5, 1)
    //   returns 1: '    +00001'
    var placeholderRegex = /%(?:(\d+)\$)?([-+#0 ]*)(\*|\d+)?(?:\.(\*|\d*))?([\s\S])/g;
    var index = 0;
    return format.replace(placeholderRegex, function (match, param, flags, width, prec, modifier) {
        var leftJustify = flags.includes('-');
        // flag '0' is ignored when flag '-' is present
        var padChar = leftJustify ? ' '
            : flags.split('').reduce(function (pc, c) { return [' ', '0'].includes(c) ? c : pc; }, ' ');
        var positiveSign = flags.includes('+') ? '+' : flags.includes(' ') ? ' ' : '';
        var minWidth = width === '*' ? args[index++] : +width || 0;
        var precision = prec === '*' ? args[index++] : +prec;
        if (param && !+param) {
            throw Error("Param index must be greater than 0");
        }
        if (param && +param > args.length) {
            throw Error("Too few arguments");
        }
        // compiling with default clang params, mixed positional and non-positional params
        // give only a warning
        var arg = param ? args[param - 1] : args[index++];
        if (precision === undefined || isNaN(precision)) {
            precision = 'eEfFgG'.includes(modifier) ? 6 : (modifier === 's' ? String(arg).length : undefined);
        }
        switch (modifier) {
            case '%':
                return '%';
            case 'd':
            case 'i': {
                var number = Math.trunc(+arg || 0);
                var abs = Math.abs(number);
                var prefix = number < 0 ? '-' : positiveSign;
                var str = pad(abs.toString(), precision || 0, '0', false);
                if (padChar === '0') {
                    return prefix + pad(str, minWidth - prefix.length, padChar, leftJustify);
                }
                return pad(prefix + str, minWidth, padChar, leftJustify);
            }
            case 'e':
            case 'E':
            case 'f':
            case 'F':
            case 'g':
            case 'G': {
                var number = +arg;
                var abs = Math.abs(number);
                var prefix = number < 0 ? '-' : positiveSign;
                var op = [
                    Number.prototype.toExponential,
                    Number.prototype.toFixed,
                    Number.prototype.toPrecision
                ]['efg'.indexOf(modifier.toLowerCase())];
                var tr = [
                    String.prototype.toLowerCase,
                    String.prototype.toUpperCase
                ]['eEfFgG'.indexOf(modifier) % 2];
                var isSpecial = isNaN(abs) || !isFinite(abs);
                var str = isSpecial ? abs.toString().substr(0, 3) : op.call(abs, precision);
                if (padChar === '0' && !isSpecial) {
                    return prefix + pad(tr.call(str), minWidth - prefix.length, padChar, leftJustify);
                }
                return pad(tr.call(prefix + str), minWidth, isSpecial ? ' ' : padChar, leftJustify);
            }
            case 'b':
            case 'o':
            case 'u':
            case 'x':
            case 'X': {
                var number = +arg || 0;
                var intVal = Math.trunc(number) + (number < 0 ? 0xFFFFFFFF + 1 : 0);
                var base = [2, 8, 10, 16, 16]['bouxX'.indexOf(modifier)];
                var prefix = intVal && flags.includes('#') ? ['', '0', '', '0x', '0X']['bouxXX'.indexOf(modifier)] : '';
                if (padChar === '0' && prefix) {
                    return prefix + pad(pad(intVal.toString(base), precision, '0', false), minWidth - prefix.length, padChar, leftJustify);
                }
                return pad(prefix + pad(intVal.toString(base), precision, '0', false), minWidth, padChar, leftJustify);
            }
            case 'p':
            case 'n': {
                throw Error("'" + modifier + "' modifier not supported");
            }
            case 's': {
                return pad(String(arg).substr(0, precision), minWidth, padChar, leftJustify);
            }
            case 'c': {
                // extension, if arg is string, take first char
                var chr = typeof arg === 'string' ? arg.charAt(0) : String.fromCharCode(+arg);
                return pad(chr, minWidth, padChar, leftJustify);
            }
            case 'a':
            case 'A':
                throw Error("'" + modifier + "' modifier not yet implemented");
            default:
                // for unknown modifiers, return the modifier char
                return modifier;
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW50Zi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9jL3N0ZGlvL3NwcmludGYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxHQUFHLENBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsV0FBVztJQUNoRCxJQUFNLElBQUksR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUNuQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7SUFFaEQsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7QUFDbEQsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsTUFBTTtJQUFFLGNBQU87U0FBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1FBQVAsNkJBQU87O0lBQ2hELDhCQUE4QjtJQUM5Qix3Q0FBd0M7SUFDeEMsNEJBQTRCO0lBQzVCLElBQU0sZ0JBQWdCLEdBQUcsMERBQTBELENBQUE7SUFFbkYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0lBRWIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRO1FBQzFGLElBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFdkMsK0NBQStDO1FBQy9DLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRztZQUNmLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FB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