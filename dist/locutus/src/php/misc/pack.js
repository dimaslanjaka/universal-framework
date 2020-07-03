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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9taXNjL3BhY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBRSxNQUFNO0lBQ3BDLDRDQUE0QztJQUM1Qyx5REFBeUQ7SUFDekQscUVBQXFFO0lBQ3JFLHlEQUF5RDtJQUN6RCwyREFBMkQ7SUFDM0Qsd0VBQXdFO0lBQ3hFLGtEQUFrRDtJQUNsRCw4REFBOEQ7SUFDOUQsb0VBQW9FO0lBQ3BFLHNDQUFzQztJQUN0QyxvREFBb0Q7SUFDcEQsNkJBQTZCO0lBQzdCLGtDQUFrQztJQUNsQyxvQkFBb0I7SUFDcEIsZ0NBQWdDO0lBQ2hDLG1CQUFtQjtJQUNuQixtQ0FBbUM7SUFDbkMsbURBQW1EO0lBQ25ELHNCQUFzQjtJQUV0QixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUE7SUFDckIsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixJQUFJLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFBO0lBRTlFLDhCQUE4QjtJQUM5QixJQUFJLElBQUksQ0FBQTtJQUNSLElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLFlBQVksQ0FBQTtJQUNoQixJQUFJLE1BQU0sQ0FBQTtJQUNWLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxHQUFHLENBQUE7SUFDUCxJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxDQUFDLENBQUE7SUFD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