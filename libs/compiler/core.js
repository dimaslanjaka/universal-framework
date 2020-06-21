"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
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
                    log_1.default.error("error: " + error.message);
                    return;
                }
                if (stderr) {
                    new log_1.default("stderr: " + stderr);
                    return;
                }
                new log_1.default("stdout: " + stdout);
            });
        }
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
                        var input = slash_1.default(file).replace(self.root(), "");
                        var output = slash_1.default(min).replace(self.root(), "");
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
                                .yellowBright(output) + " " + log_1.default.chalk().green("success"));
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
                        new log_1.default(log_1.default.chalk().whiteBright(file) + " " + log_1.default
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
                                            new log_1.default(log_1.default
                                                .chalk()
                                                .blueBright(file) + " > " + log_1.default
                                                .chalk()
                                                .blueBright(min) + " " + log_1.default.chalk().green("success"));
                                        }
                                        else {
                                            callback(true, file, min);
                                        }
                                    }
                                });
                            }
                            else {
                                new log_1.default(log_1.default.chalk().red(err));
                            }
                        });
                    }
                    else {
                        new log_1.default(log_1.default.chalk().red(err));
                    }
                });
            }
        });
    };
    return core;
}());
exports.core = core;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlci9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw2Q0FBeUI7QUFDekIscURBQWlDO0FBQ2pDLGlEQUE2QjtBQUM3Qix3REFBMEI7QUFDMUIsa0ZBQThEO0FBQzlELHNEQUF3QjtBQUN4QiwyREFBdUM7QUFDdkMsaURBQTZCO0FBQzdCLCtDQUFxQztBQUNyQyxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFDL0QsNERBQXFDO0FBRXJDOzs7R0FHRztBQUNIO0lBQUE7SUF1WUEsQ0FBQztJQXRZQzs7T0FFRztJQUNJLFdBQU0sR0FBYjtRQUNFLE9BQU8sZ0JBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksZ0JBQVcsR0FBbEIsVUFBbUIsR0FBVTtRQUMzQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzVCLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSSxVQUFLLEdBQVosVUFBYSxRQUFrQjtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDMUMsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7Z0JBQ2pDLFFBQVEsRUFBRSxDQUFDO2FBQ1o7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNEOztPQUVHO0lBQ0ksaUJBQVksR0FBbkI7UUFDRSxPQUFPLElBQUksWUFBWSxDQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksYUFBUSxHQUFmLFVBQ0UsR0FBVyxFQUNYLElBQW1FO1FBRW5FLElBQUksSUFBSSxFQUFF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