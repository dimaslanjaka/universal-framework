"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_typescript_1 = tslib_1.__importDefault(require("gulp-typescript"));
var gulp_rename_1 = tslib_1.__importDefault(require("gulp-rename"));
var fs = tslib_1.__importStar(require("fs"));
var config_1 = tslib_1.__importDefault(require("../compiler/config"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var root = process_1.default.root;
var child_process_1 = require("child_process");
var index_2 = require("../node-localstorage/index");
console.clear();
/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task("build", function () {
    return createApp(false);
});
// watch libs/js/**/* and views
gulp.task("watch", function () {
    console.clear();
    var files = [
        "./libs/js/**/*",
        "./libs/src/**/*",
        "./src/MVC/**/*",
        "./" + config_1.default.app.views + "/**/*",
    ];
    log_1.default.log(log_1.default.random("Listening ") +
        files
            .map(function (item) {
            return log_1.default.random(upath_1.default.resolve(item));
        })
            .join(" "));
    var compiler_runner = false;
    var run_watch = gulp.watch(files, null).on("change", 
    /**
     * @param {string} file
     */
    function (file) {
        var trigger = function () {
            file = index_1.default.normalize(path_1.default.resolve(file.toString()));
            /**
             * Check is library compiler or source compiler
             */
            var is_Lib = /libs\/(js|src)\//s.test(index_1.default.normalize(file));
            var filename_log = index_1.default.filelog(file);
            if (is_Lib) {
                var isCompiler = file.includes("/libs/compiler/");
                var isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
                if (isCompiler || isFramework)
                    return;
                //console.log(file, isFramework);
                log_1.default.log(log_1.default.random("Library compiler triggered by ") +
                    log_1.default.random(index_1.default.filelog(file)));
                log_1.default.log(log_1.default
                    .chalk()
                    .yellow("start compile " + log_1.default.random("src/MVC/themes/assets/js")));
                if (compiler_runner) {
                    log_1.default.log(log_1.default.error("Compiler still running"));
                }
                else {
                    compiler_runner = setTimeout(function () {
                        createApp(true);
                        compiler_runner = null;
                    }, 5000);
                }
            }
            else {
                if (/\.(js|scss|css)$/s.test(file)) {
                    if (!/\.min\.(js|css)$/s.test(file)) {
                        minify(file);
                    }
                }
                else {
                    var reason = log_1.default.error(undefined);
                    if (/\.(php|log|txt|htaccess)$/s.test(filename_log)) {
                        reason = log_1.default.random("excluded");
                    }
                    log_1.default.log("[" + reason + "] cannot modify " + log_1.default.random(filename_log));
                }
            }
        };
        return trigger();
    });
    return run_watch;
});
gulp.task("composer", function () {
    return index_1.default.async(function () {
        var today = new Date().toLocaleDateString();
        var yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString();
        if (!index_1.default.localStorage().getItem("composer") ||
            index_1.default.localStorage().getItem("composer") == yesterday) {
            index_1.default.composer(index_1.default.root(), "update");
            index_1.default.localStorage().setItem("composer", today);
        }
        else {
            today = new Date(today).toString();
            yesterday = new Date(index_1.default.localStorage().getItem("composer")).toString();
            log_1.default.log("Composer already updated at " + yesterday);
            log_1.default.log("Today " + today);
            //log.log("Is Older " + today.getTime() > yesterday.getTime());
        }
    });
});
gulp.task("default", function () {
    //"build", "watch"
    gulp.start("build").task("watch");
});
/**
 * minify assets
 * @param file
 */
function minify(item) {
    var log = index_1.default.log;
    var exists = fs.existsSync(item);
    if (exists) {
        item = item.toString();
        var config = upath_1.default.normalizeSafe(root + "/src/MVC/config/" + item.replace(index_1.default.root(), ""));
        config = index_1.default.normalize(index_1.default.root() + config);
        config = config.replace(/\.(js|css)/s, ".json");
        if (fs.existsSync(config)) {
            config = require(config);
        }
        if (item.endsWith(".scss") && !item.endsWith(".min.scss")) {
            index_1.default.scss(item);
        }
        else if (item.endsWith(".css") && !item.endsWith(".min.css")) {
            index_1.default.minCSS(item);
        }
        else if (item.endsWith(".js") && !item.endsWith(".min.js")) {
            if (!item.endsWith(".babel.js")) {
                index_1.default.minJS(item);
                var deleteObfuscated = false;
                if (typeof config == "object") {
                    if (config.hasOwnProperty("obfuscate")) {
                        if (config.obfuscate) {
                            index_1.default.obfuscate(item);
                        }
                        else {
                            deleteObfuscated = true;
                        }
                    }
                    else {
                        deleteObfuscated = true;
                    }
                }
                if (deleteObfuscated) {
                    var obfuscatedjs = item.replace(/\.js$/s, ".obfuscated.js");
                    var obfuscatedminjs = item.replace(/\.js$/s, ".obfuscated.min.js");
                    index_1.default.unlink(obfuscatedjs);
                    index_1.default.unlink(obfuscatedminjs);
                }
            }
        }
    }
}
/**
 * List views folder
 */
function views() {
    var views = index_1.default.readdir(root + ("/" + config_1.default.app.views));
    return views
        .filter(function (item) {
        return (/\.(js|scss|css|sass|less)$/.test(item) &&
            !/\.min\.(js|css)$/.test(item) &&
            !/\-ori|\-original|\-backup|\.bak/s.test(item));
    })
        .map(function (asset) {
        return index_1.default.normalize(asset);
    });
}
/**
 * minify multiple assets
 * @param assets
 */
function multiMinify(assets) {
    assets.map(minify);
}
/**
 * Create App.js
 * @param withoutView false to not compile views javascripts
 */
function createApp(withoutView) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var exists, target;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exists = index_2.localStorage.getItem("compile");
                    if (!!exists) return [3 /*break*/, 4];
                    index_2.localStorage.setItem("compile", "running");
                    target = upath_1.default.normalizeSafe(upath_1.default.resolve(upath_1.default.join(root, "src/MVC/themes/assets/js/app.js")));
                    return [4 /*yield*/, typescriptCompiler("tsconfig.build.json", root + "/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, typescriptCompiler("tsconfig.precompiler.json", root + "/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, typescriptCompiler("tsconfig.compiler.json", root + "/libs/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 3:
                    _a.sent();
                    minify(target);
                    if (!withoutView) {
                        multiMinify(views());
                    }
                    index_2.localStorage.removeItem("compile");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Typescript compiler
 * @param source
 * @param destination
 * @param callback
 */
function typescriptCompiler(source, destination, callback) {
    if (callback === void 0) { callback = null; }
    return new Promise(function (resolve, reject) {
        child_process_1.exec("tsc -p " + source, function (err, stdout, stderr) {
            if (!err) {
                if (typeof callback == "function") {
                    callback(source, destination);
                }
                console.log(stdout);
                console.log(stderr);
                log_1.default.log(log_1.default.random("successfully compiled ") +
                    log_1.default.success(path_1.default.basename(source)));
                resolve();
            }
            else {
                log_1.default.log(log_1.default.random("failed compile ") + log_1.default.error(path_1.default.basename(source)));
                reject(err.message);
            }
        });
    });
}
/**
 * Typescript compiler
 * @param source
 * @param destination
 * @param callback
 */
function typescriptCompiler2(source, destination, callback) {
    if (callback === void 0) { callback = null; }
    var instance = gulp_typescript_1.default.createProject(source);
    return new Promise(function (resolve, reject) {
        instance
            .src()
            .pipe(instance())
            .pipe(gulp_rename_1.default(function (path) {
            path.extname = ".js";
        }))
            .pipe(gulp.dest(destination))
            .on("end", function () {
            log_1.default.log("successfully compiled " + log_1.default.success(index_1.default.filelog(source)));
            if (typeof callback == "function") {
                callback(source, destination);
            }
            return resolve(true);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGlsZXIvZ3VscGZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQTZCO0FBQzdCLDRFQUFpQztBQUNqQyxvRUFBaUM7QUFDakMsNkNBQXlCO0FBQ3pCLHNFQUF3QztBQUN4Qyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsd0VBQTBDO0FBRTFDLElBQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsSUFBSSxDQUFDO0FBRTFCLCtDQUFxQztBQUNyQyxvREFBMEQ7QUFDMUQsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRWhCOzs7R0FHRztBQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2pCLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBRUgsK0JBQStCO0FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2pCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQixJQUFNLEtBQUssR0FBRztRQUNaLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsZ0JBQWdCO1FBQ2hCLElBQUksR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsT0FBTztLQUNsQyxDQUFDO0lBQ0YsYUFBRyxDQUFDLEdBQUcsQ0FDTCxhQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN0QixLQUFLO2FBQ0YsR0FBRyxDQUFDLFVBQVUsSUFBSTtZQUNqQixPQUFPLGFBQUcsQ0FBQyxNQUFNLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDZixDQUFDO0lBRUYsSUFBSSxlQUFlLEdBQVEsS0FBSyxDQUFDO0lBQ2pD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