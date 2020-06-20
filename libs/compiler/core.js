"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const Terser = require("terser");
const path_1 = tslib_1.__importDefault(require("path"));
const slash = require("slash");
const JavaScriptObfuscator = require("javascript-obfuscator");
const log_1 = tslib_1.__importDefault(require("./log"));
const uglifycss_1 = tslib_1.__importDefault(require("uglifycss"));
const sass_1 = tslib_1.__importDefault(require("sass"));
const child_process_1 = require("child_process");
const LocalStorage = require("node-localstorage").LocalStorage;
const config_1 = tslib_1.__importDefault(require("./config"));
/**
 * Core compiler
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class core {
    constructor() {
        core.config = config_1.default;
    }
    static arrayFilter(arr) {
        return arr.filter(function (el) {
            return el != null;
        });
    }
    /**
     * return Asynchronous function (Promise)
     * @param callback
     */
    static async(callback) {
        return new Promise(function (resolve, reject) {
            if (typeof callback == "function") {
                callback();
            }
            resolve();
        });
    }
    /**
     * localStorage NodeJS Version
     */
    static localStorage() {
        return new LocalStorage(`${this.root()}/tmp/storage`);
    }
    /**
     * Composer
     * @param dir directory has composer.json
     * @param type
     */
    static composer(dir, type) {
        if (type) {
            child_process_1.exec(`cd ${dir} && php libs/bin/composer/composer.phar ${type}`, (error, stdout, stderr) => {
                if (error) {
                    log_1.default.error(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    new log_1.default(`stderr: ${stderr}`);
                    return;
                }
                new log_1.default(`stdout: ${stdout}`);
            });
        }
    }
    /**
     * @param {import("fs").PathLike} dir
     * @param {string[]} [filelist]
     * @return {Array}
     */
    static readdir(dir, filelist) {
        if (!dir)
            return null;
        var self = this;
        if (!dir.toString().endsWith("/")) {
            dir += "/";
        }
        var files = fs_1.default.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function (file) {
            if (fs_1.default.statSync(dir + file).isDirectory()) {
                filelist = self.readdir(dir + file + "/", filelist);
            }
            else {
                filelist.push(path_1.default.resolve(dir + file));
            }
        });
        return filelist;
    }
    /**
     * Compile filename.scss to filename.css and filename.min.css
     * @param filename
     */
    static scss(filename) {
        fs_1.default.exists(filename, function (exists) {
            if (exists) {
                var output = filename.toString().replace(/\.scss/s, ".css");
                var outputcss = output;
                if (/\.scss$/s.test(filename.toString()) &&
                    !/\.min\.scss$/s.test(filename.toString())) {
                    sass_1.default.render({
                        file: filename.toString(),
                        outputStyle: "expanded",
                        outFile: output,
                    }, function (err, result) {
                        if (!err) {
                            fs_1.default.writeFile(outputcss, result.css, function (err) {
                                if (!err) {
                                    filename = filename.toString().replace(core.root(), "");
                                    outputcss = outputcss.replace(core.root(), "");
                                    new log_1.default(`${filename} > ${outputcss} ${log_1.default.success("success")}`);
                                    core.minCSS(output, null);
                                }
                            });
                        }
                    });
                }
            }
            else {
                console.error(`${filename} not found`);
            }
        });
    }
    /**
     * Get root path
     * @returns {string} posix/unix path format
     */
    static root() {
        var appDir = slash(path_1.default.dirname(require.main.filename)).toString();
        if (/\/libs\/compiler$/s.test(appDir)) {
            var split = appDir.split("/");
            split = split.slice(0, -2);
            appDir = split.join("/");
        }
        return appDir;
    }
    /**
     * Minify all js file to format *.min.js
     * @param {string} folder
     */
    static minify_folder(folder) {
        var self = this;
        var js = new Array();
        fs_1.default.exists(folder, function (exists) {
            if (exists && fs_1.default.lstatSync(folder).isDirectory()) {
                var read = self.readdir(folder, []);
                if (Array.isArray(read)) {
                    read.forEach((file) => {
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
    }
    /**
     * Obfuscate Javascript
     * @param {string} filejs
     */
    static obfuscate(filejs) {
        if (!/\.obfuscated\.js$/s.test(filejs) && filejs.endsWith(".js")) {
            var output = filejs.replace(/\.js/s, ".obfuscated.js");
            fs_1.default.readFile(filejs, {
                encoding: "utf-8",
            }, function (err, data) {
                if (!err) {
                    var obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
                        compact: true,
                        controlFlowFlattening: true,
                    });
                    fs_1.default.writeFileSync(output, obfuscationResult.getObfuscatedCode());
                }
            });
        }
    }
    /**
     * Minify JS into *.min.js version
     * @param {string} file
     */
    static minJS(file) {
        if (!file) {
            return;
        }
        var self = this;
        if (/\.min\.js$/s.test(file) || !/\.js$/s.test(file)) {
            log_1.default.log(log_1.default.error(`${file} minJS Not Allowed`));
            return;
        }
        var min = file.replace(/\.js$/s, ".min.js");
        //log(min);
        fs_1.default.readFile(file, {
            encoding: "utf-8",
        }, function (err, data) {
            if (!err) {
                fs_1.default.writeFile(min, data, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        const terserResult = Terser.minify(fs_1.default.readFileSync(min, "utf8"), {
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
                        var input = slash(file).replace(self.root(), "");
                        var output = slash(min).replace(self.root(), "");
                        if (terserResult.error) {
                            log_1.default.log(`${log_1.default.chalk().yellow(input)} > ${log_1.default
                                .chalk()
                                .yellowBright(output)} ${log_1.default.chalk().red("fail")}`);
                            fs_1.default.exists(min, function (ex) {
                                if (ex) {
                                    fs_1.default.unlinkSync(min);
                                    log_1.default.log(`${log_1.default.chalk().yellowBright(min)} ${log_1.default
                                        .chalk()
                                        .redBright("deleted")}`);
                                }
                            });
                        }
                        else {
                            fs_1.default.writeFileSync(min, terserResult.code, "utf8");
                            log_1.default.log(`${log_1.default.chalk().yellow(input)} > ${log_1.default
                                .chalk()
                                .yellowBright(output)} ${log_1.default.chalk().green("success")}`);
                        }
                    }
                });
            }
            else {
                log_1.default.log(err);
            }
        });
    }
    /**
     * smart delete file
     * @param {string} file
     */
    static unlink(file) {
        var self = this;
        fs_1.default.exists(file, function (exists) {
            if (exists) {
                fs_1.default.unlink(file, function (err) {
                    if (!err) {
                        file = slash(file).replace(self.root(), "");
                        new log_1.default(`${log_1.default.chalk().whiteBright(file)} ${log_1.default
                            .chalk()
                            .redBright("deleted")}`);
                    }
                });
            }
        });
    }
    /**
     * format path to unix path
     * @param {string} path
     * @returns {string|null}
     */
    static normalize(path) {
        return typeof slash(path) == "string"
            ? slash(path).replace(/\/{2,99}/s, "/")
            : null;
    }
    /**
     * Determine OS is windows
     */
    static isWin() {
        return process.platform === "win32";
    }
    /**
     * minify css to *.min.css version
     * @param {string} file
     * @param {Function|null} callback
     */
    static minCSS(file, callback) {
        fs_1.default.exists(file, function (exists) {
            if (exists && !/\.min\.css$/s.test(file) && /\.css$/s.test(file)) {
                var min = file.replace(/\.css/s, ".min.css");
                fs_1.default.readFile(file, {
                    encoding: "utf-8",
                }, function (err, data) {
                    if (!err) {
                        fs_1.default.writeFile(min, data, function (err) {
                            if (!err) {
                                var minified = uglifycss_1.default.processFiles([min], {
                                    maxLineLen: 500,
                                    expandVars: true,
                                });
                                fs_1.default.writeFile(min, minified, {
                                    encoding: "utf-8",
                                }, function (err) {
                                    if (!err) {
                                        if (typeof callback != "function") {
                                            file = file.replace(core.root(), "");
                                            min = min.replace(core.root(), "");
                                            new log_1.default(`${log_1.default
                                                .chalk()
                                                .blueBright(file)} > ${log_1.default
                                                .chalk()
                                                .blueBright(min)} ${log_1.default.chalk().green("success")}`);
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
    }
}
exports.default = core;
