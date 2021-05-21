"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process_restarter = exports.reload_gulp = exports.watch2 = exports.gulpWatch = void 0;
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
                    return trigger();
                    //if (localStorage.getItem("watch"))
                })];
        });
    });
}
exports.gulpWatch = gulpWatch;
function watch2(done) {
    gulp.watch(["./src/MVC/**/*", "./etc/**/*", "./" + config_1.default.app.views + "/**/*"], function (done) {
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
    gulp.watch(["./libs/js/**/*", "./libs/src/**/*"], function (done) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, gulpfile_app_1.createApp(true)];
                    case 1:
                        _a.sent();
                        process_restarter();
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
//var spawn = require("child_process").spawn;
function process_restarter() {
    if (process_1.default.core.env.hasOwnProperty("process_restarting")) {
        console.log("restarting...");
        delete process_1.default.core.env.process_restarting;
        // Give old process one second to shut down before continuing ...
        setTimeout(process_restarter, 1000);
        return;
    }
    // ...
    // Restart process ...
    child_process_1.spawn(process_1.default.core.argv[0], process_1.default.core.argv.slice(1), {
        env: { process_restarting: "1" },
        stdio: "ignore",
        detached: true,
    }).unref();
}
exports.process_restarter = process_restarter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLHNFQUF3QztBQUN4Qyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsd0VBQTBDO0FBQzFDLCtDQUFzRTtBQUN0RSxvQ0FBb0M7QUFDcEMsK0NBQStEO0FBQy9ELG9DQUFvQztBQUNwQywwQ0FBd0M7QUFDeEMseURBQW9EO0FBQ3BELHFDQUFtQztBQUVuQyxTQUFzQixTQUFTOzs7O1lBQzdCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNWLEtBQUssR0FBRztnQkFDWixnQkFBZ0I7Z0JBQ2hCLGlCQUFpQjtnQkFDakIsZ0JBQWdCO2dCQUNoQixZQUFZO2dCQUNaLElBQUksR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsT0FBTzthQUNsQyxDQUFDO1lBRUYsYUFBRyxDQUFDLEdBQUcsQ0FDTCxhQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsS0FBSztxQkFDRixHQUFHLENBQUMsVUFBVSxJQUFJO29CQUNqQixPQUFPLGFBQUcsQ0FBQyxNQUFNLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUM7cUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNmLENBQUM7WUFFRSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxJQUFvRDtvQkFDeEcsSUFBTSxPQUFPLEdBQUc7d0JBQ2QsSUFBSSxHQUFHLGVBQVMsQ0FBQyxTQUFTLENBQUMsY0FBSSxD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