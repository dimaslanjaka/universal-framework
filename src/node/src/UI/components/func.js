"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_package = exports.getLatestVersion = exports.async = exports.trycatch = exports.count = exports.shared_packages = exports.array_remove = exports.config_builder = exports.module_exists = exports.execute = exports.fixDeps = exports.resolve_dir = exports.writeFile = exports.writenow = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var child_process_1 = require("child_process");
var path = tslib_1.__importStar(require("path"));
var path_1 = require("path");
var index_1 = require("../../node-localstorage/index");
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
function list_package() {
    if (!index_1.localStorage.getItem("list_package")) {
        index_1.localStorage.setItem("list_package", "true");
        var local = child_process_1.exec("npm list -json -depth=0");
        local.stdout.on("data", function (data) {
            try {
                data = JSON.parse(data);
                console.log(data);
            }
            catch (error) { }
            writeFile("./tmp/npm/local.json", data);
        });
        local.stderr.on("data", function (data) {
            writeFile("./tmp/npm/local-error.json", data);
        });
        var global = child_process_1.exec("npm list -json -depth=0");
        global.stdout.on("data", function (data) {
            writeFile("./tmp/npm/global.json", data);
        });
        global.stderr.on("data", function (data) {
            writeFile("./tmp/npm/global-error.json", data);
        });
        setTimeout(function () {
            index_1.localStorage.removeItem("list_package");
        }, 5000);
    }
}
exports.list_package = list_package;
//# sourceMappingURL=func.js.map