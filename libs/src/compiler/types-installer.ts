/*
 import fs from "fs";
 import log from "./log";
 //shared packages.json

 // eslint-disable-next-line @typescript-eslint/no-var-requires
 const { exec } = require("child_process");

 const root_pkg: {
 dependencies: {};
 devDependencies: {};
 } = JSON.parse(fs.readFileSync(process.cwd() + "/package.json").toString());
 const packages = {};
 Object.assign(packages, root_pkg.dependencies, root_pkg.devDependencies);

 let TypesLists = [];
 let types = [];
 const already = [];
 for (const key in packages) {
 if (packages.hasOwnProperty(key)) {
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
 exec(
 `npm install ${types[0]} --save-dev --prefer-offline`,
 function (err: { message: string }, stdout: any, stderr: any) {
 if (!err) {
 console.log(stdout);
 console.log(stderr);
 } else {
 log.log(log.error(err.message));
 }
 types.shift();
 installTypes();
 }
 );
 }
 */
