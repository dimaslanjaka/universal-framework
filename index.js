"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var child_process_1 = require("child_process");
var path = require("path");
var Process = require("process");
var http = require("http");
var path_1 = require("path");
[
    ["warn", "\x1b[35m"],
    ["error", "\x1b[31m"],
    ["log", "\x1b[2m"],
].forEach(function (pair) {
    var method = pair[0], reset = "\x1b[0m", color = "\x1b[36m" + pair[1];
    console[method] = console[method].bind(console, color, method.toUpperCase() + " [" + new Date().toLocaleString() + "]", reset);
});
console.error = (function () {
    var error = console.error;
    return function (exception) {
        if (typeof exception.stack !== "undefined") {
            error.call(console, exception.stack);
        }
        else {
            error.apply(console, arguments);
        }
    };
})();
function run() {
    var args = Process.argv.slice(2);
    var constructor = {
        main: "index.js",
        files: ["libs/"],
        name: "universal-framework",
        description: "Universal framework php javascript",
        displayName: "UNIVERSAL FRAMEWORK [PHPJS]",
        publisher: "dimaslanjaka",
        version: "3.0.0",
        keywords: [
            "SFTP",
            "PHP",
            "COMMONJS",
            "WINDOWS",
            "FRAMEWORK",
            "GUI",
            "project",
            "typescript",
            "javascript",
            "tools",
            "python",
        ],
        scripts: {
            preinstall: "node ./index.js dev",
            postinstall: "node ./index.js && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json && gulp build",
        },
        bin: "./libs/bin/syncjs/bin",
        repository: {
            type: "git",
            url: "git+https://github.com/dimaslanjaka/universal-framework.git",
        },
        author: {
            name: "dimaslanjaka",
            email: "dimaslanjaka@gmail.com",
        },
        license: "MIT",
        bugs: {
            url: "https://github.com/dimaslanjaka/universal-framework/issues",
        },
        homepage: "https://github.com/dimaslanjaka/universal-framework#readme",
        maintainers: [
            {
                email: "dimaslanjaka@gmail.com",
                name: "Dimas Lanjaka",
                url: "https://www.github.com/dimaslanjaka",
            },
        ],
        dependencies: {
            async: "*",
            typescript: "*",
            "ts-node": "*",
            "amd-loader": "*",
            systemjs: "*",
            "gulp-typescript": "*",
            upath: "*",
            tslib: "*",
            gulp: "*",
            "gulp-rename": "*",
            "gulp-series": "*",
            terser: "*",
            chalk: "*",
            "javascript-obfuscator": "*",
            node: "*",
            jquery: "*",
            toastr: "*",
            "datatables.net-buttons": "*",
            "datatables.net": "*",
        },
        devDependencies: {
            node: "*",
            "@types/node": "*",
        },
    };
    constructor = Object.assign({}, constructor, require("./package.json"));
    constructor = fixDeps(constructor);
    var variant = "production";
    if (typeof args[0] != "undefined") {
        switch (args[0]) {
            case "dev":
            case "development":
                variant = "development";
                config_builder();
                break;
            case "gui":
                serve();
                break;
            case "init":
                variant = null;
                constructor.scripts.preinstall = "npm install typescript gulp -g";
                constructor.scripts.postinstall =
                    "node ./index.js dev && && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json";
                fs.writeFileSync(__dirname + "/package.json", JSON.stringify(constructor, null, 4));
                execute("npm install --prefer-offline");
                break;
            case "test":
                variant = null;
                break;
            case "fix":
                execute("npm dedupe");
                execute("npm audit fix");
                variant = null;
                break;
            case "rebuild":
                variant = null;
                execute("tsc -p tsconfig.build.json", function (success, message) {
                    console.log(message);
                });
                execute("tsc -p tsconfig.precompiler.json", function (success, message) {
                    console.log(message);
                });
                execute("tsc -p tsconfig.compiler.json", function (success, message) {
                    console.log(message);
                });
                break;
        }
    }
    if (variant) {
        console.log("variant", variant);
        if (variant == "production") {
            constructor.scripts = {
                preinstall: "",
                postinstall: "",
            };
            delete constructor.files;
            delete constructor.bin;
        }
        else if (variant == "development") {
            constructor.scripts.preinstall = "node ./index.js dev";
            constructor.scripts.postinstall = "node ./index.js";
            constructor.bin = "./libs/bin";
            constructor.files = ["./libs/"];
            Object.assign(constructor.devDependencies, shared_packages().devDependencies);
            Object.assign(constructor.dependencies, shared_packages().dependencies);
        }
        if (["development", "production"].includes(variant)) {
            writenow(constructor);
        }
    }
}
function instanceOf(object) {
    return "member" in object;
}
function serve(port) {
    if (port === void 0) { port = 3000; }
    var config = require("./config.json");
    function template(title, content, param) {
        var status = 200;
        if (typeof title == "string") {
            var template = fs
                .readFileSync("./assets/node/template/mdb.html")
                .toString();
            var body = "./assets/node/views/" + content + ".html";
            if (fs.existsSync(body)) {
                template = template.replace(/\%content\%/gm, fs.readFileSync(body).toString());
            }
            else {
                console.warn("body not found");
                status = 404;
                template = template.replace(/\%content\%/gm, fs.readFileSync("./assets/node/views/404.html").toString());
            }
            var script = "./assets/node/views/" + content + ".js";
            if (fs.existsSync(script)) {
                template = template.replace(/\%script\%/gm, "<script src=\"" + config.app.protocol + "://" + config.app.domain + "/assets/node/views/" + content + ".js" + (config.app.environtment == "development"
                    ? "?cache=" + new Date().getTime()
                    : "") + "\"></script>");
            }
            else {
                console.log("script not found");
            }
            param[1].writeHead(status, { "Content-Type": "text/html" });
            template = template.replace(/\%protocol\%/gm, config.app.protocol);
            template = template.replace(/\%domain\%/gm, config.app.domain);
            template = template.replace(/\%title\%/gm, title);
            template = template.replace(/\%config\%/gm, JSON.stringify(config));
            return template;
        }
        else if (typeof title == "function") {
            if (Array.isArray(content)) {
                content[1].writeHead(status, { "Content-Type": "application/json" });
                return title(content[0], content[1]);
            }
            else if (Array.isArray(param)) {
                param[1].writeHead(status, { "Content-Type": "application/json" });
                return title(param[0], param[1]);
            }
            else {
                return "Can't process anything :(";
            }
        }
    }
    http
        .createServer(function (req, res) {
        var url = req.url;
        console.log(url);
        if (url === "/") {
            res.write(template("Homepage", "index", [req, res]));
        }
        else if (url === "/fetch") {
            res.write(template(function () {
                var installed = "./tmp/npm/installed.json";
                list_package();
                var result = {};
                try {
                    if (fs.existsSync(installed)) {
                        result = JSON.parse(fs.readFileSync(installed).toString());
                    }
                }
                catch (error) {
                    if (error) {
                        result = {};
                    }
                }
                if (!fs.existsSync(installed)) {
                    return "package still not fetched";
                }
                return JSON.stringify(result, null, 2);
            }, [req, res]));
        }
        else {
            res.write("<h1>404<h1>");
        }
        res.end();
    })
        .listen(port, function () {
        console.log("server start at port 3000");
    });
}
var timer_list = null;
var timer_run = null;
function list_package() {
    var results = {
        local: {},
        global: {},
    };
    if (timer_list) {
        clearTimeout(timer_list);
    }
    timer_list = setTimeout(function () {
        if (timer_run) {
            return;
        }
        timer_run = true;
        execute("npm list -json -depth=0", function (error, message) {
            if (message instanceof Error || !error) {
                console.error(error);
            }
            try {
                writeFile("./tmp/npm/local.json", JSON.parse(message.toString()));
                results.local = Object.assign({}, JSON.parse(message.toString()));
                for (var key in results.local) {
                    if (results.local.hasOwnProperty(key)) {
                        var version = results.local[key];
                        getLatestVersion(key);
                    }
                }
            }
            catch (error) { }
            execute("npm list -json -depth=0 -g", function (error, message) {
                if (message instanceof Error || !error) {
                    console.error(error);
                }
                try {
                    writeFile("./tmp/npm/global.json", JSON.parse(message.toString()));
                    results.global = Object.assign({}, JSON.parse(message.toString()));
                }
                catch (error) { }
                if (count(results)) {
                    writeFile("./tmp/npm/installed.json", results);
                    timer_run = null;
                }
            });
        });
    }, 5000);
}
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
function count(objarr) {
    if (Array.isArray(objarr)) {
        return objarr.length;
    }
    else if (typeof objarr == "object") {
        return Object.keys(objarr).length;
    }
}
function array_remove(source, target) {
    return source.filter(function (el) {
        return !target.includes(el);
    });
}
function config_builder() {
    var config = require("./config.json");
    var parsed = JSON.stringify(parseConfig(config, true), null, 2);
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
function module_exists(tmodule, global, dump) {
    if (global === void 0) { global = false; }
    if (dump === void 0) { dump = false; }
    var test = function (tmodule, global) {
        var result = null;
        execute("npm list -json -depth=0 " + (global ? "-g" : ""), function (error, message) {
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
var npm = (function () {
    function npm() {
    }
    npm.install = function (pkg) {
        if (typeof pkg == "string") {
            this.args.push({ install: pkg });
        }
        else if (Array.isArray(pkg)) {
            pkg.forEach(function (item) {
                npm.args.push({ install: item });
            });
        }
        this.run();
        return this;
    };
    npm.run = function () {
        if (this.args && this.args.length) {
            if (this.timer_run) {
                clearTimeout(this.timer_run);
            }
            setTimeout(function () {
                npm.timer_run = setTimeout(function () {
                    npm.run();
                }, 3000);
            }, 200);
            if (this.running) {
                return;
            }
            var args = this.args[0];
            if (typeof args == "object") {
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (typeof key == "string" && typeof args[key] == "string") {
                            console.log("npm", args);
                            npm.npm([key, args[key]]);
                        }
                    }
                }
            }
            this.args.shift();
        }
    };
    npm.npm = function (args) {
        execute("npm " + args.join(" "));
    };
    npm.args = [];
    npm.timer_run = null;
    npm.running = null;
    return npm;
}());
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
function resolve_dir(path) {
    if (!fs.existsSync(path_1.dirname(path.toString()))) {
        resolve_dir(path_1.dirname(path.toString()));
    }
    if (!fs.existsSync(path.toString())) {
        fs.mkdirSync(path.toString());
    }
}
run();
//# sourceMappingURL=index.js.map