console.clear();

const fs = require('fs');
const path = require('path');
const slash = require('slash');
const core = require('./core');
const shell = require('child_process');
const sass = require('node-sass');
const chalk = require('chalk');
const log = console.log;
const clear = console.clear;
const uglifycss = require('uglifycss');
const watch_runner = [];
const watch_global = {
  'sass': new Date(),
  'babel': new Date(),
  'glob': new Date()
}

/**
 * Begin minify watcher
 */

watch(core.root() + '/views');
watch(core.root() + '/src');
watch(core.root() + '/libs/js');
setTimeout(() => {}, 60000);



function minJSFolder(dir) {
  fs.exists(instance, function(exists) {
    if (exists && fs.lstatSync(dir).isDirectory()) {
      core.minify_folder(dir);
    }
  });
}

function minJS(filepath) {
  if (/\.(js|ts)$/s.test(filepath) && !/^(node_modules|processed|vendor|assets|tmp)$/s.test(filepath)) {
    var filejs = slash(path.resolve(filepath));
    core.minify(filejs);
  }
}

/**
 * minify css to *.min.css version
 * @param {string} file
 */
function minCSS(file) {
  fs.exists(file, function(exists) {
    if (exists && !/\.min\.css$/s.test(file)) {
      var min = file.replace(/\.css/s, '.min.css');
      fs.readFile(file, {
        encoding: 'utf-8'
      }, function(err, data) {
        if (!err) {
          fs.writeFile(min, data, function(err) {
            if (!err) {
              uglifycss.processFiles(
                [min], {
                  maxLineLen: 500,
                  expandVars: true
                }
              );
            } else {
              log(chalk.red(err));
            }
          });
        } else {
          log(chalk.red(err));
        }
      });
    }
  });
}

var instances = [];

setInterval(() => {
  instances = instances.filter(function(el) {
    return el != null;
  });
  if (instances.length) {
    clear();
    /**
     * @type {{ext: ".css" | ".js" | ".php" | ".min.js" | ".min.css", file: string, dir: string}}
     */
    var instance = instances[0];
    log('Queue: ' + instances.length);
    log('current: ' + JSON.stringify(instance, null, 4) + "\n");

    if (!isLibs(instance.file)) {
      if (instance.ext == '.js') {
        minJS(instance.file);
        core.obfuscate(instance.file);
      } else if (instance.ext == '.css') {
        minCSS(instance.file);
      }
    }
    delete instances[0]; //force delete
  }
}, 2000);

var runningLibs = null;
/**
 * check if library scripts
 * @param {string} file
 */
function isLibs(file) {
  var is = file.includes('/libs/js');
  if (is) { // framework library true
    log(chalk.red('Library framework'));
    const tsconfig = core.root() + '/tsconfig.build.json';
    if (!runningLibs) {
      runningLibs = shell.exec(`tsc -p ${tsconfig}`, function(err, stdout, stderr) {
        runningLibs = null;
      });
    }
    return true;
  }
  return is;
}

function watch(dir) {
  if (!dir.endsWith('/')) {
    dir += '/';
  }
  if (watch_runner) {
    if (watch_runner.includes(dir)) {
      return;
    }
  }
  watch_runner.push(watch_runner);
  fs.watch(dir, {
    persistent: true,
    recursive: true
  }, function(event, filename) {
    if (filename && event == 'change') {
      var filechanged = slash(dir + filename);
      var allowed = !filechanged.endsWith('min.js') &&
        /\.(js|ts)$/s.test(filechanged) &&
        fs.existsSync(filechanged);
      if (allowed) {
        var push = true;
        instances.filter(function(instance) {
          if (instance && instance.hasOwnProperty('dir')) {
            if (instance.dir == dir) {
              push = false;
            }
          }
        });

        if (push && !isLibs(filechanged)) {
          var opt = {
            dir: dir,
            ext: path.extname(filechanged),
            file: filechanged
          };
          instances.push(opt);
        }
      }
    }
  });
}