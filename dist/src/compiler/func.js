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
    catch (error) {
    }
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
        var test_1 = callback();
        if (typeof test_1 == "boolean") {
            return test_1;
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
        catch (error) {
        }
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
        var global_1 = child_process_1.exec("npm list -json -depth=0 -g");
        global_1.stdout.on("data", function (data) {
            writeFile("./tmp/npm/global.json", data);
        });
        global_1.stderr.on("data", function (data) {
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
                        .catch(function (err) {
                    })
                        .then(function () {
                        index_1.localStorage.removeItem("list_package");
                    });
                }
            }
            catch (error) {
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL2Z1bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDZDQUF5QjtBQUN6QiwrQ0FBcUM7QUFDckMsaURBQTZCO0FBQzdCLDZCQUErQjtBQUMvQix1REFBbUM7QUFDbkMsb0RBQTBEO0FBQzFELHdDQUF3QztBQUN4Qyw2QkFBaUM7QUFDakMsdUZBQXlEO0FBQ3pELHdEQUEwQjtBQUMxQixvREFBc0I7QUFDdEIsNERBQThCO0FBRTlCOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUztJQUNyQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixhQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsR0FBRztRQUN2QyxJQUFJLEdBQUcsRUFBRTtZQUNMLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDZDthQUFNO1lBQ0gsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUNmO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFWRCw4QkFVQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLEtBQUssQ0FBQyxJQUFZO0lBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsT0FBTyxJQUFJLENBQUM7S0FDZjtTQUFNLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFLLElBQU0sQ0FBQyxFQUFFO1FBQ25DLE9BQU8sT0FBSyxJQUFNLENBQUM7S0FDdEI7U0FBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENB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