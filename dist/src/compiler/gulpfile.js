"use strict";
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
var index_2 = require("../node-localstorage/index");
var proc = tslib_1.__importStar(require("process"));
var gulpfile_app_1 = require("./gulpfile-app");
var gulpfile_compiler_1 = require("./gulpfile-compiler");
var gulpfile_doc_1 = require("./gulpfile-doc");
var func_1 = require("./func");
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
    return gulpfile_app_1.createApp(withoutApp ? true : false);
}
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
    catch (error) { }
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
                                gulpfile_app_1.createApp(true);
                                compiler_runner = null;
                            }, 5000);
                        }
                        // run documentation builder
                        //doc();
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
//gulp.task("reload", reload_gulp);
gulp.task("default", gulp.series(["build", "watch"]));
/**
 * Create Documentation of javascripts
 */
gulp.task("doc", gulpfile_doc_1.doc);
/**
 * Reload Gulp
 * @param cb
 * @returns
 */
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
            child_process_1.spawn(proc.argv[0], proc.argv.slice(1), {
                env: { process_restarting: "1" },
                stdio: "ignore",
            }).unref();
            return [2 /*return*/];
        });
    });
}
index_2.localStorage.removeItem("compile");
module.exports = gulp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE2QjtBQUM3QixzRUFBd0M7QUFDeEMsd0RBQTBCO0FBQzFCLHNEQUF3QjtBQUN4QixvRUFBMEM7QUFDMUMsZ0VBQWtDO0FBQ2xDLHdFQUEwQztBQUMxQyw2Q0FBeUI7QUFDekIsK0NBQStDO0FBQy9DLHFDQUFxQztBQUNyQywrQ0FBc0M7QUFDdEMsb0RBQTBEO0FBQzFELG9EQUFnQztBQUNoQywrQ0FBMkM7QUFDM0MseURBQW9EO0FBQ3BELCtDQUFxQztBQUNyQywrQkFBaUM7QUFFakMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUIsb0JBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRWhCOzs7R0FHRztBQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2pCLE9BQU8sS0FBSyxFQUFFLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtJQUN2QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQztBQUVIOzs7R0FHRztBQUNILFNBQVMsS0FBSyxDQUFDLFVBQW9CO0lBQ2pDLE9BQU8sd0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVELFNBQVMsVUFBVTtJQUNqQixJQUFJO1FBQ0YsSUFBSSxXQUFXLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUN6QyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxR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