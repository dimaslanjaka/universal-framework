"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_package = exports.async_exec = exports.getLatestVersion = exports.async = exports.trycatch = exports.count = exports.array_remove = exports.config_builder = exports.module_exists = exports.execute = exports.fixDeps = exports.random_rgba = exports.resolve_dir = exports.writeFile = exports.random_hex = exports.writenow = exports.readFile = exports.asset = exports.isOffline = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var child_process_1 = require("child_process");
var path = tslib_1.__importStar(require("path"));
var Process = tslib_1.__importStar(require("process"));
var path_1 = require("path");
var index_1 = require("../node-localstorage/index");
//const { promisify } = require("util");
var util_1 = require("util");
var observatory_1 = tslib_1.__importDefault(require("../observatory/lib/observatory"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var dns_1 = tslib_1.__importDefault(require("dns"));
var sorter_1 = tslib_1.__importDefault(require("./sorter"));
require("./consoler");
/**
 * Check connectivity
 */
function isOffline() {
    var res = null;
    dns_1.default.resolve("www.google.com", function (err) {
        if (err) {
            res = true;
        }
        else {
            res = false;
        }
    });
    return res;
}
exports.isOffline = isOffline;
/**
 * Locate asset file
 * @param file
 */
function asset(file) {
    file = file.toString().trim().replace(/\.\//gm, "");
    if (fs.existsSync(file)) {
        return file;
    }
    else if (fs.existsSync("./" + file)) {
        return "./" + file;
    }
    else if (fs.existsSync(path.join(Process.cwd(), file))) {
        return path.join(Process.cwd(), file);
    }
}
exports.asset = asset;
/**
 * Smart read file
 * @param file
 */
function readFile(file) {
    if (fs.existsSync(file)) {
        return fs.readFileSync(file).toString();
    }
    return file + " not found";
}
exports.readFile = readFile;
/**
 * write package
 * @param packageObject
 */
function writenow(packageObject) {
    var sorterFound = trycatch(function () {
        return true;
    });
    if (packageObject &&
        typeof packageObject == "object" &&
        count(packageObject) > 0) {
        if (sorterFound) {
            fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(sorter_1.default.reorder(packageObject), null, 4), { encoding: "utf-8" });
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
function random_hex(familiar) {
    if (familiar) {
        var choose = {
            aqua: "#00ffff",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            black: "#000000",
            blue: "#0000ff",
            brown: "#a52a2a",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgrey: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkviolet: "#9400d3",
            fuchsia: "#ff00ff",
            gold: "#ffd700",
            green: "#008000",
            indigo: "#4b0082",
            khaki: "#f0e68c",
            lightblue: "#add8e6",
            lightcyan: "#e0ffff",
            lightgreen: "#90ee90",
            lightgrey: "#d3d3d3",
            lightpink: "#ffb6c1",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            magenta: "#ff00ff",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            orange: "#ffa500",
            pink: "#ffc0cb",
            purple: "#800080",
            violet: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            white: "#ffffff",
            yellow: "#ffff00",
        };
        var values = Object.values(choose);
        return values[Math.floor(Math.random() * values.length)];
    }
    else {
        return ("#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6));
    }
}
exports.random_hex = random_hex;
/**
 * Write file recursive
 * @param path
 * @param contents
 * @param cb
 */
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
/**
 * Resolve directory, create if not exists
 * @param path
 */
function resolve_dir(path) {
    if (!fs.existsSync(path_1.dirname(path.toString()))) {
        resolve_dir(path_1.dirname(path.toString()));
    }
    if (!fs.existsSync(path.toString())) {
        fs.mkdirSync(path.toString());
    }
}
exports.resolve_dir = resolve_dir;
/**
 * Random RGB color
 */
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return ("rgba(" +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        r().toFixed(1) +
        ")");
}
exports.random_rgba = random_rgba;
/**
 * Fix dependencies and devDependencies
 * @param pkg
 */
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
/**
 * Execute command schedule
 * @param cmds
 * @requires NodeJS
 * @param callback
 */
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
/**
 * check if module exists
 * @param tmodule
 * @requires node
 */
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
/**
 * Configuration builder
 */
function config_builder() {
    var config = require(asset("./config.json"));
    var parsed = JSON.stringify(parseConfig(config, true), null, 2);
    if (fs.existsSync(asset("./libs"))) {
        console.error("Libs folder not exists, exiting config builder.");
        return null;
    }
    fs.writeFileSync(asset("./config-backup.json"), parsed, {
        encoding: "utf-8",
    });
    var str = fs
        .readFileSync(asset("./libs/src/compiler/config.ts"), {
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
    fs.writeFileSync(asset("./libs/src/compiler/config.ts"), mod);
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
/**
 * Remove source sub elements array if exists in target array
 * ```js
 * // If I have this array:
 * var myArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
 * // and this one:
 * var toRemove = ['b', 'c', 'g'];
 * console.log(array_remove(myArray, toRemove)); // => ['a', 'd', 'e', 'f']
 * ```
 * @param source
 * @param target
 */
function array_remove(source, target) {
    return source.filter(function (el) {
        return !target.includes(el);
    });
}
exports.array_remove = array_remove;
/**
 * Array object counter
 * @param objarr
 */
function count(objarr) {
    if (Array.isArray(objarr)) {
        return objarr.length;
    }
    else if (typeof objarr == "object") {
        return Object.keys(objarr).length;
    }
}
exports.count = count;
/**
 * Do trycatch
 * @param callback
 */
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
/**
 * Async current function
 * @param callback
 */
function async(callback) {
    return new Promise(function (resolve, reject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof callback == "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, callback()];
                    case 1:
                        _a.sent();
                        resolve();
                        return [3 /*break*/, 3];
                    case 2:
                        reject();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
}
exports.async = async;
/**
 * Get latest version of packages
 * @param key
 */
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
/**
 * Async execute commands
 * @param commands
 * @param callback callback for each command return
 */
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
                    case 2: return [4 /*yield*/, commands_1.next()];
                    case 3:
                        if (!(commands_1_1 = _c.sent(), !commands_1_1.done)) return [3 /*break*/, 9];
                        script = commands_1_1.value;
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, executor(script)];
                    case 5:
                        _b = _c.sent(), stdout = _b.stdout, stderr = _b.stderr;
                        if (typeof callback == "function") {
                            callback(stdout, stderr, !--commands.length);
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _c.sent();
                        console.error(e_2);
                        return [3 /*break*/, 7];
                    case 7:
                        index++;
                        _c.label = 8;
                    case 8: return [3 /*break*/, 2];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _c.trys.push([11, , 14, 15]);
                        if (!(commands_1_1 && !commands_1_1.done && (_a = commands_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _a.call(commands_1)];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, true];
                }
            });
        });
    };
    return exec2;
}
exports.async_exec = async_exec;
index_1.localStorage.removeItem("list_package_latest");
index_1.localStorage.removeItem("list_package");
/**
 * Get list packages and fetch latest version
 */
function list_package() {
    if (isOffline()) {
        console.error("Are you offline");
        return;
    }
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
                if (fs.existsSync("./tmp/npm/local.json")) {
                    var old = JSON.parse(fs.readFileSync("./tmp/npm/local.json").toString());
                    if (old) {
                        data = Object.assign({}, data, old);
                    }
                }
                if (data.hasOwnProperty("dependencies") &&
                    !index_1.localStorage.getItem("list_package_latest")) {
                    index_1.localStorage.setItem("list_package_latest", "1");
                    var executor_1 = util_1.promisify(child_process_1.exec);
                    var dependencies_1 = Object.keys(data.dependencies);
                    var checkLatest = function () {
                        var e_3, _a;
                        return tslib_1.__awaiter(this, void 0, void 0, function () {
                            var task, dependencies_2, dependencies_2_1, key, stdout, stdout, error_1, e_3_1;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        task = observatory_1.default.add("Fetch latest version");
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 12, 13, 18]);
                                        dependencies_2 = tslib_1.__asyncValues(dependencies_1);
                                        _b.label = 2;
                                    case 2: return [4 /*yield*/, dependencies_2.next()];
                                    case 3:
                                        if (!(dependencies_2_1 = _b.sent(), !dependencies_2_1.done)) return [3 /*break*/, 11];
                                        key = dependencies_2_1.value;
                                        if (!data.dependencies.hasOwnProperty(key)) return [3 /*break*/, 10];
                                        _b.label = 4;
                                    case 4:
                                        _b.trys.push([4, 8, , 9]);
                                        return [4 /*yield*/, executor_1("npm show " + key + " version")];
                                    case 5:
                                        stdout = (_b.sent()).stdout;
                                        data.dependencies[key].latest = stdout.trim();
                                        if (!!key.includes("@types")) return [3 /*break*/, 7];
                                        return [4 /*yield*/, executor_1("npm view @types/" + key + " version -json")];
                                    case 6:
                                        stdout = (_b.sent()).stdout;
                                        if (stdout.trim().length) {
                                            data.dependencies[key].types = {
                                                name: "@types/" + key,
                                                version: stdout.trim(),
                                            };
                                        }
                                        else {
                                            data.dependencies[key].types = {
                                                name: null,
                                                version: null,
                                            };
                                        }
                                        _b.label = 7;
                                    case 7:
                                        writeFile("./tmp/npm/local.json", data);
                                        task
                                            .status(((dependencies_1.length * 100) /
                                            Object.keys(data.dependencies).length)
                                            .toFixed(3)
                                            .toString() + "%")
                                            .details(chalk_1.default.hex(random_hex(true)).underline(key));
                                        return [3 /*break*/, 9];
                                    case 8:
                                        error_1 = _b.sent();
                                        console.error(error_1);
                                        return [3 /*break*/, 9];
                                    case 9:
                                        if (!--dependencies_1.length) {
                                            index_1.localStorage.removeItem("list_package_latest");
                                            task.done("Complete");
                                        }
                                        _b.label = 10;
                                    case 10: return [3 /*break*/, 2];
                                    case 11: return [3 /*break*/, 18];
                                    case 12:
                                        e_3_1 = _b.sent();
                                        e_3 = { error: e_3_1 };
                                        return [3 /*break*/, 18];
                                    case 13:
                                        _b.trys.push([13, , 16, 17]);
                                        if (!(dependencies_2_1 && !dependencies_2_1.done && (_a = dependencies_2.return))) return [3 /*break*/, 15];
                                        return [4 /*yield*/, _a.call(dependencies_2)];
                                    case 14:
                                        _b.sent();
                                        _b.label = 15;
                                    case 15: return [3 /*break*/, 17];
                                    case 16:
                                        if (e_3) throw e_3.error;
                                        return [7 /*endfinally*/];
                                    case 17: return [7 /*endfinally*/];
                                    case 18: return [2 /*return*/];
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
/*
results.local = data;
      if (count(results)) {
        for (const key in results.local) {
          if (results.local.hasOwnProperty(key)) {
            const version = results.local[key];
            getLatestVersion(key);
          }
        }
        writeFile("./tmp/npm/installed.json", results);
        timer_run = null;
      }
      */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2Z1bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDZDQUF5QjtBQUN6QiwrQ0FBaUU7QUFDakUsaURBQTZCO0FBQzdCLHVEQUFtQztBQUVuQyw2QkFBK0I7QUFDL0Isb0RBQTBEO0FBQzFELHdDQUF3QztBQUN4Qyw2QkFBaUM7QUFDakMsdUZBQXlEO0FBQ3pELHdEQUEwQjtBQUMxQixvREFBc0I7QUFFdEIsNERBQThCO0FBQzlCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV0Qjs7R0FFRztBQUNILFNBQWdCLFNBQVM7SUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ2YsYUFBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEdBQUc7UUFDekMsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ1o7YUFBTTtZQUNMLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDYjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBVkQsOEJBVUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixLQUFLLENBQUMsSUFBWTtJQUNoQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBSyxJQUFNLENBQUMsRUFBRTtRQUNyQyxPQUFPLE9BQUssSUFBTSxDQUFDO0tBQ3BCO1NBQU0sSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxD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