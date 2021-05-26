"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchView = exports.gulpWatch2 = exports.gulpWatch = void 0;
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
                    // if timer stopped, run new compile progress
                    if (watch_timer == null) {
                        log_1.default.log(log_1.default.random("Library compiler triggered by ") + log_1.default.random(index_1.default.filelog(file)));
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
    // watch libs
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.formsaver.json --watch"]);
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.build.json --watch"]);
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.precompiler.json --watch"]);
    spawner_1.spawner.spawn("cmd", ["/k", "tsc -p tsconfig.compiler.json --watch"]);
    // watch views
    return watchView(done);
}
exports.gulpWatch2 = gulpWatch2;
function watchView(done) {
    var ext = ".{js|css|sass|less|scss}";
    var files = ["./src/MVC/**/*", "./etc/**/*", "./" + config_1.config.app.views + "/**/*", "!**.min" + ext];
    console.log("starting watch", files);
    gulp.watch(files, null).on("change", function (file) {
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
exports.watchView = watchView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLG1DQUFrQztBQUNsQyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsNENBQTRDO0FBQzVDLG9DQUFvQztBQUNwQywrQ0FBMkM7QUFDM0Msb0NBQW9DO0FBQ3BDLDBDQUF3QztBQUN4Qyx5REFBb0Q7QUFDcEQscUNBQW1DO0FBQ25DLHFDQUFvQztBQUVwQyxTQUFzQixTQUFTLENBQUMsSUFBSTs7OztZQUMxQixLQUFLLEdBQUcsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLElBQUksR0FBRyxlQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQztZQUVoSCxXQUFXLEdBQTBCLElBQUksQ0FBQztZQUN4QyxNQUFNLEdBQUcsSUFBSTtpQkFDZCxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztpQkFDbEIsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLElBQW9EO2dCQUN4RSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQy9CLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxHQUFHLGVBQVMsQ0FBQyxTQUFTLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxrQ0FBa0M7Z0JBQ2xDOzttQkFFRztnQkFDSCxJQUFNLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVuRSxJQUFJLE1BQU0sRUFBRTtvQkFDUjs7dUJBRUc7b0JB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