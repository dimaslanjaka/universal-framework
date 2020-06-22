"use strict";
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var Terser = tslib_1.__importStar(require("terser"));
var path = tslib_1.__importStar(require("path"));
var slash_1 = tslib_1.__importDefault(require("slash"));
var JavaScriptObfuscator = tslib_1.__importStar(require("javascript-obfuscator"));
var log_1 = tslib_1.__importDefault(require("./log"));
var uglifycss = tslib_1.__importStar(require("uglifycss"));
var sass = tslib_1.__importStar(require("sass"));
var child_process_1 = require("child_process");
var LocalStorage = require("node-localstorage").LocalStorage;
var config_1 = tslib_1.__importDefault(require("./config"));
var framework = tslib_1.__importStar(require("./framework"));
var dimas = framework.dimas;
/**
 * @class Core compiler
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
var core = /** @class */ (function () {
    function core() {
    }
    /**
     * config.json
     */
    core.config = function () {
        return config_1.default;
    };
    /**
     * filter array after deletion
     * @param arr
     */
    core.array_filter = function (arr) {
        return arr.filter(function (el) {
            return el != null;
        });
    };
    /**
     * return Asynchronous function (Promise)
     * @param callback
     */
    core.async = function (callback) {
        return new Promise(function (resolve, reject) {
            if (typeof callback == "function") {
                callback();
            }
            resolve();
        });
    };
    /**
     * localStorage NodeJS Version
     */
    core.localStorage = function () {
        return new LocalStorage(this.root() + "/tmp/storage");
    };
    /**
     * Composer
     * @param dir directory has composer.json
     * @param type
     */
    core.composer = function (dir, type) {
        if (type) {
            child_process_1.exec("cd " + dir + " && php libs/bin/composer/composer.phar " + type, function (error, stdout, stderr) {
                if (error) {
                    log_1.default.log(log_1.default.error("error: " + error.message));
                    return;
                }
                if (stderr) {
                    log_1.default.log("stderr: " + stderr);
                    return;
                }
                log_1.default.log("stdout: " + stdout);
            });
        }
    };
    /**
     * Console log prettyprint
     */
    core.log = function () {
        return log_1.default;
    };
    /**
     * @param {import("fs").PathLike} dir
     * @param {string[]} [filelist]
     * @return {Array}
     */
    core.readdir = function (dir, filelist) {
        if (!dir)
            return null;
        var self = this;
        if (!dir.toString().endsWith("/")) {
            dir += "/";
        }
        var files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function (file) {
            if (fs.statSync(dir + file).isDirectory()) {
                filelist = self.readdir(dir + file + "/", filelist);
            }
            else {
                filelist.push(path.resolve(dir + file));
            }
        });
        return filelist;
    };
    /**
     * Is Node or CommonJS Browser
     */
    core.isNode = function () {
        var isNode = false;
        if (typeof module !== "undefined" && module.exports) {
            isNode = true;
        }
        return isNode;
    };
    /**
     * File Log Output Console
     * @param file
     */
    core.filelog = function (file) {
        return path.join(core
            .normalize(path.dirname(file))
            .replace(core.normalize(process.cwd()), ""), path.basename(file));
    };
    /**
     * Compile filename.scss to filename.css and filename.min.css
     * @param filename
     */
    core.scss = function (filename) {
        var self = this;
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
                                    log_1.default.log(self.filelog(filename.toString()) + " > " + self.filelog(outputcss) + " " + log_1.default.success("success"));
                                    core.minCSS(output, null);
                                }
                                else {
                                    log_1.default.log(log_1.default.error(err.message));
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
    /**
     * Get root path
     * @returns {string} posix/unix path format
     */
    core.root = function () {
        var appDir = slash_1.default(path.dirname(require.main.filename)).toString();
        if (/\/libs\/compiler$/s.test(appDir)) {
            var split = appDir.split("/");
            split = split.slice(0, -2);
            appDir = split.join("/");
        }
        return appDir;
    };
    /**
     * Minify all js file to format *.min.js
     * @param {string} folder
     */
    core.minify_folder = function (folder) {
        var self = this;
        var js = new Array();
        fs.exists(folder, function (exists) {
            if (exists && fs.lstatSync(folder).isDirectory()) {
                var read = self.readdir(folder, []);
                if (Array.isArray(read)) {
                    read.forEach(function (file) {
                        if (!/\.min\.js$/s.test(file) && /\.js$/s.test(file)) {
                            js.push(file);
                            //log(file);
                        }
                    });
                    js.filter(function (el) {
                        return el != null;
                    }).forEach(function (file) {
                        if (file)
                            self.minJS(file);
                    });
                }
            }
        });
    };
    /**
     * Obfuscate Javascript
     * @param {string} filejs
     */
    core.obfuscate = function (filejs) {
        var self = this;
        if (!/\.obfuscated\.js$/s.test(filejs) && filejs.endsWith(".js")) {
            var output = filejs.replace(/\.js/s, ".obfuscated.js");
            fs.readFile(filejs, {
                encoding: "utf-8",
            }, function (err, data) {
                if (!err) {
                    var obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
                        compact: true,
                        controlFlowFlattening: true,
                    });
                    fs.writeFile(output, obfuscationResult.getObfuscatedCode(), function (err) {
                        if (!err) {
                            log_1.default.log(self.filelog(filejs) + " > " + self.filelog(output) + " " + log_1.default.success("success"));
                        }
                    });
                }
            });
        }
    };
    /**
     * Minify JS into *.min.js version
     * @param {string} file
     */
    core.minJS = function (file) {
        var self = this;
        if (!file) {
            return;
        }
        if (/\.min\.js$/s.test(file) || !/\.js$/s.test(file)) {
            log_1.default.log(log_1.default.error(file + " minJS Not Allowed"));
            return;
        }
        var min = file.replace(/\.js$/s, ".min.js");
        //log(min);
        fs.readFile(file, {
            encoding: "utf-8",
        }, function (err, data) {
            if (!err) {
                fs.writeFile(min, data, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        var terserResult = Terser.minify(fs.readFileSync(min, "utf8"), {
                            parse: {
                                ecma: 8,
                            },
                            compress: {
                                ecma: 5,
                                warnings: false,
                                arrows: false,
                                collapse_vars: false,
                                comparisons: false,
                                computed_props: false,
                                hoist_funs: false,
                                hoist_props: false,
                                hoist_vars: false,
                                inline: false,
                                loops: false,
                                negate_iife: false,
                                properties: false,
                                reduce_funcs: false,
                                reduce_vars: false,
                                switches: false,
                                toplevel: false,
                                typeofs: false,
                                booleans: true,
                                if_return: true,
                                sequences: true,
                                unused: true,
                                conditionals: true,
                                dead_code: true,
                                evaluate: true,
                            },
                            mangle: {
                                safari10: true,
                            },
                            output: {
                                ecma: 5,
                                comments: false,
                                ascii_only: true,
                            },
                        });
                        var input = self.filelog(file);
                        var output = self.filelog(min);
                        if (terserResult.error) {
                            log_1.default.log(log_1.default.chalk().yellow(input) + " > " + log_1.default
                                .chalk()
                                .yellowBright(output) + " " + log_1.default.chalk().red("fail"));
                            fs.exists(min, function (ex) {
                                if (ex) {
                                    fs.unlinkSync(min);
                                    log_1.default.log(log_1.default.chalk().yellowBright(min) + " " + log_1.default
                                        .chalk()
                                        .redBright("deleted"));
                                }
                            });
                        }
                        else {
                            fs.writeFileSync(min, terserResult.code, "utf8");
                            log_1.default.log(log_1.default.chalk().yellow(input) + " > " + log_1.default
                                .chalk()
                                .yellowBright(output) + " " + log_1.default.success("success"));
                        }
                    }
                });
            }
            else {
                log_1.default.log(err);
            }
        });
    };
    /**
     * smart delete file
     * @param {string} file
     */
    core.unlink = function (file) {
        var self = this;
        fs.exists(file, function (exists) {
            if (exists) {
                fs.unlink(file, function (err) {
                    if (!err) {
                        file = slash_1.default(file).replace(self.root(), "");
                        log_1.default.log(log_1.default.chalk().whiteBright(file) + " " + log_1.default
                            .chalk()
                            .redBright("deleted"));
                    }
                });
            }
        });
    };
    /**
     * format path to unix path
     * @param {string} path
     * @returns {string|null}
     */
    core.normalize = function (path) {
        return typeof slash_1.default(path) == "string"
            ? slash_1.default(path).replace(/\/{2,99}/s, "/")
            : null;
    };
    /**
     * Determine OS is windows
     */
    core.isWin = function () {
        return process.platform === "win32";
    };
    /**
     * minify css to *.min.css version
     * @param {string} file
     * @param {Function|null} callback
     */
    core.minCSS = function (file, callback) {
        var self = this;
        fs.exists(file, function (exists) {
            if (exists && !/\.min\.css$/s.test(file) && /\.css$/s.test(file)) {
                var min = file.replace(/\.css/s, ".min.css");
                fs.readFile(file, {
                    encoding: "utf-8",
                }, function (err, data) {
                    if (!err) {
                        fs.writeFile(min, data, function (err) {
                            if (!err) {
                                var minified = uglifycss.processFiles([min], {
                                    maxLineLen: 500,
                                    expandVars: true,
                                });
                                fs.writeFile(min, minified, {
                                    encoding: "utf-8",
                                }, function (err) {
                                    if (!err) {
                                        if (typeof callback != "function") {
                                            log_1.default.log(log_1.default
                                                .chalk()
                                                .blueBright(self.filelog(file)) + " > " + log_1.default
                                                .chalk()
                                                .blueBright(self.filelog(min)) + " " + log_1.default.chalk().green("success"));
                                        }
                                        else {
                                            callback(true, file, min);
                                        }
                                    }
                                });
                            }
                            else {
                                log_1.default.log(log_1.default.chalk().red(err));
                            }
                        });
                    }
                    else {
                        log_1.default.log(log_1.default.chalk().red(err));
                    }
                });
            }
        });
    };
    return core;
}());
if (core.isNode()) {
    //exports.module = core;
    //exports = core;
}
else {
    //window['core'] = {};
}
module.exports = core;
//export default core;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlci9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQXlCO0FBQ3pCLHFEQUFpQztBQUNqQyxpREFBNkI7QUFDN0Isd0RBQTBCO0FBQzFCLGtGQUE4RDtBQUM5RCxzREFBd0I7QUFDeEIsMkRBQXVDO0FBQ3ZDLGlEQUE2QjtBQUM3QiwrQ0FBcUM7QUFDckMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsWUFBWSxDQUFDO0FBQy9ELDREQUFxQztBQUNyQyw2REFBeUM7QUFDekMsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztBQUU5Qjs7O0dBR0c7QUFDSDtJQUFBO0lBeWJBLENBQUM7SUF4YkM7O09BRUc7SUFDSSxXQUFNLEdBQWI7UUFDRSxPQUFPLGdCQUFhLENBQUM7SUFDdkIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLGlCQUFZLEdBQW5CLFVBQW9CLEdBQVU7UUFDNUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUM1QixPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksVUFBSyxHQUFaLFVBQWEsUUFBa0I7UUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQzFDLElBQUksT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO2dCQUNqQyxRQUFRLEVBQUUsQ0FBQzthQUNaO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7T0FFRztJQUNJLGlCQUFZLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLFlBQVksQ0FBSSxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFjLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNJ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