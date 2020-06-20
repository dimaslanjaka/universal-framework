import fs from "fs";
const Terser = require("terser");
import path from "path";
const slash = require("slash");
const JavaScriptObfuscator = require("javascript-obfuscator");
import log from "./log";
import uglifycss from "uglifycss";
import sass from "sass";
import { exec } from "child_process";
const LocalStorage = require("node-localstorage").LocalStorage;

/**
 * Core compiler
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class core {
  static arrayFilter(arr: any[]) {
    return arr.filter(function (el) {
      return el != null;
    });
  }
  /**
   * return Asynchronous function (Promise)
   * @param callback
   */
  static async(callback: Function) {
    return new Promise(function (resolve, reject) {
      if (typeof callback == "function") {
        callback();
      }
      resolve();
    });
  }
  /**
   * localStorage NodeJS Version
   */
  static localStorage() {
    return new LocalStorage(`${this.root()}/tmp/storage`);
  }
  /**
   * Composer
   * @param dir directory has composer.json
   * @param type
   */
  static composer(
    dir: string,
    type: "update" | "install" | "validate" | "upgrade" | "self-update"
  ) {
    if (type) {
      exec(
        `cd ${dir} && php libs/bin/composer/composer.phar ${type}`,
        (error: { message: any }, stdout: any, stderr: any) => {
          if (error) {
            log.error(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            new log(`stderr: ${stderr}`);
            return;
          }
          new log(`stdout: ${stdout}`);
        }
      );
    }
  }
  /**
   * @param {import("fs").PathLike} dir
   * @param {string[]} [filelist]
   * @return {Array}
   */
  static readdir(dir: import("fs").PathLike, filelist: string[]): Array<any> {
    if (!dir) return null;
    var self = this;
    if (!dir.toString().endsWith("/")) {
      dir += "/";
    }
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = self.readdir(dir + file + "/", filelist);
      } else {
        filelist.push(path.resolve(dir + file));
      }
    });
    return filelist;
  }

  /**
   * Compile filename.scss to filename.css and filename.min.css
   * @param filename
   */
  static scss(filename: fs.PathLike) {
    fs.exists(filename, function (exists) {
      if (exists) {
        var output = filename.toString().replace(/\.scss/s, ".css");
        var outputcss = output;
        if (
          /\.scss$/s.test(filename.toString()) &&
          !/\.min\.scss$/s.test(filename.toString())
        ) {
          sass.render(
            {
              file: filename.toString(),
              outputStyle: "expanded",
              outFile: output,
            },
            function (err, result) {
              if (!err) {
                fs.writeFile(outputcss, result.css, function (err) {
                  if (!err) {
                    filename = filename.toString().replace(core.root(), "");
                    outputcss = outputcss.replace(core.root(), "");
                    new log(
                      `${filename} > ${outputcss} ${log.success("success")}`
                    );
                    core.minCSS(output, null);
                  }
                });
              }
            }
          );
        }
      } else {
        console.error(`${filename} not found`);
      }
    });
  }

  /**
   * Get root path
   * @returns {string} posix/unix path format
   */
  static root(): string {
    var appDir = slash(path.dirname(require.main.filename)).toString();
    if (/\/libs\/compiler$/s.test(appDir)) {
      var split = appDir.split("/");
      split = split.slice(0, -2);
      appDir = split.join("/");
    }
    return appDir;
  }

  /**
   * Minify all js file to format *.min.js
   * @param {string} folder
   */
  static minify_folder(folder: string) {
    var self = this;
    var js = new Array();
    fs.exists(folder, function (exists) {
      if (exists && fs.lstatSync(folder).isDirectory()) {
        var read = self.readdir(folder, []);
        if (Array.isArray(read)) {
          read.forEach((file) => {
            if (!/\.min\.js$/s.test(file) && /\.js$/s.test(file)) {
              js.push(file);
              //log(file);
            }
          });
          js.filter(function (el) {
            return el != null;
          }).forEach(function (file: string) {
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
  static obfuscate(filejs: string) {
    if (!/\.obfuscated\.js$/s.test(filejs) && filejs.endsWith(".js")) {
      var output = filejs.replace(/\.js/s, ".obfuscated.js");
      fs.readFile(
        filejs,
        {
          encoding: "utf-8",
        },
        function (err, data) {
          if (!err) {
            var obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
              compact: true,
              controlFlowFlattening: true,
            });

            fs.writeFileSync(output, obfuscationResult.getObfuscatedCode());
          }
        }
      );
    }
  }

  /**
   * Minify JS into *.min.js version
   * @param {string} file
   */
  static minJS(file: string) {
    if (!file) {
      return;
    }
    var self = this;
    if (/\.min\.js$/s.test(file) || !/\.js$/s.test(file)) {
      log.log(log.error(`${file} minJS Not Allowed`));
      return;
    }
    var min = file.replace(/\.js$/s, ".min.js");
    //log(min);
    fs.readFile(
      file,
      {
        encoding: "utf-8",
      },
      function (err, data) {
        if (!err) {
          fs.writeFile(min, data, function (err) {
            if (err) {
              console.error(err);
            } else {
              const terserResult = Terser.minify(fs.readFileSync(min, "utf8"), {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  arrows: false,
                  collapse_vars: false,
                  comparisons: false,
                  computed_props: false,
                  hoist_funs: false,
                  hoist_props: false,
                  hoist_vars: false,
                  inline: false,
                  loops: false,
                  negate_iife: false,
                  properties: false,
                  reduce_funcs: false,
                  reduce_vars: false,
                  switches: false,
                  toplevel: false,
                  typeofs: false,
                  booleans: true,
                  if_return: true,
                  sequences: true,
                  unused: true,
                  conditionals: true,
                  dead_code: true,
                  evaluate: true,
                },
                mangle: {
                  safari10: true,
                },
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              });

              var input = slash(file).replace(self.root(), "");
              var output = slash(min).replace(self.root(), "");
              if (terserResult.error) {
                log.log(
                  `${log.chalk().yellow(input)} > ${log
                    .chalk()
                    .yellowBright(output)} ${log.chalk().red("fail")}`
                );
                fs.exists(min, function (ex) {
                  if (ex) {
                    fs.unlinkSync(min);
                    log.log(
                      `${log.chalk().yellowBright(min)} ${log
                        .chalk()
                        .redBright("deleted")}`
                    );
                  }
                });
              } else {
                fs.writeFileSync(min, terserResult.code, "utf8");
                log.log(
                  `${log.chalk().yellow(input)} > ${log
                    .chalk()
                    .yellowBright(output)} ${log.chalk().green("success")}`
                );
              }
            }
          });
        } else {
          log.log(err);
        }
      }
    );
  }

  /**
   * smart delete file
   * @param {string} file
   */
  static unlink(file: string) {
    var self = this;
    fs.exists(file, function (exists) {
      if (exists) {
        fs.unlink(file, function (err) {
          if (!err) {
            file = slash(file).replace(self.root(), "");
            new log(
              `${log.chalk().whiteBright(file)} ${log
                .chalk()
                .redBright("deleted")}`
            );
          }
        });
      }
    });
  }

  /**
   * format path to unix path
   * @param {string} path
   * @returns {string|null}
   */
  static normalize(path: string): string | null {
    return typeof slash(path) == "string"
      ? slash(path).replace(/\/{2,99}/s, "/")
      : null;
  }

  /**
   * Determine OS is windows
   */
  static isWin() {
    return process.platform === "win32";
  }

  /**
   * minify css to *.min.css version
   * @param {string} file
   * @param {Function|null} callback
   */
  static minCSS(file: string, callback: Function | null) {
    fs.exists(file, function (exists) {
      if (exists && !/\.min\.css$/s.test(file) && /\.css$/s.test(file)) {
        var min = file.replace(/\.css/s, ".min.css");
        fs.readFile(
          file,
          {
            encoding: "utf-8",
          },
          function (err, data) {
            if (!err) {
              fs.writeFile(min, data, function (err) {
                if (!err) {
                  var minified = uglifycss.processFiles([min], {
                    maxLineLen: 500,
                    expandVars: true,
                  });
                  fs.writeFile(
                    min,
                    minified,
                    {
                      encoding: "utf-8",
                    },
                    function (err) {
                      if (!err) {
                        if (typeof callback != "function") {
                          file = file.replace(core.root(), "");
                          min = min.replace(core.root(), "");
                          new log(
                            `${log
                              .chalk()
                              .blueBright(file)} > ${log
                              .chalk()
                              .blueBright(min)} ${log.chalk().green("success")}`
                          );
                        } else {
                          callback(true, file, min);
                        }
                      }
                    }
                  );
                } else {
                  new log(log.chalk().red(err));
                }
              });
            } else {
              new log(log.chalk().red(err));
            }
          }
        );
      }
    });
  }
  static reorder(value: any) {
    var o = JSON.parse(value);
    if (Array.isArray(o)) {
      o = o.sort(function (a, b) {
        var x = a[Object.keys(a)[0]];
        var y = b[Object.keys(b)[0]];
        if (x) {
          return x < y ? -1 : x > y ? 1 : 0;
        } else {
          return x > y ? -1 : x < y ? 1 : 0;
        }
      });
    }
    return JSON.stringify(o, null, "\t");
  }
}

export default core;
