"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reload_gulp = exports.watch2 = exports.gulpWatch = void 0;
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
                                                        reload_gulp();
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function reload_gulp(cb) {
    if (cb === void 0) { cb = null; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var children, cleanExit, out, err;
        return tslib_1.__generator(this, function (_a) {
            //spawn("gulp", ["watch"], { stdio: "inherit" });
            //process.exit();
            if (process.env.process_restarting) {
                delete process.env.process_restarting;
                // Give old process one second to shut down before continuing ...
                reload_timeout = setTimeout(reload_gulp, 1000);
                //reload_gulp();
                process.exit();
            }
            console.clear();
            console.log("reloading gulp");
            children = [];
            process.on("exit", function () {
                console.log("killing", children.length, "child processes");
                children.forEach(function (child) {
                    child.kill();
                });
            });
            cleanExit = function () {
                process.exit();
            };
            process.on("SIGINT", cleanExit); // catch ctrl-c
            process.on("SIGTERM", cleanExit); // catch kill
            // Restart process ...
            if (!children.isEmpty()) {
                children[0].kill();
                children.shift();
            }
            children.push(child_process_1.spawn(process.argv[0], process.argv.slice(1), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLHNFQUF3QztBQUN4Qyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsNENBQTRDO0FBQzVDLCtDQUFzRTtBQUN0RSxvQ0FBb0M7QUFDcEMsK0NBQStEO0FBQy9ELG9DQUFvQztBQUNwQywwQ0FBd0M7QUFDeEMseURBQW9EO0FBQ3BELHFDQUFtQztBQUVuQyxTQUFzQixTQUFTOzs7O1lBQzdCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNWLEtBQUssR0FBRztnQkFDWixnQkFBZ0I7Z0JBQ2hCLGlCQUFpQjtnQkFDakIsZ0JBQWdCO2dCQUNoQixZQUFZO2dCQUNaLElBQUksR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsT0FBTzthQUNsQyxDQUFDO1lBRUYsYUFBRyxDQUFDLEdBQUcsQ0FDTCxhQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsS0FBSztxQkFDRixHQUFHLENBQUMsVUFBVSxJQUFJO29CQUNqQixPQUFPLGFBQUcsQ0FBQyxNQUFNLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUM7cUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNmLENBQUM7WUFFRSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxJQUFvRDtvQkFDeEcsSUFBTSxPQUFPLEdBQUc7d0JBQ2QsSUFBSSxHQUFHLGVBQVMsQ0FBQyxTQUFTLENBQUMsY0FBSSxD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