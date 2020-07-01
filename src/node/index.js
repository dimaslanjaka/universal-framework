"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var index_1 = require("./src/UI/index");
var Process = require("process");
var func_1 = require("./src/UI/components/func");
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
        bin: "./libs/bin",
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
    constructor = func_1.fixDeps(constructor);
    var variant = "production";
    if (typeof args[0] != "undefined") {
        switch (args[0]) {
            case "dev":
            case "development":
                variant = "development";
                func_1.config_builder();
                break;
            case "gui":
                index_1.serve();
                break;
            case "init":
                variant = null;
                constructor.scripts.preinstall = "npm install typescript gulp -g";
                constructor.scripts.postinstall =
                    "node ./index.js dev && && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json";
                fs.writeFileSync(__dirname + "/package.json", JSON.stringify(constructor, null, 4));
                func_1.execute("npm install --prefer-offline");
                break;
            case "test":
                variant = null;
                break;
            case "fix":
                func_1.execute("npm dedupe");
                func_1.execute("npm audit fix");
                variant = null;
                break;
            case "rebuild":
                variant = null;
                func_1.execute("tsc -p tsconfig.build.json", function (success, message) {
                    console.log(message);
                });
                func_1.execute("tsc -p tsconfig.precompiler.json", function (success, message) {
                    console.log(message);
                });
                func_1.execute("tsc -p tsconfig.compiler.json", function (success, message) {
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
            Object.assign(constructor.devDependencies, func_1.shared_packages().devDependencies);
            Object.assign(constructor.dependencies, func_1.shared_packages().dependencies);
        }
        if (["development", "production"].includes(variant)) {
            func_1.writenow(constructor);
        }
    }
}
index_1.serve();
//# sourceMappingURL=index.js.map