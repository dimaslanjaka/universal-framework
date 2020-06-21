"use strict";
var tslib_1 = require("tslib");
var sass = tslib_1.__importStar(require("sass"));
var fs = tslib_1.__importStar(require("fs"));
var log_1 = require("./log");
var core_1 = require("./core");
var sass_compiler = /** @class */ (function () {
    function sass_compiler() {
    }
    /**
     * Compile filename.scss to filename.css and filename.min.css
     * @param filename
     */
    sass_compiler.scss = function (filename) {
        fs.exists(filename, function (exists) {
            if (exists) {
                var output = filename.toString().replace(/\.scss/s, ".css");
                var outputcss = output;
                if (/\.scss$/s.test(filename.toString()) &&
                    !/\.min\.scss$/s.test(filename.toString())) {
                    sass.render({
                        file: filename.toString(),
                        outputStyle: "expanded",
                        outFile: output,
                    }, function (err, result) {
                        if (!err) {
                            fs.writeFile(outputcss, result.css, function (err) {
                                if (!err) {
                                    filename = filename.toString().replace(core_1.core.root(), "");
                                    outputcss = outputcss.replace(core_1.core.root(), "");
                                    new log_1.log(filename + " > " + outputcss + " " + log_1.log.success("success"));
                                    core_1.core.minCSS(output, null);
                                }
                            });
                        }
                    });
                }
            }
            else {
                console.error(filename + " not found");
            }
        });
    };
    return sass_compiler;
}());
module.exports = sass_compiler;
//export default sass_compiler;
