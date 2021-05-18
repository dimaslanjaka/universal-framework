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
var config_1 = tslib_1.__importDefault(require("../compiler/config"));
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
                    return [4 /*yield*/, typescriptCompiler("tsconfig.formsaver.json", root + "/libs/").catch(function (err) {
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
    var views = index_2.default.readdir(root + ("/" + config_1.default.app.views));
    return views
        .filter(function (item) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUtYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZ3VscGZpbGUtYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxnRUFBa0M7QUFDbEMsK0NBQW9EO0FBQ3BELHdEQUEwQjtBQUMxQixzREFBd0I7QUFDeEIseURBQW9EO0FBQ3BELG9EQUEwRDtBQUMxRCx3RUFBMEM7QUFDMUMsb0VBQTBDO0FBQzFDLHNFQUF3QztBQUV4QyxJQUFNLElBQUksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQztBQUUxQjs7O0dBR0c7QUFDSCxTQUFzQixTQUFTLENBQUMsV0FBb0I7Ozs7OztvQkFDOUMsTUFBTSxHQUFHLG9CQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUN6QyxDQUFDLE1BQU0sRUFBUCx3QkFBTztvQkFDVCxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3ZDLE1BQU0sR0FBRyxlQUFLLENBQUMsYUFBYSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JHLHFCQUFNLGtCQUFrQixDQUFDLHFCQUFxQixFQUFFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHOzRCQUM3RSxhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLEVBQUE7O29CQUZGLFNBRUUsQ0FBQztvQkFDSCxxQkFBTSxrQkFBa0IsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRzs0QkFDbkYsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxD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