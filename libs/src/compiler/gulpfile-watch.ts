import * as gulp from "gulp";
import config from "../compiler/config";
import upath from "upath";
import path from "path";
import framework from "../compiler/index";
import log from "../compiler/log";
//import process from "../compiler/process";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
// noinspection ES6PreferShortImport
import { createApp, multiMinify, views } from "./gulpfile-app";
// noinspection ES6PreferShortImport
import "../node-localstorage/src/index";
import { compileAssets } from "./gulpfile-compiler";
import "../../js/_Prototype-Array";
var kill = require("tree-kill");

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
              reload_gulp2();
            }
          }, 1000);
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
  const ext = ".{js|css|sass|less|scss}";
  gulp.watch(
    ["./src/MVC/**/*" + ext, "./etc/**/*" + ext, "./" + config.app.views + "/**/*" + ext, "**.min" + ext],
    async function (done) {
      await multiMinify(views());
      done();
    }
  );
  gulp.watch(["./libs/js/**/*" + ext, "./libs/src/**/*" + ext], async function (done) {
    await createApp(true);
    done();
  });
  done();
}

let reload_timeout = null;

export async function reload_gulp(cb: () => any = null) {
  //spawn("gulp", ["watch"], { stdio: "inherit" });
  //process.exit();

  console.info(process.env.process_restarting);
  if (process.env.process_restarting == "1") {
    console.info("restarting...");
    delete process.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    reload_timeout = setTimeout(reload_gulp, 1000);
    //reload_gulp();
    process.exit();
  }

  const children_kill = function () {
    children.forEach(function (child) {
      child.kill();
      kill(child.pid, "SIGKILL", function (err) {
        console.error(err);
      });
    });
  };

  var children: ChildProcessWithoutNullStreams[] = [];

  process.on("exit", function () {
    console.log("killing", children.length, "child processes");
    children_kill();
  });

  var cleanExit = function () {
    process.exit();
  };
  process.on("SIGINT", cleanExit); // catch ctrl-c
  process.on("SIGTERM", cleanExit); // catch kill

  // Restart process ...
  children_kill();

  children[0] = spawn(process.argv[0], process.argv.slice(1), {
    env: { process_restarting: "1" },
    stdio: "ignore",
    detached: true,
  }); //.unref()
  children[0].unref();
  children[0].stdout.on("data", function (data) {
    console.log("stdout:" + data);
  });

  children[0].stderr.on("data", function (data) {
    console.log("stderr:" + data);
  });

  children[0].stdin.on("data", function (data) {
    console.log("stdin:" + data);
  });

  if (typeof cb == "function") {
    cb();
  }
}

let terminal;
export function reload_gulp2() {
  console.log("ENV " + process.env.process_restarting);
  // Give old process one second to shut down before continuing ...
  reload_timeout = setTimeout(function () {
    terminal = spawn(process.argv[0], process.argv.slice(1), {
      env: { process_restarting: "1" },
      stdio: "ignore",
    }).unref();
  }, 1000);
  process.exit();
}
