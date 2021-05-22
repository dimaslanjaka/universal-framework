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
                } /*
                else {
                  let reason = log.error("undefined");
                  if (/\.(php|log|txt|htaccess|log)$/s.test(filename_log)) {
                    reason = log.color("brown", "Excluded");
                  } else if (/\.(d\.ts)$/s.test(filename_log)) {
                    reason = log.color("cyan", "Typehint");
                  }
                  log.log(`[${reason}] cannot modify ${log.random(filename_log)}`);
                }
                */
            }
        };
        return trigger();
    });
}
exports.gulpWatch = gulpWatch;
function watch3(done) {
    var ext = ".{js|css|sass|less|scss}";
    var files = ["./src/MVC/**/*" + ext, "./etc/**/*" + ext, "./" + config_1.config.app.views + "/**/*" + ext, "!**.min" + ext];
    ///console.log(files);
    /*
    spawner.spawn("cmd", ["/k", "tsc -p tsconfig.build.json --watch"], false, function (child) {
      child.stderr.on("data", function (data) {
        console.error(data);
      });
    });
    spawner.spawn("cmd", ["/k", "tsc -p tsconfig.precompiler.json --watch"]);
    spawner.spawn("cmd", ["/k", "tsc -p tsconfig.compiler.json --watch"]);
    */
    return gulp.watch(files, null).on("change", function (file) {
        var canonical = path_1.default.normalize(path_1.default.resolve(file.toString()));
        console.log(canonical, file);
        if (/\.(js|scss|css|less|ts)$/s.test(canonical)) {
            // TODO: Compile js css on change
            if (!/\.min\.(js|css|ts)$/s.test(canonical)) {
                gulpfile_compiler_1.compileAssets(canonical);
            }
        }
    });
}
exports.watch3 = watch3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLG1DQUFrQztBQUNsQyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsNENBQTRDO0FBQzVDLG9DQUFvQztBQUNwQywrQ0FBMkM7QUFDM0Msb0NBQW9DO0FBQ3BDLDBDQUF3QztBQUN4Qyx5REFBb0Q7QUFDcEQscUNBQW1DO0FBRW5DLFNBQWdCLFNBQVM7SUFDdkIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hCLElBQU0sS0FBSyxHQUFHO1FBQ1osd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6QixzQ0FBc0M7UUFDdEMsa0NBQWtDO1FBQ2xDLElBQUksR0FBRyxlQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyw2QkFBNkI7S0FDeEQsQ0FBQztJQUVGLGFBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdEIsS0FBSzthQUNGLEdBQUcsQ0FBQyxVQUFVLElBQUk7WUFDakIsT0FBTyxhQUFHLENBQUMsTUFBTSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ2YsQ0FBQztJQUVGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztJQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxJQUFvRDtRQUN4RyxJQUFNLE9BQU8sR0FBRztZQUNkLElBQUksR0FBRyxlQUFTLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMs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