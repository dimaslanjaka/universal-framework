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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGRpZmZfc3RyaW5nX2RpZmYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAveGRpZmYveGRpZmZfc3RyaW5nX2RpZmYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGlCQUFpQixDQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU87SUFDbEYsd0RBQXdEO0lBQ3hELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwrREFBK0Q7SUFDL0QscURBQXFEO0lBQ3JELGdEQUFnRDtJQUVoRCxpRkFBaUY7SUFFakYsd0RBQXdEO0lBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksWUFBWSxDQUFBO0lBQ2hCLElBQUksWUFBWSxDQUFBO0lBQ2hCLElBQUksVUFBVSxDQUFBO0lBQ2QsSUFBSSxVQUFVLENBQUE7SUFDZCxJQUFJLGFBQWEsQ0FBQTtJQUNqQixJQUFJLGFBQWEsQ0FBQTtJQUNqQixJQUFJLFdBQVcsQ0FBQTtJQUNmLElBQUksV0FBVyxDQUFBO0lBQ2YsSUFBSSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUEsQ0FBQywwQkFBMEI7SUFDM0UsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUE7SUFDekIsSUFBSSxxQkFBcUIsR0FBRyxDQUFDLENBQUE7SUFDN0IsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFBLENBQUMsRUFBRTtJQUM1QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUE7SUFDekIsSUFBSSxrQkFBa0IsR0FBRyxHQUFHLENBQUE7SUFDNUIsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFBO0lBQ3ZCLElBQUksZUFB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