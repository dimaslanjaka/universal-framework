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
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
/**
 * @class Core compiler
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
var core = /** @class */ (function () {
    function core() {
        this.log = log_1.default;
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
     * @param dir
     * @param [filelist]
     * @return
     */
    core.readdir = function (dir, filelist, exclude) {
        if (filelist === void 0) { filelist = null; }
        if (exclude === void 0) { exclude = null; }
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
                filelist = self.readdir(dir + file + "/", filelist, exclude);
            }
            else {
                filelist.push(path.resolve(dir + file));
            }
        });
        if (exclude && exclude.length) {
            exclude.forEach(function (ex) {
                filelist = filelist.filter(function (item) {
                    var allow = null;
                    if (ex instanceof RegExp) {
                        allow = !ex.test(item);
                    }
                    else {
                        var matches = item.indexOf(ex) !== -1;
                        allow = !matches;
                    }
                    //console.log(allow, ex);
                    return allow;
                });
            });
        }
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
        var exists = fs.existsSync(filename);
        if (exists) {
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
                            fs.writeFile(outputcss, result.css.toString(), function (err) {
                                if (!err) {
                                    log_1.default.log(log_1.default
                                        .chalk()
                                        .red(self.filelog(filename.toString())) + " > " + log_1.default
                                        .chalk()
                                        .blueBright(self.filelog(outputcss)) + " " + log_1.default.success("success"));
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
        }
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
                var read = self.readdir(folder, [], []);
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
        if (!fs.existsSync(file)) {
            log_1.default.log(log_1.default.random(file) + log_1.default.error(" not found"));
            return null;
        }
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
                                    filemanager_1.default.unlink(min, false);
                                    log_1.default.log(log_1.default.chalk().yellowBright(core.filelog(min)) +
                                        log_1.default.chalk().redBright(" deleted"));
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
        return filemanager_1.default.unlink(file, false);
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
     * @param file
     * @param callback
     */
    core.minCSS = function (file, callback) {
        if (callback === void 0) { callback = null; }
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
    core.log = log_1.default;
    return core;
}());
Object.assign(core, filemanager_1.default, framework.dimas);
module.exports = core;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUI7QUFDekIscURBQWlDO0FBQ2pDLGlEQUE2QjtBQUM3Qix3REFBMEI7QUFDMUIsa0ZBQThEO0FBQzlELHNEQUF3QjtBQUN4QiwyREFBdUM7QUFDdkMsaURBQTZCO0FBQzdCLCtDQUFxQztBQUNyQyxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFDL0QsNERBQXFDO0FBQ3JDLDZEQUF5QztBQUN6QyxzRUFBd0M7QUFFeEM7OztHQUdHO0FBQ0g7SUFBQTtRQUVFLFFBQUcsR0FBRyxhQUFHLENBQUM7SUFvY1osQ0FBQztJQW5jQzs7T0FFRztJQUNJLFdBQU0sR0FBYjtRQUNFLE9BQU8sZ0JBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksaUJBQVksR0FBbkIsVUFBb0IsR0FBVTtRQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzVCLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSSxVQUFLLEdBQVosVUFBYSxRQUFrQjtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDMUMsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7Z0JBQ2pDLFFBQVEsRUFBRSxDQUFDO2FBQ1o7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNEOztPQUVHO0lBQ0ksaUJBQVksR0FBbkI7UUFDRSxPQUFPLElBQUksWUFBWSxDQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRDs7OztPQUlH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