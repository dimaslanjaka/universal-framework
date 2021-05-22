"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_package = exports.async_exec = exports.getLatestVersion = exports.async = exports.trycatch = exports.count = exports.array_remove = exports.config_builder = exports.module_exists = exports.execute = exports.fixDeps = exports.random_rgba = exports.resolve_dir = exports.writeFile = exports.random_hex = exports.writenow = exports.readFile = exports.asset = exports.isOffline = void 0;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var child_process_1 = require("child_process");
var path = tslib_1.__importStar(require("path"));
var path_1 = require("path");
var Process = tslib_1.__importStar(require("process"));
var index_1 = require("../node-localstorage/index");
//const { promisify } = require("util");
var util_1 = require("util");
var observatory_1 = tslib_1.__importDefault(require("../observatory/lib/observatory"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var dns_1 = tslib_1.__importDefault(require("dns"));
var sorter_1 = tslib_1.__importDefault(require("./sorter"));
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
    if (packageObject && typeof packageObject == "object" && count(packageObject) > 0) {
        if (sorterFound) {
            fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(sorter_1.default.reorder(packageObject), null, 4), {
                encoding: "utf-8",
            });
        }
        else {
            console.log("sorter not found, using default...");
            fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(packageObject, null, 4), {
                encoding: "utf-8",
            });
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
        return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
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
    return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + r().toFixed(1) + ")";
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
                if (data.hasOwnProperty("dependencies") && !index_1.localStorage.getItem("list_package_latest")) {
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
                                            .status(((dependencies_1.length * 100) / Object.keys(data.dependencies).length).toFixed(3).toString() + "%")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2Z1bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDZDQUF5QjtBQUN6QiwrQ0FBcUM7QUFDckMsaURBQTZCO0FBQzdCLDZCQUErQjtBQUMvQix1REFBbUM7QUFDbkMsb0RBQTBEO0FBQzFELHdDQUF3QztBQUN4Qyw2QkFBaUM7QUFDakMsdUZBQXlEO0FBQ3pELHdEQUEwQjtBQUMxQixvREFBc0I7QUFDdEIsNERBQThCO0FBRTlCOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUztJQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixhQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsR0FBRztRQUN6QyxJQUFJLEdBQUcsRUFBRTtZQUNQLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjthQUFNO1lBQ0wsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUNiO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFWRCw4QkFVQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLEtBQUssQ0FBQyxJQUFZO0lBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkIsT0FBTyxJQUFJLENBQUM7S0FDYjtTQUFNLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFLLElBQU0sQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sT0FBSyxJQUFNLENBQUM7S0FDcEI7U0FBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENB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