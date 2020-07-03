/// <reference path="./src/compiler/globals.d.ts" />

/**
 * Package.json maintainer
 */

import * as fs from "fs";
import { serve } from "./src/UI/index";
import * as path from "path";
import * as Process from "process";
//import { spawn } from "child_process";
import filemanager from "./src/compiler/filemanager";
import { minify } from "./src/compiler/gulpfile";
import {} from "./src/syncs/sync";
import {
  config_builder,
  fixDeps,
  writeFile,
  execute,
  writenow,
  asset,
} from "./src/compiler/func";
const args = Process.argv.slice(2);

var constructor = JSON.parse(
  fs.readFileSync(asset("./package.json")).toString()
);
var variant: "production" | "development" | "gui" | null = null;
var isWin = process.platform === "win32";

if (isWin) {
  execute("cls", function () {});
}

if (typeof args[0] != "undefined") {
  switch (args[0]) {
    case "gui":
      serve();
      variant = "gui";
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
      if (fs.existsSync("./package.json")) {
        constructor = Object.assign(
          {},
          constructor,
          JSON.parse(fs.readFileSync("./package.json").toString())
        );
        constructor = fixDeps(constructor);
        writenow(constructor);
      }
      filemanager.unlink("./tmp/storage/compiler");
      filemanager.unlink("./tmp/storage/compile");

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
      execute("tsc -p tsconfig.main.json", function (success, message) {
        console.log(message);
      });
      break;
  }
} else {
  serve();
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
  } else if (variant == "development") {
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
  } else if (variant == "gui") {
  }
  if (["development", "fix"].includes(variant)) {
    writenow(constructor);
  }
}
