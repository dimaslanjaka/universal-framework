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