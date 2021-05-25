"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gulpWatch2 = exports.gulpWatch = void 0;
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
function gulpWatch(done) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var files, watch_timer, watchf;
        return tslib_1.__generator(this, function (_a) {
            files = ["./libs/js/*", "./libs/src/**/*", "./src/MVC/**/*", "./etc/**/*", "./" + config_1.config.app.views + "/**/*"];
            watch_timer = null;
            watchf = gulp
                .watch(files, null)
                .on("change", function (file) {
                if (localStorage.getItem("watch")) {
                    return;
                }
                file = index_1.default.normalize(path_1.default.resolve(file.toString()));
                //console.info(`${file} changed`);
                /**
                 * Check is library compiler or source compiler
                 */
                var is_Lib = /libs\/(js|src)\//s.test(index_1.default.normalize(file));
                if (is_Lib) {
                    /**
                     * Exclude framework.js app.js and *.map.js
                     */
                    var isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
                    if (isFramework)
                        return;
                    log_1.default.log(log_1.default.random("Library compiler triggered by ") + log_1.default.random(index_1.default.filelog(file)));
                    // if timer still running, cancel it
                    if (watch_timer != null) {
                        console.log("progress compile still running, canceling...");
                        clearTimeout(watch_timer);
                        watch_timer = null;
                    }
                    // if timer stopped, run new compile progress
                    if (watch_timer == null) {
                        log_1.default.log(log_1.default.chalk().yellow("start compile " + log_1.default.random("src/MVC/themes/assets/js")));
                        watch_timer = setTimeout(function () {
                            return tslib_1.__awaiter(this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, gulpfile_app_1.createApp(true).finally(function () {
                                                // tell timer variable progress finished
                                                watch_timer = null;
                                                done();
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
                            gulpfile_compiler_1.compileAssets(file, done);
                        }
                    }
                }
                //done(); // <--- tell gulp initialize complete
            });
            console.clear();
            log_1.default.log(log_1.default.random("Listening ") +
                files
                    .map(function (item) {
                    return log_1.default.random(upath_1.default.resolve(item));
                })
                    .join(", ")
                    .trim());
            return [2 /*return*/, watchf];
        });
    });
}
exports.gulpWatch = gulpWatch;
function gulpWatch2(done) {
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
                if (canonical.endsWith("app.js")) {
                    setTimeout(function () {
                        console.info("re-compiling app.js");
                        gulpfile_compiler_1.compileAssets(canonical, done);
                    }, 2500);
                }
            }
        }
        done();
    });
}
exports.gulpWatch2 = gulpWatch2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLG1DQUFrQztBQUNsQyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsNENBQTRDO0FBQzVDLG9DQUFvQztBQUNwQywrQ0FBMkM7QUFDM0Msb0NBQW9DO0FBQ3BDLDBDQUF3QztBQUN4Qyx5REFBb0Q7QUFDcEQscUNBQW1DO0FBQ25DLHFDQUFvQztBQUVwQyxTQUFzQixTQUFTLENBQUMsSUFBSTs7OztZQUMxQixLQUFLLEdBQUcsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLElBQUksR0FBRyxlQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQztZQUVoSCxXQUFXLEdBQTBCLElBQUksQ0FBQztZQUN4QyxNQUFNLEdBQUcsSUFBSTtpQkFDZCxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztpQkFDbEIsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLElBQW9EO2dCQUN4RSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQy9CLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxHQUFHLGVBQVMsQ0FBQyxTQUFTLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxrQ0FBa0M7Z0JBQ2xDOzttQkFFRztnQkFDSCxJQUFNLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVuRSxJQUFJLE1BQU0sRUFBRTtvQkFDUjs7dUJBRUc7b0JB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