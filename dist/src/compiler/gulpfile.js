"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescriptCompiler = exports.single_tsCompile = exports.createApp = exports.multiMinify = exports.views = exports.compileAssets = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_typescript_1 = tslib_1.__importDefault(require("gulp-typescript"));
var fs = tslib_1.__importStar(require("fs"));
var config_1 = tslib_1.__importDefault(require("../compiler/config"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var root = process_1.default.root;
var gulp_jsdoc3_1 = tslib_1.__importDefault(require("gulp-jsdoc3"));
var child_process_1 = require("child_process");
var index_2 = require("../node-localstorage/index");
var func_1 = require("./func");
//const spawn = require("child_process").spawn;
//const argv = require("yargs").argv;
var child_process_2 = require("child_process");
var proc = tslib_1.__importStar(require("process"));
index_2.localStorage.removeItem("compile");
console.clear();
/**
 * Create Documentation of javascripts
 */
gulp.task("doc", doc);
/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task("build", function () {
    return build();
});
gulp.task("build-clear", function () {
    return build(true);
});
/**
 * Build Project
 * @param withoutApp
 */
function build(withoutApp) {
    try {
        var packageJson = root + "/package.json";
        if (fs.existsSync(packageJson)) {
            var json_pkg = JSON.parse(fs.readFileSync(packageJson).toString());
            func_1.fixDeps(json_pkg).then(function (json) {
                fs.writeFileSync(root + "/package.json", JSON.stringify(json, null, 2), {
                    encoding: "utf-8",
                });
            });
        }
    }
    catch (error) { }
    return createApp(withoutApp ? true : false);
}
// watch libs/js/**/* and views
gulp.task("watch", function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var files, compiler_runner, run_watch;
        return tslib_1.__generator(this, function (_a) {
            console.clear();
            files = [
                "./libs/js/**/*",
                "./libs/src/**/*",
                "./src/MVC/**/*",
                "./etc/**/*",
                "./" + config_1.default.app.views + "/**/*",
            ];
            log_1.default.log(log_1.default.random("Listening ") +
                files
                    .map(function (item) {
                    return log_1.default.random(upath_1.default.resolve(item));
                })
                    .join(" "));
            compiler_runner = false;
            run_watch = gulp
                .watch(files, null)
                .on("change", function (file) {
                var trigger = function () {
                    file = index_1.default.normalize(path_1.default.resolve(file.toString()));
                    /**
                     * Check is library compiler or source compiler
                     */
                    var is_Lib = /libs\/(js|src)\//s.test(index_1.default.normalize(file));
                    var filename_log = index_1.default.filelog(file);
                    if (is_Lib) {
                        var isCompiler = file.includes("/libs/compiler/");
                        var isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
                        if (isCompiler || isFramework)
                            return;
                        //console.log(file, isFramework);
                        log_1.default.log(log_1.default.random("Library compiler triggered by ") +
                            log_1.default.random(index_1.default.filelog(file)));
                        log_1.default.log(log_1.default
                            .chalk()
                            .yellow("start compile " + log_1.default.random("src/MVC/themes/assets/js")));
                        if (compiler_runner) {
                            log_1.default.log(log_1.default.error("Compiler still running"));
                        }
                        else {
                            compiler_runner = setTimeout(function () {
                                createApp(true);
                                compiler_runner = null;
                            }, 5000);
                        }
                        // run documentation builder
                        //doc();
                    }
                    else {
                        if (/\.(js|scss|css|less)$/s.test(file)) {
                            if (!/\.min\.(js|css)$/s.test(file)) {
                                compileAssets(file);
                            }
                        }
                        else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
                            if (!/libs\/|libs\\/s.test(file)) {
                                single_tsCompile(file);
                            }
                        }
                        else if (file.endsWith(".browserify")) {
                            index_1.default.browserify(file);
                        }
                        else {
                            var reason = log_1.default.error("undefined");
                            if (/\.(php|log|txt|htaccess|log)$/s.test(filename_log)) {
                                reason = log_1.default.random("Excluded");
                            }
                            else if (/\.(d\.ts)$/s.test(filename_log)) {
                                reason = log_1.default.random("Typehint");
                            }
                            log_1.default.log("[" + reason + "] cannot modify " + log_1.default.random(filename_log));
                        }
                    }
                };
                return trigger();
            });
            return [2 /*return*/, run_watch];
        });
    });
});
gulp.task("assets-compile", function () {
    function filter(views) {
        return views
            .filter(function (item) {
            return (/\.(js|scss|css|sass|less)$/.test(item) &&
                !/\.min\.(js|css)$/.test(item) &&
                !/\-ori|\-original|\-backup|\.bak/s.test(item));
        })
            .map(function (asset) {
            return index_1.default.normalize(asset);
        });
    }
    var css = index_1.default.readdir(root + "/assets/css");
    css = filter(css);
    var js = index_1.default.readdir(root + "/assets/js");
    js = filter(js);
});
gulp.task("reload", reload_gulp);
gulp.task("default", gulp.series(["build", "watch"]));
/**
 * ```regex
 * \\.(jsx|js|ts|tsx|js(doc|x)?)$
 * ```
 * @param cb function callback
 */
function doc(cb) {
    if (cb === void 0) { cb = null; }
    /*const config = {
      recurseDepth: 10,
      opts: {
        template: "node_modules/better-docs",
      },
      tags: {
        allowUnknownTags: true,
        dictionaries: ["jsdoc", "closure"],
      },
      plugins: [
        "node_modules/better-docs/typescript",
        "node_modules/better-docs/category",
        "node_modules/better-docs/component",
        "plugins/markdown",
        "plugins/summarize",
      ],
      source: {
        includePattern: "\\.(jsx|js|ts|tsx|js(doc|x)?)$",
        ///include: ["./libs"],
        //exclude: ["./src"],
      },
    };*/
    var config = {
        tags: {
            allowUnknownTags: true,
            dictionaries: ["jsdoc", "closure"],
        },
        source: {
            include: ["./libs"],
            includePattern: ".js$",
            excludePattern: "(node_modules|docs)",
        },
        plugins: [
            "plugins/markdown",
            "jsdoc-mermaid",
            "node_modules/better-docs/typescript",
            "node_modules/better-docs/category",
            "node_modules/better-docs/component",
            "node_modules/better-docs/typedef-import",
        ],
        opts: {
            encoding: "utf8",
            destination: root + "/docs/js/",
            readme: "readme.md",
            recurse: true,
            verbose: true,
            //tutorials: "./docs-src/tutorials",
            template: "better-docs",
        },
        templates: {
            cleverLinks: false,
            monospaceLinks: false,
            search: true,
            default: {
                staticFiles: {
                //include: ["./docs-src/statics"],
                },
            },
            "better-docs": {
                name: "Universal Framework Javascript Documentation",
                //logo: "images/logo.png",
                title: "Universal Framework Javascript Documentation",
                //css: "style.css",
                trackingCode: "tracking-code-which-will-go-to-the-HEAD",
                hideGenerator: false,
                navLinks: [
                    {
                        label: "Github",
                        href: "https://github.com/dimaslanjaka/universal-framework",
                    },
                    {
                        label: "Example Application",
                        href: "http://github.com/dimaslanjaka/universal-framework",
                    },
                ],
            },
        },
    };
    gulp
        .src(["./libs/**/*.(js|ts|tsx|js(doc|x)?)$"], {
        read: false,
    })
        .pipe(gulp_jsdoc3_1.default(config, cb));
}
function reload_gulp(cb) {
    if (cb === void 0) { cb = null; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            //spawn("gulp", ["watch"], { stdio: "inherit" });
            //proc.exit();
            if (proc.env.process_restarting) {
                delete proc.env.process_restarting;
                // Give old process one second to shut down before continuing ...
                setTimeout(reload_gulp, 1000);
                //reload_gulp();
                //proc.exit();
                return [2 /*return*/];
            }
            console.log("reloading gulp");
            //console.log(proc.argv[0]);
            //console.log(proc.argv.slice(1));
            // Restart process ...
            child_process_2.spawn(proc.argv[0], proc.argv.slice(1), {
                env: { process_restarting: "1" },
                stdio: "ignore",
            }).unref();
            return [2 /*return*/];
        });
    });
}
/**
 * compile and minify assets
 * @param item file full path
 */
function compileAssets(item) {
    var exists = fs.existsSync(item);
    if (exists) {
        item = item.toString();
        var config = upath_1.default.normalizeSafe(root + "/src/MVC/config/" + item.replace(index_1.default.root(), ""));
        config = index_1.default.normalize(index_1.default.root() + config);
        config = config.replace(/\.(js|css)/s, ".json");
        if (fs.existsSync(config)) {
            config = require(config);
        }
        if (item.endsWith(".less") && !item.endsWith(".min.less")) {
            //console.log(`Compiling LESS ${framework.filelog(item)}`);
            index_1.default.less(item);
        }
        else if (item.endsWith(".scss") && !item.endsWith(".min.scss")) {
            //console.log(`Compiling SCSS ${framework.filelog(item)}`);
            index_1.default.scss(item);
        }
        else if (item.endsWith(".css") && !item.endsWith(".min.css")) {
            //console.log(`Minify CSS ${framework.filelog(item)}`);
            index_1.default.minCSS(item);
        }
        else if (item.endsWith(".js") && !item.endsWith(".min.js")) {
            if (!item.endsWith(".babel.js")) {
                //console.log(`Minify JS ${framework.filelog(item)}`);
                index_1.default.minJS(item);
                var deleteObfuscated = false;
                if (typeof config == "object") {
                    if (config.hasOwnProperty("obfuscate")) {
                        if (config.obfuscate) {
                            //console.log(`Obfuscating JS ${framework.filelog(item)}`);
                            index_1.default.obfuscate(item);
                        }
                        else {
                            deleteObfuscated = true;
                        }
                    }
                    else {
                        deleteObfuscated = true;
                    }
                }
                if (deleteObfuscated) {
                    var obfuscatedjs = item.replace(/\.js$/s, ".obfuscated.js");
                    var obfuscatedminjs = item.replace(/\.js$/s, ".obfuscated.min.js");
                    index_1.default.unlink(obfuscatedjs);
                    index_1.default.unlink(obfuscatedminjs);
                }
            }
        }
        else if (item.endsWith(".ts") && !item.endsWith(".d.ts")) {
            if (!/libs\/|libs\\/s.test(item)) {
                single_tsCompile(item);
            }
        }
    }
}
exports.compileAssets = compileAssets;
/**
 * List views folder
 */
function views() {
    var views = index_1.default.readdir(root + ("/" + config_1.default.app.views));
    return views
        .filter(function (item) {
        return (/\.(js|scss|css|sass|less)$/.test(item) &&
            !/\.min\.(js|css)$/.test(item) &&
            !/\-ori|\-original|\-backup|\.bak/s.test(item));
    })
        .map(function (asset) {
        return index_1.default.normalize(asset);
    });
}
exports.views = views;
/**
 * compileAssets multiple assets
 * @param assets
 */
function multiMinify(assets) {
    assets.map(compileAssets);
}
exports.multiMinify = multiMinify;
index_2.localStorage.removeItem("compile");
var isFirstExecute = true;
/**
 * Create App.js
 * @param withoutView false to not compile views javascripts
 */
function createApp(withoutView) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var exists, target, appjs;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exists = index_2.localStorage.getItem("compile");
                    if (!!exists) return [3 /*break*/, 7];
                    index_2.localStorage.setItem("compile", "running");
                    target = upath_1.default.normalizeSafe(upath_1.default.resolve(upath_1.default.join(root, "src/MVC/themes/assets/js/app.js")));
                    return [4 /*yield*/, typescriptCompiler("tsconfig.build.json", root + "/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, typescriptCompiler("tsconfig.precompiler.json", root + "/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, typescriptCompiler("tsconfig.compiler.json", root + "/libs/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 3:
                    _a.sent();
                    //await node2browser(target, path.dirname(target));
                    return [4 /*yield*/, compileAssets(target)];
                case 4:
                    //await node2browser(target, path.dirname(target));
                    _a.sent();
                    if (!!withoutView) return [3 /*break*/, 6];
                    return [4 /*yield*/, multiMinify(views())];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    appjs = path_1.default.join(root, "src/MVC/themes/assets/js/app.js");
                    child_process_1.exec("browserify " + appjs + " -o " + appjs);
                    index_2.localStorage.removeItem("compile");
                    /*execute(
                      "browserify --standalone Bundle ./src/MVC/themes/assets/js/app.js -o ./src/MVC/themes/assets/js/app.min.js && browserify --standalone Bundle ./src/MVC/themes/assets/js/app.js -o ./src/MVC/themes/assets/js/app.js"
                    );*/
                    if (!isFirstExecute) {
                        // reload gulp
                        //reload_gulp();
                    }
                    isFirstExecute = false;
                    return [3 /*break*/, 8];
                case 7:
                    log_1.default.log(log_1.default.error("Compiler lock process already exists ") +
                        log_1.default.chalk().yellow("node index.js fix") +
                        log_1.default.chalk().green(" to fix it"));
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.createApp = createApp;
/**
 * Single Typescript Compiler
 * @param target
 * @todo universal-framework typescript compiler support
 */
function single_tsCompile(target) {
    var targetlog = log_1.default.chalk().magentaBright(index_1.default.filelog(target));
    if (target.endsWith(".d.ts")) {
        log_1.default.log(targetlog + " is declaration file");
        return;
    }
    var dest = path_1.default.dirname(target);
    log_1.default.log(targetlog + " > " + log_1.default
        .chalk()
        .yellow(index_1.default.filelog(target.replace(/\.ts$/, ".js"))) + " start");
    var tsProject = gulp_typescript_1.default.createProject({
        declaration: false,
        skipLibCheck: true,
    });
    return gulp.src(target).pipe(tsProject()).pipe(gulp.dest(dest));
}
exports.single_tsCompile = single_tsCompile;
/**
 * Typescript compiler
 * @param source
 * @param destination
 * @param callback
 */
function typescriptCompiler(source, destination, callback) {
    if (callback === void 0) { callback = null; }
    return new Promise(function (resolve, reject) {
        child_process_1.exec("tsc -p " + source, function (err, stdout, stderr) {
            if (!err) {
                if (typeof callback == "function") {
                    callback(source, destination);
                }
                if (stdout.trim().length) {
                    console.log(stdout);
                }
                if (stderr.trim().length) {
                    console.log(stderr);
                }
                log_1.default.log(log_1.default.random("successfully compiled ") +
                    log_1.default.success(path_1.default.basename(source)));
                resolve();
            }
            else {
                log_1.default.log(log_1.default.random("failed compile ") + log_1.default.error(path_1.default.basename(source)));
                reject(err.message);
            }
        });
    });
}
exports.typescriptCompiler = typescriptCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLDRFQUFpQztBQUNqQyw2Q0FBeUI7QUFDekIsc0VBQXdDO0FBQ3hDLHdEQUEwQjtBQUMxQixzREFBd0I7QUFDeEIsb0VBQTBDO0FBQzFDLGdFQUFrQztBQUNsQyx3RUFBMEM7QUFDMUMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFDMUIsb0VBQWdDO0FBQ2hDLCtDQUFvRDtBQUNwRCxvREFBMEQ7QUFDMUQsK0JBQWlDO0FBQ2pDLCtDQUErQztBQUMvQyxxQ0FBcUM7QUFDckMsK0NBQXNDO0FBQ3RDLG9EQUFnQztBQUVoQyxvQkFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFaEI7O0dBRUc7QUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUV0Qjs7O0dBR0c7QUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUNqQixPQUFPLEtBQUssRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7SUFDdkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxTQUFTLEtBQUssQ0FBQyxVQUFvQjtJQUNqQyxJQUFJO1FBQ0YsSUFBSSxXQUFXLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUN6QyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMs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