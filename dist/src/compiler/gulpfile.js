"use strict";
// noinspection RegExpDuplicateAlternationBranch
Object.defineProperty(exports, "__esModule", { value: true });
exports.reload_gulp = exports.reorderPkg = exports.build = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var config_1 = tslib_1.__importDefault(require("../compiler/config"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var fs = tslib_1.__importStar(require("fs"));
//const spawn = require("child_process").spawn;
//const argv = require("yargs").argv;
var child_process_1 = require("child_process");
// noinspection ES6PreferShortImport
var index_2 = require("../node-localstorage/index");
var gulpfile_app_1 = require("./gulpfile-app");
var gulpfile_compiler_1 = require("./gulpfile-compiler");
var gulpfile_doc_1 = require("./gulpfile-doc");
var func_1 = require("./func");
require("../../js/_Prototype-Array");
var root = process_1.default.root;
index_2.localStorage.removeItem("compile");
console.clear();
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
    return gulpfile_app_1.createApp(withoutApp);
}
exports.build = build;
function reorderPkg() {
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
    catch (error) {
        console.error(error);
    }
}
exports.reorderPkg = reorderPkg;
// watch libs/js/**/* and views
gulp.task("watch", function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var files, watch_timer;
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
            watch_timer = null;
            return [2 /*return*/, gulp.watch(files, null).on("change", function (file) {
                    var trigger = function () {
                        file = index_1.default.normalize(path_1.default.resolve(file.toString()));
                        /**
                         * Check is library compiler or source compiler
                         */
                        var is_Lib = /libs\/(js|src)\//s.test(index_1.default.normalize(file));
                        var filename_log = index_1.default.filelog(file);
                        if (is_Lib) {
                            var isCompiler_1 = /[\/\\]libs[\/\\]src[\/\\]compiler[\/\\]/s.test(file);
                            /**
                             * Exclude framework.js app.js and map js
                             */
                            var isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
                            var isFormsaver_1 = /[\/\\]libs[\/\\]src[\/\\]smarform[\/\\]/s.test(file);
                            if (isFramework)
                                return;
                            if (watch_timer == null) {
                                log_1.default.log(log_1.default.random("Library compiler triggered by ") + log_1.default.random(index_1.default.filelog(file)));
                                log_1.default.log(log_1.default.chalk().yellow("start compile " + log_1.default.random("src/MVC/themes/assets/js")));
                                watch_timer = setTimeout(function () {
                                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, gulpfile_app_1.createApp(true)];
                                                case 1:
                                                    _a.sent();
                                                    if (!(isCompiler_1 || isFormsaver_1)) return [3 /*break*/, 3];
                                                    // TODO: reload gulp
                                                    return [4 /*yield*/, reload_gulp(function () {
                                                            watch_timer = null;
                                                        })];
                                                case 2:
                                                    // TODO: reload gulp
                                                    _a.sent();
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }, 5000);
                            }
                        }
                        else {
                            if (/\.(js|scss|css|less|ts)$/s.test(file)) {
                                // TODO: Compile js css on change
                                if (!/\.min\.(js|css|ts)$/s.test(file)) {
                                    gulpfile_compiler_1.compileAssets(file);
                                }
                            }
                            else {
                                var reason = log_1.default.error("undefined");
                                if (/\.(php|log|txt|htaccess|log)$/s.test(filename_log)) {
                                    reason = log_1.default.color("brown", "Excluded");
                                }
                                else if (/\.(d\.ts)$/s.test(filename_log)) {
                                    reason = log_1.default.color("cyan", "Typehint");
                                }
                                log_1.default.log("[" + reason + "] cannot modify " + log_1.default.random(filename_log));
                            }
                        }
                    };
                    return trigger();
                })];
        });
    });
});
gulp.task("assets-compile", function () {
    function filter(views) {
        return views
            .filter(function (item) {
            return (/\.(js|scss|css|sass|less)$/.test(item) &&
                !/\.min\.(js|css)$/.test(item) &&
                !/-ori|-original|-backup|\.bak/s.test(item));
        })
            .map(function (asset) {
            return index_1.default.normalize(asset);
        });
    }
    var css = index_1.default.readdir(root + "/assets/css");
    // noinspection JSUnusedAssignment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    css = filter(css);
    var js = index_1.default.readdir(root + "/assets/js");
    // noinspection JSUnusedAssignment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    js = filter(js);
});
gulp.task("default", gulp.series(["build", "watch"]));
/**
 * Create Documentation of javascripts
 */
gulp.task("doc", gulpfile_doc_1.doc);
var reload_timeout = null;
/**
 * Reload Gulp
 * @param cb
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function reload_gulp(cb) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var children, cleanExit, out, err;
        return tslib_1.__generator(this, function (_a) {
            //spawn("gulp", ["watch"], { stdio: "inherit" });
            //process.core.exit();
            if (process_1.default.core.env.process_restarting) {
                delete process_1.default.core.env.process_restarting;
                // Give old process one second to shut down before continuing ...
                reload_timeout = setTimeout(reload_gulp, 1000);
                //reload_gulp();
                process_1.default.core.exit();
                return [2 /*return*/];
            }
            console.clear();
            console.log("reloading gulp");
            children = [];
            process_1.default.core.on("exit", function () {
                console.log("killing", children.length, "child processes");
                children.forEach(function (child) {
                    child.kill();
                });
            });
            cleanExit = function () {
                process_1.default.core.exit();
            };
            process_1.default.core.on("SIGINT", cleanExit); // catch ctrl-c
            process_1.default.core.on("SIGTERM", cleanExit); // catch kill
            // Restart process ...
            if (!children.isEmpty()) {
                children[0].kill();
            }
            children.push(child_process_1.spawn(process_1.default.core.argv[0], process_1.default.core.argv.slice(1), {
                env: { process_restarting: "1" },
                //stdio: "ignore",
                detached: true,
                stdio: ["ignore", out, err],
            }) //.unref()
            );
            children[0].unref();
            if (typeof cb == "function") {
                cb();
            }
            return [2 /*return*/];
        });
    });
}
exports.reload_gulp = reload_gulp;
index_2.localStorage.removeItem("compile");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0RBQWdEOzs7O0FBRWhELGlEQUE2QjtBQUM3QixzRUFBd0M7QUFDeEMsd0RBQTBCO0FBQzFCLHNEQUF3QjtBQUN4QixvRUFBMEM7QUFDMUMsZ0VBQWtDO0FBQ2xDLHdFQUEwQztBQUMxQyw2Q0FBeUI7QUFDekIsK0NBQStDO0FBQy9DLHFDQUFxQztBQUNyQywrQ0FBc0U7QUFDdEUsb0NBQW9DO0FBQ3BDLG9EQUEwRDtBQUMxRCwrQ0FBMkM7QUFDM0MseURBQW9EO0FBQ3BELCtDQUFxQztBQUNyQywrQkFBaUM7QUFDakMscUNBQW1DO0FBRW5DLElBQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsSUFBSSxDQUFDO0FBRTFCLG9CQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUVoQjs7O0dBR0c7QUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUNqQixPQUFPLEtBQUssRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7SUFDdkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxTQUFnQixLQUFLLENBQUMsVUFBb0I7SUFDeEMsT0FBTyx3QkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGRCxzQkFFQztBQUVELFNBQWdCLFVBQVU7SUFDeEIsSUFBSTtRQUNGLElBQU0sV0FBVyxHQUFHLElBQUksR0FBRyxlQUFlLENBQUM7UUFDM0MsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLElBQU0s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