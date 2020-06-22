"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sass_compiler = void 0;
var sass = require("sass");
var fs = require("fs");
var log_1 = require("./log");
//import { core } from "./core";
var core = require("./core");
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
                                    filename = filename.toString().replace(core.root(), "");
                                    outputcss = outputcss.replace(core.root(), "");
                                    new log_1.default(filename + " > " + outputcss + " " + log_1.default.success("success"));
                                    core.minCSS(output, null);
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
exports.sass_compiler = sass_compiler;
