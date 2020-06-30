module.exports = function xdiff_string_diff(oldData, newData, contextLines, minimal) {
    //  discuss at: https://locutus.io/php/xdiff_string_diff
    // original by: Brett Zamir (https://brett-zamir.me)
    //    based on: Imgen Tata (https://www.myipdf.com/)
    // bugfixed by: Imgen Tata (https://www.myipdf.com/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: The minimal argument is not currently supported
    //   example 1: xdiff_string_diff('', 'Hello world!')
    //   returns 1: '@@ -0,0 +1,1 @@\n+Hello world!'
    // (This code was done by Imgen Tata; I have only reformatted for use in Locutus)
    // See https://en.wikipedia.org/wiki/Diff#Unified_format
    var i = 0;
    var j = 0;
    var k = 0;
    var oriHunkStart;
    var newHunkStart;
    var oriHunkEnd;
    var newHunkEnd;
    var oriHunkLineNo;
    var newHunkLineNo;
    var oriHunkSize;
    var newHunkSize;
    var MAX_CONTEXT_LINES = Number.POSITIVE_INFINITY; // Potential configuration
    var MIN_CONTEXT_LINES = 0;
    var DEFAULT_CONTEXT_LINES = 3;
    var HEADER_PREFIX = '@@ '; //
    var HEADER_SUFFIX = ' @@';
    var ORIGINAL_INDICATOR = '-';
    var NEW_INDICATOR = '+';
    var RANGE_SEPARATOR = ',';
    var CONTEXT_INDICATOR = ' ';
    var DELETION_INDICATOR = '-';
    var ADDITION_INDICATOR = '+';
    var oriLines;
    var newLines;
    var NEW_LINE = '\n';
    var _trim = function (text) {
        if (typeof text !== 'string') {
            throw new Error('String parameter required');
        }
        return text.replace(/(^\s*)|(\s*$)/g, '');
    };
    var _verifyType = function (type) {
        var args = arguments;
        var argsLen = arguments.length;
        var basicTypes = ['number', 'boolean', 'string', 'function', 'object', 'undefined'];
        var basicType;
        var i;
        var j;
        var typeOfType = typeof type;
        if (typeOfType !== 'string' && typeOfType !== 'function') {
            throw new Error('Bad type parameter');
        }
        if (argsLen < 2) {
            throw new Error('Too few arguments');
        }
        if (typeOfType === 'string') {
            type = _trim(type);
            if (type === '') {
                throw new Error('Bad type parameter');
            }
            for (j = 0; j < basicTypes.length; j++) {
                basicType = basicTypes[j];
                if (basicType === type) {
                    for (i = 1; i < argsLen; i++) {
                        if (typeof args[i] !== type) {
                            throw new Error('Bad type');
                        }
                    }
                    return;
                }
            }
            throw new Error('Bad type parameter');
        }
        // Not basic type. we need to use instanceof operator
        for (i = 1; i < argsLen; i++) {
            if (!(args[i] instanceof type)) {
                throw new Error('Bad type');
            }
        }
    };
    var _hasValue = function (array, value) {
        var i;
        _verifyType(Array, array);
        for (i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    };
    var _areTypeOf = function (type) {
        var args = arguments;
        var argsLen = arguments.length;
        var basicTypes = ['number', 'boolean', 'string', 'function', 'object', 'undefined'];
        var basicType;
        var i;
        var j;
        var typeOfType = typeof type;
        if (typeOfType !== 'string' && typeOfType !== 'function') {
            throw new Error('Bad type parameter');
        }
        if (argsLen < 2) {
            throw new Error('Too few arguments');
        }
        if (typeOfType === 'string') {
            type = _trim(type);
            if (type === '') {
                return false;
            }
            for (j = 0; j < basicTypes.length; j++) {
                basicType = basicTypes[j];
                if (basicType === type) {
                    for (i = 1; i < argsLen; i++) {
                        if (typeof args[i] !== type) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            throw new Error('Bad type parameter');
        }
        // Not basic type. we need to use instanceof operator
        for (i = 1; i < argsLen; i++) {
            if (!(args[i] instanceof type)) {
                return false;
            }
        }
        return true;
    };
    var _getInitializedArray = function (arraySize, initValue) {
        var array = [];
        var i;
        _verifyType('number', arraySize);
        for (i = 0; i < arraySize; i++) {
            array.push(initValue);
        }
        return array;
    };
    var _splitIntoLines = function (text) {
        _verifyType('string', text);
        if (text === '') {
            return [];
        }
        return text.split('\n');
    };
    var _isEmptyArray = function (obj) {
        return _areTypeOf(Array, obj) && obj.length === 0;
    };
    /**
     * Finds longest common sequence between two sequences
     * @see {@link https://wordaligned.org/articles/longest-common-subsequence}
     */
    var _findLongestCommonSequence = function (seq1, seq2, seq1IsInLcs, seq2IsInLcs) {
        if (!_areTypeOf(Array, seq1, seq2)) {
            throw new Error('Array parameters are required');
        }
        // Deal with edge case
        if (_isEmptyArray(seq1) || _isEmptyArray(seq2)) {
            return [];
        }
        // Function to calculate lcs lengths
        var lcsLens = function (xs, ys) {
            var i;
            var j;
            var prev;
            var curr = _getInitializedArray(ys.length + 1, 0);
            for (i = 0; i < xs.length; i++) {
                prev = curr.slice(0);
                for (j = 0; j < ys.length; j++) {
                    if (xs[i] === ys[j]) {
                        curr[j + 1] = prev[j] + 1;
                    }
                    else {
                        curr[j + 1] = Math.max(curr[j], prev[j + 1]);
                    }
                }
            }
            return curr;
        };
        // Function to find lcs and fill in the array to indicate the optimal longest common sequence
        var _findLcs = function (xs, xidx, xIsIn, ys) {
            var i;
            var xb;
            var xe;
            var llB;
            var llE;
            var pivot;
            var max;
            var yb;
            var ye;
            var nx = xs.length;
            var ny = ys.length;
            if (nx === 0) {
                return [];
            }
            if (nx === 1) {
                if (_hasValue(ys, xs[0])) {
                    xIsIn[xidx] = true;
                    return [xs[0]];
                }
                return [];
            }
            i = Math.floor(nx / 2);
            xb = xs.slice(0, i);
            xe = xs.slice(i);
            llB = lcsLens(xb, ys);
            llE = lcsLens(xe.slice(0)
                .reverse(), ys.slice(0)
                .reverse());
            pivot = 0;
            max = 0;
            for (j = 0; j <= ny; j++) {
                if (llB[j] + llE[ny - j] > max) {
                    pivot = j;
                    max = llB[j] + llE[ny - j];
                }
            }
            yb = ys.slice(0, pivot);
            ye = ys.slice(pivot);
            return _findLcs(xb, xidx, xIsIn, yb).concat(_findLcs(xe, xidx + i, xIsIn, ye));
        };
        // Fill in seq1IsInLcs to find the optimal longest common subsequence of first sequence
        _findLcs(seq1, 0, seq1IsInLcs, seq2);
        // Fill in seq2IsInLcs to find the optimal longest common subsequence
        // of second sequence and return the result
        return _findLcs(seq2, 0, seq2IsInLcs, seq1);
    };
    // First, check the parameters
    if (_areTypeOf('string', oldData, newData) === false) {
        return false;
    }
    if (oldData === newData) {
        return '';
    }
    if (typeof contextLines !== 'number' ||
        contextLines > MAX_CONTEXT_LINES ||
        contextLines < MIN_CONTEXT_LINES) {
        contextLines = DEFAULT_CONTEXT_LINES;
    }
    oriLines = _splitIntoLines(oldData);
    newLines = _splitIntoLines(newData);
    var oriLen = oriLines.length;
    var newLen = newLines.length;
    var oriIsInLcs = _getInitializedArray(oriLen, false);
    var newIsInLcs = _getInitializedArray(newLen, false);
    var lcsLen = _findLongestCommonSequence(oriLines, newLines, oriIsInLcs, newIsInLcs).length;
    var unidiff = '';
    if (lcsLen === 0) {
        // No common sequence
        unidiff = [
            HEADER_PREFIX,
            ORIGINAL_INDICATOR,
            (oriLen > 0 ? '1' : '0'),
            RANGE_SEPARATOR,
            oriLen,
            ' ',
            NEW_INDICATOR,
            (newLen > 0 ? '1' : '0'),
            RANGE_SEPARATOR,
            newLen,
            HEADER_SUFFIX
        ].join('');
        for (i = 0; i < oriLen; i++) {
            unidiff += NEW_LINE + DELETION_INDICATOR + oriLines[i];
        }
        for (j = 0; j < newLen; j++) {
            unidiff += NEW_LINE + ADDITION_INDICATOR + newLines[j];
        }
        return unidiff;
    }
    var leadingContext = [];
    var trailingContext = [];
    var actualLeadingContext = [];
    var actualTrailingContext = [];
    // Regularize leading context by the contextLines parameter
    var regularizeLeadingContext = function (context) {
        if (context.length === 0 || contextLines === 0) {
            return [];
        }
        var contextStartPos = Math.max(context.length - contextLines, 0);
        return context.slice(contextStartPos);
    };
    // Regularize trailing context by the contextLines parameter
    var regularizeTrailingContext = function (context) {
        if (context.length === 0 || contextLines === 0) {
            return [];
        }
        return context.slice(0, Math.min(contextLines, context.length));
    };
    // Skip common lines in the beginning
    while (i < oriLen && oriIsInLcs[i] === true && newIsInLcs[i] === true) {
        leadingContext.push(oriLines[i]);
        i++;
    }
    j = i;
    // The index in the longest common sequence
    k = i;
    oriHunkStart = i;
    newHunkStart = j;
    oriHunkEnd = i;
    newHunkEnd = j;
    while (i < oriLen || j < newLen) {
        while (i < oriLen && oriIsInLcs[i] === false) {
            i++;
        }
        oriHunkEnd = i;
        while (j < newLen && newIsInLcs[j] === false) {
            j++;
        }
        newHunkEnd = j;
        // Find the trailing context
        trailingContext = [];
        while (i < oriLen && oriIsInLcs[i] === true && j < newLen && newIsInLcs[j] === true) {
            trailingContext.push(oriLines[i]);
            k++;
            i++;
            j++;
        }
        if (k >= lcsLen || // No more in longest common lines
            trailingContext.length >= 2 * contextLines) {
            // Context break found
            if (trailingContext.length < 2 * contextLines) {
                // It must be last block of common lines but not a context break
                trailingContext = [];
                // Force break out
                i = oriLen;
                j = newLen;
                // Update hunk ends to force output to the end
                oriHunkEnd = oriLen;
                newHunkEnd = newLen;
            }
            // Output the diff hunk
            // Trim the leading and trailing context block
            actualLeadingContext = regularizeLeadingContext(leadingContext);
            actualTrailingContext = regularizeTrailingContext(trailingContext);
            oriHunkStart -= actualLeadingContext.length;
            newHunkStart -= actualLeadingContext.length;
            oriHunkEnd += actualTrailingContext.length;
            newHunkEnd += actualTrailingContext.length;
            oriHunkLineNo = oriHunkStart + 1;
            newHunkLineNo = newHunkStart + 1;
            oriHunkSize = oriHunkEnd - oriHunkStart;
            newHunkSize = newHunkEnd - newHunkStart;
            // Build header
            unidiff += [
                HEADER_PREFIX,
                ORIGINAL_INDICATOR,
                oriHunkLineNo,
                RANGE_SEPARATOR,
                oriHunkSize,
                ' ',
                NEW_INDICATOR,
                newHunkLineNo,
                RANGE_SEPARATOR,
                newHunkSize,
                HEADER_SUFFIX,
                NEW_LINE
            ].join('');
            // Build the diff hunk content
            while (oriHunkStart < oriHunkEnd || newHunkStart < newHunkEnd) {
                if (oriHunkStart < oriHunkEnd &&
                    oriIsInLcs[oriHunkStart] === true &&
                    newIsInLcs[newHunkStart] === true) {
                    // The context line
                    unidiff += CONTEXT_INDICATOR + oriLines[oriHunkStart] + NEW_LINE;
                    oriHunkStart++;
                    newHunkStart++;
                }
                else if (oriHunkStart < oriHunkEnd && oriIsInLcs[oriHunkStart] === false) {
                    // The deletion line
                    unidiff += DELETION_INDICATOR + oriLines[oriHunkStart] + NEW_LINE;
                    oriHunkStart++;
                }
                else if (newHunkStart < newHunkEnd && newIsInLcs[newHunkStart] === false) {
                    // The additional line
                    unidiff += ADDITION_INDICATOR + newLines[newHunkStart] + NEW_LINE;
                    newHunkStart++;
                }
            }
            // Update hunk position and leading context
            oriHunkStart = i;
            newHunkStart = j;
            leadingContext = trailingContext;
        }
    }
    // Trim the trailing new line if it exists
    if (unidiff.length > 0 && unidiff.charAt(unidiff.length) === NEW_LINE) {
        unidiff = unidiff.slice(0, -1);
    }
    return unidiff;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGRpZmZfc3RyaW5nX2RpZmYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3hkaWZmL3hkaWZmX3N0cmluZ19kaWZmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxpQkFBaUIsQ0FBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPO0lBQ2xGLHdEQUF3RDtJQUN4RCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsK0RBQStEO0lBQy9ELHFEQUFxRDtJQUNyRCxnREFBZ0Q7SUFFaEQsaUZBQWlGO0lBRWpGLHdEQUF3RDtJQUN4RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLFlBQVksQ0FBQTtJQUNoQixJQUFJLFlBQVksQ0FBQTtJQUNoQixJQUFJLFVBQVUsQ0FBQTtJQUNkLElBQUksVUFBVSxDQUFBO0lBQ2QsSUFBSSxhQUFhLENBQUE7SUFDakIsSUFBSSxhQUFhLENBQUE7SUFDakIsSUFBSSxXQUFXLENBQUE7SUFDZixJQUFJLFdBQVcsQ0FBQTtJQUNmLElBQUksaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFBLENBQUMsMEJBQTBCO0lBQzNFLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFBO0lBQ3pCLElBQUkscUJBQXFCLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQSxDQUFDLEVBQUU7SUFDNUIsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFBO0lBQ3pCLElBQUksa0JBQWtCLEdBQUcsR0FBRyxDQUFBO0lBQzVCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQTtJQUN2QixJQUFJLGVBQWUsR0FBRyxHQUFH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