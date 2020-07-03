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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZHdyYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy93b3Jkd3JhcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUc7SUFDOUQsZ0RBQWdEO0lBQ2hELHFFQUFxRTtJQUNyRSwyQkFBMkI7SUFDM0Isb0RBQW9EO0lBQ3BELHdCQUF3QjtJQUN4QixxRUFBcUU7SUFDckUsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1QixxREFBcUQ7SUFDckQsNkRBQTZEO0lBQzdELHNDQUFzQztJQUN0Qyx5RkFBeUY7SUFDekYsNkVBQTZFO0lBQzdFLG9RQUFvUTtJQUNwUSw2UEFBNlA7SUFFN1AsUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBQ2pELFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQ3ZELEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0lBRTNDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUE7SUFFZCxHQUFHLElBQUksRUFBRSxDQUFBO0lBRVQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sR0FBRyxDQUFBO0tBQ1g7SUFFRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUE7SUFDL0IsSUFBSSwrQkFBK0IsR0FBRyxNQUFNLENBQUE7SUFDNUMsSUFBSSx5Q0FB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