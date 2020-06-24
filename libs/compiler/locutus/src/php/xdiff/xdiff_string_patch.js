module.exports = function xdiff_string_patch(originalStr, patch, flags, errorObj) {
    //  discuss at: https://locutus.io/php/xdiff_string_patch/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Steven Levithan (stevenlevithan.com)
    //      note 1: The XDIFF_PATCH_IGNORESPACE flag and the error argument are not
    //      note 1: currently supported.
    //      note 2: This has not been tested exhaustively yet.
    //      note 3: The errorObj parameter (optional) if used must be passed in as a
    //      note 3: object. The errors will then be written by reference into it's `value` property
    //   example 1: xdiff_string_patch('', '@@ -0,0 +1,1 @@\n+Hello world!')
    //   returns 1: 'Hello world!'
    // First two functions were adapted from Steven Levithan, also under an MIT license
    // Adapted from XRegExp 1.5.0
    // (c) 2007-2010 Steven Levithan
    // MIT License
    // <https://xregexp.com>
    var _getNativeFlags = function (regex) {
        // Proposed for ES4; included in AS3
        return [
            (regex.global ? 'g' : ''),
            (regex.ignoreCase ? 'i' : ''),
            (regex.multiline ? 'm' : ''),
            (regex.extended ? 'x' : ''),
            (regex.sticky ? 'y' : '')
        ].join('');
    };
    var _cbSplit = function (string, sep) {
        // If separator `s` is not a regex, use the native `split`
        if (!(sep instanceof RegExp)) {
            // Had problems to get it to work here using prototype test
            return String.prototype.split.apply(string, arguments);
        }
        var str = String(string);
        var output = [];
        var lastLastIndex = 0;
        var match;
        var lastLength;
        var limit = Infinity;
        var x = sep._xregexp;
        // This is required if not `s.global`, and it avoids needing to set `s.lastIndex` to zero
        // and restore it to its original value when we're done using the regex
        // Brett paring down
        var s = new RegExp(sep.source, _getNativeFlags(sep) + 'g');
        if (x) {
            s._xregexp = {
                source: x.source,
                captureNames: x.captureNames ? x.captureNames.slice(0) : null
            };
        }
        while ((match = s.exec(str))) {
            // Run the altered `exec` (required for `lastIndex` fix, etc.)
            if (s.lastIndex > lastLastIndex) {
                output.push(str.slice(lastLastIndex, match.index));
                if (match.length > 1 && match.index < str.length) {
                    Array.prototype.push.apply(output, match.slice(1));
                }
                lastLength = match[0].length;
                lastLastIndex = s.lastIndex;
                if (output.length >= limit) {
                    break;
                }
            }
            if (s.lastIndex === match.index) {
                s.lastIndex++;
            }
        }
        if (lastLastIndex === str.length) {
            if (!s.test('') || lastLength) {
                output.push('');
            }
        }
        else {
            output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
    };
    var i = 0;
    var ll = 0;
    var ranges = [];
    var lastLinePos = 0;
    var firstChar = '';
    var rangeExp = /^@@\s+-(\d+),(\d+)\s+\+(\d+),(\d+)\s+@@$/;
    var lineBreaks = /\r?\n/;
    var lines = _cbSplit(patch.replace(/(\r?\n)+$/, ''), lineBreaks);
    var origLines = _cbSplit(originalStr, lineBreaks);
    var newStrArr = [];
    var linePos = 0;
    var errors = '';
    var optTemp = 0; // Both string & integer (constant) input is allowed
    var OPTS = {
        // Unsure of actual PHP values, so better to rely on string
        'XDIFF_PATCH_NORMAL': 1,
        'XDIFF_PATCH_REVERSE': 2,
        'XDIFF_PATCH_IGNORESPACE': 4
    };
    // Input defaulting & sanitation
    if (typeof originalStr !== 'string' || !patch) {
        return false;
    }
    if (!flags) {
        flags = 'XDIFF_PATCH_NORMAL';
    }
    if (typeof flags !== 'number') {
        // Allow for a single string or an array of string flags
        flags = [].concat(flags);
        for (i = 0; i < flags.length; i++) {
            // Resolve string input to bitwise e.g. 'XDIFF_PATCH_NORMAL' becomes 1
            if (OPTS[flags[i]]) {
                optTemp = optTemp | OPTS[flags[i]];
            }
        }
        flags = optTemp;
    }
    if (flags & OPTS.XDIFF_PATCH_NORMAL) {
        for (i = 0, ll = lines.length; i < ll; i++) {
            ranges = lines[i].match(rangeExp);
            if (ranges) {
                lastLinePos = linePos;
                linePos = ranges[1] - 1;
                while (lastLinePos < linePos) {
                    newStrArr[newStrArr.length] = origLines[lastLinePos++];
                }
                while (lines[++i] && (rangeExp.exec(lines[i])) === null) {
                    firstChar = lines[i].charAt(0);
                    switch (firstChar) {
                        case '-':
                            // Skip including that line
                            ++linePos;
                            break;
                        case '+':
                            newStrArr[newStrArr.length] = lines[i].slice(1);
                            break;
                        case ' ':
                            newStrArr[newStrArr.length] = origLines[linePos++];
                            break;
                        default:
                            // Reconcile with returning errrors arg?
                            throw new Error('Unrecognized initial character in unidiff line');
                    }
                }
                if (lines[i]) {
                    i--;
                }
            }
        }
        while (linePos > 0 && linePos < origLines.length) {
            newStrArr[newStrArr.length] = origLines[linePos++];
        }
    }
    else if (flags & OPTS.XDIFF_PATCH_REVERSE) {
        // Only differs from above by a few lines
        for (i = 0, ll = lines.length; i < ll; i++) {
            ranges = lines[i].match(rangeExp);
            if (ranges) {
                lastLinePos = linePos;
                linePos = ranges[3] - 1;
                while (lastLinePos < linePos) {
                    newStrArr[newStrArr.length] = origLines[lastLinePos++];
                }
                while (lines[++i] && (rangeExp.exec(lines[i])) === null) {
                    firstChar = lines[i].charAt(0);
                    switch (firstChar) {
                        case '-':
                            newStrArr[newStrArr.length] = lines[i].slice(1);
                            break;
                        case '+':
                            // Skip including that line
                            ++linePos;
                            break;
                        case ' ':
                            newStrArr[newStrArr.length] = origLines[linePos++];
                            break;
                        default:
                            // Reconcile with returning errrors arg?
                            throw new Error('Unrecognized initial character in unidiff line');
                    }
                }
                if (lines[i]) {
                    i--;
                }
            }
        }
        while (linePos > 0 && linePos < origLines.length) {
            newStrArr[newStrArr.length] = origLines[linePos++];
        }
    }
    if (errorObj) {
        errorObj.value = errors;
    }
    return newStrArr.join('\n');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGRpZmZfc3RyaW5nX3BhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC94ZGlmZi94ZGlmZl9zdHJpbmdfcGF0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGtCQUFrQixDQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVE7SUFDL0UsMERBQTBEO0lBQzFELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsK0VBQStFO0lBQy9FLG9DQUFvQztJQUNwQywwREFBMEQ7SUFDMUQsZ0ZBQWdGO0lBQ2hGLCtGQUErRjtJQUMvRix3RUFBd0U7SUFDeEUsOEJBQThCO0lBRTlCLG1GQUFtRjtJQUNuRiw2QkFBNkI7SUFDN0IsZ0NBQWdDO0lBQ2hDLGNBQWM7SUFDZCx3QkFBd0I7SUFFeEIsSUFBSSxlQUFlLEdBQUcsVUFBVSxLQUFLO1FBQ25DLG9DQUFvQztRQUNwQyxPQUFPO1lBQ0wsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN6QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMzQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzFCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ1osQ0FBQyxDQUFBO0lBRUQsSUFBSSxR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