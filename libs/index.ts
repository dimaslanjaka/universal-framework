/// <reference path="./src/UI/components/globals.d.ts" />

/**
 * Package.json maintainer
 */

import * as fs from "fs";
import { serve } from "./src/UI/index";
import * as path from "path";
import * as Process from "process";
//import { spawn } from "child_process";
import filemanager from "./src/compiler/filemanager";
import * as http from "http";
import {
  config_builder,
  fixDeps,
  writeFile,
  execute,
  shared_packages,
  writenow,
} from "./src/UI/components/func";
const args = Process.argv.slice(2);

var constructor: packagejson = {
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
    postinstall:
      "node ./index.js && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json && gulp build",
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

var variant: "production" | "development" | null = "production";

export function run() {
  if (typeof args[0] != "undefined") {
    switch (args[0]) {
      case "gui":
      default:
        serve();
        break;

      case "dev":
      case "development":
        variant = "development";
        config_builder();

        break;

      case "init":
        variant = null;
        constructor.scripts.preinstall = "npm install typescript gulp -g";
        constructor.scripts.postinstall =
          "node ./index.js dev && && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json";
        fs.writeFileSync(
          __dirname + "/package.json",
          JSON.stringify(constructor, null, 4)
        );
        if (fs.existsSync("./node_modules")) {
          filemanager.unlink("./node_modules");
        }
        execute("npm install --prefer-offline");
        break;
      case "test":
        //npm.install(["node", 'async', "typescript", "tslib", "ts-node"]);
        //module_exists("node");
        variant = null;
        break;
      case "fix":
        constructor = Object.assign({}, constructor, require("./package.json"));
        constructor = fixDeps(constructor);
        //framework.filemanager.
        variant = null;
        break;
      case "rebuild":
        variant = null;
        execute("tsc -p tsconfig.build.json", function (success, message) {
          console.log(message);
        });
        execute("tsc -p tsconfig.precompiler.json", function (
          success,
          message
        ) {
          console.log(message);
        });
        execute("tsc -p tsconfig.compiler.json", function (success, message) {
          console.log(message);
        });
        execute("tsc -p tsconfig.main.json", function (success, message) {
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
    } else if (variant == "development") {
      constructor.scripts.preinstall = "";
      constructor.scripts.postinstall = "";
      constructor.scripts.test = "";
      constructor.bin = "./libs/bin";
      constructor.files = ["./libs/"];
      Object.assign(
        constructor.devDependencies,
        shared_packages().devDependencies
      );
      Object.assign(constructor.dependencies, shared_packages().dependencies);
      //console.log(constructor.dependencies);
    }
    if (["development", "fix"].includes(variant)) {
      writenow(constructor);
    }
  }
}
//serve();
//run();
//execute("npm list -json -depth=0");
