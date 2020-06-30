module.exports = function pack(format) {
    //  discuss at: https://locutus.io/php/pack/
    // original by: Tim de Koning (https://www.kingsquare.nl)
    //    parts by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // bugfixed by: Tim de Koning (https://www.kingsquare.nl)
    //      note 1: Float encoding by: Jonas Raoni Soares Silva
    //      note 1: Home: https://www.kingsquare.nl/blog/12-12-2009/13507444
    //      note 1: Feedback: phpjs-pack@kingsquare.nl
    //      note 1: "machine dependent byte order and size" aren't
    //      note 1: applicable for JavaScript; pack works as on a 32bit,
    //      note 1: little endian machine.
    //   example 1: pack('nvc*', 0x1234, 0x5678, 65, 66)
    //   returns 1: '\u00124xVAB'
    //   example 2: pack('H4', '2345')
    //   returns 2: '#E'
    //   example 3: pack('H*', 'D5')
    //   returns 3: 'Õ'
    //   example 4: pack('d', -100.876)
    //   returns 4: "\u0000\u0000\u0000\u0000\u00008YÀ"
    //        test: skip-1
    var formatPointer = 0;
    var argumentPointer = 1;
    var result = '';
    var argument = '';
    var i = 0;
    var r = [];
    var instruction, quantifier, word, precisionBits, exponentBits, extraNullCount;
    // vars used by float encoding
    var bias;
    var minExp;
    var maxExp;
    var minUnnormExp;
    var status;
    var exp;
    var len;
    var bin;
    var signal;
    var n;
    var intPart;
    var floatPart;
    var lastBit;
    var rounded;
    var j;
    var k;
    var tmpResult;
    while (formatPointer < format.length) {
        instruction = format.charAt(formatPointer);
        quantifier = '';
        formatPointer++;
        while ((formatPointer < format.length) && (format.charAt(formatPointer)
            .match(/[\d*]/) !== null)) {
            quantifier += format.charAt(formatPointer);
            formatPointer++;
        }
        if (quantifier === '') {
            quantifier = '1';
        }
        // Now pack variables: 'quantifier' times 'instruction'
        switch (instruction) {
            case 'a':
            case 'A':
                // NUL-padded string
                // SPACE-padded string
                if (typeof arguments[argumentPointer] === 'undefined') {
                    throw new Error('Warning:  pack() Type ' + instruction + ': not enough arguments');
                }
                else {
                    argument = String(arguments[argumentPointer]);
                }
                if (quantifier === '*') {
                    quantifier = argument.length;
                }
                for (i = 0; i < quantifier; i++) {
                    if (typeof argument[i] === 'undefined') {
                        if (instruction === 'a') {
                            result += String.fromCharCode(0);
                        }
                        else {
                            result += ' ';
                        }
                    }
                    else {
                        result += argument[i];
                    }
                }
                argumentPointer++;
                break;
            case 'h':
            case 'H':
                // Hex string, low nibble first
                // Hex string, high nibble first
                if (typeof arguments[argumentPointer] === 'undefined') {
                    throw new Error('Warning: pack() Type ' + instruction + ': not enough arguments');
                }
                else {
                    argument = arguments[argumentPointer];
                }
                if (quantifier === '*') {
                    quantifier = argument.length;
                }
                if (quantifier > argument.length) {
                    var msg = 'Warning: pack() Type ' + instruction + ': not enough characters in string';
                    throw new Error(msg);
                }
                for (i = 0; i < quantifier; i += 2) {
                    // Always get per 2 bytes...
                    word = argument[i];
                    if (((i + 1) >= quantifier) || typeof argument[i + 1] === 'undefined') {
                        word += '0';
                    }
                    else {
                        word += argument[i + 1];
                    }
                    // The fastest way to reverse?
                    if (instruction === 'h') {
                        word = word[1] + word[0];
                    }
                    result += String.fromCharCode(parseInt(word, 16));
                }
                argumentPointer++;
                break;
            case 'c':
            case 'C':
                // signed char
                // unsigned char
                // c and C is the same in pack
                if (quantifier === '*') {
                    quantifier = arguments.length - argumentPointer;
                }
                if (quantifier > (arguments.length - argumentPointer)) {
                    throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
                }
                for (i = 0; i < quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer]);
                    argumentPointer++;
                }
                break;
            case 's':
            case 'S':
            case 'v':
                // signed short (always 16 bit, machine byte order)
                // unsigned short (always 16 bit, machine byte order)
                // s and S is the same in pack
                if (quantifier === '*') {
                    quantifier = arguments.length - argumentPointer;
                }
                if (quantifier > (arguments.length - argumentPointer)) {
                    throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
                }
                for (i = 0; i < quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
                    result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
                    argumentPointer++;
                }
                break;
            case 'n':
                // unsigned short (always 16 bit, big endian byte order)
                if (quantifier === '*') {
                    quantifier = arguments.length - argumentPointer;
                }
                if (quantifier > (arguments.length - argumentPointer)) {
                    throw new Error('Warning: pack() Type ' + instruction + ': too few arguments');
                }
                for (i = 0; i < quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
                    result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
                    argumentPointer++;
                }
                break;
            case 'i':
            case 'I':
            case 'l':
            case 'L':
            case 'V':
                // signed integer (machine dependent size and byte order)
                // unsigned integer (machine dependent size and byte order)
                // signed long (always 32 bit, machine byte order)
                // unsigned long (always 32 bit, machine byte order)
                // unsigned long (always 32 bit, little endian byte order)
                if (quantifier === '*') {
                    quantifier = arguments.length - argumentPointer;
                }
                if (quantifier > (arguments.length - argumentPointer)) {
                    throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
                }
                for (i = 0; i < quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
                    result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
                    result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF);
                    result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF);
                    argumentPointer++;
                }
                break;
            case 'N':
                // unsigned long (always 32 bit, big endian byte order)
                if (quantifier === '*') {
                    quantifier = arguments.length - argumentPointer;
                }
                if (quantifier > (arguments.length - argumentPointer)) {
                    throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
                }
                for (i = 0; i < quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF);
                    result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF);
                    result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
                    result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
                    argumentPointer++;
                }
                break;
            case 'f':
            case 'd':
                // float (machine dependent size and representation)
                // double (machine dependent size and representation)
                // version based on IEEE754
                precisionBits = 23;
                exponentBits = 8;
                if (instruction === 'd') {
                    precisionBits = 52;
                    exponentBits = 11;
                }
                if (quantifier === '*') {
                    quantifier = arguments.length - argumentPointer;
                }
                if (quantifier > (arguments.length - argumentPointer)) {
                    throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
                }
                for (i = 0; i < quantifier; i++) {
                    argument = arguments[argumentPointer];
                    bias = Math.pow(2, exponentBits - 1) - 1;
                    minExp = -bias + 1;
                    maxExp = bias;
                    minUnnormExp = minExp - precisionBits;
                    status = isNaN(n = parseFloat(argument)) || n === -Infinity || n === +Infinity ? n : 0;
                    exp = 0;
                    len = 2 * bias + 1 + precisionBits + 3;
                    bin = new Array(len);
                    signal = (n = status !== 0 ? 0 : n) < 0;
                    n = Math.abs(n);
                    intPart = Math.floor(n);
                    floatPart = n - intPart;
                    for (k = len; k;) {
                        bin[--k] = 0;
                    }
                    for (k = bias + 2; intPart && k;) {
                        bin[--k] = intPart % 2;
                        intPart = Math.floor(intPart / 2);
                    }
                    for (k = bias + 1; floatPart > 0 && k; --floatPart) {
                        (bin[++k] = ((floatPart *= 2) >= 1) - 0);
                    }
                    for (k = -1; ++k < len && !bin[k];) { }
                    // @todo: Make this more readable:
                    var key = (lastBit = precisionBits - 1 +
                        (k =
                            (exp = bias + 1 - k) >= minExp &&
                                exp <= maxExp ? k + 1 : bias + 1 - (exp = minExp - 1))) + 1;
                    if (bin[key]) {
                        if (!(rounded = bin[lastBit])) {
                            for (j = lastBit + 2; !rounded && j < len; rounded = bin[j++]) { }
                        }
                        for (j = lastBit + 1; rounded && --j >= 0; (bin[j] = !bin[j] - 0) && (rounded = 0)) { }
                    }
                    for (k = k - 2 < 0 ? -1 : k - 3; ++k < len && !bin[k];) { }
                    if ((exp = bias + 1 - k) >= minExp && exp <= maxExp) {
                        ++k;
                    }
                    else {
                        if (exp < minExp) {
                            if (exp !== bias + 1 - len && exp < minUnnormExp) {
                                // "encodeFloat::float underflow"
                            }
                            k = bias + 1 - (exp = minExp - 1);
                        }
                    }
                    if (intPart || status !== 0) {
                        exp = maxExp + 1;
                        k = bias + 2;
                        if (status === -Infinity) {
                            signal = 1;
                        }
                        else if (isNaN(status)) {
                            bin[k] = 1;
                        }
                    }
                    n = Math.abs(exp + bias);
                    tmpResult = '';
                    for (j = exponentBits + 1; --j;) {
                        tmpResult = (n % 2) + tmpResult;
                        n = n >>= 1;
                    }
                    n = 0;
                    j = 0;
                    k = (tmpResult = (signal ? '1' : '0') + tmpResult + (bin
                        .slice(k, k + precisionBits)
                        .join(''))).length;
                    r = [];
                    for (; k;) {
                        n += (1 << j) * tmpResult.charAt(--k);
                        if (j === 7) {
                            r[r.length] = String.fromCharCode(n);
                            n = 0;
                        }
                        j = (j + 1) % 8;
                    }
                    r[r.length] = n ? String.fromCharCode(n) : '';
                    result += r.join('');
                    argumentPointer++;
                }
                break;
            case 'x':
                // NUL byte
                if (quantifier === '*') {
                    throw new Error('Warning: pack(): Type x: \'*\' ignored');
                }
                for (i = 0; i < quantifier; i++) {
                    result += String.fromCharCode(0);
                }
                break;
            case 'X':
                // Back up one byte
                if (quantifier === '*') {
                    throw new Error('Warning: pack(): Type X: \'*\' ignored');
                }
                for (i = 0; i < quantifier; i++) {
                    if (result.length === 0) {
                        throw new Error('Warning: pack(): Type X:' + ' outside of string');
                    }
                    else {
                        result = result.substring(0, result.length - 1);
                    }
                }
                break;
            case '@':
                // NUL-fill to absolute position
                if (quantifier === '*') {
                    throw new Error('Warning: pack(): Type X: \'*\' ignored');
                }
                if (quantifier > result.length) {
                    extraNullCount = quantifier - result.length;
                    for (i = 0; i < extraNullCount; i++) {
                        result += String.fromCharCode(0);
                    }
                }
                if (quantifier < result.length) {
                    result = result.substring(0, quantifier);
                }
                break;
            default:
                throw new Error('Warning: pack() Type ' + instruction + ': unknown format code');
        }
    }
    if (argumentPointer < arguments.length) {
        var msg2 = 'Warning: pack(): ' + (arguments.length - argumentPointer) + ' arguments unused';
        throw new Error(msg2);
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvbWlzYy9wYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsTUFBTTtJQUNwQyw0Q0FBNEM7SUFDNUMseURBQXlEO0lBQ3pELHFFQUFxRTtJQUNyRSx5REFBeUQ7SUFDekQsMkRBQTJEO0lBQzNELHdFQUF3RTtJQUN4RSxrREFBa0Q7SUFDbEQsOERBQThEO0lBQzlELG9FQUFvRTtJQUNwRSxzQ0FBc0M7SUFDdEMsb0RBQW9EO0lBQ3BELDZCQUE2QjtJQUM3QixrQ0FBa0M7SUFDbEMsb0JBQW9CO0lBQ3BCLGdDQUFnQztJQUNoQyxtQkFBbUI7SUFDbkIsbUNBQW1DO0lBQ25DLG1EQUFtRDtJQUNuRCxzQkFBc0I7SUFFdEIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQTtJQUN2QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7SUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQTtJQUU5RSw4QkFBOEI7SUFDOUIsSUFBSSxJQUFJLENBQUE7SUFDUixJQUFJLE1BQU0sQ0FBQTtJQUNWLElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxZQUFZLENBQUE7SUFDaEIsSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxHQUFHLENBQUE7SUFDUCxJQUFJLE1BQU0sQ0FBQTtJQUNWLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxP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