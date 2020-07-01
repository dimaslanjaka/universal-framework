/// <reference path="./src/UI/components/globals.d.ts" />

/**
 * Package.json maintainer
 */

import * as fs from "fs";
import { serve } from "./src/UI/index";
import * as path from "path";
import * as Process from "process";
//import { spawn } from "child_process";
import * as http from "http";
import {
  config_builder,
  fixDeps,
  writeFile,
  execute,
  shared_packages,
  writenow,
} from "./src/UI/components/func";

function run() {
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
  constructor = Object.assign({}, constructor, require("./package.json"));
  constructor = fixDeps(constructor);

  var variant: "production" | "development" | null = "production";

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
        fs.writeFileSync(
          __dirname + "/package.json",
          JSON.stringify(constructor, null, 4)
        );
        execute("npm install --prefer-offline");
        break;
      case "test":
        //npm.install(["node", 'async', "typescript", "tslib", "ts-node"]);
        //module_exists("node");
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
        execute("tsc -p tsconfig.precompiler.json", function (
          success,
          message
        ) {
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
    } else if (variant == "development") {
      constructor.scripts.preinstall = "node ./index.js dev";
      constructor.scripts.postinstall = "node ./index.js";
      constructor.bin = "./libs/bin";
      constructor.files = ["./libs/"];
      Object.assign(
        constructor.devDependencies,
        shared_packages().devDependencies
      );
      Object.assign(constructor.dependencies, shared_packages().dependencies);
      //console.log(constructor.dependencies);
    }
    if (["development", "production"].includes(variant)) {
      writenow(constructor);
    }
  }
}
serve();
//run();
//execute("npm list -json -depth=0");
