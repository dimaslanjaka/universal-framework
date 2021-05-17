import * as gulp from "gulp";
import config from "../compiler/config";
import upath from "upath";
import path from "path";
import framework from "../compiler/index";
import log from "../compiler/log";
import process from "../compiler/process";
import * as fs from "fs";
//const spawn = require("child_process").spawn;
//const argv = require("yargs").argv;
import { spawn } from "child_process";
import { localStorage } from "../node-localstorage/index";
import * as proc from "process";
import { createApp } from "./gulpfile-app";
import { compileAssets } from "./gulpfile-compiler";
import { doc } from "./gulpfile-doc";
import { fixDeps } from "./func";

const root = process.root;

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
  return createApp(withoutApp ? true : false);
}

function reorderPkg() {
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
    .on(
      "change",
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
            var isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(
              file
            );
            if (isCompiler || isFramework) return;
            //console.log(file, isFramework);
            log.log(
              log.random("Library compiler triggered by ") +
                log.random(framework.filelog(file))
            );
            log.log(
              log
                .chalk()
                .yellow(
                  `start compile ${log.random("src/MVC/themes/assets/js")}`
                )
            );
            if (compiler_runner) {
              log.log(log.error("Compiler still running"));
            } else {
              compiler_runner = setTimeout(function () {
                createApp(true);
                compiler_runner = null;
              }, 5000);
            }

            // run documentation builder
            //doc();
          } else {
            if (/\.(js|scss|css|less)$/s.test(file)) {
              // TODO: Compile js css
              if (!/\.min\.(js|css)$/s.test(file)) {
                compileAssets(file);
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
      }
    );
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
//gulp.task("reload", reload_gulp);
gulp.task("default", gulp.series(["build", "watch"]));

/**
 * Create Documentation of javascripts
 */
gulp.task("doc", doc);

/**
 * Reload Gulp
 * @param cb
 * @returns
 */
async function reload_gulp(cb: Function = null) {
  //spawn("gulp", ["watch"], { stdio: "inherit" });
  //proc.exit();

  if (proc.env.process_restarting) {
    delete proc.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    setTimeout(reload_gulp, 1000);
    //reload_gulp();
    //proc.exit();
    return;
  }

  console.log("reloading gulp");
  //console.log(proc.argv[0]);
  //console.log(proc.argv.slice(1));

  // Restart process ...
  spawn(proc.argv[0], proc.argv.slice(1), {
    env: { process_restarting: "1" },
    stdio: "ignore",
  }).unref();
}

localStorage.removeItem("compile");

export = gulp;
