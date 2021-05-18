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
var proc = tslib_1.__importStar(require("process"));
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
                            var isCompiler = /[\/\\]libs[\/\\]src[\/\\]compiler[\/\\]/gm.test(file);
                            /**
                             * Exclude framework.js app.js and map js
                             */
                            var isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
                            var isFormsaver = /[\/\\]libs[\/\\]smarform[\/\\]/gm.test(file);
                            if (isFramework)
                                return;
                            if (watch_timer == null) {
                                log_1.default.log(log_1.default.random("Library compiler triggered by ") + log_1.default.random(index_1.default.filelog(file)));
                                log_1.default.log(log_1.default.chalk().yellow("start compile " + log_1.default.random("src/MVC/themes/assets/js")));
                                watch_timer = setTimeout(function () {
                                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                                        var filename;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, gulpfile_app_1.createApp(true)];
                                                case 1:
                                                    _a.sent();
                                                    watch_timer = null;
                                                    filename = path_1.default.basename(file.toString());
                                                    if (!filename.startsWith("gulpfile")) return [3 /*break*/, 3];
                                                    // TODO: reload gulp
                                                    return [4 /*yield*/, reload_gulp()];
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
function reload_gulp() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var children, cleanExit, out, err;
        return tslib_1.__generator(this, function (_a) {
            //spawn("gulp", ["watch"], { stdio: "inherit" });
            //proc.exit();
            if (proc.env.process_restarting) {
                delete proc.env.process_restarting;
                // Give old process one second to shut down before continuing ...
                reload_timeout = setTimeout(reload_gulp, 1000);
                //reload_gulp();
                //proc.exit();
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
                if (typeof children[0] != "undefined") {
                    children[0].kill();
                }
            }
            children.push(child_process_1.spawn(proc.argv[0], proc.argv.slice(1), {
                env: { process_restarting: "1" },
                //stdio: "ignore",
                detached: true,
                stdio: ["ignore", out, err],
            }) //.unref()
            );
            return [2 /*return*/];
        });
    });
}
exports.reload_gulp = reload_gulp;
index_2.localStorage.removeItem("compile");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0RBQWdEOzs7O0FBRWhELGlEQUE2QjtBQUM3QixzRUFBd0M7QUFDeEMsd0RBQTBCO0FBQzFCLHNEQUF3QjtBQUN4QixvRUFBMEM7QUFDMUMsZ0VBQWtDO0FBQ2xDLHdFQUEwQztBQUMxQyw2Q0FBeUI7QUFDekIsK0NBQStDO0FBQy9DLHFDQUFxQztBQUNyQywrQ0FBc0U7QUFDdEUsb0NBQW9DO0FBQ3BDLG9EQUEwRDtBQUMxRCxvREFBZ0M7QUFDaEMsK0NBQTJDO0FBQzNDLHlEQUFvRDtBQUNwRCwrQ0FBcUM7QUFDckMsK0JBQWlDO0FBQ2pDLHFDQUFtQztBQUVuQyxJQUFNLElBQUksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQztBQUUxQixvQkFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFaEI7OztHQUdHO0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7SUFDakIsT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO0lBQ3ZCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBRUg7OztHQUdHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLFVBQW9CO0lBQ3hDLE9BQU8sd0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRkQsc0JBRUM7QUFFRCxTQUFnQixVQUFVO0lBQ3hCLElBQUk7UUFDRixJQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzNDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFB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