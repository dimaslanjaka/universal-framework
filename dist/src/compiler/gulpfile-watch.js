"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reload_gulp2 = exports.reload_gulp = exports.watch2 = exports.gulpWatch = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var config_1 = tslib_1.__importDefault(require("../compiler/config"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
//import process from "../compiler/process";
var child_process_1 = require("child_process");
// noinspection ES6PreferShortImport
var gulpfile_app_1 = require("./gulpfile-app");
// noinspection ES6PreferShortImport
require("../node-localstorage/src/index");
var gulpfile_compiler_1 = require("./gulpfile-compiler");
require("../../js/_Prototype-Array");
var kill = require("tree-kill");
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
                                                    if (isCompiler_1 || isFormsaver_1) {
                                                        // TODO: reload gulp
                                                        reload_gulp2();
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }, 1000);
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
                    //if (localStorage.getItem("watch"))
                })];
        });
    });
}
exports.gulpWatch = gulpWatch;
function watch2(done) {
    var ext = ".{js|css|sass|less|scss}";
    gulp.watch(["./src/MVC/**/*" + ext, "./etc/**/*" + ext, "./" + config_1.default.app.views + "/**/*" + ext, "**.min" + ext], function (done) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, gulpfile_app_1.multiMinify(gulpfile_app_1.views())];
                    case 1:
                        _a.sent();
                        done();
                        return [2 /*return*/];
                }
            });
        });
    });
    gulp.watch(["./libs/js/**/*" + ext, "./libs/src/**/*" + ext], function (done) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, gulpfile_app_1.createApp(true)];
                    case 1:
                        _a.sent();
                        done();
                        return [2 /*return*/];
                }
            });
        });
    });
    done();
}
exports.watch2 = watch2;
var reload_timeout = null;
function reload_gulp(cb) {
    if (cb === void 0) { cb = null; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var children_kill, children, cleanExit;
        return tslib_1.__generator(this, function (_a) {
            //spawn("gulp", ["watch"], { stdio: "inherit" });
            //process.exit();
            console.info(process.env.process_restarting);
            if (process.env.process_restarting == "1") {
                console.info("restarting...");
                delete process.env.process_restarting;
                // Give old process one second to shut down before continuing ...
                reload_timeout = setTimeout(reload_gulp, 1000);
                //reload_gulp();
                process.exit();
            }
            children_kill = function () {
                children.forEach(function (child) {
                    child.kill();
                    kill(child.pid, "SIGKILL", function (err) {
                        console.error(err);
                    });
                });
            };
            children = [];
            process.on("exit", function () {
                console.log("killing", children.length, "child processes");
                children_kill();
            });
            cleanExit = function () {
                process.exit();
            };
            process.on("SIGINT", cleanExit); // catch ctrl-c
            process.on("SIGTERM", cleanExit); // catch kill
            // Restart process ...
            children_kill();
            children[0] = child_process_1.spawn(process.argv[0], process.argv.slice(1), {
                env: { process_restarting: "1" },
                stdio: "ignore",
                detached: true,
            }); //.unref()
            children[0].unref();
            children[0].stdout.on("data", function (data) {
                console.log("stdout:" + data);
            });
            children[0].stderr.on("data", function (data) {
                console.log("stderr:" + data);
            });
            children[0].stdin.on("data", function (data) {
                console.log("stdin:" + data);
            });
            if (typeof cb == "function") {
                cb();
            }
            return [2 /*return*/];
        });
    });
}
exports.reload_gulp = reload_gulp;
var terminal;
function reload_gulp2() {
    console.log("ENV " + process.env.process_restarting);
    // Give old process one second to shut down before continuing ...
    reload_timeout = setTimeout(function () {
        terminal = child_process_1.spawn(process.argv[0], process.argv.slice(1), {
            env: { process_restarting: "1" },
            stdio: "ignore",
        }).unref();
    }, 1000);
    process.exit();
}
exports.reload_gulp2 = reload_gulp2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLHNFQUF3QztBQUN4Qyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsNENBQTRDO0FBQzVDLCtDQUFzRTtBQUN0RSxvQ0FBb0M7QUFDcEMsK0NBQStEO0FBQy9ELG9DQUFvQztBQUNwQywwQ0FBd0M7QUFDeEMseURBQW9EO0FBQ3BELHFDQUFtQztBQUNuQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFaEMsU0FBc0IsU0FBUzs7OztZQUM3QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDVixLQUFLLEdBQUc7Z0JBQ1osZ0JBQWdCO2dCQUNoQixpQkFBaUI7Z0JBQ2pCLGdCQUFnQjtnQkFDaEIsWUFBWTtnQkFDWixJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU87YUFDbEMsQ0FBQztZQUVGLGFBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQ3RCLEtBQUs7cUJBQ0YsR0FBRyxDQUFDLFVBQVUsSUFBSTtvQkFDakIsT0FBTyxhQUFHLENBQUMsTUFBTSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDZixDQUFDO1lBRUUsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN2QixzQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsSUFBb0Q7b0JBQ3hHLElBQU0sT0FBTyxH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