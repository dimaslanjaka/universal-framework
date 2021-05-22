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
            less_1.default
                .render(source, { sourceMap: { sourceMapFileInline: true } })
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
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        var js = [];
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
        // eslint-disable-next-line @typescript-eslint/no-this-alias
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
                            log_1.default.log(log_1.default.chalk().yellow(input) + " > " + log_1.default.chalk().yellowBright(output) + " " + log_1.default.chalk().red("fail"));
                            fs.exists(min, function (ex) {
                                if (ex) {
                                    filemanager_1.default.unlink(min, false);
                                    log_1.default.log(log_1.default.chalk().yellowBright(core.filelog(min)) + log_1.default.chalk().redBright(" deleted"));
                                }
                            });
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
                                                .blueBright(self.filelog(min_1)) + " " + log_1.default.chalk().green("success"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUI7QUFDekIscURBQWlDO0FBQ2pDLGlEQUE2QjtBQUM3Qix3REFBMEI7QUFDMUIsa0ZBQThEO0FBQzlELHNEQUF3QjtBQUN4QiwyREFBdUM7QUFDdkMsaURBQTZCO0FBQzdCLCtDQUFxQztBQUNyQywwQ0FBd0M7QUFDeEMsbUNBQWtDO0FBQ2xDLDZEQUF5QztBQUN6QyxzRUFBd0M7QUFDeEMsc0RBQXdCO0FBRXhCOzs7R0FHRztBQUNIO0lBQUE7UUFFRSxRQUFHLEdBQUcsYUFBRyxDQUFDO0lBb2RaLENBQUM7SUFsZEM7O09BRUc7SUFDSSxXQUFNLEdBQWI7UUFDRSxPQUFPLGVBQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUJBQVksR0FBbkIsVUFBb0IsR0FBVTtRQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzVCLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxVQUFLLEdBQVosVUFBYSxRQUFrQjtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTztZQUNsQyxJQUFJLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDakMsUUFBUSxFQUFFLENBQUM7YUFDWjtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksYUFBUSxHQUFmLFVBQWdCLEdBQVcsRUFBRSxJQUFtRTtRQUM5RixJQUFJLElBQUksRUFBRTtZQUNSLG9CQUFJLENBQ0YsUUFBTSxHQUFHLGdEQUEyQyxJQUFNLEVBQzFELFVBQUMsS0FBdUIsRUFBRSxNQUFXLEVBQUUs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