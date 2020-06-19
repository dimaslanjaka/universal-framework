System.register("core", ["fs", "terser", "path", "slash", "javascript-obfuscator", "chalk", "fancy-log", "uglifycss", "node-sass", "child_process"], function (exports_1, context_1) {
    "use strict";
    var fs_1, terser_1, path_1, slash_1, javascript_obfuscator_1, chalk, fancy_log_1, uglifycss_1, node_sass_1, child_process_1, LocalStorage, core;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (fs_1_1) {
                fs_1 = fs_1_1;
            },
            function (terser_1_1) {
                terser_1 = terser_1_1;
            },
            function (path_1_1) {
                path_1 = path_1_1;
            },
            function (slash_1_1) {
                slash_1 = slash_1_1;
            },
            function (javascript_obfuscator_1_1) {
                javascript_obfuscator_1 = javascript_obfuscator_1_1;
            },
            function (chalk_1) {
                chalk = chalk_1;
            },
            function (fancy_log_1_1) {
                fancy_log_1 = fancy_log_1_1;
            },
            function (uglifycss_1_1) {
                uglifycss_1 = uglifycss_1_1;
            },
            function (node_sass_1_1) {
                node_sass_1 = node_sass_1_1;
            },
            function (child_process_1_1) {
                child_process_1 = child_process_1_1;
            }
        ],
        execute: function () {
            LocalStorage = require('node-localstorage').LocalStorage;
            Array.prototype.unique = function () {
                var a = this.concat();
                for (var i = 0; i < a.length; ++i) {
                    for (var j = i + 1; j < a.length; ++j) {
                        if (a[i] === a[j])
                            a.splice(j--, 1);
                    }
                }
                return a;
            };
            core = class core {
                static log() {
                    var result = [];
                    for (const key in arguments) {
                        if (arguments.hasOwnProperty(key)) {
                            var args = arguments[key];
                            if (typeof args == 'boolean') {
                                if (args) {
                                    args = chalk.greenBright(args);
                                }
                                else {
                                    args = chalk.redBright(args);
                                }
                            }
                            result.push(args);
                        }
                    }
                    fancy_log_1.default(result.join(', '));
                }
                static async(callback) {
                    return new Promise(function (resolve, reject) {
                        if (typeof callback == 'function') {
                            callback();
                        }
                        resolve();
                    });
                }
                static localStorage() {
                    return new LocalStorage(`${this.root()}/tmp/storage`);
                }
                static composer(dir, type) {
                    if (type) {
                        child_process_1.exec(`cd ${dir} && php libs/bin/composer/composer.phar ${type}`, (error, stdout, stderr) => {
                            if (error) {
                                fancy_log_1.default(`error: ${error.message}`);
                                return;
                            }
                            if (stderr) {
                                fancy_log_1.default(`stderr: ${stderr}`);
                                return;
                            }
                            fancy_log_1.default(`stdout: ${stdout}`);
                        });
                    }
                }
                static readdir(dir, filelist) {
                    if (!dir)
                        return null;
                    var self = this;
                    if (!dir.toString().endsWith('/')) {
                        dir += '/';
                    }
                    var files = fs_1.default.readdirSync(dir);
                    filelist = filelist || [];
                    files.forEach(function (file) {
                        if (fs_1.default.statSync(dir + file).isDirectory()) {
                            filelist = self.readdir(dir + file + '/', filelist);
                        }
                        else {
                            filelist.push(path_1.default.resolve(dir + file));
                        }
                    });
                    return filelist;
                }
                ;
                static scss(filename) {
                    fs_1.default.exists(filename, function (exists) {
                        if (exists) {
                            var output = filename.toString().replace(/\.scss/s, '.css');
                            var outputcss = output;
                            if (/\.scss$/s.test(filename.toString()) && !/\.min\.scss$/s.test(filename.toString())) {
                                node_sass_1.default.render({
                                    file: filename.toString(),
                                    outputStyle: "compact",
                                    outFile: output
                                }, function (err, result) {
                                    if (!err) {
                                        fs_1.default.writeFile(outputcss, result.css, function (err) {
                                            if (!err) {
                                                filename = filename.toString().replace(core.root(), '');
                                                outputcss = outputcss.replace(core.root(), '');
                                                fancy_log_1.default(`${filename} > ${outputcss} ${chalk.green('success')}`);
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
                static root() {
                    var appDir = slash_1.default(path_1.default.dirname(require.main.filename)).toString();
                    if (/\/libs\/compiler$/s.test(appDir)) {
                        var split = appDir.split('/');
                        split = split.slice(0, -2);
                        appDir = split.join('/');
                    }
                    return appDir;
                }
                static minify_folder(folder) {
                    var self = this;
                    var js = new Array();
                    fs_1.default.exists(folder, function (exists) {
                        if (exists && fs_1.default.lstatSync(folder).isDirectory()) {
                            var read = self.readdir(folder, []);
                            if (Array.isArray(read)) {
                                read.forEach(file => {
                                    if (!/\.min\.js$/s.test(file) && /\.js$/s.test(file)) {
                                        js.push(file);
                                    }
                                });
                                js.unique().forEach(function (file) {
                                    if (file)
                                        self.minJS(file);
                                });
                            }
                        }
                    });
                }
                static obfuscate(filejs) {
                    if (!/\.obfuscated\.js$/s.test(filejs) && filejs.endsWith('.js')) {
                        var output = filejs.replace(/\.js/s, '.obfuscated.js');
                        fs_1.default.readFile(filejs, {
                            encoding: "utf-8"
                        }, function (err, data) {
                            if (!err) {
                                var obfuscationResult = javascript_obfuscator_1.default.obfuscate(data, {
                                    compact: true,
                                    controlFlowFlattening: true
                                });
                                fs_1.default.writeFileSync(output, obfuscationResult.getObfuscatedCode());
                            }
                        });
                    }
                }
                static minJS(file) {
                    if (!file) {
                        return;
                    }
                    var self = this;
                    if (/\.min\.js$/s.test(file) || !/\.js$/s.test(file)) {
                        fancy_log_1.default(chalk.red(`${file} minJS Not Allowed`));
                        return;
                    }
                    var min = file.replace(/\.js$/s, '.min.js');
                    fs_1.default.readFile(file, {
                        encoding: 'utf-8'
                    }, function (err, data) {
                        if (!err) {
                            fs_1.default.writeFile(min, data, function (err) {
                                if (err) {
                                    console.error(err);
                                }
                                else {
                                    const terserResult = terser_1.default.minify(fs_1.default.readFileSync(min, 'utf8'), {
                                        "parse": {
                                            "ecma": 8
                                        },
                                        "compress": {
                                            "ecma": 5,
                                            "warnings": false,
                                            "arrows": false,
                                            "collapse_vars": false,
                                            "comparisons": false,
                                            "computed_props": false,
                                            "hoist_funs": false,
                                            "hoist_props": false,
                                            "hoist_vars": false,
                                            "inline": false,
                                            "loops": false,
                                            "negate_iife": false,
                                            "properties": false,
                                            "reduce_funcs": false,
                                            "reduce_vars": false,
                                            "switches": false,
                                            "toplevel": false,
                                            "typeofs": false,
                                            "booleans": true,
                                            "if_return": true,
                                            "sequences": true,
                                            "unused": true,
                                            "conditionals": true,
                                            "dead_code": true,
                                            "evaluate": true
                                        },
                                        "mangle": {
                                            "safari10": true
                                        },
                                        "output": {
                                            "ecma": 5,
                                            "comments": false,
                                            "ascii_only": true
                                        }
                                    });
                                    var input = slash_1.default(file).replace(self.root(), '');
                                    var output = slash_1.default(min).replace(self.root(), '');
                                    if (terserResult.error) {
                                        fancy_log_1.default(`${chalk.yellow(input)} > ${chalk.yellowBright(output)} ${chalk.red('fail')}`);
                                        fs_1.default.exists(min, function (ex) {
                                            if (ex) {
                                                fs_1.default.unlinkSync(min);
                                                fancy_log_1.default(`${chalk.yellowBright(min)} ${chalk.redBright('deleted')}`);
                                            }
                                        });
                                    }
                                    else {
                                        fs_1.default.writeFileSync(min, terserResult.code, 'utf8');
                                        fancy_log_1.default(`${chalk.yellow(input)} > ${chalk.yellowBright(output)} ${chalk.green('success')}`);
                                    }
                                }
                            });
                        }
                        else {
                            fancy_log_1.default(err);
                        }
                    });
                }
                static unlink(file) {
                    var self = this;
                    fs_1.default.exists(file, function (exists) {
                        if (exists) {
                            fs_1.default.unlink(file, function (err) {
                                if (!err) {
                                    file = slash_1.default(file).replace(self.root(), '');
                                    fancy_log_1.default(`${chalk.whiteBright(file)} ${chalk.redBright('deleted')}`);
                                }
                            });
                        }
                    });
                }
                static normalize(path) {
                    return typeof slash_1.default(path) == 'string' ? slash_1.default(path).replace(/\/{2,99}/s, '/') : null;
                }
                static isWin() {
                    return process.platform === "win32";
                }
                static minCSS(file, callback) {
                    fs_1.default.exists(file, function (exists) {
                        if (exists && !/\.min\.css$/s.test(file) && /\.css$/s.test(file)) {
                            var min = file.replace(/\.css/s, '.min.css');
                            fs_1.default.readFile(file, {
                                encoding: 'utf-8'
                            }, function (err, data) {
                                if (!err) {
                                    fs_1.default.writeFile(min, data, function (err) {
                                        if (!err) {
                                            var minified = uglifycss_1.default.processFiles([min], {
                                                maxLineLen: 500,
                                                expandVars: true
                                            });
                                            fs_1.default.writeFile(min, minified, {
                                                encoding: "utf-8"
                                            }, function (err) {
                                                if (!err) {
                                                    if (typeof callback != 'function') {
                                                        file = file.replace(core.root(), '');
                                                        min = min.replace(core.root(), '');
                                                        fancy_log_1.default(`${chalk.blueBright(file)} > ${chalk.blueBright(min)} ${chalk.green('success')}`);
                                                    }
                                                    else {
                                                        callback(true, file, min);
                                                    }
                                                }
                                            });
                                        }
                                        else {
                                            fancy_log_1.default(chalk.red(err));
                                        }
                                    });
                                }
                                else {
                                    fancy_log_1.default(chalk.red(err));
                                }
                            });
                        }
                    });
                }
            };
            module.exports = core;
        }
    };
});
System.register("log", ["fancy-log", "chalk"], function (exports_2, context_2) {
    "use strict";
    var fancy_log_2, chalk, log;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (fancy_log_2_1) {
                fancy_log_2 = fancy_log_2_1;
            },
            function (chalk_2) {
                chalk = chalk_2;
            }
        ],
        execute: function () {
            log = class log {
                constructor() {
                    if (arguments.length) {
                        log.log(arguments);
                    }
                }
                static hexColor() {
                    return Math.floor(Math.random() * 16777215).toString(16);
                }
                static log(...arg) {
                    if (arguments.length) {
                        var result = [];
                        for (const key in arguments) {
                            if (arguments.hasOwnProperty(key)) {
                                var args = arguments[key];
                                if (typeof args == 'boolean') {
                                    if (args) {
                                        args = chalk.greenBright(args);
                                    }
                                    else {
                                        args = chalk.redBright(args);
                                    }
                                }
                                result.push(args);
                            }
                        }
                        fancy_log_2.default(result.join(', '));
                    }
                }
            };
            log.enable_rainbow = false;
            log.rainbow = function (want) {
                log.enable_rainbow = want;
            };
            module.exports = log;
        }
    };
});
//# sourceMappingURL=core.js.map