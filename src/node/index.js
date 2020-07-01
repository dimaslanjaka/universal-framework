"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var index_1 = require("./src/UI/index");
var Process = tslib_1.__importStar(require("process"));
var filemanager_1 = tslib_1.__importDefault(require("./src/compiler/filemanager"));
var func_1 = require("./src/UI/components/func");
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
var variant = null;
var isWin = process.platform === "win32";
if (isWin) {
    func_1.execute("cls", function () { });
}
if (typeof args[0] != "undefined") {
    switch (args[0]) {
        case "gui":
            index_1.serve();
            break;
        case "dev":
        case "development":
            variant = "development";
            func_1.config_builder();
            break;
        case "init":
            variant = null;
            constructor.scripts.preinstall = "npm install typescript gulp -g";
            constructor.scripts.postinstall =
                "node ./index.js dev && && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json";
            fs.writeFileSync(__dirname + "/package.json", JSON.stringify(constructor, null, 4));
            if (fs.existsSync("./node_modules")) {
                filemanager_1.default.unlink("./node_modules");
            }
            func_1.execute("npm install --prefer-offline");
            break;
        case "test":
            variant = null;
            break;
        case "fix":
            if (fs.existsSync("./package.json")) {
                constructor = Object.assign({}, constructor, JSON.parse(fs.readFileSync("./package.json").toString()));
                constructor = func_1.fixDeps(constructor);
                func_1.writenow(constructor);
            }
            filemanager_1.default.unlink("./tmp/storage/compiler");
            filemanager_1.default.unlink("./tmp/storage/compile");
            filemanager_1.default.unlink("./tmp/storage/list_package");
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
            func_1.execute("tsc -p tsconfig.main.json", function (success, message) {
                console.log(message);
            });
            break;
    }
}
else {
    index_1.serve();
}
if (variant) {
    console.log("variant", variant);
    if (variant == "production") {
        constructor.scripts.preinstall = "";
        constructor.scripts.postinstall = "";
        constructor.scripts.test = "";
        delete constructor.files;
        delete constructor.bin;
    }
    else if (variant == "development") {
        constructor.scripts.preinstall = "";
        constructor.scripts.postinstall = "";
        constructor.scripts.test = "";
        constructor.bin = "./libs/bin";
        constructor.files = ["./libs/"];
        Object.assign(constructor.devDependencies, func_1.shared_packages().devDependencies);
        Object.assign(constructor.dependencies, func_1.shared_packages().dependencies);
    }
    if (["development", "fix"].includes(variant)) {
        func_1.writenow(constructor);
    }
}
//# sourceMappingURL=index.js.map