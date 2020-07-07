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
        "./etc/**/*",
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
gulp.task("assets-compile", function () {
    function filter(views) {
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
    var css = index_1.default.readdir(root + "/assets/css");
    css = filter(css);
    var js = index_1.default.readdir(root + "/assets/js");
    js = filter(js);
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