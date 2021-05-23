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
    var files = ["./src/MVC/**/*", "./etc/**/*", "./" + config_1.config.app.views + "/**/*", "!**.min" + ext];
    console.log("starting watch", files);
    // watch libs
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.formsaver.json --watch"]);
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.build.json --watch"]);
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.precompiler.json --watch"]);
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.compiler.json --watch"]);
    // watch views
    return gulp.watch(files, null).on("change", function (file) {
        var canonical = path_1.default.normalize(path_1.default.resolve(file.toString()));
        //console.log(canonical, file);
        if (/\.(js|scss|css|less|ts)$/s.test(canonical)) {
            // TODO: Compile js css on change
            if (!/\.min\.(js|css|ts)$/s.test(canonical)) {
                gulpfile_compiler_1.compileAssets(canonical);
            }
        }
        done();
    });
}
exports.watch3 = watch3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLG1DQUFrQztBQUNsQyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsNENBQTRDO0FBQzVDLG9DQUFvQztBQUNwQywrQ0FBMkM7QUFDM0Msb0NBQW9DO0FBQ3BDLDBDQUF3QztBQUN4Qyx5REFBb0Q7QUFDcEQscUNBQW1DO0FBQ25DLHFDQUFvQztBQUVwQyxTQUFnQixTQUFTO0lBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQixJQUFNLEtBQUssR0FBRztRQUNWLHdCQUF3QjtRQUN4Qix5QkFBeUI7UUFDekIsc0NBQXNDO1FBQ3RDLGtDQUFrQztRQUNsQyxJQUFJLEdBQUcsZUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsNkJBQTZCO0tBQzFELENBQUM7SUFFRixhQUFHLENBQUMsR0FBRyxDQUNILGFBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hCLEtBQUs7YUFDQSxHQUFHLENBQUMsVUFBVSxJQUFJO1lBQ2YsT0FBTyxhQUFHLENBQUMsTUFBTSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ2pCLENBQUM7SUFFRixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsSUFBb0Q7UUFDdEcsSUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEdBQUcsZUFBUyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENB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