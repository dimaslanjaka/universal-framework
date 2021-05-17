import * as gulp from "gulp";
import ts from "gulp-typescript";
import * as fs from "fs";
import upath from "upath";
import path from "path";
import framework from "../compiler/index";
import log from "../compiler/log";
import process from "../compiler/process";
const root = process.root;

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
      if (item.endsWith("browserify.js")) {
        // TODO: Compile Browserify
        framework.browserify(item);
      } else if (!item.endsWith(".babel.js")) {
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
