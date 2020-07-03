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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGRpZmZfc3RyaW5nX3BhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3hkaWZmL3hkaWZmX3N0cmluZ19wYXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsa0JBQWtCLENBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUTtJQUMvRSwwREFBMEQ7SUFDMUQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwrRUFBK0U7SUFDL0Usb0NBQW9DO0lBQ3BDLDBEQUEwRDtJQUMxRCxnRkFBZ0Y7SUFDaEYsK0ZBQStGO0lBQy9GLHdFQUF3RTtJQUN4RSw4QkFBOEI7SUFFOUIsbUZBQW1GO0lBQ25GLDZCQUE2QjtJQUM3QixnQ0FBZ0M7SUFDaEMsY0FBYztJQUNkLHdCQUF3QjtJQUV4QixJQUFJLGVBQWUsR0FBRyxVQUFVLEtBQUs7UUFDbkMsb0NBQW9DO1FBQ3BDLE9BQU87WUFDTCxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3pCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDN0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1QixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzNCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDMUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDWixDQUFDLENBQUE7SUFFRCxJQUFJLFFBQVEsR0FBRyxVQUFVLE1BQU0sRUFBRSxHQUFHO1FBQ2xDLDBEQUEwRDtRQUMxRCxJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksTUFBTSxDQUFDLEVBQUU7WUFDNUIsMkRBQTJEO1lBQzNELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtTQUN2RDtRQUNELElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDZixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUE7UUFDckIsSUFBSSxLQUFLLENBQUE7UUFDVCxJQUFJLFVBQVUsQ0FBQTtRQUNkLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQTtRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQ3BCLHlGQUF5RjtRQUN6Rix1RUFBdUU7UUFDdkUsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQzFELElBQUksQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxDQUFDLFFBQVEsR0FBRztnQkFDWCxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07Z0JBQ2hCLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTthQUM5RCxDQUFBO1NBQ0Y7UUFFRCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUM1Qiw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQWEsRUFBRTtnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtnQkFFbEQsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ2hELEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNuRDtnQkFFRCxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFDNUIsYUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUE7Z0JBRTNCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUU7b0JBQzFCLE1BQUs7aUJBQ047YUFDRjtZQUVELElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUMvQixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7YUFDZDtTQUNGO1FBRUQsSUFBSSxhQUFhLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxVQUFVLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7YUFDaEI7U0FDRjthQUFNO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7U0FDdEM7UUFFRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBQ2hFLENBQUMsQ0FBQTtJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNWLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtJQUNuQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDbEIsSUFBSSxRQUFRLEdBQUcsMENBQTBDLENBQUE7SUFDekQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFBO0lBQ3hCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUNoRSxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ2pELElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUE7SUFDZixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUEsQ0FBQyxvREFBb0Q7SUFDcEUsSUFBSSxJQUFJLEdBQUc7UUFDVCwyREFBMkQ7UUFDM0Qsb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLHlCQUF5QixFQUFFLENBQUM7S0FDN0IsQ0FBQTtJQUVELGdDQUFnQztJQUNoQyxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUM3QyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLEtBQUssR0FBRyxvQkFBb0IsQ0FBQTtLQUM3QjtJQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLHdEQUF3RDtRQUN4RCxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN4QixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsc0VBQXNFO1lBQ3RFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNsQixPQUFPLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNuQztTQUNGO1FBQ0QsS0FBSyxHQUFHLE9BQU8sQ0FBQTtLQUNoQjtJQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUNuQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNqQyxJQUFJLE1BQU0sRUFBRTtnQkFDVixXQUFXLEdBQUcsT0FBTyxDQUFBO2dCQUNyQixPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDdkIsT0FBTyxXQUFXLEdBQUcsT0FBTyxFQUFFO29CQUM1QixTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO2lCQUN2RDtnQkFDRCxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDdkQsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQzlCLFFBQVEsU0FBUyxFQUFFO3dCQUNqQixLQUFLLEdBQUc7NEJBQ1IsMkJBQTJCOzRCQUN6QixFQUFFLE9BQU8sQ0FBQTs0QkFDVCxNQUFLO3dCQUNQLEtBQUssR0FBRzs0QkFDTixTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7NEJBQy9DLE1BQUs7d0JBQ1AsS0FBSyxHQUFHOzRCQUNOLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7NEJBQ2xELE1BQUs7d0JBQ1A7NEJBQ0Esd0NBQXdDOzRCQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7cUJBQ3BFO2lCQUNGO2dCQUNELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNaLENBQUMsRUFBRSxDQUFBO2lCQUNKO2FBQ0Y7U0FDRjtRQUNELE9BQU8sT0FBTyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNoRCxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1NBQ25EO0tBQ0Y7U0FBTSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7UUFDM0MseUNBQXlDO1FBQ3pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ2pDLElBQUksTUFBTSxFQUFFO2dCQUNWLFdBQVcsR0FBRyxPQUFPLENBQUE7Z0JBQ3JCLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN2QixPQUFPLFdBQVcsR0FBRyxPQUFPLEVBQUU7b0JBQzVCLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7aUJBQ3ZEO2dCQUNELE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUN2RCxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDOUIsUUFBUSxTQUFTLEVBQUU7d0JBQ2pCLEtBQUssR0FBRzs0QkFDTixTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7NEJBQy9DLE1BQUs7d0JBQ1AsS0FBSyxHQUFHOzRCQUNSLDJCQUEyQjs0QkFDekIsRUFBRSxPQUFPLENBQUE7NEJBQ1QsTUFBSzt3QkFDUCxLQUFLLEdBQUc7NEJBQ04sU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTs0QkFDbEQsTUFBSzt3QkFDUDs0QkFDQSx3Q0FBd0M7NEJBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtxQkFDcEU7aUJBQ0Y7Z0JBQ0QsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ1osQ0FBQyxFQUFFLENBQUE7aUJBQ0o7YUFDRjtTQUNGO1FBQ0QsT0FBTyxPQUFPLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2hELFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7U0FDbkQ7S0FDRjtJQUVELElBQUksUUFBUSxFQUFFO1FBQ1osUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUE7S0FDeEI7SUFFRCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDN0IsQ0FBQyxDQUFBIn0=