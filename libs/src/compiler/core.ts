import * as fs from "fs";
import * as Terser from "terser";
import * as path from "path";
import slash from "slash";
import * as JavaScriptObfuscator from "javascript-obfuscator";
import log from "./log";
import * as uglifycss from "uglifycss";
import * as sass from "sass";
import { exec } from "child_process";
import "../node-localstorage/src/index";
import configuration from "./config";
import * as framework from "./framework";
import filemanager from "./filemanager";
import less from "less";

/**
 * @class Core compiler
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class core {
  static log = log;
  log = log;

  /**
   * config.json
   */
  static config() {
    return configuration;
  }

  /**
   * filter array after deletion
   * @param arr
   */
  static array_filter(arr: any[]) {
    return arr.filter(function (el) {
      return el != null;
    });
  }

  /**
   * return Asynchronous function (Promise)
   * @param callback
   */
  static async(callback: Function) {
    return new Promise(function (resolve) {
      if (typeof callback == "function") {
        callback();
      }
      resolve(true);
    });
  }

  /**
   * Composer
   * @param dir directory has composer.json
   * @param type
   */
  static composer(dir: string, type: "update" | "install" | "validate" | "upgrade" | "self-update") {
    if (type) {
      exec(
        `cd ${dir} && php libs/bin/composer/composer.phar ${type}`,
        (error: { message: any }, stdout: any, stderr: any) => {
          if (error) {
            log.log(log.error(`error: ${error.message}`));
            return;
          }
          if (stderr) {
            log.log(`stderr: ${stderr}`);
            return;
          }
          log.log(`stdout: ${stdout}`);
        }
      );
    }
  }

  /**
   * @param dir
   * @param [filelist]
   * @return
   */
  static readdir(dir: string, filelist: string[] = null, exclude: Array<string | RegExp> = null): Array<any> {
    if (!dir) return null;
    const self = this;
    if (!dir.toString().endsWith("/")) {
      dir += "/";
    }
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = self.readdir(dir + file + "/", filelist, exclude);
      } else {
        filelist.push(path.resolve(dir + file));
      }
    });
    if (exclude && exclude.length) {
      exclude.forEach(function (ex) {
        filelist = filelist.filter(function (item) {
          let allow = null;
          if (ex instanceof RegExp) {
            allow = !ex.test(item);
          } else {
            const matches = item.indexOf(ex) !== -1;
            allow = !matches;
          }
          //console.log(allow, ex);
          return allow;
        });
      });
    }

    return filelist;
  }

  /**
   * Is Node or CommonJS Browser
   */
  static isNode() {
    let isNode = false;
    if (typeof module !== "undefined" && module.exports) {
      isNode = true;
    }
    return isNode;
  }

  /**
   * File Log Output Console
   * @param file
   */
  static filelog(file: string) {
    return path.join(
      core.normalize(path.dirname(file)).replace(core.normalize(process.cwd()), ""),
      path.basename(file)
    );
  }

  /**
   * transform *.browserify to .js
   * @param filename filepath
   */
  static browserify(filename: string) {
    const self = this;
    const exists = fs.existsSync(filename);
    if (exists) {
      const output = filename.toString().replace(/\.browserify\.js/s, ".js");
      exec(`browserify -t [ babelify --presets [ es2015 ] ] ${filename} -o ${output}`);
      log.log(`${self.filelog(filename.toString())} > ${self.filelog(output.toString())} ${log.success("success")}`);
    }
  }

  /**
   * Compile filename.scss to filename.css and filename.min.css
   * @param filename
   */
  static scss(filename: string) {
    const self = this;
    const exists = fs.existsSync(filename);
    if (exists) {
      if (exists) {
        const output = filename.toString().replace(/\.scss/s, ".css");
        const outputcss = output;
        if (/\.scss$/s.test(filename.toString()) && !/\.min\.scss$/s.test(filename.toString())) {
          sass.render(
            {
              file: filename.toString(),
              outputStyle: "expanded",
              outFile: output,
            },
            function (err, result) {
              if (!err) {
                fs.writeFile(outputcss, result.css.toString(), function (err) {
                  if (!err) {
                    log.log(
                      `${log.chalk().red(self.filelog(filename.toString()))} > ${log
                        .chalk()
                        .blueBright(self.filelog(outputcss))} ${log.success("success")}`
                    );
                    core.minCSS(output, null);
                  } else {
                    log.log(log.error(err.message));
                  }
                });
              }
            }
          );
        }
      } else {
        console.error(`${filename} not found`);
      }
    }
  }

  static exists(filename: string): boolean {
    return fs.existsSync(filename);
  }

  static less(filename: string) {
    const self = this;
    const exists = fs.existsSync(filename);
    if (exists) {
      const outputcss = filename.toString().replace(/\.less/s, ".css");
      const source = fs.readFileSync(filename).toString();
      less
        .render(source, { sourceMap: { sourceMapFileInline: true } })
        .then(function (output) {
          fs.writeFileSync(outputcss, output.css, { encoding: "utf-8" });
          log.log(
            `${log.chalk().hex("#1d365d").bgWhite(self.filelog(filename))} > ${log
              .chalk()
              .blueBright(self.filelog(outputcss))} ${log.success("success")}`
          );
        })
        .catch(function (e) {
          console.log(
            `${log.chalk().hex("#1d365d")(self.filelog(filename))} > ${log
              .chalk()
              .blueBright(self.filelog(outputcss))} ${log.chalk().redBright("failed")}`
          );
        });
    }
  }

  /**
   * Compile LESS to CSS
   * @param from less path file
   * @param to to css path file
   * @example compileLESS('src/test.less', 'dist/test.css')
   */
  static compileLESS(from: string, to: string) {
    from = path.join(__dirname, from);
    to = path.join(__dirname, to);
    const self = this;
    fs.readFile(from, function (err, data) {
      if (err) return;
    });
  }

  /**
   * Get root path
   * @returns {string} posix/unix path format
   */
  static root(): string {
    let appDir = slash(path.dirname(require.main.filename)).toString();
    if (/\/libs\/compiler$/s.test(appDir)) {
      let split = appDir.split("/");
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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const js = [];
    fs.exists(folder, function (exists) {
      if (exists && fs.lstatSync(folder).isDirectory()) {
        const read = self.readdir(folder, [], []);
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
    const self = this;
    if (!/\.obfuscated\.js$/s.test(filejs) && filejs.endsWith(".js")) {
      const output = filejs.replace(/\.js/s, ".obfuscated.js");
      fs.readFile(
        filejs,
        {
          encoding: "utf-8",
        },
        function (err, data) {
          if (!err) {
            const obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
              compact: true,
              controlFlowFlattening: true,
            });

            fs.writeFile(output, obfuscationResult.getObfuscatedCode(), function (err) {
              if (!err) {
                log.log(`${self.filelog(filejs)} > ${self.filelog(output)} ${log.success("success")}`);
              }
            });
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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    if (!file) {
      return;
    }

    if (/\.min\.js$/s.test(file) || !/\.js$/s.test(file)) {
      log.log(log.error(`${file} minJS Not Allowed`));
      return;
    }
    const min = file.replace(/\.js$/s, ".min.js");
    //log(min);
    if (!fs.existsSync(file)) {
      log.log(log.random(file) + log.error(" not found"));
      return null;
    }
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

              const input = self.filelog(file);
              const output = self.filelog(min);
              if (terserResult.error) {
                log.log(
                  `${log.chalk().yellow(input)} > ${log.chalk().yellowBright(output)} ${log.chalk().red("fail")}`
                );
                fs.exists(min, function (ex) {
                  if (ex) {
                    filemanager.unlink(min, false);
                    log.log(log.chalk().yellowBright(core.filelog(min)) + log.chalk().redBright(" deleted"));
                  }
                });
              } else {
                fs.writeFileSync(min, terserResult.code, "utf8");
                log.log(`${log.chalk().yellow(input)} > ${log.chalk().yellowBright(output)} ${log.success("success")}`);
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
    return filemanager.unlink(file, false);
  }

  /**
   * format path to unix path
   * @param {string} path
   * @returns {string|null}
   */
  static normalize(path: string): string | null {
    return typeof slash(path) == "string" ? slash(path).replace(/\/{2,99}/s, "/") : null;
  }

  /**
   * Determine OS is windows
   */
  static isWin() {
    return process.platform === "win32";
  }

  /**
   * minify css to *.min.css version
   * @param file
   * @param callback
   */
  static minCSS(file: string, callback: Function | null = null) {
    const self = this;
    fs.exists(file, function (exists) {
      if (exists && !/\.min\.css$/s.test(file) && /\.css$/s.test(file)) {
        const min = file.replace(/\.css/s, ".min.css");
        fs.readFile(
          file,
          {
            encoding: "utf-8",
          },
          function (err, data) {
            if (!err) {
              fs.writeFile(min, data, function (err) {
                if (!err) {
                  const minified = uglifycss.processFiles([min], {
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
                          log.log(
                            `${log.chalk().blueBright(self.filelog(file))} > ${log
                              .chalk()
                              .blueBright(self.filelog(min))} ${log.chalk().green("success")}`
                          );
                        } else {
                          callback(true, file, min);
                        }
                      }
                    }
                  );
                } else {
                  console.error(err);
                }
              });
            } else {
              console.error(err);
            }
          }
        );
      }
    });
  }
}

Object.assign(core, filemanager, framework.dimas);

export = core;
