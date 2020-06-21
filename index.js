const fs = require('fs');
const path = require('path');
const root_pkg = require("./package-ori.json");
const gui_pkg = require("./libs/gui/package.json");
const app_pkg = require("./libs/js/package.json");
const compiler_pkg = require("./libs/compiler/package.json");
const log = require('./libs/compiler/log').log;
const core = require('./libs/compiler/core').core;

Object.assign(root_pkg.dependencies, gui_pkg.dependencies, app_pkg.dependencies, compiler_pkg.dependencies);
Object.assign(root_pkg.devDependencies, gui_pkg.devDependencies, app_pkg.devDependencies, compiler_pkg.devDependencies);

for (const key in root_pkg.dependencies) {
    if (root_pkg.dependencies.hasOwnProperty(key)) {
        if (key.trim() == '') {
            delete root_pkg.dependencies[key];
            continue;
        }
        root_pkg.dependencies[key] = "*";
    }
}

for (const key in root_pkg.devDependencies) {
    if (root_pkg.devDependencies.hasOwnProperty(key)) {
        if (key.trim() == '') {
            delete root_pkg.devDependencies[key];
            continue;
        }
        root_pkg.devDependencies[key] = "*";
    }
}

/*.filter(function (el) {
    return el != null;
})*/

fs.writeFile(path.join(__dirname, 'package.json'), JSON.stringify(root_pkg, null, 4), function (err) {
    if (!err) {
        log.log(log.success('success'));
    } else {
        log.log(log.error(err));
    }
});