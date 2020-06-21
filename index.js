const fs = require('fs');
const path = require('path');
const root_pkg = require("./package-ori.json");
const gui_pkg = require("./libs/gui/package.json");
const compiler_pkg = require("./libs/compiler/package.json");
const log = require('./libs/compiler/log').log;

Object.assign(root_pkg.dependencies, gui_pkg.dependencies, compiler_pkg.dependencies);
Object.assign(root_pkg.devDependencies, gui_pkg.devDependencies, compiler_pkg.devDependencies);
fs.writeFile(path.join(__dirname, 'package.json'), JSON.stringify(root_pkg, null, 4), function (err) {
    if (!err) {
        log.success('success');
    } else {
        log.error(err);
    }
});
