import * as gulp from "gulp";
import config from "../compiler/config";
import upath from "upath";
import path from "path";
import framework from "../compiler/index";
import log from "../compiler/log";
import process from "../compiler/process";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
// noinspection ES6PreferShortImport
import { createApp, multiMinify, views } from "./gulpfile-app";
// noinspection ES6PreferShortImport
import "../node-localstorage/src/index";
import { compileAssets } from "./gulpfile-compiler";
import "../../js/_Prototype-Array";

export async function gulpWatch() {
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

  let watch_timer = null;
  return gulp.watch(files, null).on("change", function (file: string | Buffer | import("url").URL | string[]) {
    const trigger = function () {
      file = framework.normalize(path.resolve(file.toString()));
      /**
       * Check is library compiler or source compiler
       */
      const is_Lib = /libs\/(js|src)\//s.test(framework.normalize(file));
      const filename_log = framework.filelog(file);

      if (is_Lib) {
        const isCompiler = /[\/\\]libs[\/\\]src[\/\\]compiler[\/\\]/s.test(file);
        /**
         * Exclude framework.js app.js and map js
         */
        const isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
        const isFormsaver = /[\/\\]libs[\/\\]src[\/\\]smarform[\/\\]/s.test(file);
        if (isFramework) return;

        if (watch_timer == null) {
          log.log(log.random("Library compiler triggered by ") + log.random(framework.filelog(file)));
          log.log(log.chalk().yellow(`start compile ${log.random("src/MVC/themes/assets/js")}`));
          watch_timer = setTimeout(async function () {
            await createApp(true);

            if (isCompiler || isFormsaver) {
              // TODO: reload gulp
              await reload_gulp(function () {
                watch_timer = null;
              });
            }
          }, 5000);
        }
      } else {
        if (/\.(js|scss|css|less|ts)$/s.test(file)) {
          // TODO: Compile js css on change
          if (!/\.min\.(js|css|ts)$/s.test(file)) {
            compileAssets(file);
          }
        } else {
          let reason = log.error("undefined");
          if (/\.(php|log|txt|htaccess|log)$/s.test(filename_log)) {
            reason = log.color("brown", "Excluded");
          } else if (/\.(d\.ts)$/s.test(filename_log)) {
            reason = log.color("cyan", "Typehint");
          }
          log.log(`[${reason}] cannot modify ${log.random(filename_log)}`);
        }
      }
    };
    return trigger();

    //if (localStorage.getItem("watch"))
  });
}

export function watch2(done: () => void) {
  gulp.watch(["./src/MVC/**/*", "./etc/**/*", "./" + config.app.views + "/**/*"], async function (done) {
    await multiMinify(views());
    done();
  });
  gulp.watch(["./libs/js/**/*", "./libs/src/**/*"], async function (done) {
    await createApp(true);
    process_restarter();
    done();
  });
  done();
}

let reload_timeout = null;

/**
 * Reload Gulp
 * @param cb
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function reload_gulp(cb: () => any) {
  //spawn("gulp", ["watch"], { stdio: "inherit" });
  //process.core.exit();

  if (process.core.env.process_restarting) {
    delete process.core.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    reload_timeout = setTimeout(reload_gulp, 1000);
    //reload_gulp();
    process.core.exit();
    return;
  }

  console.clear();
  console.log("reloading gulp");
  //console.log(process.core.argv[0]);
  //console.log(process.core.argv.slice(1));

  var children: ChildProcessWithoutNullStreams[] = [];

  process.core.on("exit", function () {
    console.log("killing", children.length, "child processes");
    children.forEach(function (child) {
      child.kill();
    });
  });

  var cleanExit = function () {
    process.core.exit();
  };
  process.core.on("SIGINT", cleanExit); // catch ctrl-c
  process.core.on("SIGTERM", cleanExit); // catch kill

  let out: any, err: any;
  // Restart process ...
  if (!children.isEmpty()) {
    children[0].kill();
  }
  children.push(
    spawn(process.core.argv[0], process.core.argv.slice(1), {
      env: { process_restarting: "1" },
      //stdio: "ignore",
      detached: true,
      stdio: ["ignore", out, err],
    }) //.unref()
  );
  children[0].unref();

  if (typeof cb == "function") {
    cb();
  }
}

//var spawn = require("child_process").spawn;
export function process_restarter() {
  if (process.core.env.hasOwnProperty("process_restarting")) {
    console.log("restarting...");
    delete process.core.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    setTimeout(process_restarter, 1000);
    return;
  }

  // ...

  // Restart process ...
  spawn(process.core.argv[0], process.core.argv.slice(1), {
    env: { process_restarting: "1" },
    stdio: "ignore",
    detached: true,
  }).unref();
}
