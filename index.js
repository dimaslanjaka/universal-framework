"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.install_modules = exports.module_exists = exports.array_remove = exports.execPromise = exports.merge_package = exports.object_duplicate_fix = void 0;
var fs = require("fs");
var path = require("path");
var Process = require("process");
require("amd-loader");
var args = Process.argv.slice(2);
install_modules([
    "typescript",
    "ts-node",
    "amd-loader",
    "@types/systemjs",
    "gulp-typescript",
    "upath",
    "tslib",
    "gulp",
    "gulp-rename",
    "terser",
    "javascript-obfuscator",
    "@types/node",
    "@types/jquery",
    "@types/toastr",
    "@types/datatables.net-buttons",
    "@types/datatables.net",
]);
if (!module_exists("prettier")) {
    execute("npm install prettier -D --save-exact --prefer-offline");
}
var libs = JSON.parse(fs.readFileSync("./libs/package.json"));
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
var rootmodule = merge_package(path.join(process.cwd(), "package.json"), packages, "auto");
rootmodule = object_duplicate_fix(rootmodule.dependencies, rootmodule.devDependencies);
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
    devDependencies: rootmodule.devDependencies,
    dependencies: rootmodule.dependencies,
};
var variant = "production";
if (typeof args[0] != "undefined") {
    switch (args[0]) {
        case "dev":
            variant = "development";
            config_builder();
            break;
        case "init":
            constructor.scripts.preinstall = "";
            constructor.scripts.postinstall =
                "node ./index.js dev && && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json";
            fs.writeFileSync(__dirname + "/package.json", JSON.stringify(constructor, null, 4));
            execute("npm install --prefer-offline");
            throw "initalization complete";
            break;
    }
}
if (variant == "production") {
    constructor.scripts = {
        preinstall: "",
        postinstall: "gulp build && node index.js",
    };
    delete constructor.files;
    delete constructor.bin;
}
else if (variant == "development") {
    constructor.scripts = {
        preinstall: "node ./index.js dev",
        postinstall: "node ./index.js && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json",
    };
    constructor.bin = "./libs/bin";
    constructor.files = ["./libs/"];
}
else if (variant == "fix") {
    execute("tsc -p tsconfig.build.json").then(function () {
        execute("tsc -p tsconfig.precompiler.json").then(function () {
            execute("tsc -p tsconfig.compiler.json");
        });
    });
    Process.exit(1);
}
var log, sorter;
if (module_exists("sorter")) {
    log = require("./libs/compiler/log");
    sorter = require("./libs/compiler/sorter");
    writenow(constructor);
}
else {
    if (variant == "production") {
        constructor.scripts = {
            preinstall: "",
            postinstall: "node index.js fix",
        };
    }
    constructor.dependencies = object_duplicate_fix(rootmodule.dependencies, rootmodule.devDependencies);
    fs.writeFileSync(__dirname + "/package.json", JSON.stringify(constructor, null, 2), { encoding: "utf-8" });
}
function writenow(packageObject) {
    fs.writeFile(path.join(__dirname, "package.json"), JSON.stringify(sorter.reorder(packageObject), null, 4), function (err) {
        if (!err) {
            log.log(log.success("success"));
        }
        else {
            log.log(log.error(err));
        }
    });
}
function object_duplicate_fix(source, target) {
    var result = Object.keys(source).filter(function (el) {
        var dups = !Object.keys(target).includes(el);
        if (dups) {
            console.log(el + " duplicate, removing...");
            return dups;
        }
    });
    return result;
}
exports.object_duplicate_fix = object_duplicate_fix;
function merge_package(sharedmodule, submodule, prefer) {
    if (prefer === void 0) { prefer = null; }
    var rootmodule = require(sharedmodule);
    if (prefer == "dev") {
        Object.assign(rootmodule.devDependencies, submodule);
    }
    var types = [];
    for (var key in submodule) {
        if (submodule.hasOwnProperty(key)) {
            if (prefer == "auto") {
                if (!key.includes("@types")) {
                    types.push("@types/" + key);
                    rootmodule.devDependencies[key] = "*";
                }
                else {
                    rootmodule.dependencies[key] = "*";
                }
            }
        }
    }
    return rootmodule;
}
exports.merge_package = merge_package;
function execPromise(command) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec(command, function (error, stdout, stderr) {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}
exports.execPromise = execPromise;
function array_remove(source, target) {
    return source.filter(function (el) {
        return !target.includes(el);
    });
}
exports.array_remove = array_remove;
function config_builder() {
    var config = require("./config.json");
    var fs = require("fs");
    var parsed = JSON.stringify(parseConfig(config, true), null, 2);
    fs.writeFileSync("./config-backup.json", parsed);
    var str = fs
        .readFileSync("./libs/src/compiler/config.ts", {
        encoding: "utf-8",
    })
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
function module_exists(tmodule, global) {
    if (global === void 0) { global = false; }
    var test = function (tmodule) {
        try {
            console.log(require.resolve(tmodule));
            return true;
        }
        catch (e) {
            console.error(tmodule + " is not found");
            return false;
        }
    };
    if (typeof tmodule == "string") {
        return test(tmodule);
    }
    var tests = [];
    if (Array.isArray(tmodule)) {
        tmodule.forEach(function (single) {
            tests.push(test(single));
        });
        if (!tests.every(Boolean)) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.module_exists = module_exists;
function install_modules(modules) {
    var install = function (s_module) {
        if (!module_exists(s_module)) {
            var save = s_module.includes("@types") ? "--save-dev" : "--save";
            execute("npm install " + s_module + " --prefer-offline " + save);
        }
    };
    if (typeof modules == "string") {
        install(modules);
    }
    else if (Array.isArray(modules)) {
        modules.forEach(function (single_module) {
            install(single_module);
        });
    }
}
exports.install_modules = install_modules;
var cmd_queue = [];
var cmd_lock = null;
var child_process_1 = require("child_process");
function execute(cmds) {
    var run = function (cmd) {
        return new Promise(function (resolve, reject) {
            child_process_1.exec(cmd, function (error, stdout, stderr) {
                if (error) {
                    reject(error);
                }
                resolve(stdout ? stdout : stderr);
            });
        });
    };
    cmd_queue.push(cmds);
    if (cmd_lock) {
        return console.log("Execution in queue, waiting...");
    }
    else {
        cmd_lock = true;
        return run(cmd_queue[0])
            .then(function () {
            cmd_queue.shift();
            cmd_lock = false;
            return execute(null);
        })
            .catch(function (error) {
            console.warn(error);
        });
    }
}
exports.execute = execute;
//# sourceMappingURL=index.js.map