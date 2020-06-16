'use strict';
const fs = require('fs');
const Terser = require('terser');
const path = require('path');
const _ = require('lodash');
const slash = require('slash');
const JavaScriptObfuscator = require('javascript-obfuscator');
const chalk = require('chalk');
const log = console.log;
const clear = console.clear;
const uglifycss = require('uglifycss');
const sass = require('node-sass');
const {
  exec
} = require("child_process");

Array.prototype.unique = function() {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
};

/**
 * Core compiler
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class core {
  /**
   * Composer
   * @param {string} dir directory has composer.json
   * @param {"update"|"install"|"validate"|"upgrade"|"self-update"} type
   */
  static composer(dir, type) {
    if (type) {
      exec(`cd ${dir} && php libs/bin/composer/composer.phar ${type}`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
  }
  /**
   * @param {import("fs").PathLike} dir
   * @param {string[]} [filelist]
   * @return {Array}
   */
  static readdir(dir, filelist) {
    if (!dir) return;
    var self = this;
    if (!dir.endsWith('/')) {
      dir += '/';
    }
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = self.readdir(dir + file + '/', filelist);
      } else {
        filelist.push(path.resolve(dir + file));
      }
    });
    return filelist;
  };

  static scss(scss_filename) {
    if (fs.exists(scss_filename, function(exists) {
        if (exists) {
          var output = scss_filename.replace(/\.scss/s, '.css');
          var outputcss = output;
          if (/\.scss$/s.test(scss_filename) && !/\.min\.scss$/s.test(scss_filename)) {
            sass.render({
              file: scss_filename,
              outputStyle: "compact",
              outFile: output
            }, function(err, result) {
              if (!err) {
                fs.writeFile(outputcss, result.css, function(err) {
                  if (!err) {
                    scss_filename = scss_filename.replace(core.root(), '');
                    outputcss = outputcss.replace(core.root(), '');
                    log(`${scss_filename} > ${outputcss} ${chalk.green('success')}`);
                    core.minCSS(output);
                  }
                });
              }
            });
          }
        } else {
          console.error(`${scss_filename} not found`);
        }
      }));
  }

  /**
   * Get root path
   * @returns {string} posix/unix path format
   */
  static root() {
    var appDir = slash(path.dirname(require.main.filename));
    if (/\/libs\/compiler$/s.test(appDir)) {
      appDir = appDir.split('/');
      appDir = appDir.slice(0, -2);
      appDir = appDir.join('/');
    }
    return appDir;
  }

  /**
   * Minify all js file to format *.min.js
   * @param {string} folder
   */
  static minify_folder(folder) {
    var self = this;
    var js = new Array();
    fs.exists(folder, function(exists) {
      if (exists && fs.lstatSync(folder).isDirectory()) {
        var read = this.readdir(folder);
        if (Array.isArray(read)) {
          read.forEach(file => {
            if (!/\.min\.js$/s.test(file) && /\.js$/s.test(file)) {
              js.push(file);
              //console.log(file);
            }
          });
          js.unique().forEach(function(file) {
            if (file) self.minJS(file);
          });
        }
      }
    });
  }

  /**
   * Obfuscate Javascript
   * @param {string} filejs
   */
  static obfuscate(filejs) {
    if (!/\.obfuscated\.js/s.test(filejs)) {
      var output = filejs.replace(/\.js/s, '.obfuscated.js');
      fs.readFile(filejs, {
        encoding: "utf-8"
      }, function(err, data) {
        if (!err) {
          var obfuscationResult = JavaScriptObfuscator.obfuscate(
            data, {
              compact: true,
              controlFlowFlattening: true
            }
          );

          fs.writeFileSync(output, obfuscationResult.getObfuscatedCode());
        }
      });
    }
  }

  /**
   * Minify JS into *.min.js version
   * @param {string} file
   */
  static minJS(file) {
    if (!file) {
      return;
    }
    var self = this;
    if (/\.min\.js$/s.test(file) || !/\.js$/s.test(file)) {
      log(chalk.red(`${file} minJS Not Allowed`));
      return;
    } else if (/\/(node_modules|processed|vendor|tmp)\/|\/libs\/js\//s.test(file)) {
      log(chalk.red('Library folder detected'));
      return;
    }
    var min = file.replace(/\.js$/s, '.min.js');
    //console.log(min);
    fs.readFile(file, {
      encoding: 'utf-8'
    }, function(err, data) {
      if (!err) {
        fs.writeFile(min, data, function(err) {
          if (err) {
            console.error(err);
          } else {
            const terserResult = Terser.minify(fs.readFileSync(min, 'utf8'), {
              "parse": {
                "ecma": 8
              },
              "compress": {
                "ecma": 5,
                "warnings": false,
                "arrows": false,
                "collapse_vars": false,
                "comparisons": false,
                "computed_props": false,
                "hoist_funs": false,
                "hoist_props": false,
                "hoist_vars": false,
                "inline": false,
                "loops": false,
                "negate_iife": false,
                "properties": false,
                "reduce_funcs": false,
                "reduce_vars": false,
                "switches": false,
                "toplevel": false,
                "typeofs": false,
                "booleans": true,
                "if_return": true,
                "sequences": true,
                "unused": true,
                "conditionals": true,
                "dead_code": true,
                "evaluate": true
              },
              "mangle": {
                "safari10": true
              },
              "output": {
                "ecma": 5,
                "comments": false,
                "ascii_only": true
              }
            });

            var input = slash(file).replace(self.root(), '');
            var output = slash(min).replace(self.root(), '');
            if (terserResult.error) {
              console.log(`Minifying ${input} to ${output} error.`, terserResult.error);
              fs.unlinkSync(min);
            } else {
              fs.writeFileSync(min, terserResult.code, 'utf8');
              console.log(`${input} to ${output} ${chalk.green('success')}`);
            }
          }
        });
      } else {
        console.log(err);
      }
    });
  }

  /**
   * minify css to *.min.css version
   * @param {string} file
   */
  static minCSS(file) {
    fs.exists(file, function(exists) {
      if (exists && !/\.min\.css$/s.test(file) && /\.css$/s.test(file)) {
        var min = file.replace(/\.css/s, '.min.css');
        fs.readFile(file, {
          encoding: 'utf-8'
        }, function(err, data) {
          if (!err) {
            fs.writeFile(min, data, function(err) {
              if (!err) {
                var minified = uglifycss.processFiles(
                  [min], {
                    maxLineLen: 500,
                    expandVars: true
                  }
                );
                fs.writeFile(min, minified, {
                  encoding: "utf-8"
                }, function(err) {
                  if (!err) {
                    file = file.replace(core.root(), '');
                    min = min.replace(core.root(), '');
                    log(`${file} > ${min} ${chalk.green('success')}`);
                  }
                });
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
}

module.exports = core;