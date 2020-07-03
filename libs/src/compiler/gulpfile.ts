import * as gulp from "gulp";
import ts from "gulp-typescript";
import rename from "gulp-rename";
import * as fs from "fs";
import config from "../compiler/config";
import upath from "upath";
import path from "path";
import framework from "../compiler/index";
import log from "../compiler/log";
import process from "../compiler/process";
import core from "./core";
const root = process.root;
import sass from "sass"; // or require('node-sass');
import { exec, ExecException } from "child_process";
import sourcemaps from "gulp-sourcemaps";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import { localStorage } from "../node-localstorage/index";
import browserify from "browserify";
import browserify_source from "vinyl-source-stream";
localStorage.removeItem("compile");
console.clear();

/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task("build", function () {
  try {
    var packageJson = root + "/package.json";
    if (fs.existsSync(packageJson)) {
      var json = JSON.parse(fs.readFileSync(packageJson).toString());
      for (const key in json.dependencies) {
        if (json.dependencies.hasOwnProperty(key)) {
          if (key.includes("@types")) {
            json.devDependencies[key] = json.dependencies[key];
          }
        }
      }
    }
  } catch (error) {}
  return createApp(false);
});

// watch libs/js/**/* and views
gulp.task("watch", function () {
  console.clear();
  const files = [
    "./libs/js/**/*",
    "./libs/src/**/*",
    "./src/MVC/**/*",
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
  var run_watch = gulp.watch(files, null).on(
    "change",
    /**
     * @param {string} file
     */
    function (file: string | Buffer | import("url").URL | string[]) {
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
          if (/\.(js|scss|css)$/s.test(file)) {
            if (!/\.min\.(js|css)$/s.test(file)) {
              minify(file);
            }
          } else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
            if (!/libs\/|libs\\/s.test(file)) {
              single_tsCompile(file);
            }
          } else {
            var reason = log.error(undefined);
            if (/\.(php|log|txt|htaccess)$/s.test(filename_log)) {
              reason = log.random("excluded");
            }
            log.log(`[${reason}] cannot modify ${log.random(filename_log)}`);
          }
        }
      };
      return trigger();
    }
  );
  return run_watch;
});

gulp.task("composer", function () {
  return framework.async(function () {
    var today = new Date().toLocaleDateString();
    var yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toLocaleDateString();
    if (
      !framework.localStorage().getItem("composer") ||
      framework.localStorage().getItem("composer") == yesterday
    ) {
      framework.composer(framework.root(), "update");
      framework.localStorage().setItem("composer", today);
    } else {
      today = new Date(today).toString();
      yesterday = new Date(
        framework.localStorage().getItem("composer")
      ).toString();
      log.log("Composer already updated at " + yesterday);
      log.log("Today " + today);
      //log.log("Is Older " + today.getTime() > yesterday.getTime());
    }
  });
});

gulp.task("default", gulp.series(["build", "watch"]));

/**
 * NodeJS to Browserify
 * @param target source javascript
 * @param destination destination folder
 * @param rename want to rename file ? give name or using default basename of target
 */
function node2browser(target?: string, destination?: string, rename?: string) {
  if (typeof rename != "string" || !rename || !rename.length) {
    rename = path.basename(target);
  }

  log.log(
    `Browserify ${log
      .chalk()
      .magentaBright(framework.filelog(target))} to ${log
      .chalk()
      .magentaBright(framework.filelog(destination))} renamed to ${log.success(
      rename
    )}`
  );
  return (
    browserify()
      .add(target) //"src/MVC/themes/assets/js/app.js"
      .bundle()
      //Pass desired output filename to vinyl-source-stream
      .pipe(browserify_source(rename)) //"app.js"
      // Start piping stream to tasks!
      .pipe(gulp.dest(destination))
  ); //"src/MVC/themes/assets/js/"
}
/**
 * minify assets
 * @param file
 */
function minify(item: string | Buffer) {
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
    if (item.endsWith(".scss") && !item.endsWith(".min.scss")) {
      framework.scss(item);
    } else if (item.endsWith(".css") && !item.endsWith(".min.css")) {
      framework.minCSS(item);
    } else if (item.endsWith(".js") && !item.endsWith(".min.js")) {
      if (!item.endsWith(".babel.js")) {
        framework.minJS(item);
        var deleteObfuscated = false;
        if (typeof config == "object") {
          if (config.hasOwnProperty("obfuscate")) {
            if (config.obfuscate) {
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
function views() {
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
 * minify multiple assets
 * @param assets
 */
function multiMinify(assets: any[]) {
  assets.map(minify);
}

localStorage.removeItem("compile");
/**
 * Create App.js
 * @param withoutView false to not compile views javascripts
 */
async function createApp(withoutView: boolean) {
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
    await typescriptCompiler("tsconfig.main.json", root + "/").catch(function (
      err
    ) {
      log.log(log.error(err));
    });
    minify(target);
    if (!withoutView) {
      multiMinify(views());
    }
    localStorage.removeItem("compile");
    node2browser(target, path.dirname(target));
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
function single_tsCompile(target: string) {
  var targetlog = log.chalk().magentaBright(framework.filelog(target));
  if (target.endsWith(".d.ts")) {
    log.log(`${targetlog} is declaration file`);
    return;
  }
  var dest = path.dirname(target);
  var filename = path.basename(target);
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
function typescriptCompiler(
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
