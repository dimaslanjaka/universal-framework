import log from "../compiler/log";
import { exec, ExecException } from "child_process";
import upath from "upath";
import path from "path";
import { compileAssets } from "./gulpfile-compiler";
import { localStorage } from "../node-localstorage/index";
import process from "../compiler/process";
import framework from "../compiler/index";
import config from "../compiler/config";

const root = process.root;

/**
 * Create App.js
 * @param withoutView false to not compile views javascripts
 */
export async function createApp(withoutView: boolean) {
  var exists = localStorage.getItem("compile");
  if (!exists) {
    localStorage.setItem("compile", "running");
    var target = upath.normalizeSafe(upath.resolve(upath.join(root, "src/MVC/themes/assets/js/app.js")));
    await typescriptCompiler("tsconfig.build.json", root + "/").catch(function (err) {
      log.log(log.error(err));
    });
    await typescriptCompiler("tsconfig.precompiler.json", root + "/").catch(function (err) {
      log.log(log.error(err));
    });
    await typescriptCompiler("tsconfig.compiler.json", root + "/libs/").catch(function (err) {
      log.log(log.error(err));
    });
    await typescriptCompiler("tsconfig.formsaver.json", root + "/libs/").catch(function (err) {
      log.log(log.error(err));
    });

    //await node2browser(target, path.dirname(target));
    await compileAssets(target);
    if (!withoutView) {
      await multiMinify(views());
    }
    //const appjs = path.join(root, "src/MVC/themes/assets/js/app.js");
    //exec(`browserify ${appjs} -o ${appjs}`);
    localStorage.removeItem("compile");
  } else {
    log.log(
      log.error("Compiler lock process already exists ") +
        log.chalk().yellow("node index.js fix") +
        log.chalk().green(" to fix it")
    );
  }
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
    exec(`tsc -p ${source}`, function (err: ExecException, stdout: string, stderr: string) {
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
        log.log(log.color("blue", "successfully compiled ") + log.success(path.basename(source)));
        resolve(true);
      } else {
        log.log(log.color("blue", "failed compile ") + log.error(path.basename(source)));
        reject(err.message);
      }
    });
  });
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
