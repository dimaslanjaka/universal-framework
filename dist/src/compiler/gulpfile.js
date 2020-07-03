"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescriptCompiler = exports.single_tsCompile = exports.createApp = exports.multiMinify = exports.views = exports.minify = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_typescript_1 = tslib_1.__importDefault(require("gulp-typescript"));
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
var browserify_1 = tslib_1.__importDefault(require("browserify"));
var vinyl_source_stream_1 = tslib_1.__importDefault(require("vinyl-source-stream"));
var func_1 = require("./func");
index_2.localStorage.removeItem("compile");
console.clear();
/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task("build", function () {
    return build();
});
gulp.task("build-clear", function () {
    return build(true);
});
/**
 * Build Project
 * @param withoutApp
 */
function build(withoutApp) {
    try {
        var packageJson = root + "/package.json";
        if (fs.existsSync(packageJson)) {
            var json_pkg = JSON.parse(fs.readFileSync(packageJson).toString());
            func_1.fixDeps(json_pkg).then(function (json) {
                fs.writeFileSync(root + "/package.json", JSON.stringify(json, null, 2), {
                    encoding: "utf-8",
                });
            });
        }
    }
    catch (error) { }
    return createApp(withoutApp ? true : false);
}
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
    var run_watch = gulp
        .watch(files, null)
        .on("change", function (file) {
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
                else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
                    if (!/libs\/|libs\\/s.test(file)) {
                        single_tsCompile(file);
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
gulp.task("default", gulp.series(["build", "watch"]));
/**
 * NodeJS to Browserify
 * @param target source javascript
 * @param destination destination folder
 * @param rename want to rename file ? give name or using default basename of target
 */
function node2browser(target, destination, rename) {
    if (typeof rename != "string" || !rename || !rename.length) {
        rename = path_1.default.basename(target);
    }
    log_1.default.log("Browserify " + log_1.default
        .chalk()
        .magentaBright(index_1.default.filelog(target)) + " to " + log_1.default
        .chalk()
        .magentaBright(index_1.default.filelog(destination)) + " renamed to " + log_1.default.success(rename));
    return (browserify_1.default()
        .add(target) //"src/MVC/themes/assets/js/app.js"
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(vinyl_source_stream_1.default(rename)) //"app.js"
        // Start piping stream to tasks!
        .pipe(gulp.dest(destination))); //"src/MVC/themes/assets/js/"
}
/**
 * minify assets
 * @param file
 */
function minify(item) {
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
        else if (item.endsWith(".ts") && !item.endsWith(".d.ts")) {
            if (!/libs\/|libs\\/s.test(item)) {
                single_tsCompile(item);
            }
        }
    }
}
exports.minify = minify;
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
exports.views = views;
/**
 * minify multiple assets
 * @param assets
 */
function multiMinify(assets) {
    assets.map(minify);
}
exports.multiMinify = multiMinify;
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
                    return [3 /*break*/, 5];
                case 4:
                    log_1.default.log(log_1.default.error("Compiler lock process already exists ") +
                        log_1.default.chalk().yellow("node index.js fix") +
                        log_1.default.chalk().green(" to fix it"));
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createApp = createApp;
/**
 * Single Typescript Compiler
 * @param target
 * @todo universal-framework typescript compiler support
 */
function single_tsCompile(target) {
    var targetlog = log_1.default.chalk().magentaBright(index_1.default.filelog(target));
    if (target.endsWith(".d.ts")) {
        log_1.default.log(targetlog + " is declaration file");
        return;
    }
    var dest = path_1.default.dirname(target);
    var filename = path_1.default.basename(target);
    log_1.default.log(targetlog + " > " + log_1.default
        .chalk()
        .yellow(index_1.default.filelog(target.replace(/\.ts$/, ".js"))) + " start");
    var tsProject = gulp_typescript_1.default.createProject({
        declaration: false,
        skipLibCheck: true,
    });
    return gulp.src(target).pipe(tsProject()).pipe(gulp.dest(dest));
}
exports.single_tsCompile = single_tsCompile;
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
exports.typescriptCompiler = typescriptCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLDRFQUFpQztBQUVqQyw2Q0FBeUI7QUFDekIsc0VBQXdDO0FBQ3hDLHdEQUEwQjtBQUMxQixzREFBd0I7QUFDeEIsb0VBQTBDO0FBQzFDLGdFQUFrQztBQUNsQyx3RUFBMEM7QUFFMUMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUIsK0NBQW9EO0FBSXBELG9EQUEwRDtBQUMxRCxrRUFBb0M7QUFDcEMsb0ZBQW9EO0FBQ3BELCtCQUFpQztBQUNqQyxvQkFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFaEI7OztHQUdHO0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7SUFDakIsT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO0lBQ3ZCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBRUg7OztHQUdHO0FBQ0gsU0FBUyxLQUFLLENBQUMsVUFBb0I7SUFDakMsSUFBSTtRQUNGLElBQUksV0FBVyxHQUFHLElBQUksR0FBRyxlQUFlLENBQUM7UUFDekMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJO2dCQUNu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