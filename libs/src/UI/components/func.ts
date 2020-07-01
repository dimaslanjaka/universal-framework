import * as fs from "fs";
import { exec, spawn, spawnSync, execSync } from "child_process";
import * as path from "path";
import * as Process from "process";
//import { spawn } from "child_process";
import * as http from "http";
import { dirname } from "path";
require("./consoler");

/**
 * write package
 * @param packageObject
 */
export function writenow(packageObject: packagejson) {
  var sorter: { length: any; reorder: (arg0: object) => any };
  var log: {
    log: (arg0: any) => void;
    success: (arg0: string) => any;
    error: (arg0: any) => any;
  };

  var sorterFound = trycatch(function () {
    log = require("./libs/compiler/log");
    sorter = require("./libs/compiler/sorter");
    return true;
  });

  if (
    packageObject &&
    typeof packageObject == "object" &&
    count(packageObject) > 0
  ) {
    if (sorterFound) {
      fs.writeFileSync(
        path.join(__dirname, "package.json"),
        JSON.stringify(sorter.reorder(packageObject), null, 4),
        { encoding: "utf-8" }
      );
    } else {
      console.log("sorter not found, using default...");
      fs.writeFileSync(
        path.join(__dirname, "package.json"),
        JSON.stringify(packageObject, null, 4),
        { encoding: "utf-8" }
      );
    }
  } else {
    console.warn("not object", typeof packageObject);
  }
}

/**
 * Write file recursive
 * @param path
 * @param contents
 * @param cb
 */
export function writeFile(
  path: string | number | Buffer | import("url").URL,
  contents: any,
  cb?: { (arg0: any): any; (err: NodeJS.ErrnoException): void }
) {
  try {
    contents = JSON.parse(contents.toString());
  } catch (error) {}
  if (typeof contents == "object" || Array.isArray(contents)) {
    contents = JSON.stringify(contents, null, 2);
  }
  resolve_dir(dirname(path.toString()));

  if (typeof contents == "string") {
    if (fs.existsSync(dirname(path.toString()))) {
      if (typeof cb == "function") {
        fs.writeFile(path.toString(), contents.toString(), cb);
      } else {
        fs.writeFileSync(path.toString(), contents.toString());
      }
      return true;
    }
  }
  console.error(`contents must be type string, instead of ${typeof contents}`);
  return false;
}

/**
 * Resolve directory, create if not exists
 * @param path
 */
export function resolve_dir(path: string) {
  if (!fs.existsSync(dirname(path.toString()))) {
    resolve_dir(dirname(path.toString()));
  }

  if (!fs.existsSync(path.toString())) {
    fs.mkdirSync(path.toString());
  }
}

/**
 * Fix dependencies and devDependencies
 * @param pkg
 */
export function fixDeps(pkg: packagejson) {
  if (!pkg.hasOwnProperty("dependencies")) {
    console.error("package.json does not have dependencies");
    return pkg;
  }
  for (const key in pkg.dependencies) {
    if (pkg.dependencies.hasOwnProperty(key)) {
      const version = pkg.dependencies[key];
      var dups = Object.keys(pkg.devDependencies).includes(key);
      if (dups) {
        console.warn(`${key} duplicate, removing...`);
        delete pkg.dependencies[key];
      }
      if (key.includes("@types")) {
        console.warn(`${key} is typehinting module, moving to dev...`);
        pkg.devDependencies[key] = version;
        delete pkg.dependencies[key];
      }
    }
  }
  return pkg;
}

var execute_is_running = false;
var execute_dump = [];
/**
 * Execute command schedule
 * @param cmds
 * @requires NodeJS
 * @param callback
 */
export function execute(
  cmd: string | null,
  callback: (arg0: boolean, arg1: string | Error) => any = null
) {
  if (typeof cmd != "string") {
    console.log(typeof cmd + " not string");
    return;
  }
  if (execute_is_running === false) {
    execute_is_running = true;
    exec(cmd.trim(), (error, stdout, stderr) => {
      setTimeout(function () {
        execute_is_running = false;
      }, 500);
      if (error instanceof Error) {
        if (error.hasOwnProperty("code")) {
          console.error(error.code);
        } else if (error.hasOwnProperty("message")) {
          console.error(error.message);
        } else {
          console.error(error);
        }
        if (typeof callback == "function") {
          if (stdout) {
            callback(false, new Error(stdout));
          } else if (stderr) {
            callback(false, new Error(stderr));
          } else {
            callback(false, new Error("error"));
          }
        }
        console.error(error);
      } else {
        if (typeof callback != "function") {
          console.log("callback is not function", stdout ? stdout : stderr);
        } else {
          if (stdout) {
            callback(true, stdout);
          } else if (stderr) {
            callback(false, stderr);
          }
        }
      }
    });
  } else {
    if (execute_dump && !execute_dump.includes(cmd)) {
      console.warn("executor still running, please wait");
      execute_dump.push(cmd);
    }
    setTimeout(function () {
      execute(cmd, callback);
    }, 1000);
  }
}

/**
 * check if module exists
 * @param tmodule
 * @requires node
 */
export function module_exists(
  tmodule: Array<string> | string,
  global: boolean = false,
  dump: boolean = false
) {
  const test = function (tmodule: string, global: boolean) {
    var result = null;
    execute("npm list -json -depth=0 " + (global ? "-g" : ""), function (
      error,
      message
    ) {
      if (message instanceof Error || !error) {
        result = false;
      } else {
        try {
          var json: npmlist = JSON.parse(message);

          result = Object.keys(json.dependencies).includes(tmodule);
          if (dump) {
            console.log(
              `${tmodule} is ${result ? "installed" : "not installed"}`
            );
          }
        } catch (error) {
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

/**
 * Configuration builder
 */
export function config_builder() {
  const config = require("./config.json");
  var parsed = JSON.stringify(parseConfig(config, true), null, 2);

  if (fs.existsSync("./libs")) {
    console.error("Libs folder not exists, exiting config builder.");
    return null;
  }

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
  var mod = str.replace(regex, `config:${parsed} = require`);
  fs.writeFileSync("./libs/src/compiler/config.ts", mod);

  function parseConfig(
    config: { [key: string]: any },
    usingExclude: boolean = null
  ) {
    const excluded = function (key: string) {
      return ["vscode"].indexOf(key) == -1;
    };
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        if (!excluded(key) && usingExclude) {
          continue;
        }
        const element = config[key];
        const type = typeof element;
        if (["number", "string", "boolean"].indexOf(type) != -1) {
          config[key] = type;
        } else if (type == "object") {
          config[key] = parseConfig(config[key]);
        } else if (Array.isArray(config[key])) {
          config[key].forEach(parseConfig);
        }
      }
    }
    return config;
  }
}

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
export function array_remove(source: Array<string>, target: Array<string>) {
  return source.filter(function (el) {
    return !target.includes(el);
  });
}

/**
 * Create Shared Modules
 */
export function shared_packages() {
  const libs: packagejson = require("./libs/package.json");
  const packages = {};
  Object.assign(packages, libs.dependencies, libs.devDependencies);

  const common: packagejson = require("./libs/js/package.json");
  Object.assign(packages, common.dependencies, common.devDependencies);

  const compiler: packagejson = require("./libs/src/compiler/package.json");
  Object.assign(packages, compiler.dependencies, compiler.devDependencies);

  const gui: packagejson = require("./libs/src/gui/package.json");
  Object.assign(packages, gui.dependencies, gui.devDependencies);

  const locutus: packagejson = require("./libs/src/locutus/package.json");
  Object.assign(packages, locutus.dependencies, locutus.devDependencies);

  const observatory: packagejson = require("./libs/src/observatory/package.json");
  Object.assign(
    packages,
    observatory.dependencies,
    observatory.devDependencies
  );

  const sassjs: packagejson = require("./libs/src/sass.js/package.json");
  Object.assign(packages, sassjs.dependencies, sassjs.devDependencies);

  const syncs: packagejson = require("./libs/src/syncs/packages.json");
  Object.assign(packages, syncs.dependencies, syncs.devDependencies);

  const ytdl: packagejson = require("./libs/src/ytdl/package.json");
  Object.assign(packages, ytdl.dependencies, ytdl.devDependencies);

  var pkg: packagejson = require("./package.json");
  pkg.dependencies = packages;
  pkg = fixDeps(pkg);
  return pkg;
}

/**
 * Array object counter
 * @param objarr
 */
export function count(objarr: any[] | object) {
  if (Array.isArray(objarr)) {
    return objarr.length;
  } else if (typeof objarr == "object") {
    return Object.keys(objarr).length;
  }
}

/**
 * Do trycatch
 * @param callback
 */
export function trycatch(callback: () => any) {
  try {
    var test = callback();
    if (typeof test == "boolean") {
      return test;
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Async current function
 * @param callback
 */
export function async(callback: Function) {
  return new Promise(async function (resolve, reject) {
    if (typeof callback == "function") {
      await callback();
      resolve();
    } else {
      reject();
    }
  });
}

/**
 * Get latest version of packages
 * @param key
 */
export function getLatestVersion(key: string) {
  execute(`npm show ${key} version`, function (error, message) {
    if (message instanceof Error || !error) {
      console.error(error);
    }
    try {
      writeFile(
        `./tmp/npm/packages/${key}/latest.json`,
        JSON.parse(message.toString())
      );
    } catch (error) {}
  });
}

var timer_list = null;
var timer_run = null;

export function list_package() {
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

    var local = exec("npm list -json -depth=0");
    local.stdout.on("data", function (data) {
      writeFile("./tmp/npm/local.json", data);
    });
    local.stderr.on("data", function (data) {
      writeFile("./tmp/npm/local-error.json", data);
    });

    var global = exec("npm list -json -depth=0");
    global.stdout.on("data", function (data) {
      writeFile("./tmp/npm/global.json", data);
    });
    global.stderr.on("data", function (data) {
      writeFile("./tmp/npm/global-error.json", data);
    });
  }, 5000);
}

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
