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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YXBob25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvbWV0YXBob25lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsSUFBSSxFQUFFLFdBQVc7SUFDcEQsaURBQWlEO0lBQ2pELDRCQUE0QjtJQUM1QixvREFBb0Q7SUFDcEQseURBQXlEO0lBQ3pELGdDQUFnQztJQUNoQyxtQkFBbUI7SUFDbkIsbUNBQW1DO0lBQ25DLHFCQUFxQjtJQUNyQixxQ0FBcUM7SUFDckMsdUJBQXVCO0lBQ3ZCLDBDQUEwQztJQUMxQyx1QkFBdUI7SUFFdkIsSUFBSSxJQUFJLEdBQUcsT0FBTyxJQUFJLENBQUE7SUFFdEIsSUFBSSxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtRQUM5RCxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELGlEQUFpRDtJQUNqRCxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDckIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDZixJQUFJLEdBQUcsS0FBSyxDQUFBO1NBQ2I7YUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLElBQUksR0FBRyxLQUFLLENBQUE7U0FDYjtLQUNGO0lBRUQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUUzQyw0REFBNEQ7SUFDNUQsbUNBQW1DO0lBQ25DLDRCQUE0QjtJQUM1QixJQUFJLEtBQUssR0FBRyw0QkFBNEIsQ0FBQTtJQUN4QyxJQUFJLEtBQUssR0FB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