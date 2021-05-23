"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiMinify = exports.views = exports.typescriptCompiler = exports.createApp = void 0;
var tslib_1 = require("tslib");
var log_1 = tslib_1.__importDefault(require("../compiler/log"));
var child_process_1 = require("child_process");
var upath_1 = tslib_1.__importDefault(require("upath"));
var path_1 = tslib_1.__importDefault(require("path"));
var gulpfile_compiler_1 = require("./gulpfile-compiler");
var index_1 = require("../node-localstorage/index");
var process_1 = tslib_1.__importDefault(require("../compiler/process"));
var index_2 = tslib_1.__importDefault(require("../compiler/index"));
var config_1 = require("../compiler/config");
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var root = process_1.default.root;
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
                    exists = index_1.localStorage.getItem("compile");
                    if (!!exists) return [3 /*break*/, 8];
                    index_1.localStorage.setItem("compile", "running");
                    // compile required assets
                    return [4 /*yield*/, typescriptCompiler("tsconfig.formsaver.json", root + "/libs/src/smartform").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 1:
                    // compile required assets
                    _a.sent();
                    target = upath_1.default.normalizeSafe(upath_1.default.resolve(upath_1.default.join(root, "src/MVC/themes/assets/js/app.js")));
                    return [4 /*yield*/, typescriptCompiler("tsconfig.build.json", root + "/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, typescriptCompiler("tsconfig.precompiler.json", root + "/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, typescriptCompiler("tsconfig.compiler.json", root + "/libs/").catch(function (err) {
                            log_1.default.log(log_1.default.error(err));
                        })];
                case 4:
                    _a.sent();
                    //await node2browser(target, path.dirname(target));
                    return [4 /*yield*/, gulpfile_compiler_1.compileAssets(target)];
                case 5:
                    //await node2browser(target, path.dirname(target));
                    _a.sent();
                    if (!!withoutView) return [3 /*break*/, 7];
                    return [4 /*yield*/, multiMinify(views())];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    //const appjs = path.join(root, "src/MVC/themes/assets/js/app.js");
                    //exec(`browserify ${appjs} -o ${appjs}`);
                    index_1.localStorage.removeItem("compile");
                    return [3 /*break*/, 9];
                case 8:
                    log_1.default.log(log_1.default.error("Compiler lock process already exists ") +
                        log_1.default.chalk().yellow("node index.js fix") +
                        log_1.default.chalk().green(" to fix it"));
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.createApp = createApp;
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
                log_1.default.log(log_1.default.color("blue", "successfully compiled ") + log_1.default.success(path_1.default.basename(source)));
                resolve(true);
            }
            else {
                log_1.default.log(log_1.default.color("blue", "failed compile ") + log_1.default.error(path_1.default.basename(source)));
                reject(err.message);
            }
        });
    });
}
exports.typescriptCompiler = typescriptCompiler;
/**
 * List views folder
 */
function views() {
    var views = filemanager_1.default.readdir(root + ("/" + config_1.config.app.views));
    return views
        .filter(function (item) {
        // noinspection RegExpRedundantEscape
        return (/\.(js|scss|css|sass|less)$/.test(item) &&
            !/\.min\.(js|css)$/.test(item) &&
            !/\-ori|\-original|\-backup|\.bak/s.test(item));
    })
        .map(function (asset) {
        return index_2.default.normalize(asset);
    });
}
exports.views = views;
/**
 * compileAssets multiple assets
 * @param assets
 */
function multiMinify(assets) {
    assets.map(gulpfile_compiler_1.compileAssets);
}
exports.multiMinify = multiMinify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxnRUFBa0M7QUFDbEMsK0NBQW9EO0FBQ3BELHdEQUEwQjtBQUMxQixzREFBd0I7QUFDeEIseURBQW9EO0FBQ3BELG9EQUEwRDtBQUMxRCx3RUFBMEM7QUFDMUMsb0VBQTBDO0FBQzFDLDZDQUE0QztBQUM1QyxzRUFBd0M7QUFFeEMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFFMUI7OztHQUdHO0FBQ0gsU0FBc0IsU0FBUyxDQUFDLFdBQW9COzs7Ozs7b0JBQzFDLE1BQU0sR0FBRyxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDM0MsQ0FBQyxNQUFNLEVBQVAsd0JBQU87b0JBQ1Asb0JBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUUzQywwQkFBMEI7b0JBQzFCLHFCQUFNLGtCQUFrQixDQUFDLHlCQUF5QixFQUFFLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7NEJBQ2pHLGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixDQUFDLENBQUMsRUFBQTs7b0JBSEYsMEJBQTBCO29CQUMxQixTQUVFLENBQUM7b0JBR0csTUFBTSxHQUFHLGVBQUssQ0FBQyxhQUFhLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkcscUJBQU0sa0JBQWtCLENBQUMscUJBQXFCLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7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