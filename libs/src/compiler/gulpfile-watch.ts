import * as gulp from "gulp";
import { config } from "./config";
import upath from "upath";
import path from "path";
import framework from "../compiler/index";
import log from "../compiler/log";
//import process from "../compiler/process";
// noinspection ES6PreferShortImport
import { createApp } from "./gulpfile-app";
// noinspection ES6PreferShortImport
import "../node-localstorage/src/index";
import { compileAssets } from "./gulpfile-compiler";
import "../../js/_Prototype-Array";

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
        } /*
        else {
          let reason = log.error("undefined");
          if (/\.(php|log|txt|htaccess|log)$/s.test(filename_log)) {
            reason = log.color("brown", "Excluded");
          } else if (/\.(d\.ts)$/s.test(filename_log)) {
            reason = log.color("cyan", "Typehint");
          }
          log.log(`[${reason}] cannot modify ${log.random(filename_log)}`);
        }
        */
      }
    };
    return trigger();
  });
}

export function watch3(done: () => void) {
  const ext = ".{js|css|sass|less|scss}";
  const files = ["./src/MVC/**/*" + ext, "./etc/**/*" + ext, "./" + config.app.views + "/**/*" + ext, "!**.min" + ext];
  ///console.log(files);

  /*
  spawner.spawn("cmd", ["/k", "tsc -p tsconfig.build.json --watch"], false, function (child) {
    child.stderr.on("data", function (data) {
      console.error(data);
    });
  });
  spawner.spawn("cmd", ["/k", "tsc -p tsconfig.precompiler.json --watch"]);
  spawner.spawn("cmd", ["/k", "tsc -p tsconfig.compiler.json --watch"]);
  */
  return gulp.watch(files, null).on("change", function (file: string | Buffer | import("url").URL | string[]) {
    const canonical = path.normalize(path.resolve(file.toString()));
    console.log(canonical, file);
    if (/\.(js|scss|css|less|ts)$/s.test(canonical)) {
      // TODO: Compile js css on change
      if (!/\.min\.(js|css|ts)$/s.test(canonical)) {
        compileAssets(canonical);
      }
    }
  });
}
