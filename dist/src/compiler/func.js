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
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ori, key, version, dups;
        return tslib_1.__generator(this, function (_a) {
            ori = pkg;
            if (!pkg.hasOwnProperty("dependencies")) {
                console.error("package.json does not have dependencies");
                throw pkg;
            }
            for (key in pkg.dependencies) {
                if (pkg.dependencies.hasOwnProperty(key)) {
                    version = pkg.dependencies[key];
                    dups = Object.keys(pkg.devDependencies).includes(key);
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
            if (typeof pkg == "object" && Object.keys(pkg).length) {
                return [2 /*return*/, pkg];
            }
            return [2 /*return*/, ori];
        });
    });
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
                        resolve(true);
                        return [3 /*break*/, 3];
                    case 2:
                        reject(false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2Z1bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDZDQUF5QjtBQUN6QiwrQ0FBaUU7QUFDakUsaURBQTZCO0FBQzdCLHVEQUFtQztBQUVuQyw2QkFBK0I7QUFDL0Isb0RBQTBEO0FBQzFELHdDQUF3QztBQUN4Qyw2QkFBaUM7QUFDakMsdUZBQXlEO0FBQ3pELHdEQUEwQjtBQUMxQixvREFBc0I7QUFFdEIsNERBQThCO0FBQzlCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV0Qjs7R0FFRztBQUNILFNBQWdCLFNBQVM7SUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ2YsYUFBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEdBQUc7UUFDekMsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ1o7YUFBTTtZQUNMLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDYjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBVkQsOEJBVUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixLQUFLLENBQUMsSUFBWTtJQUNoQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBSyxJQUFNLENBQUMsRUFBRTtRQUNyQyxPQUFPLE9BQUssSUFBTSxDQUFDO0tBQ3BCO1NBQU0sSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDeEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN2QztBQUNILENBQUM7QUFURCxzQkFTQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxJQUFZO0lBQ25DLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDekM7SUFDRCxPQUFVLElBQUksZUFBWSxDQUFDO0FBQzdCLENBQUM7QUFMRCw0QkFLQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxhQUEwQjtJQUNqRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUVILElBQ0UsYUFBYTtRQUNiLE9BQU8sYUFBYSxJQUFJLFFBQVE7UUFDaEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFDeEI7UUFDQSxJQUFJLFdBQVcsRUFBRTtZQUNmLEVBQUUsQ0FBQyxhQUFhLENBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLEVBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUN0RCxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FDdEIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLGFBQWEsQ0FDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsRUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUN0QyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FDdEIsQ0FBQztTQUNIO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sYUFBYSxDQUFDLENBQUM7S0FDbEQ7QUFDSCxDQUFDO0FBM0JELDRCQTJCQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxRQUFrQjtJQUMzQyxJQUFJLFFBQVEsRUFBRTtRQUNaLElBQUksTUFBTSxHQUFHO1lBQ1gsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsU0FBUztZQUNoQixLQUFLLEVBQUUsU0FBUztZQUNoQixLQUFLLEVBQUUsU0FBUztZQUNoQixJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxTQUFTO1lBQ2hCLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsU0FBUztZQUNoQixNQUFNLEVBQUUsU0FBUztZQUNqQixLQUFLLEVBQUUsU0FBUztZQUNoQixTQUFTLEVBQUUsU0FBUztZQUNwQixTQUFTLEVBQUUsU0FBUztZQUNwQixVQUFVLEVBQUUsU0FBUztZQUNyQixTQUFTLEVBQUUsU0FBUztZQUNwQixTQUFTLEVBQUUsU0FBUztZQUNwQixXQUFXLEVBQUUsU0FBUztZQUN0QixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLFNBQVM7WUFDaEIsTUFBTSxFQUFFLFNBQVM7WUFDakIsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsU0FBUztZQUNqQixNQUFNLEVBQUUsU0FBUztZQUNqQixHQUFHLEVBQUUsU0FBUztZQUNkLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUM7UUFDRixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQzFEO1NBQU07UUFDTCxPQUFPLENBQ0wsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDdkUsQ0FBQztLQUNIO0FBQ0gsQ0FBQztBQXRERCxnQ0FzREM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLFNBQVMsQ0FDdkIsSUFBa0QsRUFDbEQsUUFBYSxFQUNiLEVBQTZEO0lBRTdELElBQUk7UUFDRixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUM1QztJQUFDLE9BQU8sS0FBSyxFQUFFLEdBQUU7SUFDbEIsSUFBSSxPQUFPLFFBQVEsSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMxRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsV0FBVyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXRDLElBQUksT0FBTyxRQUFRLElBQUksUUFBUSxFQUFFO1FBQy9CLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUMzQyxJQUFJLE9BQU8sRUFBRSxJQUFJLFVBQVUsRUFBRTtnQkFDM0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3hEO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyw4Q0FBNEMsT0FBTyxRQUFVLENBQUMsQ0FBQztJQUM3RSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUF6QkQsOEJBeUJDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLElBQVk7SUFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUU7UUFDNUMsV0FBVyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7UUFDbkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMvQjtBQUNILENBQUM7QUFSRCxrQ0FRQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsV0FBVztJQUN6QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFDZixDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ1YsT0FBTyxDQUNMLE9BQU87UUFDUCxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsR0FBRztRQUNILENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixHQUFHO1FBQ0gsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLEdBQUc7UUFDSCxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUNKLENBQUM7QUFDSixDQUFDO0FBZkQsa0NBZUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFzQixPQUFPLENBQUMsR0FBZ0I7Ozs7WUFDdEMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLEdBQUcsQ0FBQzthQUNYO1lBQ0QsS0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksRUFBRTtnQkFDbEMsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbEMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFELElBQUksSUFBSSxFQUFFO3dCQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUksR0FBRyw0QkFBeUIsQ0FBQyxDQUFDO3dCQUM5QyxPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzlCO29CQUNELElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBSSxHQUFHLDZDQUEwQyxDQUFDLENBQUM7d0JBQy9ELEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO3dCQUNuQyxPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzlCO2lCQUNGO2FBQ0Y7WUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDckQsc0JBQU8sR0FBRyxFQUFDO2FBQ1o7WUFDRCxzQkFBTyxHQUFHLEVBQUM7OztDQUNaO0FBekJELDBCQXlCQztBQUVELElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQy9CLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0Qjs7Ozs7R0FLRztBQUNILFNBQWdCLE9BQU8sQ0FDckIsR0FBa0IsRUFDbEIsUUFBNkQ7SUFBN0QseUJBQUEsRUFBQSxlQUE2RDtJQUU3RCxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLE9BQU87S0FDUjtJQUNELElBQUksa0JBQWtCLEtBQUssS0FBSyxFQUFFO1FBQ2hDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQixvQkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUNyQyxVQUFVLENBQUM7Z0JBQ1Qsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQzdCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNSLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtnQkFDMUIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDM0I7cUJBQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDOUI7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdEI7Z0JBQ0QsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7b0JBQ2pDLElBQUksTUFBTSxFQUFFO3dCQUNWLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDcEM7eUJBQU0sSUFBSSxNQUFNLEVBQUU7d0JBQ2pCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDcEM7eUJBQU07d0JBQ0wsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUNyQztpQkFDRjtnQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLElBQUksT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbkU7cUJBQU07b0JBQ0wsSUFBSSxNQUFNLEVBQUU7d0JBQ1YsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDeEI7eUJBQU0sSUFBSSxNQUFNLEVBQUU7d0JBQ2pCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQ3pCO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxJQUFJLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ3BELFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFDRCxVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNWO0FBQ0gsQ0FBQztBQXJERCwwQkFxREM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsYUFBYSxDQUMzQixPQUErQixFQUMvQixNQUF1QixFQUN2QixJQUFxQjtJQURyQix1QkFBQSxFQUFBLGNBQXVCO0lBQ3ZCLHFCQUFBLEVBQUEsWUFBcUI7SUFFckIsSUFBTSxJQUFJLEdBQUcsVUFBVSxPQUFlLEVBQUUsTUFBZTtRQUNyRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsT0FBTyxDQUNMLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFDMUQsVUFBVSxLQUFLLEVBQUUsT0FBTztZQUN0QixJQUFJLE9BQU8sWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0wsSUFBSTtvQkFDRixJQUFJLElBQUksR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUV4QyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxJQUFJLElBQUksRUFBRTt3QkFDUixPQUFPLENBQUMsR0FBRyxDQUNOLE9BQU8sYUFBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFFLENBQzFELENBQUM7cUJBQ0g7aUJBQ0Y7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDaEI7YUFDRjtRQUNILENBQUMsQ0FDRixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxPQUFPLE9BQU8sSUFBSSxRQUFRLEVBQUU7UUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxNQUFNO1lBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUM1QztBQUNILENBQUM7QUF4Q0Qsc0NBd0NDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixjQUFjO0lBQzVCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUMvQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWhFLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtRQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7UUFDakUsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsTUFBTSxFQUFFO1FBQ3RELFFBQVEsRUFBRSxPQUFPO0tBQ2xCLENBQUMsQ0FBQztJQUNILElBQUksR0FBRyxHQUFHLEVBQUU7U0FDVCxZQUFZLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLEVBQUU7UUFDcEQsUUFBUSxFQUFFLE9BQU87S0FDbEIsQ0FBQztTQUNELFFBQVEsRUFBRTtTQUNWLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFM0IsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3pELE9BQU8sQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDO1NBQ2pDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDO1NBQ25DLE9BQU8sQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFckMsSUFBSSxLQUFLLEdBQUcsZ0NBQWdDLENBQUM7SUFDN0MsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBVSxNQUFNLGVBQVksQ0FBQyxDQUFDO0lBQzNELEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFOUQsU0FBUyxXQUFXLENBQ2xCLE1BQThCLEVBQzlCLFlBQTRCO1FBQTVCLDZCQUFBLEVBQUEsbUJBQTRCO1FBRTVCLElBQU0sUUFBUSxHQUFHLFVBQVUsR0FBVztZQUNwQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQUNGLEtBQUssSUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3hCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLEVBQUU7b0JBQ2xDLFNBQVM7aUJBQ1Y7Z0JBQ0QsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixJQUFNLElBQUksR0FBRyxPQUFPLE9BQU8sQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUN2RCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNwQjtxQkFBTSxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUU7b0JBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3hDO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztBQUNILENBQUM7QUFyREQsd0NBcURDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxTQUFnQixZQUFZLENBQUMsTUFBcUIsRUFBRSxNQUFxQjtJQUN2RSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUpELG9DQUlDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLE1BQXNCO0lBQzFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN6QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDdEI7U0FBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsRUFBRTtRQUNwQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ25DO0FBQ0gsQ0FBQztBQU5ELHNCQU1DO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsUUFBUSxDQUFDLFFBQW1CO0lBQzFDLElBQUk7UUFDRixJQUFJLElBQUksR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUN0QixJQUFJLE9BQU8sSUFBSSxJQUFJLFNBQVMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUM7QUFWRCw0QkFVQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLEtBQUssQ0FBQyxRQUFrQjtJQUN0QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQWdCLE9BQU8sRUFBRSxNQUFNOzs7Ozs2QkFDNUMsQ0FBQSxPQUFPLFFBQVEsSUFBSSxVQUFVLENBQUEsRUFBN0Isd0JBQTZCO3dCQUMvQixxQkFBTSxRQUFRLEVBQUUsRUFBQTs7d0JBQWhCLFNBQWdCLENBQUM7d0JBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O3dCQUVkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0tBRWpCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFURCxzQkFTQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLEdBQVc7SUFDMUMsT0FBTyxDQUFDLGNBQVksR0FBRyxhQUFVLEVBQUUsVUFBVSxLQUFLLEVBQUUsT0FBTztRQUN6RCxJQUFJLE9BQU8sWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjtRQUNELElBQUk7WUFDRixTQUFTLENBQ1Asd0JBQXNCLEdBQUcsaUJBQWMsRUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FDL0IsQ0FBQztTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtJQUNwQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFaRCw0Q0FZQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQ3hCLFFBQWtCLEVBQ2xCLFFBQWtFO0lBRWxFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNwRCxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxvQkFBSSxDQUFDLENBQUM7SUFDakMsSUFBTSxLQUFLLEdBQUc7Ozs7Ozs7d0JBRVIsS0FBSyxHQUFHLENBQUMsQ0FBQzs7Ozt3QkFDTyxhQUFBLHNCQUFBLFFBQVEsQ0FBQTs7Ozs7d0JBQWxCLE1BQU0scUJBQUEsQ0FBQTs7Ozt3QkFFWSxxQkFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUEzQyxLQUFxQixTQUFzQixFQUF6QyxNQUFNLFlBQUEsRUFBRSxNQUFNLFlBQUE7d0JBQ3BCLElBQUksT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFOzRCQUNqQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUM5Qzs7Ozt3QkFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDOzs7d0JBRW5CLEtBQUssRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFFVixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYixDQUFDO0lBQ0YsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBMUJELGdDQTBCQztBQUVELG9CQUFZLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDL0Msb0JBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDeEM7O0dBRUc7QUFDSCxTQUFnQixZQUFZO0lBQzFCLElBQUksU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDakMsT0FBTztLQUNSO0lBQ0QsSUFBSSxDQUFDLG9CQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3pDLG9CQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBRyxvQkFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSTtZQUNyQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO1lBQ3JDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksS0FBSyxHQUFHLG9CQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO1lBQ3BDLElBQUk7Z0JBQ0YsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO29CQUN6QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNsQixFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQ25ELENBQUM7b0JBQ0YsSUFBSSxHQUFHLEVBQUU7d0JBQ1AsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztxQkFDckM7aUJBQ0Y7Z0JBQ0QsSUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztvQkFDbkMsQ0FBQyxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxFQUM1QztvQkFDQSxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDakQsSUFBTSxVQUFRLEdBQUcsZ0JBQVMsQ0FBQyxvQkFBSSxDQUFDLENBQUM7b0JBQ2pDLElBQU0sY0FBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNwRCxJQUFNLFdBQVcsR0FBRzs7Ozs7Ozt3Q0FFZCxJQUFJLEdBQUcscUJBQVcsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs7Ozt3Q0FFM0IsaUJBQUEsc0JBQUEsY0FBWSxDQUFBOzs7Ozt3Q0FBbkIsR0FBRyx5QkFBQSxDQUFBOzZDQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFyQyx5QkFBcUM7Ozs7d0NBRXBCLHFCQUFNLFVBQVEsQ0FDN0IsV0FBVyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQy9CLEVBQUE7O3dDQUZLLE1BQU0sR0FBSyxDQUFBLFNBRWhCLENBQUEsT0FGVzt3Q0FHWixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7NkNBQzFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBdkIsd0JBQXVCO3dDQUNSLHFCQUFNLFVBQVEsQ0FDN0Isa0JBQWtCLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixDQUM1QyxFQUFBOzt3Q0FGSyxNQUFNLEdBQUssQ0FBQSxTQUVoQixDQUFBLE9BRlc7d0NBR1osSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFOzRDQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRztnREFDN0IsSUFBSSxFQUFFLFNBQVMsR0FBRyxHQUFHO2dEQUNyQixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRTs2Q0FDdkIsQ0FBQzt5Q0FDSDs2Q0FBTTs0Q0FDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRztnREFDN0IsSUFBSSxFQUFFLElBQUk7Z0RBQ1YsT0FBTyxFQUFFLElBQUk7NkNBQ2QsQ0FBQzt5Q0FDSDs7O3dDQUVILFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQzt3Q0FDeEMsSUFBSTs2Q0FDRCxNQUFNLENBQ0wsQ0FDRSxDQUFDLGNBQVksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDOzRDQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQ3RDOzZDQUNFLE9BQU8sQ0FBQyxDQUFDLENBQUM7NkNBQ1YsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUNwQjs2Q0FDQSxPQUFPLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Ozt3Q0FFdkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFLLENBQUMsQ0FBQzs7O3dDQUV2QixJQUFJLENBQUMsRUFBRSxjQUFZLENBQUMsTUFBTSxFQUFFOzRDQUMxQixvQkFBWSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOzRDQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lDQUN2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUdOLENBQUM7b0JBRUYsV0FBVyxFQUFFO3lCQUNWLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBRyxDQUFDLENBQUM7eUJBQ3hCLElBQUksQ0FBQzt3QkFDSixvQkFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDMUMsQ0FBQyxDQUFDLENBQUM7aUJBQ047YUFDRjtZQUFDLE9BQU8sS0FBSyxFQUFFLEdBQUU7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO1lBQ3BDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxPQUFPLENBQUMsSUFBSSxDQUNWLDJHQUEyRyxDQUM1RyxDQUFDO0tBQ0g7QUFDSCxDQUFDO0FBbkdELG9DQW1HQztBQUVEOzs7Ozs7Ozs7Ozs7UUFZUSJ9