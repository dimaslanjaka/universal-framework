"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch3 = exports.watch2 = exports.gulpWatch = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var config_1 = require("./config");
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
// noinspection ES6PreferShortImport
var gulpfile_app_1 = require("./gulpfile-app");
// noinspection ES6PreferShortImport
require("../node-localstorage/src/index");
var gulpfile_compiler_1 = require("./gulpfile-compiler");
require("../../js/_Prototype-Array");
var spawner_1 = require("./spawner");
function gulpWatch() {
    console.clear();
    var files = [
        "./libs/js/**/*.{js|ts}",
        "./libs/src/**/*.{js|ts}",
        "./src/MVC/**/*.{js|ts|css|scss|less}",
        "./etc/**/*.{js|ts|css|scss|less}",
        "./" + config_1.config.app.views + "/**/*.{js|ts|css|scss|less}",
    ];
    log_1.default.log(log_1.default.random("Listening ") +
        files
            .map(function (item) {
            return log_1.default.random(upath_1.default.resolve(item));
        })
            .join(" "));
    var watch_timer = null;
    return gulp.watch(files, null).on("change", function (file) {
        var trigger = function () {
            file = index_1.default.normalize(path_1.default.resolve(file.toString()));
            console.info(file + " changed");
            /**
             * Check is library compiler or source compiler
             */
            var is_Lib = /libs\/(js|src)\//s.test(index_1.default.normalize(file));
            var filename_log = index_1.default.filelog(file);
            if (is_Lib) {
                var isCompiler = /[\/\\]libs[\/\\]src[\/\\]compiler[\/\\]/s.test(file);
                /**
                 * Exclude framework.js app.js and map js
                 */
                var isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
                var isFormsaver = /[\/\\]libs[\/\\]src[\/\\]smarform[\/\\]/s.test(file);
                if (isFramework)
                    return;
                if (watch_timer == null) {
                    log_1.default.log(log_1.default.random("Library compiler triggered by ") + log_1.default.random(index_1.default.filelog(file)));
                    log_1.default.log(log_1.default.chalk().yellow("start compile " + log_1.default.random("src/MVC/themes/assets/js")));
                    watch_timer = setTimeout(function () {
                        return tslib_1.__awaiter(this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, gulpfile_app_1.createApp(true).finally(function () {
                                            watch_timer = null;
                                        })];
                                    case 1:
                                        _a.sent();
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
    });
}
exports.gulpWatch = gulpWatch;
function watch2(done) {
    var ext = ".{js|css|sass|less|scss}";
    gulp.watch(["./src/MVC/**/*" + ext, "./etc/**/*" + ext, "./" + config_1.config.app.views + "/**/*" + ext, "**.min" + ext], function (done) {
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
function watch3(done) {
    var ext = ".{js|css|sass|less|scss}";
    var files = ["./src/MVC/**/*" + ext, "./etc/**/*" + ext, "./" + config_1.config.app.views + "/**/*" + ext, "!**.min" + ext];
    gulp.watch(files, function (done) {
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
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.build.json --watch"]);
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.precompiler.json --watch"]);
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.compiler.json --watch"]);
    done();
}
exports.watch3 = watch3;
/*
var cleanExit = function () {
  process.exit();
};
process.on("SIGINT", cleanExit); // catch ctrl-c
process.on("SIGTERM", cleanExit); // catch kill
process.on("SIGKILL", cleanExit); // catch kill
var children: ChildProcessWithoutNullStreams[] = [];
function children_kill() {
  children.forEach(function (child: ChildProcessWithoutNullStreams) {
    process.kill(child.pid, "SIGKILL");
    child.kill();
    console.log(`Child ${child.pid} killed ${child.killed ? "success" : "failed"}`);
  });
}

process.on("exit", function () {
  console.log("killing", children.length, "child processes");
  children_kill();
});


export async function reload_gulp(cb: () => any = null) {
  console.info(process.env.process_restarting);
  if (process.env.process_restarting == "1") {
    console.info("restarting...");
    delete process.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    setTimeout(reload_gulp, 1000);
    return;
  }

  if (typeof cb == "function") {
    cb();
  }

  // Restart process ...
  children_kill();

  const terminal = spawn(process.argv[0], process.argv.slice(1), {
    env: { process_restarting: "1" },
    stdio: "ignore",
    //detached: true,
  });

  terminal.stdout.on("data", function (data) {
    console.log("stdout:" + data);
  });

  terminal.stderr.on("data", function (data) {
    console.log("stderr:" + data);
  });

  terminal.stdin.on("data", function (data) {
    console.log("stdin:" + data);
  });

  children.push(terminal);
  terminal.unref();
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLG1DQUFrQztBQUNsQyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFHbEMsb0NBQW9DO0FBQ3BDLCtDQUErRDtBQUMvRCxvQ0FBb0M7QUFDcEMsMENBQXdDO0FBQ3hDLHlEQUFvRDtBQUNwRCxxQ0FBbUM7QUFDbkMscUNBQW9DO0FBRXBDLFNBQWdCLFNBQVM7SUFDdkIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hCLElBQU0sS0FBSyxHQUFHO1FBQ1osd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6QixzQ0FBc0M7UUFDdEMsa0NBQWtDO1FBQ2xDLElBQUksR0FBRyxlQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyw2QkFBNkI7S0FDeEQsQ0FBQztJQUVGLGFBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdEIsS0FBSzthQUNGLEdBQUcsQ0FBQyxVQUFVLElBQUk7WUFDakIsT0FBTyxhQUFHLENBQUMsTUFBTSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ2YsQ0FBQztJQUVGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztJQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxJQUFvRDtRQUN4RyxJQUFNLE9BQU8sR0FBRztZQUNkLElBQUksR0FBRyxlQUFTLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMs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