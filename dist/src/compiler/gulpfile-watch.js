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
    var files = ["./libs/js/*", "./libs/src/**/*", "./src/MVC/**/*", "./etc/**/*", "./" + config_1.config.app.views + "/**/*"];
    var watch_timer = null;
    var watchf = gulp
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
        }
        done(); // <--- tell gulp initialize complete
    });
    console.clear();
    log_1.default.log(log_1.default.random("Listening ") +
        files
            .map(function (item) {
            return log_1.default.random(upath_1.default.resolve(item));
        })
            .join(", ")
            .trim());
    return watchf;
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
                        gulpfile_compiler_1.compileAssets(canonical);
                    }, 2500);
                }
            }
        }
        done();
    });
}
exports.gulpWatch2 = gulpWatch2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS13YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLG1DQUFrQztBQUNsQyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsNENBQTRDO0FBQzVDLG9DQUFvQztBQUNwQywrQ0FBMkM7QUFDM0Msb0NBQW9DO0FBQ3BDLDBDQUF3QztBQUN4Qyx5REFBb0Q7QUFDcEQscUNBQW1DO0FBQ25DLHFDQUFvQztBQUVwQyxTQUFnQixTQUFTLENBQUMsSUFBSTtJQUMxQixJQUFNLEtBQUssR0FBRyxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsSUFBSSxHQUFHLGVBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBRXBILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztJQUN2QixJQUFNLE1BQU0sR0FBRyxJQUFJO1NBQ2QsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7U0FDbEIsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLElBQW9EO1FBQ3hFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLEdBQUcsZUFBUyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUQsa0NBQWtDO1FBQ2xDOztXQUVHO1FBQ0gsSUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGVBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVuRSxJQUFJLE1BQU0sRUFBRTtZQUNSOztlQUVHO1lBQ0gs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