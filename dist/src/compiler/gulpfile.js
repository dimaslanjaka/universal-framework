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
            compiler_runner = null;
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
                        if (compiler_runner != null) {
                            log_1.default.log(log_1.default.error("Compiler still running"));
                        }
                        else {
                            compiler_runner = setTimeout(function () {
                                gulpfile_app_1.createApp(true);
                                compiler_runner = null;
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