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
require("../node-localstorage/src/index");
var config_1 = require("./config");
var framework = tslib_1.__importStar(require("./framework"));
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var less_1 = tslib_1.__importDefault(require("less"));
/**
 * Determine framework is loaded in browser
 */
var isAppLoaded = true;
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
        return config_1.config;
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
        return new Promise(function (resolve) {
            if (typeof callback == "function") {
                callback();
            }
            resolve(true);
        });
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
        return path.join(core.normalize(path.dirname(file)).replace(core.normalize(process.cwd()), ""), path.basename(file));
    };
    /**
     * transform *.browserify to .js
     * @param filename filepath
     */
    core.browserify = function (filename) {
        var self = this;
        var exists = fs.existsSync(filename);
        if (exists) {
            var output = filename.toString().replace(/\.browserify\.js/s, ".js");
            child_process_1.exec("browserify -t [ babelify --presets [ es2015 ] ] " + filename + " -o " + output);
            log_1.default.log(self.filelog(filename.toString()) + " > " + self.filelog(output.toString()) + " " + log_1.default.success("success"));
        }
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
                var output_1 = filename.toString().replace(/\.scss/s, ".css");
                var outputcss_1 = output_1;
                if (/\.scss$/s.test(filename.toString()) && !/\.min\.scss$/s.test(filename.toString())) {
                    sass.render({
                        file: filename.toString(),
                        outputStyle: "expanded",
                        outFile: output_1,
                    }, function (err, result) {
                        if (!err) {
                            fs.writeFile(outputcss_1, result.css.toString(), function (err) {
                                if (!err) {
                                    log_1.default.log(log_1.default.chalk().red(self.filelog(filename.toString())) + " > " + log_1.default
                                        .chalk()
                                        .blueBright(self.filelog(outputcss_1)) + " " + log_1.default.success("success"));
                                    core.minCSS(output_1, null);
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
    core.exists = function (filename) {
        return fs.existsSync(filename);
    };
    core.less = function (filename) {
        var self = this;
        var exists = fs.existsSync(filename);
        if (exists) {
            var outputcss_2 = filename.toString().replace(/\.less/s, ".css");
            var source = fs.readFileSync(filename).toString();
            less_1.default.render(source, { sourceMap: { sourceMapFileInline: true } })
                .then(function (output) {
                fs.writeFileSync(outputcss_2, output.css, { encoding: "utf-8" });
                log_1.default.log(log_1.default.chalk().hex("#1d365d").bgWhite(self.filelog(filename)) + " > " + log_1.default
                    .chalk()
                    .blueBright(self.filelog(outputcss_2)) + " " + log_1.default.success("success"));
            })
                .catch(function (e) {
                console.log(log_1.default.chalk().hex("#1d365d")(self.filelog(filename)) + " > " + log_1.default
                    .chalk()
                    .blueBright(self.filelog(outputcss_2)) + " " + log_1.default.chalk().redBright("failed"));
            });
        }
    };
    /**
     * Compile LESS to CSS
     * @param from less path file
     * @param to to css path file
     * @example compileLESS('src/test.less', 'dist/test.css')
     */
    core.compileLESS = function (from, to) {
        from = path.join(__dirname, from);
        to = path.join(__dirname, to);
        var self = this;
        fs.readFile(from, function (err, data) {
            if (err)
                return;
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
        var js = [];
        var exists = fs.existsSync(folder);
        if (exists && fs.lstatSync(folder).isDirectory()) {
            var read = filemanager_1.default.readdir(folder, [], []);
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
    };
    /**
     * Obfuscate Javascript
     * @param {string} filejs
     */
    core.obfuscate = function (filejs) {
        var self = this;
        if (!/\.obfuscated\.js$/s.test(filejs) && filejs.endsWith(".js")) {
            var output_2 = filejs.replace(/\.js/s, ".obfuscated.js");
            fs.readFile(filejs, {
                encoding: "utf-8",
            }, function (err, data) {
                if (!err) {
                    var obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
                        compact: true,
                        controlFlowFlattening: true,
                    });
                    fs.writeFile(output_2, obfuscationResult.getObfuscatedCode(), function (err) {
                        if (!err) {
                            log_1.default.log(self.filelog(filejs) + " > " + self.filelog(output_2) + " " + log_1.default.success("success"));
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
                            log_1.default.log(log_1.default.chalk().yellow(input) + " > " + log_1.default.chalk().yellowBright(output) + " " + log_1.default
                                .chalk()
                                .red("fail"));
                            if (fs.existsSync(min)) {
                                filemanager_1.default.unlink(min, false);
                                log_1.default.log(log_1.default.chalk().yellowBright(core.filelog(min)) + log_1.default.chalk().redBright(" deleted"));
                            }
                        }
                        else {
                            fs.writeFileSync(min, terserResult.code, "utf8");
                            log_1.default.log(log_1.default.chalk().yellow(input) + " > " + log_1.default.chalk().yellowBright(output) + " " + log_1.default.success("success"));
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
        return typeof slash_1.default(path) == "string" ? slash_1.default(path).replace(/\/{2,99}/s, "/") : null;
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
                var min_1 = file.replace(/\.css/s, ".min.css");
                fs.readFile(file, {
                    encoding: "utf-8",
                }, function (err, data) {
                    if (!err) {
                        fs.writeFile(min_1, data, function (err) {
                            if (!err) {
                                var minified = uglifycss.processFiles([min_1], {
                                    maxLineLen: 500,
                                    expandVars: true,
                                });
                                fs.writeFile(min_1, minified, {
                                    encoding: "utf-8",
                                }, function (err) {
                                    if (!err) {
                                        if (typeof callback != "function") {
                                            log_1.default.log(log_1.default.chalk().blueBright(self.filelog(file)) + " > " + log_1.default
                                                .chalk()
                                                .blueBright(self.filelog(min_1)) + " " + log_1.default
                                                .chalk()
                                                .green("success"));
                                        }
                                        else {
                                            callback(true, file, min_1);
                                        }
                                    }
                                });
                            }
                            else {
                                console.error(err);
                            }
                        });
                    }
                    else {
                        console.error(err);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUI7QUFDekIscURBQWlDO0FBQ2pDLGlEQUE2QjtBQUM3Qix3REFBMEI7QUFDMUIsa0ZBQThEO0FBQzlELHNEQUF3QjtBQUN4QiwyREFBdUM7QUFDdkMsaURBQTZCO0FBQzdCLCtDQUFxQztBQUNyQywwQ0FBd0M7QUFDeEMsbUNBQWtDO0FBQ2xDLDZEQUF5QztBQUN6QyxzRUFBd0M7QUFDeEMsc0RBQXdCO0FBRXhCOztHQUVHO0FBQ0gsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBRXpCOzs7R0FHRztBQUNIO0lBQUE7UUFFSSxRQUFHLEdBQUcsYUFBRyxDQUFDO0lBcWJkLENBQUM7SUFuYkc7O09BRUc7SUFDSSxXQUFNLEdBQWI7UUFDSSxPQUFPLGVBQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUJBQVksR0FBbkIsVUFBb0IsR0FBVTtRQUMxQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzFCLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSSxVQUFLLEdBQVosVUFBYSxRQUFrQjtRQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTztZQUNoQyxJQUFJLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDL0IsUUFBUSxFQUFFLENBQUM7YUFDZDtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksYUFBUSxHQUFmLFVBQWdCLEdBQVcsRUFBRSxJQUFtRTtRQUM1RixJQUFJLElBQUksRUFBRTtZQUNOLG9CQUFJLENBQ0EsUUFBTSxHQUFHLGdE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