import fs from "fs";
import upath from "upath";
import log from "./log";
import filemanager from "./filemanager";
//shared packages.json

import axios from "axios";
const { exec } = require("child_process");

const root_pkg: {
  dependencies: {};
  devDependencies: {};
} = JSON.parse(fs.readFileSync(process.cwd() + "/package.json").toString());
const packages = {};
Object.assign(packages, root_pkg.dependencies, root_pkg.devDependencies);

var TypesLists = [];
var types = [];
var already = [];
var exclude = ["animate.css"];
for (const key in packages) {
  if (packages.hasOwnProperty(key)) {
    const version = packages[key];
    if (!key.includes("@types")) {
      TypesLists.push(key);
      types.push(`@types/${key}`);
      TypesLists = shuffle(TypesLists);
    } else {
      already.push(key);
    }
  }
}

types = types.filter((el) => !already.includes(el));
installTypes();

function installTypes() {
  if (!types.length) {
    exec("npm rebuild");
    return;
  }
  exec(`npm install ${types[0]} --save-dev --prefer-offline`, function (
    err: { message: string },
    stdout: any,
    stderr: any
  ) {
    if (!err) {
      console.log(stdout);
      console.log(stderr);
    } else {
      log.log(log.error(err.message));
    }
    types.shift();
    installTypes();
  });
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: Array<any>) {
  var j: number, x: any, i: number;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
