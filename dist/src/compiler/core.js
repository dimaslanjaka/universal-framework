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
            resolve(true);
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
                                                .blueBright(self.filelog(min)) + " " + log_1.default
                                                .chalk()
                                                .green("success"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUI7QUFDekIscURBQWlDO0FBQ2pDLGlEQUE2QjtBQUM3Qix3REFBMEI7QUFDMUIsa0ZBQThEO0FBQzlELHNEQUF3QjtBQUN4QiwyREFBdUM7QUFDdkMsaURBQTZCO0FBQzdCLCtDQUFxQztBQUNyQyxvREFBMEQ7QUFDMUQsNERBQXFDO0FBQ3JDLDZEQUF5QztBQUN6QyxzRUFBd0M7QUFDeEMsc0RBQXdCO0FBRXhCOzs7R0FHRztBQUNIO0lBQUE7UUFFRSxRQUFHLEdBQUcsYUFBRyxDQUFDO0lBc2dCWixDQUFDO0lBcmdCQzs7T0FFRztJQUNJLFdBQU0sR0FBYjtRQUNFLE9BQU8sZ0JBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksaUJBQVksR0FBbkIsVUFBb0IsR0FBVTtRQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzVCLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSSxVQUFLLEdBQVosVUFBYSxRQUFrQjtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTztZQUNsQyxJQUFJLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDakMsUUFBUSxFQUFFLENBQUM7YUFDWjtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7T0FFRztJQUNJLGlCQUFZLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLG9CQUFZLENBQUksSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBYyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSxhQUFRLEdBQWYsVUFDRSxHQUFX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