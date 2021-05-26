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
index_1.localStorage.removeItem("compile");
/**
 * Create App.js
 * @param withoutView false to not compile views javascripts
 */
function createApp(withoutView) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var root, exists, target;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    root = process_1.default.root;
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
                    _a.label = 8;
                case 8: return [2 /*return*/];
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
                if (stdout.trim().length) {
                    console.log(stdout);
                }
                if (stderr.trim().length) {
                    console.log(stderr);
                }
                if (typeof callback == "function") {
                    callback(source, destination, err, stdout, stderr);
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
    var root = process_1.default.root;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxnRUFBa0M7QUFDbEMsK0NBQW9EO0FBQ3BELHdEQUEwQjtBQUMxQixzREFBd0I7QUFDeEIseURBQW9EO0FBQ3BELG9EQUEwRDtBQUMxRCx3RUFBMEM7QUFDMUMsb0VBQTBDO0FBQzFDLDZDQUE0QztBQUM1QyxzRUFBd0M7QUFFeEMsb0JBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbkM7OztHQUdHO0FBQ0gsU0FBc0IsU0FBUyxDQUFDLFdBQW9COzs7Ozs7b0JBQzFDLElBQUksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQztvQkFDcEIsTUFBTSxHQUFHLG9CQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUMzQyxDQUFDLE1BQU0sRUFBUCx3QkFBTztvQkFDUCxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBRTNDLDBCQUEwQjtvQkFDMUIscUJBQU0sa0JBQWtCLENBQUMseUJBQXlCLEVBQUUsSUFBSSxHQUFHLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRzs0QkFDakcsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLENBQUMsQ0FBQyxFQUFBOztvQkFIRiwwQkFBMEI7b0JBQzFCLFNBRUUsQ0FBQztvQkFHRyxNQUFNLEdBQUcsZUFBSyxDQUFDLGFBQWEsQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RyxxQkFBTSxrQkFBa0IsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLEdB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