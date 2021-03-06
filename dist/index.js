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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvREFBb0Q7OztBQUVwRDs7R0FFRztBQUVILDZDQUF5QjtBQUN6Qix3Q0FBdUM7QUFFdkMsdURBQW1DO0FBQ25DLG1GQUFxRDtBQUNyRCw0Q0FPNkI7QUFDN0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFbkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDMUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNwRCxDQUFDO0FBQ0YsSUFBSSxPQUFPLEdBQWdELElBQUksQ0FBQztBQUNoRSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztBQUV6QyxJQUFJLEtBQUssRUFBRTtJQUNULGNBQU8sQ0FBQyxLQUFLLEVBQUUsY0FBYSxDQUFDLENBQUMsQ0FBQztDQUNoQztBQUVELElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxFQUFFO0lBQ2pDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2YsS0FBSyxLQUFLO1lBQ1IsYUFBSyxFQUFFLENBQUM7WUFDUixPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLE1BQU07UUFFUixLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssYUFBYTtZQUNoQixPQUFPLEdBQUcsYUFBYSxDQUFDO1lBQ3hCLHFCQUFjLEVBQUUsQ0FBQztZQUNqQixNQUFNO1FBRVIsS0FBSyxNQUFNO1lBQ1QsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLGdDQUFnQyxDQUFDO1lBQ2xFLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVztnQkFD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