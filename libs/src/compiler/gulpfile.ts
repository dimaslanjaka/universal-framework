// noinspection RegExpDuplicateAlternationBranch

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
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
// noinspection ES6PreferShortImport
import { localStorage } from "../node-localstorage/index";
import * as proc from "process";
import { createApp } from "./gulpfile-app";
import { compileAssets } from "./gulpfile-compiler";
import { doc } from "./gulpfile-doc";
import { fixDeps } from "./func";
import "../../js/_Prototype-Array";

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
export function build(withoutApp?: boolean) {
  return createApp(withoutApp);
}

export function reorderPkg() {
  try {
    const packageJson = root + "/package.json";
    if (fs.existsSync(packageJson)) {
      const json_pkg = JSON.parse(fs.readFileSync(packageJson).toString());
      fixDeps(json_pkg).then(function (json) {
        fs.writeFileSync(root + "/package.json", JSON.stringify(json, null, 2), {
          encoding: "utf-8",
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
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

  let watch_timer: NodeJS.Timeout = null;
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
            watch_timer = null;
            if (isCompiler || isFormsaver) {
              // TODO: reload gulp
              await reload_gulp();
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
  });
});

gulp.task("assets-compile", function () {
  function filter(views: any[]) {
    return views
      .filter(function (item) {
        return (
          /\.(js|scss|css|sass|less)$/.test(item) &&
          !/\.min\.(js|css)$/.test(item) &&
          !/-ori|-original|-backup|\.bak/s.test(item)
        );
      })
      .map(function (asset) {
        return framework.normalize(asset);
      });
  }

  let css = framework.readdir(root + "/assets/css");
  // noinspection JSUnusedAssignment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css = filter(css);
  let js = framework.readdir(root + "/assets/js");
  // noinspection JSUnusedAssignment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  js = filter(js);
});

gulp.task("default", gulp.series(["build", "watch"]));

/**
 * Create Documentation of javascripts
 */
gulp.task("doc", doc);

let reload_timeout = null;

/**
 * Reload Gulp
 * @param cb
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function reload_gulp() {
  //spawn("gulp", ["watch"], { stdio: "inherit" });
  //proc.exit();

  if (proc.env.process_restarting) {
    delete proc.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    reload_timeout = setTimeout(reload_gulp, 1000);
    //reload_gulp();
    //proc.exit();
    return;
  }

  console.clear();
  console.log("reloading gulp");
  //console.log(proc.argv[0]);
  //console.log(proc.argv.slice(1));

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
    if (typeof children[0] != "undefined") {
      children[0].kill();
    }
  }
  children.push(
    spawn(proc.argv[0], proc.argv.slice(1), {
      env: { process_restarting: "1" },
      //stdio: "ignore",
      detached: true,
      stdio: ["ignore", out, err],
    }) //.unref()
  );
}

localStorage.removeItem("compile");
