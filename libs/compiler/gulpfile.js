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
var gulp_concat_1 = tslib_1.__importDefault(require("gulp-concat"));
var index_2 = require("../node-localstorage/index");
index_2.localStorage.removeItem("compile");
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
    var merge = gulp
        .src(["libs/compiler/**/*.js", "./index.js"])
        .pipe(gulp_concat_1.default("index.js"))
        .pipe(gulp.dest("./tmp/compiler"));
    return merge;
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
index_2.localStorage.removeItem("compile");
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
                    if (!!exists) return [3 /*break*/, 5];
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
                    return [4 /*yield*/, typescriptCompiler("tsconfig.main.json", root + "/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 4:
                    _a.sent();
                    minify(target);
                    if (!withoutView) {
                        multiMinify(views());
                    }
                    index_2.localStorage.removeItem("compile");
                    return [3 /*break*/, 6];
                case 5:
                    log_1.default.log(log_1.default.error("Compiler lock process already exists ") +
                        log_1.default.chalk().yellow("node index.js fix") +
                        log_1.default.chalk().green(" to fix it"));
                    _a.label = 6;
                case 6: return [2 /*return*/];
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
                if (stdout.trim().length) {
                    console.log(stdout);
                }
                if (stderr.trim().length) {
                    console.log(stderr);
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGlsZXIvZ3VscGZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQTZCO0FBQzdCLDRFQUFpQztBQUNqQyxvRUFBaUM7QUFDakMsNkNBQXlCO0FBQ3pCLHNFQUF3QztBQUN4Qyx3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLG9FQUEwQztBQUMxQyxnRUFBa0M7QUFDbEMsd0VBQTBDO0FBRTFDLElBQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsSUFBSSxDQUFDO0FBRTFCLCtDQUFvRDtBQUVwRCxvRUFBaUM7QUFFakMsb0RBQTBEO0FBQzFELG9CQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUVoQjs7O0dBR0c7QUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUNqQixPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILCtCQUErQjtBQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUNqQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEIsSUFBTSxLQUFLLEdBQUc7UUFDWixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLGdCQUFnQjtRQUNoQixJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU87S0FDbEMsQ0FBQztJQUNGLGFBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdEIsS0FBSzthQUNGLEdBQUcsQ0FBQyxVQUFVLElBQUk7WUFDakIsT0FBTyxhQUFHLENBQUMsTUFBTSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMs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