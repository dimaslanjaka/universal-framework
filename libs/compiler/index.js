console.clear();
const fs = require('fs');
const path = require('path');
const slash = require('slash');
const core = require('./core');
const shell = require('child_process');
const chalk = require('chalk');
const log = console.log;
const clear = console.clear;
const watch_runner = [];
const mysql = require('mysql');
var config = require(`${core.root()}/config.json`);
/*if (config.hasOwnProperty('database')) {
  const database = config.database;
  var con = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.pass,
    port: database.port,
    database: database.dbname
  });
  con.connect(function(err) {
    if (err) {
      log(chalk.red(err));
    } else {
      log(chalk.green("Connected!"));
    }
  });
}*/
/**
 * Begin minify watcher
 */
watch(core.root() + '/views');
watch(core.root() + '/src');
watch(core.root() + '/libs/js');
watch(core.root() + '/assets');
/**
 * Composer auto update once day
 */
var today = new Date().toLocaleDateString();
var yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString();
if (!core.localStorage().getItem('composer') || core.localStorage().getItem('composer') == yesterday) {
    core.composer(core.root(), 'update');
    core.localStorage().setItem('composer', today);
}
var instances = [];
setInterval(() => {
    instances = instances.filter(function (el) {
        return el != null;
    });
    if (instances.length) {
        //clear();
        /**
         * @type {{ext: ".css" | ".js" | ".php" | ".min.js" | ".scss" | ".min.css", file: string, dir: string}}
         */
        var instance = instances[0];
        //log('Queue: ' + instances.length);
        //log('current: ' + instance.file);
        if (!isLibs(instance.file)) {
            if (instance.ext == '.js') {
                core.minJS(instance.file);
                core.obfuscate(instance.file);
            }
            else if (instance.ext == '.css') {
                core.minCSS(instance.file);
            }
            else if (instance.ext == '.scss') {
                core.scss(instance.file);
            }
            //console.log(instance);
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
        if (!runningLibs) {
            log(chalk.red('Library framework'));
            const tsconfig = core.root() + '/tsconfig.build.json';
            runningLibs = shell.exec(`tsc -p ${tsconfig}`, function (err, stdout, stderr) {
                runningLibs = null;
                if (!err) {
                    core.minJS(core.root() + `/src/MVC/themes/assets/js/app.js`);
                }
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
    }, function (event, filename) {
        if (filename && event == 'change') {
            var filechanged = slash(dir + filename);
            var allowed = !/\.min\.(js|ts|scss|sass|less|css)$/s.test(filechanged) &&
                /\.(js|ts|scss|sass|less|css)$/s.test(filechanged);
            if (allowed) {
                var push = true;
                instances.filter(function (instance) {
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
//# sourceMappingURL=index.js.map