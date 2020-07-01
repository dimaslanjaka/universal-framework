"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_package = exports.async_exec = exports.getLatestVersion = exports.async = exports.trycatch = exports.count = exports.shared_packages = exports.array_remove = exports.config_builder = exports.module_exists = exports.execute = exports.fixDeps = exports.resolve_dir = exports.writeFile = exports.writenow = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var child_process_1 = require("child_process");
var path = tslib_1.__importStar(require("path"));
var path_1 = require("path");
var index_1 = require("../../node-localstorage/index");
var util_1 = require("util");
require("./consoler");
function writenow(packageObject) {
    var sorter;
    var log;
    var sorterFound = trycatch(function () {
        log = require("./libs/compiler/log");
        sorter = require("./libs/compiler/sorter");
        return true;
    });
    if (packageObject &&
        typeof packageObject == "object" &&
        count(packageObject) > 0) {
        if (sorterFound) {
            fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(sorter.reorder(packageObject), null, 4), { encoding: "utf-8" });
        }
        else {
            console.log("sorter not found, using default...");
            fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(packageObject, null, 4), { encoding: "utf-8" });
        }
    }
    else {
        console.warn("not object", typeof packageObject);
    }
}
exports.writenow = writenow;
function writeFile(path, contents, cb) {
    try {
        contents = JSON.parse(contents.toString());
    }
    catch (error) { }
    if (typeof contents == "object" || Array.isArray(contents)) {
        contents = JSON.stringify(contents, null, 2);
    }
    resolve_dir(path_1.dirname(path.toString()));
    if (typeof contents == "string") {
        if (fs.existsSync(path_1.dirname(path.toString()))) {
            if (typeof cb == "function") {
                fs.writeFile(path.toString(), contents.toString(), cb);
            }
            else {
                fs.writeFileSync(path.toString(), contents.toString());
            }
            return true;
        }
    }
    console.error("contents must be type string, instead of " + typeof contents);
    return false;
}
exports.writeFile = writeFile;
function resolve_dir(path) {
    if (!fs.existsSync(path_1.dirname(path.toString()))) {
        resolve_dir(path_1.dirname(path.toString()));
    }
    if (!fs.existsSync(path.toString())) {
        fs.mkdirSync(path.toString());
    }
}
exports.resolve_dir = resolve_dir;
function fixDeps(pkg) {
    if (!pkg.hasOwnProperty("dependencies")) {
        console.error("package.json does not have dependencies");
        return pkg;
    }
    for (var key in pkg.dependencies) {
        if (pkg.dependencies.hasOwnProperty(key)) {
            var version = pkg.dependencies[key];
            var dups = Object.keys(pkg.devDependencies).includes(key);
            if (dups) {
                console.warn(key + " duplicate, removing...");
                delete pkg.dependencies[key];
            }
            if (key.includes("@types")) {
                console.warn(key + " is typehinting module, moving to dev...");
                pkg.devDependencies[key] = version;
                delete pkg.dependencies[key];
            }
        }
    }
    return pkg;
}
exports.fixDeps = fixDeps;
var execute_is_running = false;
var execute_dump = [];
function execute(cmd, callback) {
    if (callback === void 0) { callback = null; }
    if (typeof cmd != "string") {
        console.log(typeof cmd + " not string");
        return;
    }
    if (execute_is_running === false) {
        execute_is_running = true;
        child_process_1.exec(cmd.trim(), function (error, stdout, stderr) {
            setTimeout(function () {
                execute_is_running = false;
            }, 500);
            if (error instanceof Error) {
                if (error.hasOwnProperty("code")) {
                    console.error(error.code);
                }
                else if (error.hasOwnProperty("message")) {
                    console.error(error.message);
                }
                else {
                    console.error(error);
                }
                if (typeof callback == "function") {
                    if (stdout) {
                        callback(false, new Error(stdout));
                    }
                    else if (stderr) {
                        callback(false, new Error(stderr));
                    }
                    else {
                        callback(false, new Error("error"));
                    }
                }
                console.error(error);
            }
            else {
                if (typeof callback != "function") {
                    console.log("callback is not function", stdout ? stdout : stderr);
                }
                else {
                    if (stdout) {
                        callback(true, stdout);
                    }
                    else if (stderr) {
                        callback(false, stderr);
                    }
                }
            }
        });
    }
    else {
        if (execute_dump && !execute_dump.includes(cmd)) {
            console.warn("executor still running, please wait");
            execute_dump.push(cmd);
        }
        setTimeout(function () {
            execute(cmd, callback);
        }, 1000);
    }
}
exports.execute = execute;
function module_exists(tmodule, global, dump) {
    if (global === void 0) { global = false; }
    if (dump === void 0) { dump = false; }
    var test = function (tmodule, global) {
        var result = null;
        execute(("npm list -json -depth=0 " + (global ? "-g" : "")).trim(), function (error, message) {
            if (message instanceof Error || !error) {
                result = false;
            }
            else {
                try {
                    var json = JSON.parse(message);
                    result = Object.keys(json.dependencies).includes(tmodule);
                    if (dump) {
                        console.log(tmodule + " is " + (result ? "installed" : "not installed"));
                    }
                }
                catch (error) {
                    result = false;
                }
            }
        });
        return result;
    };
    if (typeof tmodule == "string") {
        return test(tmodule, global);
    }
    var tests = [];
    if (Array.isArray(tmodule)) {
        tmodule.forEach(function (single) {
            tests.push(test(single, global));
        });
        return tests.every(Boolean) ? true : false;
    }
}
exports.module_exists = module_exists;
function config_builder() {
    var config = require("./config.json");
    var parsed = JSON.stringify(parseConfig(config, true), null, 2);
    if (fs.existsSync("./libs")) {
        console.error("Libs folder not exists, exiting config builder.");
        return null;
    }
    fs.writeFileSync("./config-backup.json", parsed, { encoding: "utf-8" });
    var str = fs
        .readFileSync("./libs/src/compiler/config.ts", {
        encoding: "utf-8",
    })
        .toString()
        .replace(/\s|\t/gm, " ");
    parsed = JSON.stringify(parseConfig(config, false), null, 2)
        .replace(/\"string\"/gm, "string")
        .replace(/\"boolean\"/gm, "boolean")
        .replace(/\"number\"/gm, "number");
    var regex = /config\:((.|\n)*)\=\srequire/gm;
    var mod = str.replace(regex, "config:" + parsed + " = require");
    fs.writeFileSync("./libs/src/compiler/config.ts", mod);
    function parseConfig(config, usingExclude) {
        if (usingExclude === void 0) { usingExclude = null; }
        var excluded = function (key) {
            return ["vscode"].indexOf(key) == -1;
        };
        for (var key in config) {
            if (config.hasOwnProperty(key)) {
                if (!excluded(key) && usingExclude) {
                    continue;
                }
                var element = config[key];
                var type = typeof element;
                if (["number", "string", "boolean"].indexOf(type) != -1) {
                    config[key] = type;
                }
                else if (type == "object") {
                    config[key] = parseConfig(config[key]);
                }
                else if (Array.isArray(config[key])) {
                    config[key].forEach(parseConfig);
                }
            }
        }
        return config;
    }
}
exports.config_builder = config_builder;
function array_remove(source, target) {
    return source.filter(function (el) {
        return !target.includes(el);
    });
}
exports.array_remove = array_remove;
function shared_packages() {
    var libs = require("./libs/package.json");
    var packages = {};
    Object.assign(packages, libs.dependencies, libs.devDependencies);
    var common = require("./libs/js/package.json");
    Object.assign(packages, common.dependencies, common.devDependencies);
    var compiler = require("./libs/src/compiler/package.json");
    Object.assign(packages, compiler.dependencies, compiler.devDependencies);
    var gui = require("./libs/src/gui/package.json");
    Object.assign(packages, gui.dependencies, gui.devDependencies);
    var locutus = require("./libs/src/locutus/package.json");
    Object.assign(packages, locutus.dependencies, locutus.devDependencies);
    var observatory = require("./libs/src/observatory/package.json");
    Object.assign(packages, observatory.dependencies, observatory.devDependencies);
    var sassjs = require("./libs/src/sass.js/package.json");
    Object.assign(packages, sassjs.dependencies, sassjs.devDependencies);
    var syncs = require("./libs/src/syncs/packages.json");
    Object.assign(packages, syncs.dependencies, syncs.devDependencies);
    var ytdl = require("./libs/src/ytdl/package.json");
    Object.assign(packages, ytdl.dependencies, ytdl.devDependencies);
    var pkg = require("./package.json");
    pkg.dependencies = packages;
    pkg = fixDeps(pkg);
    return pkg;
}
exports.shared_packages = shared_packages;
function count(objarr) {
    if (Array.isArray(objarr)) {
        return objarr.length;
    }
    else if (typeof objarr == "object") {
        return Object.keys(objarr).length;
    }
}
exports.count = count;
function trycatch(callback) {
    try {
        var test = callback();
        if (typeof test == "boolean") {
            return test;
        }
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.trycatch = trycatch;
function async(callback) {
    return new Promise(function (resolve, reject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof callback == "function")) return [3, 2];
                        return [4, callback()];
                    case 1:
                        _a.sent();
                        resolve();
                        return [3, 3];
                    case 2:
                        reject();
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    });
}
exports.async = async;
function getLatestVersion(key) {
    execute("npm show " + key + " version", function (error, message) {
        if (message instanceof Error || !error) {
            console.error(error);
        }
        try {
            writeFile("./tmp/npm/packages/" + key + "/latest.json", JSON.parse(message.toString()));
        }
        catch (error) { }
    });
}
exports.getLatestVersion = getLatestVersion;
function async_exec(commands, callback) {
    if (!Array.isArray(commands)) {
        console.error("commands must be instance of array");
        return null;
    }
    var executor = util_1.promisify(child_process_1.exec);
    var exec2 = function () {
        var e_1, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var script, index, commands_1, commands_1_1, _b, stdout, stderr, e_2, e_1_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        index = 0;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 10, 11, 16]);
                        commands_1 = tslib_1.__asyncValues(commands);
                        _c.label = 2;
                    case 2: return [4, commands_1.next()];
                    case 3:
                        if (!(commands_1_1 = _c.sent(), !commands_1_1.done)) return [3, 9];
                        script = commands_1_1.value;
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4, executor(script)];
                    case 5:
                        _b = _c.sent(), stdout = _b.stdout, stderr = _b.stderr;
                        if (typeof callback == "function") {
                            callback(stdout, stderr, !--commands.length);
                        }
                        return [3, 7];
                    case 6:
                        e_2 = _c.sent();
                        console.error(e_2);
                        return [3, 7];
                    case 7:
                        index++;
                        _c.label = 8;
                    case 8: return [3, 2];
                    case 9: return [3, 16];
                    case 10:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 16];
                    case 11:
                        _c.trys.push([11, , 14, 15]);
                        if (!(commands_1_1 && !commands_1_1.done && (_a = commands_1.return))) return [3, 13];
                        return [4, _a.call(commands_1)];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13: return [3, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 15: return [7];
                    case 16: return [2, true];
                }
            });
        });
    };
    return exec2;
}
exports.async_exec = async_exec;
index_1.localStorage.removeItem("list_package_latest");
index_1.localStorage.removeItem("list_package");
function list_package() {
    if (!index_1.localStorage.getItem("list_package")) {
        index_1.localStorage.setItem("list_package", "true");
        var global = child_process_1.exec("npm list -json -depth=0 -g");
        global.stdout.on("data", function (data) {
            writeFile("./tmp/npm/global.json", data);
        });
        global.stderr.on("data", function (data) {
            writeFile("./tmp/npm/global-error.json", data);
        });
        var local = child_process_1.exec("npm list -json -depth=0");
        local.stdout.on("data", function (data) {
            try {
                data = JSON.parse(data);
                if (data.hasOwnProperty("dependencies") &&
                    !index_1.localStorage.getItem("list_package_latest")) {
                    index_1.localStorage.setItem("list_package_latest", "1");
                    var commands = [];
                    var executor_1 = util_1.promisify(child_process_1.exec);
                    var dependencies_1 = Object.keys(data.dependencies);
                    var checkLatest = function () {
                        var e_3, _a;
                        return tslib_1.__awaiter(this, void 0, void 0, function () {
                            var dependencies_2, dependencies_2_1, key, _b, stdout, stderr, error_1, e_3_1;
                            return tslib_1.__generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _c.trys.push([0, 9, 10, 15]);
                                        dependencies_2 = tslib_1.__asyncValues(dependencies_1);
                                        _c.label = 1;
                                    case 1: return [4, dependencies_2.next()];
                                    case 2:
                                        if (!(dependencies_2_1 = _c.sent(), !dependencies_2_1.done)) return [3, 8];
                                        key = dependencies_2_1.value;
                                        if (!data.dependencies.hasOwnProperty(key)) return [3, 7];
                                        _c.label = 3;
                                    case 3:
                                        _c.trys.push([3, 5, , 6]);
                                        return [4, executor_1("npm show " + key + " version")];
                                    case 4:
                                        _b = _c.sent(), stdout = _b.stdout, stderr = _b.stderr;
                                        data.dependencies[key].latest = stdout;
                                        return [3, 6];
                                    case 5:
                                        error_1 = _c.sent();
                                        console.error(error_1);
                                        return [3, 6];
                                    case 6:
                                        if (!--dependencies_1.length) {
                                            index_1.localStorage.removeItem("list_package_latest");
                                        }
                                        _c.label = 7;
                                    case 7: return [3, 1];
                                    case 8: return [3, 15];
                                    case 9:
                                        e_3_1 = _c.sent();
                                        e_3 = { error: e_3_1 };
                                        return [3, 15];
                                    case 10:
                                        _c.trys.push([10, , 13, 14]);
                                        if (!(dependencies_2_1 && !dependencies_2_1.done && (_a = dependencies_2.return))) return [3, 12];
                                        return [4, _a.call(dependencies_2)];
                                    case 11:
                                        _c.sent();
                                        _c.label = 12;
                                    case 12: return [3, 14];
                                    case 13:
                                        if (e_3) throw e_3.error;
                                        return [7];
                                    case 14: return [7];
                                    case 15: return [2];
                                }
                            });
                        });
                    };
                    checkLatest()
                        .catch(function (err) { })
                        .then(function () {
                        index_1.localStorage.removeItem("list_package");
                    });
                }
            }
            catch (error) { }
        });
        local.stderr.on("data", function (data) {
            writeFile("./tmp/npm/local-error.json", data);
        });
    }
    else {
        console.warn("process for list_package is locked, if previous runner got error, please fix it using `node index.js fix`");
    }
}
exports.list_package = list_package;
//# sourceMappingURL=func.js.map