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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aGluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2ZpbGVzeXN0ZW0vcGF0aGluZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxJQUFJLEVBQUUsT0FBTztJQUMvQyxnREFBZ0Q7SUFDaEQsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsaUNBQWlDO0lBQ2pDLG9CQUFvQjtJQUNwQiwwRkFBMEY7SUFDMUYsd0ZBQXdGO0lBQ3hGLCtEQUErRDtJQUMvRCxtREFBbUQ7SUFDbkQsMkNBQTJDO0lBQzNDLG1FQUFtRTtJQUNuRSw4REFBOEQ7SUFDOUQsZ0ZBQWdGO0lBQ2hGLHdEQUF3RDtJQUN4RCxnRUFBZ0U7SUFDaEUsK0NBQStDO0lBQy9DLG9GQUFvRjtJQUNwRiwrREFBK0Q7SUFDL0QscURBQXFEO0lBQ3JELDZCQUE2QjtJQUM3Qix1RUFBdUU7SUFDdkUsNEJBQTRCO0lBQzVCLHdFQUF3RTtJQUN4RSxzQkFBc0I7SUFDdEIsdUVBQXVFO0lBQ3ZFLHVCQUF1QjtJQUN2Qix5REFBeUQ7SUFDekQsMkRBQTJEO0lBQzNELGtFQUFrRTtJQUNsRSxzR0FBc0c7SUFDdEcsa0RBQWtEO0lBQ2xELHNHQUFzRztJQUV0RyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtJQUNoRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDaEIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2hCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUNmLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUks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