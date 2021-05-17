"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.single_tsCompile = exports.compileAssets = void 0;
var tslib_1 = require("tslib");
var gulp = tslib_1.__importStar(require("gulp"));
var gulp_typescript_1 = tslib_1.__importDefault(require("gulp-typescript"));
var fs = tslib_1.__importStar(require("fs"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var index_1 = tslib_1.__importDefault(require("../compiler/index"));
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var root = process_1.default.root;
/**
 * compile and minify assets
 * @param item file full path
 */
function compileAssets(item) {
    var exists = fs.existsSync(item);
    if (exists) {
        item = item.toString();
        var config = upath_1.default.normalizeSafe(root + "/src/MVC/config/" + item.replace(index_1.default.root(), ""));
        config = index_1.default.normalize(index_1.default.root() + config);
        config = config.replace(/\.(js|css)/s, ".json");
        if (fs.existsSync(config)) {
            config = require(config);
        }
        if (item.endsWith(".less") && !item.endsWith(".min.less")) {
            //console.log(`Compiling LESS ${framework.filelog(item)}`);
            index_1.default.less(item);
        }
        else if (item.endsWith(".scss") && !item.endsWith(".min.scss")) {
            //console.log(`Compiling SCSS ${framework.filelog(item)}`);
            index_1.default.scss(item);
        }
        else if (item.endsWith(".css") && !item.endsWith(".min.css")) {
            //console.log(`Minify CSS ${framework.filelog(item)}`);
            index_1.default.minCSS(item);
        }
        else if (item.endsWith(".js") && !item.endsWith(".min.js")) {
            if (item.endsWith("browserify.js")) {
                // TODO: Compile Browserify
                index_1.default.browserify(item);
            }
            else if (!item.endsWith(".babel.js")) {
                //console.log(`Minify JS ${framework.filelog(item)}`);
                index_1.default.minJS(item);
                var deleteObfuscated = false;
                if (typeof config == "object") {
                    if (config.hasOwnProperty("obfuscate")) {
                        if (config.obfuscate) {
                            //console.log(`Obfuscating JS ${framework.filelog(item)}`);
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
exports.compileAssets = compileAssets;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9ndWxwZmlsZS1jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQTZCO0FBQzdCLDRFQUFpQztBQUNqQyw2Q0FBeUI7QUFDekIsd0RBQTBCO0FBQzFCLHNEQUF3QjtBQUN4QixvRUFBMEM7QUFDMUMsZ0VBQWtDO0FBQ2xDLHdFQUEwQztBQUMxQyxJQUFNLElBQUksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQztBQUUxQjs7O0dBR0c7QUFDSCxTQUFnQixhQUFhLENBQUMsSUFBcUI7SUFDakQsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxJQUFJLE1BQU0sRUFBRTtRQUNWLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxNQUFNLEdBSUYsZUFBSyxDQUFDLGFBQWEsQ0FDekIsSUFBSSxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUMvRCxDQUFDO1FBQ0YsTUFBTSxHQUFHLGVBQVMsQ0FBQyxTQUFTLENBQUMsZUFBUyxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDekQs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