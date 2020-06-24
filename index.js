//@ts-check
const fs = require('fs');
const path = require('path');
const log = require('./libs/compiler/log');
const core = require('./libs/compiler/core');
const sorter = require('./libs/compiler/sorter');
const process = require('process');
const args = process.argv.slice(2);

//shared packages.json
const root_pkg = require('./libs/package.json');
const gui_pkg = require('./libs/gui/package.json');
const app_pkg = require('./libs/js/package.json');
const compiler_pkg = require('./libs/compiler/package.json');
const sftp_pkg = require('./libs/bin/syncjs/package.json');
const ytd_pkg = require('./libs/bin/ytd/package.json');
const locutus_pkg = require('./libs/src/locutus/package.json');
log.clear();

/**
 * @type {"production"|"development"}
 */
var variant = 'production';
if (typeof args[0] != 'undefined') {
  if (args[0] == 'dev') {
    variant = 'development';
    const modifyConfig = require('./index-config');
  }
}

if (variant == 'production') {
  delete root_pkg.scripts;
  delete root_pkg.files;
  delete root_pkg.bin;
}

Object.assign(
  root_pkg.dependencies,
  locutus_pkg.dependencies,
  ytd_pkg.dependencies,
  sftp_pkg.dependencies,
  gui_pkg.dependencies,
  app_pkg.dependencies,
  compiler_pkg.dependencies
);
Object.assign(
  root_pkg.devDependencies,
  ytd_pkg.devDependencies,
  locutus_pkg.devDependencies,
  sftp_pkg.devDependencies,
  gui_pkg.devDependencies,
  app_pkg.devDependencies,
  compiler_pkg.devDependencies
);

for (const key in root_pkg.dependencies) {
  if (root_pkg.dependencies.hasOwnProperty(key)) {
    if (key.trim() == '') {
      delete root_pkg.dependencies[key];
      continue;
    }

    root_pkg.dependencies[key] = '*';
  }
}

for (const key in root_pkg.devDependencies) {
  if (root_pkg.devDependencies.hasOwnProperty(key)) {
    if (key.trim() == '') {
      delete root_pkg.devDependencies[key];
      continue;
    }
    root_pkg.devDependencies[key] = '*';
  }
}

fs.exists(path.join(__dirname, 'package-lock.json'), function (exists) {
  if (exists) {
    const lock = require('./package-lock.json');
    for (const key in lock.dependencies) {
      if (lock.dependencies.hasOwnProperty(key)) {
        const pkg = lock.dependencies[key];
        if (pkg.hasOwnProperty('requires')) {
          for (const key in pkg.requires) {
            if (pkg.requires.hasOwnProperty(key)) {
              if (/^\@/s.test(key)) {
                log.log(`added ${log.chalk().blue(key)}`);
                root_pkg.devDependencies[key] = pkg.requires[key];
              }
            }
          }
        }
      }
    }
  } else {
    log.log(log.error('package-lock.json read failed'));
  }

  for (const key in root_pkg.devDependencies) {
    if (root_pkg.devDependencies.hasOwnProperty(key)) {
      const dev_pkg = root_pkg.devDependencies[key];
      if (typeof root_pkg.dependencies[key] != 'undefined') {
        delete root_pkg.dependencies[key];
      }
    }
  }
  writenow(root_pkg);
});

/**
 * write package
 * @param {Object} packageObject
 */
function writenow(packageObject) {
  fs.writeFile(
    path.join(__dirname, 'package.json'),
    JSON.stringify(sorter.reorder(packageObject), null, 4),
    function (err) {
      if (!err) {
        log.log(log.success('success'));
      } else {
        log.log(log.error(err));
      }
    }
  );
}
