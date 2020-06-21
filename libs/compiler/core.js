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
                    log_1.log.log(log_1.log.error("error: " + error.message));
                    return;
                }
                if (stderr) {
                    log_1.log.log("stderr: " + stderr);
                    return;
                }
                log_1.log.log("stdout: " + stdout);
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
                                    filename = filename
                                        .toString()
                                        .replace(core.normalize(core.root()), "");
                                    outputcss = outputcss.replace(core.normalize(core.root()), "");
                                    log_1.log.log(filename + " > " + outputcss + " " + log_1.log.success("success"));
                                    core.minCSS(output, null);
                                }
                                else {
                                    log_1.log.log(log_1.log.error(err.message));
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
                        var input = core
                            .normalize(file)
                            .replace(core.normalize(core.root()), "");
                        var output = core
                            .normalize(min)
                            .replace(core.normalize(core.root()), "");
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
                                .yellowBright(output) + " " + log_1.log.success("success"));
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
                        log_1.log.log(log_1.log.chalk().whiteBright(file) + " " + log_1.log
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
                                            log_1.log.log(log_1.log
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
                                log_1.log.log(log_1.log.chalk().red(err));
                            }
                        });
                    }
                    else {
                        log_1.log.log(log_1.log.chalk().red(err));
                    }
                });
            }
        });
    };
    return core;
}());
exports.core = core;
