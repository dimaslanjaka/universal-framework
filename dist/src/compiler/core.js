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
var index_1 = require("../node-localstorage/index");
var config_1 = tslib_1.__importDefault(require("./config"));
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
        return new Promise(function (resolve) {
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
        return new index_1.LocalStorage(this.root() + "/tmp/storage");
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
     * transform *.browserify to .js
     * @param filename filepath
     */
    core.browserify = function (filename) {
        var self = this;
        var exists = fs.existsSync(filename);
        if (exists) {
            var output = filename.toString().replace(/\.browserify/s, ".js");
            child_process_1.exec("browserify " + filename + " -o " + output);
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
    core.exists = function (filename) {
        return fs.existsSync(filename);
    };
    core.less = function (filename) {
        var self = this;
        var exists = fs.existsSync(filename);
        if (exists) {
            var outputcss = filename.toString().replace(/\.less/s, ".css");
            var source = fs.readFileSync(filename).toString();
            less_1.default
                .render(source, { sourceMap: { sourceMapFileInline: true } })
                .then(function (output) {
                fs.writeFileSync(outputcss, output.css, { encoding: "utf-8" });
                log_1.default.log(log_1.default
                    .chalk()
                    .hex("#1d365d")
                    .bgWhite(self.filelog(filename)) + " > " + log_1.default
                    .chalk()
                    .blueBright(self.filelog(outputcss)) + " " + log_1.default.success("success"));
            })
                .catch(function (e) {
                console.log(log_1.default.chalk().hex("#1d365d")(self.filelog(filename)) + " > " + log_1.default
                    .chalk()
                    .blueBright(self.filelog(outputcss)) + " " + log_1.default
                    .chalk()
                    .redBright("failed"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUI7QUFDekIscURBQWlDO0FBQ2pDLGlEQUE2QjtBQUM3Qix3REFBMEI7QUFDMUIsa0ZBQThEO0FBQzlELHNEQUF3QjtBQUN4QiwyREFBdUM7QUFDdkMsaURBQTZCO0FBQzdCLCtDQUFxQztBQUNyQyxvREFBMEQ7QUFDMUQsNERBQXFDO0FBQ3JDLDZEQUF5QztBQUN6QyxzRUFBd0M7QUFDeEMsc0RBQXdCO0FBRXhCOzs7R0FHRztBQUNIO0lBQUE7UUFFRSxRQUFHLEdBQUcsYUFBRyxDQUFDO0lBMGdCWixDQUFDO0lBemdCQzs7T0FFRztJQUNJLFdBQU0sR0FBYjtRQUNFLE9BQU8sZ0JBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksaUJBQVksR0FBbkIsVUFBb0IsR0FBVTtRQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzVCLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSSxVQUFLLEdBQVosVUFBYSxRQUFrQjtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTztZQUNsQyxJQUFJLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDakMsUUFBUSxFQUFFLENBQUM7YUFDWjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7O09BRUc7SUFDSSxpQkFBWSxHQUFuQjtRQUNFLE9BQU8sSUFBSSxvQkFBWSxDQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksYUFBUSxHQUFmLFVBQ0UsR0FBVyxFQUNYLElBQW1F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