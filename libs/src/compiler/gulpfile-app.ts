import log from "../compiler/log";
import { exec, ExecException } from "child_process";
import upath from "upath";
import path from "path";
import { compileAssets } from "./gulpfile-compiler";
import { localStorage } from "../node-localstorage/index";
import process from "../compiler/process";
import framework from "../compiler/index";
import { config } from "../compiler/config";
import filemanager from "./filemanager";

localStorage.removeItem("compile");

/**
 * Create App.js
 * @param withoutView false to not compile views javascripts
 */
export async function createApp(withoutView: boolean) {
    const root = process.root;
    const exists = localStorage.getItem("compile");
    if (!exists) {
        localStorage.setItem("compile", "running");

        // compile required assets
        await typescriptCompiler("tsconfig.formsaver.json", root + "/libs/src/smartform").catch(function (err) {
            log.log(log.error(err));
        });

        // compile assets
        const target = upath.normalizeSafe(upath.resolve(upath.join(root, "src/MVC/themes/assets/js/app.js")));
        await typescriptCompiler("tsconfig.build.json", root + "/").catch(function (err) {
            log.log(log.error(err));
        });
        await typescriptCompiler("tsconfig.precompiler.json", root + "/").catch(function (err) {
            log.log(log.error(err));
        });
        await typescriptCompiler("tsconfig.compiler.json", root + "/libs/").catch(function (err) {
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
    callback: (arg0: any, arg1: any, err: any, stdout: any, stderr: any) => void = null
) {
    return new Promise((resolve, reject) => {
        exec(`tsc -p ${source}`, function (err: ExecException, stdout: string, stderr: string) {
            if (!err) {
                if (stdout.trim().length) {
                    console.log(stdout);
                }
                if (stderr.trim().length) {
                    console.log(stderr);
                }

                if (typeof callback == "function") {
                    callback(source, destination, err, stdout, stderr);
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
    const root = process.root;
    const views = filemanager.readdir(root + `/${config.app.views}`);
    return views
        .filter(function (item) {
            // noinspection RegExpRedundantEscape
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
