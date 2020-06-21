"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var Terser = tslib_1.__importStar(require("terser"));
var path = tslib_1.__importStar(require("path"));
var slash_1 = tslib_1.__importDefault(require("slash"));
var JavaScriptObfuscator = tslib_1.__importStar(require("javascript-obfuscator"));
var log_1 = require("./log");
var uglifycss = tslib_1.__importStar(require("uglifycss"));
var sass = tslib_1.__importStar(require("sass"));
var child_process_1 = require("child_process");
var LocalStorage = require("node-localstorage").LocalStorage;
var config_1 = tslib_1.__importDefault(require("./config"));
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
    core.arrayFilter = function (arr) {
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
                    log_1.log.error("error: " + error.message);
                    return;
                }
                if (stderr) {
                    new log_1.log("stderr: " + stderr);
                    return;
                }
                new log_1.log("stdout: " + stdout);
            });
        }
    };
    /**
     * Console log prettyprint
     */
    core.log = function () {
        return log_1.log;
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
     * Compile filename.scss to filename.css and filename.min.css
     * @param filename
     */
    core.scss = function (filename) {
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
                                    new log_1.log(filename + " > " + outputcss + " " + log_1.log.success("success"));
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
                    fs.writeFileSync(output, obfuscationResult.getObfuscatedCode());
                }
            });
        }
    };
    /**
     * Minify JS into *.min.js version
     * @param {string} file
     */
    core.minJS = function (file) {
        if (!file) {
            return;
        }
        var self = this;
        if (/\.min\.js$/s.test(file) || !/\.js$/s.test(file)) {
            log_1.log.log(log_1.log.error(file + " minJS Not Allowed"));
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
                        var input = slash_1.default(file).replace(self.root(), "");
                        var output = slash_1.default(min).replace(self.root(), "");
                        if (terserResult.error) {
                            log_1.log.log(log_1.log.chalk().yellow(input) + " > " + log_1.log
                                .chalk()
                                .yellowBright(output) + " " + log_1.log.chalk().red("fail"));
                            fs.exists(min, function (ex) {
                                if (ex) {
                                    fs.unlinkSync(min);
                                    log_1.log.log(log_1.log.chalk().yellowBright(min) + " " + log_1.log
                                        .chalk()
                                        .redBright("deleted"));
                                }
                            });
                        }
                        else {
                            fs.writeFileSync(min, terserResult.code, "utf8");
                            log_1.log.log(log_1.log.chalk().yellow(input) + " > " + log_1.log
                                .chalk()
                                .yellowBright(output) + " " + log_1.log.chalk().green("success"));
                        }
                    }
                });
            }
            else {
                log_1.log.log(err);
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
                        new log_1.log(log_1.log.chalk().whiteBright(file) + " " + log_1.log
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
                                            file = file.replace(core.root(), "");
                                            min = min.replace(core.root(), "");
                                            new log_1.log(log_1.log
                                                .chalk()
                                                .blueBright(file) + " > " + log_1.log
                                                .chalk()
                                                .blueBright(min) + " " + log_1.log.chalk().green("success"));
                                        }
                                        else {
                                            callback(true, file, min);
                                        }
                                    }
                                });
                            }
                            else {
                                new log_1.log(log_1.log.chalk().red(err));
                            }
                        });
                    }
                    else {
                        new log_1.log(log_1.log.chalk().red(err));
                    }
                });
            }
        });
    };
    return core;
}());
exports.core = core;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlci9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw2Q0FBeUI7QUFDekIscURBQWlDO0FBQ2pDLGlEQUE2QjtBQUM3Qix3REFBMEI7QUFDMUIsa0ZBQThEO0FBQzlELDZCQUE0QjtBQUM1QiwyREFBdUM7QUFDdkMsaURBQTZCO0FBQzdCLCtDQUFxQztBQUNyQyxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFDL0QsNERBQXFDO0FBRXJDOzs7R0FHRztBQUNIO0lBQUE7SUE2WUEsQ0FBQztJQTVZQzs7T0FFRztJQUNJLFdBQU0sR0FBYjtRQUNFLE9BQU8sZ0JBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksZ0JBQVcsR0FBbEIsVUFBbUIsR0FBVTtRQUMzQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzVCLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSSxVQUFLLEdBQVosVUFBYSxRQUFrQjtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDMUMsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7Z0JBQ2pDLFFBQVEsRUFBRSxDQUFDO2FBQ1o7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNEOztPQUVHO0lBQ0ksaUJBQVksR0FBbkI7UUFDRSxPQUFPLElBQUksWUFBWSxDQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksYUFBUSxHQUFmLFVBQ0UsR0FBVyxFQUNYLElBQW1FO1FBRW5FLElBQUksSUFBSSxFQUFF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