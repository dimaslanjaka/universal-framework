import * as gulp from "gulp";
import { config } from "./config";
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
import { spawner } from "./spawner";

export function gulpWatch() {
  console.clear();
  const files = [
    "./libs/js/**/*.{js|ts}",
    "./libs/src/**/*.{js|ts}",
    "./src/MVC/**/*.{js|ts|css|scss|less}",
    "./etc/**/*.{js|ts|css|scss|less}",
    "./" + config.app.views + "/**/*.{js|ts|css|scss|less}",
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
      console.info(`${file} changed`);
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
            await createApp(true).finally(function () {
              watch_timer = null;
            });
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

export function watch3(done: () => void) {
  const ext = ".{js|css|sass|less|scss}";
  const files = ["./src/MVC/**/*" + ext, "./etc/**/*" + ext, "./" + config.app.views + "/**/*" + ext, "!**.min" + ext];
  gulp.watch(files, async function (done) {
    await multiMinify(views());
    done();
  });

  spawner.spawn("cmd", ["/k", "tsc -p tsconfig.build.json --watch"]);
  spawner.spawn("cmd", ["/k", "tsc -p tsconfig.precompiler.json --watch"]);
  spawner.spawn("cmd", ["/k", "tsc -p tsconfig.compiler.json --watch"]);
  done();
}

/*
var cleanExit = function () {
  process.exit();
};
process.on("SIGINT", cleanExit); // catch ctrl-c
process.on("SIGTERM", cleanExit); // catch kill
process.on("SIGKILL", cleanExit); // catch kill
var children: ChildProcessWithoutNullStreams[] = [];
function children_kill() {
  children.forEach(function (child: ChildProcessWithoutNullStreams) {
    process.kill(child.pid, "SIGKILL");
    child.kill();
    console.log(`Child ${child.pid} killed ${child.killed ? "success" : "failed"}`);
  });
}

process.on("exit", function () {
  console.log("killing", children.length, "child processes");
  children_kill();
});


export async function reload_gulp(cb: () => any = null) {
  console.info(process.env.process_restarting);
  if (process.env.process_restarting == "1") {
    console.info("restarting...");
    delete process.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    setTimeout(reload_gulp, 1000);
    return;
  }

  if (typeof cb == "function") {
    cb();
  }

  // Restart process ...
  children_kill();

  const terminal = spawn(process.argv[0], process.argv.slice(1), {
    env: { process_restarting: "1" },
    stdio: "ignore",
    //detached: true,
  });

  terminal.stdout.on("data", function (data) {
    console.log("stdout:" + data);
  });

  terminal.stderr.on("data", function (data) {
    console.log("stderr:" + data);
  });

  terminal.stdin.on("data", function (data) {
    console.log("stdin:" + data);
  });

  children.push(terminal);
  terminal.unref();
}
*/
