module.exports = function metaphone(word, maxPhonemes) {
    //  discuss at: https://locutus.io/php/metaphone/
    // original by: Greg Frazier
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    //   example 1: metaphone('Gnu')
    //   returns 1: 'N'
    //   example 2: metaphone('bigger')
    //   returns 2: 'BKR'
    //   example 3: metaphone('accuracy')
    //   returns 3: 'AKKRS'
    //   example 4: metaphone('batch batcher')
    //   returns 4: 'BXBXR'
    var type = typeof word;
    if (type === 'undefined' || type === 'object' && word !== null) {
        // weird!
        return null;
    }
    // infinity and NaN values are treated as strings
    if (type === 'number') {
        if (isNaN(word)) {
            word = 'NAN';
        }
        else if (!isFinite(word)) {
            word = 'INF';
        }
    }
    if (maxPhonemes < 0) {
        return false;
    }
    maxPhonemes = Math.floor(+maxPhonemes) || 0;
    // alpha depends on locale, so this var might need an update
    // or should be turned into a regex
    // for now assuming pure a-z
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var vowel = 'AEIOU';
    var soft = 'EIY';
    var leadingNonAlpha = new RegExp('^[^' + alpha + ']+');
    word = typeof word === 'string' ? word : '';
    word = word.toUpperCase().replace(leadingNonAlpha, '');
    if (!word) {
        return '';
    }
    var is = function (p, c) {
        return c !== '' && p.indexOf(c) !== -1;
    };
    var i = 0;
    var cc = word.charAt(0); // current char. Short name because it's used all over the function
    var nc = word.charAt(1); // next char
    var nnc; // after next char
    var pc; // previous char
    var l = word.length;
    var meta = '';
    // traditional is an internal param that could be exposed for now let it be a local var
    var traditional = true;
    switch (cc) {
        case 'A':
            meta += nc === 'E' ? nc : cc;
            i += 1;
            break;
        case 'G':
        case 'K':
        case 'P':
            if (nc === 'N') {
                meta += nc;
                i += 2;
            }
            break;
        case 'W':
            if (nc === 'R') {
                meta += nc;
                i += 2;
            }
            else if (nc === 'H' || is(vowel, nc)) {
                meta += 'W';
                i += 2;
            }
            break;
        case 'X':
            meta += 'S';
            i += 1;
            break;
        case 'E':
        case 'I':
        case 'O':
        case 'U':
            meta += cc;
            i++;
            break;
    }
    for (; i < l && (maxPhonemes === 0 || meta.length < maxPhonemes); i += 1) { // eslint-disable-line no-unmodified-loop-condition,max-len
        cc = word.charAt(i);
        nc = word.charAt(i + 1);
        pc = word.charAt(i - 1);
        nnc = word.charAt(i + 2);
        if (cc === pc && cc !== 'C') {
            continue;
        }
        switch (cc) {
            case 'B':
                if (pc !== 'M') {
                    meta += cc;
                }
                break;
            case 'C':
                if (is(soft, nc)) {
                    if (nc === 'I' && nnc === 'A') {
                        meta += 'X';
                    }
                    else if (pc !== 'S') {
                        meta += 'S';
                    }
                }
                else if (nc === 'H') {
                    meta += !traditional && (nnc === 'R' || pc === 'S') ? 'K' : 'X';
                    i += 1;
                }
                else {
                    meta += 'K';
                }
                break;
            case 'D':
                if (nc === 'G' && is(soft, nnc)) {
                    meta += 'J';
                    i += 1;
                }
                else {
                    meta += 'T';
                }
                break;
            case 'G':
                if (nc === 'H') {
                    if (!(is('BDH', word.charAt(i - 3)) || word.charAt(i - 4) === 'H')) {
                        meta += 'F';
                        i += 1;
                    }
                }
                else if (nc === 'N') {
                    if (is(alpha, nnc) && word.substr(i + 1, 3) !== 'NED') {
                        meta += 'K';
                    }
                }
                else if (is(soft, nc) && pc !== 'G') {
                    meta += 'J';
                }
                else {
                    meta += 'K';
                }
                break;
            case 'H':
                if (is(vowel, nc) && !is('CGPST', pc)) {
                    meta += cc;
                }
                break;
            case 'K':
                if (pc !== 'C') {
                    meta += 'K';
                }
                break;
            case 'P':
                meta += nc === 'H' ? 'F' : cc;
                break;
            case 'Q':
                meta += 'K';
                break;
            case 'S':
                if (nc === 'I' && is('AO', nnc)) {
                    meta += 'X';
                }
                else if (nc === 'H') {
                    meta += 'X';
                    i += 1;
                }
                else if (!traditional && word.substr(i + 1, 3) === 'CHW') {
                    meta += 'X';
                    i += 2;
                }
                else {
                    meta += 'S';
                }
                break;
            case 'T':
                if (nc === 'I' && is('AO', nnc)) {
                    meta += 'X';
                }
                else if (nc === 'H') {
                    meta += '0';
                    i += 1;
                }
                else if (word.substr(i + 1, 2) !== 'CH') {
                    meta += 'T';
                }
                break;
            case 'V':
                meta += 'F';
                break;
            case 'W':
            case 'Y':
                if (is(vowel, nc)) {
                    meta += cc;
                }
                break;
            case 'X':
                meta += 'KS';
                break;
            case 'Z':
                meta += 'S';
                break;
            case 'F':
            case 'J':
            case 'L':
            case 'M':
            case 'N':
            case 'R':
                meta += cc;
                break;
        }
    }
    return meta;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YXBob25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL21ldGFwaG9uZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLElBQUksRUFBRSxXQUFXO0lBQ3BELGlEQUFpRDtJQUNqRCw0QkFBNEI7SUFDNUIsb0RBQW9EO0lBQ3BELHlEQUF5RDtJQUN6RCxnQ0FBZ0M7SUFDaEMsbUJBQW1CO0lBQ25CLG1DQUFtQztJQUNuQyxxQkFBcUI7SUFDckIscUNBQXFDO0lBQ3JDLHVCQUF1QjtJQUN2QiwwQ0FBMEM7SUFDMUMsdUJBQXVCO0lBRXZCLElBQUksSUFBSSxHQUFHLE9BQU8sSUFBSSxDQUFBO0lBRXRCLElBQUksSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7UUFDOUQsU0FBUztRQUNULE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxpREFBaUQ7SUFDakQsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3JCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2YsSUFBSSxHQUFHLEtBQUssQ0FBQTtTQUNiO2FBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLEdBQUcsS0FBSyxDQUFBO1NBQ2I7S0FDRjtJQUVELElBQUksV0FBVyxHQUFHLENBQUMsRUFBRTtRQUNuQixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFM0MsNERBQTREO0lBQzVELG1DQUFtQztJQUNuQyw0QkFBNEI7SUFDNUIsSUFBSSxLQUFLLEdBQUcsNEJBQTRCLENBQUE7SUFDeEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxD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