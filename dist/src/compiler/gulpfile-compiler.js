"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.single_tsCompile = exports.compileAssets = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_typescript_1 = tslib_1.__importDefault(require("gulp-typescript"));
var fs = tslib_1.__importStar(require("fs"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var core_1 = tslib_1.__importDefault(require("./core"));
var root = process_1.default.root;
/**
 * compile and minify assets
 * @param item file full path
 */
function compileAssets(item) {
    var exists = fs.existsSync(item);
    if (exists) {
        item = item.toString();
        var config = upath_1.default.normalizeSafe(root + "/src/MVC/config/" + item.replace(core_1.default.root(), ""));
        config = core_1.default.normalize(core_1.default.root() + config);
        config = config.replace(/\.(js|css)/s, ".json");
        if (fs.existsSync(config)) {
            config = require(config);
        }
        if (item.endsWith(".less") && !item.endsWith(".min.less")) {
            //console.log(`Compiling LESS ${core.filelog(item)}`);
            core_1.default.less(item);
        }
        else if (item.endsWith(".scss") && !item.endsWith(".min.scss")) {
            //console.log(`Compiling SCSS ${core.filelog(item)}`);
            core_1.default.scss(item);
        }
        else if (item.endsWith(".css") && !item.endsWith(".min.css")) {
            //console.log(`Minify CSS ${core.filelog(item)}`);
            core_1.default.minCSS(item);
        }
        else if (item.endsWith(".js") && !item.endsWith(".min.js")) {
            if (item.endsWith("browserify.js")) {
                console.log("Compile Browserify");
                // TODO: Compile Browserify
                core_1.default.browserify(item);
            }
            else if (!item.endsWith(".babel.js")) {
                //console.log(`Minify JS ${core.filelog(item)}`);
                core_1.default.minJS(item);
                var deleteObfuscated = false;
                if (typeof config == "object") {
                    if (config.hasOwnProperty("obfuscate")) {
                        if (config.obfuscate) {
                            //console.log(`Obfuscating JS ${core.filelog(item)}`);
                            core_1.default.obfuscate(item);
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
                    core_1.default.unlink(obfuscatedjs);
                    core_1.default.unlink(obfuscatedminjs);
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
exports.compileAssets = compileAssets;
/**
 * Single Typescript Compiler
 * @param target
 * @todo universal-framework typescript compiler support
 */
function single_tsCompile(target) {
    var targetlog = log_1.default.chalk().magentaBright(core_1.default.filelog(target));
    if (target.endsWith(".d.ts")) {
        log_1.default.log(targetlog + " is declaration file");
        return;
    }
    var dest = path_1.default.dirname(target);
    log_1.default.log(targetlog + " > " + log_1.default
        .chalk()
        .yellow(core_1.default.filelog(target.replace(/\.ts$/, ".js"))) + " start");
    var tsProject = gulp_typescript_1.default.createProject({
        declaration: false,
        skipLibCheck: true,
    });
    return gulp
        .src(target)
        .pipe(tsProject())
        .on("error", console.log)
        .pipe(gulp.dest(dest));
}
exports.single_tsCompile = single_tsCompile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS1jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLDRFQUFpQztBQUNqQyw2Q0FBeUI7QUFDekIsd0RBQTBCO0FBQzFCLHNEQUF3QjtBQUN4QixnRUFBa0M7QUFDbEMsd0VBQTBDO0FBQzFDLHdEQUEwQjtBQUUxQixJQUFNLElBQUksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQztBQUUxQjs7O0dBR0c7QUFDSCxTQUFnQixhQUFhLENBQUMsSUFBcUI7SUFDakQsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxJQUFJLE1BQU0sRUFBRTtRQUNWLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxNQUFNLEdBSUYsZUFBSyxDQUFDLGFBQWEsQ0FDekIsSUFBSSxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUMxRCxDQUFDO1FBQ0YsTUFBTSxHQUFHLGNBQUksQ0FBQyxTQUFTLENBQUMsY0FBSSxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDekQs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