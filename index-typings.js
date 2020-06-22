const fs = require("fs");
const path = require("path");
const upath = require("upath");

const log = require("./libs/compiler/log");

const core = require("./libs/compiler/core");
const sorter = require("./libs/compiler/sorter").sorter;
const ncp = require("ncp").ncp;
//shared packages.json
const root_pkg = require("./package.json");
const packages = {};
Object.assign(packages, root_pkg.dependencies, root_pkg.devDependencies);
return; //on development
console.clear();

for (const key in packages) {
  if (packages.hasOwnProperty(key)) {
    //D:\dimaslanjaka.github.io\php-yt-api\node_modules\sweetalert\typings
    const typings = `./node_modules/${key}/typings`;
    const move_to = `./libs/typings/${key}`;
    fs.exists(move_to, function (exists) {
      if (!exists) {
        fs.mkdir(move_to, { recursive: true }, function (err) {});
      }
      if (path.resolve(typings).trim().length) {
        //log(path.resolve(typings), fs.existsSync(typings));

        fs.exists(typings, function (exists) {
          if (exists) {
            ncp.limit = 100;
            
            ncp(typings, move_to, function (err) {
              if (err) {
                return log.log(log.error(err));
              }
              log.log(`${typings} ${move_to} done!`);
            });
          }
        });
      }
    });
  }
}
