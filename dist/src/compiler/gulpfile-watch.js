"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch3 = exports.gulpWatch = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var config_1 = require("./config");
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
//import process from "../compiler/process";
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
function watch3(done) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ext, files, views_path;
        return tslib_1.__generator(this, function (_a) {
            ext = ".{js|css|sass|less|scss}";
            files = ["./src/MVC/**/*" + ext, "./etc/**/*" + ext, "./" + config_1.config.app.views + "/**/*" + ext, "!**.min" + ext];
            views_path = path_1.default.join(process.cwd(), config_1.config.app.views + "/**/*");
            console.log(views_path);
            spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.build.json --watch"], false, function (child) {
                child.stderr.on("data", function (data) {
                    console.error(data);
                });
            });
            spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.precompiler.json --watch"]);
            spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.compiler.json --watch"]);
            gulp.watch(views_path, null).on("change", function (event, file) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var trigger;
                    return tslib_1.__generator(this, function (_a) {
                        trigger = function () {
                            return tslib_1.__awaiter(this, void 0, void 0, function () {
                                var canonical;
                                return tslib_1.__generator(this, function (_a) {
                                    canonical = index_1.default.normalize(path_1.default.resolve(file.toString()));
                                    console.log(canonical, file);
                                    return [2 /*return*/];
                                });
                            });
                        };
                        return [2 /*return*/, trigger()];
                    });
                });
            });
            done();
            return [2 /*return*/];
        });
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLG1DQUFrQztBQUNsQyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsNENBQTRDO0FBQzVDLG9DQUFvQztBQUNwQywrQ0FBMkM7QUFDM0Msb0NBQW9DO0FBQ3BDLDBDQUF3QztBQUN4Qyx5REFBb0Q7QUFDcEQscUNBQW1DO0FBQ25DLHFDQUFvQztBQUVwQyxTQUFnQixTQUFTO0lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQixJQUFNLEtBQUssR0FBRztRQUNaLHdCQUF3QjtRQUN4Qix5QkFBeUI7UUFDekIsc0NBQXNDO1FBQ3RDLGtDQUFrQztRQUNsQyxJQUFJLEdBQUcsZUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsNkJBQTZCO0tBQ3hELENBQUM7SUFFRixhQUFHLENBQUMsR0FBRyxDQUNMLGFBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3RCLEtBQUs7YUFDRixHQUFHLENBQUMsVUFBVSxJQUFJO1lBQ2pCLE9BQU8sYUFBRyxDQUFDLE1BQU0sQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNmLENBQUM7SUFFRixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsSUFBb0Q7UUFDeEcsSUFBTSxPQUFPLEdBQUc7WUFDZCxJQUFJLEdBQUcsZUFBUyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENB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