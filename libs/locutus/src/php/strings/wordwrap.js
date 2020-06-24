module.exports = function wordwrap(str, intWidth, strBreak, cut) {
    //  discuss at: https://locutus.io/php/wordwrap/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // improved by: Nick Callen
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Sakimori
    //  revised by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // bugfixed by: Michael Grier
    // bugfixed by: Feras ALHAEK
    // improved by: Rafał Kukawski (https://kukawski.net)
    //   example 1: wordwrap('Kevin van Zonneveld', 6, '|', true)
    //   returns 1: 'Kevin|van|Zonnev|eld'
    //   example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n')
    //   returns 2: 'The quick brown fox<br />\njumped over the lazy<br />\ndog.'
    //   example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
    //   returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\ncommodo consequat.'
    intWidth = arguments.length >= 2 ? +intWidth : 75;
    strBreak = arguments.length >= 3 ? '' + strBreak : '\n';
    cut = arguments.length >= 4 ? !!cut : false;
    var i, j, line;
    str += '';
    if (intWidth < 1) {
        return str;
    }
    var reLineBreaks = /\r\n|\n|\r/;
    var reBeginningUntilFirstWhitespace = /^\S*/;
    var reLastCharsWithOptionalTrailingWhitespace = /\S*(\s)?$/;
    var lines = str.split(reLineBreaks);
    var l = lines.length;
    var match;
    // for each line of text
    for (i = 0; i < l; lines[i++] += line) {
        line = lines[i];
        lines[i] = '';
        while (line.length > intWidth) {
            // get slice of length one char above limit
            var slice = line.slice(0, intWidth + 1);
            // remove leading whitespace from rest of line to parse
            var ltrim = 0;
            // remove trailing whitespace from new line content
            var rtrim = 0;
            match = slice.match(reLastCharsWithOptionalTrailingWhitespace);
            // if the slice ends with whitespace
            if (match[1]) {
                // then perfect moment to cut the line
                j = intWidth;
                ltrim = 1;
            }
            else {
                // otherwise cut at previous whitespace
                j = slice.length - match[0].length;
                if (j) {
                    rtrim = 1;
                }
                // but if there is no previous whitespace
                // and cut is forced
                // cut just at the defined limit
                if (!j && cut && intWidth) {
                    j = intWidth;
                }
                // if cut wasn't forced
                // cut at next possible whitespace after the limit
                if (!j) {
                    var charsUntilNextWhitespace = (line.slice(intWidth).match(reBeginningUntilFirstWhitespace) || [''])[0];
                    j = slice.length + charsUntilNextWhitespace.length;
                }
            }
            lines[i] += line.slice(0, j - rtrim);
            line = line.slice(j + ltrim);
            lines[i] += line.length ? strBreak : '';
        }
    }
    return lines.join('\n');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZHdyYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvd29yZHdyYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHO0lBQzlELGdEQUFnRDtJQUNoRCxxRUFBcUU7SUFDckUsMkJBQTJCO0lBQzNCLG9EQUFvRDtJQUNwRCx3QkFBd0I7SUFDeEIscUVBQXFFO0lBQ3JFLDZCQUE2QjtJQUM3Qiw0QkFBNEI7SUFDNUIscURBQXFEO0lBQ3JELDZEQUE2RDtJQUM3RCxzQ0FBc0M7SUFDdEMseUZBQXlGO0lBQ3pGLDZFQUE2RTtJQUM3RSxvUUFBb1E7SUFDcFEsNlBBQTZQO0lBRTdQLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNqRCxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUN2RCxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtJQUUzQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFBO0lBRWQsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVULElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtRQUNoQixPQUFPLEdBQUcsQ0FBQTtLQUNYO0lBRUQsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFBO0lBQy9CLElBQUksK0JBQStCLEdBQUcsTUFBTSxDQUFBO0lBQzVDLElBQUkseUNBQXlDLEdBQUcs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