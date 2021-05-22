import * as fs from "fs";
import { exec } from "child_process";
import * as path from "path";
import { dirname } from "path";
import * as Process from "process";
import { localStorage } from "../node-localstorage/index";
//const { promisify } = require("util");
import { promisify } from "util";
import observatory from "../observatory/lib/observatory";
import chalk from "chalk";
import dns from "dns";
import sorter from "./sorter";

/**
 * Check connectivity
 */
export function isOffline() {
  var res = null;
  dns.resolve("www.google.com", function (err) {
    if (err) {
      res = true;
    } else {
      res = false;
    }
  });
  return res;
}

/**
 * Locate asset file
 * @param file
 */
export function asset(file: string) {
  file = file.toString().trim().replace(/\.\//gm, "");
  if (fs.existsSync(file)) {
    return file;
  } else if (fs.existsSync(`./${file}`)) {
    return `./${file}`;
  } else if (fs.existsSync(path.join(Process.cwd(), file))) {
    return path.join(Process.cwd(), file);
  }
}

/**
 * Smart read file
 * @param file
 */
export function readFile(file: string) {
  if (fs.existsSync(file)) {
    return fs.readFileSync(file).toString();
  }
  return `${file} not found`;
}

/**
 * write package
 * @param packageObject
 */
export function writenow(packageObject: packagejson) {
  var sorterFound = trycatch(function () {
    return true;
  });

  if (packageObject && typeof packageObject == "object" && count(packageObject) > 0) {
    if (sorterFound) {
      fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(sorter.reorder(packageObject), null, 4), {
        encoding: "utf-8",
      });
    } else {
      console.log("sorter not found, using default...");
      fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(packageObject, null, 4), {
        encoding: "utf-8",
      });
    }
  } else {
    console.warn("not object", typeof packageObject);
  }
}

export function random_hex(familiar?: boolean) {
  if (familiar) {
    var choose = {
      aqua: "#00ffff",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      black: "#000000",
      blue: "#0000ff",
      brown: "#a52a2a",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgrey: "#a9a9a9",
      darkgreen: "#006400",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkviolet: "#9400d3",
      fuchsia: "#ff00ff",
      gold: "#ffd700",
      green: "#008000",
      indigo: "#4b0082",
      khaki: "#f0e68c",
      lightblue: "#add8e6",
      lightcyan: "#e0ffff",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      magenta: "#ff00ff",
      maroon: "#800000",
      navy: "#000080",
      olive: "#808000",
      orange: "#ffa500",
      pink: "#ffc0cb",
      purple: "#800080",
      violet: "#800080",
      red: "#ff0000",
      silver: "#c0c0c0",
      white: "#ffffff",
      yellow: "#ffff00",
    };
    var values = Object.values(choose);
    return values[Math.floor(Math.random() * values.length)];
  } else {
    return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
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
 * Random RGB color
 */
export function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + r().toFixed(1) + ")";
}

/**
 * Fix dependencies and devDependencies
 * @param pkg
 */
export async function fixDeps(pkg: packagejson) {
  const ori = pkg;
  if (!pkg.hasOwnProperty("dependencies")) {
    console.error("package.json does not have dependencies");
    throw pkg;
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
  if (typeof pkg == "object" && Object.keys(pkg).length) {
    return pkg;
  }
  return ori;
}

var execute_is_running = false;
var execute_dump = [];

/**
 * Execute command schedule
 * @param cmds
 * @requires NodeJS
 * @param callback
 */
export function execute(cmd: string | null, callback: (arg0: boolean, arg1: string | Error) => any = null): any {
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
export function module_exists(tmodule: Array<string> | string, global: boolean = false, dump: boolean = false) {
  const test = function (tmodule: string, global: boolean) {
    var result = null;
    execute(("npm list -json -depth=0 " + (global ? "-g" : "")).trim(), function (error, message) {
      if (message instanceof Error || !error) {
        result = false;
      } else {
        try {
          var json: npmlist = JSON.parse(message);

          result = Object.keys(json.dependencies).includes(tmodule);
          if (dump) {
            console.log(`${tmodule} is ${result ? "installed" : "not installed"}`);
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
  const config = require(asset("./config.json"));
  var parsed = JSON.stringify(parseConfig(config, true), null, 2);

  if (fs.existsSync(asset("./libs"))) {
    console.error("Libs folder not exists, exiting config builder.");
    return null;
  }

  fs.writeFileSync(asset("./config-backup.json"), parsed, {
    encoding: "utf-8",
  });
  var str = fs
    .readFileSync(asset("./libs/src/compiler/config.ts"), {
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
  fs.writeFileSync(asset("./libs/src/compiler/config.ts"), mod);

  function parseConfig(config: { [key: string]: any }, usingExclude: boolean = null) {
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
      resolve(true);
    } else {
      reject(false);
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
      writeFile(`./tmp/npm/packages/${key}/latest.json`, JSON.parse(message.toString()));
    } catch (error) {}
  });
}

/**
 * Async execute commands
 * @param commands
 * @param callback callback for each command return
 */
export function async_exec(commands: string[], callback: (stdout: string, stderr: string, isLast: boolean) => any) {
  if (!Array.isArray(commands)) {
    console.error("commands must be instance of array");
    return null;
  }
  const executor = promisify(exec);
  const exec2 = async function () {
    let script: string;
    let index = 0;
    for await (script of commands) {
      try {
        let { stdout, stderr } = await executor(script);
        if (typeof callback == "function") {
          callback(stdout, stderr, !--commands.length);
        }
      } catch (e) {
        console.error(e);
      }
      index++;
    }
    return true;
  };
  return exec2;
}

localStorage.removeItem("list_package_latest");
localStorage.removeItem("list_package");

/**
 * Get list packages and fetch latest version
 */
export function list_package() {
  if (isOffline()) {
    console.error("Are you offline");
    return;
  }
  if (!localStorage.getItem("list_package")) {
    localStorage.setItem("list_package", "true");
    var global = exec("npm list -json -depth=0 -g");
    global.stdout.on("data", function (data) {
      writeFile("./tmp/npm/global.json", data);
    });
    global.stderr.on("data", function (data) {
      writeFile("./tmp/npm/global-error.json", data);
    });

    var local = exec("npm list -json -depth=0");
    local.stdout.on("data", function (data) {
      try {
        data = JSON.parse(data);
        if (fs.existsSync("./tmp/npm/local.json")) {
          var old = JSON.parse(fs.readFileSync("./tmp/npm/local.json").toString());
          if (old) {
            data = Object.assign({}, data, old);
          }
        }
        if (data.hasOwnProperty("dependencies") && !localStorage.getItem("list_package_latest")) {
          localStorage.setItem("list_package_latest", "1");
          const executor = promisify(exec);
          const dependencies = Object.keys(data.dependencies);
          const checkLatest = async function () {
            //observatory.settings({ prefix: chalk.cyan("[Buzz] ") });
            var task = observatory.add("Fetch latest version");

            for await (const key of dependencies) {
              if (data.dependencies.hasOwnProperty(key)) {
                try {
                  var { stdout } = await executor("npm show " + key + " version");
                  data.dependencies[key].latest = stdout.trim();
                  if (!key.includes("@types")) {
                    var { stdout } = await executor("npm view @types/" + key + " version -json");
                    if (stdout.trim().length) {
                      data.dependencies[key].types = {
                        name: "@types/" + key,
                        version: stdout.trim(),
                      };
                    } else {
                      data.dependencies[key].types = {
                        name: null,
                        version: null,
                      };
                    }
                  }
                  writeFile("./tmp/npm/local.json", data);
                  task
                    .status(
                      ((dependencies.length * 100) / Object.keys(data.dependencies).length).toFixed(3).toString() + "%"
                    )
                    .details(chalk.hex(random_hex(true)).underline(key));
                } catch (error) {
                  console.error(error);
                }
                if (!--dependencies.length) {
                  localStorage.removeItem("list_package_latest");
                  task.done("Complete");
                }
              }
            }
          };

          checkLatest()
            .catch(function (err) {})
            .then(function () {
              localStorage.removeItem("list_package");
            });
        }
      } catch (error) {}
    });
    local.stderr.on("data", function (data) {
      writeFile("./tmp/npm/local-error.json", data);
    });
  } else {
    console.warn(
      "process for list_package is locked, if previous runner got error, please fix it using `node index.js fix`"
    );
  }
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
