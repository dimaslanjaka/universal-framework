module.exports = function pathinfo(path, options) {
    //  discuss at: https://locutus.io/php/pathinfo/
    // original by: Nate
    //  revised by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Dmitry Gorelenkov
    //    input by: Timo
    //      note 1: Inspired by actual PHP source: php5-5.2.6/ext/standard/string.c line #1559
    //      note 1: The way the bitwise arguments are handled allows for greater flexibility
    //      note 1: & compatability. We might even standardize this
    //      note 1: code and use a similar approach for
    //      note 1: other bitwise PHP functions
    //      note 1: Locutus tries very hard to stay away from a core.js
    //      note 1: file with global dependencies, because we like
    //      note 1: that you can just take a couple of functions and be on your way.
    //      note 1: But by way we implemented this function,
    //      note 1: if you want you can still declare the PATHINFO_*
    //      note 1: yourself, and then you can use:
    //      note 1: pathinfo('/www/index.html', PATHINFO_BASENAME | PATHINFO_EXTENSION);
    //      note 1: which makes it fully compliant with PHP syntax.
    //   example 1: pathinfo('/www/htdocs/index.html', 1)
    //   returns 1: '/www/htdocs'
    //   example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME')
    //   returns 2: 'index.html'
    //   example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION')
    //   returns 3: 'html'
    //   example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME')
    //   returns 4: 'index'
    //   example 5: pathinfo('/www/htdocs/index.html', 2 | 4)
    //   returns 5: {basename: 'index.html', extension: 'html'}
    //   example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL')
    //   returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
    //   example 7: pathinfo('/www/htdocs/index.html')
    //   returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
    var basename = require('../filesystem/basename');
    var opt = '';
    var realOpt = '';
    var optName = '';
    var optTemp = 0;
    var tmpArr = {};
    var cnt = 0;
    var i = 0;
    var haveBasename = false;
    var haveExtension = false;
    var haveFilename = false;
    // Input defaulting & sanitation
    if (!path) {
        return false;
    }
    if (!options) {
        options = 'PATHINFO_ALL';
    }
    // Initialize binary arguments. Both the string & integer (constant) input is
    // allowed
    var OPTS = {
        'PATHINFO_DIRNAME': 1,
        'PATHINFO_BASENAME': 2,
        'PATHINFO_EXTENSION': 4,
        'PATHINFO_FILENAME': 8,
        'PATHINFO_ALL': 0
    };
    // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
    for (optName in OPTS) {
        if (OPTS.hasOwnProperty(optName)) {
            OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName];
        }
    }
    if (typeof options !== 'number') {
        // Allow for a single string or an array of string flags
        options = [].concat(options);
        for (i = 0; i < options.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
            if (OPTS[options[i]]) {
                optTemp = optTemp | OPTS[options[i]];
            }
        }
        options = optTemp;
    }
    // Internal Functions
    var _getExt = function (path) {
        var str = path + '';
        var dotP = str.lastIndexOf('.') + 1;
        return !dotP ? false : dotP !== str.length ? str.substr(dotP) : '';
    };
    // Gather path infos
    if (options & OPTS.PATHINFO_DIRNAME) {
        var dirName = path
            .replace(/\\/g, '/')
            .replace(/\/[^/]*\/?$/, ''); // dirname
        tmpArr.dirname = dirName === path ? '.' : dirName;
    }
    if (options & OPTS.PATHINFO_BASENAME) {
        if (haveBasename === false) {
            haveBasename = basename(path);
        }
        tmpArr.basename = haveBasename;
    }
    if (options & OPTS.PATHINFO_EXTENSION) {
        if (haveBasename === false) {
            haveBasename = basename(path);
        }
        if (haveExtension === false) {
            haveExtension = _getExt(haveBasename);
        }
        if (haveExtension !== false) {
            tmpArr.extension = haveExtension;
        }
    }
    if (options & OPTS.PATHINFO_FILENAME) {
        if (haveBasename === false) {
            haveBasename = basename(path);
        }
        if (haveExtension === false) {
            haveExtension = _getExt(haveBasename);
        }
        if (haveFilename === false) {
            haveFilename = haveBasename.slice(0, haveBasename.length - (haveExtension
                ? haveExtension.length + 1
                : haveExtension === false
                    ? 0
                    : 1));
        }
        tmpArr.filename = haveFilename;
    }
    // If array contains only 1 element: return string
    cnt = 0;
    for (opt in tmpArr) {
        if (tmpArr.hasOwnProperty(opt)) {
            cnt++;
            realOpt = opt;
        }
    }
    if (cnt === 1) {
        return tmpArr[realOpt];
    }
    // Return full-blown array
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aGluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZmlsZXN5c3RlbS9wYXRoaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLElBQUksRUFBRSxPQUFPO0lBQy9DLGdEQUFnRDtJQUNoRCxvQkFBb0I7SUFDcEIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxpQ0FBaUM7SUFDakMsb0JBQW9CO0lBQ3BCLDBGQUEwRjtJQUMxRix3RkFBd0Y7SUFDeEYsK0RBQStEO0lBQy9ELG1EQUFtRDtJQUNuRCwyQ0FBMkM7SUFDM0MsbUVBQW1FO0lBQ25FLDhEQUE4RDtJQUM5RCxnRkFBZ0Y7SUFDaEYsd0RBQXdEO0lBQ3hELGdFQUFnRTtJQUNoRSwrQ0FBK0M7SUFDL0Msb0ZBQW9GO0lBQ3BGLCtEQUErRDtJQUMvRCxxREFBcUQ7SUFDckQsNkJBQTZCO0lBQzdCLHVFQUF1RTtJQUN2RSw0QkFBNEI7SUFDNUIsd0VBQXdFO0lBQ3hFLHNCQUFzQjtJQUN0Qix1RUFBdUU7SUFDdkUsdUJBQXVCO0lBQ3ZCLHlEQUF5RDtJQUN6RCwyREFBMkQ7SUFDM0Qsa0VBQWtFO0lBQ2xFLHNHQUFzRztJQUN0RyxrREFBa0Q7SUFDbEQsc0dBQXNHO0lBRXRHLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO0lBQ2hELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNoQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDaEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO0lBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lB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