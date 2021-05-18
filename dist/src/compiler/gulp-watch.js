"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reload_gulp = exports.gulpWatch = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var config_1 = tslib_1.__importDefault(require("../compiler/config"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var child_process_1 = require("child_process");
// noinspection ES6PreferShortImport
var gulpfile_app_1 = require("./gulpfile-app");
// noinspection ES6PreferShortImport
require("../node-localstorage/src/index");
var gulpfile_compiler_1 = require("./gulpfile-compiler");
require("../../js/_Prototype-Array");
function gulpWatch() {
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
                    if (localStorage.getItem("watch"))
                        return trigger();
                })];
        });
    });
}
exports.gulpWatch = gulpWatch;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscC13YXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2d1bHAtd2F0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGlEQUE2QjtBQUM3QixzRUFBd0M7QUFDeEMsd0RBQTBCO0FBQzFCLHNEQUF3QjtBQUN4QixvRUFBMEM7QUFDMUMsZ0VBQWtDO0FBQ2xDLHdFQUEwQztBQUMxQywrQ0FBc0U7QUFDdEUsb0NBQW9DO0FBQ3BDLCtDQUEyQztBQUMzQyxvQ0FBb0M7QUFDcEMsMENBQXdDO0FBQ3hDLHlEQUFvRDtBQUNwRCxxQ0FBbUM7QUFFbkMsU0FBc0IsU0FBUzs7OztZQUM3QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDVixLQUFLLEdBQUc7Z0JBQ1osZ0JBQWdCO2dCQUNoQixpQkFBaUI7Z0JBQ2pCLGdCQUFnQjtnQkFDaEIsWUFBWTtnQkFDWixJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU87YUFDbEMsQ0FBQztZQUVGLGFBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQ3RCLEtBQUs7cUJBQ0YsR0FBRyxDQUFDLFVBQVUsSUFBSTtvQkFDakIsT0FBTyxhQUFHLENBQUMsTUFBTSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDZixDQUFDO1lBRUUsV0FBVyxHQUFtQixJQUFJLENBQUM7WUFDdkMsc0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLElBQW9EO29CQUN4RyxJQUFNLE9BQU8sR0FBRzt3QkFDZCxJQUFJLEdBQUcsZUFBUyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUMsT0FB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