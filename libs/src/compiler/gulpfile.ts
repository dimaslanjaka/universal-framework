import * as gulp from "gulp";
import ts from "gulp-typescript";
import * as fs from "fs";
import config from "../compiler/config";
import upath from "upath";
import path from "path";
import framework from "../compiler/index";
import log from "../compiler/log";
import process from "../compiler/process";
const root = process.root;
import { exec, ExecException } from "child_process";
import { localStorage } from "../node-localstorage/index";
import { fixDeps } from "./func";
//const spawn = require("child_process").spawn;
//const argv = require("yargs").argv;
import { argv } from "yargs";
import { spawn } from "child_process";
import * as proc from "process";

localStorage.removeItem("compile");
console.clear();

/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task("build", function () {
  return build();
});

gulp.task("build-clear", function () {
  return build(true);
});

/**
 * Build Project
 * @param withoutApp
 */
function build(withoutApp?: boolean) {
  try {
    var packageJson = root + "/package.json";
    if (fs.existsSync(packageJson)) {
      var json_pkg = JSON.parse(fs.readFileSync(packageJson).toString());
      fixDeps(json_pkg).then(function (json) {
        fs.writeFileSync(
          root + "/package.json",
          JSON.stringify(json, null, 2),
          {
            encoding: "utf-8",
          }
        );
      });
    }
  } catch (error) {}
  return createApp(withoutApp ? true : false);
}

// watch libs/js/**/* and views
gulp.task("watch", async function () {
  console.clear();
  const files = [
    "./libs/js/**/*",
    "./libs/src/**/*",
    "./src/MVC/**/*",
    "./etc/**/*",
    "./" + config.app.views + "/**/*",
  ];
  log.log(
    log.random("Listening ") +
      files
        .map(function (item) {
          return log.random(upath.resolve(item));
        })
        .join(" ")
  );

  var compiler_runner: any = false;
  var run_watch = gulp
    .watch(files, null)
    .on("change", function (
      file: string | Buffer | import("url").URL | string[]
    ) {
      const trigger = function () {
        file = framework.normalize(path.resolve(file.toString()));
        /**
         * Check is library compiler or source compiler
         */
        const is_Lib = /libs\/(js|src)\//s.test(framework.normalize(file));
        const filename_log = framework.filelog(file);

        if (is_Lib) {
          var isCompiler = file.includes("/libs/compiler/");
          var isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
          if (isCompiler || isFramework) return;
          //console.log(file, isFramework);
          log.log(
            log.random("Library compiler triggered by ") +
              log.random(framework.filelog(file))
          );
          log.log(
            log
              .chalk()
              .yellow(`start compile ${log.random("src/MVC/themes/assets/js")}`)
          );
          if (compiler_runner) {
            log.log(log.error("Compiler still running"));
          } else {
            compiler_runner = setTimeout(function () {
              createApp(true);
              compiler_runner = null;
            }, 5000);
          }
        } else {
          if (/\.(js|scss|css|less)$/s.test(file)) {
            if (!/\.min\.(js|css)$/s.test(file)) {
              compileAssets(file);
            }
          } else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
            if (!/libs\/|libs\\/s.test(file)) {
              single_tsCompile(file);
            }
          } else {
            var reason = log.error("undefined");
            if (/\.(php|log|txt|htaccess|log)$/s.test(filename_log)) {
              reason = log.random("Excluded");
            } else if (/\.(d\.ts)$/s.test(filename_log)) {
              reason = log.random("Typehint");
            }
            log.log(`[${reason}] cannot modify ${log.random(filename_log)}`);
          }
        }
      };
      return trigger();
    });
  return run_watch;
});

gulp.task("assets-compile", function () {
  function filter(views: any[]) {
    return views
      .filter(function (item) {
        return (
          /\.(js|scss|css|sass|less)$/.test(item) &&
          !/\.min\.(js|css)$/.test(item) &&
          !/\-ori|\-original|\-backup|\.bak/s.test(item)
        );
      })
      .map(function (asset) {
        return framework.normalize(asset);
      });
  }
  var css = framework.readdir(root + "/assets/css");
  css = filter(css);
  var js = framework.readdir(root + "/assets/js");
  js = filter(js);
});

gulp.task("default", gulp.series(["build", "watch"]));

export function reload_gulp() {
  //spawn("gulp", ["watch"], { stdio: "inherit" });
  //proc.exit();

  if (proc.env.process_restarting) {
    delete proc.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    //setTimeout(reload_gulp, 1000);
    reload_gulp();
    proc.exit();
    return;
  }

  // Restart process ...
  spawn(proc.argv[0], proc.argv.slice(1), {
    env: { process_restarting: "1" },
    stdio: "ignore",
  }).unref();
}

/**
 * compile and minify assets
 * @param item file full path
 */
export function compileAssets(item: string | Buffer): any {
  const exists = fs.existsSync(item);
  if (exists) {
    item = item.toString();
    var config:
      | string
      | {
          obfuscate: boolean;
        } = upath.normalizeSafe(
      root + "/src/MVC/config/" + item.replace(framework.root(), "")
    );
    config = framework.normalize(framework.root() + config);
    config = config.replace(/\.(js|css)/s, ".json");
    if (fs.existsSync(config)) {
      config = require(config);
    }

    if (item.endsWith(".less") && !item.endsWith(".min.less")) {
      //console.log(`Compiling LESS ${framework.filelog(item)}`);
      framework.less(item);
    } else if (item.endsWith(".scss") && !item.endsWith(".min.scss")) {
      //console.log(`Compiling SCSS ${framework.filelog(item)}`);
      framework.scss(item);
    } else if (item.endsWith(".css") && !item.endsWith(".min.css")) {
      //console.log(`Minify CSS ${framework.filelog(item)}`);
      framework.minCSS(item);
    } else if (item.endsWith(".js") && !item.endsWith(".min.js")) {
      if (!item.endsWith(".babel.js")) {
        //console.log(`Minify JS ${framework.filelog(item)}`);
        framework.minJS(item);
        var deleteObfuscated = false;
        if (typeof config == "object") {
          if (config.hasOwnProperty("obfuscate")) {
            if (config.obfuscate) {
              //console.log(`Obfuscating JS ${framework.filelog(item)}`);
              framework.obfuscate(item);
            } else {
              deleteObfuscated = true;
            }
          } else {
            deleteObfuscated = true;
          }
        }
        if (deleteObfuscated) {
          var obfuscatedjs = item.replace(/\.js$/s, ".obfuscated.js");
          var obfuscatedminjs = item.replace(/\.js$/s, ".obfuscated.min.js");
          framework.unlink(obfuscatedjs);
          framework.unlink(obfuscatedminjs);
        }
      }
    } else if (item.endsWith(".ts") && !item.endsWith(".d.ts")) {
      if (!/libs\/|libs\\/s.test(item)) {
        single_tsCompile(item);
      }
    }
  }
}

/**
 * List views folder
 */
export function views() {
  var views = framework.readdir(root + `/${config.app.views}`);
  return views
    .filter(function (item) {
      return (
        /\.(js|scss|css|sass|less)$/.test(item) &&
        !/\.min\.(js|css)$/.test(item) &&
        !/\-ori|\-original|\-backup|\.bak/s.test(item)
      );
    })
    .map(function (asset) {
      return framework.normalize(asset);
    });
}

/**
 * compileAssets multiple assets
 * @param assets
 */
export function multiMinify(assets: any[]): any {
  assets.map(compileAssets);
}

localStorage.removeItem("compile");

var isFirstExecute = true;
/**
 * Create App.js
 * @param withoutView false to not compile views javascripts
 */
export async function createApp(withoutView: boolean) {
  var exists = localStorage.getItem("compile");
  if (!exists) {
    localStorage.setItem("compile", "running");
    var target = upath.normalizeSafe(
      upath.resolve(upath.join(root, "src/MVC/themes/assets/js/app.js"))
    );
    await typescriptCompiler("tsconfig.build.json", root + "/").catch(function (
      err
    ) {
      log.log(log.error(err));
    });
    await typescriptCompiler("tsconfig.precompiler.json", root + "/").catch(
      function (err) {
        log.log(log.error(err));
      }
    );
    await typescriptCompiler("tsconfig.compiler.json", root + "/libs/").catch(
      function (err) {
        log.log(log.error(err));
      }
    );
    //await node2browser(target, path.dirname(target));
    await compileAssets(target);
    if (!withoutView) {
      await multiMinify(views());
    }
    localStorage.removeItem("compile");
    /*execute(
      "browserify --standalone Bundle ./src/MVC/themes/assets/js/app.js -o ./src/MVC/themes/assets/js/app.min.js && browserify --standalone Bundle ./src/MVC/themes/assets/js/app.js -o ./src/MVC/themes/assets/js/app.js"
    );*/

    if (!isFirstExecute) {
      // reload gulp
      reload_gulp();
    }
    isFirstExecute = false;
  } else {
    log.log(
      log.error("Compiler lock process already exists ") +
        log.chalk().yellow("node index.js fix") +
        log.chalk().green(" to fix it")
    );
  }
}

/**
 * Single Typescript Compiler
 * @param target
 * @todo universal-framework typescript compiler support
 */
export function single_tsCompile(target: string) {
  var targetlog = log.chalk().magentaBright(framework.filelog(target));
  if (target.endsWith(".d.ts")) {
    log.log(`${targetlog} is declaration file`);
    return;
  }
  var dest = path.dirname(target);
  log.log(
    `${targetlog} > ${log
      .chalk()
      .yellow(framework.filelog(target.replace(/\.ts$/, ".js")))} start`
  );
  var tsProject = ts.createProject({
    declaration: false,
    skipLibCheck: true,
  });
  return gulp.src(target).pipe(tsProject()).pipe(gulp.dest(dest));
}

/**
 * Typescript compiler
 * @param source
 * @param destination
 * @param callback
 */
export function typescriptCompiler(
  source: string,
  destination: string,
  callback: (arg0: any, arg1: any) => void = null
) {
  return new Promise((resolve, reject) => {
    exec(`tsc -p ${source}`, function (
      err: ExecException,
      stdout: string,
      stderr: string
    ) {
      if (!err) {
        if (typeof callback == "function") {
          callback(source, destination);
        }
        if (stdout.trim().length) {
          console.log(stdout);
        }
        if (stderr.trim().length) {
          console.log(stderr);
        }
        log.log(
          log.random("successfully compiled ") +
            log.success(path.basename(source))
        );
        resolve();
      } else {
        log.log(
          log.random("failed compile ") + log.error(path.basename(source))
        );
        reject(err.message);
      }
    });
  });
}
