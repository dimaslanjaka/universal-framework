const submodule = require("./libs/index");
const fs = require("fs");
const path = require("path");
const log = require("./libs/compiler/log");
const core = require("./libs/compiler/core");
const sorter = require("./libs/compiler/sorter");
const process = require("process");
const args = process.argv.slice(2);
const { exec } = require("child_process");

const constructor = {
  scripts: {
    preinstall: "",
    postinstall: "gulp build",
  },
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
    "tooling",
  ],
  scripts: {
    preinstall: "node ./index.js dev",
    postinstall:
      "node ./index.js && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json && gulp build",
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
};

/**
 * @type {"production"|"development"}
 */
var variant = "production";
if (typeof args[0] != "undefined") {
  if (args[0] == "dev") {
    variant = "development";
    config_builder();
  }
}

if (variant == "production") {
  constructor.scripts = {
    preinstall: "",
    postinstall: "gulp build && node index.js",
  };
  delete constructor.files;
  delete constructor.bin;
} else {
  constructor.scripts = {
    preinstall: "node ./index.js dev",
    postinstall:
      "node ./index.js && tsc -p tsconfig.build.json &&tsc -p tsconfig.precompiler.json && tsc -p tsconfig.compiler.json",
  };
  constructor.bin = "./libs/bin";
  constructor.files = ["./libs/"];
}

writenow(constructor);
exec("npm dedupe");
exec("npm install prettier -D --save-exact --prefer-offline");

/**
 * write package
 * @param {Object} packageObject
 */
function writenow(packageObject) {
  fs.writeFile(
    path.join(__dirname, "package.json"),
    JSON.stringify(sorter.reorder(packageObject), null, 4),
    function (err) {
      if (!err) {
        log.log(log.success("success"));
      } else {
        log.log(log.error(err));
      }
    }
  );
}

/**
 * Configuration builder
 */
function config_builder() {
  const config = require("./config.json");
  const fs = require("fs");

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
  var mod = str.replace(regex, `config:${parsed} = require`);
  fs.writeFileSync("./libs/src/compiler/config.ts", mod);

  function parseConfig(config, usingExclude) {
    const excluded = function (key) {
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
