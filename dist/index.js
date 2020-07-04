"use strict";
/// <reference path="./src/compiler/globals.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * Package.json maintainer
 */
var fs = tslib_1.__importStar(require("fs"));
var index_1 = require("./src/UI/index");
var Process = tslib_1.__importStar(require("process"));
//import { spawn } from "child_process";
var filemanager_1 = tslib_1.__importDefault(require("./src/compiler/filemanager"));
var func_1 = require("./src/compiler/func");
var args = Process.argv.slice(2);
var constructor = JSON.parse(fs.readFileSync(func_1.asset("./package.json")).toString());
var variant = null;
var isWin = process.platform === "win32";
if (isWin) {
    func_1.execute("cls", function () { });
}
if (typeof args[0] != "undefined") {
    switch (args[0]) {
        case "gui":
            index_1.serve();
            variant = "gui";
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
            //npm.install(["node", 'async', "typescript", "tslib", "ts-node"]);
            //module_exists("node");
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
else {
    index_1.serve();
    variant = "gui";
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
        /*Object.assign(
          constructor.devDependencies,
          shared_packages().devDependencies
        );
        Object.assign(constructor.dependencies, shared_packages().dependencies);*/
        //console.log(constructor.dependencies);
    }
    else if (variant == "gui") {
    }
    if (["development", "fix"].includes(variant)) {
        func_1.writenow(constructor);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvREFBb0Q7OztBQUVwRDs7R0FFRztBQUVILDZDQUF5QjtBQUN6Qix3Q0FBdUM7QUFFdkMsdURBQW1DO0FBQ25DLHdDQUF3QztBQUN4QyxtRkFBcUQ7QUFJckQsNENBTzZCO0FBQzdCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRW5DLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQzFCLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDcEQsQ0FBQztBQUNGLElBQUksT0FBTyxHQUFnRCxJQUFJLENBQUM7QUFDaEUsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7QUFFekMsSUFBSSxLQUFLLEVBQUU7SUFDVCxjQUFPLENBQUMsS0FBSyxFQUFFLGNBQWEsQ0FBQyxDQUFDLENBQUM7Q0FDaEM7QUFFRCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsRUFBRTtJQUNqQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNmLEtBQUssS0FBSztZQUNSLGFBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixNQUFNO1FBRVIsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLGFBQWE7WUFDaEIsT0FBTyxHQUFHLGFBQWEsQ0FBQztZQUN4QixxQkFBYyxFQUFFLENBQUM7WUFDakIsTUFBTTtRQUVSLEtBQUssTUFBTTtZQUNULE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxnQ0FBZ0MsQ0FBQztZQUNsRSxXQUFXLENBQUMsT0FBTyxD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